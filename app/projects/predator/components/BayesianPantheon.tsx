'use client';

import { motion } from 'framer-motion';
import { 
  Shield, Eye, Cpu, Zap, 
  Database, LineChart, Network, 
  Workflow, Boxes, Binary
} from 'lucide-react';

const agents = [
  {
    name: "Hermes",
    role: "The Ingestion Daemon",
    icon: Zap,
    description: "Ultra-low latency ProtoBuf stream handler for cTrader OpenAPI. Captures institutional LOB (Limit Order Book) depth and OFI (Order Flow Imbalance) at the socket level.",
    features: ["Sub-ms parsing", "TCP Absolute Anchor sync", "TimescaleDB Worker Pool"],
    color: "#22d3ee"
  },
  {
    name: "Argus",
    role: "The Regime Sentinel",
    icon: Eye,
    description: "Multivariate Gaussian Hidden Markov Model (HMM) for regime persistence detection. Analyzes a 68-feature matrix to identify structural market shifts in real-time.",
    features: ["BIC-optimized states", "HMM Persistence logic", "M1-Bridge Resampling"],
    color: "#14b8a6"
  },
  {
    name: "Athena",
    role: "The Logic Orchestrator",
    icon: Workflow,
    description: "Directed Acyclic Graph (DAG) state manager using LangGraph. Dynamically routes market signals to a 16-node Strategy Matrix based on Argus' regime consensus.",
    features: ["Context-aware DAG", "Strategy hot-swapping", "Sub-1ms state transitions"],
    color: "#2dd4bf"
  },
  {
    name: "Apollo",
    role: "The Inference Oracle",
    icon: Binary,
    description: "Performs Bayesian posterior probability fusion across Macro, Micro, and Sentiment nodes. Generates probabilistic trade directives with natural language rationale.",
    features: ["Posterior Fusion", "Multi-factor Inference", "Reasoning Narratives"],
    color: "#06b6d4"
  }
];

export default function BayesianPantheon() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">The Bayesian Pantheon</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">Multi-Agent Intelligence</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Predator Nexus V4.0 leverages a decentralized architecture of specialized agents, each serving as a critical pillar in the decision-making pipeline.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative p-8 sm:p-10 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md hover:border-cyan-500/20 transition-all duration-500"
            >
              {/* Corner accent */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ 
                  background: `radial-gradient(circle at top right, ${agent.color}, transparent 70%)` 
                }}
              />

              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${agent.color}15`, border: `1px solid ${agent.color}30` }}
                  >
                    <agent.icon className="w-7 h-7" style={{ color: agent.color }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{agent.name}</h3>
                    <p className="text-xs font-mono uppercase tracking-widest" style={{ color: agent.color }}>{agent.role}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-base leading-relaxed mb-8 flex-grow">
                  {agent.description}
                </p>

                <div className="space-y-3">
                  {agent.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: agent.color }} />
                      <span className="text-slate-500 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
