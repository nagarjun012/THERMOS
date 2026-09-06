import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Activity, BarChart3, Bell, Smartphone, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const features = [
    { icon: Activity, title: 'Real-Time Monitoring', desc: 'Continuous tracking of multi-parameter weather data.' },
    { icon: Shield, title: 'Advanced Risk Assessment', desc: 'HTSS model utilizing WBGT and UTCI indices.' },
    { icon: Bell, title: 'Early Warning System', desc: 'Actionable alerts tailored for different demographics.' },
    { icon: Globe, title: 'Interactive GIS Mapping', desc: 'Visualizing risk zones and vulnerability layers.' },
    { icon: BarChart3, title: 'Predictive Analytics', desc: '72-hour forecasting using ML models.' },
    { icon: Smartphone, title: 'Citizen & Govt Portals', desc: 'Dedicated interfaces for targeted intervention.' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative z-10">
        <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🌡️</span> THERMOSAFE
          </div>
          <div className="flex gap-4">
            <Link to="/government" className="px-4 py-2 text-sm font-medium hover:text-accent transition-colors">Gov Login</Link>
            <Link to="/dashboard" className="px-5 py-2 bg-accent hover:bg-accent-dark text-white rounded-full text-sm font-medium transition-colors">Launch App</Link>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-purple-600"
            >
              AI-Powered Extreme Heat Early Warning
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              Protecting lives through intelligent thermal stress monitoring, predictive forecasting, and targeted interventions for vulnerable populations across India.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                Check Your Heat Risk <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div 
                  key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300 group"
                >
                  <div className="w-12 h-12 bg-dark-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent group-hover:text-accent-light" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-gray-400">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};
