import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { BrainCircuit } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav className={`w-full z-50 sticky top-0 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-br from-ires-primary to-ires-secondary rounded-xl text-white group-hover:scale-105 transition-transform shadow-lg shadow-ires-primary/20">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none">IRES</span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide hidden sm:block mt-0.5 uppercase">Interview Response & Evaluation System</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          {isHome && (
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <a href="#how-it-works" className="hover:text-ires-primary transition-colors">How It Works</a>
              <a href="#features" className="hover:text-ires-primary transition-colors">Features</a>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/upload" className="hidden sm:block">
              <Button variant="primary" className="!py-2 !px-4 !text-sm">Start Interview</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
