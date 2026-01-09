import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { Plus, Clock, AlertTriangle, X, Trash2, ArrowRight } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { STATUS_COLORS, RISK_COLORS } from '../constants';
import { Assignment } from '../types';

const Dashboard: React.FC = () => {
  const { assignments, addAssignment, deleteAssignment, addNotification, isDarkMode } = useStudio();
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const chartData = assignments.map(a => ({
    name: a.title.length > 8 ? a.title.substring(0, 6) + '..' : a.title,
    progress: a.progress,
  }));

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const project: Assignment = {
      id: Math.random().toString(),
      title: newTitle,
      description: 'Newly created project.',
      deadline: new Date().toISOString().split('T')[0],
      status: 'Research',
      progress: 0,
      riskAssessment: 'Low'
    };
    addAssignment(project);
    setShowModal(false);
    setNewTitle('');
    addNotification('Project added to vault.');
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Vault</h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">{assignments.length} Projects</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-12 h-12 md:w-auto md:px-5 md:py-2.5 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl md:rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20 active:scale-95"
        >
          <Plus size={24} />
          <span className="hidden md:block">New Project</span>
        </button>
      </header>

      {/* Mobile Stats Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
        <div className="flex-shrink-0 w-36 md:w-full bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Clock size={20} className="text-brand-500 mb-3" />
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">Hrs This Wk</p>
          <p className="text-xl font-black text-slate-900 dark:text-white">32.5</p>
        </div>
        <div className="flex-shrink-0 w-36 md:w-full bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
          <ArrowRight size={20} className="text-emerald-500 mb-3" />
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">Active</p>
          <p className="text-xl font-black text-slate-900 dark:text-white">{assignments.length}</p>
        </div>
        <div className="flex-shrink-0 w-36 md:w-full bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
          <AlertTriangle size={20} className="text-rose-500 mb-3" />
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">High Risk</p>
          <p className="text-xl font-black text-slate-900 dark:text-white">{assignments.filter(a => a.riskAssessment === 'High').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Active Pipeline</h2>
          <div className="space-y-3">
            {assignments.map((assignment) => (
              <div 
                key={assignment.id} 
                className="bg-white dark:bg-slate-900 p-4 md:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm active:border-brand-500 transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="pr-12">
                    <h3 className="font-black text-slate-900 dark:text-white leading-tight">{assignment.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{assignment.description}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteAssignment(assignment.id); }}
                    className="absolute top-4 right-4 text-slate-300 dark:text-slate-700 hover:text-rose-500 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-500 h-full rounded-full transition-all duration-700" style={{ width: `${assignment.progress}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${STATUS_COLORS[assignment.status]}`}>
                      {assignment.status}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase">Deadline: {assignment.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">Velocity</h3>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#64748b' : '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'rgba(99, 102, 241, 0.05)'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'}}
                />
                <Bar 
                  dataKey="progress" 
                  fill="#6366f1" 
                  radius={[8, 8, 8, 8]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* App-Like Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 pb-12 md:pb-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-6 md:hidden"></div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">New Project</h2>
              <button onClick={() => setShowModal(false)} className="p-2"><X size={24} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Project Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 font-bold"
                  placeholder="e.g. Claymation Kit"
                />
              </div>
              <button className="w-full py-4 bg-brand-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-brand-500/20 active:scale-95 transition-all">
                Launch Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;