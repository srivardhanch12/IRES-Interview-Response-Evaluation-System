import React from 'react';
import { motion } from 'framer-motion';

const ProgressIndicator = ({ current, total }) => {
  const percentage = ((current) / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-ires-primary to-ires-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
