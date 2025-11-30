import React, { useState } from 'react';
import { X, Mail, Lock, Loader2, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        showToast("Welcome back!", 'success');
        onClose();
      } else {
        const { error: signUpError, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
             data: { username }
          }
        });
        if (signUpError) throw signUpError;
        
        // Setup initial profile
        if (data.user) {
             const { error: profileError } = await supabase.from('profiles').upsert({
                 id: data.user.id,
                 username: username,
                 avatar_url: null,
                 updated_at: new Date().toISOString()
             });
             if (profileError) console.error("Profile creation warning:", profileError);
        }
        
        showToast("Account created successfully", 'success');
        onClose();
      }
    } catch (err: any) {
      let msg = 'Authentication failed';
      if (typeof err === 'string') msg = err;
      else if (err instanceof Error) msg = err.message;
      else if (typeof err === 'object' && err !== null) {
          msg = err.message || err.error_description || JSON.stringify(err);
      }
      
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-[#0f0f12] w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-2xl animate-modal-pop">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 animate-in slide-in-from-bottom-2 fade-in duration-500">
                {isLogin ? 'Welcome Back' : 'Join Dalley'}
            </h2>
            <p className="text-zinc-400 animate-in slide-in-from-bottom-3 fade-in duration-500 delay-75">
                {isLogin ? 'Sign in to access your projects.' : 'Create an account to start designing.'}
            </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 flex items-center gap-2 animate-shake">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
            <div className="space-y-1 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-100">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Username</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-pink-500 transition-colors" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                  placeholder="Your username"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-150">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-pink-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1 animate-in slide-in-from-bottom-2 fade-in duration-500 delay-200">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-pink-500 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-pink-900/20 flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] active:scale-[0.98] animate-in slide-in-from-bottom-2 fade-in duration-500 delay-300"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500 animate-in fade-in duration-700 delay-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-400 hover:text-pink-300 font-bold transition-colors hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};