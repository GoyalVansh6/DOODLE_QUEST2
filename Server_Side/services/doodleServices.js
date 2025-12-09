// import { GoogleGenerativeAI } from "@google/generative-ai";
// import DoodleLog from "../models/DoodleLog.js";
// import {io } from '../testserver.js'

// const unsafeObjects = ["weapon", "gun", "knife", "blood", "bomb"];

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// export async function analyzeDoodle(imageBase64, userId) {
//   const prompt = "Recognize this child's doodle and respond with only object name.";

//   const image = {
//     inlineData: {
//       data: imageBase64.includes(",")
//   ? imageBase64.split(",")[1]
//   : imageBase64,
//       mimeType: "image/png",
//     },
//   };

//   const result = await model.generateContent([prompt, image]);
//   const label = result.response.text().toLowerCase().trim();

//   const isSafe = !unsafeObjects.some(word => label.includes(word));

//   // save
//   await DoodleLog.create({ userId, label, confidence: 0.9, isSafe });

//   // 🔥 send live alert to parent
//   if (!isSafe) {
//     io.emit("unsafe-doodle", {
//       userId,
//       label,
//       message: `Unsafe doodle detected: ${label}`
//     });
//   }

//   return {
//     label,
//     confidence: 0.9,
//     isSafe
//   };
// }

import { GoogleGenerativeAI } from "@google/genai";
import DoodleLog from "../models/DoodleLog.js";
import { io } from '../testserver.js'

const unsafeObjects = ["weapon", "gun", "knife", "blood", "bomb"];

// ✅ Use the stable model
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY }); 

export async function analyzeDoodle(imageBase64, userId) {
  // ✅ NEW STRICT PROMPT
  const prompt = `
    You are judging a child's drawing game. 
    Look at this image. 
    1. If it is just random lines, scribbles, or barely recognizable, reply with "scribble".
    2. If it clearly resembles a specific object, reply with that object's name (e.g., "giraffe", "car").
    Reply with ONLY the one word label.
  `;

  const image = {
    inlineData: {
      data: imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64,
      mimeType: "image/png",
    },
  };

  // Generate Content using standard method
  const result = await genAI.models.generateContent({
    model: "gemini-1.5-flash", // or "gemini-pro"
    contents: [
      { role: "user", parts: [{ text: prompt }, { inlineData: image.inlineData }] }
    ],
  });

  const label = result.response.text().toLowerCase().trim();
  const isSafe = !unsafeObjects.some(word => label.includes(word));

  // Save Log
  await DoodleLog.create({ userId, label, confidence: 0.9, isSafe });

  // Send Alert if unsafe
  if (!isSafe) {
    io.emit("unsafe-doodle", {
      userId,
      label,
      message: `Unsafe doodle detected: ${label}`
    });
  }

  return {
    label,
    confidence: 0.9,
    isSafe
  };
}