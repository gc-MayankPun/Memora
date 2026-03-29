import { scrapeMetatags } from "../services/scraper.service.js";
import { detectType } from "../services/detector.service.js";
import saveModel from "../models/saves.model.js";
import { getTimeAgo } from "../utils/util.js";
import { generateSummaryAndTopics } from "../services/ai.service.js";

export async function createSave(req, res) {
  try {
    const { title, url, note, tags } = req.body;
    const userId = req.user.id;

    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: "Title and URL are required",
      });
    }

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
    const { title, url, note, tags } = req.body;
    const userId = req.user.id;

    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: "Title and URL are required",
      });
    }

    const normalize = (tag) => tag.trim().toLowerCase().replace(/\s+/g, "-");

    const updatedTags = Array.from(new Set([...(tags || [])].map(normalize)));

    const saveDoc = await saveModel.findOneAndUpdate(
      { _id: req.params.id, userId },
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

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

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

export async function deleteSave(req, res) {
  try {
    const userId = req.user.id;
    const saveId = req.params.id;

    const saveDoc = await saveModel.findOneAndDelete({ _id: saveId, userId });
    if (!saveDoc) {
      return res.status(404).json({
        success: false,
        message: "Save not found or already deleted",
      });
    }

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
  try {
    const userId = req.user.id;
    const saveDoc = await saveModel.findOneAndUpdate(
      { _id: req.params.id, userId },
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
  const userId = req.user.id;

  try {
    const saveDoc = await saveModel.findOne({
      _id: req.params.id,
      userId,
    });

    if (!saveDoc) {
      return res.status(404).json({
        success: false,
        message: "Save not found",
      });
    }

    if (isFavorite !== undefined) {
      saveDoc.isFavorite = isFavorite;
    }

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
  const { tags } = req.body;
  const userId = req.user.id;

  try {
    const saveDoc = await saveModel.findOne({
      _id: req.params.id,
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
  const { note } = req.body;
  const userId = req.user.id;

  try {
    const saveDoc = await saveModel.findOne({
      _id: req.params.id,
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
