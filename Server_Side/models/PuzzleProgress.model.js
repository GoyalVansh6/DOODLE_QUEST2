import mongoose from 'mongoose';

const puzzleProgressSchema = new mongoose.Schema(
  {
    // Store the Clerk User ID as a string
    childId: {
      type: String,
      required: true,
    },
    puzzleName: {
      type: String,
      required: true,
      trim: true,
    },
    // Store progress as a percentage
    progress: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Adds 'createdAt' and 'updatedAt'
);

const PuzzleProgress = mongoose.model('PuzzleProgress', puzzleProgressSchema);
export default PuzzleProgress;