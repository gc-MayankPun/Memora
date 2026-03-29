import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User ID is required"],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["article", "tweet", "youtube", "pdf", "github", "reddit", "other"],
      default: "article",
    },
    note: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    summary: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    favicon: {
      type: String,
      default: "",
    },
    topics: {
      type: [String],
      default: [],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    lastViewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

saveSchema.index({ userId: 1, url: 1 }, { unique: true });

const saveModel = mongoose.model("saves", saveSchema);

export default saveModel;
