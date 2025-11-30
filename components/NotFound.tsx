
import React from 'react';
import { AlertTriangle, Home } from 'lucide-react';

interface NotFoundProps {
    onGoHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
        {/* Glitch Effect Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>

        <div className="relative z-10">
            <div className="text-[12rem] font-bold font-mono text-zinc-900 leading-none select-none relative">
                404
                <div className="absolute inset-0 text-pink-500/10 blur-sm animate-pulse">404</div>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-pink-500 mb-6 bg-pink-500/10 py-2 px-4 rounded-full border border-pink-500/20 w-fit mx-auto">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-bold tracking-widest uppercase text-sm">System Failure</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Lost in the Void?</h2>
            <p className="text-zinc-500 max-w-md mx-auto mb-10 text-lg">
                The requested asset could not be found in the repository. It may have been deleted or moved to a different sector.
            </p>

            <button 
                onClick={onGoHome}
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-pink-500 hover:text-white transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] flex items-center gap-2 mx-auto"
            >
                <Home className="w-5 h-5" />
                Return to Base
            </button>
        </div>
    </div>
  );
};
