import mongoose from "mongoose";
import Doodle from "./Doodle.model.js";
const quizSchema = new mongoose.Schema(
  {
    doodleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doodle",
      required: true,
    },
    childId: {
      type: String,
      required: true,
    },
   questions: [
      {
        questionText: { type: String, required: true },
        answerOptions: [
          {
            answerText: { type: String, required: true },
            isCorrect: { type: Boolean, default: false },
          },
        ],
        funFact: { type: String },
      }
       ],
//         audiourl1: {
//   type: String,
//   required: true
// },
//  audiourl2: {
//   type: String,
//   required: true
// },
//  audiourl3: {
//   type: String,
//   required: true
// }
    
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
