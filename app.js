import express from "express";
import { config } from "dotenv";
import UserRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middlewares/err.js";
export const app = express();
config({
  path: "./config.env",
});
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    allowedHeaders: ["Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/task", taskRouter);
app.get("/", (_, res) => {
  res.send("App is Working");
});
app.use(errorMiddleware);
