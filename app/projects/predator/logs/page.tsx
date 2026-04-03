"use client";

import { useEffect, useState, useRef } from "react";
import { socketService } from "@/lib/predator/socket";
import { Terminal } from "lucide-react";

export default function LogsPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = socketService.connect();

    const handleLog = (channel: string, data: any) => {
      const timestamp = new Date().toISOString().split("T")[1].slice(0, -1);
      const formatted = `[${timestamp}] [${channel.toUpperCase()}] ${JSON.stringify(data)}`;
      setLogs((prev) => [...prev.slice(-99), formatted]);
    };

    socket.on("xauusd_ticks", (d) => handleLog("hermes_tick", d));
    socket.on("predator:regime", (d) => handleLog("argus_regime", d));
    socket.on("predator:signals", (d) => handleLog("apollo_signal", d));

    return () => {
      socket.off("xauusd_ticks");
      socket.off("predator:regime");
      socket.off("predator:signals");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-void border border-zinc-800 rounded-lg overflow-hidden h-[80vh] flex flex-col font-mono text-sm shadow-2xl">
      <div className="bg-zinc-900 px-4 py-2 flex items-center border-b border-zinc-800">
        <Terminal size={16} className="text-zinc-400 mr-2" />
        <span className="text-zinc-400">nexus_stream_tail_f</span>
        <div className="ml-auto flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 animate-pulse" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {logs.length === 0 ? (
          <div className="text-zinc-600 animate-pulse">Waiting for data stream...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="text-zinc-300 break-all hover:bg-zinc-900/50 px-1 rounded">
              {log.includes("apollo_signal") ? (
                <span className="text-yellow-400">{log}</span>
              ) : log.includes("argus_regime") ? (
                <span className="text-cyan-400">{log}</span>
              ) : (
                <span className="text-zinc-500">{log}</span>
              )}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
