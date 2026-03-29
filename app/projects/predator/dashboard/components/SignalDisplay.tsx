'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SentinelData } from '../types/dashboard';

interface SignalDisplayProps {
  data: SentinelData | null;
  isLoading: boolean;
}

const signalMeta: Record<string, { label: string; color: string; ring: string; arrow: 'up' | 'down' | 'flat' | 'exit' }> = {
  LONG: { label: 'LONG', color: '#4ade80', ring: 'stroke-green-400', arrow: 'up' },
  ENTER_LONG: { label: 'ENTER LONG', color: '#4ade80', ring: 'stroke-green-400', arrow: 'up' },
  SHORT: { label: 'SHORT', color: '#f87171', ring: 'stroke-red-400', arrow: 'down' },
  ENTER_SHORT: { label: 'ENTER SHORT', color: '#f87171', ring: 'stroke-red-400', arrow: 'down' },
  WAIT: { label: 'WAIT', color: '#facc15', ring: 'stroke-yellow-400', arrow: 'flat' },
  HOLD: { label: 'HOLD', color: '#facc15', ring: 'stroke-yellow-400', arrow: 'flat' },
  EXIT_LONG: { label: 'EXIT LONG', color: '#fb923c', ring: 'stroke-orange-400', arrow: 'exit' },
  EXIT_SHORT: { label: 'EXIT SHORT', color: '#fb923c', ring: 'stroke-orange-400', arrow: 'exit' },
  None: { label: 'STANDBY', color: '#64748b', ring: 'stroke-slate-400', arrow: 'flat' },
};

function DirectionArrow({ direction, color }: { direction: string; color: string }) {
  if (direction === 'up') {
    return (
      <svg viewBox="0 0 80 80" className="w-20 h-20 sm:w-24 sm:h-24" fill="none">
        <path d="M40 68L40 20" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M22 36L40 16L58 36" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg viewBox="0 0 80 80" className="w-20 h-20 sm:w-24 sm:h-24" fill="none">
        <path d="M40 12L40 60" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M22 44L40 64L58 44" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (direction === 'exit') {
    return (
      <svg viewBox="0 0 80 80" className="w-20 h-20 sm:w-24 sm:h-24" fill="none">
        <path d="M20 40H60" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <path d="M46 26L60 40L46 54" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 20V60" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      </svg>
    );
  }
  // flat / standby
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20 sm:w-24 sm:h-24" fill="none">
      <path d="M20 40H60" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <circle cx="40" cy="40" r="4" fill={color} />
    </svg>
  );
}

function ConfidenceRing({ value, color, size = 80, strokeWidth = 5 }: { value: number; color: string; size?: number; strokeWidth?: number }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} fill="none" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </svg>
  );
}

function MacroBar({ label, change }: { label: string; change: number | undefined }) {
  if (change === undefined || change === null) return null;
  const isPos = change > 0;
  const barColor = isPos ? 'bg-green-400' : 'bg-red-400';
  const w = Math.min(Math.abs(change) * 500, 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-slate-500 font-mono w-12 text-right">{label}</span>
      <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${w}%`, transition: 'width 0.5s' }} />
      </div>
      <span className={`text-[10px] font-mono ${isPos ? 'text-green-400' : 'text-red-400'} w-12`}>
        {change > 0 ? '+' : ''}{(change * 100).toFixed(2)}%
      </span>
    </div>
  );
}

export default function SignalDisplay({ data, isLoading }: SignalDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-midnight border border-white/[0.06] rounded-lg p-5 animate-pulse h-[320px]" />
    );
  }

  if (!data) {
    return (
      <div className="bg-midnight border border-white/[0.06] rounded-lg p-5 h-[320px] flex flex-col items-center justify-center text-slate-600">
        <Shield className="w-10 h-10 mb-2 opacity-20" />
        <span className="text-sm">No active signal</span>
      </div>
    );
  }

  const meta = signalMeta[data.signal] || signalMeta.None;
  const macro = data.macro;
  const logic = macro?.logic || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-midnight border border-white/[0.06] rounded-lg p-5 relative overflow-hidden"
    >
      {/* Sentinel Label */}
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium mb-4">
        Sentinel Oracle
      </div>

      {/* Arrow + Signal Name */}
      <div className="flex items-center gap-4 mb-4">
        <DirectionArrow direction={meta.arrow} color={meta.color} />
        <div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold tracking-tight font-mono" style={{ color: meta.color }}>
              {meta.label}
            </div>
            {data.indicators?.strategy && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/[0.06]">
                {data.indicators.strategy.replace(/_/g, ' ')}
              </span>
            )}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {data.regime?.replace(/_/g, ' ') || 'UNKNOWN'}
          </div>
        </div>
      </div>

      {/* Confidence Ring + Macro */}
      <div className="flex items-start gap-5 mb-4">
        <div className="relative flex-shrink-0">
          <ConfidenceRing value={data.confidence || 0} color={meta.color} size={72} strokeWidth={4} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-mono font-bold text-white">{(data.confidence || 0).toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-1.5 min-w-0">
          <MacroBar label="DXY" change={macro?.data_used?.dxy_change} />
          <MacroBar label="EUR/USD" change={macro?.data_used?.eur_usd_change} />
          <MacroBar label="USD/JPY" change={macro?.data_used?.usd_jpy_change} />
        </div>
      </div>

      {/* Macro alignment badge + logic */}
      <div className="flex items-center gap-2 flex-wrap">
        {macro?.data_used?.macro_alignment !== undefined && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
            macro.data_used.macro_alignment ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'
          }`}>
            {macro.data_used.macro_alignment ? 'MACRO ALIGNED' : 'MACRO DIVERGENT'}
          </span>
        )}
        {macro?.data_used?.is_liquidity_crunch && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400">
            LIQUIDITY CRUNCH
          </span>
        )}
        {logic && (
          <span className="text-[10px] text-slate-600 font-mono truncate">{logic}</span>
        )}
      </div>
    </motion.div>
  );
}
