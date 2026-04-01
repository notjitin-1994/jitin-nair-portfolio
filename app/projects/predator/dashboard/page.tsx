'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Zap, LayoutGrid } from 'lucide-react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';

// Components
import RegimeGauge from './components/RegimeGauge';
import SignalCard from './components/SignalCard';
import OpenPositions from './components/OpenPositions';
import RecentTrades from './components/RecentTrades';
import NewsStream from './components/NewsStream';
import AgentStatusPanel from './components/AgentStatusPanel';
import RegimeDisplay from './components/RegimeDisplay';
import StrategyCommandCenter from './components/StrategyCommandCenter';
import TradingViewChart from './components/TradingViewChart';
import { Footer } from '../../../components/Footer';

function DashboardContent() {
  const { regime, agents, connectionStatus } = useDashboard();
  const isLoading = connectionStatus === 'connecting';

  return (
    <div className="min-h-screen bg-void text-slate-200 font-sans selection:bg-violet-500/30 overflow-x-hidden">
      {/* Main Background Texture */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,1)_0%,_rgba(2,6,23,1)_100%)] z-0" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-void/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/projects"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
            </Link>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              <span className="text-sm font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                PREDATOR <span className="font-light text-slate-500 ml-1">NEXUS V4.0</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Market Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-4 py-6">
        <TradingViewChart />
        
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* LEFT COLUMN: Intelligence & Strategy (Independent Scroll) */}
          <div className="w-full lg:w-[450px] lg:sticky lg:top-[88px] lg:h-[calc(100vh-120px)] lg:overflow-y-auto no-scrollbar space-y-6 pb-12">
            <StrategyCommandCenter />
            <RegimeGauge />
            <RegimeDisplay regime={regime} isLoading={isLoading} />
            <AgentStatusPanel agents={agents} isLoading={isLoading} />
          </div>

          {/* RIGHT COLUMN: Market & Execution (Independent Scroll) */}
          <div className="w-full lg:flex-1 lg:sticky lg:top-[88px] lg:h-[calc(100vh-120px)] lg:overflow-y-auto no-scrollbar space-y-6 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SignalCard />
              <NewsStream />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <OpenPositions />
              <RecentTrades />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-midnight/50">
        <Footer />
      </footer>
    </div>
  );
}

export default function PredatorDashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
