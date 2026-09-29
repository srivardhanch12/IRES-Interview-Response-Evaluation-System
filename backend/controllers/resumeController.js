import { extractTextFromPDF } from '../services/resumeService.js';
import { sessions } from '../data/sessionStore.js';
import fs from 'fs';

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No resume file uploaded' });
    }

    const filePath = req.file.path;
    const resumeText = await extractTextFromPDF(filePath);

    // Delete the file after extraction to save space
    fs.unlinkSync(filePath);

    const sessionId = Date.now().toString() + Math.floor(Math.random() * 1000);
    
    sessions[sessionId] = {
      resumeText,
      role: '',
      qaHistory: [],
      fallbackUsed: false,
      currentQuestionIndex: 0,
      generatedQuestions: []
    };

    res.json({
      success: true,
      sessionId,
      resumeText: resumeText.substring(0, 200) + '...' // Return a preview
    });
  } catch (error) {
    next(error);
  }
};
