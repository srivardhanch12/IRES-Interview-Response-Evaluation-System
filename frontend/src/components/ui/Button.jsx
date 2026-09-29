import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  icon,
  ...props 
}) => {
  
  const baseClasses = "group relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-ires-primary to-ires-secondary text-white shadow-lg shadow-ires-primary/20 hover:shadow-ires-primary/40",
    secondary: "glass-button",
    outline: "border-2 border-ires-primary/50 text-ires-primary hover:bg-ires-primary/10 hover:border-ires-primary",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Shine effect for primary button */}
      {variant === 'primary' && !disabled && (
        <span className="absolute inset-0 -translate-x-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
      )}
      
      {icon && <span className="z-10 relative">{icon}</span>}
      <span className="z-10 relative">{children}</span>
    </motion.button>
  );
};

export default Button;
