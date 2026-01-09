
import React, { useState } from 'react';
import { Bell, Lock, Eye, Moon, Save, Shield, ChevronRight, RotateCcw, AlertTriangle } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

const Settings: React.FC = () => {
  const { addNotification, isDarkMode, toggleDarkMode, resetLabData } = useStudio();
  const [localSettings, setLocalSettings] = useState({
    notifications: true,
    publicProfile: true,
    emailDigest: false
  });

  const toggleLocal = (key: keyof typeof localSettings) => {
    setLocalSettings(prev => ({ ...prev, [key]: !prev[key] }));
    addNotification(`System preference synced.`);
  };

  const handleHardReset = () => {
    if (window.confirm("CRITICAL: Wipe all local projects and bookings?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 md:space-y-8 pb-32 animate-in fade-in duration-500">
      <header>
        <h1 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Preferences</h1>
        <p className="text-[10px] md:text-sm text-slate-500 font-bold uppercase tracking-widest">Workspace configuration</p>
      </header>

      <div className="space-y-5">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          <h3 className="text-[9px] font-black text-brand-500 uppercase tracking-[0.25em] ml-1">Experience</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-white rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
                  <Moon size={20} />
                </div>
                <div>
                  <p className="text-sm font-black dark:text-white">Interface Mode</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Dark Charcoal UI</p>
                </div>
              </div>
              <button onClick={toggleDarkMode} className={`w-12 h-7 rounded-full transition-all relative ${isDarkMode ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-50 dark:bg-brand-950/30 text-brand-500 rounded-xl flex items-center justify-center border border-brand-100 dark:border-brand-900/50">
                  <Bell size={20} />
                </div>
                <div>
                  <p className="text-sm font-black dark:text-white">Push Alerts</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Queue Status Pushes</p>
                </div>
              </div>
              <button onClick={() => toggleLocal('notifications')} className={`w-12 h-7 rounded-full transition-all relative ${localSettings.notifications ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-md ${localSettings.notifications ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-[9px] font-black text-brand-500 uppercase tracking-[0.25em] ml-1">Tools</h3>
          
          <div className="space-y-2">
            <button 
              onClick={() => { resetLabData(); addNotification("Cache purged."); }}
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center gap-4">
                <RotateCcw size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-brand-500" /> 
                <span className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">Refresh Inventory</span>
              </div>
              <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
            </button>

            <button 
              onClick={handleHardReset}
              className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-rose-50/50 dark:hover:bg-rose-950/20 active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center gap-4">
                <AlertTriangle size={18} className="text-rose-400" /> 
                <span className="text-xs font-black text-rose-500 uppercase tracking-widest">Hard Reset Data</span>
              </div>
              <ChevronRight size={16} className="text-rose-200" />
            </button>
          </div>
        </div>

        <button 
          onClick={() => addNotification('System sync successful.')}
          className="w-full py-4.5 bg-brand-500 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 shadow-2xl shadow-brand-500/20 active:scale-95 transition-all"
        >
          <Save size={18} /> Apply Config
        </button>
      </div>
    </div>
  );
};

export default Settings;
