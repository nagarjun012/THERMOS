import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CityData } from '../../types';
import { getRiskColor } from '../../utils/helpers';

interface Props {
  cities: CityData[];
}

export const StateRiskBar: React.FC<Props> = ({ cities }) => {
  const chartData = cities.map(c => ({
    name: c.name,
    score: c.thermal.htss,
    level: c.risk.level
  })).sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div className="glass-card p-6 h-80">
      <h3 className="text-lg font-medium text-white mb-4">Highest Risk Locations</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" />
          <YAxis dataKey="name" type="category" stroke="#9ca3af" width={80} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRiskColor(entry.level)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
