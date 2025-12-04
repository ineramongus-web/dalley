
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Spark {
  id: number;
  x: number;
  y: number;
}

export const ClickSpark: React.FC = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Use clientX/Y (viewport relative) instead of pageX/Y (document relative)
      // because the container is fixed position.
      const newSpark = { id: Date.now(), x: e.clientX, y: e.clientY };
      setSparks(prev => [...prev, newSpark]);
      
      // Cleanup
      setTimeout(() => {
        setSparks(prev => prev.filter(s => s.id !== newSpark.id));
      }, 1000);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparks.map(spark => (
          <SparkBurst key={spark.id} x={spark.x} y={spark.y} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const SparkBurst: React.FC<{ x: number, y: number }> = ({ x, y }) => {
  // Create 8 particles in a circle
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * 45) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * 30, // Distance to travel
      y: Math.sin(angle) * 30
    };
  });

  return (
    <div style={{ left: x, top: y }} className="absolute w-0 h-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 0 }}
          animate={{ x: p.x, y: p.y, scale: [1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-pink-500' : 'bg-white'}`}
        />
      ))}
    </div>
  );
};
