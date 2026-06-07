'use client';

import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { Wifi, WifiOff, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export default function ConnectionStatus() {
  const { connectionStatus, reconnect, lastUpdate } = useDashboard();

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: Wifi,
          color: 'text-emerald-400',
          bgColor: 'bg-emerald-400/10',
          borderColor: 'border-emerald-400/20',
          label: 'Live',
        };
      case 'connecting':
        return {
          icon: Loader2,
          color: 'text-amber-400',
          bgColor: 'bg-amber-400/10',
          borderColor: 'border-amber-400/20',
          label: 'Connecting...',
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-400',
          bgColor: 'bg-red-400/10',
          borderColor: 'border-red-400/20',
          label: 'Error',
        };
      case 'disconnected':
      default:
        return {
          icon: WifiOff,
          color: 'text-slate-500',
          bgColor: 'bg-slate-500/10',
          borderColor: 'border-slate-500/20',
          label: 'Disconnected',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const timeAgo = lastUpdate
    ? new Date(lastUpdate).toLocaleTimeString()
    : '--:--:--';

  return (
    <div className="flex items-center gap-3">
      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.bgColor} ${config.borderColor}`}
      >
        <Icon className={`w-3.5 h-3.5 ${config.color} ${connectionStatus === 'connecting' ? 'animate-spin' : ''}`} />
        <span className={`text-[11px] font-medium ${config.color}`}>{config.label}</span>
      </motion.div>

      {/* Last Update */}
      <div className="hidden md:flex items-center gap-1.5 text-[10px] text-slate-600 font-mono">
        <span>{timeAgo}</span>
      </div>

      {/* Reconnect Button (only show when disconnected or error) */}
      {(connectionStatus === 'disconnected' || connectionStatus === 'error') && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={reconnect}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="text-[11px] font-medium">Reconnect</span>
        </motion.button>
      )}
    </div>
  );
}
