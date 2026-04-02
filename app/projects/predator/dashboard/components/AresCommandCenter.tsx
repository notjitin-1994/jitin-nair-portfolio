'use client';

import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Shield, Target, TrendingUp, TrendingDown, 
  History, Wallet, Activity, ChevronRight, AlertTriangle,
  Sword, Swords, Crosshair, BarChart3, Clock
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

// ============================================================================
// Ares Command Center - Tactical Unified Execution Interface
// ============================================================================

const StatCard = ({ label, value, subvalue, icon: Icon, color = 'cyan' }: any) => {
  const colorMap: any = {
    cyan: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    red: 'text-red-400 bg-red-400/10 border-red-400/20',
    amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    violet: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  };

  return (
    <div className="bg-void/40 rounded-xl p-3 border border-white/[0.04] flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className={`p-1.5 rounded-lg border ${colorMap[color]}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        {subvalue && (
          <span className={`text-[10px] font-mono font-bold ${subvalue.startsWith('+') ? 'text-emerald-400' : subvalue.startsWith('-') ? 'text-red-400' : 'text-slate-500'}`}>
            {subvalue}
          </span>
        )}
      </div>
      <div className="mt-1">
        <div className="text-lg font-black font-mono text-white tracking-tighter leading-none">{value}</div>
        <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">{label}</div>
      </div>
    </div>
  );
};

const PositionRow = ({ pos }: any) => {
  const isLong = pos.direction === 'LONG';
  const isProfit = pos.pnl >= 0;
  
  // Progress to TP
  const totalMove = Math.abs(pos.tp - pos.entryPrice);
  const currentMove = isLong ? pos.currentPrice - pos.entryPrice : pos.entryPrice - pos.currentPrice;
  const progress = totalMove > 0 ? Math.min(Math.max((currentMove / totalMove) * 100, 0), 100) : 0;

  return (
    <div className="group relative bg-void/30 rounded-xl p-3 border border-white/[0.03] hover:border-white/[0.08] transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
            isLong ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {isLong ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-black font-mono ${isLong ? 'text-emerald-400' : 'text-red-400'}`}>
                {pos.direction}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">@{pos.entryPrice.toFixed(2)}</span>
            </div>
            <div className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">
              {pos.strategy?.replace(/_/g, ' ') || 'TACTICAL STRIKE'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-black font-mono ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
            {isProfit ? '+' : ''}{pos.pnl.toFixed(2)}
          </div>
          <div className="text-[9px] text-slate-500 font-mono">PNL USD</div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[9px] font-bold tracking-tighter">
          <span className="text-red-400/60 uppercase">Defeat: {pos.sl.toFixed(2)}</span>
          <span className="text-emerald-400/60 uppercase">Victory: {pos.tp.toFixed(2)}</span>
        </div>
        <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={`h-full rounded-full ${isProfit ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'bg-red-400'}`}
          />
        </div>
      </div>
    </div>
  );
};

const TradeRow = ({ trade }: any) => {
  const isProfit = trade.pnl >= 0;
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.02] transition-colors border-b border-white/[0.02] last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-1.5 h-1.5 rounded-full ${isProfit ? 'bg-emerald-400' : 'bg-red-400'}`} />
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black font-mono ${trade.direction === 'LONG' ? 'text-emerald-400' : 'text-red-400'}`}>
              {trade.direction}
            </span>
            <span className="text-[10px] text-slate-300 font-mono">${trade.entryPrice.toFixed(2)}</span>
          </div>
          <div className="text-[8px] text-slate-600 uppercase font-bold tracking-wider">{trade.closeReason} • {trade.duration}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-[10px] font-black font-mono ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
          {isProfit ? '+' : ''}{trade.pnl.toFixed(2)}
        </div>
        <div className="text-[8px] text-slate-600 font-mono">{new Date(trade.closedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    </div>
  );
};

export default function AresCommandCenter() {
  const { ares, positions, trades, connectionStatus } = useDashboard();
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');

  if (!ares) return null;

  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
  const totalPnlColor = totalPnl >= 0 ? 'emerald' : 'red';
  const dailyPnlColor = ares.dailyPnl >= 0 ? 'emerald' : 'red';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-midnight border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl relative"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] bg-void/40 flex items-center justify-between backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <Sword className="w-5 h-5 text-red-400 shadow-sm" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] leading-tight">
              Ares Command
            </h2>
            <div className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Battlefield Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black font-mono border ${
            ares.mode === 'live' 
              ? 'bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
          }`}>
            {ares.mode.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
        <StatCard 
          label="War Chest" 
          value={`$${ares.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} 
          subvalue={`Peak: $${ares.peakBalance?.toFixed(2)}`}
          icon={Wallet} 
          color="cyan" 
        />
        <StatCard 
          label="Today's Spoils" 
          value={`${ares.dailyPnl >= 0 ? '+' : ''}$${ares.dailyPnl.toFixed(2)}`} 
          subvalue={`${ares.dailyPnlPercent >= 0 ? '+' : ''}${ares.dailyPnlPercent.toFixed(2)}%`}
          icon={Activity} 
          color={dailyPnlColor} 
        />
        <StatCard 
          label="Total Victory" 
          value={`${totalPnl >= 0 ? '+' : ''}$${totalPnl.toFixed(2)}`} 
          subvalue={`${trades.length} trades`}
          icon={Swords} 
          color={totalPnlColor} 
        />
        <StatCard 
          label="Combat Stress" 
          value={`${ares.drawdown.toFixed(2)}%`} 
          subvalue={`Max: ${ares.maxDrawdown.toFixed(1)}%`}
          icon={Shield} 
          color={ares.drawdown > 3 ? 'amber' : 'emerald'} 
        />
      </div>

      {/* Tabs */}
      <div className="px-5 border-b border-white/[0.04] flex gap-6 relative z-10">
        <button 
          onClick={() => setActiveTab('live')}
          className={`pb-3 text-[10px] font-black uppercase tracking-widest transition-all relative ${
            activeTab === 'live' ? 'text-white' : 'text-slate-600 hover:text-slate-400'
          }`}
        >
          Active Fronts ({positions.length})
          {activeTab === 'live' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />}
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`pb-3 text-[10px] font-black uppercase tracking-widest transition-all relative ${
            activeTab === 'history' ? 'text-white' : 'text-slate-600 hover:text-slate-400'
          }`}
        >
          Battle Records
          {activeTab === 'history' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />}
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 min-h-[320px] relative z-10 bg-void/20">
        <AnimatePresence mode="wait">
          {activeTab === 'live' ? (
            <motion.div
              key="live"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-3"
            >
              {positions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-700">
                  <Crosshair className="w-12 h-12 mb-4 opacity-10" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">Scanning for Targets...</p>
                </div>
              ) : (
                positions.map((pos: any) => <PositionRow key={pos.id} pos={pos} />)
              )}
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-1"
            >
              {trades.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-700">
                  <History className="w-12 h-12 mb-4 opacity-10" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">No Records Found</p>
                </div>
              ) : (
                trades.slice(0, 10).map((trade: any) => <TradeRow key={trade.id} trade={trade} />)
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Risk Footer */}
      <div className="px-5 py-3 bg-void/60 border-t border-white/[0.06] flex items-center justify-between relative z-10 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-600 uppercase font-black tracking-widest">Risk Authority</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${
                ares.riskStatus === 'CLEAR' ? 'bg-emerald-400' : ares.riskStatus === 'CAUTION' ? 'bg-amber-400' : 'bg-red-400'
              }`} />
              <span className={`text-[10px] font-black font-mono ${
                ares.riskStatus === 'CLEAR' ? 'text-emerald-400' : ares.riskStatus === 'CAUTION' ? 'text-amber-400' : 'text-red-400'
              }`}>
                {ares.riskStatus}
              </span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-white/[0.04]" />
          
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-600 uppercase font-black tracking-widest">Daily Ceiling</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-24 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500/40 rounded-full" 
                  style={{ width: `${Math.min((ares.dailyLossUsed / ares.dailyLossLimit) * 100, 100)}%` }} 
                />
              </div>
              <span className="text-[9px] font-bold font-mono text-slate-400">
                ${ares.dailyLossUsed.toFixed(0)} / ${ares.dailyLossLimit.toFixed(0)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-[8px] text-slate-600 uppercase font-black tracking-widest block">Command Pulse</span>
          <span className="text-[10px] font-bold font-mono text-white/40">SYNCED</span>
        </div>
      </div>
    </motion.div>
  );
}
