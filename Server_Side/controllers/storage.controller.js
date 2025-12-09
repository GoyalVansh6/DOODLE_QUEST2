// import asyncHandler from 'express-async-handler';
// import Doodle from '../models/Doodle.model.js';
// import PuzzleProgress from '../models/PuzzleProgress.model.js';
// import QuizAttempt from '../models/QuizAttempt.model.js';
// import * as rewardsService from '../services/rewards.service.js'; 


// const uploadDoodle = asyncHandler(async (req, res) => {
//   // 'req.file' is added by the 'upload' (Multer) middleware
//   if (!req.file) {
//     res.status(400);
//     throw new Error('Please upload an image file');
//   }

//   const { prompt } = req.body;
//   // 'req.auth.userId' is added by the 'protect' (Clerk) middleware
//   const childId = req.auth.userId;

//   const newDoodle = new Doodle({
//     childId: childId,
//     imageUrl: req.file.path, // This is the URL from Cloudinary
//     prompt: prompt || 'Untitled Doodle',
//   });

//   const savedDoodle = await newDoodle.save();
  
//   // (it runs in the background)
//   rewardsService.checkDoodleAchievements(childId);

//   res.status(201).json(savedDoodle);
// });

// const savePuzzleProgress = asyncHandler(async (req, res) => {
//   const { puzzleName, progress, isCompleted } = req.body;
//   const childId = req.auth.userId;

//   if (!puzzleName) {
//     res.status(400);
//     throw new Error('Puzzle name is required');
//   }

//   // Find a puzzle with this name and child, and update it.
//   // 'upsert: true' means it will create a new one if it doesn't exist.
//   const updatedProgress = await PuzzleProgress.findOneAndUpdate(
//     { childId: childId, puzzleName: puzzleName },
//     { progress, isCompleted },
//     { new: true, upsert: true }
//   );

//   // (it runs in the background)
//   rewardsService.checkPuzzleAchievements(childId, updatedProgress);

//   res.status(200).json(updatedProgress);
// });

// // @desc    Get all activity history for the logged-in child
// // @route   GET /api/storage/history
// // @access  Private (Child only)
// const getStorageHistory = asyncHandler(async (req, res) => {
//   const childId = req.auth.userId;

//   // Run all database queries at the same time for speed
//   const [doodles, puzzles, quizzes] = await Promise.all([
//     Doodle.find({ childId: childId }).sort({ createdAt: -1 }),
//     PuzzleProgress.find({ childId: childId }).sort({ updatedAt: -1 }),
//     QuizAttempt.find({ childId: childId }).sort({ createdAt: -1 }),
//   ]);

//   // Return all history in one object
//   res.status(200).json({
//     doodles,
//     puzzles,
//     quizzes,
//   });
// });

// export { uploadDoodle, savePuzzleProgress, getStorageHistory };

import asyncHandler from 'express-async-handler';
import Doodle from '../models/Doodle.model.js';
import PuzzleProgress from '../models/PuzzleProgress.model.js';
import QuizAttempt from '../models/QuizAttempt.model.js';
import * as rewardsService from '../services/rewards.service.js'; 


import storyContent from "../services/storyservice.js";    
import storyimage from "../services/storyimage.js";
import quizContent from '../services/quizservice.js';
import Story from "../models/storymodel.js";
import Quiz from '../models/quizmodel.js';
import audioService from "../services/audioservice.js";
import cloudinaryaudio from "../services/cloudinaryaudio.js";

const uploadDoodle = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image file');
  }

  const { prompt } = req.body;
  const childId = req.auth.userId;

  const newDoodle = new Doodle({
    childId: childId,
    imageUrl: req.file.path,
    prompt: prompt || 'Untitled Doodle',
  });
  const savedDoodle = await newDoodle.save();


const story=await storyContent(req.query.obj,req.query.lang);
// const img=await storyimage(story);
const img="https://cdn.photographylife.com/wp-content/uploads/2014/06/Nikon-D810-Image-Sample-6.jpg"

//  const stream = await audioService(story);

//  const chunks = [];
// for await (const chunk of audioStream) {
//   chunks.push(chunk);
// }
// const audioBuffer = Buffer.concat(chunks);
// const audioUrl = await uploadAudioStreamToCloudinary(
//     audioBuffer,
//     "story_audio"
//   );
  const newStory= new Story({
  doodleId:savedDoodle._id,
  childId: childId,
  storyText:story,
  storyImage:img,
  // storyAudio:audioUrl,
  });
const savedStory=await newStory.save();

const quizquestions=await quizContent(req.query.obj,req.query.lang);
// const currentQuestion=1;
// const textToSpeak = `
//     Question: ${quizquestions[currentQuestion].questionText}.
//     Options are: 
//     ${quizquestions[currentQuestion].answerOptions
//       .map(o => o.answerText)
//       .join(", ")}.
    
//       Also,here is a fun fact :
//      ${quizquestions[currentQuestion].funFact}.
//   `;
// const streamquiz1 = await audioService(textToSpeak);
// currentQuestion++;

//  const chunksquiz1 = [];
// for await (const chunk of audioStream) {
//   chunksquiz1.push(chunk);
// }
// const audioBufferquiz1 = Buffer.concat(chunksquiz1);
// const audioUrlquiz1 = await uploadAudioStreamToCloudinary(
//     audioBuffer,
//     "quiz_audio"
//   );

//   const streamquiz2 = await audioService(textToSpeak);
// currentQuestion++;

//  const chunksquiz2 = [];
// for await (const chunk of audioStream) {
//   chunksquiz2.push(chunk);
// }
// const audioBufferquiz2 = Buffer.concat(chunksquiz2);
// const audioUrlquiz2= await uploadAudioStreamToCloudinary(
//     audioBuffer,
//     "quiz_audio"
//   );

//   const streamquiz3 = await audioService(textToSpeak);
// currentQuestion++;

//  const chunksquiz3 = [];
// for await (const chunk of audioStream) {
//   chunksquiz.push(chunk);
// }
// const audioBufferquiz3 = Buffer.concat(chunksquiz3);
// const audioUrlquiz3 = await uploadAudioStreamToCloudinary(
//     audioBuffer,
//     "quiz_audio"
//   );
const newQuiz=new Quiz({
   doodleId:savedDoodle._id,
  childId: childId,
  questions:quizquestions,
  // audiourl1:audioUrlquiz1,
  // audiourl2:audioUrlquiz2,
  // audiourl3:audioUrlquiz3,
})
  

const savedquiz=await newQuiz.save();
  rewardsService.addPoints(childId, 20);

  res.status(201).json(savedDoodle);
});

const savePuzzleProgress = asyncHandler(async (req, res) => {
  const { puzzleName, progress, isCompleted } = req.body;
  const childId = req.auth.userId;

  if (!puzzleName) {
    res.status(400);
    throw new Error('Puzzle name is required');
  }

  const updatedProgress = await PuzzleProgress.findOneAndUpdate(
    { childId: childId, puzzleName: puzzleName },
    { progress, isCompleted },
    { new: true, upsert: true }
  );
  
  // You can add points for puzzles here if you want!

  res.status(200).json(updatedProgress);
});

// const getStorageHistory = asyncHandler(async (req, res) => {
//   const childId = req.auth.userId;

//   const [doodles, puzzles, quizzes,stories] = await Promise.all([
//     Doodle.find({ childId: childId }).sort({ createdAt: -1 }),
//     PuzzleProgress.find({ childId: childId }).sort({ updatedAt: -1 }),
//     QuizAttempt.find({ childId: childId }).sort({ createdAt: -1 }),
//      Story.find({ childId }).sort({ createdAt: -1 }),
//   ]);

//   res.status(200).json({ doodles, puzzles, quizzes,stories });
// });

const getStorageHistory = asyncHandler(async (req, res) => {
  const childId = req.auth.userId;

  const [
    doodles,
    puzzles,
    quizAttempts,
    stories,
    quizzes
  ] = await Promise.all([

    // 1. DOODLES
    Doodle.find({ childId }).sort({ createdAt: -1 }).lean(),

    // 2. PUZZLES
    PuzzleProgress.find({ childId }).sort({ updatedAt: -1 }).lean(),

    // 3. QUIZ ATTEMPTS
    QuizAttempt.find({ childId }).sort({ createdAt: -1 }).lean(),

    // 4. STORIES
    Story.find({ childId }).sort({ createdAt: -1 }).lean(),

    // 5. REAL QUIZZES
    Quiz.find({ childId }).sort({ createdAt: -1 }).lean(),
  ]);
console.log(stories,quizAttempts)
  return res.status(200).json({
    doodles,
    puzzles,
    stories,
    quizzes,        
    quizAttempts,   
  });
});
export { uploadDoodle, savePuzzleProgress, getStorageHistory };