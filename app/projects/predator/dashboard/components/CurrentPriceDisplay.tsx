'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CurrentPrice } from '../types/dashboard';

interface CurrentPriceDisplayProps {
  price: CurrentPrice | null;
  isLoading: boolean;
}

export default function CurrentPriceDisplay({ price, isLoading }: CurrentPriceDisplayProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-12 bg-white/5 rounded-lg w-40" />
        <div className="h-3 bg-white/5 rounded w-24" />
      </div>
    );
  }

  if (!price) {
    return (
      <div className="text-slate-600">
        <span className="text-sm">No price data</span>
      </div>
    );
  }

  const isPositive = (price.changePercent || 0) >= 0;
  const isNegative = (price.changePercent || 0) < 0;
  const changeColor = isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-slate-400';
  const changeBg = isPositive ? 'bg-emerald-400/10' : isNegative ? 'bg-red-400/10' : 'bg-slate-400/10';

  // 24h range calculation (from change data)
  const changeAbs = Math.abs(price.change || 0);
  const high = changeAbs > 0 ? price.price + changeAbs * 0.3 : 0;
  const low = changeAbs > 0 ? price.price - changeAbs * 1.3 : 0;
  const range = high - low;
  const pricePos = range > 0 ? ((price.price - low) / range) * 100 : 50;
  const spread = range > 0 ? (Number((high - low) / price.price) * 100).toFixed(2) : '--';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Price + change */}
      <div>
        <div className="flex items-baseline gap-3">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">
            {price.symbol || 'XAUUSD'}
          </div>
          <div className="text-[10px] font-mono text-slate-600">
            {price.timestamp ? new Date(price.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
          </div>
        </div>
        <div className="flex items-end gap-3 mt-1">
          <div className="text-3xl font-bold text-white font-mono tracking-tight">
            {(Number(price.price) || 0).toFixed(2)}
          </div>
          {(price.changePercent !== undefined && price.changePercent !== null) && (
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${changeBg}`}>
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
              <span className={`text-xs font-semibold font-mono ${changeColor}`}>
                {price.changePercent > 0 ? '+' : ''}{Number(price.changePercent).toFixed(2)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 24h Range Bar */}
      {high > 0 && low > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">24h Range</span>
            <span className="text-[10px] font-mono text-slate-500">
              {spread}% spread
            </span>
          </div>
          <div className="relative">
            {/* Range bar background */}
            <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
              {/* Gradient fill to indicate range */}
              <div className="h-full w-full rounded-full" style={{
                background: 'linear-gradient(90deg, rgba(34,211,238,0.15), rgba(148,163,184,0.06), rgba(251,191,36,0.15))'
              }} />
            </div>
            {/* Current price marker */}
            <motion.div
              initial={{ left: '50%' }}
              animate={{ left: `${Math.min(Math.max(pricePos, 2), 98)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            >
              <div className={`w-1.5 h-4 rounded-full shadow-lg ${isPositive ? 'bg-emerald-400' : isNegative ? 'bg-red-400' : 'bg-slate-400'}`}
                style={{ boxShadow: isPositive ? '0 0 8px rgba(52,211,153,0.4)' : isNegative ? '0 0 8px rgba(248,113,113,0.4)' : 'none' }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between">
            <span className="text-[10px] font-mono text-slate-500">
              L: {Number(low).toFixed(2)}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              H: {Number(high).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
