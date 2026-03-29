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
  updateNote
} from "../controllers/saves.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const savesRouter = Router();

savesRouter.post("/", authUser, createSave);
savesRouter.patch("/update", authUser, updateSave);
savesRouter.get("/", authUser, getSaves);
savesRouter.patch("/:id/update-favorite", authUser, updateFavorite);
savesRouter.patch("/:id/update-tags", authUser, updateTags);
savesRouter.patch("/:id/update-note", authUser, updateNote);
savesRouter.get("/exists", authUser, checkSave);
savesRouter.get("/:id", authUser, getSave);
savesRouter.delete("/:id/delete", authUser, deleteSave);

export default savesRouter;
