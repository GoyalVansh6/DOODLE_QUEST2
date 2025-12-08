import mongoose from 'mongoose';

const userStatsSchema = new mongoose.Schema({
  childId: {
    type: String,
    required: true,
    unique: true,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

const UserStats = mongoose.model('UserStats', userStatsSchema);
export default UserStats;