import express from "express";
import { fetchPermission, updatePermission } from "../controllers/cameraController.js";

const router = express.Router();

router.get("/:userId", fetchPermission);     
router.put("/update", updatePermission);     

export default router;
