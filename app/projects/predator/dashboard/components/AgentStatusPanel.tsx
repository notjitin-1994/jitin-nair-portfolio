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
  BarChart3,
  Search,
  XCircle,
  Zap
} from 'lucide-react';
import { AgentStatus } from '../types/dashboard';

interface AgentStatusPanelProps {
  agents: AgentStatus[];
  isLoading: boolean;
  error?: Error;
}

const statusConfig: Record<string, { icon: any; color: string; bgColor: string; borderColor: string; label: string }> = {
  running: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
    label: 'Operational',
  },
  active: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
    label: 'Active',
  },
  stopped: {
    icon: AlertCircle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/20',
    label: 'Standby',
  },
  inactive: {
    icon: AlertCircle,
    color: 'text-slate-400',
    bgColor: 'bg-slate-400/10',
    borderColor: 'border-slate-400/20',
    label: 'Offline',
  },
  failed: {
    icon: XCircle,
    color: 'text-rose-400',
    bgColor: 'bg-rose-400/10',
    borderColor: 'border-rose-400/20',
    label: 'Critical',
  },
};

const agentIcons: Record<string, any> = {
  "Data Ingestion": Database,
  "Regime Detection": Search,
  "Strategy Selector": Zap,
  "Sentinel Oracle": Activity
};

export default function AgentStatusPanel({ agents, isLoading, error }: AgentStatusPanelProps) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-white/[0.02] border border-white/[0.05] rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-rose-400 bg-rose-400/5 border border-rose-400/10 rounded-2xl">
        <AlertCircle className="w-8 h-8 mb-3 opacity-50" />
        <span className="text-sm font-medium">Telemetry Link Severed</span>
        <span className="text-xs text-rose-400/60 mt-1">Check gateway connection status</span>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {agents.map((agent, index) => {
        const config = statusConfig[agent.status] || statusConfig.failed;
        const Icon = config.icon;
        const AgentIcon = agentIcons[agent.name] || Activity;
        const isExpanded = expandedAgent === agent.name;

        return (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              group overflow-hidden rounded-xl border transition-all duration-300
              ${isExpanded 
                ? 'bg-white/[0.04] border-white/10 shadow-2xl shadow-void/50' 
                : 'bg-white/[0.02] border-white/[0.05] hover:border-white/10 hover:bg-white/[0.03] cursor-pointer'
              }
            `}
            onClick={() => setExpandedAgent(isExpanded ? null : agent.name)}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className={`
                  p-2.5 rounded-xl transition-colors duration-300
                  ${isExpanded ? 'bg-white/10 text-white' : 'bg-white/5 text-slate-400 group-hover:text-slate-200'}
                `}>
                  <AgentIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm tracking-tight text-slate-100">
                    {agent.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${config.color.replace('text', 'bg')} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${config.color} opacity-80`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Minimal Metrics in Header */}
                {!isExpanded && (
                  <div className="hidden md:flex items-center gap-3 px-3 py-1.5 bg-void/40 rounded-lg border border-white/[0.03]">
                    {agent.barsToday !== undefined && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                        <BarChart3 className="w-3 h-3 text-cyan-400" />
                        <span>{agent.barsToday} bars</span>
                      </div>
                    )}
                    {agent.lastRegime && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                        <Search className="w-3 h-3 text-indigo-400" />
                        <span>{agent.lastRegime}</span>
                      </div>
                    )}
                    {agent.lastSignal && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>{agent.lastSignal}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-4 pb-4 border-t border-white/[0.05] bg-void/20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                      {/* Telemetry Stats */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          <Cpu className="w-3 h-3" />
                          <span>CPU Load</span>
                        </div>
                        <div className="text-sm font-mono text-slate-200">
                          {agent.cpu !== undefined ? `${agent.cpu.toFixed(1)}%` : '--'}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          <MemoryStick className="w-3 h-3" />
                          <span>Memory Usage</span>
                        </div>
                        <div className="text-sm font-mono text-slate-200">
                          {agent.memory !== undefined ? `${(agent.memory / 1024).toFixed(1)} MB` : '--'}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          <Clock className="w-3 h-3" />
                          <span>Uptime</span>
                        </div>
                        <div className="text-sm font-mono text-slate-200 truncate">
                          {agent.uptime || '--'}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          <Terminal className="w-3 h-3" />
                          <span>PID</span>
                        </div>
                        <div className="text-sm font-mono text-slate-200">
                          {agent.pid || 'System Process'}
                        </div>
                      </div>
                    </div>

                    {/* Agent Specific Output */}
                    <div className="mt-2 p-3 rounded-xl bg-void/50 border border-white/[0.05]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Latest Agent Output
                        </div>
                        <div className="text-[10px] text-slate-600 font-mono">
                          {agent.lastRun ? new Date(agent.lastRun).toLocaleTimeString() : 'Never'}
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-400 font-mono leading-relaxed bg-black/20 p-2 rounded-lg border border-white/5">
                        {agent.name === "Data Ingestion" && (
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400">SUCCESS:</span>
                            <span>Session bars: {agent.barsToday || 0}. Target: XAUUSD M5</span>
                          </div>
                        )}
                        {agent.name === "Regime Detection" && (
                          <div className="flex items-center gap-2">
                            <span className="text-indigo-400">RESULT:</span>
                            <span>Market Classified as <b className="text-slate-200">{agent.lastRegime || 'UNCERTAIN'}</b>. Confidence: {agent.confidence ? (agent.confidence * 100).toFixed(1) : '--'}%</span>
                          </div>
                        )}
                        {agent.name === "Strategy Selector" && (
                          <div className="flex items-center gap-2">
                            <span className="text-amber-400">STRATEGY:</span>
                            <span>{agent.isActive ? `ACTIVE: ${agent.strategy}` : "PENDING: Confidence threshold check failed."}</span>
                          </div>
                        )}
                        {agent.name === "Sentinel Oracle" && (
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400">SIGNAL:</span>
                            <span>Current Signal: <b className="text-slate-200">{agent.lastSignal || 'NONE'}</b>. Macro confluence confirmed.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {agents.length === 0 && (
        <div className="text-center py-12 text-slate-500 bg-white/[0.02] border border-white/[0.05] rounded-2xl border-dashed">
          <Activity className="w-8 h-8 mx-auto mb-3 opacity-20" />
          <span className="text-sm">No neural agents detected in cluster</span>
        </div>
      )}
    </div>
  );
}
