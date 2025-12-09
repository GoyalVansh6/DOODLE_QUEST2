// app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import timeRoute from "./routes/timeRoute.js";
import storyroute from "./routes/storyroute.js";
import quizroute from "./routes/quizroute.js";
import cameraRoutes from "./routes/cameraRoute.js";
import storageRoutes from "./routes/storage.routes.js";
import rewardsRoutes from "./routes/rewards.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import taskRoutes from "./routes/task.routes.js";
import doodleRoute from "./routes/doodleRoute.js";
import modeRoutes from "./routes/modeRoute.js";
import audioRoute from "./routes/audioroute.js";
import parentalRoutes from "./routes/parentalRoute.js";
import nounRoute from "./routes/nounRoute.js";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ROUTES
app.use("/api/time", timeRoute);
app.use("/api/story", storyroute);
app.use("/api/quiz", quizroute);
app.use("/api/storage", storageRoutes);
app.use("/api/rewards", rewardsRoutes);
app.use("/api/doodle", doodleRoute);
app.use("/api/camera", cameraRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/mode", modeRoutes);
app.use("/api",audioRoute);
app.use("/api/parental", parentalRoutes);
app.use("/api/noun", nounRoute);


// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});


//Serve PUBLIC FOLDER
app.use("/public", express.static("public"));

export default app;
