import mongoose from "mongoose";

const collectionSavesSchema = new mongoose.Schema(
  {
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "collections",
      required: [true, "Collection ID is required"],
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

collectionSavesSchema.index({ collectionId: 1 });
collectionSavesSchema.index({ saveId: 1 }); 
collectionSavesSchema.index(
  { collectionId: 1, saveId: 1, userId: 1 },
  { unique: true },
);

const collectionSavesModel = mongoose.model(
  "collectionSaves",
  collectionSavesSchema,
);

export default collectionSavesModel;
