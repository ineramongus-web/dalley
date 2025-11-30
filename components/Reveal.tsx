
import React from 'react';
import { motion, Variants } from 'framer-motion';

type RevealVariant = 'fade' | 'slide-up' | 'slide-right' | 'zoom' | 'blur';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  duration?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = 'fit-content', 
  delay = 0,
  variant = 'slide-up',
  className = '',
  duration = 0.5
}) => {
  
  const getVariants = (): Variants => {
    switch (variant) {
        case 'slide-up':
            return {
                hidden: { opacity: 0, y: 75, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
            };
        case 'slide-right':
            return {
                hidden: { opacity: 0, x: -75, filter: 'blur(10px)' },
                visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
            };
        case 'zoom':
            return {
                hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
                visible: { opacity: 1, scale: 1, filter: 'blur(0px)' }
            };
        case 'blur':
            return {
                hidden: { opacity: 0, filter: 'blur(20px)' },
                visible: { opacity: 1, filter: 'blur(0px)' }
            };
        case 'fade':
        default:
            return {
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
            };
    }
  };

  return (
    <div style={{ width, position: 'relative' }} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10% 0px -10% 0px" }} // Triggers reverse on scroll out
        transition={{ duration: duration, delay: delay, ease: [0.25, 0.25, 0, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
