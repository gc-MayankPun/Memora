import jwt from "jsonwebtoken";

// Models
import collectionSavesModel from "../models/collectionSaves.model.js";
import highlightSaveModel from "../models/highlightSave.model.js";
import collectionModel from "../models/collections.model.js";
import highlightModel from "../models/highlight.model.js";
import saveModel from "../models/saves.model.js";
import userModel from "../models/user.model.js";

// Utils
import { emailHTML, verifyEmailHTML } from "../utils/util.js";
import { cookieOptions } from "../utils/constants.js";

// Services
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      success: false,
      message: "Username or email already exists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
    verificationExpiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
  });

  const emailVerificationToken = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Memora!",
    html: emailHTML(username, emailVerificationToken),
  });

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function login(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  if (user.verified === false) {
    return res.status(400).json({
      success: false,
      message: "Please verify your email before logging in",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token, cookieOptions);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function logout(req, res) {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
}

export async function deleteUser(req, res) {
  try {
    const userId = req.user.id;

    await highlightSaveModel.deleteMany({ userId });
    await highlightModel.deleteMany({ userId });
    await collectionSavesModel.deleteMany({ userId });
    await collectionModel.deleteMany({ userId });
    await saveModel.deleteMany({ userId });

    await userModel.findByIdAndDelete(userId);

    res.clearCookie("token", cookieOptions);
    res.status(200).json({
      success: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user account",
    });
  }
}

export async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "User not found",
      });
    }

    if (user.verificationExpiresAt < new Date()) {
      return res.status(400).send(`
      <h1>Link Expired</h1>
      <p>Your verification link expired. Please register again.</p>
    `);
    }

    user.verified = true;
    user.verificationExpiresAt = null;
    await user.save();

    return res.send(verifyEmailHTML());
  } catch (err) {
    return res.status(400).json({
      message: "Invalid or expired token",
      success: false,
      err: err.message,
    });
  }
}

export async function resendVerificationEmail(req, res) {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    user.verificationExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    const emailVerificationToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    await sendEmail({
      to: user.email,
      subject: "Memora - Email Verification",
      html: emailHTML(user.username, emailVerificationToken),
    });

    res.status(200).json({
      success: true,
      message: "Verification email resent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to resend verification email",
    });
  }
}
