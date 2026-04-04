"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, ShieldAlert, Cpu, Activity, Clock } from "lucide-react";

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const API_BASE_URL = "https://api.glitchzerolabs.com";

  // M8 FIX: API Authentication
  const headers = { 
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    "Content-Type": "application/json"
  };

  useEffect(() => {
    const fetchLogs = () => {
      fetch(`${API_BASE_URL}/api/v1/system/logs`, { headers })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setLogs(data);
        })
        .catch(err => console.error("Logs fetch failed", err));
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLevelColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'ERROR': return 'text-red-400';
      case 'CRITICAL': return 'text-red-600 font-bold';
      case 'WARN': return 'text-yellow-400';
      case 'INFO': return 'text-cyan-400';
      default: return 'text-zinc-500';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service?.toLowerCase()) {
      case 'hermes': return <Activity size={12} />;
      case 'argus': return <Cpu size={12} />;
      case 'apollo': return <ShieldAlert size={12} />;
      case 'ares': return <ShieldAlert size={12} />;
      default: return <Terminal size={12} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif text-white uppercase tracking-tighter">
          System <span className="text-cyan-400">Audit</span> Log
        </h2>
        <div className="flex items-center space-x-2 text-zinc-500 text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span>LIVE TELEMETRY STREAM</span>
        </div>
      </div>

      <div className="bg-void border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[70vh]">
        <div className="bg-zinc-900/50 border-b border-zinc-800 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">predator_scalping_v1.0.4::audit_trail</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 uppercase">
            Buffer: {logs.length} / 100
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-1 custom-scrollbar">
          {logs.length === 0 && (
            <div className="h-full flex items-center justify-center text-zinc-700 uppercase tracking-widest animate-pulse">
              Awaiting telemetry synchronization...
            </div>
          )}
          {logs.map((log, i) => (
            <div key={i} className="group hover:bg-zinc-900/50 py-0.5 rounded transition-colors flex items-start space-x-3">
              <span className="text-zinc-600 shrink-0">
                {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className={`shrink-0 uppercase w-16 ${getLevelColor(log.level)}`}>
                [{log.level}]
              </span>
              <span className="text-zinc-400 shrink-0 flex items-center space-x-1 w-20">
                {getServiceIcon(log.service)}
                <span className="uppercase">{log.service}</span>
              </span>
              <span className="text-zinc-300">
                <span className="text-cyan-400/80 mr-2">»</span>
                {log.event}
                {log.data && Object.keys(log.data).length > 0 && (
                  <span className="text-zinc-600 ml-2 italic">
                    {JSON.stringify(log.data)}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
