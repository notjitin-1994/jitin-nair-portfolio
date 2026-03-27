'use client';

import { motion } from 'framer-motion';
import { ScrollText, CheckCircle2, XCircle } from 'lucide-react';
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

interface Trade {
  id: string;
  direction: 'LONG' | 'SHORT';
  strategy?: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  closeReason?: string;
  duration?: string;
  closedAt?: string;
}

function formatDuration(dur?: string): string {
  if (!dur) return '';
  return dur;
}

function TradeRow({ trade, index }: { trade: Trade; index: number }) {
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
            {isWin ? '+' : ''}${trade.pnl.toFixed(2)}
          </span>
          {trade.strategy && (
            <span className="text-[9px] text-slate-600 font-mono">
              {trade.strategy.replace(/_/g, ' ')}
            </span>
          )}
        </div>
        <div className="text-[10px] font-mono text-slate-500">
          {trade.entryPrice.toFixed(2)} → {trade.exitPrice.toFixed(2)}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {trade.closeReason && (
            <span className={`text-[9px] font-mono ${
              trade.closeReason.toLowerCase().includes('tp') ? 'text-emerald-400/60' : 'text-red-400/60'
            }`}>
              {trade.closeReason.replace(/_/g, ' ')}
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
  const { data, isLoading, error } = useSWR<Trade[]>('/api/execution/trades', fetcher, {
    refreshInterval: 10000,
    errorRetryCount: 3,
  });

  const trades = Array.isArray(data) ? data.slice(0, 10) : [];

  if (isLoading) {
    return (
      <div className="bg-midnight border border-white/[0.06] rounded-lg p-5 animate-pulse h-[300px]" />
    );
  }

  if (error) {
    return (
      <div className="bg-midnight border border-white/[0.06] rounded-lg p-5 h-[300px] flex flex-col items-center justify-center text-slate-600">
        <ScrollText className="w-8 h-8 mb-2 opacity-20" />
        <span className="text-sm">Trade history unavailable</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-midnight border border-white/[0.06] rounded-lg p-5"
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
        {trades.length === 0 && (
          <div className="text-center py-8 text-slate-600">
            <span className="text-xs">No trades yet</span>
          </div>
        )}
        {trades.map((trade, i) => (
          <TradeRow key={trade.id || i} trade={trade} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
