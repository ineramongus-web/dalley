import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Services';
import { Showcase } from './components/Showcase';
import { CodePreview } from './components/CodePreview';
import { Footer } from './components/Footer';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Templates } from './components/Templates';
import { LoadingScreen } from './components/LoadingScreen';
import { NotFound } from './components/NotFound';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AnimatePresence, motion } from 'framer-motion';
import { ClickSpark } from './components/ClickSpark';
import { Dock } from './components/Dock';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
        setLoading(false);
    }, 2500);

    // Check initial URL
    const path = window.location.pathname;
    if (path === '/editor') setCurrentView('editor');
    else if (path === '/templates') setCurrentView('templates');

    // Event Listeners for Dock interactions
    const handleOpenAuth = () => setShowAuthModal(true);
    const handleOpenProfile = () => setShowProfileModal(true);

    window.addEventListener('open-auth-modal', handleOpenAuth);
    window.addEventListener('open-profile-modal', handleOpenProfile);

    return () => {
        clearTimeout(timer);
        window.removeEventListener('open-auth-modal', handleOpenAuth);
        window.removeEventListener('open-profile-modal', handleOpenProfile);
    };
  }, []);

  const handleNavigate = (view: string) => {
    // Allow navigating to same view to trigger scroll to top
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL without reload
    const path = view === 'home' ? '/' : `/${view}`;
    window.history.pushState({}, '', path);
  };

  // View Router
  const renderView = () => {
      switch (currentView) {
          case 'home':
              return (
                  <PageWrapper key="home">
                    <Hero onNavigate={handleNavigate} />
                    <Features />
                    <Process />
                    <CodePreview onNavigate={handleNavigate} />
                    <Showcase />
                    <Testimonials />
                  </PageWrapper>
              );
          case 'templates':
              return (
                  <PageWrapper key="templates">
                    <Templates onBackToHome={() => handleNavigate('home')} />
                  </PageWrapper>
              );
          case 'editor':
              return (
                  <div className="fixed inset-0 z-[50] bg-[#050505] w-full h-full">
                      <iframe 
                          src="https://among-electricity-430.app.ohara.ai/"
                          className="w-full h-full border-none"
                          title="Dalley Editor"
                          allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
                          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads"
                      />
                  </div>
              );
          case '404':
              return <PageWrapper key="404"><NotFound onGoHome={() => handleNavigate('home')} /></PageWrapper>;
          default:
              return <PageWrapper key="default"><NotFound onGoHome={() => handleNavigate('home')} /></PageWrapper>;
      }
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-black text-white selection:bg-pink-500 selection:text-white overflow-x-hidden">
          <ClickSpark />
          
          <AnimatePresence mode="wait">
            {loading ? (
                <LoadingScreen key="loader" />
            ) : (
                renderView()
            )}
          </AnimatePresence>

          {!loading && (
             <>
                {currentView !== 'editor' && <Footer onNavigate={handleNavigate} />}
                <Dock onNavigate={handleNavigate} />
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
                <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
             </>
          )}
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

// Reusable Page Wrapper for Transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            {/* The Content */}
            <motion.main
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
            >
                {children}
            </motion.main>

            {/* The Curtain Wipe Effect */}
            <motion.div
                className="fixed inset-0 bg-[#000] z-[90] pointer-events-none"
                initial={{ scaleY: 1, transformOrigin: 'bottom' }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1, transformOrigin: 'bottom' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Secondary Curtain for depth */}
            <motion.div
                className="fixed inset-0 bg-pink-900/20 z-[89] pointer-events-none"
                initial={{ scaleY: 1, transformOrigin: 'bottom' }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1, transformOrigin: 'bottom' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />
        </>
    );
};

export default App;