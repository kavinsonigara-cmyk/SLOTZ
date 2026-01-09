
import React, { useState, useMemo, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  MapPin, 
  Wrench, 
  ShieldAlert, 
  Users, 
  Hourglass,
  ArrowRight,
  ShieldCheck,
  LayoutGrid,
  List,
  AlertCircle,
  ShieldOff,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { MACHINE_ICONS, LAB_CATEGORIES } from '../constants';
import { Machine, MachineCategory } from '../types';
import { suggestAlternativeMachine } from '../services/geminiService';

const Booking: React.FC = () => {
  const { slots, bookSlot, machines, updateMachine, bookMachine, joinQueue, leaveQueue, profile, addNotification, isDarkMode } = useStudio();
  const [view, setView] = useState<'faculty' | 'machines'>('machines');
  const [selectedLab, setSelectedLab] = useState<MachineCategory | 'All'>('All');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingMachineId, setEditingMachineId] = useState<string | null>(null);

  const filteredMachines = useMemo(() => {
    return selectedLab === 'All' 
      ? machines 
      : machines.filter(m => m.category === selectedLab);
  }, [machines, selectedLab]);

  const handleAiConsult = async (machine: Machine) => {
    setLoadingAi(true);
    const suggestion = await suggestAlternativeMachine(machine, machines);
    setAiSuggestion(suggestion);
    setLoadingAi(false);
  };

  const handleImageUploadTrigger = (machineId: string) => {
    setEditingMachineId(machineId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingMachineId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateMachine(editingMachineId, { image: reader.result as string });
        addNotification(`Updated photo for ${machines.find(m => m.id === editingMachineId)?.name}`);
        setEditingMachineId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const getWaitTime = (machine: Machine) => {
    const baseTime = machine.status === 'In Use' ? 20 : 0;
    return baseTime + (machine.queue.length * 20);
  };

  const isUserInQueue = (machine: Machine) => {
    return machine.queue.some(q => q.studentId === profile.studentId);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <header className="flex flex-col gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Workshop Hub</h1>
            <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${profile.isIncognito ? 'bg-slate-800 text-white' : 'bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300'}`}>
              {profile.isIncognito ? 'Incognito' : 'Live'}
            </div>
          </div>
          <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            Real-time status for Spring 2025
          </p>
        </div>
        
        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm self-start">
          <button 
            onClick={() => { setView('machines'); setAiSuggestion(null); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'machines' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Machinery
          </button>
          <button 
            onClick={() => { setView('faculty'); setAiSuggestion(null); }}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'faculty' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Faculty
          </button>
        </div>
      </header>

      {aiSuggestion && (
        <div className="bg-brand-50/50 dark:bg-brand-950/20 border border-brand-100 dark:border-brand-900/50 p-5 rounded-3xl flex items-start gap-3 animate-in fade-in slide-in-from-top-4">
          <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-brand-500 flex-shrink-0 border border-brand-50 dark:border-brand-800">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-brand-700 dark:text-brand-400 uppercase tracking-widest mb-1">AI Recommendation</p>
            <p className="text-sm text-slate-800 dark:text-white leading-relaxed font-bold italic">"{aiSuggestion}"</p>
          </div>
        </div>
      )}

      {view === 'machines' ? (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center gap-2 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
              <button 
                onClick={() => setSelectedLab('All')}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedLab === 'All' ? 'bg-slate-900 dark:bg-brand-500 text-white border-slate-900 dark:border-brand-500' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'}`}
              >
                All
              </button>
              {LAB_CATEGORIES.map(lab => (
                <button 
                  key={lab}
                  onClick={() => setSelectedLab(lab as MachineCategory)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedLab === lab ? 'bg-slate-900 dark:bg-brand-500 text-white border-slate-900 dark:border-brand-500' : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'}`}
                >
                  {lab}
                </button>
              ))}
            </div>
          </div>

          <div className={layoutMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-4"}>
            {filteredMachines.map((machine) => {
              const inQueue = isUserInQueue(machine);
              const waitTime = getWaitTime(machine);
              const isMaintenance = machine.status === 'Maintenance';
              const isAvailable = machine.status === 'Available';
              const isBusy = machine.status === 'In Use';
              const hasTraining = profile.trainingCompleted.includes(machine.category);

              return (
                <div 
                  key={machine.id} 
                  className={`bg-white dark:bg-slate-900 rounded-4xl border transition-all overflow-hidden flex flex-col group ${
                    isMaintenance ? 'border-rose-100 dark:border-rose-900/50 grayscale' : 'border-slate-200 dark:border-slate-800 active:border-brand-500'
                  }`}
                >
                  <div className="relative aspect-video md:aspect-[16/10] overflow-hidden">
                    <img src={machine.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={machine.name} />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 dark:text-white">
                        {MACHINE_ICONS[machine.category]} {machine.category}
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                        isAvailable ? 'bg-emerald-500 text-white' : 
                        isBusy ? 'bg-amber-500 text-white' : 
                        'bg-rose-500 text-white'
                      }`}>
                        {machine.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-1">{machine.name}</h3>
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-4">
                        <MapPin size={12} className="text-brand-500" /> {machine.location}
                      </div>

                      {(isBusy || isMaintenance) && (
                        <div className={`mb-4 p-4 rounded-3xl flex items-center gap-3 border ${
                          isMaintenance ? 'bg-rose-50/50 dark:bg-rose-950/10 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/50' : 
                          'bg-amber-50/50 dark:bg-amber-950/10 text-amber-800 dark:text-amber-400 border-amber-100 dark:border-amber-900/50'
                        }`}>
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-white/80 dark:bg-slate-800 shadow-sm text-brand-500">
                            {isMaintenance ? <Wrench size={16} /> : <Users size={16} />}
                          </div>
                          <div>
                            <p className="text-[9px] font-black uppercase opacity-60">Waitlist</p>
                            <p className="text-xs font-black">{isMaintenance ? 'Service Active' : `${machine.queue.length} In Queue • ${waitTime}m wait`}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800">
                      {!hasTraining ? (
                        <button className="w-full py-3.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed border border-slate-200 dark:border-slate-700">
                          Training Required
                        </button>
                      ) : isAvailable ? (
                        <button 
                          onClick={() => bookMachine(machine.id, new Date().toISOString(), new Date(Date.now() + 3600000).toISOString())}
                          className="w-full py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-[0.15em] flex items-center justify-center gap-2 bg-brand-500 text-white shadow-xl shadow-brand-500/20 active:scale-95 transition-all"
                        >
                          Reserve Now <ArrowRight size={14} />
                        </button>
                      ) : (
                        <button 
                          onClick={() => inQueue ? leaveQueue(machine.id) : joinQueue(machine.id)}
                          className={`w-full py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-[0.15em] flex items-center justify-center gap-2 transition-all active:scale-95 ${inQueue ? 'bg-rose-500 text-white shadow-rose-500/20 shadow-xl' : 'bg-brand-500 text-white shadow-brand-500/20 shadow-xl'}`}
                        >
                          {inQueue ? 'Leave Queue' : 'Join Queue'} <Hourglass size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {slots.map((slot) => {
            const startTime = new Date(slot.startTime);
            return (
              <div key={slot.id} className={`bg-white dark:bg-slate-900 rounded-4xl border p-6 transition-all ${slot.isBooked ? 'opacity-50 grayscale' : 'border-slate-200 dark:border-slate-800 active:border-brand-500'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${slot.facultyName}`} className="w-14 h-14 rounded-2xl bg-slate-50 p-1 object-cover" />
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-base leading-tight">{slot.facultyName}</h3>
                    <p className="text-brand-500 dark:text-brand-400 font-black text-[9px] uppercase tracking-widest mt-1">Certified Faculty</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                    <p className="text-xs font-black">{startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Time</p>
                    <p className="text-xs font-black">{startTime.getHours()}:00</p>
                  </div>
                </div>

                <button 
                  onClick={() => !slot.isBooked && bookSlot(slot.id)}
                  disabled={slot.isBooked}
                  className={`w-full py-3.5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl transition-all active:scale-95 ${slot.isBooked ? 'bg-slate-100 text-slate-400' : 'bg-brand-500 text-white shadow-brand-500/20'}`}
                >
                  {slot.isBooked ? 'Booked' : 'Request Slot'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Booking;
