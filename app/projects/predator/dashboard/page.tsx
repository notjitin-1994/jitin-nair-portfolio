'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DashboardProvider } from './context/DashboardContext';
import PriceTicker from './components/PriceTicker';
import AgentCluster from './components/AgentCluster';
import RegimeGauge from './components/RegimeGauge';
import SignalCard from './components/SignalCard';
import NewsStream from './components/NewsStream';
import PositionFlow from './components/PositionFlow';
import TradeHistory from './components/TradeHistory';
import RiskMonitor from './components/RiskMonitor';
import ConnectionStatus from './components/ConnectionStatus';
import TradingViewChart from './components/TradingViewChart';
import { Footer } from '../../../components/Footer';

// Animation wrapper that only animates once per session
function AnimatedCard({
  children,
  delay = 0,
  className = '',
  animate = true
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  animate?: boolean;
}) {
  if (!animate) return <div className={className}>{children}</div>;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Error Boundary
// ============================================================================

class DashboardErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Dashboard error:', error);
    console.error('Error info:', errorInfo);
    console.error('Error stack:', error.stack);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error?.message || 'Unknown error';
      return (
        <div className="min-h-screen bg-void flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-midnight border border-white/[0.06] rounded-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Dashboard Error</h2>
            <p className="text-sm text-slate-500 mb-4">
              Something went wrong loading the dashboard.
            </p>
            <div className="bg-void/50 rounded-lg p-3 mb-6 text-left">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Error Details</p>
              <p className="text-xs text-red-400 font-mono break-all">{errorMessage}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-white"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-colors text-sm"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================================
// Main Dashboard Page - Institutional Layout
// ============================================================================
// Layout Philosophy:
// - Hero chart as focal point (center-right, largest real estate)
// - Critical metrics sidebar (left, stacked vertically)
// - Portfolio & execution panel (right column)
// - System status footer (bottom, full-width)
// - Minimal gaps (8-12px), dense information hierarchy
// ============================================================================

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardErrorBoundary>
        <div className="min-h-screen bg-void text-white">
          {/* Compact Header */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border-b border-white/[0.06] bg-midnight/80 backdrop-blur-xl sticky top-0 z-50"
          >
            <div className="max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6">
              <div className="flex items-center justify-between h-12">
                <div className="flex items-center gap-3">
                  <Link
                    href="/projects/predator"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs hidden sm:inline">Back</span>
                  </Link>
                  <div className="h-3 w-px bg-white/10" />
                  <h1 className="text-sm font-semibold tracking-tight text-white">
                    Predator<span className="text-cyan-400">Pro</span>
                  </h1>
                  <span className="text-[10px] text-slate-600 hidden sm:inline">v2.4.1</span>
                </div>

                <ConnectionStatus />
              </div>
            </div>
          </motion.header>

          {/* Main Dashboard Grid */}
          <main className="max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6 py-4">
            {/* ========================================================================
               PRIMARY GRID: 12-column asymmetric layout
               - Left sidebar (3 cols): Price + Signal + Regime stacked
               - Center (6 cols): Main chart
               - Right sidebar (3 cols): Risk + Positions stacked
               ======================================================================== */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mb-3">
              {/* LEFT SIDEBAR: Critical Trading Metrics */}
              <div className="xl:col-span-3 flex flex-col gap-3">
                <AnimatedCard delay={0.05} animate={false}>
                  <PriceTicker />
                </AnimatedCard>

                <AnimatedCard delay={0.1} animate={false}>
                  <SignalCard />
                </AnimatedCard>

                <AnimatedCard delay={0.15} animate={false}>
                  <RegimeGauge />
                </AnimatedCard>

                <AnimatedCard delay={0.2} animate={false}>
                  <NewsStream />
                </AnimatedCard>

                {/* Compact System Status Mini-Card (Desktop) */}
                <AnimatedCard delay={0.25} animate={false} className="hidden xl:block flex-1 min-h-0">
                  <AgentCluster />
                </AnimatedCard>
              </div>

              {/* CENTER: Hero Chart */}
              <div className="xl:col-span-6 flex flex-col">
                <AnimatedCard delay={0.1} className="h-full">
                  <div className="bg-midnight border border-white/[0.06] rounded-xl overflow-hidden h-full flex flex-col">
                    {/* Chart Header */}
                    <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          XAU/USD
                        </h3>
                        <span className="text-[10px] text-slate-600">5M</span>
                        <span className="text-[10px] text-slate-600">OANDA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">Live</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                    </div>
                    {/* Chart Container */}
                    <div className="flex-1 bg-void/30 p-1">
                      <TradingViewChart height={520} />
                    </div>
                  </div>
                </AnimatedCard>
              </div>

              {/* RIGHT SIDEBAR: Portfolio & Risk */}
              <div className="xl:col-span-3 flex flex-col gap-3">
                <AnimatedCard delay={0.15} animate={false}>
                  <RiskMonitor />
                </AnimatedCard>

                <AnimatedCard delay={0.2} animate={false}>
                  <PositionFlow />
                </AnimatedCard>

                <AnimatedCard delay={0.25} animate={false}>
                  <TradeHistory />
                </AnimatedCard>
              </div>
            </div>

            {/* MOBILE/TABLET: Agent Cluster (shown only below xl) */}
            <div className="xl:hidden mb-3">
              <AnimatedCard delay={0.3}>
                <AgentCluster />
              </AnimatedCard>
            </div>
          </main>

          <Footer />
        </div>
      </DashboardErrorBoundary>
    </DashboardProvider>
  );
}
