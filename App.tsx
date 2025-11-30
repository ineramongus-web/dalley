
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Services';
import { Showcase } from './components/Showcase';
import { CodePreview } from './components/CodePreview';
import { Footer } from './components/Footer';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Templates } from './components/Templates';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-black text-white selection:bg-pink-500 selection:text-white">
          <Navbar />
          <main>
            <Hero />
            <Features />
            <Process />
            <CodePreview />
            <Templates />
            <Showcase />
            <Testimonials />
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
