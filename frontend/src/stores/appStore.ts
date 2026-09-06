import { create } from 'zustand';

interface Location {
  lat: number;
  lon: number;
  name: string;
}

interface AppState {
  selectedLocation: Location;
  activeScenario: string | null;
  setLocation: (loc: Location) => void;
  setScenario: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedLocation: { lat: 28.6139, lon: 77.2090, name: 'Delhi' },
  activeScenario: null,
  setLocation: (loc) => set({ selectedLocation: loc }),
  setScenario: (id) => set({ activeScenario: id }),
}));
