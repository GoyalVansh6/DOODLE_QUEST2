import Reward from '../models/Reward.model.js';
import UserReward from '../models/UserReward.model.js';
import UserStats from '../models/UserStats.model.js';

// Define the Point Thresholds mapping
const BADGE_THRESHOLDS = {
  10: "Level 1 Badge",   // Badge1.png
  100: "Level 2 Badge",  // Badge2.png
  500: "Level 3 Badge",  // Badge3.png
  1000: "Level 4 Badge", // Badge4.png
  2000: "Level 5 Badge", // Badge5.png
};

/**
 * Adds points to a user and checks for new badges
 */
export const addPoints = async (childId, amount) => {
  try {
    // 1. Find or Create Stats
    let stats = await UserStats.findOne({ childId });
    if (!stats) {
      stats = await UserStats.create({ childId, totalPoints: 0 });
    }

    // 2. Update Points
    stats.totalPoints += amount;
    await stats.save();
    
    console.log(`User ${childId} gained ${amount} points. Total: ${stats.totalPoints}`);

    // 3. Check for Badges
    // We check if the new total crosses any threshold
    for (const [threshold, badgeName] of Object.entries(BADGE_THRESHOLDS)) {
      const limit = parseInt(threshold);
      
      if (stats.totalPoints >= limit) {
        // Find the badge definition in DB
        const rewardDef = await Reward.findOne({ name: badgeName });
        
        if (rewardDef) {
          // Check if they already have it
          const alreadyEarned = await UserReward.findOne({ 
            childId, 
            rewardId: rewardDef._id 
          });

          if (!alreadyEarned) {
            await UserReward.create({ childId, rewardId: rewardDef._id });
            console.log(`🎉 Awarded ${badgeName} to ${childId}!`);
          }
        }
      }
    }

  } catch (error) {
    console.error("Error adding points:", error);
  }
};

/**
 * Get total points for a user
 */
export const getUserPoints = async (childId) => {
  const stats = await UserStats.findOne({ childId });
  return stats ? stats.totalPoints : 0;
};

// Keep these empty functions to prevent errors if other files still import them
export const checkDoodleAchievements = async () => {};
export const checkQuizAchievements = async () => {};
export const checkPuzzleAchievements = async () => {};