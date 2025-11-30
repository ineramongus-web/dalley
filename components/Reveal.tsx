import React, { useEffect, useRef, useState } from 'react';

type RevealVariant = 'fade' | 'slide-up' | 'slide-right' | 'zoom' | 'blur';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  variant?: RevealVariant;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = 'fit-content', 
  delay = 0,
  variant = 'slide-up',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Check visibility on mount after a tick to allow layout paint
    const initialCheckTimer = setTimeout(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            // If element is already in view (like Hero), show immediately
            if (rect.top < window.innerHeight) { 
                setIsVisible(true);
            }
        }
    }, 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' // Trigger when 50px into viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(initialCheckTimer);
    };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (variant) {
        case 'slide-up': return 'translateY(50px)';
        case 'slide-right': return 'translateX(-50px)';
        case 'zoom': return 'scale(0.95)';
        default: return 'translateY(0)';
      }
    }
    return 'translate(0) scale(1)';
  };

  const getOpacity = () => isVisible ? 1 : 0;
  
  const getFilter = () => {
    if (variant === 'blur' && !isVisible) return 'blur(10px)';
    return 'blur(0)';
  };

  return (
    <div ref={ref} style={{ width, minHeight: '1px' }} className={`relative ${className}`}>
      <div
        style={{
          transform: getTransform(),
          opacity: getOpacity(),
          filter: getFilter(),
          transition: `all 1.0s cubic-bezier(0.17, 0.55, 0.55, 1) ${isVisible ? delay : 0}s`,
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </div>
    </div>
  );
};