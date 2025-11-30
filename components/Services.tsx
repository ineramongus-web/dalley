
import React, { useRef, useState } from 'react';
import { MousePointer2, Code2, Smartphone, Zap, Cloud, Layout } from 'lucide-react';
import { Reveal } from './Reveal';
import { TextReveal } from './TextReveal';

const featuresList = [
  {
    title: 'Cloud Editor',
    description: 'Design anywhere. Your projects sync automatically to the cloud.',
    icon: <Cloud className="w-6 h-6" />,
    colSpan: 'md:col-span-2'
  },
  {
    title: 'Lua Export',
    description: 'Generates clean, readable ModuleScripts.',
    icon: <Code2 className="w-6 h-6" />,
    colSpan: 'md:col-span-1'
  },
  {
    title: 'Responsive',
    description: 'Constraints scale for Mobile & Console.',
    icon: <Smartphone className="w-6 h-6" />,
    colSpan: 'md:col-span-1'
  },
  {
    title: 'SPR Motion',
    description: 'Physics-based spring animations built-in.',
    icon: <Zap className="w-6 h-6" />,
    colSpan: 'md:col-span-1'
  },
  {
    title: 'Component Kits',
    description: 'Drag & drop HUDs, Inventories, and Shop systems.',
    icon: <Layout className="w-6 h-6" />,
    colSpan: 'md:col-span-2'
  },
];

const TiltCard = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    };

    return (
        <div 
            ref={ref} 
            className={className} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
            style={{ transform, transition: 'transform 0.1s ease-out' }}
        >
            {children}
        </div>
    );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 relative bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="w-full">
            <h2 className="font-sans text-5xl md:text-6xl font-bold mb-6 text-white flex gap-3 flex-wrap">
              <TextReveal>Why</TextReveal> <span className="text-pink-500"><TextReveal delay={0.2}>Dalley?</TextReveal></span>
            </h2>
            <Reveal width="100%">
               <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-white rounded-full"></div>
            </Reveal>
          </div>
          <Reveal delay={0.2} variant="slide-right" width="100%">
            <p className="text-zinc-400 max-w-sm text-right md:text-left text-lg">
              The first web-based Roblox UI tool. Stop fighting with UDim2. Start creating.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuresList.map((feature, index) => (
            <Reveal key={index} delay={index * 0.1} variant="zoom" className={feature.colSpan} width="100%">
              <TiltCard className="group relative h-full bg-zinc-900/40 border border-white/5 p-8 rounded-3xl overflow-hidden hover:bg-zinc-900/80 transition-colors duration-500 hover:border-pink-500/30 hover:shadow-2xl">
                
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-zinc-950 border border-white/10 rounded-xl text-pink-400 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-lg">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 group-hover:text-zinc-200 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
