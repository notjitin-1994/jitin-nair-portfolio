'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Database, Brain, Target, Scale, Rocket, Activity,
  ArrowRight, ChevronRight
} from 'lucide-react';

const architectureSteps = [
  {
    id: 'ingestion',
    number: '01',
    title: 'Data Ingestion',
    subtitle: 'Market Data Feed',
    description: 'Real-time tick data ingestion via WebSocket with sub-millisecond latency. Processes 222MB+ daily with automatic reconnection and data validation.',
    icon: Database,
    color: '#22d3ee',
    stats: [
      { label: 'Latency', value: '<5ms' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
  {
    id: 'regime',
    number: '02',
    title: 'Regime Detection',
    subtitle: 'Market Classification',
    description: 'AI-powered regime classification distinguishing trending, ranging, and volatile market conditions with 88% accuracy on out-of-sample data.',
    icon: Brain,
    color: '#a78bfa',
    stats: [
      { label: 'Accuracy', value: '88%' },
      { label: 'Models', value: '3 Active' },
    ],
  },
  {
    id: 'strategy',
    number: '03',
    title: 'Strategy Engine',
    subtitle: 'Dynamic Selection',
    description: 'Context-aware strategy selection that adapts to detected market regimes. Deploys specialized agents optimized for current conditions.',
    icon: Target,
    color: '#f472b6',
    stats: [
      { label: 'Strategies', value: '5+' },
      { label: 'Response', value: '<12ms' },
    ],
  },
  {
    id: 'risk',
    number: '04',
    title: 'Risk Management',
    subtitle: 'Position Sizing',
    description: 'Institutional-grade risk controls with Kelly Criterion position sizing, maximum drawdown limits, and portfolio heat monitoring.',
    icon: Scale,
    color: '#22c55e',
    stats: [
      { label: 'Max Risk', value: '2% / Trade' },
      { label: 'Drawdown', value: '<10%' },
    ],
  },
  {
    id: 'execution',
    number: '05',
    title: 'Execution Engine',
    subtitle: 'Order Management',
    description: 'Sub-50ms order execution via CCXT with smart order routing, slippage monitoring, and exchange failover capabilities.',
    icon: Rocket,
    color: '#fb923c',
    stats: [
      { label: 'Latency', value: '47ms' },
      { label: 'Slippage', value: '<0.1%' },
    ],
  },
  {
    id: 'monitoring',
    number: '06',
    title: 'Monitoring',
    subtitle: 'Performance Tracking',
    description: 'Continuous performance monitoring with drift detection, P&L attribution, and real-time alerting via Telegram integration.',
    icon: Activity,
    color: '#ef4444',
    stats: [
      { label: 'Metrics', value: '50+' },
      { label: 'Alerts', value: 'Real-time' },
    ],
  },
];

const dataFlow = [
  { source: 'OANDA WebSocket', target: 'Ingestion Layer', type: 'input' },
  { source: 'Ingestion Layer', target: 'TimescaleDB', type: 'storage' },
  { source: 'TimescaleDB', target: 'AI Pipeline', type: 'process' },
  { source: 'AI Pipeline', target: 'Execution Layer', type: 'signal' },
];

export function ArchitectureDiagram() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8 sm:mb-10"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">System Architecture</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Multi-Agent Architecture</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            A distributed system of six specialized agents working in concert, each handling a specific layer of the trading pipeline with sub-50ms coordination.
          </p>
        </motion.div>

        {/* Architecture Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {architectureSteps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredStep === step.id;
            const isExpanded = expandedStep === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => toggleExpand(step.id)}
                className={`
                  group relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300
                  ${isExpanded ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
                style={{
                  background: isHovered 
                    ? `linear-gradient(145deg, ${step.color}08, transparent)` 
                    : 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  border: `1px solid ${isHovered ? step.color + '30' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-2xl sm:text-3xl font-bold opacity-10"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ 
                    backgroundColor: isHovered ? `${step.color}20` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isHovered ? step.color + '40' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  <Icon 
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300"
                    style={{ color: isHovered ? step.color : '#94a3b8' }}
                  />
                </div>

                {/* Content */}
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mb-1">
                    {step.subtitle}
                  </p>
                  <h3 
                    className="text-lg sm:text-xl font-semibold mb-2 transition-colors duration-300"
                    style={{ color: isHovered ? step.color : '#f8fafc' }}
                  >
                    {step.title}
                  </h3>
                  
                  <motion.p 
                    className="text-slate-400 text-xs sm:text-sm leading-relaxed"
                    animate={{ 
                      height: isExpanded ? 'auto' : '2.5em',
                      opacity: isExpanded ? 1 : 0.7
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Stats Row */}
                  <div className="flex gap-4 mt-4 pt-4 border-t border-white/[0.06]">
                    {step.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</p>
                        <p 
                          className="text-sm font-semibold transition-colors duration-300"
                          style={{ color: isHovered ? step.color : '#e2e8f0' }}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={false}
                  animate={{
                    boxShadow: isHovered 
                      ? `0 0 40px ${step.color}15, inset 0 1px 0 ${step.color}20` 
                      : 'none'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Expand Indicator */}
                <motion.div
                  className="absolute bottom-4 right-4"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight 
                    className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors"
                    style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Data Flow Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-500 uppercase tracking-wider w-full sm:w-auto mb-2 sm:mb-0">Data Flow Pipeline</p>
            
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {dataFlow.map((flow, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  <span className="text-xs sm:text-sm text-slate-300 whitespace-nowrap">{flow.source}</span>
                  <ArrowRight className="w-4 h-4 text-cyan-500/50 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300 whitespace-nowrap">{flow.target}</span>
                  {index < dataFlow.length - 1 && (
                    <div className="w-6 h-px bg-white/[0.08] mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ArchitectureDiagram;
