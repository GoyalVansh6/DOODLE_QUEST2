import express from 'express';
import {
  uploadDoodle,
  savePuzzleProgress,
  getStorageHistory,
} from '../controllers/storage.controller.js';
import { protect } from '../middleware/clerk.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post(
  '/upload-doodle',
  protect,
  upload.single('doodleImage'), // 'doodleImage' must match the form field name
  uploadDoodle
);

// This route is for POST /api/storage/save-puzzle
router.post('/save-puzzle', protect, savePuzzleProgress);

// This route is for GET /api/storage/history
router.get('/history', protect, getStorageHistory);

export default router;