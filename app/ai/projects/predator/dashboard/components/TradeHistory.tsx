'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  History
} from 'lucide-react';

// ============================================================================
// Trade History - Compact Visual Trade Flow
// ============================================================================

interface Trade {
  id: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercent?: number;
  closeReason: 'TP' | 'SL' | 'MANUAL' | string;
  duration: string;
  closedAt: string;
  strategy?: string;
}

const TradeRow = memo(function TradeRow({ trade }: { trade: Trade }) {
  const isLong = trade.direction === 'LONG';
  const isProfit = trade.pnl >= 0;

  const getCloseColor = () => {
    switch (trade.closeReason) {
      case 'TP':
        return 'text-emerald-400 bg-emerald-400/10';
      case 'SL':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div
      className={`group flex items-center gap-2 p-2 rounded-lg border transition-all ${
        isProfit
          ? 'bg-emerald-500/[0.02] border-emerald-500/10 hover:border-emerald-500/20'
          : 'bg-red-500/[0.02] border-red-500/10 hover:border-red-500/20'
      }`}
    >
      {/* Direction Icon */}
      <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
        isLong ? 'bg-emerald-500/10' : 'bg-red-500/10'
      }`}>
        {isLong ? (
          <TrendingUp className="w-3 h-3 text-emerald-400" />
        ) : (
          <TrendingDown className="w-3 h-3 text-red-400" />
        )}
      </div>

      {/* Trade Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-bold ${isLong ? 'text-emerald-400' : 'text-red-400'}`}>
            {trade.direction}
          </span>
          <span className="text-[8px] text-slate-600">
            {trade.entryPrice.toFixed(2)} → {trade.exitPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`text-[8px] px-1 py-0.5 rounded ${getCloseColor()}`}>
            {trade.closeReason}
          </span>
          <span className="text-[8px] text-slate-600">
            {trade.duration}
          </span>
        </div>
      </div>

      {/* P&L */}
      <div className="text-right">
        <div className={`text-xs font-bold font-mono ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
          {isProfit ? '+' : ''}${trade.pnl.toFixed(2)}
        </div>
        <div className={`text-[9px] font-mono ${isProfit ? 'text-emerald-400/60' : 'text-red-400/60'}`}>
          {isProfit ? '+' : ''}{trade.pnlPercent?.toFixed(2) || '0.00'}%
        </div>
      </div>
    </div>
  );
});

const EmptyState = memo(function EmptyState() {
  return (
    <div className="py-8 text-center">
      <div className="w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-2">
        <History className="w-5 h-5 text-slate-600" />
      </div>
      <p className="text-[10px] text-slate-500">No recent trades</p>
      <p className="text-[8px] text-slate-600 mt-0.5">Trades appear when closed</p>
    </div>
  );
});

const TradeHistory = memo(function TradeHistory() {
  const { trades, connectionStatus } = useDashboard();

  const isLoading = connectionStatus === 'connecting';
  const recentTrades = trades.slice(0, 8);

  // Calculate stats
  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);

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
              <History className="w-3 h-3 text-violet-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Trades
              </h3>
              <p className="text-[9px] text-slate-600">
                {trades.length} closed
              </p>
            </div>
          </div>
          {trades.length > 0 && (
            <div className="text-right">
              <div className={`text-sm font-bold font-mono ${totalPnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
              </div>
              <p className="text-[8px] text-slate-600">Total P&L</p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-white/[0.04] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : recentTrades.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-1.5 max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {recentTrades.map((trade) => (
              <TradeRow key={trade.id} trade={trade} />
            ))}
          </div>
        )}
      </div>

      {/* Compact Footer */}
      {trades.length > 8 && (
        <div className="px-4 py-2 border-t border-white/[0.06] text-center">
          <span className="text-[9px] text-slate-600">
            Showing 8 of {trades.length} trades
          </span>
        </div>
      )}
    </motion.div>
  );
});

export default TradeHistory;
