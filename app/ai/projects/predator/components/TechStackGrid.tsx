'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, Database, Brain, Check, ChevronDown, Workflow, ShieldCheck, Zap } from 'lucide-react';

const categoryIcons = { core: Cpu, agents: Brain, data: Database, ml: Layers, ops: ShieldCheck };

const techCategories = [
  {
    id: "core",
    name: "Core Engine",
    color: "#22d3ee",
    technologies: [
      { name: "Python 3.13", description: "Async-first implementation", purpose: "Logic Orchestration" },
      { name: "Numba JIT", description: "Machine code compilation", purpose: "10x Vectorized Compute" },
      { name: "cTrader OpenAPI", description: "Direct ProtoBuf socket access", purpose: "Institutional Execution" },
      { name: "LangGraph", description: "Stateful agent DAG orchestration", purpose: "Multi-Agent Logic" }
    ]
  },
  {
    id: "agents",
    name: "The Pantheon",
    color: "#14b8a6",
    technologies: [
      { name: "Hermes", description: "High-freq ingestion daemon", purpose: "Ticks & LOB Depth" },
      { name: "Argus", description: "MLARD regime sentinel", purpose: "Adaptive Detection" },
      { name: "Athena", description: "16-node strategy matrix", purpose: "Dynamic Execution" },
      { name: "Apollo", description: "Posterior signal oracle", purpose: "Probabilistic Logic" }
    ]
  },
  {
    id: "data",
    name: "Persistence",
    color: "#2dd4bf",
    technologies: [
      { name: "TimescaleDB", description: "Time-series SQL storage", purpose: "Institutional History" },
      { name: "Redis Streams", description: "High-throughput event bus", purpose: "Inter-agent Comms" },
      { name: "Absolute Time", description: "Anchor synchronization", purpose: "Zero Clock Drift" },
      { name: "Socket.io", description: "Real-time bridge pulse", purpose: "Dashboard Sync" }
    ]
  },
  {
    id: "ops",
    name: "MLOps & Integrity",
    color: "#06b6d4",
    technologies: [
      { name: "PSI Monitor", description: "Population Stability Index", purpose: "Feature Drift Detection" },
      { name: "ADWIN", description: "Adaptive Windowing", purpose: "Concept Drift Detection" },
      { name: "Model Registry", description: "Champion/Challenger tracking", purpose: "Governance" },
      { name: "Prometheus", description: "Metrics observability", purpose: "System Health" }
    ]
  }
];

export function TechStackGrid() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const toggleMobileExpand = (catId: string) => {
    setExpandedMobile(expandedMobile === catId ? null : catId);
  };

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-left mb-8 sm:mb-12"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4">Technology Stack</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-display tracking-tight text-white">Built With</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-light">
            Production-grade technologies selected for extreme performance, statistical rigor, and institutional scalability.
          </p>
        </motion.div>

        {/* Filter Pills - Horizontal Scroll on Mobile */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-hide snap-x snap-mandatory">
          <button
            onClick={() => setActiveCategory(null)}
            className={`snap-start flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase font-mono transition-all ${
              activeCategory === null 
                ? 'bg-cyan-500 text-[#0a0a0f] border border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                : 'bg-white/[0.03] text-slate-500 border border-white/[0.08] hover:border-cyan-500/20'
            }`}
          >
            All Systems
          </button>
          
          {techCategories.map((cat) => {
            const Icon = categoryIcons[cat.id as keyof typeof categoryIcons];
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-start flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase font-mono transition-all ${
                  activeCategory === cat.id 
                    ? 'text-white border shadow-lg' 
                    : 'bg-white/[0.03] text-slate-500 border border-white/[0.08] hover:border-cyan-500/20'
                }`}
                style={{
                  backgroundColor: activeCategory === cat.id ? `${cat.color}30` : undefined,
                  borderColor: activeCategory === cat.id ? `${cat.color}60` : undefined,
                  boxShadow: activeCategory === cat.id ? `0 0 20px ${cat.color}20` : undefined
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {techCategories
              .filter((cat) => !activeCategory || cat.id === activeCategory)
              .map((category) => {
                const Icon = categoryIcons[category.id as keyof typeof categoryIcons];

                return (
                  <motion.div
                    key={category.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] backdrop-blur-3xl relative overflow-hidden group hover:border-white/[0.12] transition-colors"
                  >
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity"
                      style={{ background: `radial-gradient(circle at top right, ${category.color}, transparent 70%)` }}
                    />

                    <div className="flex items-center gap-4 mb-8">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3"
                        style={{ backgroundColor: `${category.color}15` }}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: category.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-xl tracking-tight">{category.name}</h3>
                        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">{category.technologies.length} components</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {category.technologies.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="group/item p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all cursor-default"
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-1">
                              <Check className="w-4 h-4" style={{ color: category.color }} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-100 group-hover/item:text-white transition-colors">{tech.name}</h4>
                              <p className="text-slate-500 text-xs mb-1 font-light leading-relaxed">{tech.description}</p>
                              <div className="flex items-center gap-1.5 mt-2">
                                <Zap className="w-2.5 h-2.5 opacity-50" style={{ color: category.color }} />
                                <span className="text-[10px] font-mono uppercase tracking-[0.1em] font-medium" style={{ color: `${category.color}cc` }}>
                                  {tech.purpose}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default TechStackGrid;
