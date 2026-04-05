"use client";

import { motion } from "framer-motion";

interface GaugeProps {
  label: string;
  value: number;
  color: string;
}

export function BayesianGauge({ label, value, color }: GaugeProps) {
  const percentage = value * 100;
  const radius = 32; // Reduced radius for compactness
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value * circumference);

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl group/gauge">
      <div className="relative w-20 h-20 transition-transform duration-500 group-hover/gauge:scale-110">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-zinc-900/50"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke={color}
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "circOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-mono font-black text-white leading-none">
            {percentage.toFixed(0)}
          </span>
          <span className="text-[8px] font-bold text-zinc-500 uppercase">%</span>
        </div>
      </div>
      <span className="mt-2 text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-black group-hover/gauge:text-white transition-colors">
        {label}
      </span>
    </div>
  );
}

