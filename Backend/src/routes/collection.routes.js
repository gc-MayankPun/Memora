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
import {
  addSaveToCollectionLimiter,
  createCollectionLimiter,
  deleteCollectionLimiter,
  readCollectionsLimiter,
  removeSaveFromCollectionLimiter,
  updateCollectionLimiter,
} from "../middlewares/rateLimiter.middleware.js";
import {
  addSaveToCollectionValidator,
  createCollectionValidator, 
  readSavesInCollectionValidator,
  removeCollectionValidator, 
  removeSaveFromCollectionValidator,
  updateCollectionValidator,
} from "../validators/collection.validator.js";

const collectionRouter = Router();

collectionRouter.post(
  "/",
  authUser,
  createCollectionLimiter,
  createCollectionValidator,
  createCollection,
);

collectionRouter.get("/", authUser, readCollectionsLimiter, getCollections);

collectionRouter.patch(
  "/:collectionId",
  authUser,
  updateCollectionLimiter,
  updateCollectionValidator,
  updateCollection,
);

collectionRouter.delete(
  "/:collectionId",
  authUser,
  deleteCollectionLimiter,
  removeCollectionValidator,
  deleteCollection,
);

collectionRouter.post(
  "/:collectionId/saves",
  authUser,
  addSaveToCollectionLimiter,
  addSaveToCollectionValidator,
  addSaveToCollection,
);

collectionRouter.delete(
  "/:collectionId/saves/:saveId",
  authUser,
  removeSaveFromCollectionLimiter,
  removeSaveFromCollectionValidator,
  removeSaveFromCollection,
);

collectionRouter.get(
  "/:collectionId/saves",
  authUser,
  readCollectionsLimiter,
  readSavesInCollectionValidator,
  getSavesInCollection,
);

export default collectionRouter;
