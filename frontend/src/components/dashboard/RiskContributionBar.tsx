import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  factors: { factor: string; contribution: number }[];
}

export const RiskContributionBar: React.FC<Props> = ({ factors }) => {
  const colors = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#8b5cf6'];
  
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium text-white mb-4">Risk Factor Contribution</h3>
      <div className="w-full h-8 flex rounded-lg overflow-hidden bg-dark-700 mb-4">
        {factors.map((f, i) => (
          <motion.div
            key={f.factor}
            initial={{ width: 0 }}
            animate={{ width: `${f.contribution}%` }}
            transition={{ duration: 1, delay: i * 0.1 }}
            className="h-full flex items-center justify-center text-xs font-bold text-white overflow-hidden whitespace-nowrap"
            style={{ backgroundColor: colors[i % colors.length] }}
          >
            {f.contribution > 10 ? `${f.contribution}%` : ''}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {factors.map((f, i) => (
          <div key={f.factor} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
            <span className="text-sm text-gray-400">{f.factor}</span>
            <span className="text-sm font-semibold text-gray-200">{f.contribution}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
