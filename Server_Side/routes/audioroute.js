import express from "express";
import Generateaudio from "../controllers/audiocontroller.js";
const router = express.Router();

router.get("/audio", Generateaudio);
export default router;