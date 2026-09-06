import React from 'react';
import { useWeather, useThermalStress, useRisk, useForecast, useAlerts } from '../hooks/useApi';
import { ThermalStressGauge } from '../components/dashboard/ThermalStressGauge';
import { WeatherCard } from '../components/dashboard/WeatherCard';
import { ThermalIndexCard } from '../components/dashboard/ThermalIndexCard';
import { RiskContributionBar } from '../components/dashboard/RiskContributionBar';
import { ForecastTimeline } from '../components/dashboard/ForecastTimeline';
import { AlertPanel } from '../components/dashboard/AlertPanel';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { HeatwaveProbability } from '../components/dashboard/HeatwaveProbability';
import { useAppStore } from '../stores/appStore';
import { MapPin } from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { selectedLocation } = useAppStore();
  const { data: weather, isLoading: wLoading } = useWeather();
  const { data: thermal, isLoading: tLoading } = useThermalStress();
  const { data: risk, isLoading: rLoading } = useRisk();
  const { data: forecast, isLoading: fLoading } = useForecast();
  const { data: alerts, isLoading: aLoading } = useAlerts();

  if (wLoading || tLoading || rLoading || fLoading || aLoading) {
    return <div className="p-8 text-center text-gray-400">Loading live data...</div>;
  }

  if (!weather || !thermal || !risk || !forecast || !alerts) {
    return <div className="p-8 text-center text-red-400">Failed to load data.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-2 mb-6 text-gray-300">
        <MapPin className="w-5 h-5 text-accent" />
        <h1 className="text-2xl font-bold text-white">{selectedLocation.name}</h1>
        <span className="text-sm px-2 py-1 bg-dark-700 rounded-md">Live Data</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ThermalStressGauge score={thermal.htss} level={risk.level} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          <WeatherCard title="Temperature" value={weather.temperature} unit="°C" icon="Thermometer" color="#f97316" />
          <WeatherCard title="Humidity" value={weather.humidity} unit="%" icon="Droplets" color="#3b82f6" />
          <WeatherCard title="Wind Speed" value={weather.windSpeed} unit="km/h" icon="Wind" color="#10b981" />
          <WeatherCard title="Solar Rad" value={weather.solarRadiation} unit="W/m²" icon="Sun" color="#eab308" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ThermalIndexCard title="Heat Index (HI)" value={thermal.heatIndex} max={60} unit="°C" category={thermal.heatIndex > 54 ? 'Extreme' : thermal.heatIndex > 41 ? 'High' : 'Moderate'} />
        <ThermalIndexCard title="WBGT" value={thermal.wbgt} max={40} unit="°C" category={thermal.wbgt > 33 ? 'Extreme' : thermal.wbgt > 29 ? 'High' : 'Moderate'} />
        <ThermalIndexCard title="UTCI" value={thermal.utci} max={50} unit="°C" category={thermal.utci > 38 ? 'Extreme' : thermal.utci > 32 ? 'High' : 'Moderate'} />
      </div>

      <RiskContributionBar factors={risk.primaryFactors} />
      
      <ForecastTimeline timeline={forecast.timeline} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <HeatwaveProbability probability={risk.probability} trend="up" />
        </div>
        <div className="lg:col-span-1">
          <AlertPanel alerts={alerts} />
        </div>
        <div className="lg:col-span-1">
          <RecommendationCard risk={risk} />
        </div>
      </div>
    </div>
  );
};
