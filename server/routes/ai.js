const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Helper function to extract JSON array from text
const cleanAndParseJSON = (text) => {
  try {
    // 1. Try standard cleanup
    let cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    // 2. Fallback: Find the first '[' and last ']'
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1) {
      const jsonSnippet = text.substring(firstBracket, lastBracket + 1);
      return JSON.parse(jsonSnippet);
    }
    throw new Error("AI did not return valid JSON array");
  }
};

// ==========================================
// 1. QUIZ GENERATION
// ==========================================
router.post('/quiz', async (req, res) => {
  const { videoTitle, description } = req.body;
  
  console.log(`\n📢 Generating Quiz for: ${videoTitle}`);

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("MISSING API KEY in .env file");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // ✅ CHANGED MODEL TO 'gemini-pro' (Most Stable)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a Senior Technical Interviewer. 
      Video: "${videoTitle}" (${description ? description.substring(0, 100) : ''}...).
      
      Task: Create 3 HARD multiple choice questions.
      Output: PURE JSON Array only. No markdown.
      Format: [{ "question": "...", "options": ["A","B","C","D"], "correctAnswer": "..." }]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ AI Replied:", text.substring(0, 50) + "...");

    const quizData = cleanAndParseJSON(text);
    res.json(quizData);

  } catch (error) {
    console.error("❌ QUIZ ERROR:", error.message);
    res.json([
        { 
          question: `ERROR: ${error.message}`, 
          options: ["Check Server Logs", "Retry"], 
          correctAnswer: "Check Server Logs" 
        }
    ]);
  }
});

// ==========================================
// 2. FLASHCARD GENERATION
// ==========================================
router.post('/flashcards', async (req, res) => {
  const { videoTitle, description } = req.body;

  console.log(`\n📢 Generating Flashcards for: ${videoTitle}`);

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("MISSING API KEY in .env file");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // ✅ CHANGED MODEL TO 'gemini-pro' (Most Stable)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an Expert Mentor.
      Topic: "${videoTitle}".
      Task: Create 5 ADVANCED flashcards.
      Output: PURE JSON Array only.
      Format: [{ "front": "Question", "back": "Answer" }]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ AI Replied:", text.substring(0, 50) + "...");

    const flashcards = cleanAndParseJSON(text);
    res.json(flashcards);

  } catch (error) {
    console.error("❌ FLASHCARD ERROR:", error.message);

    res.json([
        { 
          front: "⚠️ ERROR OCCURRED", 
          back: error.message || "Unknown Error" 
        }
    ]);
  }
});

module.exports = router;