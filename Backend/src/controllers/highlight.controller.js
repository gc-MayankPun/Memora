import highlightModel from "../models/highlight.model.js";
import highlightSaveModel from "../models/highlightSave.model.js";

export async function createHighlight(req, res) {
  try {
    const { highlightedText } = req.body;
    const { saveId } = req.params;
    const userId = req.user.id;

    const highlight = await highlightModel.create({
      highlightedText,
      userId,
    });
    await highlightSaveModel.create({
      highlightId: highlight._id,
      userId,
      saveId,
    });

    res.status(201).json({
      message: "Highlight created successfully",
      success: true,
      highlight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create highlight",
      error: error.message,
    });
  }
}

export async function getHighlightsInSave(req, res) {
  try {
    const { saveId } = req.params;
    const userId = req.user.id;

    const entries = await highlightSaveModel
      .find({ userId, saveId })
      .populate("highlightId")
      .sort({ createdAt: -1 });

    const highlights = entries.map((e) => e.highlightId).filter(Boolean);

    res.status(200).json({
      success: true,
      message:
        highlights.length === 0
          ? "No highlights in this save"
          : `${highlights.length} highlight found`,
      highlights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch highlights in saves",
      error: error.message,
    });
  }
}

export async function deleteHighlight(req, res) {
  try {
    const { highlightId, saveId } = req.params;
    const userId = req.user.id;

    const highlight = await highlightModel.findOne({
      _id: highlightId,
      userId,
    });
    if (!highlight) {
      return res.status(404).json({
        success: false,
        message: "Highlight not found",
      });
    }

    await highlightModel.deleteOne({ _id: highlightId });
    await highlightSaveModel.deleteOne({ highlightId, userId, saveId });

    res.status(200).json({
      success: true,
      message: "Highlight deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete highlight",
      error: error.message,
    });
  }
}
