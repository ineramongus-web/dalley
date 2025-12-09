import React from 'react';
import { Twitter, Github, MessageSquare } from 'lucide-react';
import { DalleyLogo } from './DalleyLogo';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const openLink = () => window.open('https://example.com', '_blank');

  return (
    <footer className="bg-black py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex items-center gap-2 mb-6 group">
              <DalleyLogo className="w-8 h-8 text-pink-500 group-hover:text-white transition-colors duration-300" variant="default" />
              <span className="font-sans font-bold text-xl tracking-tight text-white">
                dalley.
              </span>
            </a>
            <p className="text-zinc-500 max-w-sm mb-8">
              Empowering Roblox developers with next-gen web tools. Design, animate, and export without leaving your browser.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, MessageSquare].map((Icon, i) => (
                <button key={i} onClick={openLink} className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-pink-500 hover:text-white transition-all hover:scale-110">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><button onClick={() => onNavigate('editor')} className="hover:text-pink-400 transition-colors">Launch Beta</button></li>
              <li><button onClick={openLink} className="hover:text-pink-400 transition-colors">Changelog</button></li>
              <li><button onClick={openLink} className="hover:text-pink-400 transition-colors">Documentation</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Community</h4>
            <ul className="space-y-4 text-zinc-500">
              <li><button onClick={openLink} className="hover:text-pink-400 transition-colors">Discord</button></li>
              <li><button onClick={openLink} className="hover:text-pink-400 transition-colors">Twitter</button></li>
              <li><button onClick={openLink} className="hover:text-pink-400 transition-colors">Forum</button></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-zinc-600">
          <p>© 2025 Dalley Web. Not affiliated with Roblox Corp.</p>
        </div>
      </div>
    </footer>
  );
};