'use client';

import { motion } from 'framer-motion';
import { ScrollText, CheckCircle2, XCircle } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

function formatDuration(dur?: string): string {
  if (!dur) return '';
  return dur;
}

function TradeRow({ trade, index }: { trade: any; index: number }) {
  const isWin = trade.pnl >= 0;
  const dirColor = trade.direction === 'LONG' ? 'text-emerald-400' : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-start gap-3 py-2.5 border-b border-white/[0.03] last:border-0"
    >
      {/* Win/Loss icon */}
      <div className="flex-shrink-0 mt-0.5">
        {isWin ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : (
          <XCircle className="w-4 h-4 text-red-400" />
        )}
      </div>

      {/* Trade info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-xs font-bold font-mono ${dirColor}`}>
            {trade.direction}
          </span>
          <span className={`text-xs font-bold font-mono ${isWin ? 'text-emerald-400' : 'text-red-400'}`}>
            {isWin ? '+' : ''}${Number(trade.pnl || 0).toFixed(2)}
          </span>
          {trade.strategy && (
            <span className="text-[9px] text-slate-600 font-mono">
              {trade.strategy?.replace?.(/_/g, ' ') || 'NONE'}
            </span>
          )}
        </div>
        <div className="text-[10px] font-mono text-slate-500">
          {Number(trade.entryPrice || 0).toFixed(2)} → {Number(trade.exitPrice || 0).toFixed(2)}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {trade.closeReason && (
            <span className={`text-[9px] font-mono ${
              trade.closeReason.toLowerCase().includes('tp') ? 'text-emerald-400/60' : 'text-red-400/60'
            }`}>
              {trade.closeReason?.replace?.(/_/g, ' ') || 'N/A'}
            </span>
          )}
          {trade.duration && (
            <span className="text-[9px] text-slate-600 font-mono">
              · {formatDuration(trade.duration)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function RecentTrades() {
  const { trades, connectionStatus } = useDashboard();
  const isLoading = connectionStatus === 'connecting' && trades.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-midnight border border-white/[0.06] rounded-xl p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ScrollText className="w-4 h-4 text-slate-400" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
            Recent Trades
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          last {trades.length}
        </span>
      </div>

      {/* Trades list */}
      <div className="max-h-[260px] overflow-y-auto">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-white/[0.02] rounded-lg" />
            ))}
          </div>
        ) : trades.length === 0 ? (
          <div className="text-center py-8 text-slate-600">
            <span className="text-xs">No trades yet</span>
          </div>
        ) : (
          trades.map((trade, i) => (
            <TradeRow key={trade.id || i} trade={trade} index={i} />
          ))
        )}
      </div>
    </motion.div>
  );
}
