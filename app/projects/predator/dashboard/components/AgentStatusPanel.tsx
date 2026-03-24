'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Cpu, 
  MemoryStick,
  Clock
} from 'lucide-react';
import { AgentStatus } from '../types/dashboard';

interface AgentStatusPanelProps {
  agents: AgentStatus[];
  isLoading: boolean;
  error?: Error;
}

const statusConfig: Record<AgentStatus['status'], { icon: any; color: string; bgColor: string; borderColor: string; label: string }> = {
  running: {
    icon: CheckCircle2,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
    label: 'Active',
  },
  active: {
    icon: CheckCircle2,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20',
    label: 'Active',
  },
  stopped: {
    icon: AlertCircle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
    label: 'Stopped',
  },
  inactive: {
    icon: AlertCircle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
    label: 'Inactive',
  },
  failed: {
    icon: Activity,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/20',
    label: 'Failed',
  },
};

export default function AgentStatusPanel({ agents, isLoading, error }: AgentStatusPanelProps) {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse flex space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animation-delay-200" />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animation-delay-400" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-400">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span className="text-sm">Failed to load agents</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {agents.map((agent, index) => {
        const config = statusConfig[agent.status] || statusConfig.failed;
        const Icon = config.icon;

        return (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border ${config.borderColor} ${config.bgColor} backdrop-blur-sm`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-white/5`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-200">
                    {agent.name}
                  </h4>
                  <span className={`text-xs ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              </div>
              {agent.pid && (
                <span className="text-xs text-slate-500 font-mono">
                  PID: {agent.pid}
                </span>
              )}
            </div>

            {(agent.uptime || agent.cpu !== undefined || agent.memory !== undefined) && (
              <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-2">
                {agent.uptime && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{agent.uptime}</span>
                  </div>
                )}
                {agent.cpu !== undefined && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Cpu className="w-3 h-3" />
                    <span>{agent.cpu.toFixed(1)}%</span>
                  </div>
                )}
                {agent.memory !== undefined && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MemoryStick className="w-3 h-3" />
                    <span>{(agent.memory / 1024).toFixed(1)} MB</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );
      })}

      {agents.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-sm">
          No agents found
        </div>
      )}
    </div>
  );
}
