
export interface Tick {
  timestamp: string | number;
  ts?: string | number;
  bid?: number | string;
  ask?: number | string;
  price?: number | string;
  close?: number | string;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

/**
 * Aggregates tick data into OHLC candles for a given timeframe.
 * @param ticks Array of tick objects
 * @param timeframeSeconds Timeframe in seconds (default: 60 for 1m)
 * @returns Array of Candle objects
 */
export function aggregateTicksToOHLC(ticks: Tick[], timeframeSeconds: number = 60): Candle[] {
  if (!ticks || ticks.length === 0) return [];

  const candlesMap = new Map<number, { open: number; high: number; low: number; close: number }>();

  ticks.forEach((tick) => {
    const timestamp = tick.timestamp || tick.ts;
    if (!timestamp) return;

    const timeInSeconds = Math.floor(new Date(timestamp).getTime() / 1000);
    const candleTime = Math.floor(timeInSeconds / timeframeSeconds) * timeframeSeconds;
    
    const price = Number(tick.bid || tick.price || tick.close || 0);
    if (isNaN(price) || price === 0) return;

    const existing = candlesMap.get(candleTime);

    if (!existing) {
      candlesMap.set(candleTime, {
        open: price,
        high: price,
        low: price,
        close: price,
      });
    } else {
      existing.high = Math.max(existing.high, price);
      existing.low = Math.min(existing.low, price);
      existing.close = price;
    }
  });

  return Array.from(candlesMap.entries())
    .map(([time, ohlc]) => ({
      time,
      ...ohlc,
    }))
    .sort((a, b) => a.time - b.time);
}
