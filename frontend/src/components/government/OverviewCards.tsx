import React from 'react';
import { Users, MapPin, AlertTriangle, Activity } from 'lucide-react';
import { GovernmentDashboard } from '../../types';

interface Props {
  data: GovernmentDashboard;
}

export const OverviewCards: React.FC<Props> = ({ data }) => {
  const cards = [
    { title: 'States Affected', value: data.statesAffected, icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'High-Risk Locations', value: data.highRiskLocations, icon: Activity, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { title: 'Active Alerts', value: data.activeAlerts, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { title: 'Affected Population', value: (data.affectedPopulation / 1000000).toFixed(1) + 'M', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="glass-card p-6 flex items-center gap-4">
            <div className={`p-4 rounded-xl ${card.bg}`}>
              <Icon className={`w-8 h-8 ${card.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">{card.title}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{card.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
