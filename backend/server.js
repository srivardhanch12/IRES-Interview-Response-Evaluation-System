import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';

import resumeRoutes from './routes/resume.js';
import interviewRoutes from './routes/interview.js';
import evaluationRoutes from './routes/evaluation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/upload-resume', resumeRoutes);
app.use('/', interviewRoutes); // Handles /generate-questions and /submit-answer
app.use('/evaluate', evaluationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    openaiConfigured: !!process.env.OPENAI_API_KEY
  });
});

// Error handling middleware
app.use(errorHandler);

// Only start server if file is run directly (useful for tests later if needed)
app.listen(PORT, () => {
  console.log(`IRES Backend Server running on port ${PORT}`);
  if (!process.env.OPENAI_API_KEY) {
    console.warn("⚠️ OPENAI_API_KEY is not set. The server will operate in Fallback Mode.");
  }
});
