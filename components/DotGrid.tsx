
import React, { useEffect, useRef } from 'react';

export const DotGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = -1000;
    let mouseY = -1000;

    const spacing = 30;
    const radius = 1.5;
    const hoverRadius = 150;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Columns
      for (let x = 0; x < width; x += spacing) {
        // Rows
        for (let y = 0; y < height; y += spacing) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          let currentRadius = radius;
          let color = '#27272a'; // zinc-800

          if (distance < hoverRadius) {
            // Scale up based on proximity
            const scale = 1 + (hoverRadius - distance) / hoverRadius;
            currentRadius = radius * scale;
            
            // Interpolate color towards Pink (RGB: 236, 72, 153)
            // Simple opacity shift for performance
            const alpha = 1 - (distance / hoverRadius);
            color = `rgba(236, 72, 153, ${0.2 + alpha * 0.8})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-50 pointer-events-none"
    />
  );
};
