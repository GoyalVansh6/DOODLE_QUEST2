import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  // A string for the frontend icon, e.g., 'Badge1.png'
  icon: {
    type: String,
    required: true,
  },
  // This tells our service what logic to use
  criteriaType: {
    type: String,
    // ✅ UPDATE: ADD 'POINTS' TO THIS LIST
    enum: ['DOODLE_COUNT', 'QUIZ_SCORE', 'PUZZLE_COMPLETE', 'POINTS'],
    required: true,
  },
  // The value needed to earn the badge (e.g., 100)
  criteriaValue: {
    type: Number,
    required: true,
  },
});

const Reward = mongoose.model('Reward', rewardSchema);
export default Reward;