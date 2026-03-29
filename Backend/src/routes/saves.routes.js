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
} from "../controllers/saves.controller.js"; 

const savesRouter = Router();

savesRouter.post("/", createSave);
savesRouter.patch("/update", updateSave);
savesRouter.get("/", getSaves);
savesRouter.patch("/:id/update-favorite", updateFavorite);
savesRouter.patch("/:id/update-tags", updateTags);
savesRouter.get("/exists", checkSave);
savesRouter.get("/:id", getSave);
savesRouter.delete("/:id/delete", deleteSave);

export default savesRouter;
