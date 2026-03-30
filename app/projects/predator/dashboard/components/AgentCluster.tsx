'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import {
  Database,
  Brain,
  GitBranch,
  Eye,
  Play,
  Cpu,
  MemoryStick,
  Activity,
  Wifi,
  WifiOff,
  AlertCircle,
  Clock
} from 'lucide-react';

// ============================================================================
// Agent Cluster - Compact Heatmap Grid for Sidebar Layout
// ============================================================================

interface Agent {
  name: string;
  status: 'running' | 'stopped' | 'failed' | 'degraded';
  pid?: number;
  cpu?: number;
  memory?: number;
  uptime?: string;
  throughput?: number;
  lastActivity?: string;
}

const AgentNode = memo(function AgentNode({
  agent,
  icon: Icon,
  color
}: {
  agent: Agent;
  icon: React.ElementType;
  color: string;
}) {
  const isRunning = agent.status === 'running';
  const isFailed = agent.status === 'failed';

  const getStatusColor = () => {
    if (isFailed) return '#ef4444';
    if (agent.status === 'degraded') return '#f59e0b';
    if (isRunning) return color;
    return '#6b7280';
  };

  const getMemoryDisplay = (bytes?: number) => {
    if (!bytes) return '--';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)}GB`;
  };

  const statusColor = getStatusColor();

  return (
    <div
      className={`relative rounded-lg border p-2.5 transition-all duration-300 ${
        isRunning
          ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
          : isFailed
          ? 'bg-red-500/[0.03] border-red-500/20'
          : 'bg-white/[0.01] border-white/[0.04]'
      }`}
    >
      {/* Compact Header: Icon + Status */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${statusColor}15` }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: statusColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[10px] font-medium text-white truncate">{agent.name}</h4>
          <p className="text-[8px] text-slate-500 uppercase tracking-wider">{agent.status}</p>
        </div>
        <div className="flex-shrink-0">
          {isRunning ? (
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          ) : isFailed ? (
            <AlertCircle className="w-3 h-3 text-red-400" />
          ) : (
            <WifiOff className="w-3 h-3 text-slate-600" />
          )}
        </div>
      </div>

      {/* Compact Metrics Row */}
      {isRunning && agent.pid && (
        <div className="flex items-center gap-3 pt-2 border-t border-white/[0.04]">
          <div className="flex items-center gap-1 text-[9px]">
            <Cpu className="w-3 h-3 text-slate-500" />
            <span className="font-mono text-slate-300">{agent.cpu?.toFixed(1) || '--'}%</span>
          </div>
          <div className="flex items-center gap-1 text-[9px]">
            <MemoryStick className="w-3 h-3 text-slate-500" />
            <span className="font-mono text-slate-300">{getMemoryDisplay(agent.memory)}</span>
          </div>
        </div>
      )}

      {/* PID */}
      {agent.pid && (
        <div className="mt-1.5 pt-1.5 border-t border-white/[0.04]">
          <span className="text-[8px] text-slate-600 font-mono">PID: {agent.pid}</span>
        </div>
      )}
    </div>
  );
});

const AgentCluster = memo(function AgentCluster() {
  const { agents, connectionStatus } = useDashboard();

  const isLoading = connectionStatus === 'connecting';

  const agentConfig = [
    { key: 0, icon: Database, color: '#22d3ee', name: 'Data Ingestion' },
    { key: 1, icon: Brain, color: '#818cf8', name: 'Regime Detection' },
    { key: 2, icon: GitBranch, color: '#fbbf24', name: 'Strategy Selector' },
    { key: 3, icon: Eye, color: '#34d399', name: 'Sentinel Oracle' },
    { key: 4, icon: Play, color: '#f472b6', name: 'Execution Engine' },
  ];

  const runningCount = agents.filter(a => a.status === 'running').length;
  const hasAgents = agents.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden h-full flex flex-col"
    >
      {/* Compact Header */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Activity className="w-3 h-3 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Agents
              </h3>
              <p className="text-[9px] text-slate-600">
                {runningCount}/{agents.length} online
              </p>
            </div>
          </div>
          {/* Status Dots */}
          {hasAgents && (
            <div className="flex items-center gap-1">
              {agents.map((agent, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full ${
                    agent.status === 'running'
                      ? 'bg-emerald-400'
                      : agent.status === 'failed'
                      ? 'bg-red-400'
                      : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content - Compact Grid */}
      <div className="p-3 flex-1 overflow-auto">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-2">
            {agentConfig.map((_, i) => (
              <div key={i} className="h-20 bg-white/[0.04] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : agents.length === 0 ? (
          <div className="py-8 text-center">
            <WifiOff className="w-6 h-6 text-slate-600 mx-auto mb-2" />
            <p className="text-[10px] text-slate-500">No agents connected</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {agents.map((agent, index) => (
              <AgentNode
                key={agent.name}
                agent={agent}
                icon={agentConfig[index]?.icon || Activity}
                color={agentConfig[index]?.color || '#22d3ee'}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default AgentCluster;
