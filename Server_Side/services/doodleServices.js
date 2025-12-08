import { GoogleGenerativeAI } from "@google/generative-ai";
import DoodleLog from "../models/DoodleLog.js";
import {io } from '../testserver.js'

const unsafeObjects = ["weapon", "gun", "knife", "blood", "bomb"];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function analyzeDoodle(imageBase64, userId) {
  const prompt = "Recognize this child's doodle and respond with only object name.";

  const image = {
    inlineData: {
      data: imageBase64.includes(",")
  ? imageBase64.split(",")[1]
  : imageBase64,
      mimeType: "image/png",
    },
  };

  const result = await model.generateContent([prompt, image]);
  const label = result.response.text().toLowerCase().trim();

  const isSafe = !unsafeObjects.some(word => label.includes(word));

  // save
  await DoodleLog.create({ userId, label, confidence: 0.9, isSafe });

  // 🔥 send live alert to parent
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
