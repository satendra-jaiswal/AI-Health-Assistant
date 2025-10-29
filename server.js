const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

if (!process.env.GEMINI_API_KEY) {
    console.error("Fatal Error: GEMINI_API_KEY is not defined in your .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/dialog', async (req, res) => {
  try {
    const { message } = req.body;

    // const systemInstruction = {
    //   role: "system",
    //   content: `Your first priority is the output format. Your entire output MUST be a single, valid JSON object and nothing else.
    //   You are Rev, an Artificial Intelligence based assistant for Medical related work and advice.
    //   Your task is to identify the user's language (English, Hindi, or Hinglish) and provide a conversational response.
    //   The JSON object you output must contain two keys:
    //   1. "languageCode": A string, either "en-IN" for English or "hi-IN" for Hindi/Hinglish.
    //   2. "responseText": A string containing your conversational response.
    //   Do not include any text, explanations, or markdown formatting before or after the JSON object.
    //   Your entire response must be only the JSON object.`
    // };

    const systemInstruction = {
      role: "system",
      parts: [
        { text: "Your first priority is the output format. Your entire output MUST be a single, valid JSON object and nothing else." },
        { text: "    //   You are Rev, an Artificial Intelligence based assistant for Medical related work and advice.." },
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

    // res.json({
    //   "languageCode": "en-IN",
    //   "responseText": "I am sorry, I did not understand your request. Could you please rephrase it?"
    // })

    // res.json({
    //   "languageCode": "hi-IN",
    //   "responseText": "मुझे आपकी बात समझ में नहीं आई। क्या आप इसे दोहरा सकते हैं?"
    // });

  } catch (error) {
    console.error('Error in dialog with Gemini:', error);
    res.status(500).json({ error: 'Failed to communicate with the AI model.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

