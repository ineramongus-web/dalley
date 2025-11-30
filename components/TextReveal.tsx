
import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  type?: 'word' | 'char';
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  type = 'word'
}) => {
  const words = children.split(' ');
  const chars = children.split('');

  // Variants for container to orchestrate children
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: type === 'word' ? 0.12 : 0.03, delayChildren: delay }
    })
  };

  // Variants for individual elements (words or chars)
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  if (type === 'char') {
      return (
        <motion.span
          className={`inline-block ${className}`}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
        >
          {chars.map((char, index) => (
            <motion.span variants={child} key={index}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      );
  }

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', paddingBottom: '0.05em', lineHeight: 1.1 }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-10%" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
