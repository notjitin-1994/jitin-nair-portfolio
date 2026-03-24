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
      <div className="animate-pulse">
        <div className="h-10 bg-white/5 rounded w-32" />
        <div className="h-4 bg-white/5 rounded w-20 mt-2" />
      </div>
    );
  }

  if (!price) {
    return (
      <div className="text-slate-500">
        <span className="text-sm">No price data</span>
      </div>
    );
  }

  const isPositive = (price.changePercent || 0) >= 0;
  const isNegative = (price.changePercent || 0) < 0;
  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
  const colorClass = isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-slate-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-end gap-4"
    >
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
          {price.symbol || 'XAUUSD'}
        </div>
        <div className="text-3xl font-bold text-white font-mono">
          {price.price.toFixed(2)}
        </div>
      </div>

      {(price.change !== undefined || price.changePercent !== undefined) && (
        <div className={`flex items-center gap-1 ${colorClass}`}>
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {price.changePercent?.toFixed(2)}%
          </span>
          {price.change !== undefined && (
            <span className="text-xs opacity-70">
              ({price.change > 0 ? '+' : ''}{price.change.toFixed(2)})
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
