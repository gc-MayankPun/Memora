import { param, query } from "express-validator";
import { validate } from "../utils/validate.js";
import { body } from "express-validator";

export const createSaveValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),
  body("url")
    .notEmpty()
    .withMessage("Url is required")
    .isURL()
    .withMessage("Invalid URL"),
  body("note")
    .trim()
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Note too long"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),
  validate,
];

export const updateSaveValidator = [
  param("saveId").isMongoId().withMessage("Invalid save ID"),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title must not exceed 200 characters"),
  body("note")
    .trim()
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Note too long"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),
  validate,
];

export const checkSaveValidator = [
  query("url")
    .notEmpty()
    .withMessage("Url is required")
    .isURL()
    .withMessage("Invalid URL"),
  validate,
];

export const deleteSaveValidator = [
  param("saveId")
    .notEmpty()
    .withMessage("Save ID is required")
    .isMongoId()
    .withMessage("Invalid Save ID"),
  validate,
];

export const getSaveValidator = [
  param("saveId")
    .notEmpty()
    .withMessage("Save ID is required")
    .isMongoId()
    .withMessage("Invalid Save ID"),
  validate,
];

export const searchSaveValidator = [
  query("query")
    .notEmpty()
    .withMessage("Search Query is required")
    .isString()
    .withMessage("Invalid Search Query"),
  validate,
];

export const updateFavoriteValidator = [
  param("saveId")
    .notEmpty()
    .withMessage("Save ID is required")
    .isMongoId()
    .withMessage("Invalid Save ID"),
  body("isFavorite").isBoolean().withMessage("isFavorite must be a boolean"),
  validate,
];

export const updateTagsValidator = [
  param("saveId")
    .notEmpty()
    .withMessage("Save ID is required")
    .isMongoId()
    .withMessage("Invalid Save ID"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),
  validate,
];

export const updateNoteValidator = [
  param("saveId")
    .notEmpty()
    .withMessage("Save ID is required")
    .isMongoId()
    .withMessage("Invalid Save ID"),
  body("note")
    .trim()
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Note too long"),
  validate,
];
