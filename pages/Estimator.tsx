
import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Loader2, Plus, FileText, AlertCircle, Trash2 } from 'lucide-react';
import { analyzeSketch } from '../services/geminiService';
import { EstimationResult, Assignment } from '../types';
import { useStudio } from '../context/StudioContext';

const Estimator: React.FC = () => {
  const { addAssignment, addNotification } = useStudio();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError("File too large. Max 4MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const parts = image.split(',');
      const base64Data = parts[1];
      const analysis = await analyzeSketch(base64Data);
      if (analysis) {
        setResult(analysis);
        addNotification('Analysis complete.');
      } else {
        setError("Analysis failed. Try again.");
      }
    } catch (err) {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = () => {
    if (!result) return;
    const project: Assignment = {
      id: Math.random().toString(),
      title: `Sketch # ${Math.floor(Math.random() * 900) + 100}`,
      description: result.explanation,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Design',
      progress: 0,
      riskAssessment: result.risk_level
    };
    addAssignment(project);
    addNotification('Saved to vault.');
    setResult(null);
    setImage(null);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
          <Sparkles className="text-brand-500" size={24} />
          Estimator
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest">AI complexity scan</p>
      </header>

      <div className="space-y-6">
        <div className="relative">
          <div 
            onClick={() => !image && fileInputRef.current?.click()}
            className={`aspect-video md:aspect-[21/9] rounded-4xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative ${
              image ? 'border-brand-500 bg-brand-50/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
            }`}
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover" alt="Scan target" />
            ) : (
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Upload className="text-slate-400" size={24} />
                </div>
                <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">Tap to upload sketch</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
          {image && !loading && !result && (
            <button 
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-rose-500 shadow-lg"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-rose-50 text-rose-600 rounded-2xl text-[10px] font-black uppercase">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <button
          disabled={!image || loading || !!result}
          onClick={handleAnalyze}
          className="w-full py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 bg-brand-500 text-white disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 shadow-xl shadow-brand-500/20 transition-all active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} /> Analyze Design</>}
        </button>

        {result && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500 pb-12">
            <div className="bg-slate-900 p-6 rounded-4xl text-white relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-brand-500 rounded text-[10px] font-black uppercase">{result.complexity} complexity</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${result.risk_level === 'High' ? 'bg-rose-500' : 'bg-emerald-500'}`}>{result.risk_level} risk</span>
              </div>
              <p className="text-base font-bold italic leading-relaxed text-white/90">"{result.explanation}"</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Timeline</p>
                <p className="text-xl font-black">{result.estimated_hours_min}-{result.estimated_hours_max} <span className="text-[10px] text-slate-400 font-bold uppercase">hrs</span></p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Screens</p>
                <p className="text-xl font-black">{result.screen_count} <span className="text-[10px] text-slate-400 font-bold uppercase">views</span></p>
              </div>
            </div>

            <button 
              onClick={handleSaveProject}
              className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-emerald-500/20"
            >
              <Plus size={18} /> Add to Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Estimator;
