
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
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
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
        setLoading(false);
    }, 2500); // Matches the loading screen animation timing
    return () => clearTimeout(timer);
  }, []);

  // View Router
  const renderView = () => {
      switch (currentView) {
          case 'home':
              return (
                  <main className="animate-in fade-in duration-500">
                    <Hero />
                    <Features />
                    <Process />
                    <CodePreview />
                    <Showcase />
                    <Testimonials />
                  </main>
              );
          case 'templates':
              return (
                  <main className="animate-in slide-in-from-bottom-4 duration-500">
                    <Templates onBackToHome={() => {
                        setCurrentView('home');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} />
                  </main>
              );
          case '404':
              return <NotFound onGoHome={() => setCurrentView('home')} />;
          default:
              return <NotFound onGoHome={() => setCurrentView('home')} />;
      }
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-black text-white selection:bg-pink-500 selection:text-white">
          <AnimatePresence>
            {loading && <LoadingScreen key="loader" />}
          </AnimatePresence>

          {!loading && (
             <>
                <Navbar 
                    currentView={currentView} 
                    onNavigate={(view) => {
                        setCurrentView(view);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                />
                {renderView()}
                <Footer />
             </>
          )}
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
