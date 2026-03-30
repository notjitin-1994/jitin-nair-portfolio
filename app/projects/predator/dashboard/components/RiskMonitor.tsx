'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { TrendingDown, Target, Shield, Activity, Wallet, AlertTriangle } from 'lucide-react';

// ============================================================================
// Risk Monitor - Compact Institutional Risk Dashboard
// ============================================================================

const MetricCard = memo(function MetricCard({
  icon: Icon,
  label,
  value,
  subvalue,
  color = 'cyan',
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subvalue?: string;
  color?: 'cyan' | 'emerald' | 'amber' | 'red' | 'violet';
}) {
  const colorClasses = {
    cyan: 'bg-cyan-500/10 text-cyan-400',
    emerald: 'bg-emerald-500/10 text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-400',
    red: 'bg-red-500/10 text-red-400',
    violet: 'bg-violet-500/10 text-violet-400',
  };

  return (
    <div className="bg-void/50 rounded-lg p-2.5 border border-white/[0.04]">
      <div className="flex items-start justify-between">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-3 h-3" />
        </div>
        {subvalue && (
          <span className={`text-[8px] font-mono ${subvalue.startsWith('+') ? 'text-emerald-400' : subvalue.startsWith('-') ? 'text-red-400' : 'text-slate-500'}`}>
            {subvalue}
          </span>
        )}
      </div>
      <div className="mt-1.5">
        <div className="text-sm font-bold font-mono text-white">{value}</div>
        <div className="text-[8px] text-slate-500 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
});

const RiskGauge = memo(function RiskGauge({
  value,
  max,
  label,
  warningThreshold = 0.7,
  dangerThreshold = 0.9,
}: {
  value: number;
  max: number;
  label: string;
  warningThreshold?: number;
  dangerThreshold?: number;
}) {
  const percentage = Math.min((value / max) * 100, 100);

  const getColor = () => {
    if (percentage >= dangerThreshold * 100) return 'bg-red-400';
    if (percentage >= warningThreshold * 100) return 'bg-amber-400';
    return 'bg-emerald-400';
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[9px]">
        <span className="text-slate-500">{label}</span>
        <span className="font-mono text-slate-400">{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

const WinRateChart = memo(function WinRateChart({ winRate, totalTrades }: { winRate: number; totalTrades: number }) {
  const circumference = 2 * Math.PI * 24;
  const strokeDashoffset = circumference - (winRate / 100) * circumference;

  return (
    <div className="relative w-16 h-16 mx-auto">
      <svg className="transform -rotate-90 w-16 h-16">
        <circle
          cx="32"
          cy="32"
          r="24"
          stroke="currentColor"
          strokeWidth="5"
          fill="transparent"
          className="text-white/[0.04]"
        />
        <circle
          cx="32"
          cy="32"
          r="24"
          stroke={winRate >= 50 ? '#10b981' : '#ef4444'}
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold font-mono text-white">{winRate.toFixed(0)}%</span>
        <span className="text-[8px] text-slate-500">{totalTrades} trades</span>
      </div>
    </div>
  );
});

const RiskMonitor = memo(function RiskMonitor() {
  const { execution, connectionStatus, positions } = useDashboard();

  const isLoading = connectionStatus === 'connecting';
  const hasError = connectionStatus === 'error';

  const getRiskStatusColor = () => {
    if (!execution) return 'text-slate-500';
    if (execution.riskStatus === 'BLOCKED') return 'text-red-400';
    if (execution.riskStatus === 'CAUTION') return 'text-amber-400';
    return 'text-emerald-400';
  };

  const getRiskStatusBg = () => {
    if (!execution) return 'bg-slate-500/10';
    if (execution.riskStatus === 'BLOCKED') return 'bg-red-500/10';
    if (execution.riskStatus === 'CAUTION') return 'bg-amber-500/10';
    return 'bg-emerald-500/10';
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Shield className="w-3 h-3 text-violet-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Risk Monitor
              </h3>
              <p className={`text-[9px] ${getRiskStatusColor()}`}>
                {execution?.riskStatus || 'UNKNOWN'}
              </p>
            </div>
          </div>
          {execution?.mode && (
            <div className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${
              execution.mode === 'live' ? 'bg-red-500/10 text-red-400' : 'bg-cyan-500/10 text-cyan-400'
            }`}>
              {execution.mode.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-white/[0.04] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : hasError ? (
          <div className="py-6 text-center">
            <AlertTriangle className="w-6 h-6 text-red-400/50 mx-auto mb-2" />
            <p className="text-[10px] text-slate-500">Risk data unavailable</p>
          </div>
        ) : execution ? (
          <div className="space-y-3">
            {/* Compact Metrics Grid */}
            <div className="grid grid-cols-2 gap-2">
              <MetricCard
                icon={Wallet}
                label="Balance"
                value={`$${(execution.balance ?? 0).toLocaleString()}`}
                subvalue={`Peak: $${(execution.peakBalance ?? execution.balance ?? 0).toLocaleString()}`}
                color="cyan"
              />
              <MetricCard
                icon={Activity}
                label="Daily P&L"
                value={`${(execution.dailyPnl ?? 0) >= 0 ? '+' : ''}$${(execution.dailyPnl ?? 0).toFixed(2)}`}
                subvalue={`${(execution.dailyPnlPercent ?? 0) >= 0 ? '+' : ''}${(execution.dailyPnlPercent ?? 0).toFixed(2)}%`}
                color={(execution.dailyPnl ?? 0) >= 0 ? 'emerald' : 'red'}
              />
              <MetricCard
                icon={TrendingDown}
                label="Drawdown"
                value={`${(execution.drawdown ?? 0).toFixed(2)}%`}
                subvalue={`Max: ${(execution.maxDrawdown ?? 0).toFixed(2)}%`}
                color={(execution.drawdown ?? 0) > 5 ? 'amber' : 'emerald'}
              />
              <MetricCard
                icon={Target}
                label="Positions"
                value={(execution.openPositions ?? 0).toString()}
                subvalue={`Limit: ${(positions?.length ?? 0) + 3}`}
                color="violet"
              />
            </div>

            {/* Compact Win Rate + Gauges */}
            <div className="pt-3 border-t border-white/[0.04]">
              <div className="flex items-center gap-3">
                <WinRateChart winRate={execution.winRate ?? 0} totalTrades={execution.totalTrades ?? 0} />
                <div className="flex-1 space-y-2">
                  <RiskGauge
                    value={execution.dailyLossUsed ?? 0}
                    max={execution.dailyLossLimit ?? 1000}
                    label="Daily Loss"
                    warningThreshold={0.6}
                    dangerThreshold={0.85}
                  />
                  <RiskGauge
                    value={execution.drawdown ?? 0}
                    max={Math.max((execution.maxDrawdown ?? 0) * 1.5, 10)}
                    label="Drawdown"
                    warningThreshold={0.5}
                    dangerThreshold={0.8}
                  />
                </div>
              </div>
            </div>

            {/* Compact Risk Status Alert */}
            {execution.riskStatus !== 'CLEAR' && (
              <div className={`p-2 rounded-lg ${getRiskStatusBg()}`}>
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`w-3.5 h-3.5 ${getRiskStatusColor()} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`text-[10px] font-medium ${getRiskStatusColor()}`}>
                      Risk {execution.riskStatus === 'BLOCKED' ? 'Blocked' : 'Caution'}
                    </p>
                    <p className="text-[8px] text-slate-400 mt-0.5">
                      {execution.riskStatus === 'BLOCKED'
                        ? 'Trading halted'
                        : 'Approaching thresholds'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Compact Cooldown */}
            {execution.cooldown && (
              <div className="flex items-center justify-between p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] text-amber-400">Cooldown</span>
                </div>
                <span className="text-[9px] font-mono text-amber-400/80">{execution.cooldown}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center text-slate-500">
            <p className="text-[10px]">No execution data</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default RiskMonitor;
