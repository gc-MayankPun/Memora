import { Router } from "express";
import {
  deleteUser,
  getMe,
  login,
  logout,
  register,
  resendVerificationEmail,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  loginValidator,
  registerValidator,
  resendVerificationValidator,
} from "../validators/auth.validator.js";
import {
  deleteAccountLimiter,
  loginLimiter,
  logoutLimiter,
  registerLimiter,
  resendVerificationLimiter,
  verifyEmailLimiter,
} from "../middlewares/rateLimiter.middleware.js";

const authRouter = Router();

// Public Routes
authRouter.post("/register", registerLimiter, registerValidator, register);
authRouter.post("/login", loginLimiter, loginValidator, login);
authRouter.get("/verify-email", verifyEmailLimiter, verifyEmail);
authRouter.post("/logout", logoutLimiter, logout);
authRouter.post(
  "/resend-verification",
  resendVerificationLimiter,
  resendVerificationValidator,
  resendVerificationEmail,
);

// Protected Routes
authRouter.get("/get-me", authUser, getMe);
authRouter.delete(
  "/delete-account",
  authUser,
  deleteAccountLimiter,
  deleteUser,
);

export default authRouter;
