// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// // 1. Ensure env variables are loaded
// dotenv.config();

// export const getAgeBasedSuggestions = async (req, res) => {
//   try {
//     if (!process.env.GEMINI_API_KEY) {
//       console.error(" CRITICAL ERROR: GEMINI_API_KEY is missing from .env file");
//       return res.status(500).json({ success: false, message: "Server Missing API Key" });
//     }

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); 

//     // Use default age if not provided
//     const ageParam = req.query.age;
//     const childAge = ageParam ? parseInt(ageParam) : 7; 

//     const prompt = `
//       Generate a JSON array of 5 simple one-word drawing suggestions for a ${childAge} year old child.
//       Output ONLY raw JSON. No markdown.
//       Example: ["Sun", "Cat", "Ball"]
//     `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
    
//     // Clean up text (remove ```json marks if present)
//     const cleanText = text.replace(/```json|```/g, "").trim();
//     const suggestions = JSON.parse(cleanText);

//     res.status(200).json({
//       success: true,
//       childAge: childAge,
//       suggestions: suggestions
//     });

//   } catch (error) {
//     console.error(" GEMINI API FAILED:", error);
    
//     res.status(500).json({ 
//         success: false, 
//         message: error.message || "Failed to generate suggestions" 
//     });
//   }
// };

import Groq from "groq-sdk";
import dotenv from "dotenv";

// 1. Ensure env variables are loaded
dotenv.config();

export const getAgeBasedSuggestions = async (req, res) => {
  try {
    // Check API Key
    if (!process.env.GROQ_API_KEY) {
      console.error(" CRITICAL ERROR: GROQ_API_KEY is missing from .env file");
      return res.status(500).json({ success: false, message: "Server Missing API Key" });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Use passed age or default to 7
    const ageParam = req.query.age;
    const childAge = ageParam ? parseInt(ageParam) : 7; 

    // Prompt specifically asking for JSON
    const prompt = `
      You are a helpful assistant for a child's drawing app.
      Generate a JSON array of 5 simple, creative, one-word drawing suggestions suitable for a ${childAge} year old child.
      Strictly output ONLY the raw JSON array. Do not add markdown formatting like \`\`\`json.
      Example: ["Sun", "Rocket", "Tree", "Cat", "House"]
    `;

    console.log(" Asking Groq (Llama3) for suggestions...");
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile", // Fast & Free model
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content || "";
    console.log(" Groq Raw Response:", text);

    // Clean up text (just in case AI adds markdown)
    const cleanText = text.replace(/```json|```/g, "").trim();
    
    let suggestions;
    try {
        suggestions = JSON.parse(cleanText);
    } catch (parseError) {
        console.error(" AI returned invalid JSON. Using fallback.");
        suggestions = ["Sun", "Tree", "Flower", "House", "Star"]; 
    }

    if (!Array.isArray(suggestions)) {
        suggestions = ["Sun", "Tree", "Flower", "House", "Star"];
    }

    res.status(200).json({
      success: true,
      childAge: childAge,
      suggestions: suggestions
    });

  } catch (error) {
    console.error(" GROQ API FAILED:", error);
    res.status(500).json({ 
        success: false, 
        message: error.message || "Failed to generate suggestions" 
    });
  }
};