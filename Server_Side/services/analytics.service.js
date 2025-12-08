import Doodle from '../models/Doodle.model.js';
import QuizAttempt from '../models/QuizAttempt.model.js';
import PuzzleProgress from '../models/PuzzleProgress.model.js';
import ScreenTime from '../models/ScreenTime.js'; 

export const getChildAnalytics = async (childId) => {
  // Calculate the date 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // --- 1. TOTALS (Existing) ---
  const totalDoodles = await Doodle.countDocuments({ childId });
  
  const quizAttempts = await QuizAttempt.find({ childId });
  const totalQuizzes = quizAttempts.length;
  
  let averageScore = 0;
  if (totalQuizzes > 0) {
    const totalScore = quizAttempts.reduce((acc, curr) => acc + curr.score, 0);
    averageScore = Math.round((totalScore / totalQuizzes) * 10) / 10; 
  }

  const totalPuzzles = await PuzzleProgress.countDocuments({ 
    childId, 
    isCompleted: true 
  });

  const screenTimeRecord = await ScreenTime.findOne({ userId: childId });
  const screenTimeMinutes = screenTimeRecord ? screenTimeRecord.timeUsed : 0;

  // --- 2. WEEKLY STATS (New) ---
  const weeklyDoodles = await Doodle.countDocuments({ 
    childId, 
    createdAt: { $gte: sevenDaysAgo } 
  });

  const weeklyQuizzes = await QuizAttempt.countDocuments({ 
    childId, 
    createdAt: { $gte: sevenDaysAgo } 
  });

  const weeklyPuzzles = await PuzzleProgress.countDocuments({ 
    childId, 
    updatedAt: { $gte: sevenDaysAgo }, // Use updatedAt for puzzles
    isCompleted: true 
  });

  // Calculate Weekly Goal Progress (Example: Goal is 20 activities per week)
  const weeklyGoalTarget = 20;
  const totalWeeklyActivities = weeklyDoodles + weeklyQuizzes + weeklyPuzzles;
  const weeklyGoalPercent = Math.min(Math.round((totalWeeklyActivities / weeklyGoalTarget) * 100), 100);


  // Return everything
  return {
    totalDoodles,
    totalQuizzes,
    averageQuizScore: averageScore,
    puzzlesSolved: totalPuzzles,
    screenTimeMinutes,
    weeklyDoodles,
    weeklyQuizzes,
    weeklyPuzzles,
    weeklyGoalPercent
  };
};