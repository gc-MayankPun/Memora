import {
  createHighlight,
  deleteHighlight,
  getHighlightsInSave,
} from "../controllers/highlight.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  createHighlightLimiter,
  deleteHighlightLimiter,
  readHighlightsLimiter,
} from "../middlewares/rateLimiter.middleware.js";
import {
  createHighlightValidator,
  deleteHighlightValidator,
  getHighlightsValidator,
} from "../validators/highlight.validator.js";

const highlightRouter = Router();

highlightRouter.post(
  "/:saveId",
  authUser,
  createHighlightLimiter,
  createHighlightValidator,
  createHighlight,
);

highlightRouter.get(
  "/:saveId",
  authUser,
  readHighlightsLimiter,
  getHighlightsValidator,
  getHighlightsInSave,
);

highlightRouter.delete(
  "/:saveId/:highlightId",
  authUser,
  deleteHighlightLimiter,
  deleteHighlightValidator,
  deleteHighlight,
);

export default highlightRouter;
