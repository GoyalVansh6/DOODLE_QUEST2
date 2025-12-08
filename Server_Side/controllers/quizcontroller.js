
// import asyncHandler from 'express-async-handler';
// import QuizAttempt from '../models/QuizAttempt.model.js';
// import quizContent from "../services/quizservice.js";    
// import audioService from "../services/audioservice.js";
// import * as rewardsService from '../services/rewards.service.js';

// async function generateQuiz(req, res)
// {
// const quiz=await quizContent(req.query.obj,req.query.lang)
// audioService(quiz);
// res.status(200).json({ quiz });
// }

// // --- NEW FUNCTION TO SUBMIT QUIZ RESULTS ---
// const submitQuiz = asyncHandler(async (req, res) => {
//   // 1. Get the data from the frontend
//   const { quizName, score, accuracy, totalQuestions, correctAnswers } = req.body;
  
//   // 2. Get the child's ID from Clerk
//   const childId = req.auth.userId;

//   // 3. Create a new document using the model
//   const newAttempt = new QuizAttempt({
//     childId,
//     quizName,
//     score,
//     accuracy,
//     totalQuestions,
//     correctAnswers,
//   });

//   // 4. Save it to the database
//   await newAttempt.save();
  
//   // (it runs in the background)
//   rewardsService.checkQuizAchievements(childId, newAttempt);
//   // 5. Send a success response
//   res.status(201).json({ message: 'Quiz attempt saved successfully!' });
  
// });

// // --- UPDATE EXPORTS ---
// export { generateQuiz, submitQuiz };

import asyncHandler from 'express-async-handler';
import QuizAttempt from '../models/QuizAttempt.model.js';
import quizContent from "../services/quizservice.js";    
import audioService from "../services/audioservice.js";
import * as rewardsService from '../services/rewards.service.js';
import Quiz from '../models/quizmodel.js';
async function generateQuiz(req, res)
{
// const quiz=await quizContent(req.query.obj,req.query.lang)
// // audioService(quiz);
// res.status(200).json({ quiz });

 const childId = req.auth.userId;
const quizId=req.query.Id;
if(quizId)
{
  const quiz = await Quiz.findById(quizId);
   res.status(200).json({
    quizId: quiz._id,
    doodleId: quiz.doodleId?._id,
    questions: quiz.questions
  });
  // return res.status(200).json(quiz);

}
 const quiz = await Quiz.findOne({ childId })
       .sort({ createdAt: -1 });  // latest
 
     if (!quiz) {
       return res.status(404).json({ message: "No quizzes found" });}
   res.status(200).json({
    quizId: quiz._id,
    doodleId: quiz.doodleId?._id,
    questions: quiz.questions
  });
        //  res.status(200).json(quiz);

}
const submitQuiz = asyncHandler(async (req, res) => {
  const { score, accuracy, totalQuestions, correctAnswers,doodleId,quizId } = req.body;
  const childId = req.auth.userId;

  const newAttempt = new QuizAttempt({
    childId,
    doodleId,
    quizId,
    score,
    accuracy,
    totalQuestions,
    correctAnswers,

  });

  await newAttempt.save();
  
  // ✅ GIVE 10 POINTS
  rewardsService.addPoints(childId, 10);

  res.status(201).json({ message: 'Quiz attempt saved successfully!' });
});

export { generateQuiz, submitQuiz };