import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { roles } from '../data/roles';
import { Search, Code, Server, Database, Users, Briefcase, Monitor, LineChart, Shield, ArrowRight, CheckCircle2, Cpu, Cloud, PenTool, BrainCircuit } from 'lucide-react';

// Helper to map role strings to icons and descriptions
const getRoleDetails = (roleName) => {
  const name = roleName.toLowerCase();
  if (name.includes('frontend') || name.includes('ui')) return { icon: Monitor, desc: 'React, Vue, UI/UX, Browser APIs' };
  if (name.includes('backend') || name.includes('server')) return { icon: Server, desc: 'Node, Python, Go, Microservices' };
  if (name.includes('data') || name.includes('analytics')) return { icon: LineChart, desc: 'SQL, Python, Pipelines, BI' };
  if (name.includes('machine') || name.includes('ai')) return { icon: BrainCircuit, desc: 'LLMs, PyTorch, Model Training' };
  if (name.includes('devops') || name.includes('cloud')) return { icon: Cloud, desc: 'AWS, CI/CD, Kubernetes, Docker' };
  if (name.includes('security') || name.includes('cyber')) return { icon: Shield, desc: 'Pen Testing, IAM, Compliance' };
  if (name.includes('product') || name.includes('manager')) return { icon: Briefcase, desc: 'Strategy, Agile, Roadmaps' };
  if (name.includes('hr') || name.includes('human')) return { icon: Users, desc: 'Recruiting, Culture, Operations' };
  return { icon: Code, desc: 'Software Engineering Principles' }; // fallback
};

const RoleSelectScreen = ({ sessionId, setRole }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

  if (!sessionId) {
    return <Navigate to="/upload" replace />;
  }

  const filteredRoles = roles.filter(r => r.toLowerCase().includes(search.toLowerCase()));

  const handleContinue = () => {
    if (selectedRole) {
      setRole(selectedRole);
      navigate('/interview');
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center py-12 px-4 sm:px-6 relative bg-slate-50/50 dark:bg-[#0B0F19] min-h-[calc(100vh-80px)]">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-ires-primary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50 mb-6"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Step 2 of 3</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Select Target Role</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Choose the specific position you're interviewing for. Our AI will align its technical and behavioral assessment to match industry standards for this role.
          </p>
        </div>

        <div className="mb-8 relative max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-slate-400 group-focus-within:text-ires-primary transition-colors" size={20} />
          </div>
          <input
            type="text"
            className="w-full pl-14 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-ires-primary/50 focus:border-ires-primary/50 text-slate-800 dark:text-slate-200 shadow-sm transition-all text-lg"
            placeholder="Search roles (e.g. Frontend Developer)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 pb-6 max-h-[60vh] overflow-y-auto px-2 -mx-2 custom-scrollbar">
          {filteredRoles.map((roleStr) => {
            const { icon: Icon, desc } = getRoleDetails(roleStr);
            const isSelected = selectedRole === roleStr;
            
            return (
              <motion.div
                key={roleStr}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole(roleStr)}
                className="cursor-pointer h-full"
              >
                <Card 
                  className={`relative h-full flex flex-col p-6 transition-all duration-300 overflow-hidden ${
                    isSelected 
                      ? 'border-ires-primary ring-1 ring-ires-primary shadow-lg shadow-ires-primary/20 bg-white dark:bg-slate-800' 
                      : 'border-slate-200 dark:border-slate-800/80 hover:border-ires-primary/40 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800/80 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Subtle active background gradient */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-br from-ires-primary/5 to-transparent pointer-events-none" />
                  )}

                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className={`p-3 rounded-xl transition-colors ${isSelected ? 'bg-ires-primary text-white shadow-md shadow-ires-primary/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                      <Icon size={24} strokeWidth={isSelected ? 2.5 : 2} />
                    </div>
                    
                    <div className={`transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                      <CheckCircle2 className="text-ires-primary" size={24} />
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className={`font-bold text-lg mb-1 transition-colors ${isSelected ? 'text-ires-primary dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                      {roleStr}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
          
          {filteredRoles.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                <Search className="text-slate-400" size={32} />
              </div>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">No roles found</p>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search query.</p>
            </div>
          )}
        </div>

        <motion.div 
          className="flex justify-center sticky bottom-6 z-20"
          initial={false}
          animate={{ y: selectedRole ? 0 : 20, opacity: selectedRole ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="bg-white/80 dark:bg-slate-900/80 p-2 rounded-2xl backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl">
            <Button 
              variant="primary" 
              size="lg"
              className="px-10 !rounded-xl group shadow-ires-primary/25"
              disabled={!selectedRole}
              onClick={handleContinue}
            >
              <span className="flex items-center gap-2 text-lg">
                Continue to Interview
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.4);
        }
      `}} />
    </div>
  );
};

export default RoleSelectScreen;
