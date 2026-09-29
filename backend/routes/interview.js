import express from 'express';
import { generateInterviewQuestions, submitAnswer } from '../controllers/interviewController.js';

const router = express.Router();

// Because we mapped in server.js: 
// app.use('/generate-questions', interviewRoutes);
// app.use('/submit-answer', interviewRoutes);
// We need to handle both correctly. Wait, if mapped directly, we should just export the router for both.

// Actually, in server.js it's:
// app.use('/generate-questions', interviewRoutes);
// app.use('/submit-answer', interviewRoutes);
// So in here, we map both to '/' but that would conflict.
// Let's change this to be safe, or I will replace server.js mounting to app.use('/api/interview', interviewRoutes)
// But the spec requires:
// POST /generate-questions
// POST /submit-answer

// So I will just write it here as:
router.post('/generate-questions', generateInterviewQuestions);
router.post('/submit-answer', submitAnswer);

export default router;
