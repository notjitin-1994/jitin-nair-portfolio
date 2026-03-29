'use client';

import { motion } from 'framer-motion';
import { Zap, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import useSWR from 'swr';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.glitchzerolabs.com';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

const fetcher = async (url: string) => {
  const headers: Record<string, string> = {};
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;
  const res = await fetch(`${API_URL}${url}`, { headers });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

interface ExecutionStatus {
  mode?: 'paper' | 'live';
  openPositions?: number;
  dailyPnl?: number;
  winRate?: number;
  dailyLossUsed?: number;
  dailyLossLimit?: number;
  riskStatus?: 'CLEAR' | 'CAUTION' | 'BLOCKED';
  drawdown?: number;
  maxDrawdown?: number;
  cooldown?: string;
}

function StatBox({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div className="bg-void/40 rounded-lg p-3 border border-white/[0.04] text-center flex-1">
      <div className={`text-lg font-bold font-mono ${color || 'text-white'}`}>{value}</div>
      <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}

function RiskBadge({ status }: { status: string }) {
  const config: Record<string, { color: string; bg: string; icon: any }> = {
    CLEAR: { color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20', icon: CheckCircle },
    CAUTION: { color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20', icon: AlertTriangle },
    BLOCKED: { color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', icon: XCircle },
  };
  const c = config[status] || config.CLEAR;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${c.bg} ${c.color}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

export default function ExecutionPanel() {
  const { data, isLoading, error } = useSWR<ExecutionStatus>('/api/execution/status', fetcher, {
    refreshInterval: 5000,
    errorRetryCount: 3,
  });

  if (isLoading) {
    return (
      <div className="bg-midnight border border-white/[0.06] rounded-lg p-5 animate-pulse h-[280px]" />
    );
  }

  if (error || !data) {
    return (
      <div className="bg-midnight border border-white/[0.06] rounded-lg p-5 h-[280px] flex flex-col items-center justify-center text-slate-600">
        <Zap className="w-8 h-8 mb-2 opacity-20" />
        <span className="text-sm">Execution engine offline</span>
        <span className="text-[10px] text-slate-700 mt-1">No status data available</span>
      </div>
    );
  }

  const mode = data.mode || 'paper';
  const pnl = data.dailyPnl || 0;
  const pnlColor = pnl >= 0 ? 'text-emerald-400' : 'text-red-400';
  const pnlSign = pnl >= 0 ? '+' : '';

  const lossUsed = data.dailyLossUsed || 0;
  const lossLimit = data.dailyLossLimit || 200;
  const lossPct = lossLimit > 0 ? Math.min((lossUsed / lossLimit) * 100, 100) : 0;
  const lossBarColor = lossPct > 80 ? 'bg-red-400' : lossPct > 50 ? 'bg-amber-400' : 'bg-emerald-400';

  const drawdown = data.drawdown || 0;
  const maxDrawdown = data.maxDrawdown || 5;
  const ddPct = maxDrawdown > 0 ? Math.min((drawdown / maxDrawdown) * 100, 100) : 0;
  const ddBarColor = ddPct > 80 ? 'bg-red-400' : ddPct > 50 ? 'bg-amber-400' : 'bg-emerald-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-midnight border border-white/[0.06] rounded-lg p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
            Execution Engine
          </span>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
          mode === 'live' ? 'bg-red-400/10 text-red-400' : 'bg-emerald-400/10 text-emerald-400'
        }`}>
          {mode.toUpperCase()} {mode === 'live' ? '🔴' : '🟢'}
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex gap-2 mb-4">
        <StatBox value={String(data.openPositions ?? 0)} label="Open" />
        <StatBox value={`${pnlSign}$${Math.abs(Number(pnl) || 0).toFixed(0)}`} label="P&L" color={pnlColor} />
        <StatBox value={`${(Number(data.winRate) || 0).toFixed(0)}%`} label="Win %" />
      </div>

      {/* Daily Loss Usage */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Daily Loss</span>
          <span className="text-[10px] font-mono text-slate-400">
            ${(Number(lossUsed) || 0).toFixed(0)} / ${(Number(lossLimit) || 0).toFixed(0)} ({lossPct.toFixed(0)}%)
          </span>
        </div>
        <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${lossPct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`h-full rounded-full ${lossBarColor}`}
          />
        </div>
      </div>

      {/* Risk Status + Drawdown */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Risk</span>
          <RiskBadge status={data.riskStatus || 'CLEAR'} />
        </div>
        <span className="text-[10px] text-slate-500">
          Cooldown: <span className="text-slate-300 font-mono">{data.cooldown || 'None'}</span>
        </span>
      </div>

      {/* Drawdown */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Drawdown</span>
          <span className="text-[10px] font-mono text-slate-400">
            {(Number(drawdown) || 0).toFixed(1)}% / {(Number(maxDrawdown) || 0).toFixed(1)}%
          </span>
        </div>
        <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${ddPct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`h-full rounded-full ${ddBarColor}`}
          />
        </div>
      </div>
    </motion.div>
  );
}
