import asyncHandler from 'express-async-handler';
import * as analyticsService from '../services/analytics.service.js';

// @desc    Get aggregated analytics for a child
// @route   GET /api/dashboard/stats
// @access  Private (Parent or Child)
const getDashboardStats = asyncHandler(async (req, res) => {
  // We assume the user (parent or child) is logged in.
  // For now, we'll use the logged-in user's ID.
  // In the future, if a parent logs in, they might pass a ?childId=... query param.
  const childId = req.auth.userId;

  if (!childId) {
    res.status(400);
    throw new Error('User ID not found');
  }

  const stats = await analyticsService.getChildAnalytics(childId);

  res.status(200).json(stats);
});

export { getDashboardStats };