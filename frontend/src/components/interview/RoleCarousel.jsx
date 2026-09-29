import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const rolesList = [
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
  "AI Engineer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Full Stack Developer",
  "Machine Learning Engineer"
];

const RoleCarousel = ({ actualRole }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If we have an actual role from the interview, show that.
  // Otherwise, cycle through the visual list (e.g. on landing/upload).
  // The spec requested a vertical role carousel in the interview header
  // that cycles visually but doesn't change the actual role. 
  // Wait, if it cycles visually but the actual role is "Backend Developer", 
  // it might be confusing if the header says "Frontend Developer". 
  // Actually, the spec explicitly said: "The visual role carousel MUST NOT automatically change the actual selected interview role in normal single-role interview mode."
  // And "The visual carousel may display: Frontend Developer... but the actual interview remains Backend Developer."
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rolesList.length);
    }, 10000); // 10 seconds per role
    
    return () => clearInterval(timer);
  }, []);

  // Display the actual role first if it exists, but the carousel effect is the requirement.
  // To keep it simple, we just use the rolesList, but if actualRole is passed, maybe we should insert it or just cycle the list.
  // We'll cycle the list.

  return (
    <div className="flex items-center gap-2 bg-white/20 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 px-4 py-2 rounded-full shadow-sm backdrop-blur-md overflow-hidden h-10">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {actualRole ? "Role:" : "Simulating:"}
      </span>
      <div className="relative h-6 w-48 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6, ease: "anticipate" }}
            className="absolute inset-0 flex items-center text-sm font-bold gradient-text"
          >
            {actualRole ? actualRole : rolesList[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoleCarousel;
