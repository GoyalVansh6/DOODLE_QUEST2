import express from 'express';
import { 
  getMyRewards, 
  getMyPoints, 
  createReward, 
  setupBadges // ✅ Import the new function
} from '../controllers/rewards.controller.js';
import { protect } from '../middleware/clerk.js';

const router = express.Router();

router.get('/my-rewards', protect, getMyRewards);
router.get('/my-points', protect, getMyPoints);
router.post('/create', protect, createReward);

// ✅ ADD THIS ROUTE (No protect needed for this setup tool)
router.get('/setup', setupBadges);

export default router;