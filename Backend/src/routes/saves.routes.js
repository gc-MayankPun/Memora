import { Router } from "express";
import {
  createSave,
  updateSave,
  getSaves,
  getSave,
  checkSave,
  updateFavorite,
  deleteSave,
  updateTags,
  updateNote,
} from "../controllers/saves.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  createSaveLimiter,
  deleteSaveLimiter,
  readSavesLimiter,
  updateSaveLimiter,
} from "../middlewares/rateLimiter.middleware.js";
import {
  checkSaveValidator,
  createSaveValidator,
  deleteSaveValidator,
  getSaveValidator,
  updateFavoriteValidator,
  updateNoteValidator,
  updateSaveValidator,
  updateTagsValidator,
} from "../validators/saves.validator.js";

const savesRouter = Router();

savesRouter.post(
  "/",
  authUser,
  createSaveLimiter,
  createSaveValidator,
  createSave,
);

savesRouter.patch(
  "/:saveId/update",
  authUser,
  updateSaveLimiter,
  updateSaveValidator,
  updateSave,
);

savesRouter.get("/", authUser, readSavesLimiter, getSaves);

savesRouter.patch(
  "/:saveId/update-favorite",
  authUser,
  updateSaveLimiter,
  updateFavoriteValidator,
  updateFavorite,
);

savesRouter.patch(
  "/:saveId/update-tags",
  authUser,
  updateSaveLimiter,
  updateTagsValidator,
  updateTags,
);

savesRouter.patch(
  "/:saveId/update-note",
  authUser,
  updateSaveLimiter,
  updateNoteValidator,
  updateNote,
);

savesRouter.get(
  "/exists",
  authUser,
  readSavesLimiter,
  checkSaveValidator,
  checkSave,
);

savesRouter.get(
  "/:saveId",
  authUser,
  readSavesLimiter,
  getSaveValidator,
  getSave,
);

savesRouter.delete(
  "/:saveId/delete",
  authUser,
  deleteSaveLimiter,
  deleteSaveValidator,
  deleteSave,
);

export default savesRouter;
