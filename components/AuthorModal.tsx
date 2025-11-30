import React, { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { UserProfile } from '../types';
import { VerifiedBadge } from './VerifiedBadge';

interface AuthorModalProps {
  userId: string;
  onClose: () => void;
}

export const AuthorModal: React.FC<AuthorModalProps> = ({ userId, onClose }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ templates: 0, downloads: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Profile
        const { data: profileData } = await supabase.from('profiles').select('*').eq('id', userId).single();
        if (profileData) setProfile(profileData);

        // Fetch Stats
        // 1. Template Count
        const { count: templateCount, error: countError } = await supabase
          .from('templates')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);
        
        // 2. Total Downloads
        const { data: downloadsData, error: downloadError } = await supabase
            .from('templates')
            .select('downloads')
            .eq('user_id', userId);

        const totalDownloads = downloadsData 
            ? downloadsData.reduce((acc, curr) => acc + (curr.downloads || 0), 0)
            : 0;

        setStats({
            templates: templateCount || 0,
            downloads: totalDownloads
        });

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
       
       <div className="relative bg-[#0f0f12] w-full max-w-sm rounded-3xl border border-white/10 shadow-2xl animate-modal-pop overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-900 to-indigo-900 relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 p-2 rounded-full"><X className="w-4 h-4" /></button>
          </div>
          
          <div className="px-6 pb-6 relative">
              <div className="relative -mt-12 mb-4">
                   <div className="w-24 h-24 rounded-full border-4 border-[#0f0f12] bg-zinc-800 overflow-hidden shadow-xl">
                       {profile?.avatar_url ? (
                           <img src={profile.avatar_url} className="w-full h-full object-cover" />
                       ) : (
                           <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-zinc-600">
                               {profile?.username?.[0] || '?'}
                           </div>
                       )}
                   </div>
              </div>

              {loading ? (
                  <div className="py-8 flex justify-center"><Loader2 className="animate-spin text-zinc-500" /></div>
              ) : (
                  <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                          <h3 className="text-2xl font-bold text-white">{profile?.username}</h3>
                          <VerifiedBadge userId={profile?.id} />
                      </div>
                      <p className="text-zinc-500 text-sm mb-6">{profile?.bio || 'No bio yet.'}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-center border-t border-white/5 pt-4">
                          <div>
                              <div className="text-white font-bold text-lg">{stats.templates}</div>
                              <div className="text-zinc-600 text-[10px] uppercase tracking-wider">Templates</div>
                          </div>
                          <div>
                              <div className="text-white font-bold text-lg">{stats.downloads}</div>
                              <div className="text-zinc-600 text-[10px] uppercase tracking-wider">Downloads</div>
                          </div>
                      </div>
                  </div>
              )}
          </div>
       </div>
    </div>
  );
};