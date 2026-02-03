const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

if (!process.env.GEMINI_API_KEY) {
    console.error("Fatal Error: GEMINI_API_KEY is not defined in your environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/dialog', async (req, res) => {
  try {
    const { message } = req.body;

    const systemInstruction = {
      role: "system",
      parts: [
        { text: "Your first priority is the output format. Your entire output MUST be a single, valid JSON object and nothing else." },
        { text: "You are Rev, an Artificial Intelligence based assistant for Medical related work and advice." },
        { text: "Your task is to identify the user's language (English, Hindi, or Hinglish) and provide a conversational response." },
        { text: "If you are not able to detect the language, respond in Hindi and use the 'hi-IN' language code." },
        { text: "The JSON object you output must contain two keys: 'languageCode' (either 'en-IN' or 'hi-IN') and 'responseText'." },
        { text: "Do not include any text, explanations, or markdown formatting before or after the JSON object, Your entire response must be only the JSON object." },
      ]
    };

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-lite',
        systemInstruction: systemInstruction,
    });

    const chat = model.startChat();
    const result = await chat.sendMessage(message);
    let responseText = result.response.text();
    responseText = responseText.replace("```json", "")
        .replace("```", "")
        .trim();

    console.log(result);
    console.log(responseText);
    const responseObject = JSON.parse(responseText);
    res.json(responseObject);

  } catch (error) {
    console.error('Error in dialog with Gemini:', error);
    res.status(500).json({ error: 'Failed to communicate with the AI model.' });
  }
});

// Handle root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;