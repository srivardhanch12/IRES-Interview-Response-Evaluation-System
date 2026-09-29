import { fallbackQuestions } from '../data/fallbackQuestions.js';

export const getFallbackQuestions = (role) => {
  const roleQuestions = fallbackQuestions[role];
  if (!roleQuestions) {
    // If somehow a role is requested that has no fallback, use generic
    return [
      "Tell me about your background and experience.",
      "What is your greatest professional strength?",
      "Can you describe a time you overcame a difficult challenge?",
      "How do you stay updated with industry trends?",
      "Why are you interested in this position?"
    ];
  }
  return roleQuestions;
};

export const generateFallbackEvaluation = (qaHistory, role) => {
  // Simple static evaluation for fallback mode
  return {
    score: 7.5,
    strengths: "• Provided clear responses\\n• Answered all questions comprehensively",
    weaknesses: "• Could provide more specific examples\\n• Some technical depth was missing",
    communicationFeedback: "Communication was straightforward and easy to understand.",
    technicalFeedback: "Demonstrated baseline knowledge, but fallback mode cannot perform deep technical analysis.",
    suggestedImprovements: "• Use the STAR method for behavioral questions\\n• Provide concrete metrics to back up claims",
    role: role,
    qaPairs: qaHistory
  };
};
