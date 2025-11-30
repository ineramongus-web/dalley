import React from 'react';
import { BadgeCheck, ShieldCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  userId?: string;
  className?: string;
  size?: number;
}

const VERIFIED_UUID = "ad30f43b-514f-4b10-a2c1-3c84aeb57020";

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ userId, className = "", size = 20 }) => {
  if (userId !== VERIFIED_UUID) return null;

  // Use a slightly larger size than requested to make it pop
  const displaySize = size + 4;

  return (
    <div className={`relative inline-flex items-center justify-center group ${className}`} title="Verified Designer">
      {/* Intense Background Glow */}
      <div className="absolute inset-0 bg-blue-500/50 blur-lg rounded-full animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-white/20 blur-sm rounded-full"></div>
      
      {/* Badge Icon with Premium Gradient Fill */}
      <div className="relative z-10">
          <BadgeCheck 
            size={displaySize} 
            className="text-white fill-[#3b82f6]" 
            strokeWidth={2}
            style={{ 
                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))',
            }}
          />
          {/* Inner Highlight */}
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white/40 blur-[1px] rounded-full pointer-events-none mix-blend-overlay"></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 w-max transform translate-y-2 group-hover:translate-y-0">
        <div className="bg-[#0f0f12] border border-blue-500/40 px-4 py-2 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-xl flex items-center gap-2">
           <div className="bg-blue-500/20 p-1 rounded-full">
             <ShieldCheck className="w-3 h-3 text-blue-400" />
           </div>
           <span className="text-blue-100 text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
             Verified Creator
           </span>
           {/* Arrow */}
           <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f0f12] border-b border-r border-blue-500/40 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};