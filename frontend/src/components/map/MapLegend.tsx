import React from 'react';
import { getRiskColor } from '../../utils/helpers';

export const MapLegend: React.FC = () => {
  const levels = ['Safe', 'Low', 'Moderate', 'High', 'Extreme'];
  
  return (
    <div className="glass-card p-4 absolute bottom-6 right-6 z-[400] text-sm">
      <h4 className="font-semibold text-gray-200 mb-2">Risk Levels</h4>
      <div className="space-y-2">
        {levels.map((lvl) => (
          <div key={lvl} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: getRiskColor(lvl) }} />
            <span className="text-gray-300">{lvl}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
