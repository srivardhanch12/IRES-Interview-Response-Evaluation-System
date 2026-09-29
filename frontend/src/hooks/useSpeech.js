import { useState, useEffect, useRef } from 'react';

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef(''); // Holds confirmed phrases
  
  // Keep track of latest transcript so startListening doesn't need it in deps
  const transcriptRef = useRef(transcript);
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);
  
  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscriptRef.current += result[0].transcript + ' ';
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        
        // Combine finalized text with current interim text and normalize spaces
        const displayedTranscript = (finalTranscriptRef.current + interimTranscript)
          .replace(/\s+/g, ' ')
          .trim();
          
        setTranscript(displayedTranscript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          setSpeechSupported(false); // Permission denied
        }
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setSpeechSupported(false);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onend = null; // Prevent state updates on unmount
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);
  
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      // Sync final transcript with whatever is currently in the state (e.g. from manual text edits)
      finalTranscriptRef.current = transcriptRef.current ? transcriptRef.current + ' ' : '';
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Speech recognition start error:", e);
      }
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  const speak = (text, onEndCallback = () => {}) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // stop previous
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        onEndCallback();
      };
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      // If not supported, just trigger callback immediately
      onEndCallback();
    }
  };
  
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    isListening,
    transcript,
    setTranscript,
    isSpeaking,
    speechSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  };
};
