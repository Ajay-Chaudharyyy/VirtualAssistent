# 🧠 Virtual Assistant (Voice-Activated AI)
Live at - https://virtual-assistent-ajay-chaudharyys-projects.vercel.app
A voice-activated Virtual Assistant built with **React**, **Web Speech API**, and connected to **Gemini AI** . This assistant listens for your commands—but only responds when you **start by saying its name** (customizable by the user).

---

## 🎯 Features

- 🎙️ Voice-controlled interface using `SpeechRecognition`
- 🔊 Speaks responses using `SpeechSynthesis`
- 👂 Continuous listening and error handling
- 🧠 Responds with AI-generated answers (mocked or real Gemini API)
- 🔐 Custom assistant name for activation (like "Jarvis", "Nova", etc.)
- 🌐 Easily integratable in any React app

---

## 🗣️ How It Works

1. **Start speaking normally**, but begin your sentence with the **assistant’s name**.
2. For example:  
   - ✅ `Goku, what's the weather like?`  
   - ❌ `What's the weather like?` (will be ignored)
3. If the assistant hears its name, it will process your command and speak a response.
4. If the name isn't mentioned, it will respond:  
   `"Say my name first. I am not sure you're talking to me."`

---

## 🧪 Example Assistant Names



## 🛠️ Technologies Used

- React.js
- express
- nodejs
- mongodb
- TypeScript
- Web Speech API (`SpeechRecognition`, `SpeechSynthesis`)
- React Router
- Toast Notifications (via `react-toastify`)
- Custom AI API (mocked Gemini response or real)
- jsonwebtoken


---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

```bash
git clone https://github.com/your-username/virtual-assistant.git
cd virtual-assistant
npm install
npm run dev
