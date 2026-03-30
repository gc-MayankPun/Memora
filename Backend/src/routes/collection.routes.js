import { Router } from "express";
import {
  addSaveToCollection,
  createCollection,
  deleteCollection,
  getCollections,
  getSavesInCollection,
  removeSaveFromCollection,
  updateCollection,
} from "../controllers/collection.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const collectionRouter = Router();

collectionRouter.post("/", authUser, createCollection);
collectionRouter.get("/", authUser, getCollections);
collectionRouter.patch("/:collectionId", authUser, updateCollection);
collectionRouter.delete("/:collectionId", authUser, deleteCollection);
collectionRouter.post("/:collectionId/saves", authUser, addSaveToCollection);
collectionRouter.delete("/:collectionId/saves/:saveId", authUser, removeSaveFromCollection);
collectionRouter.get("/:collectionId/saves", authUser, getSavesInCollection);

export default collectionRouter;
