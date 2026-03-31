import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
  {
    highlightedText: {
      type: String,
      required: [true, "Text is required"],
      minlength: [10, "Text must not be smaller than 10 characters"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true },
);

const highlightModel = mongoose.model("highlights", highlightSchema);

export default highlightModel;
