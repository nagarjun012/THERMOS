import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  probability: number;
  trend: 'up' | 'down' | 'flat';
}

export const HeatwaveProbability: React.FC<Props> = ({ probability, trend }) => {
  const color = probability > 75 ? '#ef4444' : probability > 40 ? '#f97316' : '#10b981';
  
  return (
    <div className="glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8" style={{ backgroundImage: `linear-gradient(to bottom right, transparent, ${color})` }} />
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Heatwave Probability</h3>
      <div className="flex items-center justify-center relative">
        <svg width="120" height="120" className="transform -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1f2e" strokeWidth="12" />
          <motion.circle
            cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="12"
            strokeDasharray="314"
            initial={{ strokeDashoffset: 314 }}
            animate={{ strokeDashoffset: 314 - (314 * probability) / 100 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
          {probability}%
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="text-gray-400">Trend:</span>
        {trend === 'up' && <><TrendingUp className="w-4 h-4 text-red-500" /><span className="text-red-500 font-medium">Rising</span></>}
        {trend === 'down' && <><TrendingDown className="w-4 h-4 text-green-500" /><span className="text-green-500 font-medium">Falling</span></>}
        {trend === 'flat' && <><Minus className="w-4 h-4 text-gray-400" /><span className="text-gray-400 font-medium">Stable</span></>}
      </div>
    </div>
  );
};
