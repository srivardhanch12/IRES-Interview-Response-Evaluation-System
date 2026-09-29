import { generateQuestions } from '../services/openaiService.js';
import { getFallbackQuestions } from '../services/fallbackService.js';
import { sessions } from '../data/sessionStore.js';
import { validateRequiredFields } from '../utils/validation.js';

export const generateInterviewQuestions = async (req, res, next) => {
  try {
    validateRequiredFields(['sessionId', 'role'], req.body);
    const { sessionId, role } = req.body;

    // If session doesn't exist (e.g. no resume uploaded), create a new one
    if (!sessions[sessionId]) {
      sessions[sessionId] = {
        resumeText: '',
        role,
        qaHistory: [],
        fallbackUsed: false,
        currentQuestionIndex: 0,
        generatedQuestions: []
      };
    }

    const session = sessions[sessionId];
    session.role = role;
    
    let questions = [];
    let usedFallback = false;

    // Determine if we should use AI or fallback
    if (process.env.OPENAI_API_KEY) {
      try {
        console.log('[AI] /generate-questions called');
        questions = await generateQuestions(role, session.resumeText, []);
        console.log('[AI] AI questions generated successfully');
      } catch (error) {
        console.log('[FALLBACK] OpenAI request failed');
        console.warn("AI generation failed, falling back to static questions.", error.message);
        console.log('[FALLBACK] Using local question bank');
        questions = getFallbackQuestions(role);
        console.log('[FALLBACK] Fallback questions generated');
        usedFallback = true;
      }
    } else {
      console.log('[FALLBACK] OpenAI request failed');
      console.log('[FALLBACK] Using local question bank');
      questions = getFallbackQuestions(role);
      console.log('[FALLBACK] Fallback questions generated');
      usedFallback = true;
    }

    session.generatedQuestions = questions;
    session.currentQuestionIndex = 0;
    session.fallbackUsed = usedFallback;
    session.qaHistory = []; // Reset history for new generation

    res.json({
      success: true,
      questions,
      currentQuestion: questions[0],
      usedFallback
    });
  } catch (error) {
    next(error);
  }
};

export const submitAnswer = async (req, res, next) => {
  try {
    validateRequiredFields(['sessionId', 'answer', 'questionIndex'], req.body);
    const { sessionId, answer, questionIndex } = req.body;

    const session = sessions[sessionId];
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    const question = session.generatedQuestions[questionIndex];
    if (!question) {
      return res.status(400).json({ success: false, error: 'Invalid question index' });
    }

    // Save answer
    session.qaHistory.push({
      question,
      answer
    });

    const nextIndex = questionIndex + 1;
    const isComplete = nextIndex >= session.generatedQuestions.length;
    
    // Update current index
    session.currentQuestionIndex = nextIndex;

    res.json({
      success: true,
      isComplete,
      nextQuestion: isComplete ? null : session.generatedQuestions[nextIndex],
      nextIndex
    });
  } catch (error) {
    next(error);
  }
};
