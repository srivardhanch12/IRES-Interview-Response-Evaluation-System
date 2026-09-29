import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import UploadScreen from './screens/UploadScreen';
import RoleSelectScreen from './screens/RoleSelectScreen';
import InterviewScreen from './screens/InterviewScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10 overflow-hidden">
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/upload" element={<UploadScreen setSessionId={setSessionId} />} />
            <Route path="/role" element={<RoleSelectScreen sessionId={sessionId} setRole={setRole} />} />
            <Route path="/interview" element={<InterviewScreen sessionId={sessionId} role={role} />} />
            <Route path="/feedback" element={<FeedbackScreen sessionId={sessionId} />} />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Background blobs for premium feel */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-50 dark:opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-ires-primary/30 blur-[100px] animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-ires-secondary/20 blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-ires-accent/20 blur-[120px] animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>
    </Router>
  );
}

export default App;
