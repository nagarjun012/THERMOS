import React from 'react';
import { CityData } from '../../types';
import { getRiskColor, formatTemperature } from '../../utils/helpers';

interface Props {
  city: CityData;
}

export const CityPopup: React.FC<Props> = ({ city }) => {
  const color = getRiskColor(city.risk.level);

  return (
    <div className="p-1 min-w-[200px]">
      <h3 className="font-bold text-lg mb-1" style={{ color }}>{city.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{city.state}</p>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-200">
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">HTSS</span>
          <span className="font-semibold text-lg">{city.thermal.htss}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">Risk</span>
          <span className="font-semibold" style={{ color }}>{city.risk.level}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">Temp</span>
          <span>{formatTemperature(city.weather.temperature)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">Humidity</span>
          <span>{city.weather.humidity}%</span>
        </div>
      </div>
      
      {city.alerts.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-700">
          <span className="text-xs font-semibold text-red-500 block">
            {city.alerts.length} Active Alert(s)
          </span>
        </div>
      )}
    </div>
  );
};
