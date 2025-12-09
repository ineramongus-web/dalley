
import React from 'react';
import { motion } from 'framer-motion';

interface DalleyLogoProps {
  className?: string;
  variant?: 'default' | 'loading' | 'hover';
}

export const DalleyLogo: React.FC<DalleyLogoProps> = ({ className = "w-8 h-8", variant = 'default' }) => {
  const variants = {
    loading: {
      rotate: 360,
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity
      }
    },
    hover: {
      scale: 1.1,
      rotate: 15,
      transition: { duration: 0.3 }
    },
    default: {
      rotate: 0,
      scale: 1
    }
  };

  return (
    <motion.div 
      className={className} 
      animate={variant} 
      variants={variants}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <img 
        src="https://i.ibb.co/whwgDG4d/logo.png"
        onError={(e) => {
          // Fallback if the guessed direct link fails.
          // Note: ibb.co links expire or require direct file paths. 
          // If this breaks, please replace with the direct .png link.
          console.warn("Logo image failed to load. Please check the URL.");
        }}
        alt="Dalley Logo" 
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};
