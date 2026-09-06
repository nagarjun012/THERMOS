import React from 'react';
import { CityData } from '../../types';
import { getRiskColor, formatTemperature } from '../../utils/helpers';
import { AlertTriangle } from 'lucide-react';

interface Props {
  cities: CityData[];
}

export const GovernmentTable: React.FC<Props> = ({ cities }) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-dark-600 bg-dark-800/50 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Location Monitoring</h3>
        <input type="text" placeholder="Filter locations..." className="bg-dark-700 border border-dark-600 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-accent" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-dark-800/80">
            <tr>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Risk Level</th>
              <th className="px-6 py-3">Temp</th>
              <th className="px-6 py-3">WBGT</th>
              <th className="px-6 py-3">UTCI</th>
              <th className="px-6 py-3">HTSS</th>
              <th className="px-6 py-3">Alerts</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.id} className="border-b border-dark-600 hover:bg-dark-700/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">
                  {city.name}, {city.state}
                </td>
                <td className="px-6 py-4">
                  <span 
                    className="px-2 py-1 rounded text-xs font-bold" 
                    style={{ backgroundColor: `${getRiskColor(city.risk.level)}20`, color: getRiskColor(city.risk.level) }}
                  >
                    {city.risk.level}
                  </span>
                </td>
                <td className="px-6 py-4">{formatTemperature(city.weather.temperature)}</td>
                <td className="px-6 py-4">{formatTemperature(city.thermal.wbgt)}</td>
                <td className="px-6 py-4">{formatTemperature(city.thermal.utci)}</td>
                <td className="px-6 py-4 font-bold">{city.thermal.htss}</td>
                <td className="px-6 py-4">
                  {city.alerts.length > 0 ? (
                    <span className="flex items-center gap-1 text-red-500 font-medium">
                      <AlertTriangle className="w-4 h-4" /> {city.alerts.length}
                    </span>
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
