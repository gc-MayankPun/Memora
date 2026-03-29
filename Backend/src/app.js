import savesRouter from "./routes/saves.routes.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

app.use("/api/saves", savesRouter);
app.use("/api/auth", authRouter);

export default app;
