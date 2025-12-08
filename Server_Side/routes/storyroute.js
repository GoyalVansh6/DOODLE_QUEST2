import generateStory from "../controllers/storycontroller.js";
import { protect } from '../middleware/clerk.js';
import express from "express";

const router = express.Router();

router.get("/story", protect, generateStory);
export default router;