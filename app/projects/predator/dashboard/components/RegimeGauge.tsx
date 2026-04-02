'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { LineChart, Activity, Timer, Gauge } from 'lucide-react';

// ============================================================================
// Regime Gauge - Compact Visual Regime Display
// ============================================================================

const TimeframeBar = memo(function TimeframeBar({
  label,
  regime,
  confidence,
}: {
  label: string;
  regime: string;
  confidence: number;
}) {
  const getRegimeColor = () => {
    if (regime?.includes('TREND_UP') || regime?.includes('BREAKOUT')) return '#10b981';
    if (regime?.includes('TREND_DOWN') || regime?.includes('CRASH')) return '#ef4444';
    if (regime?.includes('RANGE')) return '#f59e0b';
    return '#6b7280';
  };

  const width = Math.min(Math.max(confidence * 100, 0), 100);

  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-[9px]">
        <span className="text-slate-500 font-mono">{label}</span>
        <span className="text-slate-400 truncate max-w-[80px]">{regime?.replace?.(/_/g, ' ') || 'UNKNOWN'}</span>
      </div>
      <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ backgroundColor: getRegimeColor(), width: `${width}%` }}
        />
      </div>
    </div>
  );
});

const VolatilityGauge = memo(function VolatilityGauge({ value }: { value?: number }) {
  const normalizedValue = Math.min(Math.max(value ?? 0.5, 0), 1);

  const getColor = () => {
    if (normalizedValue < 0.3) return '#10b981';
    if (normalizedValue < 0.7) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ backgroundColor: getColor(), width: `${normalizedValue * 100}%` }}
        />
      </div>
      <span className="text-[10px] font-mono" style={{ color: getColor() }}>
        {(normalizedValue * 100).toFixed(0)}%
      </span>
    </div>
  );
});

const RegimeGauge = memo(function RegimeGauge() {
  const { regime, connectionStatus } = useDashboard();

  const isLoading = connectionStatus === 'connecting';
  const hasError = connectionStatus === 'error';

  const getRegimeIcon = () => {
    if (!regime) return <Activity className="w-3 h-3 text-slate-500" />;
    if (regime.regime?.includes('TREND_UP')) return <LineChart className="w-3 h-3 text-emerald-400" />;
    if (regime.regime?.includes('TREND_DOWN')) return <LineChart className="w-3 h-3 text-red-400 transform rotate-180" />;
    if (regime.regime?.includes('RANGE')) return <Gauge className="w-3 h-3 text-amber-400" />;
    return <Activity className="w-3 h-3 text-slate-500" />;
  };

  const getRegimeColor = () => {
    if (!regime) return 'text-slate-500';
    if (regime.regime?.includes('TREND_UP')) return 'text-emerald-400';
    if (regime.regime?.includes('TREND_DOWN')) return 'text-red-400';
    if (regime.regime?.includes('RANGE')) return 'text-amber-400';
    return 'text-slate-500';
  };

  const trendStrength = regime?.trendStrength ?? regime?.features?.trendStrength ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden"
    >
      {/* Compact Header */}
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              {getRegimeIcon()}
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Regime
              </h3>
              {regime && (
                <p className={`text-[9px] ${getRegimeColor()}`}>
                  {regime?.regime?.replace?.(/_/g, ' ') || 'UNKNOWN'}
                </p>
              )}
            </div>
          </div>
          {regime && (
            <div className="flex items-center gap-1">
              <Timer className="w-2.5 h-2.5 text-slate-600" />
              <span className="text-[8px] text-slate-600">
                {new Date(regime.timestamp).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="flex justify-between items-center">
              <div className="w-16 h-6 bg-white/[0.04] rounded" />
              <div className="w-12 h-6 bg-white/[0.04] rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-white/[0.04] rounded" />
              <div className="h-2 bg-white/[0.04] rounded" />
              <div className="h-2 bg-white/[0.04] rounded" />
            </div>
          </div>
        ) : hasError ? (
          <div className="py-6 text-center text-slate-500">
            <p className="text-[10px]">Regime data unavailable</p>
          </div>
        ) : regime ? (
          <div className="space-y-3">
            {/* Compact Confidence + Volatility Row */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[8px] text-slate-500 uppercase tracking-wider mb-0.5">
                  Confidence
                </div>
                <div className={`text-xl font-bold font-mono ${getRegimeColor()}`}>
                  {(regime.confidence * 100).toFixed(1)}%
                </div>
              </div>
              <div className="text-right w-20">
                <div className="text-[8px] text-slate-500 uppercase tracking-wider mb-1">
                  Volatility
                </div>
                <VolatilityGauge value={regime.volatility} />
              </div>
            </div>

            {/* Multi-Timeframe Bars */}
            <div className="space-y-2 pt-2 border-t border-white/[0.04]">
              <div className="text-[8px] text-slate-600 uppercase tracking-wider">
                Timeframes
              </div>
              <TimeframeBar
                label="M5"
                regime={regime.features?.m5?.regime || 'UNCERTAIN'}
                confidence={regime.features?.m5?.confidence ?? 0}
              />
              <TimeframeBar
                label="M15"
                regime={regime.features?.m15?.regime || 'UNCERTAIN'}
                confidence={regime.features?.m15?.confidence ?? 0}
              />
              <TimeframeBar
                label="H1"
                regime={regime.features?.h1?.regime || 'UNCERTAIN'}
                confidence={regime.features?.h1?.confidence ?? 0}
              />
            </div>

            {/* Compact Trend Strength */}
            <div className="pt-2 border-t border-white/[0.04]">
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-slate-500">Trend Strength</span>
                <span className={`font-mono ${trendStrength > 0.6 ? 'text-emerald-400' : trendStrength > 0.3 ? 'text-amber-400' : 'text-slate-400'}`}>
                  {(trendStrength * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1 bg-white/[0.04] rounded-full mt-1 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${trendStrength > 0.6 ? 'bg-emerald-400' : trendStrength > 0.3 ? 'bg-amber-400' : 'bg-slate-400'}`}
                  style={{ width: `${trendStrength * 100}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-slate-500">
            <p className="text-[10px]">No regime data</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default RegimeGauge;
