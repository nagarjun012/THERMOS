import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { DemoScenarioSelector } from '../dashboard/DemoScenarioSelector';

export const Header: React.FC = () => {
  const { selectedLocation, setLocation } = useAppStore();
  const [search, setSearch] = React.useState(selectedLocation.name);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.toLowerCase() === 'mumbai') {
      setLocation({ lat: 19.0760, lon: 72.8777, name: 'Mumbai' });
    } else {
      setLocation({ lat: 28.6139, lon: 77.2090, name: search });
    }
  };

  return (
    <header className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-dark-600 bg-dark-800">
      <div className="flex-1 w-full max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
            placeholder="Search city..."
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors bg-dark-700 px-4 py-2 rounded-full border border-dark-600">
          <MapPin className="w-4 h-4" />
          Use My Location
        </button>
        <DemoScenarioSelector />
      </div>
    </header>
  );
};
