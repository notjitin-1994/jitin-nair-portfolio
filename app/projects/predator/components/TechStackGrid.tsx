'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, Database, Brain, Check, ChevronDown } from 'lucide-react';

const categoryIcons = { core: Cpu, agents: Brain, data: Database, ml: Layers };

const techCategories = [
  {
    id: "core",
    name: "Core Engine",
    color: "#22d3ee",
    technologies: [
      { name: "Python 3.13", description: "Async-first implementation", purpose: "Logic Orchestration" },
      { name: "LangGraph", description: "Stateful agent DAG orchestration", purpose: "Multi-Agent Logic" },
      { name: "cTrader OpenAPI", description: "Direct ProtoBuf socket access", purpose: "Institutional Execution" },
      { name: "Numba", description: "JIT compiled machine code", purpose: "Vectorized Calculations" }
    ]
  },
  {
    id: "agents",
    name: "The Pantheon",
    color: "#14b8a6",
    technologies: [
      { name: "Hermes", description: "High-freq ingestion daemon", purpose: "Ticks & LOB Depth" },
      { name: "Argus", description: "HMM regime sentinel", purpose: "Bayesian Confluence" },
      { name: "Athena", description: "16-node strategy matrix", purpose: "Dynamic Execution" },
      { name: "Apollo", description: "Posterior signal oracle", purpose: "Probabilistic Signals" }
    ]
  },
  {
    id: "data",
    name: "Data & Pulse",
    color: "#2dd4bf",
    technologies: [
      { name: "TimescaleDB", description: "Time-series SQL storage", purpose: "Institutional Persistence" },
      { name: "Redis Streams", description: "High-throughput event bus", purpose: "Inter-agent Comms" },
      { name: "Socket.io", description: "Real-time bridge pulse", purpose: "Nexus Dashboard Sync" },
      { name: "Absolute Time", description: "Anchor synchronization", purpose: "Zero Clock Drift" }
    ]
  },
  {
    id: "ml",
    name: "Intelligence",
    color: "#06b6d4",
    technologies: [
      { name: "Multivariate HMM", description: "Gaussian Hidden Markov Model", purpose: "Regime Persistence" },
      { name: "Random Forest", description: "68-feature classifier matrix", purpose: "Trend Attribution" },
      { name: "Bayesian Fusion", description: "Posterior probability logic", purpose: "Signal Confluence" },
      { name: "ADWIN/PSI", description: "MLOps concept drift monitors", purpose: "Model Integrity" }
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
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">Technology Stack</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Built With</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Production-grade technologies selected for performance, reliability, and maintainability at scale.
          </p>
        </motion.div>

        {/* Filter Pills - Horizontal Scroll on Mobile */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-hide snap-x snap-mandatory">
          <button
            onClick={() => setActiveCategory(null)}
            className={`snap-start flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeCategory === null 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : 'bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:border-cyan-500/20'
            }`}
          >
            All Categories
          </button>
          
          {techCategories.map((cat) => {
            const Icon = categoryIcons[cat.id as keyof typeof categoryIcons];
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-start flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat.id 
                    ? 'text-white border' 
                    : 'bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:border-cyan-500/20'
                }`}
                style={{
                  backgroundColor: activeCategory === cat.id ? `${cat.color}20` : undefined,
                  borderColor: activeCategory === cat.id ? `${cat.color}50` : undefined
                }}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: cat.color }} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile: Accordion List / Desktop: Grid */}
        <div className="lg:hidden">
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {techCategories
                .filter((cat) => !activeCategory || cat.id === activeCategory)
                .map((category) => {
                  const Icon = categoryIcons[category.id as keyof typeof categoryIcons];
                  const isExpanded = expandedMobile === category.id;

                  return (
                    <motion.div
                      key={category.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="rounded-xl border border-white/[0.08] overflow-hidden"
                    >
                      {/* Category Header */}
                      <button
                        onClick={() => toggleMobileExpand(category.id)}
                        className="w-full p-4 flex items-center justify-between"
                        style={{ backgroundColor: `${category.color}10` }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${category.color}20` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: category.color }} />
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-white">{category.name}</h3>
                            <p className="text-slate-500 text-xs">{category.technologies.length} technologies</p>
                          </div>
                        </div>
                        
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-slate-500" />
                        </motion.div>
                      </button>

                      {/* Technologies List */}
                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 space-y-2">
                          {category.technologies.map((tech, index) => (
                            <motion.div
                              key={tech.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                            >
                              <div className="flex items-start gap-3">
                                <div 
                                  className="mt-0.5 w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${category.color}20` }}
                                >
                                  <Check className="w-3 h-3" style={{ color: category.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-slate-200 text-sm">{tech.name}</h4>
                                  <p className="text-slate-500 text-xs mb-1">{tech.description}</p>
                                  <p className="text-[10px]" style={{ color: `${category.color}99` }}>
                                    {tech.purpose}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {techCategories
              .filter((cat) => !activeCategory || cat.id === activeCategory)
              .map((category) => {
                const Icon = categoryIcons[category.id as keyof typeof categoryIcons];

                return (
                  <motion.div
                    key={category.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{category.name}</h3>
                        <p className="text-slate-500 text-sm">{category.technologies.length} technologies</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {category.technologies.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="group p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <Check className="w-4 h-4 text-cyan-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-200 group-hover:text-white transition-colors">{tech.name}</h4>
                              <p className="text-slate-500 text-xs mb-1">{tech.description}</p>
                              <p className="text-cyan-400/70 text-xs">{tech.purpose}</p>
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
