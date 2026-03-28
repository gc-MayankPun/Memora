import savesRouter from "./routes/saves.routes.js";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/saves", savesRouter);

export default app;
