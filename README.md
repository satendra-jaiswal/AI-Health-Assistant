# AI-Health-Assistant

This repository contains the source code for a **real-time, full-stack voice AI based Health assistant** built with **Google Gemini API** and **Node.js**.  

---

## 🚀 Features

- **🎙 Real-Time Voice Interface**  
  Low-latency, continuous voice chat using the **Web Speech API** for natural conversations with smooth interruption handling.  

- **🗣 Intelligent Language Detection**  
  Detects **English, Hindi, and Hinglish** automatically and responds in the same language.  

- **🎨 Dynamic UI/UX**  
  A clean, responsive single-page application with a **dark/light theme switcher** and modern, styled components.  

- **🛡 Robust Backend**  
  Server-to-server architecture with **Node.js + Express**, securely handling API calls to Google Gemini while keeping API keys safe.  

- **⚡ Advanced State Management**  
  Custom logic to handle browser quirks and race conditions, ensuring stability and reliability.  

- **✅ AI Safety Protocols**  
  System instructions prevent unsafe medical advice and ensure clear disclaimers for healthcare-related interactions.  

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js  
- **AI Model**: Google Gemini API (`gemini-2.0-flash-lite`)  
- **Frontend**: JavaScript, HTML, CSS  
- **APIs**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)  

---

## ⚙️ Setup and Installation

Follow these steps to run the project locally:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)  
- A valid **Google Gemini API Key** (get one from [aistudio.google.com](https://aistudio.google.com))  

### 2. Clone the Repository
```bash
git clone https://github.com/satendra-jaiswal/AI-Health-Assistant.git
cd AI-Health-Assistant
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the project root and add your Gemini API key:

```
GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

### 5. Run the Server

```bash
npm start
```

The app will be available at:
👉 `http://localhost:3000`

Open it in a modern browser (Google Chrome recommended) that supports the **Web Speech API**.

---

## 📂 Project Structure

```
├── public/
│   ├── index.html        # Frontend layout
│   ├── style.css         # Styling for UI
│   ├── script.js         # Core frontend logic
│   ├── Rev.gif           # Bot animation/icon
│   └── rev_logo.jpg   # App/brand logo
├── .env                  # Environment variables (not committed)
├── package.json          # Dependencies & scripts
└── server.js             # Express server & Gemini API integration
```

---

## ⚡ Future Improvements

* Add support for **more Indian regional languages**
* Integrate **speech-to-text fallback** for browsers without Web Speech API support
* Enable **contextual conversation memory** with Gemini
* Deploy on **Vercel/Render/Heroku** for cloud access

---

## 📝 License

This project is licensed under the **MIT License** – feel free to use, modify, and distribute with attribution.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo, create a branch, and open a pull request.

---

## 🙌 Acknowledgements

* [Google Gemini API](https://aistudio.google.com)
* [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)



