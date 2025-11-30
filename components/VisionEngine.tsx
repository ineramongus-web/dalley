import React, { useState } from 'react';
import { Sparkles, Loader2, FileText, CheckCircle2, AlertCircle, Terminal, Zap } from 'lucide-react';
import { generateProjectBrief } from '../services/geminiService';
import { AIResponse } from '../types';
import { Reveal } from './Reveal';

export const VisionEngine: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [brief, setBrief] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setBrief(null);
    try {
      const data = await generateProjectBrief(prompt);
      setBrief(data);
    } catch (err) {
      setError('Could not generate brief. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="vision-engine" className="py-32 relative overflow-hidden bg-black border-y border-white/5">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.05),transparent_70%)]"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Reveal width="100%" variant="zoom">
            <div className="inline-flex items-center gap-2 text-indigo-400 mb-6 bg-indigo-950/30 px-4 py-1.5 rounded-full border border-indigo-900/50">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">AI Powered • Gemini 2.5</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              The Vision Engine
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Skip the blank page. Input your raw ideas, and watch as our neural network structures a professional scope of work instantly.
            </p>
          </Reveal>
        </div>

        <Reveal width="100%" delay={0.2} variant="slide-up">
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500 rounded-2xl opacity-30 group-hover:opacity-60 blur-lg transition duration-500"></div>
            
            <div className="relative bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-zinc-900/50 px-4 py-2 border-b border-white/5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="ml-2 text-xs text-zinc-500 font-mono flex items-center gap-1">
                   <Terminal className="w-3 h-3" />
                   vision-engine.exe
                </div>
              </div>

              <div className="p-2">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your project: e.g., 'A cyberpunk-themed portfolio for a music producer with 3D audio visualization...'"
                  className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 focus:outline-none placeholder:text-zinc-700 text-lg min-h-[120px] resize-none font-mono"
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                       e.preventDefault();
                       handleGenerate();
                     }
                  }}
                />
                
                <div className="flex justify-between items-center px-4 pb-2 mt-2">
                  <span className="text-xs text-zinc-600 font-mono">
                    {prompt.length > 0 ? `${prompt.length} chars` : 'Ready for input...'}
                  </span>
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="bg-white hover:bg-zinc-200 text-black px-6 py-2 rounded-md font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-mono uppercase tracking-wider"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing
                      </>
                    ) : (
                      <>
                        Initialize <Zap className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {error && (
            <div className="max-w-3xl mx-auto mt-6 p-4 bg-red-950/30 border border-red-900/50 rounded-lg text-red-300 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5" />
                {error}
            </div>
        )}

        {brief && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-12 duration-700">
            <div className="glass-panel rounded-3xl p-8 md:p-12 border-t border-t-teal-500/30 shadow-2xl shadow-teal-900/20 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-12 border-b border-white/5 pb-8 relative z-10">
                <div>
                  <div className="text-teal-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">Generated Blueprint</div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white">{brief.briefTitle}</h3>
                </div>
                <div className="bg-white/5 px-6 py-3 rounded-lg border border-white/5 backdrop-blur-sm">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Estimated Timeline</div>
                  <div className="text-white font-mono text-lg text-teal-300">{brief.estimatedTimeline}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-12 relative z-10">
                <div className="md:col-span-3 space-y-10">
                  <div className="group">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 group-hover:text-teal-400 transition-colors">
                      <FileText className="w-4 h-4" /> Executive Summary
                    </h4>
                    <p className="text-zinc-200 text-lg leading-relaxed font-light">
                      {brief.summary}
                    </p>
                  </div>

                  <div className="group">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 group-hover:text-indigo-400 transition-colors">
                      <Sparkles className="w-4 h-4" /> Art Direction
                    </h4>
                    <p className="text-zinc-300 italic border-l-2 border-indigo-500/50 pl-6 py-2 bg-indigo-500/5 rounded-r-lg">
                      "{brief.creativeDirection}"
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-zinc-950/50 rounded-2xl p-6 border border-white/10 h-full">
                    <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Required Modules</h4>
                    <ul className="space-y-4">
                      {brief.recommendedServices.map((service, i) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-300 group">
                          <CheckCircle2 className="w-5 h-5 text-zinc-600 group-hover:text-teal-500 transition-colors mt-0.5" />
                          <span className="group-hover:text-white transition-colors">{service}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 pt-6 border-t border-white/5">
                      <button className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-all hover:scale-[1.02] shadow-lg shadow-teal-900/50">
                        Book Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};