'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { Activity, Zap, TrendingUp, TrendingDown, Minus, AlertCircle, BrainCircuit, BarChart2, MessageSquareText } from 'lucide-react';

// ============================================================================
// Sentinel Oracle V2 - Bayesian Infographic Display
// ============================================================================

const ConfidenceRing = memo(function ConfidenceRing({ confidence, signal }: { confidence: number; signal: string }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const getColor = () => {
    if (signal === 'ENTER_LONG' || signal === 'LONG') return '#10b981'; // emerald-400
    if (signal === 'ENTER_SHORT' || signal === 'SHORT') return '#ef4444'; // red-400
    if (signal === 'WAIT' || signal === 'HOLD') return '#fbbf24'; // amber-400
    return '#6b7280';
  };

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="transform -rotate-90 w-20 h-20">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-white/[0.04]"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={getColor()}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold font-mono" style={{ color: getColor() }}>
          {Math.round(confidence)}<span className="text-[10px]">%</span>
        </span>
        <span className="text-[8px] text-slate-500 uppercase tracking-tighter">Prob</span>
      </div>
    </div>
  );
});

const MetricBar = memo(function MetricBar({
  label,
  value,
  min,
  max,
  icon: Icon,
  formatter
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  icon: any;
  formatter: (val: number) => string;
}) {
  const range = max - min;
  const normalized = Math.max(0, Math.min(1, (value - min) / range));
  const pct = Math.round(normalized * 100);
  
  // Determine color based on value for specific metrics
  let barColor = 'bg-blue-400';
  if (label === 'OFI') {
    barColor = value > 0.1 ? 'bg-emerald-400' : value < -0.1 ? 'bg-red-400' : 'bg-slate-400';
  } else if (label === 'SENTIMENT') {
    barColor = value > 0.1 ? 'bg-emerald-400' : value < -0.1 ? 'bg-red-400' : 'bg-slate-400';
  } else if (label === 'DXY') {
    barColor = value < -0.1 ? 'bg-emerald-400' : value > 0.1 ? 'bg-red-400' : 'bg-slate-400';
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-1.5 text-slate-400 uppercase tracking-wider font-semibold">
          <Icon className="w-3 h-3" />
          {label}
        </div>
        <span className={`font-mono font-bold ${barColor.replace('bg-', 'text-')}`}>
          {formatter(value)}
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          className={`h-full rounded-full ${barColor}`}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
});

const SignalCard = memo(function SignalCard() {
  const { signal, connectionStatus } = useDashboard();

  const isLoading = connectionStatus === 'connecting';
  const hasError = connectionStatus === 'error';

  const dxyChange = signal?.data_used?.dxy_change ?? 0;
  const ofi = signal?.data_used?.ofi ?? 0;
  const sentiment = signal?.data_used?.sentiment ?? 0;

  const getSignalColor = () => {
    if (!signal) return 'text-slate-500';
    if (signal.signal === 'ENTER_LONG' || signal.signal === 'LONG') return 'text-emerald-400';
    if (signal.signal === 'ENTER_SHORT' || signal.signal === 'SHORT') return 'text-red-400';
    if (signal.signal === 'WAIT' || signal.signal === 'HOLD') return 'text-amber-400';
    return 'text-slate-500';
  };

  const getSignalBg = () => {
    if (!signal) return 'bg-slate-500/10';
    if (signal.signal === 'ENTER_LONG' || signal.signal === 'LONG') return 'bg-emerald-400/10';
    if (signal.signal === 'ENTER_SHORT' || signal.signal === 'SHORT') return 'bg-red-400/10';
    if (signal.signal === 'WAIT' || signal.signal === 'HOLD') return 'bg-amber-400/10';
    return 'bg-slate-500/10';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl relative"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
        <BrainCircuit className="w-48 h-48 text-violet-400" />
      </div>

      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between bg-void/40 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
            <BrainCircuit className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
              Oracle V2
            </h3>
            <div className="text-[9px] text-slate-500 font-mono mt-0.5 uppercase">
              Bayesian Fusion Engine
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
           {signal && (
              <span className="text-[9px] font-mono text-slate-500">
                {new Date(signal.timestamp).toLocaleTimeString()}
              </span>
           )}
           <span className="text-[8px] uppercase tracking-wider text-violet-400 font-bold mt-1">
             Live Sync
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative z-10">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="w-20 h-20 rounded-full bg-white/[0.04]" />
              <div className="w-1/2 h-10 bg-white/[0.04] rounded-lg" />
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-2 bg-white/[0.04] rounded" />
              <div className="h-2 bg-white/[0.04] rounded" />
              <div className="h-2 bg-white/[0.04] rounded" />
            </div>
          </div>
        ) : hasError ? (
          <div className="py-8 text-center">
            <AlertCircle className="w-8 h-8 text-red-400/50 mx-auto mb-3" />
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Signal Unavailable</p>
          </div>
        ) : signal ? (
          <div className="space-y-6">
            
            {/* Top Row: Probability & Signal */}
            <div className="flex items-center justify-between bg-white/[0.02] p-4 rounded-xl border border-white/[0.03]">
              <ConfidenceRing confidence={signal.confidence} signal={signal.signal} />
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
                  Active Directive
                </div>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.05] shadow-inner ${getSignalBg()}`}
                >
                  <span className={`text-lg font-black tracking-tight ${getSignalColor()}`}>
                    {signal.signal}
                  </span>
                </div>
              </div>
            </div>

            {/* Oracle Logic Display */}
            <div className="bg-void/60 p-4 rounded-xl border border-white/[0.03]">
               <div className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5">
                 <Zap className="w-3 h-3 text-amber-400" />
                 Inference Logic
               </div>
               <p className="text-xs text-slate-300 font-mono leading-relaxed break-words">
                 {signal.logic || "Awaiting Bayesian convergence..."}
               </p>
            </div>

            {/* Microstructure & Sentiment Infographics */}
            <div className="space-y-4 pt-2">
              <MetricBar 
                label="OFI" 
                value={ofi} 
                min={-1} 
                max={1} 
                icon={BarChart2}
                formatter={(val) => val > 0 ? `+${val.toFixed(3)}` : val.toFixed(3)}
              />
              <MetricBar 
                label="SENTIMENT" 
                value={sentiment} 
                min={-1} 
                max={1} 
                icon={MessageSquareText}
                formatter={(val) => val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
              />
              <MetricBar 
                label="DXY" 
                value={dxyChange} 
                min={-0.5} 
                max={0.5} 
                icon={Activity}
                formatter={(val) => val > 0 ? `+${val.toFixed(2)}%` : `${val.toFixed(2)}%`}
              />
            </div>

          </div>
        ) : (
          <div className="py-8 text-center text-slate-500">
            <BrainCircuit className="w-8 h-8 opacity-20 mx-auto mb-3 animate-pulse" />
            <p className="text-xs uppercase tracking-widest font-bold">Awaiting Oracle...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default SignalCard;