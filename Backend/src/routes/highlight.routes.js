import {
  createHighlight,
  deleteHighlight,
  getHighlightsInSave,
} from "../controllers/highlight.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const highlightRouter = Router();

highlightRouter.post("/:saveId", authUser, createHighlight);
highlightRouter.get("/:saveId", authUser, getHighlightsInSave);
highlightRouter.delete("/:saveId/:highlightId", authUser, deleteHighlight);

export default highlightRouter;
