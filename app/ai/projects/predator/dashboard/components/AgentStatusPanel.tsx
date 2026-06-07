'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  Cpu,
  MemoryStick,
  Clock,
  ChevronDown,
  Terminal,
  Database,
  Search,
  Zap,
  Eye,
  ShieldCheck,
  Zap as StrategyIcon,
  MessageSquare
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

// Pantheon Mapping & Configuration
const agentPantheon: Record<string, { god: string; title: string; icon: any; accent: string; accentBg: string }> = {
  'Hermes': { 
    god: 'Hermes', 
    title: 'The Swift Messenger', 
    icon: Database, 
    accent: 'text-cyan-400', 
    accentBg: 'bg-cyan-400' 
  },
  'Argus': { 
    god: 'Argus', 
    title: 'The All-Seeing Observer', 
    icon: Eye, 
    accent: 'text-indigo-400', 
    accentBg: 'bg-indigo-400' 
  },
  'Athena': { 
    god: 'Athena', 
    title: 'The Strategic Tactician', 
    icon: StrategyIcon, 
    accent: 'text-amber-400', 
    accentBg: 'bg-amber-400' 
  },
  'Apollo': { 
    god: 'Apollo', 
    title: 'The Bayesian Prophet', 
    icon: Activity, 
    accent: 'text-emerald-400', 
    accentBg: 'bg-emerald-400' 
  },
  'Ares': {
    god: 'Ares',
    title: 'The Battlefield Commander',
    icon: ShieldCheck,
    accent: 'text-red-400',
    accentBg: 'bg-red-400'
  },
  'Pheme': { 
    god: 'Pheme', 
    title: 'The Voice of Sentiment', 
    icon: MessageSquare, 
    accent: 'text-violet-400', 
    accentBg: 'bg-violet-400' 
  },
  'Sentinel': {
    god: 'Sentinel',
    title: 'The MLOps Guardian',
    icon: ShieldCheck,
    accent: 'text-blue-400',
    accentBg: 'bg-blue-400'
  }
};

function MicroBar({ value, max = 100, color }: { value: number | undefined; max?: number; color: string }) {
  const pct = value !== undefined && value !== null ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden shadow-inner">
      <div className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function AgentStatusPanel({ agents, isLoading, error }: AgentStatusPanelProps) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-14 bg-white/[0.02] border border-white/[0.05] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg">
        <AlertCircle className="w-7 h-7 mb-2 opacity-50" />
        <span className="text-sm font-black uppercase tracking-widest">Telemetry Link Severed</span>
        <span className="text-xs text-red-400/60 mt-1 font-mono">Check gateway connection</span>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {agents.map((agent, index) => {
        const isActive = agent.status === 'running' || agent.status === 'active';
        const dotColor = statusColor[agent.status] || '#64748b';
        const cfg = agentPantheon[agent.name] || { god: agent.name, title: 'Nexus Unit', icon: Activity, accent: 'text-slate-400', accentBg: 'bg-slate-400' };
        const AgentIcon = cfg.icon;
        const isExpanded = expandedAgent === agent.name;

        return (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              rounded-xl border transition-all duration-300
              ${isExpanded
                ? 'bg-depth/80 border-white/10 shadow-2xl backdrop-blur-sm'
                : 'bg-midnight border-white/[0.06] hover:border-white/10 hover:bg-midnight/80 cursor-pointer'
              }
            `}
            onClick={() => setExpandedAgent(isExpanded ? null : agent.name)}
          >
            {/* Collapsed row */}
            <div className="p-3.5 flex items-center gap-3">
              {/* Status dot */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: dotColor, boxShadow: isActive ? `0 0 10px ${dotColor}` : 'none' }}
                />
              </div>

              {/* Icon */}
              <div className={`p-2 rounded-lg ${cfg.accentBg}/10 border border-white/[0.03]`}>
                <AgentIcon className={`w-4 h-4 ${cfg.accent}`} />
              </div>

              {/* Name + status */}
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-black text-slate-100 uppercase tracking-tight flex items-center gap-2">
                  {cfg.god}
                  <span className="text-[8px] font-mono text-slate-500 font-normal normal-case tracking-normal">
                    {cfg.title}
                  </span>
                </div>
                <div className="text-[9px] font-mono font-bold tracking-widest opacity-80" style={{ color: dotColor }}>
                  {statusLabel[agent.status] || agent.status}
                </div>
              </div>

              {/* Key metric */}
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-500 font-mono font-bold">
                {agent.name === 'Hermes' && agent.barsToday !== undefined && (
                  <span className="text-cyan-400/80">{agent.barsToday} bars</span>
                )}
                {agent.name === 'Argus' && agent.lastRegime && (
                  <span className="text-indigo-400/80">{agent.lastRegime}</span>
                )}
                {agent.name === 'Athena' && agent.strategy && (
                  <span className="text-amber-400/80 truncate max-w-[80px]">{agent.strategy}</span>
                )}
                {agent.name === 'Apollo' && agent.lastSignal && (
                  <span className="text-emerald-400/80">{agent.lastSignal}</span>
                )}
              </div>

              {/* Chevron */}
              <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-slate-400' : ''}`} />
            </div>

            {/* Expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'circOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-white/[0.05]">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4">
                      {agent.cpu !== undefined && (
                        <div>
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1.5">
                            <Cpu className="w-3 h-3" /> Compute Load
                          </div>
                          <MicroBar value={agent.cpu} color={cfg.accentBg} />
                          <div className="text-[10px] font-mono text-slate-400 mt-1 font-bold">{agent.cpu !== undefined && agent.cpu !== null ? `${Number(agent.cpu).toFixed(1)}%` : '--'}</div>
                        </div>
                      )}
                      {agent.memory !== undefined && (
                        <div>
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1.5">
                            <MemoryStick className="w-3 h-3" /> Neural Buffer
                          </div>
                          <MicroBar value={agent.memory} max={512} color={cfg.accentBg} />
                          <div className="text-[10px] font-mono text-slate-400 mt-1 font-bold">{agent.memory !== undefined && agent.memory !== null ? `${(Number(agent.memory) / 1024).toFixed(1)} MB` : '--'}</div>
                        </div>
                      )}
                      {agent.uptime !== undefined && (
                        <div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">
                            <Clock className="w-3 h-3 inline mr-1.5" />Process Uptime
                          </div>
                          <div className="text-xs font-mono text-slate-300 font-bold">{agent.uptime || '--'}</div>
                        </div>
                      )}
                      {agent.pid !== undefined && (
                        <div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">
                            <Terminal className="w-3 h-3 inline mr-1.5" />System PID
                          </div>
                          <div className="text-xs font-mono text-slate-300 font-bold">{agent.pid || 'N/A'}</div>
                        </div>
                      )}
                    </div>

                    {/* Agent output - only show if we have data */}
                    {(agent.barsToday !== undefined || agent.lastRegime !== undefined || agent.strategy !== undefined || agent.lastSignal !== undefined) && (
                      <div className="mt-4 p-3 rounded-lg bg-void/60 border border-white/[0.04] text-[10px] font-mono text-slate-400 leading-relaxed shadow-inner">
                        <div className="text-slate-500 uppercase text-[8px] font-black mb-1 tracking-tighter">Live Telemetry Output</div>
                        {agent.name === 'Hermes' && agent.barsToday !== undefined && <span>Status: {cfg.god} is streaming market consciousness. {agent.barsToday || 0} bars synced.</span>}
                        {agent.name === 'Argus' && agent.lastRegime && <span>Classification: {cfg.god} identifies <b className="text-slate-200">{agent.lastRegime}</b> with {agent.confidence ? `${(Number(agent.confidence) * 100).toFixed(1)}%` : '--'} structural confidence.</span>}
                        {agent.name === 'Athena' && <span>Directive: {cfg.god} has authorized <b className="text-slate-200">{agent.strategy?.replace?.(/_/g, ' ') || 'NEUTRAL'}</b> from the node pool.</span>}
                        {agent.name === 'Apollo' && agent.lastSignal && <span>Oracle Consensus: {cfg.god} has issued a <b className="text-slate-200">{agent.lastSignal || 'WAIT'}</b> decree.</span>}
                      </div>
                    )}

                    {/* Show telemetry unavailable message when no detailed data */}
                    {agent.cpu === undefined && agent.memory === undefined && agent.pid === undefined && (
                      <div className="mt-4 p-3 rounded-lg bg-void/60 border border-white/[0.04] text-[10px] font-mono text-slate-500 italic text-center">
                        Telemetry link degraded - reporting basic divine status only
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {agents.length === 0 && (
        <div className="text-center py-12 text-slate-600 bg-white/[0.01] border border-white/[0.05] border-dashed rounded-xl">
          <Activity className="w-8 h-8 mx-auto mb-3 opacity-10 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-black">Awaiting Pantheon Convergence...</span>
        </div>
      )}
    </div>
  );
}
