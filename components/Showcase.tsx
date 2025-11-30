
import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { ExternalLink, CreditCard, User, Settings, ShoppingBag, X, Heart, Maximize2, Shield, Zap, Check, MousePointer2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { VerifiedBadge } from './VerifiedBadge'; // Imported for potential usage

// --- Interactive Sub-Components ---

const InteractiveHUD = ({ fullScreen }: { fullScreen?: boolean }) => {
  const [health, setHealth] = useState(80);
  const [mana, setMana] = useState(60);

  const handleClick = () => {
    setHealth(prev => prev > 10 ? prev - 10 : 100);
    setMana(prev => prev > 10 ? prev - 20 : 100);
  };

  return (
    <div 
      onClick={fullScreen ? handleClick : undefined}
      className={`w-full h-full flex flex-col justify-center gap-4 p-6 bg-gradient-to-br from-[#18181b] to-black select-none ${fullScreen ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 border-2 border-white/20 shadow-lg shadow-blue-500/30 transition-transform active:scale-95"></div>
        <div className="space-y-2 flex-1">
           <div className="h-3 bg-zinc-800 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-300 ease-out"
                style={{ width: `${health}%` }}
              ></div>
           </div>
           <div className="h-3 bg-zinc-800 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-300 ease-out"
                style={{ width: `${mana}%` }}
              ></div>
           </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
         {[1,2,3].map(i => (
           <div key={i} className="h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white/10 transition-colors">
              <Shield className="w-4 h-4 text-white/50" />
           </div>
         ))}
      </div>
      {fullScreen && <div className="text-center text-xs text-zinc-500 font-mono mt-4 animate-pulse">Click anywhere to simulate damage</div>}
    </div>
  );
};

const InteractiveShop = ({ fullScreen }: { fullScreen?: boolean }) => {
  const [items, setItems] = useState([
    { id: 1, name: 'Plasma Rifle', price: 500, owned: false },
    { id: 2, name: 'Void Armor', price: 1200, owned: false },
    { id: 3, name: 'Speed Potion', price: 50, owned: true },
    { id: 4, name: 'Energy Cell', price: 100, owned: false },
    { id: 5, name: 'Cyber Key', price: 2500, owned: false },
  ]);

  const toggleBuy = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fullScreen) return;
    setItems(prev => prev.map(item => item.id === id ? { ...item, owned: !item.owned } : item));
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0a0a0a] flex flex-col">
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 pointer-events-none"></div>
       <div className={`space-y-3 p-4 overflow-y-auto custom-scrollbar ${!fullScreen && 'animate-ui-scroll'}`}>
          {items.map((item) => (
             <div 
               key={item.id} 
               onClick={(e) => toggleBuy(item.id, e)}
               className={`bg-zinc-800 p-3 rounded-xl border border-white/10 flex justify-between items-center shadow-lg group transition-all duration-200 ${fullScreen ? 'hover:scale-[1.02] cursor-pointer hover:bg-zinc-700' : ''}`}
             >
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/40 transition-colors">
                      <Zap className="w-5 h-5 text-pink-500" />
                   </div>
                   <div className="space-y-1">
                      <div className="text-sm font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">${item.price}</div>
                   </div>
                </div>
                <div className={`px-3 py-1 text-[10px] font-bold rounded-full transition-all duration-300 ${item.owned ? 'bg-green-500 text-black' : 'bg-white text-black'}`}>
                  {item.owned ? 'OWNED' : 'BUY'}
                </div>
             </div>
          ))}
          {/* Duplicates for scrolling effect in preview */}
          {!fullScreen && items.slice(0, 3).map((item) => (
             <div key={`dup-${item.id}`} className="bg-zinc-800 p-3 rounded-xl border border-white/10 flex justify-between items-center shadow-lg opacity-50">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-pink-500" />
                   </div>
                   <div className="space-y-1">
                      <div className="h-2 w-16 bg-zinc-600 rounded-full"></div>
                      <div className="h-2 w-10 bg-zinc-700 rounded-full"></div>
                   </div>
                </div>
                <div className="px-3 py-1 bg-white text-black text-[10px] font-bold rounded-full">BUY</div>
             </div>
          ))}
       </div>
    </div>
  );
};

const InteractiveInventory = ({ fullScreen }: { fullScreen?: boolean }) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full h-full p-4 grid grid-cols-3 gap-3 bg-gradient-to-t from-zinc-900 to-[#18181b] content-start overflow-y-auto">
       {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
           <div 
             key={i} 
             onClick={() => fullScreen && setSelected(i)}
             className={`aspect-square rounded-xl bg-zinc-800 border flex items-center justify-center relative overflow-hidden group shadow-md transition-all duration-200 ${fullScreen ? 'cursor-pointer hover:scale-105' : ''} ${selected === i ? 'border-amber-500 ring-2 ring-amber-500/50' : 'border-white/10 hover:border-white/30'}`}
           >
               <div className={`absolute inset-0 bg-gradient-to-tr ${i % 2 === 0 ? 'from-amber-500/20' : 'from-orange-500/20'} to-transparent opacity-50`}></div>
               <div className="w-8 h-8 rounded bg-zinc-900 border border-white/10 group-hover:bg-zinc-800 transition-colors"></div>
               <div className="absolute bottom-1 right-1 text-[8px] text-zinc-500 font-mono">x{i}</div>
               {selected === i && (
                 <div className="absolute top-1 left-1">
                   <Check className="w-3 h-3 text-amber-500" />
                 </div>
               )}
           </div>
       ))}
    </div>
  );
};

const InteractiveSettings = ({ fullScreen }: { fullScreen?: boolean }) => {
  const [toggles, setToggles] = useState([true, false, true]);

  const handleToggle = (index: number) => {
    if (!fullScreen) return;
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };

  return (
    <div className="w-full h-full p-6 space-y-4 bg-[#18181b] flex flex-col justify-center">
       {toggles.map((isOn, i) => (
          <div 
            key={i} 
            onClick={() => handleToggle(i)}
            className={`flex justify-between items-center pb-3 border-b border-white/5 transition-colors ${fullScreen ? 'cursor-pointer hover:bg-white/5 rounded px-2 -mx-2' : ''}`}
          >
              <div className="space-y-1">
                 <div className="text-xs font-bold text-zinc-300">Setting 0{i+1}</div>
              </div>
              <div className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                 <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isOn ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
          </div>
       ))}
       <div className="pt-2">
          <div className="h-1 bg-zinc-700 rounded-full w-full relative">
             <div className="absolute left-0 top-0 h-full w-2/3 bg-emerald-500 rounded-full"></div>
             <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border border-zinc-200 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"></div>
          </div>
       </div>
    </div>
  );
};

const UI_EXAMPLES = [
  {
    id: 'hud',
    title: 'Glassmorphism HUD',
    category: 'Interface',
    icon: <User className="w-5 h-5" />,
    color: 'from-blue-500 to-cyan-500',
    description: 'Minimalist player stats with health bar animation and glass effect.',
    component: InteractiveHUD
  },
  {
    id: 'shop',
    title: 'Item Shop',
    category: 'E-Commerce',
    icon: <ShoppingBag className="w-5 h-5" />,
    color: 'from-pink-500 to-purple-500',
    description: 'Vertical scrolling list with hover effects and buy interactions.',
    component: InteractiveShop
  },
  {
    id: 'inventory',
    title: 'Inventory Grid',
    category: 'System',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'from-amber-500 to-orange-500',
    description: 'Grid layout with auto-layout constraints and rarity borders.',
    component: InteractiveInventory
  },
  {
    id: 'settings',
    title: 'Settings Menu',
    category: 'Utility',
    icon: <Settings className="w-5 h-5" />,
    color: 'from-emerald-500 to-teal-500',
    description: 'Toggle switches with spring animations and slider inputs.',
    component: InteractiveSettings
  }
];

export const Showcase: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<typeof UI_EXAMPLES[0] | null>(null);
  const { user } = useAuth(); // Hooked in for future logic if needed
  
  // Persistent Likes State (Still local for now, could be synced to Supabase later)
  const [likes, setLikes] = useState<Record<string, number>>({ 
    hud: 0, 
    shop: 0, 
    inventory: 0, 
    settings: 0 
  });
  
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedUserLikes = localStorage.getItem('dalley_user_likes');
    const storedTotalLikes = localStorage.getItem('dalley_total_likes');

    if (storedUserLikes) {
      setUserLikes(JSON.parse(storedUserLikes));
    }
    if (storedTotalLikes) {
      setLikes(JSON.parse(storedTotalLikes));
    }
  }, []);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    if (userLikes[id]) return;

    const newLikes = { ...likes, [id]: likes[id] + 1 };
    const newUserLikes = { ...userLikes, [id]: true };

    setLikes(newLikes);
    setUserLikes(newUserLikes);

    localStorage.setItem('dalley_total_likes', JSON.stringify(newLikes));
    localStorage.setItem('dalley_user_likes', JSON.stringify(newUserLikes));
  };

  return (
    <section id="showcase" className="py-32 bg-black overflow-hidden scroll-mt-20 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <Reveal width="100%">
            <h2 className="font-sans text-5xl md:text-6xl font-bold text-white">
              Made with <span className="text-pink-500">Dalley</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} variant="slide-right" width="100%">
             <p className="text-zinc-400 text-lg">Clean, lightweight, and fully animated. Click to preview.</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          {UI_EXAMPLES.map((ui, index) => {
             const Component = ui.component;
             return (
            <Reveal key={ui.id} delay={index * 0.1} variant="slide-up" width="100%">
              <div 
                onClick={() => setSelectedExample(ui)}
                className="group relative cursor-pointer bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden hover:border-pink-500/50 transition-all duration-500 h-[350px] md:h-[450px] hover:shadow-[0_0_50px_-10px_rgba(236,72,153,0.15)] active:scale-[0.98] w-full"
              >
                
                {/* Simulated UI Window */}
                <div className="absolute inset-x-4 inset-y-12 md:inset-x-8 md:inset-y-12 bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col transform group-hover:-translate-y-2 transition-transform duration-500 z-10">
                    <div className="h-10 bg-zinc-900 border-b border-white/5 flex items-center px-4 justify-between shrink-0">
                         <div className="flex gap-1.5">
                             <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                         </div>
                         <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Preview</div>
                    </div>
                    {/* UI Content Area */}
                    <div className="flex-1 relative bg-grid-white/[0.03]">
                        <Component fullScreen={false} />
                    </div>
                </div>

                {/* Info Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end bg-gradient-to-t from-black via-black/90 to-transparent z-20 h-32">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">
                        {ui.title}
                    </h3>
                    <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${ui.color}`}></span>
                         <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{ui.category}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                     <button 
                       onClick={(e) => handleLike(e, ui.id)}
                       className={`p-3 rounded-full transition-all flex items-center gap-2 border ${userLikes[ui.id] ? 'bg-pink-500/10 border-pink-500 text-pink-500' : 'bg-zinc-900 border-white/5 text-zinc-400 hover:bg-zinc-800'}`}
                     >
                        <Heart className="w-5 h-5" fill={userLikes[ui.id] ? "currentColor" : "none"} />
                        <span className="text-xs font-bold">{likes[ui.id]}</span>
                     </button>
                     <div className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform shadow-lg shadow-white/10">
                        <Maximize2 className="w-5 h-5" />
                     </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )})}
        </div>
      </div>

      {/* Full Screen Modal */}
      {selectedExample && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300"
                onClick={() => setSelectedExample(null)}
            ></div>
            
            <div className="relative w-full max-w-5xl h-[80vh] bg-[#0c0c0c] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-white">{selectedExample.title}</h3>
                        <p className="text-xs text-zinc-500">{selectedExample.description}</p>
                    </div>
                    <button 
                        onClick={() => setSelectedExample(null)}
                        className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="flex-1 bg-grid-white/[0.02] relative p-4 md:p-12 flex items-center justify-center overflow-auto">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.03),transparent_70%)]"></div>
                    {/* Scaled up version of the render */}
                    <div className="w-[300px] h-[200px] md:w-[600px] md:h-[400px] bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform md:scale-125">
                         {React.createElement(selectedExample.component, { fullScreen: true })}
                    </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-black/50 flex justify-between items-center shrink-0">
                    <div className="flex gap-4">
                        <div className="hidden md:block px-4 py-2 bg-zinc-900 rounded-lg border border-white/5 text-xs text-zinc-400 font-mono">
                            Interactive Mode: Active
                        </div>
                        <div className="hidden md:block px-4 py-2 bg-zinc-900 rounded-lg border border-white/5 text-xs text-zinc-400 font-mono">
                            SPR: Active
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};
