import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={`glass-card rounded-2xl p-6 ${hover ? 'cursor-pointer hover:shadow-2xl hover:border-ires-primary/30 transition-all' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
