'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { Activity, Globe, Zap, Database } from 'lucide-react';

// ============================================================================
// Macro Item Component
// ============================================================================

const MacroItem = ({ symbol, price, change }: { symbol: string, price: number, change: number }) => {
  const isUp = change >= 0;
  
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-0">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-slate-400">{symbol}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-slate-200">{price.toFixed(symbol === 'USDJPY' ? 3 : 5)}</span>
        <span className={`text-[9px] font-mono ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {isUp ? '+' : ''}{change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// Price Ticker - Refactored for 100% Technical Integrity
// ============================================================================

const PriceTicker = memo(function PriceTicker() {
  const { price, macro, connectionStatus } = useDashboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden h-full flex flex-col"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Zap className="w-3 h-3 text-emerald-400" />
          </div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Market Pulse
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${connectionStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">
            {connectionStatus === 'connected' ? 'Live Stream' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Main Price Card */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">XAUUSD Spot</span>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
              <Database className="w-2.5 h-2.5 text-blue-400" />
              <span className="text-[8px] font-bold text-blue-400 uppercase">{price?.source || 'Broker'}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tighter">
              {price ? price.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '----.--'}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase">USD</span>
          </div>
        </div>

        {/* Macro Indicators */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-slate-500" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Macro Alignment</span>
          </div>
          
          <div className="bg-void/40 rounded-lg p-2.5 border border-white/[0.04]">
            {macro.EURUSD ? (
              <>
                <MacroItem symbol="EURUSD" price={macro.EURUSD.price} change={macro.EURUSD.change24h || 0} />
                <MacroItem symbol="USDJPY" price={macro.USDJPY?.price || 0} change={macro.USDJPY?.change24h || 0} />
              </>
            ) : (
              <div className="py-2 text-center">
                <Activity className="w-4 h-4 text-slate-700 mx-auto animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Latency / Sync Info */}
        <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ClockIcon />
            <span className="text-[8px] font-mono text-slate-600">
              {price ? new Date(price.timestamp).toLocaleTimeString() : '--:--:--'}
            </span>
          </div>
          <span className="text-[8px] font-mono text-slate-600 uppercase">Synchronized</span>
        </div>
      </div>
    </motion.div>
  );
});

const ClockIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default PriceTicker;
