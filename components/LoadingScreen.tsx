
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DalleyLogo } from './DalleyLogo';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(timer);
                return 100;
            }
            return prev + Math.random() * 10;
        });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
        className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing Glow */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-pink-500/20 blur-[80px] rounded-full w-64 h-64 -z-10"
        />

        {/* Logo */}
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
        >
             <DalleyLogo className="w-24 h-24 text-white" variant="loading" />
        </motion.div>

        {/* Text */}
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
        >
            <h1 className="font-sans font-bold text-3xl text-white mb-2 tracking-tight">dalley.</h1>
            <p className="text-zinc-500 text-sm font-medium">Design without limits</p>
        </motion.div>

        {/* Minimal Progress Bar */}
        <div className="mt-8 w-32 h-1 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
                className="h-full bg-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "linear" }}
            />
        </div>
      </div>
    </motion.div>
  );
};
