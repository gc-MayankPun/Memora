import { validate } from "../utils/validate.js";
import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers and underscores"),

  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("please provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),

  validate,
];

export const loginValidator = [
  body("username")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers and underscores"),

  body("password").notEmpty().withMessage("Password is required"),

  validate,
];

export const resendVerificationValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  validate,
];
