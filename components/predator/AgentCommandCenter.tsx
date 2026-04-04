"use client";

import { Activity } from "lucide-react";

interface Agent {
  name: string;
  status: string;
  icon: React.ReactNode;
  metrics: Record<string, string>;
}

interface Props {
  agents: Agent[];
}

export function AgentCommandCenter({ agents }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {agents.map((agent) => (
        <div key={agent.name} className="bg-surface/40 border border-zinc-800/50 p-4 rounded-xl backdrop-blur-sm hover:border-cyan-400/30 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-zinc-400 group-hover:text-cyan-400 transition-colors">
                {agent.icon}
              </div>
              <h3 className="text-xs font-mono text-zinc-300 uppercase tracking-widest">{agent.name}</h3>
            </div>
            <div className={`text-[10px] font-mono px-2 py-1 rounded ${
              agent.status === "ONLINE" 
                ? "bg-emerald-400/10 text-emerald-400 animate-pulse" 
                : "bg-zinc-800 text-zinc-500"
            }`}>
              {agent.status}
            </div>
          </div>
          
          <div className="space-y-2">
            {Object.entries(agent.metrics).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between border-b border-zinc-800/30 pb-1">
                <span className="text-[10px] text-zinc-500 font-mono uppercase">{key}</span>
                <span className="text-[10px] text-zinc-300 font-mono">{val}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
