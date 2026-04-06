"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { usePredatorSocket } from "@/lib/predator/usePredatorSocket";
import { PredatorChart } from "@/components/predator/PredatorChart";
import { AgentCommandCenter } from "@/components/predator/AgentCommandCenter";
import { BayesianGauge } from "@/components/predator/BayesianGauge";
import { Tooltip } from "@/components/ui/Tooltip";
import { 
  Activity, Cpu, ShieldAlert, Crosshair, 
  Info, Zap
} from "lucide-react";

export default function DashboardPage() {
  const { isConnected, lastTick, lastRegime, lastSignal } = usePredatorSocket();
  const [candles, setCandles] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [timeframe, setTimeframe] = useState<string>("m1");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.glitchzerolabs.com";
  const headers = useMemo(() => ({ 
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    "Content-Type": "application/json"
  }), []);

  const fetchHistory = useCallback(async (pageNum: number, currentTF: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/data/market_bars_${currentTF}?limit=500&page=${pageNum}`, { headers });
      if (res.ok) {
        const result = await res.json();
        const formatted = result.data.map((d: any) => ({
          time: Math.floor(new Date(d.timestamp).getTime() / 1000),
          open: parseFloat(d.open),
          high: parseFloat(d.high),
          low: parseFloat(d.low),
          close: parseFloat(d.close),
          volume: parseFloat(d.volume)
        })).sort((a: any, b: any) => a.time - b.time);
        
        return formatted;
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
    return [];
  }, [API_BASE_URL, headers]);

  useEffect(() => {
    setIsMounted(true);
    
    const fetchInitialData = async () => {
      try {
        const [initialCandles, tradeRes] = await Promise.all([
          fetchHistory(1, timeframe),
          fetch(`${API_BASE_URL}/api/v1/data/trades?limit=100`, { headers })
        ]);

        setCandles(initialCandles);
        setPage(1);
        setHasMore(initialCandles.length === 500);

        if (tradeRes.ok) {
          const result = await tradeRes.json();
          if (Array.isArray(result.data)) {
            const formattedSignals = result.data.map((sig: any) => ({
              ...sig,
              timestamp: sig.timestamp || sig.entry_time
            }));
            setSignals(formattedSignals);
          }
        }
      } catch (err) {
        console.error("Dashboard hydration failed:", err);
      }
    };

    fetchInitialData();
  }, [headers, API_BASE_URL, timeframe, fetchHistory]);

  const loadMoreHistory = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;
    const moreCandles = await fetchHistory(nextPage, timeframe);
    if (moreCandles.length > 0) {
      setCandles(prev => {
        const combined = [...moreCandles, ...prev];
        const unique = Array.from(new Map(combined.map(c => [c.time, c])).values())
          .sort((a: any, b: any) => a.time - b.time);
        return unique;
      });
      setPage(nextPage);
      setHasMore(moreCandles.length === 500);
    } else {
      setHasMore(false);
    }
    setIsLoadingMore(false);
  }, [page, timeframe, fetchHistory, isLoadingMore, hasMore]);

  // Handle real-time ticks
  useEffect(() => {
    if (lastTick && candles.length > 0) {
      const price = parseFloat(lastTick.bid || lastTick.price);
      const ts = Math.floor(new Date(lastTick.ts || lastTick.timestamp).getTime() / 1000);
      const tfSeconds = timeframe === 'm1' ? 60 : timeframe === 'm5' ? 300 : 900;
      const candleTime = Math.floor(ts / tfSeconds) * tfSeconds;

      setCandles(prev => {
        const lastCandle = prev[prev.length - 1];
        if (lastCandle && lastCandle.time === candleTime) {
          const updated = {
            ...lastCandle,
            high: Math.max(lastCandle.high, price),
            low: Math.min(lastCandle.low, price),
            close: price
          };
          return [...prev.slice(0, -1), updated];
        } else if (!lastCandle || candleTime > lastCandle.time) {
          const newCandle = {
            time: candleTime,
            open: price,
            high: price,
            low: price,
            close: price,
            volume: 0
          };
          return [...prev, newCandle];
        }
        return prev;
      });
      setLastUpdate(new Date());
    }
  }, [lastTick, timeframe, candles.length]);

  useEffect(() => {
    if (lastSignal && lastSignal.signal !== "WAIT") {
      setSignals((prev) => [{ ...lastSignal, timestamp: lastSignal.timestamp || new Date().toISOString() }, ...prev.slice(0, 99)]);
    }
  }, [lastSignal]);

  const latestPrice = lastTick ? (lastTick.bid || lastTick.price) : (candles.length > 0 ? candles[candles.length - 1].close : 0);
  const isMarketOpen = lastUpdate ? (new Date().getTime() - lastUpdate.getTime()) < 300000 : false;

  const agentStatus = useMemo(() => [
    {
      name: "Hermes",
      status: isConnected ? (isMarketOpen ? "ONLINE" : "STANDBY") : "OFFLINE",
      icon: <Activity size={16} />,
      metrics: { "Latency": "< 1ms", "Status": isMarketOpen ? "Active" : "Market Closed" }
    },
    {
      name: "Argus",
      status: lastRegime ? "ONLINE" : "SYNCING",
      icon: <Cpu size={16} />,
      metrics: { "Regime": lastRegime?.regime || "---", "Conf": lastRegime ? `${(lastRegime.confidence * 100).toFixed(0)}%` : "---" }
    },
    {
      name: "Apollo",
      status: lastSignal ? "ONLINE" : "SYNCING",
      icon: <Crosshair size={16} />,
      metrics: { "Signal": lastSignal?.signal || "WAIT", "DXY": lastRegime?.macro_dxy_proxy?.toFixed(6) || 0.0 }
    },
    {
      name: "Ares",
      status: isConnected ? "ONLINE" : "OFFLINE",
      icon: <ShieldAlert size={16} />,
      metrics: { "Mode": "PAPER", "Risk": "1.0%" }
    }
  ], [isConnected, lastRegime, lastSignal, isMarketOpen]);

  const handleTimeframeChange = (tf: string) => {
    setTimeframe(tf);
    setPage(1);
    setHasMore(true);
    setCandles([]); // Clear while loading
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col space-y-6 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-depth/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-1">XAUUSD :: LIVE SPOT</span>
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-mono font-bold text-white tabular-nums tracking-tighter leading-none">
                {latestPrice ? Number(latestPrice).toFixed(2) : "0000.00"}
              </span>
              <span className={`text-sm font-mono font-bold ${lastTick?.spread < 0.1 ? 'text-teal-400' : 'text-zinc-500'}`}>
                {lastTick?.spread ? `+${Number(lastTick.spread).toFixed(2)}` : '0.00'}
              </span>
            </div>
          </div>
          <div className="h-12 w-px bg-white/10 hidden lg:block" />
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-1">Current Intelligence</span>
            <div className="flex items-center space-x-3 mt-1">
              <div className={`px-3 py-1 rounded-md text-[11px] font-black tracking-wider uppercase ${lastRegime?.regime === 'TREND_UP' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : lastRegime?.regime === 'TREND_DOWN' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-zinc-800/50 text-zinc-400 border border-white/5'}`}>
                {lastRegime?.regime || 'INITIALIZING'}
              </div>
              <span className="text-xs text-zinc-400 font-mono font-medium opacity-60">
                {lastRegime?.session ? `${lastRegime.session} SESSION` : 'WAKING AGENTS...'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className={`flex flex-col items-end hidden sm:flex`}>
             <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest mb-1">System Health</span>
             <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-zinc-400">{isConnected ? 'Uptime: 100%' : 'Reconnecting...'}</span>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.4)]' : 'bg-red-500'}`} />
             </div>
          </div>
          <div className={`px-4 py-2 rounded-xl border transition-all duration-500 ${isConnected ? 'bg-teal-500/5 border-teal-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
            <span className={`text-[11px] uppercase font-black tracking-[0.15em] ${isConnected ? 'text-teal-400' : 'text-red-400'}`}>
              {isConnected ? 'Nexus Online' : 'Nexus Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-8 bg-[#020617] border border-white/5 rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-4 right-4 z-30 flex bg-void/40 backdrop-blur-md p-1 rounded-lg border border-white/5">
             <button 
              onClick={() => handleTimeframeChange("m1")}
              className={`px-3 py-1 rounded-md text-[9px] font-bold font-mono transition-all uppercase tracking-widest ${timeframe === 'm1' ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' : 'text-zinc-500 hover:text-white'}`}
            >
              M1
            </button>
             <button 
              onClick={() => handleTimeframeChange("m5")}
              className={`px-3 py-1 rounded-md text-[9px] font-bold font-mono transition-all uppercase tracking-widest ${timeframe === 'm5' ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' : 'text-zinc-500 hover:text-white'}`}
            >
              M5
            </button>
             <button 
              onClick={() => handleTimeframeChange("m15")}
              className={`px-3 py-1 rounded-md text-[9px] font-bold font-mono transition-all uppercase tracking-widest ${timeframe === 'm15' ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' : 'text-zinc-500 hover:text-white'}`}
            >
              M15
            </button>
          </div>
          <div className="p-1 h-[380px]">
            <PredatorChart 
              data={candles} 
              signals={signals} 
              onLoadMore={loadMoreHistory} 
              hasMore={hasMore} 
              isLoadingMore={isLoadingMore}
              isOHLC={true}
            />
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="bg-[#020617]/80 border border-white/5 rounded-3xl p-4 shadow-2xl h-[380px] backdrop-blur-xl relative overflow-hidden group flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-1000" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <Zap size={12} className="text-cyan-400" />
                </div>
                <h3 className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.25em]">
                  Bayesian Oracle
                </h3>
              </div>
              <Tooltip content="Synthesizes market regime with real-time order flow and sentiment to calculate posterior probabilities. Uses adaptive thresholding to filter noise.">
                <Info size={11} className="text-zinc-700 hover:text-zinc-400 transition-colors cursor-help" />
              </Tooltip>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-1.5 bg-void/40 p-2 rounded-2xl border border-white/5">
                <BayesianGauge label="Long" value={lastSignal?.metadata?.probabilities?.long || 0} color="#22d3ee" />
                <BayesianGauge label="Short" value={lastSignal?.metadata?.probabilities?.short || 0} color="#f87171" />
                <BayesianGauge label="Wait" value={lastSignal?.metadata?.probabilities?.wait || 0} color="#71717a" />
              </div>
              <div className="grid grid-cols-1 gap-2 mt-auto">
                <div className="px-3 py-2 bg-void/40 rounded-xl border border-white/5 flex items-center justify-between group/metric hover:border-teal-500/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mb-1">Sentiment</span>
                    <div className="h-1 w-24 bg-zinc-900/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.abs(lastSignal?.metadata?.sentiment_context || 0) * 100}%` }}
                        className={`h-full transition-all duration-1000 ${lastSignal?.metadata?.sentiment_context < 0 ? 'bg-red-500' : 'bg-teal-500'}`}
                      />
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-black ${lastSignal?.metadata?.sentiment_context < 0 ? 'text-red-400' : 'text-teal-400'}`}>
                    {(lastSignal?.metadata?.sentiment_context || 0).toFixed(2)}
                  </span>
                </div>
                <div className="px-3 py-2 bg-void/40 rounded-xl border border-white/5 flex items-center justify-between group/metric hover:border-cyan-500/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mb-1">Imbalance</span>
                    <div className="h-1 w-24 bg-zinc-900/50 rounded-full overflow-hidden flex justify-center">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.abs(lastSignal?.metadata?.ofi_used || 0) * 100}%` }}
                        className="h-full bg-cyan-400" 
                        style={{ 
                          marginLeft: lastSignal?.metadata?.ofi_used < 0 ? '-100%' : '0'
                        }} 
                      />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-black text-white">
                    {(lastSignal?.metadata?.ofi_used || 0).toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AgentCommandCenter agents={agentStatus as any} />
    </div>
  );
}
