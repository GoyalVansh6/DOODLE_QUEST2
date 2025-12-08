import asyncHandler from 'express-async-handler';
import UserReward from '../models/UserReward.model.js';
import Reward from '../models/Reward.model.js';
import * as rewardsService from '../services/rewards.service.js';

// @desc    Get all rewards for the logged-in child
const getMyRewards = asyncHandler(async (req, res) => {
  const childId = req.auth.userId;
  const userRewards = await UserReward.find({ childId: childId }).populate('rewardId');
  res.status(200).json(userRewards);
});

// @desc    Get total points for the logged-in child
const getMyPoints = asyncHandler(async (req, res) => {
  const childId = req.auth.userId;
  const points = await rewardsService.getUserPoints(childId);
  res.status(200).json({ points });
});

// @desc    Create a new badge manually (Helper)
const createReward = asyncHandler(async (req, res) => {
  const { name, description, icon, criteriaType, criteriaValue } = req.body;
  const newReward = new Reward({ name, description, icon, criteriaType, criteriaValue });
  const savedReward = await newReward.save();
  res.status(201).json(savedReward);
});

// ✅ NEW: SETUP TOOL (Run this once to fix your database)
// @desc    Initialize all Badge Definitions
// @route   GET /api/rewards/setup
const setupBadges = asyncHandler(async (req, res) => {
  const badges = [
    { 
      name: "Level 1 Badge", 
      description: "You reached 10 Points!", 
      icon: "Badge1.png", 
      criteriaType: "POINTS", 
      criteriaValue: 10 
    },
    { 
      name: "Level 2 Badge", 
      description: "You reached 100 Points! Amazing!", 
      icon: "Badge2.png", 
      criteriaType: "POINTS", 
      criteriaValue: 100 
    },
    { 
      name: "Level 3 Badge", 
      description: "500 Points! You are a star!", 
      icon: "Badge3.png", 
      criteriaType: "POINTS", 
      criteriaValue: 500 
    },
    { 
      name: "Level 4 Badge", 
      description: "1000 Points! Unstoppable!", 
      icon: "Badge4.png", 
      criteriaType: "POINTS", 
      criteriaValue: 1000 
    },
    { 
      name: "Level 5 Badge", 
      description: "2000 Points! A true Master!", 
      icon: "Badge5.png", 
      criteriaType: "POINTS", 
      criteriaValue: 2000 
    }
  ];

  // Loop through and create/update them
  for (const badge of badges) {
    await Reward.findOneAndUpdate(
      { name: badge.name }, // Find by name
      badge,                // Update with this data
      { upsert: true, new: true } // Create if doesn't exist
    );
  }

  res.status(200).json({ message: "✅ Badges Setup Successfully!", badges });
});

export { getMyRewards, getMyPoints, createReward, setupBadges };