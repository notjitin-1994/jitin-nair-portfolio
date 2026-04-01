'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { LayoutGrid, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';

const StrategyCommandCenter = memo(() => {
  const { strategy, connectionStatus } = useDashboard();
  const candidates = strategy?.candidates || [];
  const activeId = strategy?.current?.strategy_id;

  const getStatusIcon = (candidate: any) => {
    if (candidate.config.strategy_id === activeId) {
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
    }
    if (!candidate.is_allowed) {
      return <Lock className="w-3.5 h-3.5 text-red-400/50" />;
    }
    return <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden flex flex-col h-[400px] w-full shadow-2xl"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between bg-void/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <LayoutGrid className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Strategy Command Center
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono text-emerald-500/80 uppercase">Active Matrix</span>
        </div>
      </div>

      {/* Matrix */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 bg-void/20">
        {candidates.length > 0 ? (
          candidates.sort((a, b) => b.final_score - a.final_score).map((candidate, idx) => (
            <motion.div
              key={candidate.config.strategy_id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={`p-3 rounded-lg border transition-all ${
                candidate.config.strategy_id === activeId 
                  ? 'bg-violet-500/10 border-violet-500/30 ring-1 ring-violet-500/20' 
                  : 'bg-void/40 border-white/[0.03] hover:border-white/[0.08]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  {getStatusIcon(candidate)}
                  <span className={`text-[11px] font-bold truncate ${
                    candidate.config.strategy_id === activeId ? 'text-violet-100' : 'text-slate-300'
                  }`}>
                    {candidate.config.name}
                  </span>
                </div>
                <div className="text-[10px] font-mono font-bold text-violet-400">
                  {(candidate.final_score * 100).toFixed(1)}%
                </div>
              </div>

              {/* Score Bar */}
              <div className="h-1 w-full bg-white/[0.03] rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${candidate.final_score * 100}%` }}
                  className={`h-full rounded-full ${
                    candidate.config.strategy_id === activeId ? 'bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.4)]' : 'bg-slate-600'
                  }`}
                />
              </div>

              {/* Reasoning */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-slate-500 font-mono line-clamp-1 italic">
                  {candidate.selection_reason}
                </span>
                {!candidate.is_allowed && (
                  <span className="text-[8px] text-red-400/60 uppercase font-bold tracking-tight">
                    {candidate.allow_reason}
                  </span>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-600">
            <LayoutGrid className="w-8 h-8 mb-3 opacity-20" />
            <span className="text-[10px] uppercase tracking-widest animate-pulse">Syncing Matrix...</span>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 border-t border-white/[0.03] bg-void/40 flex justify-between items-center">
        <span className="text-[8px] text-slate-600 uppercase font-medium">16 Node Matrix</span>
        <span className="text-[8px] text-slate-600 font-mono">V4.0 Institutional</span>
      </div>
    </motion.div>
  );
});

StrategyCommandCenter.displayName = 'StrategyCommandCenter';

export default StrategyCommandCenter;
