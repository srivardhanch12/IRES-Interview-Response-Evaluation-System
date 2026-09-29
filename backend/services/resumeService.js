import fs from 'fs';
import pdf from 'pdf-parse';

export const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    
    // Return extracted text, truncated to save tokens if it's too long
    // Standard resume is 1-2 pages, so 3000-5000 chars is usually enough.
    const text = data.text.trim();
    if (text.length > 5000) {
      return text.substring(0, 5000) + '... [Truncated]';
    }
    return text;
  } catch (error) {
    console.error("PDF Parsing error:", error);
    throw new Error('Failed to parse PDF file');
  }
};
