"use client";

import { useEffect, useState, useMemo } from "react";
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

  const API_BASE_URL = "https://api.glitchzerolabs.com";

  useEffect(() => {
    setIsMounted(true);
    // Initial fetch for historical context
    fetch(`${API_BASE_URL}/api/v1/market/current`)
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.timestamp || data.ts)) setTicks([data]);
      })
      .catch((err) => console.error("Initial fetch failed", err));
      
    fetch(`${API_BASE_URL}/api/v1/execution/trades`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSignals(data.slice(0, 10));
      })
      .catch((err) => console.error("Signal fetch failed", err));
  }, []);

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
  
  const agentStatus = useMemo(() => [
    {
      name: "Hermes",
      status: isConnected ? "ONLINE" : "OFFLINE",
      icon: <Activity size={16} />,
      metrics: { "Latency": "< 1ms", "Pipe": "L2/Tick" }
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
      metrics: { "Signal": lastSignal?.signal || "WAIT", "DXY": lastRegime?.macro_dxy_proxy || 0.0 }
    },
    {
      name: "Ares",
      status: isConnected ? "ONLINE" : "OFFLINE",
      icon: <ShieldAlert size={16} />,
      metrics: { "Mode": "PAPER", "Risk": "1.0%" }
    }
  ], [isConnected, lastRegime, lastSignal]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col space-y-6 max-w-[1600px] mx-auto pb-20">
      {/* 1. Header Bar: Real-time Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-depth/50 p-4 rounded-xl border border-white/5 backdrop-blur-md">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">XAUUSD :: SPOT</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-mono font-bold text-white tabular-nums tracking-tighter">
                {latestPrice ? Number(latestPrice).toFixed(2) : "0000.00"}
              </span>
              <span className={`text-xs font-mono ${lastTick?.spread < 0.1 ? 'text-teal-400' : 'text-zinc-500'}`}>
                +{lastTick?.spread || '0.00'}
              </span>
            </div>
          </div>
          
          <div className="h-10 w-px bg-white/5 hidden md:block" />
          
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Market Intelligence</span>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${lastRegime?.regime === 'TREND_UP' ? 'bg-green-500/10 text-green-400' : lastRegime?.regime === 'TREND_DOWN' ? 'bg-red-500/10 text-red-400' : 'bg-zinc-800 text-zinc-400'}`}>
                {lastRegime?.regime || 'INITIALIZING'}
              </div>
              <span className="text-xs text-zinc-500 font-mono italic">{lastRegime?.session} Session</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {lastUpdate && (
            <div className="flex items-center space-x-2 text-zinc-500 font-mono text-[10px] bg-void/50 px-3 py-1.5 rounded-full border border-white/5">
              <Clock size={10} />
              <span>SYNC: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          )}
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${isConnected ? 'bg-teal-500/5 border-teal-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.5)]' : 'bg-red-400'}`} />
            <span className={`text-[10px] uppercase font-bold tracking-widest ${isConnected ? 'text-teal-400' : 'text-red-400'}`}>
              {isConnected ? 'Nexus Connected' : 'Nexus Link Lost'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid: Charts & Gauges */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Chart Terminal (8/12) */}
        <div className="xl:col-span-8 bg-depth border border-white/5 rounded-2xl overflow-hidden relative shadow-2xl min-h-[500px]">
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
             <button className="px-3 py-1 bg-surface/80 border border-white/10 rounded text-[10px] text-zinc-400 font-mono hover:text-cyan-400 transition-colors uppercase tracking-wider">M1</button>
             <button className="px-3 py-1 bg-void/80 border border-cyan-400/30 rounded text-[10px] text-cyan-400 font-mono uppercase tracking-wider">M5</button>
          </div>
          <div className="p-1 h-full">
            <PredatorChart data={ticks} signals={signals} />
          </div>
        </div>

        {/* Right: Decision Intelligence (4/12) */}
        <div className="xl:col-span-4 flex flex-col space-y-6">
          <div className="bg-depth border border-white/5 rounded-2xl p-6 shadow-2xl flex-1">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em] flex items-center">
                <Zap size={14} className="mr-2 text-cyan-400" />
                Bayesian Oracle
              </h3>
              <Info size={14} className="text-zinc-600 cursor-help" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-4">
              <div className="grid grid-cols-3 gap-4">
                <BayesianGauge label="Long" value={lastSignal?.metadata?.probabilities?.long || 0} color="#22d3ee" />
                <BayesianGauge label="Short" value={lastSignal?.metadata?.probabilities?.short || 0} color="#f87171" />
                <BayesianGauge label="Wait" value={lastSignal?.metadata?.probabilities?.wait || 0} color="#71717a" />
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="p-4 bg-void/40 rounded-xl border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Sentiment Bias (FinBERT)</span>
                    <span className={`text-xs font-mono ${lastSignal?.metadata?.sentiment_context < 0 ? 'text-red-400' : 'text-teal-400'}`}>
                      {(lastSignal?.metadata?.sentiment_context || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${lastSignal?.metadata?.sentiment_context < 0 ? 'bg-red-500' : 'bg-teal-500'}`}
                      style={{ width: `${Math.abs(lastSignal?.metadata?.sentiment_context || 0) * 100}%` }} 
                    />
                  </div>
                </div>

                <div className="p-4 bg-void/40 rounded-xl border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Order Flow Imbalance (OFI)</span>
                    <span className="text-xs font-mono text-white">
                      {(lastSignal?.metadata?.ofi_used || 0).toFixed(3)}
                    </span>
                  </div>
                  <div className="h-1 bg-zinc-900 rounded-full overflow-hidden flex justify-center">
                    <div 
                      className="h-full bg-cyan-400 transition-all duration-500" 
                      style={{ 
                        width: `${Math.abs(lastSignal?.metadata?.ofi_used || 0) * 100}%`,
                        marginLeft: lastSignal?.metadata?.ofi_used < 0 ? '-100%' : '0'
                      }} 
                    />
                  </div>
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
