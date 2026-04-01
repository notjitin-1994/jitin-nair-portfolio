'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { LayoutGrid, CheckCircle2, ShieldCheck, Target } from 'lucide-react';

const StrategyCommandCenter = memo(() => {
  const { strategy } = useDashboard();
  const activeStrategy = strategy?.current;
  const candidates = strategy?.candidates || [];
  
  // Find full candidate object for the active strategy to get more details if needed
  const activeCandidate = candidates.find(c => c.config.strategy_id === activeStrategy?.strategy_id);
  const displayScore = activeCandidate?.final_score || activeStrategy?.confidence_score || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden shadow-2xl relative"
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between bg-void/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Target className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            Active Strategy
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono text-emerald-500/80 uppercase">Live Directive</span>
        </div>
      </div>

      {/* Active Strategy Details */}
      <div className="p-4 bg-void/20">
        {activeStrategy ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[12px] font-black text-slate-100 uppercase tracking-tight">
                    {activeCandidate?.config?.name || activeStrategy.strategy_id.replace(/_/g, ' ')}
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mt-0.5">
                    ID: {activeStrategy.strategy_id}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black font-mono text-violet-400">
                  {(displayScore * 100).toFixed(1)}%
                </div>
                <div className="text-[8px] text-slate-600 uppercase font-bold tracking-tighter">Conviction</div>
              </div>
            </div>

            {/* Score Bar */}
            <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${displayScore * 100}%` }}
                className="h-full bg-gradient-to-r from-violet-600 to-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.3)]"
              />
            </div>

            {/* Selection Reasoning */}
            <div className="bg-void/40 p-3 rounded-lg border border-white/[0.03] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-violet-500/40" />
              <div className="text-[9px] text-slate-500 uppercase font-black mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-violet-400" />
                Selection Rationale
              </div>
              <p className="text-[10px] text-slate-300 font-medium italic leading-relaxed">
                &quot;{activeCandidate?.selection_reason || activeStrategy.selection_reason || "Calibrating institutional confluence..."}&quot;
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-slate-600">
            <LayoutGrid className="w-6 h-6 mb-2 opacity-20" />
            <span className="text-[9px] uppercase tracking-[0.2em] animate-pulse font-bold">Syncing Nexus Matrix...</span>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 border-t border-white/[0.03] bg-void/40 flex justify-between items-center">
        <span className="text-[8px] text-slate-600 uppercase font-bold tracking-widest">{candidates.length} Node Pool</span>
        <span className="text-[8px] text-slate-600 font-mono">V4.0 Institutional</span>
      </div>
    </motion.div>
  );
});

StrategyCommandCenter.displayName = 'StrategyCommandCenter';

export default StrategyCommandCenter;
