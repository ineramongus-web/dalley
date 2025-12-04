import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Home, LayoutTemplate, Code2, User, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DockProps {
  onNavigate: (view: string) => void;
}

export const Dock: React.FC<DockProps> = ({ onNavigate }) => {
  const mouseX = useMotionValue(Infinity);
  const { user, profile } = useAuth();

  const handleProfileClick = () => {
    if (!user) {
        window.dispatchEvent(new CustomEvent('open-auth-modal'));
    } else {
        window.dispatchEvent(new CustomEvent('open-profile-modal'));
    }
  };

  const items = [
    { id: 'home', icon: Home, label: 'Home', action: () => onNavigate('home') },
    { id: 'templates', icon: LayoutTemplate, label: 'Templates', action: () => onNavigate('templates') },
    { id: 'code', icon: Code2, label: 'Export', action: () => {
        onNavigate('home');
        setTimeout(() => document.querySelector('#code-export')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }},
    { id: 'profile', icon: User, label: 'Profile', action: handleProfileClick },
  ];

  return (
    <div 
         className="fixed top-6 right-6 z-[100] flex items-center bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50 p-2 pl-6"
         onMouseMove={(e) => mouseX.set(e.clientX)}
         onMouseLeave={() => mouseX.set(Infinity)}
    >
      {/* Logo Section */}
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 mr-4 group/logo cursor-pointer"
      >
        <Layers className="w-6 h-6 text-white group-hover/logo:text-pink-500 transition-colors duration-300" strokeWidth={2.5} />
        <span className="font-sans font-bold text-xl tracking-tight text-white group-hover/logo:text-pink-100 transition-colors">
          dalley.
        </span>
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10 mr-2"></div>

      {/* Icons Section */}
      <div className="flex items-center gap-3">
        {items.map((item) => (
          <DockIcon key={item.id} mouseX={mouseX} onClick={item.action}>
            {item.id === 'profile' && user && profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
                <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            )}
          </DockIcon>
        ))}
      </div>
    </div>
  );
};

interface DockIconProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  onClick: () => void;
}

const DockIcon: React.FC<DockIconProps> = ({ mouseX, children, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 55, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="aspect-square rounded-full bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-pink-500/20 hover:border-pink-500/50 transition-colors group overflow-hidden relative"
    >
      {children}
    </motion.div>
  );
};