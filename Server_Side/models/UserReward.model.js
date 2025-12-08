import mongoose from 'mongoose';

const userRewardSchema = new mongoose.Schema(
  {
    childId: {
      type: String,
      required: true,
    },
    // Links to the badge in the 'Reward' collection
    rewardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reward',
      required: true,
    },
  },
  { timestamps: true }
);

// This ensures a child cannot get the *exact same* badge twice.
userRewardSchema.index({ childId: 1, rewardId: 1 }, { unique: true });

const UserReward = mongoose.model('UserReward', userRewardSchema);
export default UserReward;