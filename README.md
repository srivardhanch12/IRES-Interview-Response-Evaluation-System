# IRES — Interview Response & Evaluation System

IRES (Interview Response & Evaluation System) is a full-stack, AI-powered interview simulation and evaluation platform designed to provide realistic, role-specific interview experiences. It processes candidate resumes, generates tailored technical and behavioral questions, captures spoken or typed responses, and evaluates interview performance through structured scoring and actionable feedback.

---

## Core Features

### Resume Intelligence
- PDF resume upload
- Server-side text extraction
- Resume-aware interview context

### Adaptive Interview Generation
- Role-specific questions
- Technical and behavioral coverage
- Progressive question difficulty
- OpenAI-powered question generation

### Voice Interview Experience
- Speech recognition
- Text-to-speech
- Interactive voice-based interview
- Keyboard fallback

### AI Interview Interface
- Speaking state
- Listening state
- Thinking state
- Idle state
- Animated AI interviewer

### Response Evaluation
- Overall performance score
- Technical evaluation
- Communication evaluation
- Strengths
- Weaknesses
- Improvement recommendations
- Full Q&A transcript

---

## User Workflow

1. Candidate enters the IRES platform.
2. Candidate uploads their resume.
3. Candidate selects the target job role.
4. IRES generates role-specific interview questions.
5. IRES conducts the interactive interview using voice or text.
6. Candidate responses are collected.
7. IRES evaluates the interview performance.
8. Candidate receives a structured evaluation report.

---

## Tech Stack
### Frontend
- **Framework**: React 18 with Vite 5
- **Styling**: Tailwind CSS v3 with PostCSS & Autoprefixer
- **Animations**: Framer Motion v11
- **Icons**: Lucide React
- **HTTP Service**: Custom Fetch API wrapper

### Backend
- **Runtime**: Node.js (ES Modules) with Express v4
- **AI Engine**: OpenAI Node.js SDK (`gpt-4o-mini`)
- **File Processing**: Multer (disk storage) & `pdf-parse`
- **Environment**: `dotenv` & CORS middleware
- **Dev Runner**: `nodemon` & `concurrently`

---

## Project Architecture
```text
┌───────────────────────────┐
│       React Frontend      │
│  (Vite + Tailwind + FM)   │
└─────────────┬─────────────┘
              │ Web Speech API / HTTP
┌─────────────▼─────────────┐
│      Node.js Express      │
│          Backend          │
└──────┬─────────────┬──────┘
       │ pdf-parse   │ OpenAI API
       ▼             ▼
┌──────────────┐ ┌───────────┐
│ Resume Text  │ │ GPT-4o-   │
│ Extraction   │ │   mini    │
└──────────────┘ └───────────┘
```

---

## Prerequisites
- **Node.js**: `v18.0.0` or higher (`v20+` recommended)
- **npm**: `v9.0.0` or higher
- **OpenAI API Key**: (Optional for fallback mode, required for AI feature generation)

---

## Installation & Setup
1. **Clone the Repository**
2. **Install All Dependencies**
```bash
npm run install:all
```

---

## Environment Configuration
Navigate to the root or `backend` directory and configure the `.env` file:
```bash
cp .env.example backend/.env
```
Open `backend/.env` in your text editor and supply your OpenAI API key:
```env
OPENAI_API_KEY=sk-proj-your_actual_openai_api_key_here
PORT=3001
```

---

## Running the Application
From the root directory, start both the frontend Vite dev server and backend Express server simultaneously:
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

---

## Browser Compatibility
| Browser | Speech Recognition | Speech Synthesis | Keyboard Mode | Recommendation |
|---------|-------------------|------------------|---------------|----------------|
| **Google Chrome** | ✅ Supported | ✅ Supported | ✅ Supported | 🌟 Recommended |
| **Microsoft Edge** | ✅ Supported | ✅ Supported | ✅ Supported | 🌟 Recommended |
| **Apple Safari** | ⚠️ Limited | ✅ Supported | ✅ Supported | Keyboard Fallback |
| **Mozilla Firefox** | ❌ Unsupported | ✅ Supported | ✅ Supported | Keyboard Fallback |

---

## Customization & Tuning
The AI interviewer's evaluation prompts, question generation behavior, and fallback logic can be customized within the `backend/services/` directory.

## Troubleshooting
- **No AI Questions Generated**: Ensure your OpenAI API key has sufficient billing credits. The system will automatically engage Fallback Mode if credits run out.
- **Microphone Denied**: Allow microphone access in your browser site settings.

## License
Distributed under the MIT License. See `LICENSE` for more information.
