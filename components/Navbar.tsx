
import React, { useState, useEffect, useRef } from 'react';
import { Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import { ProfileModal } from './ProfileModal';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Listeners for Dock actions
    const handleOpenAuth = () => setShowAuthModal(true);
    const handleOpenProfile = () => setShowProfileModal(true);

    window.addEventListener('open-auth-modal', handleOpenAuth);
    window.addEventListener('open-profile-modal', handleOpenProfile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-auth-modal', handleOpenAuth);
      window.removeEventListener('open-profile-modal', handleOpenProfile);
    };
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b pointer-events-none ${
          isScrolled || currentView === 'templates'
            ? 'bg-void/80 backdrop-blur-xl border-white/5 py-4 shadow-2xl shadow-pink-900/10'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center pointer-events-auto">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 group relative z-[60]">
            <div className="relative transform transition-transform group-hover:rotate-12 duration-300">
              <Layers className="w-8 h-8 text-white group-hover:text-pink-400 transition-colors duration-300" strokeWidth={2} />
              <div className="absolute inset-0 bg-pink-500/40 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="font-sans font-bold text-2xl tracking-tight text-white group-hover:text-pink-100 transition-all duration-300">
              dalley.
            </span>
          </a>
          
          {/* Navigation Items Hidden - Replaced by Top Right Dock */}
        </div>
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </>
  );
};
