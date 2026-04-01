'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { Activity, Zap, TrendingUp, TrendingDown, AlertCircle, BrainCircuit, BarChart2, MessageSquareText, ShieldCheck } from 'lucide-react';

// ============================================================================
// Sentinel Oracle V2 - Human-Readable Bayesian Display
// ============================================================================

const BattleForControl = memo(function BattleForControl({ 
  long, short, wait 
}: { 
  long: number; short: number; wait: number 
}) {
  const total = long + short + wait;
  const longPct = (long / total) * 100;
  const shortPct = (short / total) * 100;
  const waitPct = (wait / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Battle for Control</span>
        <div className="flex gap-3 text-[9px] font-mono">
          <span className="text-emerald-400">LONG {Math.round(longPct)}%</span>
          <span className="text-red-400">SHORT {Math.round(shortPct)}%</span>
          <span className="text-amber-400">NEUTRAL {Math.round(waitPct)}%</span>
        </div>
      </div>
      
      <div className="h-3 w-full bg-white/[0.04] rounded-lg overflow-hidden flex border border-white/[0.05] shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${longPct}%` }}
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative group"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${waitPct}%` }}
          className="h-full bg-slate-700/50 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${shortPct}%` }}
          className="h-full bg-gradient-to-l from-red-600 to-red-400 relative group"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
      
      <div className="flex justify-between px-1">
        <div className="flex flex-col">
          <span className="text-[8px] text-slate-600 uppercase font-black">Bullish Impulse</span>
          <div className={`h-0.5 w-4 rounded-full mt-0.5 ${longPct > shortPct ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-slate-800'}`} />
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="text-[8px] text-slate-600 uppercase font-black">Bearish Pressure</span>
          <div className={`h-0.5 w-4 rounded-full mt-0.5 ${shortPct > longPct ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]' : 'bg-slate-800'}`} />
        </div>
      </div>
    </div>
  );
});

const MetricGauge = memo(function MetricGauge({
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
  
  let barColor = 'bg-blue-400';
  if (label === 'OFI') {
    barColor = value > 0.1 ? 'bg-emerald-400' : value < -0.1 ? 'bg-red-400' : 'bg-slate-400';
  } else if (label === 'SENTIMENT') {
    barColor = value > 0.1 ? 'bg-emerald-400' : value < -0.1 ? 'bg-red-400' : 'bg-slate-400';
  } else if (label === 'DXY') {
    barColor = value < -0.1 ? 'bg-emerald-400' : value > 0.1 ? 'bg-red-400' : 'bg-slate-400';
  }

  return (
    <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.03]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-slate-500 uppercase text-[9px] font-bold">
          <Icon className="w-3.5 h-3.5" />
          {label}
        </div>
        <span className={`font-mono text-[10px] font-black ${barColor.replace('bg-', 'text-')}`}>
          {formatter(value)}
        </span>
      </div>
      <div className="h-1 w-full bg-void/80 rounded-full overflow-hidden">
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
  
  const pLong = signal?.data_used?.prob_long ?? 0.33;
  const pShort = signal?.data_used?.prob_short ?? 0.33;
  const pWait = signal?.data_used?.prob_wait ?? 0.34;

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
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl relative flex flex-col"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between bg-void/40 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 shadow-lg">
            <BrainCircuit className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-[12px] font-black text-slate-200 uppercase tracking-[0.2em]">
              Apollo&apos;s Decree
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] text-slate-500 font-mono uppercase tracking-widest">Bayesian Core v2.4</span>
            </div>
          </div>
        </div>
        <div className="text-right">
           <span className={`text-xs font-black tracking-tighter ${getSignalColor()}`}>
             {signal?.signal || 'AWAITING'}
           </span>
           <div className="text-[8px] text-slate-600 font-mono uppercase mt-0.5">
             {signal ? new Date(signal.timestamp).toLocaleTimeString() : 'Handshaking...'}
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-6 flex-1 relative z-10">
        {isLoading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-white/5 rounded-xl" />
            <div className="h-20 bg-white/5 rounded-xl" />
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 bg-white/5 rounded-xl" />
              <div className="h-16 bg-white/5 rounded-xl" />
              <div className="h-16 bg-white/5 rounded-xl" />
            </div>
          </div>
        ) : hasError ? (
          <div className="py-12 text-center">
            <AlertCircle className="w-10 h-10 text-red-400/30 mx-auto mb-4" />
            <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-black">Link Degraded</p>
          </div>
        ) : signal ? (
          <div className="space-y-6">
            
            {/* Probability Battle Infographic */}
            <div className="bg-void/40 p-4 rounded-xl border border-white/[0.04] shadow-inner">
              <BattleForControl long={pLong} short={pShort} wait={pWait} />
            </div>

            {/* Natural Language Verdict */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-midnight p-4 rounded-xl border border-white/[0.06] overflow-hidden">
                <div className="flex items-center gap-2 mb-2 text-amber-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Inference Narrative</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium italic">
                  &quot;{signal.logic || "The Oracle is calibrating beliefs based on current market microstructure..."}&quot;
                </p>
              </div>
            </div>

            {/* Deep Liquidity & Macro Metrics */}
            <div className="grid grid-cols-1 gap-3">
              <MetricGauge 
                label="OFI" 
                value={ofi} 
                min={-1} 
                max={1} 
                icon={BarChart2}
                formatter={(val) => val > 0 ? `+${val.toFixed(3)}` : val.toFixed(3)}
              />
              <MetricGauge 
                label="SENTIMENT" 
                value={sentiment} 
                min={-1} 
                max={1} 
                icon={MessageSquareText}
                formatter={(val) => val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
              />
              <MetricGauge 
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
          <div className="py-12 text-center text-slate-600">
            <BrainCircuit className="w-10 h-10 opacity-10 mx-auto mb-4 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.3em] font-black">Awaiting Convergence</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default SignalCard;