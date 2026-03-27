'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, Brain, BarChart3 } from 'lucide-react';
import { RegimeData } from '../types/dashboard';

interface RegimeDisplayProps {
  regime: RegimeData | null;
  isLoading: boolean;
}

const regimeConfig: Record<string, { color: string; bgColor: string; icon: typeof Activity; arrow: 'up' | 'down' | 'flat' }> = {
  TREND_UP: { color: 'text-emerald-400', bgColor: 'bg-emerald-400', icon: TrendingUp, arrow: 'up' },
  TREND_DOWN: { color: 'text-red-400', bgColor: 'bg-red-400', icon: TrendingDown, arrow: 'down' },
  TREND: { color: 'text-emerald-400', bgColor: 'bg-emerald-400', icon: TrendingUp, arrow: 'up' },
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
      {/* Background arc */}
      <path
        d="M 10 50 A 40 40 0 0 1 90 50"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      {/* Value arc */}
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
      {/* Center text */}
      <text x="50" y="42" textAnchor="middle" className="fill-white text-lg font-bold" fontSize="16" fontWeight="700">
        {Math.round(value * 100)}
      </text>
      <text x="50" y="52" textAnchor="middle" className="fill-slate-500" fontSize="7">
        CONFIDENCE
      </text>
    </svg>
  );
}

function TimeframeBar({ label, regime, confidence }: { label: string; regime?: string; confidence?: number }) {
  const cfg = regime ? regimeConfig[regime] : null;
  const pct = confidence ? Math.round(confidence * 100) : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-slate-500 font-mono w-6">{label}</span>
      <div className="flex-1 h-2.5 bg-white/[0.04] rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${cfg ? cfg.bgColor.replace('bg-', 'bg-') + '/60' : 'bg-slate-600'}`}
          style={{ opacity: 0.7 }}
        />
        {regime && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white/70 tracking-wider">
              {regime.replace('TREND_', '').replace('_', ' ')}
            </span>
          </div>
        )}
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Regime badge + gauge row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${config.bgColor}/10 border border-white/[0.05]`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className={`text-xl font-bold tracking-tight ${config.color}`}>
                {regime.regime.replace('_', ' ')}
              </div>
              {regime.regime === 'RANGE' && (regime.features as any)?.activeStrategy && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  {(regime.features as any).activeStrategy.replace(/_/g, ' ')}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
              Market Regime
            </div>
          </div>
        </div>
        <ConfidenceGauge value={regime.confidence} color={config.color} />
      </div>

      {/* Multi-timeframe consensus */}
      <div className="space-y-2.5">
        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
          Multi-Timeframe Consensus
        </div>
        <div className="space-y-2 bg-void/40 rounded-xl p-3 border border-white/[0.04]">
          <TimeframeBar label="M5" regime={regime.regime} confidence={regime.confidence} />
          <TimeframeBar label="M15" regime={regime.regime} confidence={regime.confidence * 0.8} />
          <TimeframeBar label="H1" regime={regime.regime} confidence={regime.confidence * 0.85} />
        </div>
      </div>

      {/* Features */}
      {regime.features && (
        <div className="grid grid-cols-3 gap-2">
          {regime.features.volatility !== undefined && (
            <div className="bg-void/30 rounded-lg p-2 text-center border border-white/[0.03]">
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">Vol</div>
              <div className="text-sm font-mono text-slate-300 mt-0.5">{regime.features.volatility.toFixed(2)}</div>
            </div>
          )}
          {regime.features.trend !== undefined && (
            <div className="bg-void/30 rounded-lg p-2 text-center border border-white/[0.03]">
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">Trend</div>
              <div className="text-sm font-mono text-slate-300 mt-0.5">{regime.features.trend.toFixed(2)}</div>
            </div>
          )}
          {regime.features.volume !== undefined && (
            <div className="bg-void/30 rounded-lg p-2 text-center border border-white/[0.03]">
              <div className="text-[9px] text-slate-500 uppercase tracking-wider">Volm</div>
              <div className="text-sm font-mono text-slate-300 mt-0.5">{regime.features.volume.toFixed(0)}</div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
