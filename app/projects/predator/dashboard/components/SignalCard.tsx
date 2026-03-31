'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { Activity, Zap, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

// ============================================================================
// Signal Card - Compact Institutional Signal Display
// ============================================================================

const ConfidenceRing = memo(function ConfidenceRing({ confidence, signal }: { confidence: number; signal: string }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  const getColor = () => {
    if (signal === 'LONG' || signal === 'EXIT_SHORT') return '#10b981';
    if (signal === 'SHORT' || signal === 'EXIT_LONG') return '#ef4444';
    return '#6b7280';
  };

  return (
    <div className="relative w-16 h-16">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-white/[0.04]"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke={getColor()}
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold font-mono" style={{ color: getColor() }}>
          {Math.round(confidence)}
        </span>
      </div>
    </div>
  );
});

const MacroIndicator = memo(function MacroIndicator({
  label,
  value,
  alignment
}: {
  label: string;
  value?: number;
  alignment: boolean;
}) {
  const safeValue = value ?? 0;
  return (
    <div className="flex items-center justify-between py-1 border-b border-white/[0.04] last:border-0">
      <span className="text-[9px] text-slate-500 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className={`text-[10px] font-mono ${safeValue >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {safeValue >= 0 ? '+' : ''}{safeValue.toFixed(2)}%
        </span>
        <div className={`w-1 h-1 rounded-full ${alignment ? 'bg-emerald-400' : 'bg-red-400'}`} />
      </div>
    </div>
  );
});

const SignalCard = memo(function SignalCard() {
  const { signal, macro, connectionStatus } = useDashboard();

  const isLoading = connectionStatus === 'connecting';
  const hasError = connectionStatus === 'error';

  const dxyChange = signal?.data_used?.dxy_change ?? 0;
  const eurChange = macro?.EURUSD?.change24h ?? 0;
  const jpyChange = macro?.USDJPY?.change24h ?? 0;

  // Alignment: DXY up is bearish for Gold (red), DXY down is bullish (emerald)
  const dxyAlignment = dxyChange <= 0;
  const eurAlignment = eurChange >= 0; // Strong EUR usually means weak DXY
  const jpyAlignment = jpyChange <= 0; // Strong JPY usually means weak DXY

  const getSignalIcon = () => {
    if (!signal) return <Minus className="w-5 h-5 text-slate-500" />;
    if (signal.signal === 'LONG') return <TrendingUp className="w-5 h-5 text-emerald-400" />;
    if (signal.signal === 'SHORT') return <TrendingDown className="w-5 h-5 text-red-400" />;
    return <Minus className="w-5 h-5 text-slate-500" />;
  };

  const getSignalColor = () => {
    if (!signal) return 'text-slate-500';
    if (signal.signal === 'LONG') return 'text-emerald-400';
    if (signal.signal === 'SHORT') return 'text-red-400';
    return 'text-slate-500';
  };

  const getSignalBg = () => {
    if (!signal) return 'bg-slate-500/10';
    if (signal.signal === 'LONG') return 'bg-emerald-400/10';
    if (signal.signal === 'SHORT') return 'bg-red-400/10';
    return 'bg-slate-500/10';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden"
    >
      {/* Compact Header */}
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Zap className="w-3 h-3 text-violet-400" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Sentinel
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`text-[9px] ${getSignalColor()}`}>
                {signal?.signal || 'NO SIGNAL'}
              </span>
              {signal && (
                <span className="text-[8px] text-slate-600">
                  {new Date(signal.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="flex items-center justify-center py-4">
              <div className="w-16 h-16 rounded-full bg-white/[0.04]" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-white/[0.04] rounded" />
              <div className="h-3 bg-white/[0.04] rounded" />
            </div>
          </div>
        ) : hasError ? (
          <div className="py-6 text-center">
            <AlertCircle className="w-6 h-6 text-red-400/50 mx-auto mb-2" />
            <p className="text-[10px] text-slate-500">Signal unavailable</p>
          </div>
        ) : signal ? (
          <div className="space-y-3">
            {/* Compact Signal Display */}
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${getSignalBg()}`}
                >
                  {getSignalIcon()}
                  <span className={`text-base font-bold ${getSignalColor()}`}>
                    {signal.signal}
                  </span>
                </div>
                <p className="text-[9px] text-slate-500 mt-1.5">
                  Regime: <span className="text-slate-300">{signal.regime}</span>
                </p>
              </div>
              <ConfidenceRing confidence={signal.confidence} signal={signal.signal} />
            </div>

            {/* Compact Macro Alignment */}
            <div className="space-y-0.5 pt-2 border-t border-white/[0.04]">
              <div className="flex items-center gap-1.5 mb-1">
                <Activity className="w-2.5 h-2.5 text-slate-500" />
                <span className="text-[8px] text-slate-500 uppercase tracking-wider">
                  Macro
                </span>
                <div className={`ml-auto w-1 h-1 rounded-full ${signal.data_used?.macro_alignment ? 'bg-emerald-400' : 'bg-red-400'}`} />
              </div>
              <div className="bg-void/50 rounded-lg px-2.5">
                <MacroIndicator label="DXY" value={dxyChange} alignment={dxyAlignment} />
                <MacroIndicator label="EUR" value={eurChange} alignment={eurAlignment} />
                <MacroIndicator label="JPY" value={jpyChange} alignment={jpyAlignment} />
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-slate-500">
            <p className="text-[10px]">Waiting for signal...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default SignalCard;
