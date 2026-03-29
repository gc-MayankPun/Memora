import { scrapeMetatags } from "../services/scraper.service.js";
import { detectType } from "../services/detector.service.js";
import saveModel from "../models/saves.model.js";
import { getTimeAgo } from "../utils/util.js";

export async function createSave(req, res) {
  try {
    const { title, url, note, tags } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: "Title and URL are required",
      });
    }

    const isSaveExists = await saveModel.findOne({ url });
    if (isSaveExists) {
      return res.status(400).json({
        success: false,
        message: "This URL is already saved in Memora",
      });
    }

    const type = detectType(url);
    const { content, thumbnail } = await scrapeMetatags(url);

    const save = await saveModel.create({
      title,
      url,
      note,
      tags,
      type,
      content,
      thumbnail,
    });

    res.status(201).json({
      success: true,
      message: "Saved to Memora successfully",
      save,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to save. Please try again",
      error: err.message,
    });
  }
}

export async function checkSave(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    const save = await saveModel.findOne({ url });
    if (!save) {
      return res.status(200).json({
        success: true,
        exists: false,
        message: "URL has not been saved yet",
      });
    }

    const savedAgo = getTimeAgo(save.createdAt);

    res.status(200).json({
      success: true,
      exists: true,
      message: `You already saved this ${savedAgo}`,
      id: save._id,
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
    const save = await saveModel.findByIdAndDelete(req.params.id);
    if (!save) {
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
    const saves = await saveModel.find().sort({ createdAt: -1 });

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
    const save = await saveModel.findById(req.params.id);
    if (!save) {
      return res.status(404).json({
        success: false,
        message: "Save not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Save fetched successfully",
      save,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch save. Please try again",
      error: err.message,
    });
  }
}
