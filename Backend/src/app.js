import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

// Routes
import collectionRouter from "./routes/collection.routes.js";
import highlightRouter from "./routes/highlight.routes.js";
import savesRouter from "./routes/saves.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [process.env.FRONTEND_URL];
      if (
        !origin ||
        allowed.includes(origin) ||
        origin.startsWith("chrome-extension://")
      ) {
        callback(null, true);
      } else {
        // Allow ALL origins for extension content scripts
        // The auth is handled by cookies, not origin
        callback(null, true);
      }
    },
    credentials: true,
  }),
);

app.use("/api/saves", savesRouter);
app.use("/api/auth", authRouter);
app.use("/api/highlights", highlightRouter);
app.use("/api/collections", collectionRouter);

app.use("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
