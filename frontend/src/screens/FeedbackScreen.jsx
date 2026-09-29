import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInterview } from '../hooks/useInterview';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingState from '../components/ui/LoadingState';
import { CheckCircle, AlertTriangle, MessageSquare, Code, ArrowRight } from 'lucide-react';

const FeedbackScreen = ({ sessionId }) => {
  const navigate = useNavigate();
  const { fetchEvaluation, evaluation, loading, error } = useInterview(sessionId, null);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'transcript'

  useEffect(() => {
    if (sessionId && !evaluation && !loading) {
      fetchEvaluation();
    }
  }, [sessionId]);

  if (!sessionId) {
    return <Navigate to="/" replace />;
  }

  if (loading || !evaluation) {
    return (
      <div className="flex-1 w-full flex items-center justify-center h-[calc(100vh-80px)]">
        <LoadingState message="Analyzing your interview performance..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 w-full flex items-center justify-center p-6 text-center">
        <Card className="max-w-md w-full">
          <h2 className="text-xl font-bold text-red-500 mb-4">Error loading evaluation</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <Button onClick={() => navigate('/')} className="mx-auto">Return Home</Button>
        </Card>
      </div>
    );
  }

  const parseList = (text) => {
    if (!text) return [];
    return text.split('\\n').map(item => item.replace(/^[•\\-\\d\\.]+\\s*/, '').trim()).filter(Boolean);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const strengthsList = parseList(evaluation.strengths);
  const weaknessesList = parseList(evaluation.weaknesses);
  const tipsList = parseList(evaluation.suggestedImprovements);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto pt-8 pb-24 px-4 md:px-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto w-full flex flex-col gap-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">IRES Interview Evaluation</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Role: <span className="font-semibold text-ires-primary">{evaluation.role}</span>
            </p>
          </div>
          
          <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-lg">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'summary' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'transcript' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              onClick={() => setActiveTab('transcript')}
            >
              Q&A Transcript
            </button>
          </div>
        </div>

        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Score Card */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <Card className="h-full flex flex-col items-center justify-center text-center p-8 border-t-4 border-t-ires-primary">
                <h3 className="text-lg font-medium text-slate-500 uppercase tracking-wider mb-4">Overall Score</h3>
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-700" />
                    <circle 
                      cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="8" 
                      strokeDasharray="351.85" 
                      strokeDashoffset={351.85 - (351.85 * (evaluation.score / 10))}
                      className={getScoreColor(evaluation.score)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className={`text-4xl font-bold ${getScoreColor(evaluation.score)}`}>
                      {evaluation.score}
                    </span>
                    <span className="text-xs text-slate-400">/ 10</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Strengths & Weaknesses */}
            <motion.div variants={itemVariants} className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-t-4 border-t-emerald-500">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="text-emerald-500" size={20} />
                  <h3 className="text-lg font-bold">Key Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {strengthsList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="border-t-4 border-t-yellow-500">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="text-yellow-500" size={20} />
                  <h3 className="text-lg font-bold">Areas for Growth</h3>
                </div>
                <ul className="space-y-2">
                  {weaknessesList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Feedback Breakdown */}
            <motion.div variants={itemVariants} className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="flex items-center gap-3 mb-4 text-ires-primary">
                  <div className="p-2 bg-ires-primary/10 rounded-lg"><MessageSquare size={20} /></div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Communication</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {evaluation.communicationFeedback}
                </p>
              </Card>

              <Card>
                <div className="flex items-center gap-3 mb-4 text-ires-secondary">
                  <div className="p-2 bg-ires-secondary/10 rounded-lg"><Code size={20} /></div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Technical Depth</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {evaluation.technicalFeedback}
                </p>
              </Card>
            </motion.div>

            {/* Actionable Tips */}
            <motion.div variants={itemVariants} className="md:col-span-3">
              <Card className="bg-gradient-to-br from-ires-primary/5 to-ires-secondary/5 border-ires-primary/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ArrowRight className="text-ires-primary" size={20} /> 
                  Actionable Tips
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tipsList.map((tip, idx) => (
                    <div key={idx} className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl border border-white/20">
                      <p className="text-sm font-medium">{tip}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
            
          </div>
        )}

        {activeTab === 'transcript' && (
          <motion.div variants={containerVariants} className="flex flex-col gap-6">
            {evaluation.qaPairs.map((pair, idx) => (
              <motion.div variants={itemVariants} key={idx}>
                <Card className="border-l-4 border-l-ires-primary">
                  <div className="mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Question {idx + 1}</span>
                    <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{pair.question}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Your Answer</span>
                    <p className="text-slate-700 dark:text-slate-300 italic">{pair.answer || "(No response provided)"}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate('/')} variant="outline" className="px-8">
            Return Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackScreen;
