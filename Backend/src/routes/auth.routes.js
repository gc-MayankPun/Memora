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
} from "../validators/auth.validator.js";

const authRouter = Router();

// Public Routes
authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/resend-verification", resendVerificationEmail);

// Protected Routes
authRouter.get("/get-me", authUser, getMe);
authRouter.post("/logout", authUser, logout);
authRouter.delete("/delete-user", authUser, deleteUser);

export default authRouter;
