import React from 'react';
import { PROJECTS } from '../constants';
import { Reveal } from './Reveal';

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-20">
          <Reveal>
            <h2 className="font-display text-5xl md:text-6xl font-bold">Selected <span className="text-zinc-700">Works</span></h2>
          </Reveal>
          <Reveal delay={0.2} variant="slide-right">
            <a href="#" className="hidden md:flex items-center gap-2 text-white hover:text-teal-400 transition-colors group">
              <span className="border-b border-white/20 group-hover:border-teal-400 pb-1 transition-all">View All Projects</span>
            </a>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.15} variant={index % 2 === 0 ? "slide-up" : "slide-up"} className={index % 2 !== 0 ? "md:translate-y-24" : ""}>
              <div className="group relative cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden rounded-sm bg-zinc-800 relative">
                   {/* Image Scale Effect */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-100"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500"></div>
                  
                  {/* Custom Cursor / Button that appears on hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                        <span className="text-white text-xs font-bold uppercase tracking-widest">View</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-end border-b border-white/10 pb-6 group-hover:border-teal-500/50 transition-colors duration-500">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-zinc-500 text-sm font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <div className="text-zinc-600 group-hover:text-white transition-colors duration-300 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                      0{index + 1}
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