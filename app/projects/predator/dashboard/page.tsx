"use client";

import { useEffect, useState, useMemo } from "react";
import { usePredatorSocket } from "@/lib/predator/usePredatorSocket";
import { PredatorChart } from "@/components/predator/PredatorChart";
import { AgentCommandCenter } from "@/components/predator/AgentCommandCenter";
import { Activity, Cpu, ShieldAlert, Crosshair, AlertTriangle, Clock } from "lucide-react";

export default function DashboardPage() {
  const { isConnected, lastTick, lastRegime, lastSignal, setLastRegime, setLastSignal } = usePredatorSocket();
  const [ticks, setTicks] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const API_BASE_URL = "https://api.glitchzerolabs.com";

  useEffect(() => {
    setIsMounted(true);
    
    // 1. Initial Market data fetch
    fetch(`${API_BASE_URL}/api/v1/market/current`)
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.timestamp || data.ts)) {
           setTicks([data]);
           setLastUpdate(new Date());
        }
      })
      .catch((err) => console.error("Initial fetch failed", err));

    // 2. Initial Intelligence fetch (Bootstrap state)
    fetch(`${API_BASE_URL}/api/v1/intelligence/regime`)
      .then(res => res.json())
      .then(data => { if (data && data.regime) setLastRegime(data); })
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/v1/intelligence/signal`)
      .then(res => res.json())
      .then(data => { if (data && data.signal) setLastSignal(data); })
      .catch(() => {});

  }, []);

  useEffect(() => {
    if (lastTick) {
      setTicks((prev) => [...prev.slice(-99), lastTick]);
      setLastUpdate(new Date());
    }
  }, [lastTick]);

  useEffect(() => {
    if (lastRegime || lastSignal) {
      setLastUpdate(new Date());
    }
  }, [lastRegime, lastSignal]);

  const latestPrice = ticks.length > 0 ? (ticks[ticks.length - 1].bid || ticks[ticks.length - 1].price) : 0;
  
  const agentStatus = useMemo(() => [
    {
      name: "Hermes (Ingestion)",
      status: isConnected ? "ONLINE" : "OFFLINE",
      icon: <Activity size={18} />,
      metrics: {
        "Latency": "< 5ms",
        "Source": "cTrader Live"
      }
    },
    {
      name: "Argus (Regime)",
      status: lastRegime ? "ONLINE" : "SYNCING",
      icon: <Cpu size={18} />,
      metrics: {
        "Consensus": lastRegime?.regime || "N/A",
        "Confidence": lastRegime ? `${(lastRegime.confidence * 100).toFixed(1)}%` : "N/A",
        "DXY Proxy": lastRegime ? (typeof lastRegime.macro_dxy_proxy === 'number' ? lastRegime.macro_dxy_proxy.toFixed(6) : lastRegime.macro_dxy_proxy) : "N/A"
      }
    },
    {
      name: "Apollo (Oracle)",
      status: lastSignal ? "ONLINE" : "SYNCING",
      icon: <Crosshair size={18} />,
      metrics: {
        "Latest Signal": lastSignal?.signal || "N/A",
        "Confidence": lastSignal ? `${(lastSignal.confidence * 100).toFixed(1)}%` : "N/A",
        "OFI": typeof (lastSignal?.metadata?.ofi_used || lastSignal?.ofi_used) === 'number' ? (lastSignal?.metadata?.ofi_used || lastSignal?.ofi_used).toFixed(3) : "N/A"
      }
    },
    {
      name: "Ares (Execution)",
      status: isConnected ? "ONLINE" : "OFFLINE",
      icon: <ShieldAlert size={18} />,
      metrics: {
        "Mode": "PAPER",
        "Risk": "1.0% per trade",
        "Open Trades": "0"
      }
    }
  ], [isConnected, lastRegime, lastSignal]);

  if (!isMounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif text-white uppercase tracking-tighter">
          Tactical Command <span className="text-cyan-400">Matrix</span>
        </h2>
        <div className="flex items-center space-x-4">
          {lastUpdate && (
            <div className="flex items-center space-x-2 text-zinc-500 font-mono text-xs border-r border-zinc-800 pr-4">
              <Clock size={12} />
              <span>SYNC: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500 animate-pulse"}`} />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
        </div>
      </div>

      <div className="bg-depth border border-cyan-400/20 rounded-xl p-4 overflow-hidden relative shadow-2xl">
         <div className="absolute top-6 left-6 z-10 bg-void/90 border border-cyan-400/30 p-4 rounded backdrop-blur-xl">
            <h3 className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">XAUUSD :: LIVE</h3>
            <p className="text-3xl font-mono text-white font-bold">
              {latestPrice ? Number(latestPrice).toFixed(2) : "0000.00"}
            </p>
         </div>
        <PredatorChart data={ticks} />
      </div>

      <AgentCommandCenter agents={agentStatus as any} />
      
      {(lastSignal?.metadata || lastSignal?.probabilities || lastSignal?.signal) && (
        <div className="bg-surface/30 border border-zinc-800/50 rounded-xl p-6 mt-6 backdrop-blur-sm">
          <h3 className="text-xs font-mono text-zinc-500 uppercase mb-6 flex items-center tracking-[0.2em]">
            <AlertTriangle size={14} className="mr-2 text-yellow-500" />
            Bayesian Probability Engine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-4 bg-void/50 rounded-lg border border-green-500/10 hover:border-green-500/30 transition-colors">
               <div className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-widest">P(Long)</div>
               <div className="text-2xl text-green-400 font-mono font-bold">{( (lastSignal.metadata?.probabilities?.long || lastSignal.probabilities?.long || 0) * 100).toFixed(2)}%</div>
               <div className="mt-2 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${((lastSignal.metadata?.probabilities?.long || lastSignal.probabilities?.long || 0) * 100)}%` }} />
               </div>
             </div>
             <div className="p-4 bg-void/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition-colors">
               <div className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-widest">P(Short)</div>
               <div className="text-2xl text-red-400 font-mono font-bold">{((lastSignal.metadata?.probabilities?.short || lastSignal.probabilities?.short || 0) * 100).toFixed(2)}%</div>
               <div className="mt-2 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${((lastSignal.metadata?.probabilities?.short || lastSignal.probabilities?.short || 0) * 100)}%` }} />
               </div>
             </div>
             <div className="p-4 bg-void/50 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors">
               <div className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-widest">P(Wait)</div>
               <div className="text-2xl text-yellow-400 font-mono font-bold">{((lastSignal.metadata?.probabilities?.wait || lastSignal.probabilities?.wait || 0) * 100).toFixed(2)}%</div>
               <div className="mt-2 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${((lastSignal.metadata?.probabilities?.wait || lastSignal.probabilities?.wait || 0) * 100)}%` }} />
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
