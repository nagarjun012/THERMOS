import React from 'react';
import { useGovernmentDashboard } from '../hooks/useApi';
import { OverviewCards } from '../components/government/OverviewCards';
import { GovernmentTable } from '../components/government/GovernmentTable';
import { HeatRiskMap } from '../components/map/HeatRiskMap';
import { MapLegend } from '../components/map/MapLegend';
import { StateRiskBar } from '../components/charts/StateRiskBar';
import { VulnerabilityRadar } from '../components/charts/VulnerabilityRadar';

export const GovernmentDashboard: React.FC = () => {
  const { data, isLoading } = useGovernmentDashboard();

  if (isLoading || !data) {
    return <div className="p-8 text-center text-gray-400">Loading command center...</div>;
  }

  const demoVuln = {
    state: 'Delhi',
    elderlyPercentage: 8.6,
    populationDensity: 11320,
    outdoorWorkersPercentage: 38,
    povertyPercentage: 9.9,
    healthcareAccess: 75,
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Government Command Center</h1>
          <p className="text-gray-400 mt-1">National Heat Risk Overview</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          Broadcast Emergency Alert
        </button>
      </div>

      <OverviewCards data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px] mb-6">
        <div className="lg:col-span-2 relative rounded-xl overflow-hidden glass-card">
          <HeatRiskMap cities={data.cities} />
          <MapLegend />
        </div>
        <div className="lg:col-span-1">
          <StateRiskBar cities={data.cities} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <GovernmentTable cities={data.cities} />
        </div>
        <div className="lg:col-span-1">
          <VulnerabilityRadar data={demoVuln} />
        </div>
      </div>
    </div>
  );
};
