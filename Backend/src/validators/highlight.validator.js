import { body, param } from "express-validator";
import { validate } from "../utils/validate.js";

export const createHighlightValidator = [
  param("saveId").isMongoId().withMessage("Invalid save ID"),
  body("highlightedText")
    .trim()
    .notEmpty()
    .withMessage("Highlighted text is required")
    .isLength({ min: 10 })
    .withMessage("Highlighted text must be at least 10 characters long"),
  validate,
];

export const getHighlightsValidator = [
  param("saveId").isMongoId().withMessage("Invalid save ID"),
  validate,
];

export const deleteHighlightValidator = [
  param("saveId").isMongoId().withMessage("Invalid save ID"),
  param("highlightId").isMongoId().withMessage("Invalid highlight ID"),
  validate,
];