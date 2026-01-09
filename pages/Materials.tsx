
import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Truck, MapPin } from 'lucide-react';
import { MOCK_MATERIALS } from '../constants';
import { useStudio } from '../context/StudioContext';

const Materials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addNotification, isDarkMode } = useStudio();

  const filteredMaterials = MOCK_MATERIALS.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePurchase = (vendor: string) => {
    addNotification(`Order placed with ${vendor}!`);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Sourcing</h1>
          <p className="text-[10px] md:text-sm text-slate-500 font-bold uppercase tracking-widest">Verified INR Marketplace</p>
        </div>
        <button 
          onClick={() => addNotification('Filters updated.')}
          className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-white shadow-sm active:scale-95 transition-all"
        >
          <Filter size={20} />
        </button>
      </header>
      
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={18} />
        <input 
          type="text" placeholder="Search supplies (Acrylic, Wood, Clay)..."
          className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 outline-none focus:ring-4 focus:ring-brand-500/10 transition-all text-sm font-bold shadow-sm"
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-12 pb-20">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="space-y-4">
            <div className="flex items-center gap-3 px-1">
              <h2 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">{material.name}</h2>
              <span className="px-2 py-0.5 bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 text-[9px] font-black uppercase tracking-widest rounded-full">{material.category}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {material.vendors.map((vendor) => (
                <div key={vendor.id} className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col active:border-brand-500 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white text-sm">{vendor.name}</h4>
                      <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Verified</p>
                    </div>
                    <div className="text-brand-500 font-black text-xl tracking-tighter">
                      ₹{vendor.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Delivery</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1"><Truck size={12} className="text-brand-400" /> {vendor.deliveryDays} Days</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Radius</p>
                      <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1"><MapPin size={12} className="text-brand-400" /> {vendor.distanceKm} KM</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => handlePurchase(vendor.name)}
                    className="w-full py-3.5 bg-slate-900 dark:bg-brand-500 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-brand-500/20"
                  >
                    <ShoppingCart size={16} /> Checkout
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;
