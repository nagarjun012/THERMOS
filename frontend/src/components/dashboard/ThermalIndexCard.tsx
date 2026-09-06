import React from 'react';
import { getRiskColor } from '../../utils/helpers';

interface Props {
  title: string;
  value: number;
  max: number;
  unit: string;
  category: string;
}

export const ThermalIndexCard: React.FC<Props> = ({ title, value, max, unit, category }) => {
  const color = getRiskColor(category);
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="glass-card p-5">
      <div className="flex justify-between items-end mb-3">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{value}</span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-full uppercase" style={{ backgroundColor: `${color}20`, color }}>
          {category}
        </span>
      </div>
      <div className="w-full bg-dark-700 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};
