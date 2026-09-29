import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, File, X, CheckCircle, AlertCircle, ArrowRight, FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { uploadResume } from '../services/api';

const UploadScreen = ({ setSessionId }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (file) => {
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      setStatus('error');
      setErrorMessage('Only PDF files are allowed.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setStatus('error');
      setErrorMessage('File size exceeds 5MB limit.');
      return;
    }
    
    setFile(file);
    setStatus('idle');
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setStatus('uploading');
    try {
      const data = await uploadResume(file);
      if (data.success) {
        setSessionId(data.sessionId);
        setStatus('success');
        setTimeout(() => navigate('/role'), 1200);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to upload resume.');
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-6 relative bg-slate-50/50 dark:bg-[#0B0F19] min-h-[calc(100vh-80px)]">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ires-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ires-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/50 dark:border-slate-700/50 mb-6"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Step 1 of 3</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">Upload Your Resume</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto font-medium">
            We use your professional experience to tailor the interview questions specifically for you.
          </p>
        </div>
        
        <Card className="!p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/40 border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className={`relative overflow-hidden border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                    isDragging 
                      ? 'border-ires-primary bg-ires-primary/5 dark:bg-ires-primary/10 scale-[1.02]' 
                      : 'border-slate-300 dark:border-slate-700 hover:border-ires-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <motion.div
                    animate={isDragging ? { y: -10 } : { y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={`p-4 rounded-2xl mb-6 transition-colors duration-300 ${isDragging ? 'bg-ires-primary/10 text-ires-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                      <UploadCloud className="w-10 h-10" />
                    </div>
                  </motion.div>
                  
                  <p className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">
                    Click or drag PDF to upload
                  </p>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Max file size: 5MB
                  </p>
                  
                  {/* Subtle decorative corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-ires-primary/20 rounded-tl-xl transition-colors" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-ires-primary/20 rounded-tr-xl transition-colors" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-ires-primary/20 rounded-bl-xl transition-colors" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-ires-primary/20 rounded-br-xl transition-colors" />

                  <input 
                    type="file" 
                    accept="application/pdf"
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="file-selected"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-8"
              >
                <div className="flex items-center gap-5 p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 rounded-2xl group hover:border-ires-primary/30 transition-colors">
                  <div className="p-4 bg-ires-primary/10 dark:bg-ires-primary/20 text-ires-primary rounded-xl shrink-0">
                    <FileText size={28} className="drop-shadow-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate text-lg">{file.name}</p>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
                  </div>
                  {status !== 'uploading' && status !== 'success' && (
                    <button 
                      onClick={() => setFile(null)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                      title="Remove file"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 p-4 rounded-xl border border-red-100 dark:border-red-500/20"
                    >
                      <AlertCircle size={20} className="shrink-0" />
                      <span className="text-sm font-semibold">{errorMessage}</span>
                    </motion.div>
                  )}
                  
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20"
                    >
                      <CheckCircle size={20} className="shrink-0" />
                      <span className="text-sm font-semibold">Upload successful! Redirecting...</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button 
                  onClick={handleUpload} 
                  disabled={status === 'uploading' || status === 'success'}
                  className="w-full justify-center !py-4 !rounded-xl text-lg group"
                >
                  {status === 'uploading' ? (
                    <span className="flex items-center gap-2">
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Analyzing Resume...
                    </span>
                  ) : status === 'success' ? (
                    'Success'
                  ) : (
                    <span className="flex items-center gap-2">
                      Continue to Role Selection
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
};

export default UploadScreen;
