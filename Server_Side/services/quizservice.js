import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY });


async function  quizContent(doodle,lang) {
    try{
     const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are a fun and creative quiz generator for kids aged 5–10.

Based on the doodle topic "${doodle}", generate **3 short, fun, educational quiz questions** in **JSON format** in "${lang}" language.

Each quiz question should have:
- "questionText": A simple question for kids
- "answerOptions": An array of 4 options, each with { "answerText": "...", "isCorrect": true/false }
- "funFact": A single, kid-friendly fun fact related to the correct answer

Return only valid JSON (no explanations, no extra text).
Example format:
[
  {
    "questionText": "Which animal says 'Moo'?",
    "answerOptions": [
      { "answerText": "Cow", "isCorrect": true },
      { "answerText": "Duck", "isCorrect": false },
      { "answerText": "Dog", "isCorrect": false },
      { "answerText": "Cat", "isCorrect": false }
    ],
    "funFact": "Cows can sleep while standing up!"
  }
]`,
  });
   console.log(response.text);
let quizText=response.text;
quizText = quizText.replace(/```json/g, "").replace(/```/g, "").trim();
   const quiz = JSON.parse(quizText);
    return quiz;
// return(quiz);
  
    }
    catch(error)
    {
        console.log("Error detching quiz questions.")
        throw error;
    }
}

export default quizContent;