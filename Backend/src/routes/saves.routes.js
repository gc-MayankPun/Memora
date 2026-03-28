import { Router } from "express";
import {
  createSave,
  getSaves,
  getSave,
  checkSave,
  deleteSave,
} from "../controllers/saves.controller.js";

const savesRouter = Router();

savesRouter.post("/", createSave);
savesRouter.get("/", getSaves);
savesRouter.get("/exists", checkSave);
savesRouter.get("/:id", getSave);
savesRouter.delete("/:id", deleteSave);

export default savesRouter;
