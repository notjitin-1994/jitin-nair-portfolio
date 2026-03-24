'use client';

import { motion } from 'framer-motion';
import { Activity, Brain, BarChart3, TrendingUp } from 'lucide-react';
import { RegimeData } from '../types/dashboard';

interface RegimeDisplayProps {
  regime: RegimeData | null;
  isLoading: boolean;
}

const regimeConfig: Record<string, { color: string; bgColor: string; icon: typeof Activity }> = {
  TREND_UP: { color: 'text-green-400', bgColor: 'bg-green-400/10', icon: TrendingUp },
  TREND_DOWN: { color: 'text-red-400', bgColor: 'bg-red-400/10', icon: TrendingUp },
  TREND: {
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    icon: TrendingUp,
  },
  RANGE: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    icon: Activity,
  },
  VOLATILE: {
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    icon: BarChart3,
  },
  UNKNOWN: {
    color: 'text-slate-400',
    bgColor: 'bg-slate-400/10',
    icon: Brain,
  },
};

export default function RegimeDisplay({ regime, isLoading }: RegimeDisplayProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-8 bg-white/5 rounded w-24" />
        <div className="h-2 bg-white/5 rounded w-full" />
      </div>
    );
  }

  if (!regime) {
    return (
      <div className="text-slate-500 text-sm">
        No regime data
      </div>
    );
  }

  const config = regimeConfig[regime.regime] || regimeConfig.UNKNOWN;
  const Icon = config.icon;
  const confidencePercent = Math.round(regime.confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${config.bgColor}`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div>
          <div className={`text-2xl font-bold ${config.color}`}>
            {regime.regime}
          </div>
          <div className="text-xs text-slate-500">
            Market Regime
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Confidence</span>
          <span className="text-white font-mono">{confidencePercent}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidencePercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`h-full rounded-full ${
              confidencePercent >= 70 ? 'bg-green-400' :
              confidencePercent >= 40 ? 'bg-yellow-400' : 'bg-red-400'
            }`}
          />
        </div>
      </div>

      {regime.features && (
        <div className="pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
          {regime.features.volatility !== undefined && (
            <div>
              <div className="text-xs text-slate-500">Volatility</div>
              <div className="text-sm text-slate-300 font-mono">
                {regime.features.volatility.toFixed(3)}
              </div>
            </div>
          )}
          {regime.features.trend !== undefined && (
            <div>
              <div className="text-xs text-slate-500">Trend</div>
              <div className="text-sm text-slate-300 font-mono">
                {regime.features.trend.toFixed(3)}
              </div>
            </div>
          )}
          {regime.features.volume !== undefined && (
            <div>
              <div className="text-xs text-slate-500">Volume</div>
              <div className="text-sm text-slate-300 font-mono">
                {regime.features.volume.toFixed(0)}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
