import React, { useState, useEffect } from 'react';
import { X, Camera, Save, Loader2, LogOut, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { VerifiedBadge } from './VerifiedBadge';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, profile, refreshProfile, signOut } = useAuth();
  const { showToast } = useToast();
  
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setBio(profile.bio || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  useEffect(() => {
    if (!isOpen) {
      setShowAvatarInput(false);
      setShowLogoutConfirm(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!user) return;

    if (!username.trim()) {
        showToast("Username cannot be empty", 'error');
        return;
    }

    setSaving(true);
    try {
      // 1. Check for unique username
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.trim())
        .neq('id', user.id) // Exclude self
        .single();

      if (existingUser) {
        throw new Error("Username is already taken");
      }

      // 2. Update Profile
      const updates = {
        id: user.id,
        username: username.trim(),
        bio: bio.trim(),
        avatar_url: avatarUrl.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      
      await refreshProfile();
      showToast("Profile updated successfully", 'success');
      setShowAvatarInput(false);
    } catch (error: any) {
      // Safe Error Extraction to prevent [object Object]
      let msg = 'Failed to update profile';
      if (typeof error === 'string') msg = error;
      else if (error instanceof Error) msg = error.message;
      else if (typeof error === 'object' && error !== null) {
          msg = error.message || error.error_description || JSON.stringify(error);
      }
      
      console.error('Error updating profile:', error);
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
      await signOut();
      showToast("Signed out successfully", 'info');
      onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-[#0f0f12] w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl animate-modal-pop overflow-hidden">
        
        {/* Header/Cover */}
        <div className="h-32 bg-gradient-to-r from-pink-900 to-purple-900 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-md transition-colors hover:rotate-90 duration-300 z-10">
                <X className="w-5 h-5" />
            </button>
        </div>

        <div className="px-8 pb-8 relative">
            {/* Avatar Section */}
            <div className="relative -mt-16 mb-6 flex flex-col items-start">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-[#0f0f12] bg-zinc-800 overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-zinc-500 bg-zinc-900 group-hover:text-pink-500 transition-colors">
                                {username?.[0]?.toUpperCase() || 'U'}
                            </div>
                        )}
                    </div>
                    <button 
                        onClick={() => setShowAvatarInput(!showAvatarInput)}
                        className="absolute bottom-2 right-2 p-2 bg-pink-500 text-white rounded-full cursor-pointer hover:bg-pink-400 border border-[#0f0f12] shadow-lg hover:scale-110 transition-all active:scale-95"
                    >
                        <Camera className="w-4 h-4" />
                    </button>
                </div>

                {/* Avatar URL Input Slide-down */}
                <div className={`mt-4 w-full overflow-hidden transition-all duration-300 ease-out ${showAvatarInput ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input 
                                type="text" 
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                                placeholder="https://imgur.com/..."
                                className="w-full bg-zinc-900/50 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:border-pink-500 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation View */}
            {showLogoutConfirm ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300 bg-red-950/20 border border-red-500/20 rounded-2xl p-6 text-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Log out?</h3>
                    <p className="text-zinc-400 text-sm mb-6">Are you sure you want to sign out? Unsaved changes to your profile might be lost.</p>
                    <div className="flex gap-3 justify-center">
                        <button 
                            onClick={() => setShowLogoutConfirm(false)}
                            className="px-5 py-2 rounded-xl bg-zinc-800 text-white font-bold text-sm hover:bg-zinc-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSignOut}
                            className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-500 transition-colors shadow-lg shadow-red-900/20"
                        >
                            Yes, Log Out
                        </button>
                    </div>
                </div>
            ) : (
                /* Edit Profile View */
                <div className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                           <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Username</label>
                           {user && <VerifiedBadge userId={user.id} size={14} />}
                        </div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-zinc-700"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all min-h-[100px] resize-none placeholder:text-zinc-700"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-6">
                        <button 
                            onClick={() => setShowLogoutConfirm(true)}
                            className="text-red-400 hover:text-red-300 text-sm font-bold flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-all"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`
                                relative overflow-hidden font-bold py-2.5 px-6 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50
                                bg-white text-black hover:bg-zinc-200 hover:scale-105
                            `}
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" /> 
                            ) : (
                                <><Save className="w-4 h-4" /> Save Changes</>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};