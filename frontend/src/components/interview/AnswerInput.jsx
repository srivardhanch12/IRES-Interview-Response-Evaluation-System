import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Keyboard, Send, Square } from 'lucide-react';
import Button from '../ui/Button';

const AnswerInput = ({ 
  onSubmit, 
  isListening, 
  startListening, 
  stopListening, 
  transcript, 
  setTranscript,
  speechSupported,
  isSpeaking
}) => {
  const [mode, setMode] = useState('voice'); // 'voice' or 'text'
  const [textInput, setTextInput] = useState('');

  // Sync transcript to text input when in voice mode
  useEffect(() => {
    if (mode === 'voice') {
      setTextInput(transcript);
    }
  }, [transcript, mode]);

  const handleSubmit = () => {
    if (isListening) stopListening();
    
    const finalAnswer = textInput.replace(/\s+/g, ' ').trim();
    if (!finalAnswer) return;
    
    onSubmit(finalAnswer);
    setTextInput('');
    setTranscript('');
  };

  const toggleMode = () => {
    if (isListening) stopListening();
    
    if (mode === 'voice') {
      setMode('text');
    } else {
      setTranscript(textInput);
      setMode('voice');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-2 px-2">
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Your Response</span>
        <button 
          onClick={toggleMode}
          className="text-xs flex items-center gap-1 text-ires-primary hover:text-ires-secondary transition-colors"
        >
          {mode === 'voice' ? (
            <><Keyboard size={14} /> Switch to Text</>
          ) : (
            <><Mic size={14} /> Switch to Voice</>
          )}
        </button>
      </div>

      <div className="relative glass-card rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-ires-primary/50 transition-shadow">
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder={
            mode === 'voice' 
              ? (isListening ? "Listening..." : "Click the microphone to start speaking...") 
              : "Type your answer here..."
          }
          disabled={mode === 'voice' && isListening}
          className="w-full h-32 p-4 bg-transparent resize-none outline-none text-slate-700 dark:text-slate-300 disabled:opacity-70"
        />
        
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          {mode === 'voice' && speechSupported && (
            <Button 
              variant={isListening ? "danger" : "secondary"}
              className="!p-3 !rounded-full"
              onClick={isListening ? stopListening : startListening}
              disabled={isSpeaking}
              title={isSpeaking ? "Wait for AI to finish speaking" : ""}
            >
              {isListening ? <Square size={20} /> : <Mic size={20} />}
            </Button>
          )}
          
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={!textInput.trim() || isSpeaking}
            className="!px-6"
          >
            Submit <Send size={16} />
          </Button>
        </div>
      </div>
      
      {!speechSupported && mode === 'voice' && (
        <p className="text-red-500 text-xs mt-2 px-2">
          Voice recognition is not supported in this browser. Please switch to text mode.
        </p>
      )}
    </div>
  );
};

export default AnswerInput;
