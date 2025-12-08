import mongoose from 'mongoose';
import Quiz from "./quizmodel.js";
import Doodle from "./Doodle.model.js";
const quizAttemptSchema = new mongoose.Schema(
  {
    // Store the Clerk User ID as a string
    childId: {
      type: String,
      required: true,
    },
    doodleId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doodle",
          required:true,
    },
     quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    // quizName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    score: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);

export default QuizAttempt;