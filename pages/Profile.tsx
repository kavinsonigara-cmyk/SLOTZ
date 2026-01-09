
import React, { useState, useRef } from 'react';
import { User, Mail, Shield, Save, Camera, ShieldOff, Eye, Info, CheckCircle } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

const Profile: React.FC = () => {
  const { profile, updateProfile, updateProfileImage, toggleIncognito, addNotification } = useStudio();
  const [formData, setFormData] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    addNotification('Identity updated.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileImage(reader.result as string);
        addNotification('Photo sync successful.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 md:space-y-8 pb-32 animate-in fade-in duration-500">
      <header className="text-center pt-4">
        <div className="relative inline-block">
          <div className="p-1 rounded-[3rem] border-2 border-brand-500/20">
            <img 
              src={profile.isIncognito ? `https://api.dicebear.com/7.x/identicon/svg?seed=${profile.studentId}` : profile.profileImage} 
              className="w-32 h-32 rounded-[2.8rem] object-cover border-4 border-white dark:border-slate-900 shadow-2xl" 
              alt="Profile"
            />
          </div>
          <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-1 right-1 bg-brand-500 text-white p-3 rounded-2xl shadow-xl hover:bg-brand-600 active:scale-90 transition-all border-4 border-white dark:border-slate-950">
            <Camera size={18} />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
        </div>
        <h1 className="mt-6 text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{profile.isIncognito ? "Incognito" : profile.name}</h1>
        <p className="text-brand-500 font-black uppercase tracking-[0.2em] text-[10px] mt-1">{profile.isIncognito ? `Masked ID` : `KU ID: ${profile.studentId.toUpperCase()}`}</p>
      </header>

      <div className={`p-6 rounded-4xl border transition-all ${profile.isIncognito ? 'bg-slate-900 text-white border-brand-500/30' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-brand-50 dark:bg-brand-950/30 text-brand-500">
              {profile.isIncognito ? <ShieldOff size={24} /> : <Eye size={24} />}
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-tight dark:text-white">Privacy Guard</h3>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Mask identity in queues</p>
            </div>
          </div>
          <button onClick={toggleIncognito} className={`w-14 h-8 rounded-full transition-all relative ${profile.isIncognito ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-800'}`}>
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-md ${profile.isIncognito ? 'right-1' : 'left-1'}`}></div>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Alias</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-11 p-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 font-bold text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Academic Mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-11 p-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 font-bold text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Bio</label>
              <textarea rows={3} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500/20 font-bold text-sm resize-none" placeholder="Designer profile..."></textarea>
            </div>
          </div>
          <button className="w-full py-4.5 bg-brand-500 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-brand-500/20 active:scale-95 transition-all">
            Sync Profile
          </button>
        </form>
      </div>

      <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-4">
        <CheckCircle className="text-emerald-500" size={24} />
        <div>
          <p className="text-[10px] font-black text-emerald-900 dark:text-emerald-400 uppercase tracking-widest">Security Verified</p>
          <p className="text-xs text-emerald-700 dark:text-white font-bold">Lab credentials active for Spring 2025.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
