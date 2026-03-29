import { Router } from "express";
import {
  createSave,
  getSaves,
  getSave,
  checkSave,
  updateSave,
  deleteSave,
  updateTags,
} from "../controllers/saves.controller.js"; 

const savesRouter = Router();

savesRouter.post("/", createSave);
savesRouter.get("/", getSaves);
savesRouter.patch("/:id/update-favorite", updateSave);
savesRouter.patch("/:id/update-tags", updateTags);
savesRouter.get("/exists", checkSave);
savesRouter.get("/:id", getSave);
savesRouter.delete("/:id/delete", deleteSave);

export default savesRouter;
