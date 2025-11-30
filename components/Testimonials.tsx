
import React from 'react';
import { Quote } from 'lucide-react';
import { Reveal } from './Reveal';

const REVIEWS = [
  {
    text: "I used to spend hours tweaking UDim2 values. Dalley automates all the scaling. Essential for any Roblox dev.",
    author: "builderman_99",
    role: "Front Page Developer"
  },
  {
    text: "The Lua export is surprisingly clean. It writes code exactly how I would, but 10x faster.",
    author: "CrystalStudios",
    role: "Studio Lead"
  },
  {
    text: "Finally, a tool that makes UI animations accessible. My game engagement went up just from the polished menus.",
    author: "NeonDev",
    role: "UI Artist"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-32 bg-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
            <h2 className="font-sans text-3xl font-bold mb-16 text-center text-white">Community <span className="text-pink-500">Love</span></h2>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <Reveal key={index} delay={index * 0.1} variant="fade">
              <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/50 hover:border-pink-500/30 transition-colors relative group">
                <Quote className="w-8 h-8 text-pink-500/20 mb-6 group-hover:text-pink-500/50 transition-colors" />
                <p className="text-zinc-300 text-lg leading-relaxed mb-8 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 p-[1px]">
                     <div className="w-full h-full rounded-full bg-zinc-900"></div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{review.author}</div>
                    <div className="text-zinc-500 text-xs">{review.role}</div>
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
