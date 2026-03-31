'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Brain, BarChart3, ShieldAlert, Cpu } from 'lucide-react';
import { RegimeData } from '../types/dashboard';

interface RegimeDisplayProps {
  regime: RegimeData | null;
  isLoading: boolean;
}

const regimeConfig: Record<string, { color: string; bgColor: string; icon: typeof Activity; arrow: 'up' | 'down' | 'flat' }> = {
  TREND_UP: { color: 'text-emerald-400', bgColor: 'bg-emerald-400', icon: TrendingUp, arrow: 'up' },
  TREND_DOWN: { color: 'text-red-400', bgColor: 'bg-red-400', icon: TrendingDown, arrow: 'down' },
  RANGE: { color: 'text-amber-400', bgColor: 'bg-amber-400', icon: Activity, arrow: 'flat' },
  VOLATILE: { color: 'text-red-400', bgColor: 'bg-red-400', icon: BarChart3, arrow: 'down' },
  UNKNOWN: { color: 'text-slate-400', bgColor: 'bg-slate-400', icon: Brain, arrow: 'flat' },
};

function ConfidenceGauge({ value, color }: { value: number; color: string }) {
  const radius = 40;
  const stroke = 6;
  const normalizedValue = Math.min(Math.max(value, 0), 1);
  const circumference = Math.PI * radius; // half circle
  const offset = circumference * (1 - normalizedValue);
  const colorMap: Record<string, string> = {
    'text-emerald-400': '#34d399',
    'text-red-400': '#f87171',
    'text-amber-400': '#fbbf24',
    'text-slate-400': '#94a3b8',
  };
  const strokeColor = colorMap[color] || '#94a3b8';

  return (
    <svg viewBox="0 0 100 55" className="w-28 h-16">
      <path
        d="M 10 50 A 40 40 0 0 1 90 50"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <motion.path
        d="M 10 50 A 40 40 0 0 1 90 50"
        fill="none"
        stroke={strokeColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <text x="50" y="42" textAnchor="middle" className="fill-white text-lg font-bold" fontSize="16" fontWeight="700">
        {Math.round(Number(value || 0) * 100)}
      </text>
      <text x="50" y="52" textAnchor="middle" className="fill-slate-500" fontSize="7">
        CONFIDENCE
      </text>
    </svg>
  );
}

function TimeframeBar({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-slate-500 font-mono w-14 uppercase tracking-tighter">{label}</span>
      <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          className={`h-full rounded-full ${colorClass}`}
        />
      </div>
      <span className="text-[10px] font-mono text-slate-400 w-8 text-right">{pct}%</span>
    </div>
  );
}

export default function RegimeDisplay({ regime, isLoading }: RegimeDisplayProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-16 bg-white/5 rounded-xl" />
        <div className="h-8 bg-white/5 rounded-lg" />
      </div>
    );
  }

  if (!regime) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-slate-600">
        <Brain className="w-8 h-8 mb-2 opacity-30" />
        <span className="text-sm">No regime data</span>
      </div>
    );
  }

  const config = regimeConfig[regime.regime] || regimeConfig.UNKNOWN;
  const Icon = config.icon;
  const isBreaking = (regime as any).change_point_prob > 0.7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Detection Engine Version */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-blue-400">
          <Cpu className="w-2.5 h-2.5" />
          <span className="text-[8px] font-bold uppercase tracking-widest">
            {regime.features?.barsProcessed ? 'Nexus V3' : 'Nexus V3'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono text-slate-600 uppercase">Run Length:</span>
          <span className="text-[8px] font-mono text-blue-400 font-bold">{ (regime as any).run_length || 0 } bars</span>
        </div>
      </div>

      {/* Main Regime Header */}
      <div className="flex items-center justify-between bg-white/[0.01] p-3 rounded-xl border border-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${config.bgColor}/10 border border-white/[0.05]`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <div className={`text-xl font-bold tracking-tight ${config.color}`}>
              {regime.regime?.replace?.('_', ' ') || 'UNKNOWN'}
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
              Market Regime
            </div>
          </div>
        </div>
        <ConfidenceGauge value={Number(regime.confidence || 0)} color={config.color} />
      </div>

      {/* Scientific Indicators (Phase 2 & 3) */}
      <div className="space-y-3 p-4 bg-void/40 rounded-xl border border-white/[0.04] relative overflow-hidden">
        {isBreaking && (
          <div className="absolute top-0 right-0 p-1">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }} 
              transition={{ repeat: Infinity, duration: 1 }}
              className="flex items-center gap-1 bg-red-500/20 px-1.5 py-0.5 rounded border border-red-500/30"
            >
              <ShieldAlert className="w-2 h-2 text-red-400" />
              <span className="text-[7px] font-bold text-red-400 uppercase">Structural Break</span>
            </motion.div>
          </div>
        )}

        <div className="space-y-3">
          {/* HMM Persistence (State Stability) */}
          <TimeframeBar 
            label="Persistence" 
            value={(regime as any).hmm_confidence || 0} 
            colorClass="bg-blue-400" 
          />
          
          {/* BOCPD Break Probability (Inversed for Bar display - higher bar = safer) */}
          <TimeframeBar 
            label="Integrity" 
            value={1 - ((regime as any).change_point_prob || 0)} 
            colorClass={isBreaking ? "bg-red-400" : "bg-emerald-400"} 
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2 pt-2 border-t border-white/[0.03]">
          <div>
            <div className="text-[8px] text-slate-600 uppercase font-bold mb-1">State Stability</div>
            <div className="text-[10px] text-slate-400 italic leading-tight">
              HMM confirms state persistence with {Math.round(((regime as any).hmm_confidence || 0) * 100)}% probability.
            </div>
          </div>
          <div className="text-right">
            <div className="text-[8px] text-slate-600 uppercase font-bold mb-1">Break Alarm</div>
            <div className={`text-[10px] font-bold ${isBreaking ? 'text-red-400' : 'text-slate-500'}`}>
              {Math.round(((regime as any).change_point_prob || 0) * 100)}% BREAK CHANCE
            </div>
          </div>
        </div>
      </div>

      {/* Basic Metrics Grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white/[0.02] rounded-lg p-2 text-center border border-white/[0.03]">
          <div className="text-[8px] text-slate-500 uppercase tracking-wider">Volatility</div>
          <div className="text-xs font-mono text-slate-300 mt-0.5">{(regime as any).volatility?.toFixed(2) || '0.00'}</div>
        </div>
        <div className="bg-white/[0.02] rounded-lg p-2 text-center border border-white/[0.03]">
          <div className="text-[8px] text-slate-500 uppercase tracking-wider">Trend Str</div>
          <div className="text-xs font-mono text-slate-300 mt-0.5">{(regime as any).trendStrength?.toFixed(2) || '0.00'}</div>
        </div>
        <div className="bg-white/[0.02] rounded-lg p-2 text-center border border-white/[0.03]">
          <div className="text-[8px] text-slate-500 uppercase tracking-wider">M1 Pulse</div>
          <div className="text-xs font-mono text-emerald-400 mt-0.5">ACTIVE</div>
        </div>
      </div>
    </motion.div>
  );
}
