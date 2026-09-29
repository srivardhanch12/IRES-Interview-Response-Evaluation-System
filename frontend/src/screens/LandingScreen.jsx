import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Mic, FileText, BrainCircuit, ShieldCheck, ArrowRight, Activity, ChevronRight, CheckCircle2, User, Play, MessageSquare, LineChart } from 'lucide-react';
import RoleCarousel from '../components/interview/RoleCarousel';

const LandingScreen = () => {
  const navigate = useNavigate();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Hero Avatar Animation State
  const [heroState, setHeroState] = useState('Listening');
  
  useEffect(() => {
    const cycleStates = () => {
      setHeroState(prev => {
        if (prev === 'Listening') return 'Thinking';
        if (prev === 'Thinking') return 'Speaking';
        if (prev === 'Speaking') return 'Idle';
        return 'Listening';
      });
    };
    const interval = setInterval(cycleStates, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-6 z-10"
          >
            <motion.div variants={fadeIn} className="inline-block">
              <span className="bg-ires-primary/10 border border-ires-primary/20 text-ires-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm shadow-sm">
                AI-Powered Interview Intelligence
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Practice smarter. <br/>
              <span className="gradient-text">Perform stronger.</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
              An AI-powered interview simulation and response evaluation platform designed to deliver realistic, role-specific interview experiences with intelligent performance analysis and actionable feedback.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => navigate('/upload')} icon={<ArrowRight size={20} />} className="w-full sm:w-auto">
                Start IRES Interview
              </Button>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full">
                  Explore How It Works
                </Button>
              </a>
            </motion.div>
          </motion.div>
          
          {/* Hero Visual - Animated Product Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 lg:ml-auto w-full max-w-md"
          >
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-ires-secondary/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-ires-primary/20 rounded-full blur-[80px]" />
            
            <div className="glass-card rounded-2xl overflow-hidden relative shadow-2xl shadow-ires-primary/10 border border-white/40 dark:border-slate-700/60">
              
              {/* Header */}
              <div className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-ires-primary" />
                  <span className="font-semibold text-sm">IRES Session</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
              </div>
              
              {/* Body */}
              <div className="p-6 flex flex-col gap-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                
                {/* AI Avatar Mock */}
                <div className="flex flex-col items-center justify-center gap-4 py-4">
                  <div className="relative">
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-ires-primary/20 blur-xl"
                      animate={
                        heroState === 'Speaking' ? { scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] } :
                        heroState === 'Listening' ? { scale: [1, 1.1, 1] } : { scale: 1 }
                      }
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-ires-primary to-ires-secondary flex items-center justify-center relative z-10 shadow-lg border-2 border-white/20">
                      {heroState === 'Speaking' ? <Activity className="w-8 h-8 text-white" /> : <BrainCircuit className="w-8 h-8 text-white" />}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-semibold">Interviewer</span>
                    <span className="text-xs text-ires-primary font-medium bg-ires-primary/10 px-2 py-0.5 rounded-full">
                      {heroState}...
                    </span>
                  </div>
                </div>

                {/* Dialog Mock */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none text-sm shadow-sm">
                    Tell me about a time you optimized a React application's performance.
                  </div>
                </div>

                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-ires-primary/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-ires-primary" />
                  </div>
                  <div className="bg-ires-primary text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-md">
                    {heroState === 'Listening' ? (
                      <div className="flex items-center gap-1 h-5">
                        <motion.div className="w-1.5 h-1.5 bg-white rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                        <motion.div className="w-1.5 h-1.5 bg-white rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                        <motion.div className="w-1.5 h-1.5 bg-white rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                      </div>
                    ) : (
                      "I recently used useMemo and React.memo to prevent unnecessary re-renders..."
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Role Carousel Element */}
            <div className="absolute -bottom-6 -left-8 z-20 scale-75 origin-bottom-left shadow-2xl rounded-2xl bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700">
               <RoleCarousel />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CAPABILITIES / FEATURES SECTION */}
      <section id="features" className="py-24 px-6 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to <span className="gradient-text">interview with confidence.</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">We combine advanced language models with voice technology to simulate real-world technical and behavioral interviews.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Feature Cards */}
            {[
              { icon: FileText, title: "Resume Intelligence", desc: "Upload your resume and let IRES use your background to create highly relevant interview context.", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: BrainCircuit, title: "Adaptive Interviews", desc: "Receive role-specific technical and behavioral questions perfectly tailored to your selected target role.", color: "text-purple-500", bg: "bg-purple-500/10" },
              { icon: Mic, title: "Voice-First Experience", desc: "Answer naturally using speech recognition or switch seamlessly to text responses when needed.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: ShieldCheck, title: "Intelligent Evaluation", desc: "Receive structured scoring, strengths, weaknesses, and targeted improvement recommendations.", color: "text-orange-500", bg: "bg-orange-500/10" }
            ].map((f, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Card className="h-full flex flex-col p-6 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-ires-primary/10 bg-slate-50 dark:bg-slate-900/50">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.bg} ${f.color}`}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed flex-1">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">How IRES Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-ires-primary/40 via-ires-secondary/40 to-ires-primary/40 origin-left" 
            />
            
            {[
              { step: '01', title: 'Upload Resume', desc: 'Securely upload your PDF.' },
              { step: '02', title: 'Select Role', desc: 'Pick your target job title.' },
              { step: '03', title: 'Complete Interview', desc: 'Answer 5 generated questions.' },
              { step: '04', title: 'Review Evaluation', desc: 'Get your actionable feedback.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center z-10"
              >
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-900 shadow-xl flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-ires-primary to-ires-secondary opacity-10" />
                  <span className="text-2xl font-bold gradient-text">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-500 font-medium text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERVIEW EXPERIENCE PREVIEW */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            {/* Visual Interface Mock */}
            <div className="glass-card p-2 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-ires-primary/5 to-ires-secondary/5 rounded-3xl" />
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 relative z-10">
                <div className="flex flex-col items-center justify-center mb-10">
                  <div className="w-32 h-32 rounded-full border-4 border-ires-primary/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 border-4 border-ires-primary rounded-full border-t-transparent animate-spin" />
                    <BrainCircuit className="w-12 h-12 text-ires-primary" />
                  </div>
                  <div className="mt-6 flex items-center gap-2 bg-ires-primary/10 text-ires-primary px-4 py-1.5 rounded-full font-semibold">
                    <Mic className="w-4 h-4 animate-pulse" />
                    Listening to your response...
                  </div>
                </div>
                
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-ires-primary w-2/5 h-full rounded-full" />
                </div>
                <p className="text-xs text-center text-slate-500 font-medium uppercase tracking-widest">Question 2 of 5</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold">A more realistic <br/>way to practice.</h2>
            <ul className="flex flex-col gap-4 mt-4">
              {[
                "AI-generated role-specific questions",
                "Voice and text response support",
                "Real-time interview interaction",
                "Progressive questioning logic"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500/10 text-green-500 rounded-full p-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-medium text-slate-700 dark:text-slate-300">{text}</span>
                </li>
              ))}
            </ul>
            <div className="pt-6">
               <Button onClick={() => navigate('/upload')} icon={<Play size={18} />}>Try it now</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. EVALUATION PREVIEW */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold">Measure your <br/><span className="gradient-text">actual progress.</span></h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Stop guessing how you did. IRES analyzes your transcribed answers and provides a structured evaluation, scoring your technical depth and communication skills.
            </p>
            <ul className="flex flex-col gap-4 mt-4">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <LineChart className="text-ires-secondary w-5 h-5" /> Quantitative Scoring
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <ShieldCheck className="text-ires-secondary w-5 h-5" /> Concrete Strengths & Weaknesses
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                <MessageSquare className="text-ires-secondary w-5 h-5" /> Specific Actionable Advice
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Evaluation Mock */}
            <Card className="p-8 shadow-2xl border-t-4 border-t-ires-secondary">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">Interview Evaluation</h3>
                  <p className="text-sm text-slate-500">Frontend Developer Role</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-ires-secondary flex items-center justify-center">
                  <span className="text-xl font-bold text-ires-secondary">8.5</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>Technical Depth</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-ires-primary w-[85%] h-full rounded-full" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>Communication</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-ires-accent w-[90%] h-full rounded-full" />
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><CheckCircle2 className="text-green-500 w-4 h-4"/> Key Strength</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Excellent structural explanation of React component lifecycles and modern hook replacements.</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 premium-gradient opacity-90 -z-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 md:p-16 rounded-3xl w-full border border-white/20 dark:border-white/10"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Ready to test your interview readiness?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-10 max-w-2xl mx-auto">
              Practice with IRES and turn every interview into measurable progress. Upload your resume and start a free session today.
            </p>
            <Button onClick={() => navigate('/upload')} className="mx-auto !px-8 !py-4 text-lg">
              Start IRES Interview <ChevronRight className="ml-1" />
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingScreen;
