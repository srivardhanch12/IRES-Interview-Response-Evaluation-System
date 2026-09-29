import { evaluateInterview } from '../services/openaiService.js';
import { generateFallbackEvaluation } from '../services/fallbackService.js';
import { sessions } from '../data/sessionStore.js';
import { validateRequiredFields } from '../utils/validation.js';

export const evaluateCandidate = async (req, res, next) => {
  try {
    validateRequiredFields(['sessionId'], req.body);
    const { sessionId } = req.body;

    const session = sessions[sessionId];
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    if (session.qaHistory.length === 0) {
      return res.status(400).json({ success: false, error: 'No answers submitted to evaluate' });
    }

    let evaluation;

    if (!session.fallbackUsed && process.env.OPENAI_API_KEY) {
      try {
        evaluation = await evaluateInterview(session.qaHistory, session.role);
      } catch (error) {
        console.warn("AI evaluation failed, falling back to static evaluation.", error.message);
        evaluation = generateFallbackEvaluation(session.qaHistory, session.role);
      }
    } else {
      evaluation = generateFallbackEvaluation(session.qaHistory, session.role);
    }

    res.json({
      success: true,
      evaluation
    });
  } catch (error) {
    next(error);
  }
};
