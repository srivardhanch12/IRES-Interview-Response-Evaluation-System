import { useState } from 'react';
import { generateQuestions, submitAnswer, evaluateInterview } from '../services/api';

export const useInterview = (sessionId, role) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const startInterview = async () => {
    if (!sessionId || !role) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await generateQuestions(sessionId, role);
      setCurrentQuestion(data.currentQuestion);
      setUsedFallback(data.usedFallback);
      setQuestionIndex(0);
      setIsComplete(false);
      setIsInitialized(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (answer) => {
    if (!answer.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await submitAnswer(sessionId, answer, questionIndex);
      if (data.isComplete) {
        setIsComplete(true);
      } else {
        setCurrentQuestion(data.nextQuestion);
        setQuestionIndex(data.nextIndex);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvaluation = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await evaluateInterview(sessionId);
      setEvaluation(data.evaluation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    currentQuestion,
    questionIndex,
    isComplete,
    evaluation,
    usedFallback,
    isInitialized,
    startInterview,
    handleAnswerSubmit,
    fetchEvaluation
  };
};
