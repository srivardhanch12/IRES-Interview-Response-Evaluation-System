import OpenAI from 'openai';
import { roles } from '../data/roleIntelligence.js';

export const generateQuestions = async (role, resumeText, existingQuestions = []) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing');
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const roleInfo = roles[role] || { name: role, skills: [], focus: '' };
  
  const systemPrompt = `You are a professional technical interviewer for the role of ${role}.
Role Focus: ${roleInfo.focus}
Key Skills: ${roleInfo.skills.join(', ')}

Your task is to generate EXACTLY 5 progressive interview questions.
Progression:
1. Foundational/Warm-up
2. Intermediate Technical/Domain
3. Practical Application/Scenario
4. Advanced Technical/Domain
5. Problem-solving/Behavioral

CRITICAL REQUIREMENTS:
- The questions MUST be highly relevant to the specific role of ${role}. DO NOT ask frontend questions to a backend developer, or HR questions to a data analyst.
- Use the provided resume text to tailor the questions to the candidate's actual experience. If they list specific tools relevant to the role, ask about them.
- DO NOT ask any questions that are exactly or nearly identical to these previously asked questions:
  ${existingQuestions.length > 0 ? existingQuestions.map(q => `- ${q}`).join('\n  ') : 'None.'}

Return the response ONLY as a valid JSON array of 5 strings. No markdown, no markdown formatting blocks, no extra text.
Format: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]`;

  try {
    console.log('[AI] OpenAI request started');
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Candidate Resume Context:\n${resumeText || 'No resume provided.'}` }
      ],
      temperature: 0.7,
      max_tokens: 800,
    });
    console.log('[AI] GPT-4o-mini response received');

    let content = response.choices[0].message.content.trim();
    // Clean up potential markdown formatting if the AI ignores instructions
    if (content.startsWith('```json')) {
      content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (content.startsWith('```')) {
      content = content.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const questions = JSON.parse(content);
    if (!Array.isArray(questions) || questions.length !== 5) {
      throw new Error("AI did not return exactly 5 questions in an array.");
    }

    return questions;
  } catch (error) {
    console.error("OpenAI Question Generation Error:", error);
    throw new Error('Failed to generate questions via AI');
  }
};

export const evaluateInterview = async (qaHistory, role) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing');
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const historyText = qaHistory.map((qa, i) => `Q${i+1}: ${qa.question}\nA${i+1}: ${qa.answer}`).join('\n\n');
  const roleInfo = roles[role] || { name: role, skills: [], focus: '' };

  const systemPrompt = `You are an expert technical interviewer evaluating a candidate for the role of ${role}.
Role Focus: ${roleInfo.focus}
Key Skills: ${roleInfo.skills.join(', ')}

Evaluate the candidate based on their ACTUAL answers to the questions.
Consider: relevance, correctness, completeness, reasoning, technical understanding, and communication.

Return the evaluation STRICTLY as a JSON object with no markdown block formatting.
The JSON must have the following keys:
{
  "score": <number between 0 and 10, use decimals like 8.5>,
  "strengths": "<string with bullet points using \n• >",
  "weaknesses": "<string with bullet points using \n• >",
  "communicationFeedback": "<string analyzing how clearly they communicated>",
  "technicalFeedback": "<string analyzing their technical depth and accuracy>",
  "suggestedImprovements": "<string with actionable tips using \n• >"
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Interview Transcript:\n\n${historyText}` }
      ],
      temperature: 0.3, // Lower temperature for more consistent evaluation
      max_tokens: 1000,
    });

    let content = response.choices[0].message.content.trim();
    if (content.startsWith('```json')) {
      content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (content.startsWith('```')) {
      content = content.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const evaluation = JSON.parse(content);
    evaluation.role = role;
    evaluation.qaPairs = qaHistory;
    return evaluation;
  } catch (error) {
    console.error("OpenAI Evaluation Error:", error);
    throw new Error('Failed to evaluate interview via AI');
  }
};
