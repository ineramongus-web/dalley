
import React, { useState } from 'react';
import { PenTool, Film, Code, Rocket, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';

const STEPS = [
  {
    icon: <PenTool />,
    title: 'Design',
    desc: 'Drag & drop frames, buttons, and scrolling lists using our intuitive editor.',
    tip: 'Auto-layout constraints included.'
  },
  {
    icon: <Film />,
    title: 'Animate',
    desc: 'Use the timeline to create complex tweens without writing TweenInfo manually.',
    tip: 'Real-time curve visualization.'
  },
  {
    icon: <Code />,
    title: 'Export',
    desc: 'Get a .lua file or a Model file compatible directly with Roblox Studio.',
    tip: 'Optimized ModuleScripts.'
  },
  {
    icon: <Rocket />,
    title: 'Publish',
    desc: 'Implement into your game instantly. Zero lag, fully optimized.',
    tip: 'Zero-dependency runtime.'
  }
];

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-32 bg-void relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-24">
            <h2 className="font-sans text-4xl md:text-5xl font-bold mb-4 text-white">The Workflow</h2>
            <p className="text-zinc-500">From concept to game in minutes. Click a step to explore.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-zinc-800">
             <div 
               className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 transition-all duration-500"
               style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
             ></div>
          </div>

          {STEPS.map((step, index) => (
            <Reveal key={index} delay={index * 0.2} variant="slide-up">
              <div 
                className={`relative pt-8 md:pt-0 group cursor-pointer transition-transform duration-500 ${activeStep === index ? '-translate-y-4' : 'hover:-translate-y-2'}`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`w-24 h-24 border rounded-2xl flex items-center justify-center mb-8 relative z-10 mx-auto md:mx-0 shadow-xl transition-all duration-300 ${activeStep === index ? 'bg-zinc-900 border-pink-500 shadow-pink-500/20' : 'bg-surface border-white/10 group-hover:border-zinc-700'}`}>
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-colors ${activeStep === index ? 'bg-pink-500 text-white' : 'bg-zinc-900 text-zinc-400 group-hover:text-white'}`}>
                     {React.cloneElement(step.icon as React.ReactElement, { className: 'w-8 h-8' })}
                  </div>
                </div>
                <div className="text-center md:text-left">
                    <div className={`text-xs font-bold mb-2 uppercase tracking-widest transition-colors ${activeStep === index ? 'text-pink-500' : 'text-zinc-600'}`}>Step 0{index + 1}</div>
                    <h3 className={`text-xl font-bold mb-3 transition-colors ${activeStep === index ? 'text-white' : 'text-zinc-300'}`}>{step.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                    
                    {/* Active Tip */}
                    <div className={`mt-4 overflow-hidden transition-all duration-500 ${activeStep === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                       <div className="flex items-center gap-2 text-pink-400 text-xs font-bold">
                          <ChevronRight className="w-3 h-3" /> {step.tip}
                       </div>
                    </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
