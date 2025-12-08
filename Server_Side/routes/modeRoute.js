import express from "express";
import { getMode , setMode } from "../controllers/modeController.js";

const router = express.Router();

router.post("/set-mode", setMode);
router.get("/get-mode/:userId", getMode);

export default router;