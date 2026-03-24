'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowUpRight, ArrowDownRight, Pause, XCircle } from 'lucide-react';
import { SentinelData } from '../types/dashboard';

interface SignalDisplayProps {
  data: SentinelData | null;
  isLoading: boolean;
}

export default function SignalDisplay({ data, isLoading }: SignalDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-void/50 border border-white/[0.05] rounded-xl p-4 animate-pulse h-[140px]" />
    );
  }

  if (!data) {
    return (
      <div className="bg-void/50 border border-white/[0.05] rounded-xl p-4 h-[140px] flex flex-col items-center justify-center text-slate-500">
        <Shield className="w-8 h-8 mb-2 opacity-20" />
        <span className="text-sm italic">No active signal</span>
      </div>
    );
  }

  const signalConfigs = {
    LONG: {
      icon: ArrowUpRight,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20',
      label: 'Strong Long'
    },
    SHORT: {
      icon: ArrowDownRight,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/20',
      label: 'Strong Short'
    },
    HOLD: {
      icon: Pause,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20',
      label: 'Wait / Hold'
    },
    EXIT_LONG: {
      icon: XCircle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/20',
      label: 'Exit Long'
    },
    EXIT_SHORT: {
      icon: XCircle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/20',
      label: 'Exit Short'
    },
    None: {
      icon: Shield,
      color: 'text-slate-400',
      bgColor: 'bg-slate-400/10',
      borderColor: 'border-slate-400/20',
      label: 'Standby'
    }
  };

  const config = signalConfigs[data.signal] || signalConfigs.None;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-void/50 border ${config.borderColor} rounded-xl p-4 h-[140px] flex flex-col justify-between relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.03] rounded-full -mr-8 -mt-8" />
      
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1">
            Sentinel Oracle
          </p>
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
              <Icon className={`w-4 h-4 ${config.color}`} />
            </div>
            <h3 className={`text-xl font-bold tracking-tight ${config.color}`}>
              {config.label}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 mb-1">Confidence</div>
          <div className="text-lg font-mono font-bold text-slate-200">
            {data.confidence.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto">
        <div>
          <div className="text-[10px] text-slate-500">Regime Alignment</div>
          <div className="text-xs text-slate-300 font-medium truncate capitalize">
            {data.regime.toLowerCase().replace('_', ' ')}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500">DXY Correlation</div>
          <div className="text-xs text-slate-300 font-medium font-mono">
            {data.macro?.DXY?.change > 0 ? '+' : ''}{data.macro?.DXY?.change.toFixed(3)}%
          </div>
        </div>
      </div>
    </motion.div>
  );
}
