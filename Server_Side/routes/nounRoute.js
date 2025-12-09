import express from "express";
import { getIconSuggestions } from "../controllers/nounController.js";

const router = express.Router();

router.get("/icons", getIconSuggestions);

export default router;