'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

function PositionCard({ position, index }: { position: any; index: number }) {
  const isLong = position.direction === 'LONG';
  const isProfit = position.pnl >= 0;

  // Progress to TP
  const totalMove = Math.abs(position.tp - position.entryPrice);
  const currentMove = isLong
    ? position.currentPrice - position.entryPrice
    : position.entryPrice - position.currentPrice;
  const progress = totalMove > 0 ? Math.min(Math.max((currentMove / totalMove) * 100, 0), 100) : 0;

  const accentColor = isProfit ? '#10b981' : '#ef4444';
  const dirColor = isLong ? 'text-emerald-400' : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-void/40 rounded-lg p-3 border border-white/[0.04]"
    >
      {/* Direction + Strategy */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isLong ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
          )}
          <span className={`text-xs font-bold font-mono ${dirColor}`}>
            {position.direction}
          </span>
          {position.strategy && (
            <span className="text-[9px] text-slate-500 font-mono">
              {position.strategy?.replace?.(/_/g, ' ') || 'NONE'}
            </span>
          )}
        </div>
        <span className={`text-xs font-bold font-mono ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
          {isProfit ? '+' : ''}${Number(position.pnl || 0).toFixed(2)}
        </span>
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono mb-2">
        <div className="flex justify-between">
          <span className="text-slate-500">Entry</span>
          <span className="text-slate-300">{Number(position.entryPrice || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Current</span>
          <span className={`font-semibold ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
            {isProfit ? '↑' : '↓'}{Number(position.currentPrice || 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-red-400/60">SL</span>
          <span className="text-red-400/80">{Number(position.sl || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-emerald-400/60">TP</span>
          <span className="text-emerald-400/80">{Number(position.tp || 0).toFixed(2)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>
        <span className="text-[9px] font-mono text-slate-500">{Number(progress || 0).toFixed(0)}%</span>
      </div>
    </motion.div>
  );
}

export default function OpenPositions() {
  const { positions, connectionStatus } = useDashboard();
  const isLoading = connectionStatus === 'connecting' && positions.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-midnight border border-white/[0.06] rounded-xl p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
            Open Positions
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {positions.length}
        </span>
      </div>

      {/* Positions */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-24 bg-white/[0.02] rounded-lg" />
            ))}
          </div>
        ) : positions.length === 0 ? (
          <div className="text-center py-8 text-slate-600">
            <span className="text-xs">No open positions</span>
          </div>
        ) : (
          positions.map((pos, i) => (
            <PositionCard key={pos.id || i} position={pos} index={i} />
          ))
        )}
      </div>
    </motion.div>
  );
}
