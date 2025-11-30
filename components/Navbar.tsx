
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Layers, LogIn, LogOut, Settings, Edit } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { ProfileModal } from './ProfileModal';
import { VerifiedBadge } from './VerifiedBadge';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
      signOut();
      setShowUserMenu(false);
  };

  const handleNavClick = (item: { label: string, href: string }) => {
      if (item.label === 'Templates') {
          onNavigate('templates');
      } else {
          onNavigate('home');
          // Small timeout to allow view switch before scrolling
          setTimeout(() => {
             const element = document.querySelector(item.href);
             element?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
      }
      setIsMobileOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled || currentView === 'templates'
            ? 'bg-void/80 backdrop-blur-xl border-white/5 py-4 shadow-2xl shadow-pink-900/10'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 group relative z-[60]">
            <div className="relative transform transition-transform group-hover:rotate-12 duration-300">
              <Layers className="w-8 h-8 text-white group-hover:text-pink-400 transition-colors duration-300" strokeWidth={2} />
              <div className="absolute inset-0 bg-pink-500/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="font-sans font-bold text-2xl tracking-tight text-white group-hover:text-pink-100 transition-all duration-300">
              dalley.
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium transition-colors relative group ${
                    (currentView === 'templates' && item.label === 'Templates') 
                    ? 'text-pink-400' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-pink-500 to-white transition-all duration-300 ${
                    (currentView === 'templates' && item.label === 'Templates') 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
            
            {user ? (
               <div className="relative" ref={menuRef}>
                 <button
                   onClick={() => setShowUserMenu(!showUserMenu)}
                   className={`group flex items-center gap-3 pl-2 pr-4 py-1.5 border rounded-full transition-all duration-300 ${showUserMenu ? 'bg-zinc-800 border-pink-500/50' : 'bg-zinc-900 border-white/10 hover:border-pink-500/30'}`}
                 >
                    <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center overflow-hidden border border-white/20">
                       {profile?.avatar_url ? (
                           <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                       ) : (
                           <span className="text-white font-bold text-xs">{profile?.username?.[0]?.toUpperCase() || 'U'}</span>
                       )}
                    </div>
                    <span className="text-sm font-medium text-white max-w-[100px] truncate">
                      {profile?.username || 'User'}
                    </span>
                    <VerifiedBadge userId={user.id} isVerified={profile?.is_verified} size={14} />
                 </button>

                 {/* Floating Dropdown Menu */}
                 {showUserMenu && (
                    <div className="absolute top-full right-0 mt-4 w-72 bg-[#0f0f12] border border-white/10 rounded-2xl shadow-2xl p-2 animate-scale-in origin-top-right overflow-hidden z-[70]">
                        <div className="p-4 bg-zinc-900/50 rounded-xl mb-2 border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center overflow-hidden border border-white/20">
                                   {profile?.avatar_url ? (
                                       <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                   ) : (
                                       <span className="text-white font-bold text-lg">{profile?.username?.[0]?.toUpperCase() || 'U'}</span>
                                   )}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex items-center gap-2">
                                        <div className="text-white font-bold truncate">{profile?.username || 'User'}</div>
                                        <VerifiedBadge userId={user.id} isVerified={profile?.is_verified} size={14} />
                                    </div>
                                    <div className="text-xs text-zinc-500 truncate">{user.email}</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <button 
                                onClick={() => {
                                    setShowUserMenu(false);
                                    setShowProfileModal(true);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
                            >
                                <Edit className="w-4 h-4 text-zinc-500 group-hover:text-pink-400 transition-colors" />
                                Edit Profile
                            </button>
                            <div className="h-px bg-white/5 my-1 mx-2"></div>
                            <button 
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                 )}
               </div>
            ) : (
                <button
                    onClick={() => setShowAuthModal(true)}
                    className="group relative px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_0px_rgba(236,72,153,0.6)] active:scale-95"
                >
                    <span className="absolute -inset-1 rounded-full bg-white/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <LogIn className="w-4 h-4" />
                    Sign In
                </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white relative z-[60] p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-black/95 backdrop-blur-3xl z-50 flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] h-[100dvh] ${
            isMobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>

          <div className="flex flex-col items-center gap-8 relative z-10 w-full px-6">
              {NAV_ITEMS.map((item, idx) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="text-3xl font-sans font-bold text-zinc-400 hover:text-white transition-all transform hover:scale-105"
                  style={{ 
                    transitionDelay: `${idx * 50}ms`,
                    opacity: isMobileOpen ? 1 : 0,
                    transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  {item.label}
                </button>
              ))}
              
              <div 
                className="w-full max-w-xs h-px bg-white/10 my-4"
                style={{ transitionDelay: '200ms', opacity: isMobileOpen ? 1 : 0 }}
              ></div>

              {user ? (
                 <div className="w-full max-w-xs space-y-4">
                     <button
                        onClick={() => {
                            setIsMobileOpen(false);
                            setShowProfileModal(true);
                        }}
                        className="w-full px-8 py-4 bg-zinc-900 border border-white/10 text-white font-bold rounded-xl text-lg flex items-center justify-center gap-3 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-300"
                      >
                         {profile?.avatar_url && <img src={profile.avatar_url} className="w-6 h-6 rounded-full object-cover" alt="" />}
                         Edit Profile
                      </button>
                      <button 
                        onClick={() => {
                            handleSignOut();
                            setIsMobileOpen(false);
                        }}
                        className="w-full px-8 py-4 bg-red-900/20 border border-red-900/50 text-red-400 font-bold rounded-xl text-lg flex items-center justify-center gap-3 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-400"
                      >
                        Sign Out
                      </button>
                  </div>
              ) : (
                  <button
                    onClick={() => {
                      setIsMobileOpen(false);
                      setShowAuthModal(true);
                    }}
                    className="w-full max-w-xs px-8 py-4 bg-white text-black font-bold rounded-xl text-lg shadow-xl shadow-white/10 hover:bg-pink-500 hover:text-white hover:shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
                    style={{ transitionDelay: '250ms', opacity: isMobileOpen ? 1 : 0, transform: isMobileOpen ? 'translateY(0)' : 'translateY(20px)' }}
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </button>
              )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </>
  );
};
