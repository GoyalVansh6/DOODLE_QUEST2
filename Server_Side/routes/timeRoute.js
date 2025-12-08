import express from "express";
import { start, stop, status, limit , streamStatus } from "../controllers/timeController.js";

const router = express.Router();

router.post("/start", start);
router.post("/stop", stop);
router.get("/status/:userId", status);
router.put("/limit", limit);
router.get("/stream/:userId", streamStatus); 

export default router;
