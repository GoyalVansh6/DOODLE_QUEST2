import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { protect } from '../middleware/clerk.js';

const router = express.Router();

// This route is protected by Clerk
router.get('/stats', protect, getDashboardStats);

export default router;