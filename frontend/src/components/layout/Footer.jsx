import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-ires-primary">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">IRES</span>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Interview Response & Evaluation System
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 text-center md:text-left max-w-xs">
            AI-powered interview simulation and response evaluation for the modern professional.
          </p>
        </div>

        <div className="flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          {isHome ? (
            <>
              <a href="#how-it-works" className="hover:text-ires-primary transition-colors">How It Works</a>
              <a href="#features" className="hover:text-ires-primary transition-colors">Features</a>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-ires-primary transition-colors">Home</Link>
            </>
          )}
          <Link to="/upload" className="hover:text-ires-primary transition-colors text-ires-primary">Start Interview</Link>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
        <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} IRES — Interview Response & Evaluation System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
