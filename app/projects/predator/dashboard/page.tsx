"use client";

import { useEffect, useState } from "react";
import { socketService } from "@/lib/predator/socket";
import { PredatorChart } from "@/components/predator/PredatorChart";
import { AgentCommandCenter } from "@/components/predator/AgentCommandCenter";
import { Activity, Cpu, ShieldAlert, Crosshair, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const [ticks, setTicks] = useState<any[]>([]);
  const [regime, setRegime] = useState<any>(null);
  const [signal, setSignal] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  // INSTITUTIONAL: Force the correct branded API URL
  const API_BASE_URL = "https://api.glitchzerolabs.com";

  useEffect(() => {
    // Fetch initial historical data via REST
    fetch(`${API_BASE_URL}/api/v1/market/current`)
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.timestamp || data.ts)) {
           setTicks([data]);
        }
      })
      .catch((err) => console.error("Failed to fetch history", err));

    const socket = socketService.connect();

    // INSTITUTIONAL FIX: Check current connection state immediately
    if (socket.connected) {
      setIsConnected(true);
    }

    socket.on("connect", () => {
      console.log("Connected to Nexus WebSocket");
      setIsConnected(true);
    });
    
    socket.on("connect_error", (err) => {
      console.error("WebSocket Connection Error:", err.message);
      setIsConnected(false);
    });

    socket.on("disconnect", () => setIsConnected(false));

    socket.on("xauusd_ticks", (data: any) => {
      setTicks((prev) => {
        const newTicks = [...prev, data];
        return newTicks.slice(-100); 
      });
    });

    socket.on("predator:regime", (data: any) => {
      setRegime(data);
    });

    socket.on("predator:signals", (data: any) => {
      setSignal(data);
    });

    return () => {
      socket.off("xauusd_ticks");
      socket.off("predator:regime");
      socket.off("predator:signals");
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [API_BASE_URL]);

  const latestPrice = ticks.length > 0 ? (ticks[ticks.length - 1].bid || ticks[ticks.length - 1].price) : 0;
  
  const agentStatus = [
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
      status: regime ? "ONLINE" : "WAITING",
      icon: <Cpu size={18} />,
      metrics: {
        "Consensus": regime?.regime || "N/A",
        "Confidence": regime ? `${(regime.confidence * 100).toFixed(1)}%` : "N/A",
        "DXY Proxy": regime ? (typeof regime.macro_dxy_proxy === 'number' ? regime.macro_dxy_proxy.toFixed(6) : regime.macro_dxy_proxy) : "N/A"
      }
    },
    {
      name: "Apollo (Oracle)",
      status: signal ? "ONLINE" : "WAITING",
      icon: <Crosshair size={18} />,
      metrics: {
        "Latest Signal": signal?.signal || "N/A",
        "Confidence": signal ? `${(signal.confidence * 100).toFixed(1)}%` : "N/A",
        "OFI": typeof signal?.metadata?.ofi_used === 'number' ? signal.metadata.ofi_used.toFixed(3) : (signal?.metadata?.ofi_used || "N/A")
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
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif text-white">Live Market Matrix</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
          <span className="font-mono text-xs text-zinc-400">API: {isConnected ? "CONNECTED" : "DISCONNECTED"}</span>
        </div>
      </div>

      <div className="bg-depth border border-cyan-400/20 rounded-xl p-4 overflow-hidden relative">
         <div className="absolute top-6 left-6 z-10 bg-void/80 border border-cyan-400/30 p-3 rounded backdrop-blur-md">
            <h3 className="text-cyan-400 font-mono text-sm uppercase">XAUUSD Live</h3>
            <p className="text-2xl font-mono text-white mt-1">
              {latestPrice ? Number(latestPrice).toFixed(2) : "---.--"}
            </p>
         </div>
        <PredatorChart data={ticks} />
      </div>

      <AgentCommandCenter agents={agentStatus as any} />
      
      {signal && signal.metadata && signal.metadata.probabilities && (
        <div className="bg-surface/50 border border-zinc-800 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-mono text-zinc-400 uppercase mb-4 flex items-center">
            <AlertTriangle size={14} className="mr-2" />
            Bayesian Belief Matrix
          </h3>
          <div className="grid grid-cols-3 gap-4">
             <div className="p-3 bg-void rounded border border-green-500/20">
               <div className="text-xs text-green-500/70 mb-1 font-mono">P(LONG)</div>
               <div className="text-lg text-green-400 font-mono">{(signal.metadata.probabilities.long * 100).toFixed(2)}%</div>
             </div>
             <div className="p-3 bg-void rounded border border-red-500/20">
               <div className="text-xs text-red-500/70 mb-1 font-mono">P(SHORT)</div>
               <div className="text-lg text-red-400 font-mono">{(signal.metadata.probabilities.short * 100).toFixed(2)}%</div>
             </div>
             <div className="p-3 bg-void rounded border border-yellow-500/20">
               <div className="text-xs text-yellow-500/70 mb-1 font-mono">P(WAIT)</div>
               <div className="text-lg text-yellow-400 font-mono">{(signal.metadata.probabilities.wait * 100).toFixed(2)}%</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
