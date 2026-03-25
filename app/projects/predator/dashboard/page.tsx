'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import PriceChart from './components/PriceChart';
import TradingViewChart from './components/TradingViewChart';
import AgentStatusPanel from './components/AgentStatusPanel';
import ConnectionStatus from './components/ConnectionStatus';
import CurrentPriceDisplay from './components/CurrentPriceDisplay';
import RegimeDisplay from './components/RegimeDisplay';
import SignalDisplay from './components/SignalDisplay';
import { 
  useApiHealth, 
  useCurrentPrice, 
  usePriceHistory, 
  useAgentStatus, 
  useCurrentRegime,
  useSentinelSignal
} from './hooks/useApi';

export default function DashboardPage() {
  const { data: health, isLoading: healthLoading } = useApiHealth();
  const { data: price, isLoading: priceLoading } = useCurrentPrice();
  const { data: priceHistory, isLoading: historyLoading } = usePriceHistory(100);
  const { data: agents, isLoading: agentsLoading, error: agentsError } = useAgentStatus();
  const { data: regime, isLoading: regimeLoading } = useCurrentRegime();
  const { data: statusData, isLoading: sentinelLoading } = useSentinelSignal();

  const sentinel = statusData?.sentinel;
  const lastUpdate = price?.timestamp || health?.timestamp;

  return (
    <div className="min-h-screen bg-void text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/[0.08] backdrop-blur-md bg-void/80 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/projects/predator"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Back</span>
              </Link>
              <h1 className="text-lg font-semibold text-white">
                Predator
                <span className="text-cyan-400">Dashboard</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <ConnectionStatus health={health || null} isLoading={healthLoading} />
              {lastUpdate && (
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                  <RefreshCw className="w-3 h-3" />
                  <span>
                    {new Date(lastUpdate).toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Price Chart - Takes up 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-midnight border border-white/[0.08] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <CurrentPriceDisplay 
                  price={price || null} 
                  isLoading={priceLoading} 
                />
                <div className="text-xs text-slate-500">
                  Live • TradingView Integration
                </div>
              </div>
              
              <div className="bg-void/50 rounded-xl border border-white/[0.05] overflow-hidden">
                <TradingViewChart height={500} />
              </div>
            </div>

            {/* Regime Display - Bottom of left column */}
            <div className="bg-midnight border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-sm font-medium text-slate-300 mb-4">
                Market Regime
              </h3>
              <RegimeDisplay 
                regime={regime || null} 
                isLoading={regimeLoading} 
              />
            </div>
          </motion.div>

          {/* Agent Status - Right column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Sentinel Signal Oracle */}
            <SignalDisplay data={sentinel || null} isLoading={sentinelLoading} />

            <div className="bg-midnight border border-white/[0.08] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-medium text-slate-300">
                  Agent Status
                </h3>
                <div className="text-xs text-slate-500">
                  {agents?.filter(a => a.status === 'active' || a.status === 'running').length || 0}/{agents?.length || 0} active
                </div>
              </div>
              
              <AgentStatusPanel 
                agents={agents || []} 
                isLoading={agentsLoading}
                error={agentsError}
              />
            </div>

            {/* Quick Stats */}
            <div className="bg-midnight border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-sm font-medium text-slate-300 mb-4">
                System Overview
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Data Points</span>
                  <span className="text-sm text-white font-mono">
                    {priceHistory?.length || 0} bars
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Update Interval</span>
                  <span className="text-sm text-white font-mono">5s</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">API Endpoint</span>
                  <span className="text-xs text-cyan-400 font-mono truncate max-w-[120px]">
                    api.glitchzerolabs.com
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
