import React from 'react';

export default function KPICard({ title, value, subtitle, icon: Icon, colorClass = "from-blue-500 to-indigo-600" }) {
  return (
    <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:-translate-y-1 transition-all duration-300 group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">{title}</h4>
        {Icon && (
            <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${colorClass} text-white shadow-lg`}>
                <Icon size={20} />
            </div>
        )}
      </div>
      <div className="relative z-10">
          <div className="text-4xl font-black text-gray-900 tracking-tight">{value}</div>
          {subtitle && <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">{subtitle}</p>}
      </div>
    </div>
  );
}