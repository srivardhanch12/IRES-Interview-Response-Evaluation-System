import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className="w-10 h-10 text-ires-primary animate-spin" />
      <p className="text-slate-600 dark:text-slate-400 font-medium animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingState;
