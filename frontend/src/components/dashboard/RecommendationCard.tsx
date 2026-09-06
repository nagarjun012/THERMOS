import React from 'react';
import * as Icons from 'lucide-react';
import { RiskAssessment } from '../../types';
// Risk color is applied via parent container

interface Props {
  risk: RiskAssessment;
}

export const RecommendationCard: React.FC<Props> = ({ risk }) => {
  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <h3 className="text-lg font-medium text-white mb-4">Actionable Recommendations</h3>
      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {risk.recommendations.map((rec, i) => {
          const Icon = Icons[rec.icon as keyof typeof Icons] as React.ElementType || Icons.Info;
          let color = 'text-gray-400';
          if (rec.urgency === 'high') color = 'text-orange-500';
          if (rec.urgency === 'extreme') color = 'text-red-500';

          return (
            <div key={i} className="flex gap-4 p-3 rounded-lg bg-dark-800/50 border border-dark-600">
              <div className={`mt-1 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{rec.audience}</span>
                <p className="text-sm text-gray-200 mt-1">{rec.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
