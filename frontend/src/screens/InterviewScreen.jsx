import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Clock, BrainCircuit } from 'lucide-react';
import { useInterview } from '../hooks/useInterview';
import { useSpeech } from '../hooks/useSpeech';
import InterviewAvatar from '../components/interview/InterviewAvatar';
import QuestionCard from '../components/interview/QuestionCard';
import AnswerInput from '../components/interview/AnswerInput';
import LoadingState from '../components/ui/LoadingState';

const InterviewScreen = ({ sessionId, role }) => {
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const {
    loading,
    error,
    currentQuestion,
    questionIndex,
    isComplete,
    usedFallback,
    isInitialized,
    startInterview,
    handleAnswerSubmit
  } = useInterview(sessionId, role);

  const {
    isListening,
    transcript,
    setTranscript,
    isSpeaking,
    speechSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  } = useSpeech();

  if (!sessionId || !role) {
    return <Navigate to="/upload" replace />;
  }

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Start interview on mount
  useEffect(() => {
    if (!isInitialized && !loading) {
      startInterview();
    }
  }, [isInitialized, loading]);

  // When a new question arrives, read it aloud if speech is supported
  useEffect(() => {
    if (currentQuestion && !loading) {
      speak(currentQuestion, () => {
        // Callback after speaking finishes
      });
    }
    
    return () => {
      stopSpeaking();
    };
  }, [currentQuestion, loading]); 

  useEffect(() => {
    if (isComplete) {
      navigate('/feedback');
    }
  }, [isComplete, navigate]);

  const getAvatarState = () => {
    if (loading) return 'Thinking';
    if (isSpeaking) return 'Speaking';
    if (isListening) return 'Listening';
    return 'Idle';
  };

  const handleExit = () => {
    if (window.confirm("Are you sure you want to exit the interview? Your progress will be lost.")) {
      navigate('/');
    }
  };

  if (!isInitialized || (!currentQuestion && loading)) {
    return (
      <div className="flex-1 w-full flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19]">
        <LoadingState message="Preparing your interview workspace..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 w-full flex items-center justify-center p-6 text-center bg-slate-50 dark:bg-[#0B0F19]">
        <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 p-8 rounded-2xl max-w-md w-full shadow-xl">
          <h2 className="text-xl font-bold text-red-500 mb-4">Connection Error</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl hover:opacity-90 transition font-medium w-full"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = 5;
  const progressPercentage = ((questionIndex) / totalQuestions) * 100;

  return (
    <div className="flex-1 w-full flex flex-col relative bg-slate-50/50 dark:bg-[#0B0F19] min-h-[calc(100vh-80px)] overflow-hidden">
      
      {/* Top Workspace Bar */}
      <div className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-ires-primary/10 rounded-lg text-ires-primary hidden sm:block">
              <BrainCircuit size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">IRES Interview</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider leading-tight">{role}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Clock size={14} />
              <span className="text-sm font-medium font-mono">{formatTime(elapsedTime)}</span>
            </div>
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Question {questionIndex + 1} <span className="text-slate-400 font-normal">of {totalQuestions}</span>
            </div>
            <button 
              onClick={handleExit}
              className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5 text-sm font-medium"
            >
              <span className="hidden sm:inline">Exit</span>
              <LogOut size={16} />
            </button>
          </div>
        </div>
        {/* Subtle Top Progress Bar */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
          <motion.div 
            className="h-full bg-ires-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
      
      {/* Main interaction area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center min-h-full">
          
          {/* Avatar Section */}
          <div className="mb-8 w-full flex justify-center">
            <InterviewAvatar state={getAvatarState()} />
          </div>
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full h-48 flex items-center justify-center"
              >
                <LoadingState message="Analyzing response and generating next question..." />
              </motion.div>
            ) : (
              <motion.div
                key={`q-${questionIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col gap-6"
              >
                {/* Question Area */}
                <QuestionCard question={currentQuestion} fallbackUsed={usedFallback} />
                
                {/* Answer Area */}
                <AnswerInput 
                  onSubmit={handleAnswerSubmit}
                  isListening={isListening}
                  startListening={startListening}
                  stopListening={stopListening}
                  transcript={transcript}
                  setTranscript={setTranscript}
                  speechSupported={speechSupported}
                  isSpeaking={isSpeaking}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.3); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(75, 85, 99, 0.4); }
      `}} />
    </div>
  );
};

export default InterviewScreen;
