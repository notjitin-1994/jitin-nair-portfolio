'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';
import TradingViewChart from './components/TradingViewChart';
import AgentStatusPanel from './components/AgentStatusPanel';
import ConnectionStatus from './components/ConnectionStatus';
import CurrentPriceDisplay from './components/CurrentPriceDisplay';
import RegimeDisplay from './components/RegimeDisplay';
import SignalDisplay from './components/SignalDisplay';
import ExecutionPanel from './components/ExecutionPanel';
import OpenPositions from './components/OpenPositions';
import RecentTrades from './components/RecentTrades';
import { 
  useApiHealth, 
  useCurrentPrice, 
  useAgentStatus, 
  useCurrentRegime,
  useSentinelSignal
} from './hooks/useApi';
import { AgentStatus } from './types/dashboard';

// --- Error Boundary ---

class DashboardErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Dashboard component crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-10 text-center bg-midnight border border-white/[0.06] rounded-xl my-10">
          <AlertTriangle className="w-12 h-12 text-amber-400 mb-4" />
          <h2 className="text-xl font-bold mb-2">Dashboard Error</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md">
            A client-side exception occurred while rendering the dashboard. 
            This is usually caused by malformed API data.
          </p>
          <div className="flex gap-3">
            <button 
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm font-medium"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg transition-colors text-sm font-medium"
            >
              Reload Page
            </button>
          </div>
          {this.state.error && (
            <pre className="mt-8 p-4 bg-black/40 rounded border border-white/5 text-[10px] text-red-400/60 font-mono text-left max-w-full overflow-auto">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Components ---

function PipelineBar({ agents }: { agents: AgentStatus[] }) {
  if (!agents || !Array.isArray(agents)) return null;

  const pipelineAgents = [
    { id: 'ingestion', name: 'Ingest', match: (a: AgentStatus) => a.name === 'Data Ingestion', color: '#22d3ee' },
    { id: 'regime', name: 'Regime', match: (a: AgentStatus) => a.name === 'Regime Detection', color: '#818cf8' },
    { id: 'strategy', name: 'Strategy', match: (a: AgentStatus) => a.name === 'Strategy Selector', color: '#fbbf24' },
    { id: 'sentinel', name: 'Sentinel', match: (a: AgentStatus) => a.name === 'Sentinel Oracle', color: '#34d399' },
    { id: 'execution', name: 'Execute', match: (a: AgentStatus) => a.name === 'Execution Engine', color: '#f472b6' },
  ];

  return (
    <div className="flex items-center gap-0">
      {pipelineAgents.map((step, i) => {
        const agent = agents.find(step.match);
        const isActive = agent?.status === 'running' || agent?.status === 'active';
        const isFailed = agent?.status === 'failed';

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className="w-2.5 h-2.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: isFailed ? '#f87171' : isActive ? step.color : '#334155',
                  boxShadow: isActive ? `0 0 8px ${step.color}40` : 'none',
                }}
              />
              <span className="text-[9px] text-slate-500 mt-1 hidden sm:block">{step.name}</span>
            </div>
            {i < pipelineAgents.length - 1 && ( step.id !== 'execution' ) && (
              <div className="w-8 sm:w-12 h-px mx-0.5" style={{
                backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const { data: health, isLoading: healthLoading } = useApiHealth();
  const { data: price, isLoading: priceLoading } = useCurrentPrice();
  const { data: agents, isLoading: agentsLoading, error: agentsError } = useAgentStatus();
  const { data: regime, isLoading: regimeLoading } = useCurrentRegime();
  const { data: statusData, isLoading: sentinelLoading } = useSentinelSignal();

  const sentinel = statusData?.sentinel;
  const lastUpdate = price?.timestamp || health?.timestamp;
  const activeAgents = Array.isArray(agents) ? agents.filter(a => a.status === 'active' || a.status === 'running').length : 0;

  return (
    <div className="min-h-screen bg-void text-white">
      <DashboardErrorBoundary>
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-white/[0.06] backdrop-blur-md bg-void/80 sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <Link
                  href="/projects/predator"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Back</span>
                </Link>
                <div className="h-4 w-px bg-white/10" />
                <h1 className="text-sm font-semibold tracking-tight text-white">
                  Predator<span className="text-cyan-400 ml-1">Dashboard</span>
                </h1>
              </div>

              <div className="flex items-center gap-5">
                <PipelineBar agents={agents || []} />
                <div className="h-4 w-px bg-white/10" />
                <ConnectionStatus health={health || null} isLoading={healthLoading} />
                {lastUpdate && (
                  <div className="hidden md:flex items-center gap-1.5 text-[10px] text-slate-600 font-mono">
                    <RefreshCw className="w-3 h-3" />
                    <span>
                      {(() => {
                        try {
                          return new Date(lastUpdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                        } catch (e) {
                          return '--:--:--';
                        }
                      })()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Row 1: Signal | Regime | CurrentPrice (existing chart card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Price + Chart Card */}
              <div className="bg-midnight border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <CurrentPriceDisplay price={price || null} isLoading={priceLoading} />
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Live</span>
                  </div>
                </div>
                <div className="bg-void/50 rounded-lg border border-white/[0.04] overflow-hidden">
                  <TradingViewChart height={480} />
                </div>
              </div>

              {/* Regime Card */}
              <div className="bg-midnight border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Market Regime
                  </h3>
                  {regime && regime.confidence !== undefined && (
                    <div className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      regime.confidence > 0.7 ? 'bg-emerald-400/10 text-emerald-400' :
                      regime.confidence > 0.4 ? 'bg-amber-400/10 text-amber-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>
                      {Math.round(Number(regime.confidence) * 100)}% conf
                    </div>
                  )}
                </div>
                <RegimeDisplay regime={regime || null} isLoading={regimeLoading} />
              </div>

              {/* Row 2: Execution Panel | Open Positions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <ExecutionPanel />
                <OpenPositions />
              </div>

              {/* Row 3: Recent Trades | Agent Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <RecentTrades />
                <div className="bg-midnight border border-white/[0.06] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Agent Cluster
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">
                      {activeAgents}/{Array.isArray(agents) ? agents.length : 0} online
                    </span>
                  </div>
                  <AgentStatusPanel agents={agents || []} isLoading={agentsLoading} error={agentsError} />
                </div>
              </div>
            </motion.div>

            {/* Right Column — Signal + System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-5"
            >
              {/* Sentinel Oracle */}
              <SignalDisplay data={sentinel || null} isLoading={sentinelLoading} />

              {/* Strategy Info */}
              {statusData?.strategy?.current && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="bg-midnight border border-white/[0.06] rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Active Strategy
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400">
                      {statusData.strategy.current.regime || 'UNKNOWN'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-void/30 rounded-lg p-3 border border-white/[0.03]">
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">Strategy</div>
                      <div className="text-[11px] text-white font-mono mt-1">
                        {statusData.strategy.current.strategy_id?.replace?.(/_/g, ' ') || 'NONE'}
                      </div>
                    </div>
                    <div className="bg-void/30 rounded-lg p-3 border border-white/[0.03]">
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">Confidence</div>
                      <div className="text-[11px] text-cyan-400/80 font-mono mt-1">
                        {(Number(statusData.strategy.current.confidence_score) * 100 || 0).toFixed(0)}%
                      </div>
                    </div>
                    <div className="bg-void/30 rounded-lg p-3 border border-white/[0.03]">
                      <div className="text-[9px] text-slate-500 uppercase tracking-wider">Profit Target</div>
                      <div className="text-[11px] text-emerald-400/80 font-mono mt-1">
                        {statusData.strategy.current.parameters?.profit_target || 'N/A'}
                      </div>
                    </div>
                    {statusData.strategy.current.selection_reason && (
                      <div className="text-[10px] text-slate-500 italic leading-relaxed">
                        {statusData.strategy.current.selection_reason}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* System Telemetry */}
              <div className="bg-midnight border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  System Telemetry
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-void/30 rounded-lg p-3 border border-white/[0.03]">
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">API Endpoint</div>
                    <div className="text-[11px] text-cyan-400/80 font-mono mt-1">api.glitchzerolabs.com</div>
                  </div>
                  <div className="bg-void/30 rounded-lg p-3 border border-white/[0.03]">
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">Refresh Rate</div>
                    <div className="text-[11px] text-slate-300 font-mono mt-1">1s price / 10s agents</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </DashboardErrorBoundary>
    </div>
  );
}
