import React, { useState } from 'react';
import { Play, Code2, Layers, MousePointer2, ExternalLink, Move } from 'lucide-react';
import { Reveal } from './Reveal';
import { TextReveal } from './TextReveal';
import { DotGrid } from './DotGrid';

interface HeroProps {
  onNavigate: (view: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-void">
      {/* Background Ambience & Dot Grid */}
      <DotGrid />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 animate-blob pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10 mb-20 mt-10">
        <div className="flex flex-col gap-8">
          <Reveal variant="fade">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-300 text-xs font-bold tracking-widest uppercase mb-4 hover:bg-pink-500/10 transition-colors cursor-default shadow-[0_0_15px_-3px_rgba(236,72,153,0.2)]">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
              Web Beta Live
            </div>
          </Reveal>
          
          <div>
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-white">
              <TextReveal delay={0.1}>Roblox Design</TextReveal>
              <div className="mt-2"></div>
              <Reveal delay={0.4} variant="slide-up" width="100%">
                 <span className="gradient-accent block pb-4">Made Easy.</span>
              </Reveal>
            </h1>
          </div>

          <Reveal delay={0.5} variant="slide-up">
            <p className="text-zinc-400 text-lg md:text-xl max-w-lg leading-relaxed border-l-2 border-pink-500/30 pl-6">
              Dalley is the first web-based UI editor for Roblox. Create SPR-powered interfaces, export to Lua, and sync to Studio instantly. No downloads required.
            </p>
          </Reveal>

          <Reveal delay={0.6} variant="slide-up">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('editor')}
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-pink-100 hover:scale-105 transition-all flex items-center gap-2 group shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] active:scale-95 duration-200"
              >
                Try Beta <ExternalLink className="w-4 h-4 text-black transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#showcase"
                className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-200 transition-all flex items-center gap-2 active:scale-95 duration-200"
              >
                See Examples
              </a>
            </div>
          </Reveal>
        </div>

        {/* Hero Visual - UI Tool Interface */}
        <div className="hidden lg:block relative h-[600px] w-full perspective-1000">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Draggable/Interactive Badge */}
             <div 
               className="absolute -top-10 -right-10 z-30 cursor-move"
               onMouseEnter={() => setHovered(true)}
               onMouseLeave={() => setHovered(false)}
             >
                <div className={`bg-pink-500 text-white p-4 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.5)] transform transition-transform duration-300 ${hovered ? 'scale-110 rotate-12' : 'animate-float-delayed'}`}>
                   <Move className="w-6 h-6" />
                </div>
             </div>

            {/* Main Interface Card */}
            <div className="w-[580px] h-[380px] bg-[#0F0F0F] rounded-xl border border-white/10 absolute z-20 transform rotate-y-[-10deg] rotate-x-[5deg] animate-float shadow-2xl shadow-pink-900/20 overflow-hidden group hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-transform duration-700">
               {/* Browser Bar */}
               <div className="h-8 bg-[#1a1a1a] border-b border-white/5 flex items-center px-3 gap-2">
                 <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
                 </div>
                 <div className="bg-[#050505] text-zinc-500 text-[10px] px-3 py-1 rounded-md flex-1 text-center font-mono">
                   dalley.web/editor/project-01
                 </div>
               </div>
               
               {/* Layout */}
               <div className="flex h-full">
                 <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-6 text-zinc-600">
                    <MousePointer2 className="w-5 h-5 text-pink-500" />
                    <Layers className="w-5 h-5 hover:text-white transition-colors" />
                    <Code2 className="w-5 h-5 hover:text-white transition-colors" />
                 </div>
                 <div className="flex-1 p-6 relative bg-grid-white/[0.02]">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(236,72,153,0.03)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none"></div>
                    {/* Mock UI Elements */}
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-64 bg-zinc-900/90 backdrop-blur border border-white/10 rounded-xl p-4 shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                            <div className="flex justify-between items-center mb-4">
                                <div className="h-2 w-16 bg-zinc-700 rounded-full"></div>
                                <div className="w-4 h-4 rounded-full bg-pink-500 animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-8 w-full bg-zinc-800 rounded-lg border border-white/5 overflow-hidden">
                                  <div className="h-full w-2/3 bg-zinc-700/50 animate-pulse"></div>
                                </div>
                                <div className="h-8 w-full bg-zinc-800 rounded-lg border border-white/5"></div>
                                <div className="h-8 w-full bg-pink-600 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:bg-pink-500 cursor-pointer transition-colors">
                                    CONFIRM
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
                 <div className="w-48 border-l border-white/5 bg-[#141414] p-4 font-mono text-[10px]">
                    <div className="text-zinc-500 mb-2">Properties</div>
                    <div className="space-y-3">
                        <div>
                            <div className="text-zinc-600 mb-1">BackgroundColor</div>
                            <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 bg-zinc-900 rounded border border-white/10"></div>
                                <span className="text-zinc-400">#18181B</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-zinc-600 mb-1">CornerRadius</div>
                            <div className="w-full bg-zinc-900 h-1 rounded overflow-hidden">
                                <div className="w-1/2 h-full bg-pink-500"></div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <div className="text-pink-500 mb-1">SPR Config</div>
                            <div className="text-zinc-400">Damping: 0.8</div>
                            <div className="text-zinc-400">Freq: 4.5</div>
                        </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};