'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Zap, Brain, Target, Scale, Rocket, Activity, 
  ChevronRight, ArrowRight
} from 'lucide-react';

const iconMap = {
  Zap, Brain, Target, Scale, Rocket, Activity,
};

const processSteps = [
  {
    id: "hermes",
    number: '01',
    title: "Hermes: Ingestion",
    subtitle: "High-Frequency Conduit",
    description: "Real-time ProtoBuf socket connection to cTrader OpenAPI, processing institutional Ticks and LOB (Limit Order Book) data into TimescaleDB.",
    icon: "Zap",
    color: "#22d3ee",
    details: [
      "Sub-10ms ingestion precision", 
      "Order Flow Imbalance (OFI) extraction", 
      "Multithreaded DatabaseWorker pool", 
      "Absolute Time Anchor synchronization"
    ],
    metrics: [
      { label: "Throughput", value: "5000+ tps" }, 
      { label: "LOB Levels", value: "Top 5" }
    ]
  },
  {
    id: "argus",
    number: '02',
    title: "Argus: Detection",
    subtitle: "Bayesian Confluence",
    description: "Determines structural market shifts by evaluating a 68-feature matrix through a Multivariate Gaussian Hidden Markov Model (HMM).",
    icon: "Brain",
    color: "#14b8a6",
    details: [
      "BIC-optimized state discovery", 
      "68-feature Random Forest matrix", 
      "HMM Persistence transition logic", 
      "M1-Bridge institutional resampling"
    ],
    metrics: [
      { label: "Update Freq", value: "M1/M5/M15" }, 
      { label: "Accuracy", value: "91.2%" }
    ]
  },
  {
    id: "athena",
    number: '03',
    title: "Athena: Orchestration",
    subtitle: "Stateful Execution",
    description: "A LangGraph-managed DAG (Directed Acyclic Graph) orchestrating a 16-node Strategy Matrix for dynamic execution routing.",
    icon: "Target",
    color: "#2dd4bf",
    details: [
      "Context-aware LangGraph routing", 
      "EMA Pullback & Breakout nodes", 
      "Mean Reversion state activation", 
      "Institutional rationale generation"
    ],
    metrics: [
      { label: "Strategy Nodes", value: "16" }, 
      { label: "Logic", value: "LangGraph" }
    ]
  },
  {
    id: "apollo",
    number: '04',
    title: "Apollo: Inference",
    subtitle: "Posterior Oracle",
    description: "Synthesizes multi-factor inputs into a Bayesian posterior probability, issuing high-confidence trade directives.",
    icon: "Activity",
    color: "#06b6d4",
    details: [
      "Bayesian posterior fusion", 
      "Cross-asset DXY correlation", 
      "Neural sentiment vector injection", 
      "Probabilistic ENTER/EXIT logic"
    ],
    metrics: [
      { label: "Posterior P", value: "Confidence" }, 
      { label: "Latency", value: "8ms p99" }
    ]
  },
  {
    id: "sentinel",
    number: '05',
    title: "Guard Rails: Integrity",
    subtitle: "MLOps & Stability",
    description: "Continuous monitoring for concept drift and model stability with automated institutional circuit breakers.",
    icon: "Scale",
    color: "#0ea5e9",
    details: [
      "ADWIN/PSI Drift Detection", 
      "Feature distribution tracking", 
      "Automated Daily Loss limits", 
      "Prometheus observability stack"
    ],
    metrics: [
      { label: "Drift Trigger", value: "PSI > 0.25" }, 
      { label: "Risk Shield", value: "Active" }
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
          group relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300
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
          className="absolute top-4 right-4 text-lg font-bold opacity-10"
          style={{ color: step.color }}
        >
          {step.number}
        </div>

        {/* Icon */}
        <div 
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
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
          <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mb-1">
            {step.subtitle}
          </p>
          <h3 
            className="text-base sm:text-lg font-semibold mb-2 transition-colors duration-300"
            style={{ color: isExpanded ? step.color : '#f8fafc' }}
          >
            {step.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Metrics - Always Visible */}
          <div className="grid grid-cols-2 gap-3">
            {step.metrics.map((metric) => (
              <div 
                key={metric.label}
                className="p-2.5 rounded-lg transition-colors duration-300"
                style={{ backgroundColor: isExpanded ? `${step.color}10` : 'rgba(255,255,255,0.03)' }}
              >
                <p 
                  className="text-sm font-semibold transition-colors duration-300"
                  style={{ color: isExpanded ? step.color : '#e2e8f0' }}
                >
                  {metric.value}
                </p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
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
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">Technical Details</p>
            <ul className="space-y-2">
              {step.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-400 text-xs sm:text-sm">
                  <span 
                    className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
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
              ? `0 0 40px ${step.color}15, inset 0 1px 0 ${step.color}15`
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
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8 sm:mb-10"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">
            Processing Pipeline
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            From tick ingestion to execution, every step is optimized for sub-50ms latency with institutional-grade risk controls and AI-powered decision making.
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
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-start gap-6 sm:gap-8"
        >
          {[
            { label: 'Data Ingestion', color: '#22d3ee' },
            { label: 'AI Processing', color: '#14b8a6' },
            { label: 'Risk Control', color: '#2dd4bf' },
            { label: 'Ares', color: '#06b6d4' },
            { label: 'Monitoring', color: '#0ea5e9' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-slate-500">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessFlow;
