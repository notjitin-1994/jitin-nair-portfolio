'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Zap, Brain, Target, Scale, Rocket, Activity, 
  ChevronRight, ArrowRight, ShieldCheck, Database, Search
} from 'lucide-react';

const iconMap = {
  Zap, Brain, Target, Scale, Rocket, Activity, ShieldCheck, Database, Search
};

const processSteps = [
  {
    id: "ingestion",
    number: '01',
    title: "High-Freq Ingestion",
    subtitle: "The Hermes Daemon",
    description: "Real-time ProtoBuf socket connection to institutional cTrader endpoints, streaming Ticks and LOB depth with microsecond precision.",
    icon: "Database",
    color: "#22d3ee",
    details: [
      "Sub-ms ingestion latency", 
      "Order Flow Imbalance (OFI) extraction", 
      "TCP Absolute Anchor synchronization", 
      "TimescaleDB hypertable persistence"
    ],
    metrics: [
      { label: "Throughput", value: "5000+ tps" }, 
      { label: "Precision", value: "Sub-ms" }
    ]
  },
  {
    id: "detection",
    number: '02',
    title: "MLARD Detection",
    subtitle: "Multi-Layer Adaptive Logic",
    description: "Identifies market regimes (Trend/Range/Volatile) using adaptive thresholds with MAD normalization to handle non-stationary volatility.",
    icon: "Search",
    color: "#14b8a6",
    details: [
      "Adaptive ADX/BBW barriers", 
      "MAD (Median Absolute Deviation) scaling", 
      "Choppiness Index filtering", 
      "Efficiency Ratio trend validation"
    ],
    metrics: [
      { label: "Accuracy", value: "91.2%" }, 
      { label: "Stability", value: "Hysteresis" }
    ]
  },
  {
    id: "orchestration",
    number: '03',
    title: "Dynamic Routing",
    subtitle: "Stateful Strategy Matrix",
    description: "A LangGraph-managed DAG orchestrating a 16-node strategy matrix, hot-swapping logic based on the detected Bayesian regime.",
    icon: "Target",
    color: "#2dd4bf",
    details: [
      "LangGraph state persistence", 
      "16-node execution routing", 
      "Sub-1ms state transitions", 
      "Institutional rationale engine"
    ],
    metrics: [
      { label: "Nodes", value: "16 Active" }, 
      { label: "Logic", value: "Stateful" }
    ]
  },
  {
    id: "inference",
    number: '04',
    title: "Bayesian Inference",
    subtitle: "The Apollo Oracle",
    description: "Fuses Macro (DXY), Microstructure (OFI), and Sentiment into a unified Bayesian posterior probability for high-confidence directives.",
    icon: "Activity",
    color: "#06b6d4",
    details: [
      "Bayesian posterior fusion", 
      "Cross-asset correlation analysis", 
      "Neural sentiment vector injection", 
      "Probabilistic signal generation"
    ],
    metrics: [
      { label: "Inference", value: "6.2ms" }, 
      { label: "Confidence", value: "Dynamic" }
    ]
  },
  {
    id: "integrity",
    number: '05',
    title: "MLOps Integrity",
    subtitle: "Guard Rails & Drift",
    description: "Continuous monitoring of model drift (PSI) and concept drift (ADWIN) with automated institutional circuit breakers.",
    icon: "ShieldCheck",
    color: "#0ea5e9",
    details: [
      "PSI Drift Detection", 
      "ADWIN concept monitoring", 
      "Champion/Challenger registry", 
      "Emergency shutdown protocols"
    ],
    metrics: [
      { label: "Sensitivity", value: "0.1 PSI" }, 
      { label: "Uptime", value: "99.9%" }
    ]
  }
];

function StepCard({ step, isExpanded, onToggle, index }: { 
  step: typeof processSteps[0]; 
  isExpanded: boolean; 
  onToggle: () => void;
  index: number;
}) {
  const Icon = iconMap[step.icon as keyof typeof iconMap];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Connector Line - Desktop Only */}
      {index < processSteps.length - 1 && (
        <div className="hidden lg:block absolute top-12 -right-3 w-6 h-px">
          <div className="w-full h-full bg-gradient-to-r from-white/[0.1] to-white/[0.05]" />
          <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-white/[0.2]" />
        </div>
      )}

      <motion.div
        onClick={onToggle}
        className={`
          group relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden
          ${isExpanded ? 'lg:col-span-2' : ''}
        `}
        style={{
          background: isExpanded 
            ? `linear-gradient(145deg, ${step.color}08, rgba(255,255,255,0.02))`
            : 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
          border: `1px solid ${isExpanded ? step.color + '30' : 'rgba(255,255,255,0.08)'}`,
        }}
        whileHover={{ 
          background: `linear-gradient(145deg, ${step.color}06, rgba(255,255,255,0.02))`,
          borderColor: step.color + '25',
        }}
      >
        {/* Step Number */}
        <div 
          className="absolute top-4 right-4 text-lg font-bold opacity-10 font-mono"
          style={{ color: step.color }}
        >
          {step.number}
        </div>

        {/* Icon */}
        <div 
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 shadow-lg"
          style={{ 
            backgroundColor: isExpanded ? `${step.color}20` : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isExpanded ? step.color + '40' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <Icon 
            className="w-5 h-5 transition-colors duration-300"
            style={{ color: isExpanded ? step.color : '#94a3b8' }}
          />
        </div>

        {/* Content */}
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-mono mb-1">
            {step.subtitle}
          </p>
          <h3 
            className="text-base sm:text-lg font-bold mb-2 transition-colors duration-300 tracking-tight"
            style={{ color: isExpanded ? step.color : '#f8fafc' }}
          >
            {step.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 font-light">
            {step.description}
          </p>

          {/* Metrics - Always Visible */}
          <div className="grid grid-cols-2 gap-3">
            {step.metrics.map((metric) => (
              <div 
                key={metric.label}
                className="p-2.5 rounded-lg transition-colors duration-300 border border-white/[0.03]"
                style={{ backgroundColor: isExpanded ? `${step.color}10` : 'rgba(255,255,255,0.02)' }}
              >
                <p 
                  className="text-xs font-bold transition-colors duration-300 font-mono uppercase tracking-wider"
                  style={{ color: isExpanded ? step.color : '#e2e8f0' }}
                >
                  {metric.value}
                </p>
                <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-0.5">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Expand Indicator */}
        <motion.div
          className="absolute bottom-4 right-4"
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight 
            className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors"
          />
        </motion.div>

        {/* Expanded Details */}
        <motion.div
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? 16 : 0
          }}
          className="overflow-hidden"
        >
          <div 
            className="pt-4 border-t"
            style={{ borderColor: `${step.color}20` }}
          >
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-mono mb-3">Technical Architecture</p>
            <ul className="space-y-2">
              {step.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-400 text-xs font-light">
                  <div 
                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                    style={{ backgroundColor: step.color }}
                  />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={false}
          animate={{
            boxShadow: isExpanded 
              ? `0 0 40px ${step.color}10, inset 0 1px 0 ${step.color}15`
              : 'none'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ProcessFlow() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
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
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Pipeline Architecture
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-display">
            The MLARD Decision Loop
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-light">
            Every tick is processed through a multi-layer adaptive pipeline optimized for sub-10ms latency, balancing statistical rigor with high-frequency execution.
          </p>
        </motion.div>

        {/* Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {processSteps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              isExpanded={expandedStep === step.id}
              onToggle={() => toggleStep(step.id)}
              index={index}
            />
          ))}
        </div>

        {/* Pipeline Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-start gap-6 sm:gap-8 border-t border-white/[0.05] pt-8"
        >
          {[
            { label: 'Data Ingestion', color: '#22d3ee' },
            { label: 'Regime Intelligence', color: '#14b8a6' },
            { label: 'Agentic Logic', color: '#2dd4bf' },
            { label: 'Posterior Fusion', color: '#06b6d4' },
            { label: 'ML Integrity', color: '#0ea5e9' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div 
                className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessFlow;
