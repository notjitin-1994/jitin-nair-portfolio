'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../context/DashboardContext';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// ============================================================================
// PriceTicker - Compact Institutional Real-time Price Display
// ============================================================================

const AnimatedPrice = memo(function AnimatedPrice({ price, className }: { price: number; className?: string }) {
  const prevPrice = useRef(price);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (price > prevPrice.current) {
      setFlash('up');
    } else if (price < prevPrice.current) {
      setFlash('down');
    }
    prevPrice.current = price;

    const timer = setTimeout(() => setFlash(null), 300);
    return () => clearTimeout(timer);
  }, [price]);

  return (
    <span
      className={`${className} transition-colors duration-150`}
      style={{
        color: flash === 'up' ? '#10b981' : flash === 'down' ? '#ef4444' : '#ffffff',
      }}
    >
      {price.toFixed(2)}
    </span>
  );
});

const Sparkline = memo(function Sparkline({ data, width = 80, height = 28 }: { data: number[]; width?: number; height?: number }) {
  if (data.length < 2) return <div className="bg-white/[0.04] rounded" style={{ width, height }} />;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const isUp = data[data.length - 1] >= data[0];

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`sparkline-gradient-${isUp ? 'up' : 'down'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
          <stop offset="100%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={isUp ? '#10b981' : '#ef4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#sparkline-gradient-${isUp ? 'up' : 'down'})`}
      />
    </svg>
  );
});

const PriceChangeBadge = memo(function PriceChangeBadge({ change, changePercent }: { change?: number; changePercent?: number }) {
  const safeChange = change ?? 0;
  const safeChangePercent = changePercent ?? 0;
  const isPositive = safeChange >= 0;

  return (
    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${
      isPositive ? 'bg-emerald-500/10' : 'bg-red-500/10'
    }`}>
      {isPositive ? (
        <ArrowUpRight className="w-2.5 h-2.5 text-emerald-400" />
      ) : (
        <ArrowDownRight className="w-2.5 h-2.5 text-red-400" />
      )}
      <span className={`text-[9px] font-mono font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
        {isPositive ? '+' : ''}{safeChange.toFixed(2)} ({isPositive ? '+' : ''}{safeChangePercent.toFixed(2)}%)
      </span>
    </div>
  );
});

const PriceTicker = memo(function PriceTicker() {
  const { price, connectionStatus } = useDashboard();
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const maxHistory = 30;

  // Update price history
  useEffect(() => {
    if (price?.price) {
      setPriceHistory(prev => {
        const updated = [...prev, price.price];
        if (updated.length > maxHistory) {
          return updated.slice(-maxHistory);
        }
        return updated;
      });
    }
  }, [price?.price]);

  const isLoading = connectionStatus === 'connecting';
  const hasError = connectionStatus === 'error';

  // Calculate 24h range visualization
  const low24h = priceHistory.length > 0 ? Math.min(...priceHistory) : price?.price ? price.price * 0.995 : 0;
  const high24h = priceHistory.length > 0 ? Math.max(...priceHistory) : price?.price ? price.price * 1.005 : 0;
  const rangePosition = price?.price && high24h !== low24h
    ? ((price.price - low24h) / (high24h - low24h)) * 100
    : 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden"
    >
      {/* Compact Header */}
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Activity className="w-3 h-3 text-amber-400" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              XAU/USD
            </h3>
            <p className="text-[9px] text-slate-600">Gold Spot</p>
          </div>
          <div className="ml-auto">
            {connectionStatus === 'connected' && (
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] text-emerald-400">Live</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-white/[0.04] rounded" />
            <div className="h-6 bg-white/[0.04] rounded" />
          </div>
        ) : hasError ? (
          <div className="py-6 text-center">
            <p className="text-[10px] text-slate-500">Price feed unavailable</p>
          </div>
        ) : price ? (
          <div className="space-y-3">
            {/* Compact Main Price Display */}
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold font-mono tracking-tight">
                    <AnimatedPrice price={price.price} />
                  </span>
                  <span className="text-[10px] text-slate-500">USD</span>
                </div>
                <div className="mt-1">
                  <PriceChangeBadge change={price.change} changePercent={price.changePercent} />
                </div>
              </div>
              <div className="hidden sm:block">
                <Sparkline data={priceHistory} />
              </div>
            </div>

            {/* Compact 24h Range Bar */}
            <div className="space-y-1.5 pt-2 border-t border-white/[0.04]">
              <div className="flex items-center justify-between text-[8px] text-slate-500">
                <span>L: {low24h.toFixed(2)}</span>
                <span>24h Range</span>
                <span>H: {high24h.toFixed(2)}</span>
              </div>
              <div className="relative h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-amber-400/20 to-emerald-400/20" />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white rounded-full transition-all duration-300"
                  style={{ left: `${rangePosition}%` }}
                />
              </div>
            </div>

            {/* Compact Bid/Ask Spread */}
            {(price.bid || price.ask) && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.04]">
                <div className="bg-void/50 rounded px-2 py-1.5">
                  <div className="text-[8px] text-slate-500 uppercase tracking-wider">Bid</div>
                  <div className="text-xs font-mono text-emerald-400/80">
                    {price.bid?.toFixed(2) || '--'}
                  </div>
                </div>
                <div className="bg-void/50 rounded px-2 py-1.5">
                  <div className="text-[8px] text-slate-500 uppercase tracking-wider">Ask</div>
                  <div className="text-xs font-mono text-red-400/80">
                    {price.ask?.toFixed(2) || '--'}
                  </div>
                </div>
              </div>
            )}

            {/* Compact Spread */}
            {price.spread && (
              <div className="text-center pt-1">
                <span className="text-[8px] text-slate-500">
                  Spread: <span className="font-mono text-slate-400">{price.spread.toFixed(2)}</span>
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center text-slate-500">
            <p className="text-[10px]">Waiting for price data...</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default PriceTicker;
