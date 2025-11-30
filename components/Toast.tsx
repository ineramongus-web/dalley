
import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />
  };

  const bgColors = {
    success: 'bg-[#0f0f12] border-green-500/20 shadow-[0_4px_20px_-4px_rgba(34,197,94,0.1)]',
    error: 'bg-[#0f0f12] border-red-500/20 shadow-[0_4px_20px_-4px_rgba(248,113,113,0.1)]',
    info: 'bg-[#0f0f12] border-blue-500/20 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.1)]'
  };

  return (
    <div className={`relative w-full md:w-auto min-w-[300px] flex items-center gap-3 p-4 rounded-xl border ${bgColors[type]} animate-slide-up-fade backdrop-blur-md`}>
      <div className="shrink-0">
        {icons[type]}
      </div>
      <p className="text-sm font-medium text-white flex-1">{message}</p>
      <button 
        onClick={() => onClose(id)}
        className="shrink-0 p-1 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
