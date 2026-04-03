"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { usePredatorSocket } from "@/lib/predator/usePredatorSocket";
import { Terminal, Filter, Trash2, Pause, Play, Download } from "lucide-react";

export default function LogsPage() {
  const { lastSystemLog } = usePredatorSocket();
  const [logs, setLogs] = useState<any[]>([]);
  const [filterSource, setFilterSource] = useState("ALL");
  const [filterLevel, setFilterLevel] = useState("ALL");
  const [isPaused, setIsPaused] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const API_BASE_URL = "https://api.glitchzerolabs.com";

  // Initial load
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/system/logs`)
      .then(res => res.json())
      .then(data => setLogs(data.reverse()))
      .catch(err => console.error("Log fetch failed", err));
  }, []);

  // Handle live logs from WebSocket
  useEffect(() => {
    if (lastSystemLog && !isPaused) {
      setLogs(prev => [...prev, lastSystemLog].slice(-500));
    }
  }, [lastSystemLog, isPaused]);

  // Handle auto-scroll
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const sourceMatch = filterSource === "ALL" || log.service?.toUpperCase() === filterSource;
      const levelMatch = filterLevel === "ALL" || log.level === filterLevel;
      return sourceMatch && levelMatch;
    });
  }, [logs, filterSource, filterLevel]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ERROR": return "text-red-400 bg-red-400/10 border-red-400/20";
      case "WARNING": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "CRITICAL": return "text-white bg-red-600 border-red-600";
      default: return "text-cyan-400 bg-cyan-400/10 border-cyan-400/20";
    }
  };

  const sources = ["ALL", "HERMES", "ARGUS", "APOLLO", "ARES", "NEXUS"];
  const levels = ["ALL", "INFO", "WARNING", "ERROR"];

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-depth border border-cyan-400/10 p-4 rounded-xl backdrop-blur-md">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Filter size={14} className="text-zinc-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Source</span>
            <div className="flex bg-void rounded-md border border-zinc-800 p-1">
              {sources.map(s => (
                <button
                  key={s}
                  onClick={() => setFilterSource(s)}
                  className={`px-3 py-1 text-[10px] font-mono rounded transition-all ${filterSource === s ? "bg-cyan-400/20 text-cyan-400" : "text-zinc-600 hover:text-zinc-400"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 border-l border-zinc-800 pl-6">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Level</span>
            <div className="flex bg-void rounded-md border border-zinc-800 p-1">
              {levels.map(l => (
                <button
                  key={l}
                  onClick={() => setFilterLevel(l)}
                  className={`px-3 py-1 text-[10px] font-mono rounded transition-all ${filterLevel === l ? "bg-zinc-700 text-white" : "text-zinc-600 hover:text-zinc-400"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2 rounded-md border border-zinc-800 hover:border-zinc-600 transition-colors ${isPaused ? "text-yellow-400" : "text-zinc-400"}`}
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button 
            onClick={() => setLogs([])}
            className="p-2 rounded-md border border-zinc-800 hover:border-red-400/50 text-zinc-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Terminal Area */}
      <div className="flex-1 bg-void border border-zinc-800 rounded-xl overflow-hidden flex flex-col shadow-inner">
        <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal size={14} className="text-teal-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Predator_System_Output :: /dev/tty0</span>
          </div>
          <div className="flex items-center space-x-4">
             <label className="flex items-center space-x-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={autoScroll} 
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="w-3 h-3 rounded border-zinc-800 bg-void checked:bg-cyan-400 focus:ring-0"
                />
                <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 uppercase">Auto-Scroll</span>
             </label>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed selection:bg-cyan-400/20"
        >
          {filteredLogs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-700 italic">
              No system activity detected matching current filters...
            </div>
          ) : (
            <div className="space-y-1">
              {filteredLogs.map((log, i) => (
                <div key={i} className="flex space-x-3 group hover:bg-white/[0.02] py-0.5 rounded transition-colors">
                  <span className="text-zinc-600 shrink-0 select-none">
                    {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : '00:00:00'}
                  </span>
                  <span className={`shrink-0 w-16 px-1.5 py-0.5 rounded-[3px] text-[9px] font-bold text-center border ${getLevelColor(log.level)}`}>
                    {log.level}
                  </span>
                  <span className="text-zinc-500 shrink-0 font-bold w-20">
                    [{log.service?.toUpperCase()}]
                  </span>
                  <span className="text-zinc-300 break-all">
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
          )}
        </div>
      </div>
    </div>
  );
}
