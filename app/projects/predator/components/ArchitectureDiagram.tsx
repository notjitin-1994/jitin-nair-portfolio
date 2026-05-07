'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Database, Brain, Target, Scale, Rocket, Activity,
  ArrowRight, ChevronRight, ShieldCheck, Cpu, Search, Workflow
} from 'lucide-react';

const architectureSteps = [
  {
    id: 'hermes',
    number: '01',
    title: 'Hermes Daemon',
    subtitle: 'Data Ingestion',
    description: 'High-throughput TCP stream handler for cTrader OpenAPI. Processes Ticks and Depth of Market (LOB) with Absolute Time Anchor synchronization for zero-drift timestamping.',
    icon: Database,
    color: '#22d3ee',
    stats: [
      { label: 'Throughput', value: '5k+ tps' },
      { label: 'Sync', value: 'Absolute' },
    ],
  },
  {
    id: 'argus',
    number: '02',
    title: 'Argus Sentinel',
    subtitle: 'MLARD Detection',
    description: 'Multi-Layer Adaptive Regime Detection evaluating structural shifts. Uses MAD-normalized rolling ADX and Bollinger Band Width thresholds to classify market states.',
    icon: Search,
    color: '#14b8a6',
    stats: [
      { label: 'Accuracy', value: '91.2%' },
      { label: 'Engine', value: 'Numba' },
    ],
  },
  {
    id: 'athena',
    number: '03',
    title: 'Athena Matrix',
    subtitle: 'Stateful Orchestration',
    description: 'LangGraph-managed DAG state machine. Orchestrates a 16-node strategy matrix, performing sub-ms hot-swapping of strategy logic based on regime consensus.',
    icon: Workflow,
    color: '#2dd4bf',
    stats: [
      { label: 'Nodes', value: '16 Active' },
      { label: 'Logic', value: 'LangGraph' },
    ],
  },
  {
    id: 'apollo',
    number: '04',
    title: 'Apollo Prophet',
    subtitle: 'Posterior Inference',
    description: 'Bayesian fusion engine synthesizing multi-factor inputs (Macro, Micro, Sentiment). Generates high-confidence probabilistic directives with natural language narratives.',
    icon: Activity,
    color: '#06b6d4',
    stats: [
      { label: 'Latency', value: '6.2ms' },
      { label: 'Fusion', value: 'Bayesian' },
    ],
  },
  {
    id: 'sentinel',
    number: '05',
    title: 'Model Registry',
    subtitle: 'MLOps Governance',
    description: 'Production management layer tracking Champion vs Challenger models. Statistical validation gates ensure performance persistence before production promotion.',
    icon: ShieldCheck,
    color: '#0ea5e9',
    stats: [
      { label: 'Drift', value: 'PSI 0.1' },
      { label: 'Status', value: 'Shielded' },
    ],
  },
  {
    id: 'ares',
    number: '06',
    title: 'Ares Commander',
    subtitle: 'High-Freq Execution',
    description: 'Low-latency execution controller managing broker-side order lifecycles. Enforces institutional risk forge with dynamic SL/TP and volatility-adjusted sizing.',
    icon: Target,
    color: '#22d3ee',
    stats: [
      { label: 'Precision', value: 'Sub-10ms' },
      { label: 'Risk', value: 'Active' },
    ],
  },
];

const dataFlow = [
  { source: 'Institutional Socket', target: 'Hermes', type: 'input' },
  { source: 'Hermes', target: 'TimescaleDB', type: 'storage' },
  { source: 'MLARD Layer', target: 'Bayesian Fusion', type: 'process' },
  { source: 'Signal Directive', target: 'Ares Execution', type: 'signal' },
];

function WorkflowIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 18L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 12L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

const iconMap = {
  Workflow: WorkflowIcon
};

export function ArchitectureDiagram() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8 sm:mb-10"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium">Distributed Architecture</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 tracking-tight font-display text-white">Institutional Multi-Agent Infrastructure</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
            A production-ready ecosystem of six specialized agents working in high-fidelity coordination, ensuring stability, scalability, and sub-10ms decision integrity.
          </p>
        </motion.div>

        {/* Architecture Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {architectureSteps.map((step, index) => {
            const Icon = step.icon === Workflow ? WorkflowIcon : step.icon;
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
                  group relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-500
                  ${isExpanded ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
                style={{
                  background: isHovered 
                    ? `linear-gradient(145deg, ${step.color}10, transparent)` 
                    : 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                  border: `1px solid ${isHovered ? step.color + '40' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isHovered ? `0 20px 40px -20px ${step.color}30` : 'none'
                }}
              >
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-2xl sm:text-3xl font-black font-mono opacity-5 italic"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 shadow-2xl"
                  style={{ 
                    backgroundColor: isHovered ? `${step.color}25` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isHovered ? step.color + '50' : 'rgba(255,255,255,0.1)'}`,
                  }}
                >
                  <Icon 
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-500"
                    style={{ color: isHovered ? step.color : '#64748b' }}
                  />
                </div>

                {/* Content */}
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.3em] mb-1 font-medium" style={{ color: isHovered ? step.color : '#94a3b8' }}>
                    {step.subtitle}
                  </p>
                  <h3 
                    className="text-lg sm:text-xl font-bold mb-2 transition-colors duration-500 tracking-tight text-white"
                  >
                    {step.title}
                  </h3>
                  
                  <motion.p 
                    className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mb-4"
                    animate={{ 
                      height: isExpanded ? 'auto' : '2.8em',
                      opacity: isExpanded ? 1 : 0.6
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Stats Row */}
                  <div className="flex gap-4 pt-4 border-t border-white/[0.06]">
                    {step.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-[8px] text-slate-500 uppercase tracking-widest font-mono">{stat.label}</p>
                        <p 
                          className="text-xs font-bold transition-colors duration-500 font-mono tracking-tighter"
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
                      ? `inset 0 0 30px ${step.color}10` 
                      : 'none'
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Expand Indicator */}
                <motion.div
                  className="absolute bottom-4 right-4"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight 
                    className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors"
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
          className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-[2rem] bg-white/[0.01] border border-white/[0.05] backdrop-blur-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-teal-500/5 pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-mono w-full sm:w-auto mb-2 sm:mb-0 italic">Data Pipeline Hierarchy</p>
            
            <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {dataFlow.map((flow, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-300 whitespace-nowrap uppercase tracking-widest font-mono">{flow.source}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-px bg-cyan-500/30" />
                    <ArrowRight className="w-3 h-3 text-cyan-500/50 flex-shrink-0" />
                    <div className="w-1.5 h-px bg-cyan-500/30" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-100 whitespace-nowrap uppercase tracking-widest font-mono">{flow.target}</span>
                  {index < dataFlow.length - 1 && (
                    <div className="w-8 h-px bg-white/[0.05] mx-2" />
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
