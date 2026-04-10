// Models
import collectionSavesModel from "../models/collectionSaves.model.js";
import highlightSaveModel from "../models/highlightSave.model.js";
import highlightModel from "../models/highlight.model.js";
import saveModel from "../models/saves.model.js";

// Services
import {
  extractSearchKeywords,
  generateSummaryAndTopics,
  generateVectorFromData,
  generateVectorFromQuery,
} from "../services/ai.service.js";
import { scrapeMetatags } from "../services/scraper.service.js";
import { detectType } from "../services/detector.service.js";

// Utils
import { getTimeAgo } from "../utils/util.js";
import mongoose from "mongoose";

export async function createSave(req, res) {
  try {
    const { title, url, note, tags } = req.body;
    const userId = req.user.id;

    const isSaveExists = await saveModel.findOne({ url, userId });
    if (isSaveExists) {
      return res.status(400).json({
        success: false,
        message: "You have already saved this URL",
      });
    }

    const type = detectType(url);
    const { content, thumbnail, favicon, keywords } = await scrapeMetatags(url);
    const { summary, topics, aiTags } = await generateSummaryAndTopics({
      title,
      content,
      keywords,
      url,
    });

    const normalize = (tag) => tag.trim().toLowerCase().replace(/\s+/g, "-");
    const updatedTags = Array.from(
      new Set([...(tags || []), ...(aiTags || [])].map(normalize)),
    );

    const dataVector = await generateVectorFromData({
      summary: summary || content,
      title,
      topics,
      tags: updatedTags,
    });

    const saveDoc = await saveModel.create({
      userId,
      title,
      url,
      note,
      tags: updatedTags,
      type,
      summary: summary || content,
      thumbnail,
      favicon,
      topics,
      embedding: dataVector,
    });

    res.status(201).json({
      success: true,
      message: "Saved to Memora successfully",
      save: saveDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to save. Please try again",
      error: err.message,
    });
  }
}

export async function updateSave(req, res) {
  try {
    const { title, note, tags } = req.body;
    const { saveId } = req.params;
    const userId = req.user.id;

    const normalize = (tag) => tag.trim().toLowerCase().replace(/\s+/g, "-");

    const updatedTags = Array.from(new Set([...(tags || [])].map(normalize)));

    const saveDoc = await saveModel.findOneAndUpdate(
      { _id: saveId, userId },
      {
        title,
        note,
        tags: updatedTags,
      },
      { new: true },
    );

    if (!saveDoc) {
      return res.status(404).json({
        success: false,
        message: "Save not found for the provided URL",
      });
    }

    res.status(200).json({
      success: true,
      message: "Save updated successfully",
      save: saveDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update save. Please try again",
      error: err.message,
    });
  }
}

export async function checkSave(req, res) {
  try {
    const { url } = req.query;
    const userId = req.user.id;

    const saveDoc = await saveModel.findOne({ url, userId });
    if (!saveDoc) {
      return res.status(200).json({
        success: true,
        exists: false,
        message: "URL has not been saved yet",
      });
    }

    const savedAgo = getTimeAgo(saveDoc.createdAt);

    res.status(200).json({
      success: true,
      exists: true,
      message: `You already saved this ${savedAgo}`,
      id: saveDoc._id,
      savedAgo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to check URL. Please try again",
      error: err.message,
    });
  }
}

export async function getVectorQuerySave(req, res) {
  try {
    const { query } = req.query;
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const [queryVector, keywords] = await Promise.all([
      generateVectorFromQuery(query),
      extractSearchKeywords(query),
    ]);

    const [vectorResults, keywordResults] = await Promise.all([
      // 1. Vector search
      saveModel.aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: queryVector,
            numCandidates: 100,
            limit: 20,
            filter: { userId: { $eq: userObjectId } },
          },
        },
        {
          $project: {
            title: 1,
            url: 1,
            summary: 1,
            topics: 1,
            tags: 1,
            thumbnail: 1,
            favicon: 1,
            type: 1,
            isFavorite: 1,
            createdAt: 1,
            score: { $meta: "vectorSearchScore" },
          },
        },
        { $match: { score: { $gte: 0.55 } } },
      ]),

      // 2. Keyword search — using AI-extracted keywords, no summary
      keywords.length > 0
        ? saveModel
            .find({
              userId,
              $or: keywords.flatMap((word) => [
                { title: { $regex: word, $options: "i" } },
                { topics: { $regex: word, $options: "i" } },
                { tags: { $regex: word, $options: "i" } },
              ]),
            })
            .select(
              "title url summary topics tags thumbnail favicon type isFavorite createdAt",
            )
            .lean()
        : Promise.resolve([]),
    ]);

    // Merged keyword results get priority, no duplicates
    const seen = new Set();
    const merged = [];

    // Keyword first (exact matches are more trustworthy)
    for (const doc of keywordResults) {
      seen.add(doc._id.toString());
      merged.push({ ...doc, matchType: "keyword" });
    }

    // Then vector results that aren't already included
    for (const doc of vectorResults) {
      if (!seen.has(doc._id.toString())) {
        seen.add(doc._id.toString());
        merged.push({ ...doc, matchType: "semantic" });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Fetched similar queries",
      results: merged,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch similar queries.",
      error: err.message,
    });
  }
}

export async function deleteSave(req, res) {
  try {
    const { saveId } = req.params;
    const userId = req.user.id;

    const saveDoc = await saveModel.findOneAndDelete({ _id: saveId, userId });
    if (!saveDoc) {
      return res.status(404).json({
        success: false,
        message: "Save not found or already deleted",
      });
    }

    const highlightEntries = await highlightSaveModel.find({ saveId, userId });
    const highlightIds = highlightEntries.map((e) => e.highlightId);
    await highlightSaveModel.deleteMany({ saveId, userId });
    await highlightModel.deleteMany({ _id: { $in: highlightIds } });
    await collectionSavesModel.deleteMany({ saveId, userId });

    res.status(200).json({
      success: true,
      message: "Save deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete save. Please try again",
      error: err.message,
    });
  }
}

export async function getSaves(req, res) {
  try {
    const userId = req.user.id;
    const saves = await saveModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message:
        saves.length === 0 ? "No saves yet" : `${saves.length} saves found`,
      saves,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch saves. Please try again",
      error: err.message,
    });
  }
}

export async function getSave(req, res) {
  const { saveId } = req.params;

  try {
    const userId = req.user.id;
    const saveDoc = await saveModel.findOneAndUpdate(
      { _id: saveId, userId },
      { lastViewedAt: new Date() },
      { new: true },
    );

    if (!saveDoc) {
      return res.status(404).json({
        success: false,
        message: "Save not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Save fetched successfully",
      save: saveDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch save. Please try again",
      error: err.message,
    });
  }
}

export async function updateFavorite(req, res) {
  const { isFavorite } = req.body;
  const { saveId } = req.params;
  const userId = req.user.id;

  try {
    const saveDoc = await saveModel.findOne({
      _id: saveId,
      userId,
    });

    if (!saveDoc) {
      return res.status(404).json({
        success: false,
        message: "Save not found",
      });
    }

    saveDoc.isFavorite = isFavorite;
    await saveDoc.save();

    res.status(200).json({
      success: true,
      message: "Save updated successfully",
      save: saveDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update save. Please try again",
      error: err.message,
    });
  }
}

export async function updateTags(req, res) {
  const { saveId } = req.params;
  const userId = req.user.id;
  const { tags } = req.body;

  try {
    const saveDoc = await saveModel.findOne({
      _id: saveId,
      userId,
    });

    if (!saveDoc) {
      return res.status(404).json({
        success: false,
        message: "Save not found",
      });
    }

    saveDoc.tags = tags || [];
    await saveDoc.save();

    res.status(200).json({
      success: true,
      message: "Tags updated successfully",
      save: saveDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update tags. Please try again",
      error: err.message,
    });
  }
}

export async function updateNote(req, res) {
  const { saveId } = req.params;
  const userId = req.user.id;
  const { note } = req.body;

  try {
    const saveDoc = await saveModel.findOne({
      _id: saveId,
      userId,
    });

    if (!saveDoc) {
      return res.status(404).json({
        success: false,
        message: "Save not found",
      });
    }

    saveDoc.note = note ?? "";
    await saveDoc.save();

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      save: saveDoc,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update note. Please try again",
      error: err.message,
    });
  }
}


export async function reEmbedAllSaves(req, res) {
  try {
    const saves = await saveModel.find({}, "_id title summary topics tags");

    let success = 0;
    let failed = 0;

    for (const save of saves) {
      try {
        const newVector = await generateVectorFromData({
          title: save.title,
          summary: save.summary,
          topics: save.topics,
          tags: save.tags,
        });

        await saveModel.updateOne(
          { _id: save._id },
          { $set: { embedding: newVector } }
        );

        success++;
      } catch {
        failed++;
      }
    }

    return res.status(200).json({
      success: true,
      message: `Re-embedding complete. ${success} updated, ${failed} failed.`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Re-embedding failed",
      error: err.message,
    });
  }
}