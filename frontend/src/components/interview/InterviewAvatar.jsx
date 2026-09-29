import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// States: Idle, Listening, Thinking, Speaking
const InterviewAvatar = ({ state }) => {
  
  const getOrbState = () => {
    switch (state) {
      case 'Speaking':
        return {
          glow: 'from-ires-primary/60 to-ires-secondary/60',
          core: 'from-ires-primary to-ires-secondary',
          scale: [1, 1.15, 1],
          opacity: [0.8, 1, 0.8],
          duration: 1.5,
          pulse: true
        };
      case 'Listening':
        return {
          glow: 'from-emerald-400/40 to-teal-400/40',
          core: 'from-emerald-500 to-teal-500',
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.9, 0.6],
          duration: 2,
          pulse: false
        };
      case 'Thinking':
        return {
          glow: 'from-indigo-400/40 to-purple-400/40',
          core: 'from-indigo-500 to-purple-500',
          scale: [1, 1.02, 1],
          opacity: [0.7, 1, 0.7],
          duration: 3,
          pulse: false,
          rotate: true
        };
      case 'Idle':
      default:
        return {
          glow: 'from-slate-400/20 to-slate-500/20',
          core: 'from-slate-400 to-slate-500',
          scale: 1,
          opacity: 0.8,
          duration: 4,
          pulse: false
        };
    }
  };

  const orbState = getOrbState();

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto my-4 group">
      
      {/* Outer Ambient Glow */}
      <motion.div 
        className={`absolute inset-0 rounded-full bg-gradient-to-tr ${orbState.glow} blur-3xl transition-colors duration-700`}
        animate={{ scale: orbState.scale, opacity: orbState.opacity }}
        transition={{ repeat: Infinity, duration: orbState.duration, ease: "easeInOut" }}
      />
      
      {/* Expanding Ripple Ring (Speaking state) */}
      <AnimatePresence>
        {orbState.pulse && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            className={`absolute inset-10 rounded-full border border-ires-primary/50 bg-ires-primary/10`}
          />
        )}
      </AnimatePresence>

      {/* Rotating Abstract Ring (Thinking state) */}
      <AnimatePresence>
        {orbState.rotate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ rotate: 360, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ rotate: { repeat: Infinity, duration: 3, ease: "linear" }, opacity: { duration: 0.5 } }}
            className="absolute inset-4 rounded-full border-2 border-transparent border-t-indigo-500/50 border-r-indigo-500/50"
          />
        )}
      </AnimatePresence>

      {/* Inner Core */}
      <motion.div 
        className={`relative z-10 w-32 h-32 rounded-full bg-gradient-to-tr ${orbState.core} shadow-2xl flex items-center justify-center transition-colors duration-700 overflow-hidden border border-white/20`}
        animate={{ scale: orbState.scale }}
        transition={{ repeat: Infinity, duration: orbState.duration, ease: "easeInOut" }}
      >
        {/* Glassmorphic overlay inside core */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[2px]" />
        
        {/* State-specific center animations */}
        <div className="relative z-20 flex items-center justify-center w-full h-full">
          {state === 'Speaking' && (
             <div className="flex gap-1.5 h-8 items-center justify-center w-full px-4">
               {[1, 2, 3, 4, 5].map((i) => (
                 <motion.div 
                   key={i}
                   className="w-1.5 bg-white rounded-full" 
                   animate={{ height: ['4px', `${Math.random() * 20 + 8}px`, '4px'] }} 
                   transition={{ repeat: Infinity, duration: 0.4 + (i * 0.1), ease: "easeInOut" }} 
                 />
               ))}
             </div>
          )}
          
          {state === 'Listening' && (
             <motion.div 
               className="w-12 h-12 rounded-full bg-white/20"
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
             />
          )}
          
          {state === 'Thinking' && (
             <div className="flex gap-2">
               {[0, 1, 2].map((i) => (
                 <motion.div 
                   key={i}
                   className="w-2 h-2 rounded-full bg-white" 
                   animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }} 
                   transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2, ease: "easeInOut" }} 
                 />
               ))}
             </div>
          )}
          
          {state === 'Idle' && (
             <motion.div 
               className="w-8 h-1 bg-white/40 rounded-full"
               animate={{ opacity: [0.4, 0.7, 0.4] }}
               transition={{ repeat: Infinity, duration: 2 }}
             />
          )}
        </div>
      </motion.div>
      
      {/* State Badge */}
      <motion.div 
        layout
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-2 z-20"
      >
        <div className={`w-2 h-2 rounded-full ${state === 'Speaking' ? 'bg-ires-primary animate-pulse' : state === 'Listening' ? 'bg-emerald-500 animate-pulse' : state === 'Thinking' ? 'bg-indigo-500' : 'bg-slate-400'}`} />
        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-widest uppercase">
          {state}
        </span>
      </motion.div>
    </div>
  );
};

export default InterviewAvatar;
