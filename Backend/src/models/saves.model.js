import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
      unique: [true, "URL should be unique"],
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

const saveModel = mongoose.model("saves", saveSchema);

export default saveModel;
