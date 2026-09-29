const API_URL = 'http://localhost:3001';

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await fetch(`${API_URL}/upload-resume`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to upload resume');
  }
  
  return response.json();
};

export const generateQuestions = async (sessionId, role) => {
  const response = await fetch(`${API_URL}/generate-questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, role })
  });
  
  if (!response.ok) throw new Error('Failed to generate questions');
  return response.json();
};

export const submitAnswer = async (sessionId, answer, questionIndex) => {
  const response = await fetch(`${API_URL}/submit-answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, answer, questionIndex })
  });
  
  if (!response.ok) throw new Error('Failed to submit answer');
  return response.json();
};

export const evaluateInterview = async (sessionId) => {
  const response = await fetch(`${API_URL}/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId })
  });
  
  if (!response.ok) throw new Error('Failed to evaluate interview');
  return response.json();
};
