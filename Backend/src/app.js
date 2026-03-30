import collectionRouter from "./routes/collection.routes.js";
import savesRouter from "./routes/saves.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

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
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);

app.use("/api/saves", savesRouter);
app.use("/api/auth", authRouter);
app.use("/api/collections", collectionRouter);

app.use("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
