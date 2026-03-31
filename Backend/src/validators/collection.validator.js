import { validate } from "../utils/validate.js";
import { param } from "express-validator";
import { body } from "express-validator";

export const createCollectionValidator = [
  body("name").trim().notEmpty().withMessage("Collection name is required"),
  body("description").trim(),
  validate,
];

export const updateCollectionValidator = [
  param("collectionId").isMongoId().withMessage("Invalid collection ID"),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Collection name cannot be empty"),
  body("description").optional().trim(),
  validate,
];

export const removeCollectionValidator = [
  param("collectionId").isMongoId().withMessage("Invalid collection ID"),
  validate,
];

export const removeSaveFromCollectionValidator = [
  param("collectionId").isMongoId().withMessage("Invalid collection ID"),
  param("saveId").isMongoId().withMessage("Invalid save ID"),
  validate,
];

export const addSaveToCollectionValidator = [
  param("collectionId").isMongoId().withMessage("Invalid collection ID"),
  body("saveId").isMongoId().withMessage("Save ID should be a Mongo ID"),
  validate,
];

export const readSavesInCollectionValidator = [
  param("collectionId").isMongoId().withMessage("Invalid collection ID"),
  validate,
];
