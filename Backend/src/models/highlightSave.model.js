import mongoose from "mongoose";

const highlightSaveSchema = new mongoose.Schema(
  {
    highlightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "highlights",
      required: [true, "Highlight ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User ID is required"],
    },
    saveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "saves",
      required: [true, "Saves ID is required"],
    },
  },
  { timestamps: true },
);

highlightSaveSchema.index({ highlightId: 1 });
highlightSaveSchema.index({ saveId: 1 });
highlightSaveSchema.index({ highlightId: 1, saveId: 1 }, { unique: true });

const highlightSaveModel = mongoose.model(
  "highlightSaves",
  highlightSaveSchema,
);

export default highlightSaveModel;
