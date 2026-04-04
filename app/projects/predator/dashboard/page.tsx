"use client";

import { useEffect, useState, useMemo } from "react";
import { usePredatorSocket } from "@/lib/predator/usePredatorSocket";
import { PredatorChart } from "@/components/predator/PredatorChart";
import { AgentCommandCenter } from "@/components/predator/AgentCommandCenter";
import { Activity, Cpu, ShieldAlert, Crosshair, AlertTriangle, Clock, TrendingUp, TrendingDown, DollarSign, Zap, ZapOff, Scale } from "lucide-react";

export default function DashboardPage() {
  const { isConnected, lastTick, lastRegime, lastSignal, setLastRegime, setLastSignal } = usePredatorSocket();
  const [ticks, setTicks] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [account, setAccount] = useState<any>(null);

  const API_BASE_URL = "https://api.glitchzerolabs.com";
  const headers = useMemo(() => ({ 
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    "Content-Type": "application/json"
  }), []);

  const fetchAccountStats = () => {
    fetch(`${API_BASE_URL}/api/v1/execution/account`, { headers })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setAccount(data))
      .catch(() => setAccount(null));
  };

  useEffect(() => {
    setIsMounted(true);
    fetch(`${API_BASE_URL}/api/v1/market/current`, { headers })
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => {
        if (data && (data.timestamp || data.ts)) {
           setTicks([data]);
           setLastUpdate(new Date());
        }
      }).catch(() => {});

    fetch(`${API_BASE_URL}/api/v1/intelligence/regime`, { headers })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => { if (data && data.regime) setLastRegime(data); })
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/v1/intelligence/signal`, { headers })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => { if (data && data.signal) setLastSignal(data); })
      .catch(() => {});

    fetchAccountStats();
    const interval = setInterval(fetchAccountStats, 10000);
    return () => clearInterval(interval);
  }, [headers]);

  useEffect(() => {
    if (lastTick) {
      setTicks((prev) => [...prev.slice(-99), lastTick]);
      setLastUpdate(new Date());
    }
  }, [lastTick]);

  // UX HELPERS
  const getSentimentLabel = (score: number) => {
    if (score > 0.5) return "STRONG BUY BIAS";
    if (score > 0.1) return "CAUTIOUS BUY";
    if (score < -0.5) return "STRONG SELL BIAS";
    if (score < -0.1) return "CAUTIOUS SELL";
    return "NEUTRAL MOOD";
  };

  const getRegimeStrategy = (regime: string) => {
    switch (regime) {
      case "TREND_UP": return "TREND FOLLOWING (LONG)";
      case "TREND_DOWN": return "TREND FOLLOWING (SHORT)";
      case "VOLATILE": return "MEAN REVERSION ACTIVE";
      case "RANGE": return "SCALPING CHANNEL";
      default: return "ANALYZING...";
    }
  };

  const latestPrice = ticks.length > 0 ? (ticks[ticks.length - 1].bid || ticks[ticks.length - 1].price) : 0;
  
  const agentStatus = useMemo(() => [
    {
      name: "Hermes (Ingestion)",
      status: isConnected ? "ONLINE" : "OFFLINE",
      icon: <Activity size={18} className={isConnected ? "text-cyan-400" : "text-zinc-600"} />,
      metrics: {
        "Data Stream": isConnected ? "L1/L2 BINARY" : "DISCONNECTED",
        "Pipeline": "ULTRA-LOW LATENCY",
        "Health": isConnected ? "100%" : "0%"
      }
    },
    {
      name: "Argus (Regime)",
      status: lastRegime ? "ONLINE" : "SYNCING",
      icon: <Cpu size={18} className={lastRegime ? "text-purple-400" : "text-zinc-600"} />,
      metrics: {
        "Strategy": getRegimeStrategy(lastRegime?.regime),
        "Confidence": lastRegime ? `${((lastRegime.confidence || 0) * 100).toFixed(0)}%` : "N/A",
        "Macro Bias": (lastRegime?.macro_dxy_proxy || 0) > 0 ? "DXY STRONG" : "DXY WEAK"
      }
    },
    {
      name: "Apollo (Oracle)",
      status: lastSignal ? "ONLINE" : "SYNCING",
      icon: <Crosshair size={18} className={lastSignal ? "text-emerald-400" : "text-zinc-600"} />,
      metrics: {
        "Action Bias": getSentimentLabel(lastSignal?.metadata?.sentiment_used || lastSignal?.sentiment_used || 0),
        "Confidence": lastSignal ? `${((lastSignal.confidence || 0) * 100).toFixed(0)}%` : "N/A",
        "Signal Age": "LIVE"
      }
    },
    {
      name: "Ares (Execution)",
      status: isConnected ? "ONLINE" : "OFFLINE",
      icon: <ShieldAlert size={18} className={isConnected ? "text-orange-400" : "text-zinc-600"} />,
      metrics: {
        "Risk Rule": "1.0% MAX",
        "Drawdown": account?.balance ? `${(((parseFloat(account.peak_balance) - parseFloat(account.balance)) / parseFloat(account.peak_balance)) * 100).toFixed(2)}%` : "0.00%",
        "Exposure": (account?.open_positions || 0) > 0 ? "ACTIVE" : "NONE"
      }
    }
  ], [isConnected, lastRegime, lastSignal, account]);

  if (!isMounted) return null;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif text-white uppercase tracking-tighter">
          Tactical Command <span className="text-cyan-400">Matrix</span>
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500 animate-pulse"}`} />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
        </div>
      </div>

      {/* PRICE HUD */}
      <div className="bg-depth border border-cyan-400/20 rounded-xl p-4 overflow-hidden relative shadow-2xl">
         <div className="absolute top-6 left-6 z-10 bg-void/90 border border-cyan-400/30 p-4 rounded backdrop-blur-xl">
            <div className="flex items-center space-x-2 mb-1">
               <Zap size={12} className="text-yellow-400 fill-yellow-400" />
               <h3 className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.2em]">XAUUSD :: LIVE FEED</h3>
            </div>
            <p className="text-4xl font-mono text-white font-bold tracking-tighter">
              {latestPrice ? Number(latestPrice).toFixed(2) : "0000.00"}
            </p>
         </div>
        <PredatorChart data={ticks} />
      </div>

      {/* TOP LEVEL CAPITAL HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-surface/40 border border-zinc-800/50 p-6 rounded-xl backdrop-blur-sm group hover:border-cyan-400/30 transition-all">
            <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Available Capital</span>
               <DollarSign size={14} className="text-cyan-400" />
            </div>
            <div className="text-3xl font-mono text-white font-bold tracking-tighter">
               ${account?.balance ? parseFloat(account.balance).toLocaleString(undefined, {minimumFractionDigits: 2}) : "0.00"}
            </div>
         </div>

         <div className="bg-surface/40 border border-zinc-800/50 p-6 rounded-xl backdrop-blur-sm group hover:border-emerald-400/30 transition-all">
            <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Realized Session PnL</span>
               {(account?.daily_pnl || 0) >= 0 ? <TrendingUp size={14} className="text-green-400" /> : <TrendingDown size={14} className="text-red-400" />}
            </div>
            <div className={`text-3xl font-mono font-bold tracking-tighter ${(account?.daily_pnl || 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
               {(account?.daily_pnl || 0) >= 0 ? "+" : ""}${account?.daily_pnl ? parseFloat(account.daily_pnl).toFixed(2) : "0.00"}
            </div>
         </div>

         <div className="bg-surface/40 border border-zinc-800/50 p-6 rounded-xl backdrop-blur-sm group hover:border-yellow-400/30 transition-all">
            <div className="flex items-center justify-between mb-4">
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Tactical Bias</span>
               <Scale size={14} className="text-purple-400" />
            </div>
            <div className="text-xl font-mono text-white font-bold uppercase tracking-tighter mt-2">
               {getSentimentLabel(lastSignal?.metadata?.sentiment_used || lastSignal?.sentiment_used || 0)}
            </div>
         </div>
      </div>

      <AgentCommandCenter agents={agentStatus as any} />
      
      {(lastSignal?.metadata || lastSignal?.probabilities || lastSignal?.signal) && (
        <div className="bg-surface/30 border border-zinc-800/50 rounded-xl p-6 backdrop-blur-sm shadow-xl">
          <h3 className="text-xs font-mono text-zinc-500 uppercase mb-6 flex items-center tracking-[0.2em]">
            <AlertTriangle size={14} className="mr-2 text-yellow-500" />
            Bayesian Probability Engine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Bayesian Blocks with better labels */}
             <div className="p-4 bg-void/50 rounded-lg border border-green-500/10">
               <div className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-widest">P(Expansion | Bullish)</div>
               <div className="text-2xl text-green-400 font-mono font-bold">{((lastSignal.metadata?.probabilities?.long || lastSignal.probabilities?.long || 0) * 100).toFixed(1)}%</div>
               <div className="mt-2 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${((lastSignal.metadata?.probabilities?.long || lastSignal.probabilities?.long || 0) * 100)}%` }} />
               </div>
             </div>
             <div className="p-4 bg-void/50 rounded-lg border border-red-500/10">
               <div className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-widest">P(Contraction | Bearish)</div>
               <div className="text-2xl text-red-400 font-mono font-bold">{((lastSignal.metadata?.probabilities?.short || lastSignal.probabilities?.short || 0) * 100).toFixed(1)}%</div>
               <div className="mt-2 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${((lastSignal.metadata?.probabilities?.short || lastSignal.probabilities?.short || 0) * 100)}%` }} />
               </div>
             </div>
             <div className="p-4 bg-void/50 rounded-lg border border-yellow-500/10">
               <div className="text-[10px] text-zinc-500 mb-2 font-mono uppercase tracking-widest">P(Wait | Sideways)</div>
               <div className="text-2xl text-yellow-400 font-mono font-bold">{((lastSignal.metadata?.probabilities?.wait || lastSignal.probabilities?.wait || 0) * 100).toFixed(1)}%</div>
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
