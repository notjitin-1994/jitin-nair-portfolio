"use client";

import { Activity, ShieldAlert, Cpu, Crosshair } from "lucide-react";

interface AgentStatusProps {
  name: string;
  status: "ONLINE" | "OFFLINE" | "WAITING";
  metrics?: Record<string, any>;
  icon: React.ReactNode;
}

export function AgentCommandCenter({ agents }: { agents: AgentStatusProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {agents.map((agent) => (
        <div
          key={agent.name}
          className="bg-depth border border-cyan-400/20 p-4 rounded-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-cyan-400">
              {agent.icon}
              <h3 className="font-mono text-sm uppercase font-bold tracking-wider">
                {agent.name}
              </h3>
            </div>
            <div
              className={`text-xs font-mono px-2 py-1 rounded \${
                agent.status === "ONLINE"
                  ? "bg-teal-400/10 text-teal-400 animate-pulse-slow"
                  : agent.status === "WAITING"
                  ? "bg-yellow-400/10 text-yellow-400"
                  : "bg-red-400/10 text-red-400"
              }`}
            >
              {agent.status}
            </div>
          </div>

          <div className="space-y-2">
            {agent.metrics &&
              Object.entries(agent.metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm font-mono">
                  <span className="text-zinc-500 uppercase">{key}</span>
                  <span className="text-zinc-300">{value}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
