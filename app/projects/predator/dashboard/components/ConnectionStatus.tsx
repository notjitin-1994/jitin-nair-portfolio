'use client';

import { motion } from 'framer-motion';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { ApiHealth } from '../types/dashboard';

interface ConnectionStatusProps {
  health: ApiHealth | null;
  isLoading: boolean;
}

export default function ConnectionStatus({ health, isLoading }: ConnectionStatusProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-slate-400">
        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
        <span className="text-sm">Connecting...</span>
      </div>
    );
  }

  if (!health) {
    return (
      <div className="flex items-center gap-2 text-red-400">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm">Disconnected</span>
      </div>
    );
  }

  const statusConfig = {
    healthy: {
      icon: Wifi,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      label: 'Connected',
    },
    degraded: {
      icon: AlertTriangle,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      label: 'Degraded',
    },
    down: {
      icon: WifiOff,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      label: 'Disconnected',
    },
  };

  const config = statusConfig[health.status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor}`}
    >
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className={`text-sm ${config.color}`}>
        {config.label}
      </span>      {health.version && (
        <span className="text-xs text-slate-500 ml-2">
          v{health.version}
        </span>
      )}
    </motion.div>
  );
}
