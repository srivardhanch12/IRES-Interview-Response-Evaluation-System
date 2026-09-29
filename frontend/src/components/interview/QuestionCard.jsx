import React from 'react';
import Card from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';

const QuestionCard = ({ question, fallbackUsed }) => {
  return (
    <Card className="relative overflow-hidden w-full max-w-3xl mx-auto border-t-4 border-t-ires-primary">
      {fallbackUsed ? (
        <div className="absolute top-0 right-0 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg">
          Fallback Mode
        </div>
      ) : (
        <div className="absolute top-0 right-0 bg-ires-primary/20 text-ires-primary text-xs font-bold px-3 py-1 rounded-bl-lg">
          AI Interview Mode
        </div>
      )}
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 rounded-full bg-ires-primary/10 flex items-center justify-center text-ires-primary">
            <MessageSquareQuote size={20} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-ires-primary mb-1 uppercase tracking-wider">AI Interviewer</h3>
          <AnimatePresence mode="wait">
            <motion.p
              key={question}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg md:text-xl text-slate-800 dark:text-slate-200 font-medium leading-relaxed"
            >
              {question}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
