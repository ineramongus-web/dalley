import React, { useState, useEffect } from 'react';
import { Search, Upload, Download, FileText, Image as ImageIcon, Trash2, Edit2, Save, AlertTriangle, Loader2, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Reveal } from './Reveal';
import { TEMPLATE_CATEGORIES, ADMIN_ID } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Template } from '../types';
import { VerifiedBadge } from './VerifiedBadge';
import { AuthorModal } from './AuthorModal';

interface TemplatesProps {
  onBackToHome: () => void;
}

export const Templates: React.FC<TemplatesProps> = ({ onBackToHome }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showAuthorModal, setShowAuthorModal] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    let result = templates;

    if (selectedCategory !== 'All') {
      result = result.filter(t => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.profiles?.username?.toLowerCase().includes(q)
      );
    }

    setFilteredTemplates(result);
  }, [searchQuery, selectedCategory, templates]);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select(`
          *,
          profiles:user_id (id, username, avatar_url, bio, is_verified, is_banned)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates((data as any) || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateDeleted = (deletedId: string) => {
      setTemplates(prev => prev.filter(t => t.id !== deletedId));
      setSelectedTemplate(null);
      showToast("Template deleted successfully", 'success');
  };

  const handleTemplateUpdated = (updatedTemplate: Template) => {
      setTemplates(prev => prev.map(t => t.id === updatedTemplate.id ? { ...t, ...updatedTemplate } : t));
      setSelectedTemplate(prev => prev ? { ...prev, ...updatedTemplate } : null);
      showToast("Template updated successfully", 'success');
  };

  const handleDownloadIncrement = (id: string) => {
      setTemplates(prev => prev.map(t => t.id === id ? { ...t, downloads: t.downloads + 1 } : t));
      if (selectedTemplate?.id === id) {
          setSelectedTemplate(prev => prev ? { ...prev, downloads: prev.downloads + 1 } : null);
      }
  };

  return (
    <div className="min-h-screen bg-black relative pt-32">
       <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
              <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                      Community <span className="text-pink-500">Marketplace</span>
                  </h1>
                  <p className="text-zinc-400 max-w-xl text-lg">
                      Discover premium UI kits, HUDs, and systems created by the Dalley community.
                  </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                 {/* Floating Search Bar */}
                 <div className="relative group min-w-[300px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-pink-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all shadow-lg"
                    />
                 </div>
                 <button
                    onClick={() => {
                        if (!user) {
                            showToast("You must be signed in to upload", 'error');
                            return;
                        }
                        setShowUploadModal(true);
                    }}
                    className="px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-pink-500 hover:text-white transition-all shadow-lg shadow-white/10 shrink-0"
                >
                    <Upload className="w-5 h-5" />
                    Upload
                </button>
              </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-24 gap-4">
                 <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
                 <p className="text-zinc-500 animate-pulse">Loading assets...</p>
             </div>
          ) : filteredTemplates.length === 0 ? (
             <div className="text-center py-32 text-zinc-500 border border-dashed border-white/10 rounded-3xl bg-zinc-900/20">
                 <FileText className="w-16 h-16 mx-auto mb-6 opacity-30" />
                 <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                 <p>Try adjusting your search.</p>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredTemplates.map((template, idx) => (
                    <Reveal key={template.id} delay={idx * 0.05} variant="slide-up" width="100%">
                        <div 
                           onClick={() => setSelectedTemplate(template)}
                           className="group bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-900/10 cursor-pointer h-full flex flex-col hover:-translate-y-1"
                        >
                            <div className="aspect-[4/3] bg-zinc-950 relative overflow-hidden shrink-0">
                                {template.image_url ? (
                                    <img src={template.image_url} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                        <ImageIcon className="w-10 h-10 text-zinc-600" />
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white border border-white/10 uppercase tracking-wider">
                                    {template.category}
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-pink-400 transition-colors line-clamp-1">{template.title}</h3>
                                <div 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (template.profiles?.id) setShowAuthorModal(template.profiles.id);
                                    }}
                                    className="flex items-center gap-2 mb-4 hover:bg-white/5 p-1 -ml-1 rounded-lg transition-colors w-fit"
                                >
                                    <div className="w-5 h-5 rounded-full bg-zinc-800 overflow-hidden border border-white/10">
                                        {template.profiles?.avatar_url && <img src={template.profiles.avatar_url} className="w-full h-full object-cover" />}
                                    </div>
                                    <span className="text-xs text-zinc-400 hover:text-white transition-colors font-medium">{template.profiles?.username || 'Unknown'}</span>
                                    {template.profiles?.id && <VerifiedBadge userId={template.profiles.id} isVerified={template.profiles.is_verified} size={12} />}
                                </div>
                                <div className="mt-auto flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                                    <span>{new Date(template.created_at).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1 bg-zinc-800/50 px-1.5 py-0.5 rounded"><Download className="w-3 h-3" /> {template.downloads}</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                 ))}
             </div>
          )}
       </div>

       {/* Modals */}
       <UploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} onUploadSuccess={fetchTemplates} />
       {selectedTemplate && (
           <TemplateDetailModal 
               template={selectedTemplate} 
               onClose={() => setSelectedTemplate(null)} 
               onAuthorClick={(id) => {
                   setSelectedTemplate(null);
                   setShowAuthorModal(id);
               }}
               onDelete={handleTemplateDeleted}
               onUpdate={handleTemplateUpdated}
               onDownloadIncrement={() => handleDownloadIncrement(selectedTemplate.id)}
           />
       )}
       {showAuthorModal && (
           <AuthorModal userId={showAuthorModal} onClose={() => setShowAuthorModal(null)} />
       )}
    </div>
  );
};

const UploadModal: React.FC<{ isOpen: boolean, onClose: () => void, onUploadSuccess: () => void }> = ({ isOpen, onClose, onUploadSuccess }) => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState(TEMPLATE_CATEGORIES[1]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [templateFile, setTemplateFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    if (!isOpen) return null;

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !imageFile || !templateFile) {
            showToast("Please fill all fields and select files", 'error');
            return;
        }
        
        if (!templateFile.name.endsWith('.dy')) {
             showToast("Template file must be .dy format", 'error');
             return;
        }

        setUploading(true);
        try {
            const { data: profileCheck } = await supabase.from('profiles').select('id').eq('id', user.id).single();
            if (!profileCheck) {
                 await supabase.from('profiles').insert({
                     id: user.id,
                     username: user.email?.split('@')[0],
                     avatar_url: null
                 });
            }

            const cleanFileName = (name: string) => name.replace(/[^a-zA-Z0-9.-]/g, '_');
            const imgName = `${Date.now()}_${cleanFileName(imageFile.name)}`;
            const imgPath = `${user.id}/${imgName}`;
            
            const { error: imgError } = await supabase.storage
                .from('template-images')
                .upload(imgPath, imageFile, { upsert: true, cacheControl: '3600' });
            
            if (imgError) throw imgError;
            const { data: { publicUrl: imgUrl } } = supabase.storage.from('template-images').getPublicUrl(imgPath);

            const fileName = `${Date.now()}_${cleanFileName(templateFile.name)}`;
            const filePath = `${user.id}/${fileName}`;
            
            const { error: fileError } = await supabase.storage
                .from('template-files')
                .upload(filePath, templateFile, { upsert: true, cacheControl: '3600' });
            
            if (fileError) throw fileError;
            const { data: { publicUrl: fileUrl } } = supabase.storage.from('template-files').getPublicUrl(filePath);

            const { error: dbError } = await supabase.from('templates').insert({
                title,
                description: desc,
                category,
                image_url: imgUrl,
                file_url: fileUrl,
                user_id: user.id
            });

            if (dbError) throw dbError;

            showToast("Template uploaded successfully!", 'success');
            onUploadSuccess();
            onClose();
        } catch (err: any) {
             showToast(err.message || 'Upload failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative bg-[#0f0f12] w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl animate-modal-pop p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Upload Template</h3>
                    <button onClick={onClose}><X className="w-6 h-6 text-zinc-500 hover:text-white" /></button>
                </div>
                
                <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none" required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Description</label>
                        <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none h-24 resize-none" required />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:border-pink-500 focus:outline-none">
                            {TEMPLATE_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Preview Image</label>
                             <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-pink-500/10 file:text-pink-400 hover:file:bg-pink-500/20" required />
                        </div>
                        <div>
                             <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Template File (.dy)</label>
                             <input type="file" accept=".dy" onChange={e => setTemplateFile(e.target.files?.[0] || null)} className="text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20" required />
                        </div>
                    </div>

                    <button disabled={uploading} type="submit" className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2">
                        {uploading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Publish Template'}
                    </button>
                </form>
            </div>
        </div>
    );
};

interface TemplateDetailProps {
  template: Template;
  onClose: () => void;
  onAuthorClick: (id: string) => void;
  onDelete?: (id: string) => void;
  onUpdate?: (template: Template) => void;
  onDownloadIncrement?: () => void;
}

const TemplateDetailModal: React.FC<TemplateDetailProps> = ({ template, onClose, onAuthorClick, onDelete, onUpdate, onDownloadIncrement }) => {
    const { user } = useAuth();
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(template.title);
    const [editDesc, setEditDesc] = useState(template.description);
    const [saving, setSaving] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [downloadCount, setDownloadCount] = useState(template.downloads);

    useEffect(() => {
        setDownloadCount(template.downloads);
    }, [template.downloads]);

    useEffect(() => {
        setEditTitle(template.title);
        setEditDesc(template.description);
    }, [template.title, template.description]);

    const isOwner = user?.id === template.user_id;
    const isAdmin = user?.id === ADMIN_ID;
    const canEdit = isOwner; 
    const canDelete = isOwner || isAdmin; 

    const handleDownload = async () => {
        window.open(template.file_url, '_blank');
        setDownloadCount(prev => prev + 1);
        if (onDownloadIncrement) onDownloadIncrement();
        const { error } = await supabase.rpc('increment_downloads', { row_id: template.id });
        if (error) console.error("Error incrementing downloads:", error);
    };

    const handleDelete = async () => {
        try {
            const { error } = await supabase.from('templates').delete().eq('id', template.id);
            if (error) throw error;
            if (onDelete) onDelete(template.id);
        } catch (err: any) {
            showToast(err.message, 'error');
        }
    };

    const handleUpdate = async () => {
        setSaving(true);
        try {
            const updates = { title: editTitle, description: editDesc };
            const { error } = await supabase
                .from('templates')
                .update(updates)
                .eq('id', template.id);
            
            if (error) throw error;
            
            setIsEditing(false);
            if (onUpdate) {
                onUpdate({ ...template, ...updates });
            }
        } catch (err: any) {
            showToast(err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
            <div className="relative bg-[#0f0f12] w-full max-w-4xl h-auto max-h-[90vh] rounded-3xl border border-white/10 shadow-2xl animate-modal-pop overflow-hidden flex flex-col md:flex-row">
                 <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-black/50 p-2 rounded-full hover:bg-white/10 text-white"><X className="w-5 h-5" /></button>
                 
                 <div className="w-full md:w-1/2 bg-zinc-900 relative h-56 md:h-auto shrink-0 border-b md:border-b-0 md:border-r border-white/10">
                     {template.image_url ? (
                         <img src={template.image_url} className="w-full h-full object-cover" alt="" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-12 h-12 text-zinc-700" /></div>
                     )}
                 </div>

                 <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col custom-scrollbar relative">
                     {showDeleteConfirm && (
                         <div className="absolute inset-0 bg-black/95 z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
                             <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-500">
                                 <AlertTriangle className="w-8 h-8" />
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2">Delete Template?</h3>
                             <p className="text-zinc-400 text-sm mb-6">This action cannot be undone. This template will be permanently removed.</p>
                             <div className="flex gap-3">
                                 <button onClick={() => setShowDeleteConfirm(false)} className="px-5 py-2 bg-zinc-800 rounded-xl text-white font-bold text-sm">Cancel</button>
                                 <button onClick={handleDelete} className="px-5 py-2 bg-red-600 hover:bg-red-500 rounded-xl text-white font-bold text-sm">Delete Forever</button>
                             </div>
                         </div>
                     )}

                     <div className="mb-6">
                         <div className="flex justify-between items-start">
                             <div className="text-pink-500 text-xs font-bold uppercase tracking-widest mb-2">{template.category}</div>
                             <div className="flex gap-2">
                                 {isAdmin && !isOwner && (
                                     <div className="px-2 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold rounded uppercase border border-red-500/20 self-center mr-2">Admin Mode</div>
                                 )}
                                 
                                 {canEdit && !isEditing && (
                                     <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors" title="Edit">
                                         <Edit2 className="w-4 h-4" />
                                     </button>
                                 )}
                                 
                                 {canDelete && !isEditing && (
                                     <button onClick={() => setShowDeleteConfirm(true)} className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-500 transition-colors" title="Delete">
                                         <Trash2 className="w-4 h-4" />
                                     </button>
                                 )}
                             </div>
                         </div>

                         {isEditing ? (
                             <input 
                                value={editTitle} 
                                onChange={e => setEditTitle(e.target.value)} 
                                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2 text-2xl font-bold text-white mb-2"
                             />
                         ) : (
                             <h2 className="text-3xl font-bold text-white mb-4">{template.title}</h2>
                         )}

                         <div 
                            onClick={() => template.profiles?.id && onAuthorClick(template.profiles.id)}
                            className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl cursor-pointer hover:bg-zinc-800 transition-colors w-fit border border-white/5"
                         >
                             <div className="w-10 h-10 rounded-full bg-zinc-700 overflow-hidden shrink-0">
                                {template.profiles?.avatar_url && <img src={template.profiles.avatar_url} className="w-full h-full object-cover" />}
                             </div>
                             <div>
                                 <div className="flex items-center gap-1">
                                     <span className="text-white font-bold text-sm">{template.profiles?.username || 'Unknown'}</span>
                                     <VerifiedBadge userId={template.profiles?.id} isVerified={template.profiles?.is_verified} size={14} />
                                 </div>
                                 <div className="text-xs text-zinc-500">View Profile</div>
                             </div>
                         </div>
                     </div>

                     <div className="prose prose-invert prose-sm mb-8 text-zinc-400">
                         {isEditing ? (
                             <textarea 
                                value={editDesc} 
                                onChange={e => setEditDesc(e.target.value)}
                                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-sm min-h-[100px]"
                             />
                         ) : (
                             <p>{template.description}</p>
                         )}
                     </div>
                     
                     {isEditing && (
                         <div className="flex gap-2 mb-4">
                             <button onClick={handleUpdate} disabled={saving} className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                 {saving ? <Loader2 className="animate-spin w-4 h-4"/> : <><Save className="w-4 h-4"/> Save</>}
                             </button>
                             <button onClick={() => setIsEditing(false)} className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-bold">Cancel</button>
                         </div>
                     )}

                     <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                         <button 
                             onClick={handleDownload}
                             className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-pink-500 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-pink-500/20"
                         >
                             <Download className="w-5 h-5" /> Download Template (.dy)
                         </button>
                         <div className="flex justify-between items-center text-xs text-zinc-600 font-mono">
                             <span>Import this file directly into the Dalley Editor.</span>
                             <span className="flex items-center gap-1 font-bold text-zinc-500"><Download className="w-3 h-3" /> {downloadCount} Downloads</span>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};