import express from "express";
import { analyze } from "../controllers/doodleController.js";

const router = express.Router();
router.post("/analyze", analyze);

export default router;
