
import React, { useEffect, useState } from 'react';
import { Layers, Terminal, CheckCircle2 } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Dalley Kernel...');

  useEffect(() => {
    const steps = [
      { pct: 20, msg: 'Loading Assets...' },
      { pct: 45, msg: 'Connecting to Supabase...' },
      { pct: 70, msg: 'Hydrating UI Components...' },
      { pct: 90, msg: 'Starting Vision Engine...' },
      { pct: 100, msg: 'Ready.' }
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        return;
      }

      const step = steps[currentStep];
      setProgress(step.pct);
      setStatus(step.msg);
      currentStep++;
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-mono">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.05),transparent_70%)]"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
        {/* Logo Pulse */}
        <div className="relative mb-12">
           <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-20 animate-pulse"></div>
           <Layers className="w-16 h-16 text-white animate-float" />
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden mb-4 relative">
            <div 
                className="h-full bg-gradient-to-r from-pink-600 to-purple-600 transition-all duration-500 ease-out relative"
                style={{ width: `${progress}%` }}
            >
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-white/50 blur-[5px]"></div>
            </div>
        </div>

        {/* Status Text */}
        <div className="w-full flex justify-between items-center text-xs text-zinc-500 h-6">
            <span className="flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                {status}
            </span>
            <span className="text-pink-500 font-bold">{progress}%</span>
        </div>

        {/* Decorative Code Lines */}
        <div className="mt-12 space-y-1 text-[10px] text-zinc-800 w-full text-center select-none opacity-50">
            <div>0x45F2A9 >> MEM_ALLOC_OK</div>
            <div>DALLEY_CORE_V2.1.0 >> LOADED</div>
            <div>RENDER_THREAD >> ACTIVE</div>
        </div>
      </div>
    </div>
  );
};
