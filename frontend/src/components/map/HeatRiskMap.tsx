import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { CityData } from '../../types';
import { getRiskColor } from '../../utils/helpers';
import { CityPopup } from './CityPopup';

interface Props {
  cities: CityData[];
  center?: [number, number];
  zoom?: number;
}

const customIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color}80;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const MapController: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const HeatRiskMap: React.FC<Props> = ({ cities, center = [22.5, 82], zoom = 5 }) => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-dark-600 relative z-0">
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%', background: '#0a0e1a' }} zoomControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {cities.map((city) => (
          <Marker 
            key={city.id} 
            position={[city.lat, city.lon]}
            icon={customIcon(getRiskColor(city.risk.level))}
          >
            <Popup className="dark-popup">
              <CityPopup city={city} />
            </Popup>
          </Marker>
        ))}
        <MapController center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
};
