"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { usePredatorSocket } from "@/lib/predator/usePredatorSocket";
import { PredatorChart } from "@/components/predator/PredatorChart";
import { AgentCommandCenter } from "@/components/predator/AgentCommandCenter";
import { BayesianGauge } from "@/components/predator/BayesianGauge";
import { 
  Activity, Cpu, ShieldAlert, Crosshair, 
  AlertTriangle, Clock, TrendingUp, TrendingDown,
  Globe, Info, Zap
} from "lucide-react";

export default function DashboardPage() {
  const { isConnected, lastTick, lastRegime, lastSignal } = usePredatorSocket();
  const [ticks, setTicks] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.glitchzerolabs.com";
  const headers = useMemo(() => ({ 
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    "Content-Type": "application/json"
  }), []);

  useEffect(() => {
    setIsMounted(true);
    
    const fetchInitialData = async () => {
      try {
        const [marketRes, tradeRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/v1/market/current`, { headers }),
          fetch(`${API_BASE_URL}/api/v1/execution/trades`, { headers })
        ]);

        if (marketRes.ok) {
          const data = await marketRes.json();
          if (data && (data.timestamp || data.ts)) setTicks([data]);
        }

        if (tradeRes.ok) {
          const data = await tradeRes.json();
          if (Array.isArray(data)) setSignals(data.slice(0, 10));
        }
      } catch (err) {
        console.error("Dashboard hydration failed:", err);
      }
    };

    fetchInitialData();
  }, [headers, API_BASE_URL]);

  useEffect(() => {
    if (lastTick) {
      setTicks((prev) => [...prev.slice(-199), lastTick]);
      setLastUpdate(new Date());
    }
  }, [lastTick]);

  useEffect(() => {
    if (lastSignal && lastSignal.signal !== "WAIT") {
      setSignals((prev) => [lastSignal, ...prev.slice(0, 9)]);
    }
  }, [lastSignal]);

  const latestPrice = ticks.length > 0 ? (ticks[ticks.length - 1].bid || ticks[ticks.length - 1].price) : 0;
  
  // Market Open Logic: If last tick is older than 5 mins, market is closed/stagnant
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

  if (!isMounted) return null;

  return (
    <div className="flex flex-col space-y-6 max-w-[1600px] mx-auto pb-20">
      {/* 1. Header Bar: Real-time Status */}
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

      {/* 2. Main Grid: Charts & Gauges */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Chart Terminal (8/12) */}
        <div className="xl:col-span-8 bg-[#020617] border border-white/5 rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-6 right-6 z-10 flex bg-void/40 backdrop-blur-md p-1 rounded-lg border border-white/5">
             <button className="px-4 py-1.5 rounded-md text-[10px] text-zinc-500 font-bold font-mono hover:text-white transition-all uppercase tracking-widest">M1</button>
             <button className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-md text-[10px] text-cyan-400 font-bold font-mono uppercase tracking-widest">M5</button>
          </div>
          
          <div className="p-2 h-[550px]">
            <PredatorChart data={ticks} signals={signals} />
          </div>
        </div>

        {/* Right: Decision Intelligence (4/12) */}
        <div className="xl:col-span-4 flex flex-col space-y-6">
          <div className="bg-[#020617]/80 border border-white/5 rounded-3xl p-5 shadow-2xl flex-1 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-1000" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
                  <Zap size={14} className="text-cyan-400" />
                </div>
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">
                  Bayesian Oracle
                </h3>
              </div>
              <Info size={12} className="text-zinc-700 hover:text-zinc-400 transition-colors cursor-help" />
            </div>
            
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-3 gap-2 bg-void/40 p-3 rounded-2xl border border-white/5">
                <BayesianGauge label="Long" value={lastSignal?.metadata?.probabilities?.long || 0} color="#22d3ee" />
                <BayesianGauge label="Short" value={lastSignal?.metadata?.probabilities?.short || 0} color="#f87171" />
                <BayesianGauge label="Wait" value={lastSignal?.metadata?.probabilities?.wait || 0} color="#71717a" />
              </div>
              
              <div className="grid grid-cols-1 gap-3 mt-4">
                <div className="px-4 py-3 bg-void/40 rounded-xl border border-white/5 flex items-center justify-between group/metric hover:border-teal-500/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-1.5">NLP Sentiment</span>
                    <div className="h-1 w-32 bg-zinc-900/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.abs(lastSignal?.metadata?.sentiment_context || 0) * 100}%` }}
                        className={`h-full transition-all duration-1000 ${lastSignal?.metadata?.sentiment_context < 0 ? 'bg-red-500' : 'bg-teal-500 shadow-[0_0_8px_rgba(45,212,191,0.3)]'}`}
                      />
                    </div>
                  </div>
                  <span className={`text-sm font-mono font-black ${lastSignal?.metadata?.sentiment_context < 0 ? 'text-red-400' : 'text-teal-400'}`}>
                    {(lastSignal?.metadata?.sentiment_context || 0).toFixed(2)}
                  </span>
                </div>

                <div className="px-4 py-3 bg-void/40 rounded-xl border border-white/5 flex items-center justify-between group/metric hover:border-cyan-500/30 transition-colors">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-1.5">Order Flow Imbalance</span>
                    <div className="h-1 w-32 bg-zinc-900/50 rounded-full overflow-hidden flex justify-center">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.abs(lastSignal?.metadata?.ofi_used || 0) * 100}%` }}
                        className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)]" 
                        style={{ 
                          marginLeft: lastSignal?.metadata?.ofi_used < 0 ? '-100%' : '0'
                        }} 
                      />
                    </div>
                  </div>
                  <span className="text-sm font-mono font-black text-white">
                    {(lastSignal?.metadata?.ofi_used || 0).toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Command Center & System Pulse */}
      <AgentCommandCenter agents={agentStatus as any} />
    </div>
  );
}
