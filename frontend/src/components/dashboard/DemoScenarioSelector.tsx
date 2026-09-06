import React from 'react';
import { useDemoScenarios, useActivateScenario } from '../../hooks/useApi';
import { useAppStore } from '../../stores/appStore';
import * as Icons from 'lucide-react';

export const DemoScenarioSelector: React.FC = () => {
  const { data: scenarios } = useDemoScenarios();
  const { mutate: activate } = useActivateScenario();
  const activeScenario = useAppStore(s => s.activeScenario);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${activeScenario ? 'bg-purple-900/30 border-purple-500/50 text-purple-300' : 'bg-dark-700 border-dark-600 text-gray-300 hover:text-white'}`}
      >
        <Icons.Play className="w-4 h-4" />
        {activeScenario ? 'DEMO MODE' : 'Live Data'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 glass-card shadow-2xl z-50 overflow-hidden">
          <div className="p-3 bg-dark-800 border-b border-dark-600 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-300">Select Scenario</span>
            {activeScenario && (
              <button 
                onClick={() => { activate('reset'); setIsOpen(false); }}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Reset to Live
              </button>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto">
            {scenarios?.map(s => {
              const Icon = Icons[s.icon as keyof typeof Icons] as React.ElementType || Icons.Activity;
              const isActive = activeScenario === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => { activate(s.id); setIsOpen(false); }}
                  className={`w-full text-left p-3 flex items-start gap-3 hover:bg-dark-600 transition-colors ${isActive ? 'bg-purple-900/20' : ''}`}
                >
                  <div className={`mt-0.5 ${isActive ? 'text-purple-400' : 'text-gray-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium ${isActive ? 'text-purple-300' : 'text-gray-200'}`}>{s.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{s.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
