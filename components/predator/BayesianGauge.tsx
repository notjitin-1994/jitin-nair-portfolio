"use client";

import { motion } from "framer-motion";

interface GaugeProps {
  label: string;
  value: number;
  color: string;
}

export function BayesianGauge({ label, value, color }: GaugeProps) {
  const percentage = value * 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value * circumference);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-void/40 border border-white/5 rounded-xl backdrop-blur-md">
      <div className="relative w-24 h-24">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-zinc-800"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-mono font-bold text-white">
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
        {label}
      </span>
    </div>
  );
}
