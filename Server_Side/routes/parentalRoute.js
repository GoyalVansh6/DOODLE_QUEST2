import express from "express";
import { getAgeBasedSuggestions } from "../controllers/parentalController.js";

const router = express.Router();

// Route: /api/parental/suggestions
router.get("/suggestions", getAgeBasedSuggestions);

export default router;