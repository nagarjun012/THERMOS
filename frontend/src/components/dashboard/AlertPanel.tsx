import React from 'react';
import { Alert } from '../../types';
import { AlertTriangle, AlertCircle, Info, Flame, Skull } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  alerts: Alert[];
}

export const AlertPanel: React.FC<Props> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
        <div className="w-12 h-12 rounded-full bg-safe/20 flex items-center justify-center mb-3">
          <Info className="w-6 h-6 text-safe" />
        </div>
        <h3 className="text-lg font-medium text-gray-200">No Active Alerts</h3>
        <p className="text-sm text-gray-400 mt-1">Conditions are currently safe.</p>
      </div>
    );
  }

  const getSeverityStyles = (severity: string) => {
    switch(severity.toLowerCase()) {
      case 'red': return { bg: 'bg-red-500/10', border: 'border-red-500/50', icon: Skull, color: 'text-red-500' };
      case 'orange': return { bg: 'bg-orange-500/10', border: 'border-orange-500/50', icon: Flame, color: 'text-orange-500' };
      case 'yellow': return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/50', icon: AlertTriangle, color: 'text-yellow-500' };
      default: return { bg: 'bg-blue-500/10', border: 'border-blue-500/50', icon: AlertCircle, color: 'text-blue-500' };
    }
  };

  return (
    <div className="glass-card p-6 h-full">
      <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Active Warnings ({alerts.length})
      </h3>
      <div className="space-y-4">
        <AnimatePresence>
          {alerts.map((alert) => {
            const styles = getSeverityStyles(alert.severity);
            const Icon = styles.icon;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border-l-4 ${styles.bg} ${styles.border}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${styles.color}`} />
                    <h4 className={`font-semibold ${styles.color}`}>{alert.title}</h4>
                  </div>
                  <span className="text-xs text-gray-400">{alert.time}</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{alert.message}</p>
                <div className="flex flex-wrap gap-2">
                  {alert.actions.map((act, i) => (
                    <span key={i} className="text-xs font-medium px-2 py-1 rounded-md bg-dark-800 text-gray-300 border border-dark-600">
                      {act}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
