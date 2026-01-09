
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, Search, LogOut, Shield, ShieldOff } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useStudio } from '../context/StudioContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Logo: React.FC<{ collapsed?: boolean, className?: string }> = ({ collapsed, className }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-[#404040] rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
      <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-8 md:h-8">
        <circle cx="50" cy="50" r="42" fill="white" />
        <path 
          d="M50 20c-1.5 0-2.8 1.1-3 2.5l-.5 3.5c-2.5.6-4.8 1.7-6.8 3.2l-2.8-2.1c-1.2-.9-2.9-.7-3.9.4l-4.2 4.2c-1.1 1.1-1.3 2.7-.4 3.9l2.1 2.8c-1.5 2-2.6 4.3-3.2 6.8l-3.5.5c-1.4.2-2.5 1.5-2.5 3v6c0 1.5 1.1 2.8 2.5 3l3.5.5c.6 2.5 1.7 4.8 3.2 6.8l-2.1 2.8c-.9 1.2-.7 2.9.4 3.9l4.2 4.2c1.1 1.1 2.7 1.3 3.9.4l2.8-2.1c2 1.5 4.3 2.6 6.8 3.2l.5 3.5c.2 1.4 1.5 2.5 3 2.5h6c1.5 0 2.8-1.1 3-2.5l.5-3.5c2.5-.6 4.8-1.7 6.8-3.2l2.8 2.1c1.2.9 2.9.7 3.9-.4l4.2-4.2c1.1-1.1 1.3-2.7.4-3.9l-2.1-2.8c1.5-2 2.6-4.3 3.2-6.8l3.5-.5c1.4-.2 2.5-1.5 2.5-3v-6c0-1.5-1.1-2.8-2.5-3l-3.5-.5c-.6-2.5-1.7-4.8-3.2-6.8l2.1-2.8c.9-1.2.7-2.9-.4-3.9l-4.2-4.2c-1.1-1.1-2.7-1.3-3.9-.4l-2.8 2.1c-2-1.5-4.3-2.6-6.8-3.2l-.5-3.5C52.8 21.1 51.5 20 50 20zm0 15c8.3 0 15 6.7 15 15s-6.7 15-15 15-15-6.7-15-15 6.7-15 15-15z" 
          fill="#6366f1" 
        />
        <path 
          d="M58 42l-12 12c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5 4 1.5 5.5 0l12-12c.5-.5 1.3-.5 1.8 0l2 2c.5.5.5 1.3 0 1.8L53.5 65c-3.5 3.5-9.3 3.5-12.8 0s-3.5-9.3 0-12.8L61.8 31c.5-.5 1.3-.5 1.8 0l2 2c.5.5.5 1.3 0 1.8L58 42z" 
          fill="#6366f1" 
        />
      </svg>
    </div>
    {!collapsed && (
      <span className="font-black text-xl md:text-2xl tracking-tighter text-brand-500 flex items-baseline">
        S<span className="tracking-tight">L</span>OTZ
      </span>
    )}
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { profile, addNotification, toggleIncognito, isDarkMode } = useStudio();
  const location = useLocation();

  const handleLogout = () => {
    addNotification('Logging out...');
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Desktop Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-24'} hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300`}>
        <div className="h-20 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <Logo collapsed={!isSidebarOpen} />
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.id} 
              to={item.path} 
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? 'bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              } font-bold`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full text-slate-500 dark:text-slate-400 hover:text-rose-500 transition-colors font-bold"
          >
            <LogOut size={20} />{isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Mobile App Header */}
        <header className="h-14 md:h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-20 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-500 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:flex hidden">
              <Menu size={20} />
            </button>
            <Logo className="md:hidden" />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleIncognito}
              className={`p-2 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-tight px-3 ${profile.isIncognito ? 'bg-slate-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-white'}`}
            >
              {profile.isIncognito ? <ShieldOff size={16} /> : <Shield size={16} />}
              <span className="hidden sm:block">{profile.isIncognito ? "Incognito" : "Public"}</span>
            </button>

            <button className="p-2 text-slate-500 dark:text-white relative" onClick={() => addNotification('No new notifications')}>
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full"></span>
            </button>
            
            <Link to="/profile" className="ml-1">
              <img 
                src={profile.isIncognito ? `https://api.dicebear.com/7.x/identicon/svg?seed=${profile.studentId}` : profile.profileImage} 
                className={`w-8 h-8 md:w-9 md:h-9 rounded-full border border-slate-200 dark:border-slate-800 object-cover ${profile.isIncognito ? 'opacity-80' : ''}`} 
              />
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 transition-colors no-scrollbar">
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>

        {/* Mobile Bottom Navigation Bar - Corrected Layout for all 6 items */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 glass-nav border-t border-slate-200 dark:border-slate-800 z-50 flex items-center justify-between px-1 pb-safe">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const displayLabel = item.label === 'AI Estimator' ? 'Estimator' : item.label;
            
            return (
              <Link 
                key={item.id} 
                to={item.path} 
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                  isActive ? 'text-brand-500 scale-105' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-brand-50 dark:bg-brand-950/40 mb-0.5' : 'mb-0'}`}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-tighter text-center leading-none px-0.5 whitespace-nowrap ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {displayLabel}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
