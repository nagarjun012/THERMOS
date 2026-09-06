import React from 'react';
import { motion } from 'framer-motion';
import { getRiskColor, getRiskGlowClass } from '../../utils/helpers';

interface Props {
  score: number;
  level: string;
}

export const ThermalStressGauge: React.FC<Props> = ({ score, level }) => {
  const color = getRiskColor(level);
  const glow = getRiskGlowClass(level);
  
  const radius = 120;
  const stroke = 20;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`glass-card p-8 flex flex-col items-center justify-center relative ${glow} transition-all duration-500`}>
      <h2 className="text-xl font-semibold mb-6 text-gray-300">Human Thermal Stress Score (HTSS)</h2>
      <div className="relative w-72 h-72 flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="#1a1f2e"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-6xl font-bold" style={{ color }}>{score}</span>
          <span className="text-lg font-medium mt-2 uppercase tracking-widest" style={{ color }}>{level}</span>
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-400 max-w-sm text-center">
        Composite score based on Temperature, Humidity, WBGT, and UTCI.
      </p>
    </div>
  );
};
