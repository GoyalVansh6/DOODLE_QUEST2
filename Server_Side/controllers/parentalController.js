import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAgeBasedSuggestions = async (req, res) => {
  try {
    
    const Age = Math.floor(Math.random() * (12 - 5 + 1)) + 3; 

    // Using gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

    const prompt = `
      You are a child development expert.
      Generate 5 simple, one-word drawing suggestions suitable for a child of age ${randomAge} years old.
      
      Rules:
      1. If the age is 4-5, suggest very simple shapes or objects (e.g., Sun, Ball).
      2. If the age is 6-7, suggest detailed objects (e.g., Robot, Castle).
      3. If the age is 8-9, suggest complex scenes or concepts (e.g., Galaxy, Future).
      
      Return ONLY a raw JSON array of strings. Do not include markdown formatting like \`\`\`json.
      Example output: ["Tree", "Cat", "House", "Car", "Apple"]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Cleanup
    text = text.replace(/```json|```/g, "").trim();
    
    // Parse the JSON
    const suggestions = JSON.parse(text);

    // Send back the Age and the Suggestions
    res.status(200).json({
      success: true,
      childAge: Age,
      suggestions: suggestions
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ success: false, message: "Failed to generate suggestions" });
  }
};