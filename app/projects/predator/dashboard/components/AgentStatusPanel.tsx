'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Cpu,
  MemoryStick,
  Clock,
  ChevronDown,
  Terminal,
  Database,
  Search,
  XCircle,
  Zap,
} from 'lucide-react';
import { AgentStatus } from '../types/dashboard';

interface AgentStatusPanelProps {
  agents: AgentStatus[];
  isLoading: boolean;
  error?: Error;
}

const statusColor: Record<string, string> = {
  running: '#4ade80',
  active: '#4ade80',
  stopped: '#facc15',
  inactive: '#64748b',
  failed: '#f87171',
};

const statusLabel: Record<string, string> = {
  running: 'RUNNING',
  active: 'ACTIVE',
  stopped: 'STANDBY',
  inactive: 'OFFLINE',
  failed: 'CRITICAL',
};

const agentConfig: Record<string, { icon: any; accent: string; accentBg: string }> = {
  'Data Ingestion': { icon: Database, accent: 'text-cyan-400', accentBg: 'bg-cyan-400' },
  'Regime Detection': { icon: Search, accent: 'text-indigo-400', accentBg: 'bg-indigo-400' },
  'Strategy Selector': { icon: Zap, accent: 'text-amber-400', accentBg: 'bg-amber-400' },
  'Sentinel Oracle': { icon: Activity, accent: 'text-emerald-400', accentBg: 'bg-emerald-400' },
};

function MicroBar({ value, max = 100, color }: { value: number | undefined; max?: number; color: string }) {
  if (value === undefined) return <div className="h-1 w-full bg-white/[0.04] rounded-full" />;
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%`, transition: 'width 0.5s' }} />
    </div>
  );
}

function MiniSparkline() {
  // Decorative fake sparkline
  const points = [2, 5, 3, 7, 4, 8, 6, 9, 5, 7, 4, 8].map((v, i) => `${i * 8},${20 - v * 2}`).join(' ');
  return (
    <svg viewBox="0 0 88 20" className="w-16 h-4 opacity-30">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function AgentStatusPanel({ agents, isLoading, error }: AgentStatusPanelProps) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 bg-white/[0.02] border border-white/[0.05] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg">
        <AlertCircle className="w-7 h-7 mb-2 opacity-50" />
        <span className="text-sm font-medium">Telemetry Link Severed</span>
        <span className="text-xs text-red-400/60 mt-1">Check gateway connection</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {agents.map((agent, index) => {
        const isActive = agent.status === 'running' || agent.status === 'active';
        const dotColor = statusColor[agent.status] || '#64748b';
        const cfg = agentConfig[agent.name] || { icon: Activity, accent: 'text-slate-400', accentBg: 'bg-slate-400' };
        const AgentIcon = cfg.icon;
        const isExpanded = expandedAgent === agent.name;

        return (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              rounded-lg border transition-colors duration-200
              ${isExpanded
                ? 'bg-depth border-white/10'
                : 'bg-midnight border-white/[0.06] hover:border-white/10 cursor-pointer'
              }
            `}
            onClick={() => setExpandedAgent(isExpanded ? null : agent.name)}
          >
            {/* Collapsed row */}
            <div className="p-3 flex items-center gap-3">
              {/* Status dot */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: dotColor, boxShadow: isActive ? `0 0 8px ${dotColor}` : 'none' }}
                />
              </div>

              {/* Icon */}
              <div className={`p-1.5 rounded ${cfg.accentBg}/10`}>
                <AgentIcon className={`w-3.5 h-3.5 ${cfg.accent}`} />
              </div>

              {/* Name + status */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-200 truncate">{agent.name}</div>
                <div className="text-[10px] font-mono tracking-wider" style={{ color: dotColor }}>
                  {statusLabel[agent.status] || agent.status}
                </div>
              </div>

              {/* Key metric */}
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                {agent.name === 'Data Ingestion' && agent.barsToday !== undefined && (
                  <span>{agent.barsToday} bars</span>
                )}
                {agent.name === 'Regime Detection' && agent.lastRegime && (
                  <span className="text-indigo-300">{agent.lastRegime}</span>
                )}
                {agent.name === 'Strategy Selector' && agent.strategy && (
                  <span className="text-amber-300 truncate max-w-[80px]">{agent.strategy}</span>
                )}
                {agent.name === 'Sentinel Oracle' && agent.lastSignal && (
                  <span className="text-emerald-300">{agent.lastSignal}</span>
                )}
              </div>

              {/* Chevron */}
              <ChevronDown className={`w-3.5 h-3.5 text-slate-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
            </div>

            {/* Expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 border-t border-white/[0.05]">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3">
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                          <Cpu className="w-2.5 h-2.5" /> CPU
                        </div>
                        <MicroBar value={agent.cpu} color={cfg.accentBg} />
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">{agent.cpu !== undefined && agent.cpu !== null ? `${Number(agent.cpu).toFixed(1)}%` : '--'}</div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                          <MemoryStick className="w-2.5 h-2.5" /> MEM
                        </div>
                        <MicroBar value={agent.memory} max={512} color={cfg.accentBg} />
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">{agent.memory !== undefined && agent.memory !== null ? `${(Number(agent.memory) / 1024).toFixed(1)} MB` : '--'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                          <Clock className="w-2.5 h-2.5 inline mr-1" />Uptime
                        </div>
                        <div className="text-xs font-mono text-slate-300">{agent.uptime || '--'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                          <Terminal className="w-2.5 h-2.5 inline mr-1" />PID
                        </div>
                        <div className="text-xs font-mono text-slate-300">{agent.pid || 'N/A'}</div>
                      </div>
                    </div>

                    {/* Agent output */}
                    <div className="mt-2 p-2 rounded bg-void/50 border border-white/[0.04] text-[10px] font-mono text-slate-400">
                      {agent.name === 'Data Ingestion' && <span>Bars ingested: {agent.barsToday || 0}. Target: XAUUSD M5</span>}
                      {agent.name === 'Regime Detection' && <span>Regime: <b className="text-slate-200">{agent.lastRegime || 'N/A'}</b> • Conf: {agent.confidence ? `${(Number(agent.confidence) * 100).toFixed(1)}%` : '--'}</span>}
                      {agent.name === 'Strategy Selector' && <span>{agent.isActive ? `Active: ${agent.strategy?.replace?.(/_/g, ' ') || 'UNKNOWN'}` : 'Pending confidence threshold'}</span>}
                      {agent.name === 'Sentinel Oracle' && <span>Signal: <b className="text-slate-200">{agent.lastSignal || 'NONE'}</b></span>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {agents.length === 0 && (
        <div className="text-center py-8 text-slate-600 bg-white/[0.02] border border-white/[0.05] rounded-lg border-dashed">
          <Activity className="w-6 h-6 mx-auto mb-2 opacity-20" />
          <span className="text-xs">No agents detected</span>
        </div>
      )}
    </div>
  );
}
