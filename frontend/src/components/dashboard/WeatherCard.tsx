import React from 'react';
import * as LucideIcons from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  unit?: string;
  icon: keyof typeof LucideIcons;
  color?: string;
}

export const WeatherCard: React.FC<Props> = ({ title, value, unit, icon, color = '#3b82f6' }) => {
  const Icon = LucideIcons[icon] as React.ElementType;
  
  return (
    <div className="glass-card p-6 flex flex-col justify-between overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, transparent, ${color})` }} />
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
        <Icon className="w-6 h-6 opacity-80" style={{ color }} />
      </div>
      <div className="flex items-baseline gap-1 relative z-10">
        <span className="text-4xl font-bold text-white">{value}</span>
        {unit && <span className="text-lg text-gray-400">{unit}</span>}
      </div>
    </div>
  );
};
