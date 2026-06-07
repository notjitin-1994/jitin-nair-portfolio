'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { TrendingUp, TrendingDown, Crosshair, Target } from 'lucide-react';

// ============================================================================
// Position Flow - Compact Live Position Cards
// ============================================================================

interface Position {
  id: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  size?: number;
  pnl: number;
  pnlPercent?: number;
  sl: number;
  tp: number;
  progress?: number;
  strategy?: string;
}

const PositionCard = memo(function PositionCard({ position }: { position: Position }) {
  const isLong = position.direction === 'LONG';
  const isProfit = position.pnl >= 0;

  // Calculate progress to TP (0-100%)
  const totalDistance = Math.abs(position.tp - position.entryPrice);
  const currentDistance = Math.abs(position.currentPrice - position.entryPrice);
  const progressPercent = totalDistance > 0
    ? Math.min((currentDistance / totalDistance) * 100, 100)
    : 0;

  // Risk/Reward ratio
  const risk = Math.abs(position.entryPrice - position.sl);
  const reward = Math.abs(position.tp - position.entryPrice);
  const rrRatio = risk > 0 ? (reward / risk).toFixed(1) : '0';

  return (
    <div
      className={`relative rounded-lg border overflow-hidden ${
        isProfit
          ? 'bg-emerald-500/[0.03] border-emerald-500/20'
          : 'bg-red-500/[0.03] border-red-500/20'
      }`}
    >
      <div className="p-3">
        {/* Compact Header: Direction + P&L */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
              isLong ? 'bg-emerald-500/10' : 'bg-red-500/10'
            }`}>
              {isLong ? (
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
            </div>
            <div>
              <span className={`text-xs font-bold ${isLong ? 'text-emerald-400' : 'text-red-400'}`}>
                {position.direction}
              </span>
              <span className="text-[8px] text-slate-500 ml-1.5">
                1:{rrRatio}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold font-mono ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
              {isProfit ? '+' : ''}${position.pnl.toFixed(2)}
            </div>
            <div className={`text-[9px] font-mono ${isProfit ? 'text-emerald-400/60' : 'text-red-400/60'}`}>
              {isProfit ? '+' : ''}{position.pnlPercent?.toFixed(2) || '0.00'}%
            </div>
          </div>
        </div>

        {/* Compact Price Grid */}
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          <div className="bg-void/50 rounded px-2 py-1">
            <div className="text-[8px] text-slate-500">Entry</div>
            <div className="text-[10px] font-mono text-slate-300">
              {position.entryPrice.toFixed(2)}
            </div>
          </div>
          <div className={`rounded px-2 py-1 ${isProfit ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
            <div className="text-[8px] text-slate-500">Current</div>
            <div className={`text-[10px] font-mono ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
              {position.currentPrice.toFixed(2)}
            </div>
          </div>
          <div className="bg-void/50 rounded px-2 py-1">
            <div className="text-[8px] text-slate-500">TP</div>
            <div className="text-[10px] font-mono text-emerald-400/80">
              {position.tp.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Compact Progress Bar */}
        <div className="relative h-4 bg-void/50 rounded-full overflow-hidden">
          <div
            className="absolute top-0 bottom-0 w-px bg-red-400/40"
            style={{ left: '5%' }}
          />
          <div
            className="absolute top-0 bottom-0 w-px bg-emerald-400/40"
            style={{ right: '5%' }}
          />
          <div
            className={`absolute top-0.5 bottom-0.5 w-1.5 rounded-full ${isProfit ? 'bg-emerald-400' : 'bg-red-400'}`}
            style={{ left: `${5 + (progressPercent * 0.9)}%` }}
          />
          <div
            className={`absolute top-0 bottom-0 left-0 opacity-20 ${isProfit ? 'bg-emerald-400' : 'bg-red-400'}`}
            style={{ width: `${5 + (progressPercent * 0.9)}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] font-mono text-slate-500">{progressPercent.toFixed(0)}% to TP</span>
          </div>
        </div>
      </div>
    </div>
  );
});

const PositionFlow = memo(function PositionFlow() {
  const { positions, connectionStatus } = useDashboard();

  const isLoading = connectionStatus === 'connecting';
  const openPositions = positions || [];

  const totalPnl = openPositions.reduce((sum, p) => sum + p.pnl, 0);

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
              <Crosshair className="w-3 h-3 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Positions
              </h3>
              <p className="text-[9px] text-slate-600">
                {openPositions.length} active
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-sm font-bold font-mono ${
              totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {totalPnl >= 0 ? '+' : ''}
              ${totalPnl.toFixed(2)}
            </div>
            <p className="text-[8px] text-slate-600">Unrealized</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 bg-white/[0.04] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : openPositions.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-2">
              <Crosshair className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-[10px] text-slate-500">No open positions</p>
            <p className="text-[8px] text-slate-600 mt-0.5">Waiting for signals...</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {openPositions.map((position) => (
              <PositionCard
                key={position.id}
                position={position}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default PositionFlow;
