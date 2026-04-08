'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, ExternalLink, LayoutDashboard, Shield, 
  CheckCircle, AlertTriangle, Clock, Brain, 
  Database, Workflow, Layers, Activity, Search,
  Zap, Scale, ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { Footer } from '../../components/Footer';
import { WorkingTogetherCTA } from '@/app/components/WorkingTogetherCTA';
import { AnimatedCounter } from '@/app/components/ui/AnimatedCounter';
import { CodeShowcase } from './components/CodeShowcase';

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -inset-[10%] opacity-50">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-950/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}

// Pixel banner for RCE
const pixelLetters = [
  [[1,1,1,1,1,1], [1,1,0,0,0,1], [1,1,1,1,1,1], [1,1,0,1,0,0], [1,1,0,0,1,1]], // R
  [[0,1,1,1,1,0], [1,1,0,0,0,0], [1,1,0,0,0,0], [1,1,0,0,0,0], [0,1,1,1,1,0]], // C
  [[1,1,1,1,1,1], [1,1,0,0,0,0], [1,1,1,1,1,0], [1,1,0,0,0,0], [1,1,1,1,1,1]], // E
];

function PixelBanner() {
  return (
    <div className="flex gap-1.5 sm:gap-3 md:gap-4">
      {pixelLetters.map((letter, letterIndex) => (
        <motion.div
          key={letterIndex}
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${letter[0].length}, 3px)`,
            gridTemplateRows: `repeat(${letter.length}, 3px)`,
            gap: '1.5px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: letterIndex * 0.08 }}
        >
          {letter.map((row, rowIndex) =>
            row.map((pixel, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={pixel ? 'rounded-[1px] w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5' : ''}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: pixel ? 1 : 0,
                  scale: pixel ? 1 : 0,
                  backgroundColor: pixel
                    ? ['#22d3ee', '#14b8a6', '#22d3ee']
                    : 'transparent',
                }}
                transition={{
                  opacity: { delay: (letterIndex * 5 + rowIndex * 6 + colIndex) * 0.01, duration: 0.1 },
                  scale: { delay: (letterIndex * 5 + rowIndex * 6 + colIndex) * 0.01, duration: 0.2 },
                  backgroundColor: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: letterIndex * 0.2,
                  },
                }}
              />
            ))
          )}
        </motion.div>
      ))}
      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="flex items-end mb-1"
      >
        <span className="px-2 py-0.5 rounded bg-cyan-500 text-[10px] font-black tracking-tighter text-[#0a0a0f] uppercase">OpenClaw Native</span>
      </motion.div>
    </div>
  );
}

const heroStats = [
  { label: 'Latency', value: 0, suffix: 'ms', icon: Zap, color: '#22d3ee' },
  { label: 'Stages', value: 3, suffix: '', icon: Layers, color: '#14b8a6' },
  { label: 'Memory Tiers', value: 3, suffix: '', icon: Database, color: '#2dd4bf' },
  { label: 'Accuracy', value: 99.9, suffix: '%', icon: Shield, color: '#06b6d4', decimals: 1 },
];

function HeroSection() {
  return (
    <section className="relative flex flex-col px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8 overflow-hidden min-h-[70vh]">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group relative rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

          <div className="flex justify-start mb-10 sm:mb-12 relative z-10">
            <PixelBanner />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 sm:mb-8 relative z-10"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-medium tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Mission-Critical Reinforcement Layer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-100 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mb-10 sm:mb-14 leading-relaxed font-semibold relative z-10"
          >
            The Reality-Check Engine (RCE) is a hardware-level mandate for truth, enforcing a{' '}
            <span className="text-cyan-400">3-stage verification pipeline</span>
            {' '}and hierarchical cognitive memory to eliminate agentic hallucinations in the{' '}
            <span className="text-teal-400 underline underline-offset-8 decoration-teal-500/30">OpenClaw ecosystem</span>.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10"
          >
            {heroStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all group active:scale-95 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner"
                      style={{ backgroundColor: `${stat.color}15` }}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
                    </div>
                    <span className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      duration={2.5}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const metrics = [
  { id: 'latency', label: 'Plugin Latency', value: 0, unit: 'ms', description: 'Zero-latency integration via OpenClaw hooks', trend: 'stable', trendValue: 'Hook-based', color: '#22d3ee' },
  { id: 'memory-distill', label: 'Context Bloat', value: 40, unit: '%', description: 'Reduction in noise via Dreamcycle distillation', trend: 'down', trendValue: '-40%', color: '#14b8a6' },
  { id: 'verification', label: 'CoVe Recall', value: 92, unit: '%', description: 'Chain-of-Verification factual recall accuracy', trend: 'up', trendValue: '+12%', color: '#2dd4bf' },
  { id: 'throughput', label: 'Memory Ops', value: 1200, unit: 'ops/s', description: 'LanceDB hybrid retrieval performance', trend: 'up', trendValue: 'Vector+BM25', color: '#06b6d4' },
];

function MetricsDashboard() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">Efficacy</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">Governance Metrics</h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            Quantifying the impact of the Reality-Check Engine on agentic performance, truth-alignment, and memory efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/20 transition-all group"
            >
              <p className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">{metric.label}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  <AnimatedCounter value={metric.value} suffix={metric.unit} />
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{metric.description}</p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono text-cyan-400/70">{metric.trendValue}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const techCategories = [
  { name: 'Core Engine', items: ['TypeScript', 'OpenClaw SDK', 'Sequential Hooks', 'Systemd'], color: '#22d3ee' },
  { name: 'Reasoning', items: ['Gemini-3-Flash', 'Chain-of-Verification', 'Source-Only Logic'], color: '#14b8a6' },
  { name: 'Memory', items: ['LanceDB', 'Hybrid Search (Vector+BM25)', 'Weibull Decay'], color: '#2dd4bf' },
  { name: 'Governance', items: ['LEARNINGS.md', 'ERRORS.md', 'Audit Trails'], color: '#06b6d4' },
];

function TechStackGrid() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">Architecture</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">The RCE Stack</h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            A production-grade infrastructure engineered for zero-latency enforcement and long-term hierarchical memory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 transition-all group"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full bg-cyan-500" />
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] text-slate-300 text-sm border border-white/[0.08] group-hover:border-cyan-500/20 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  { 
    title: 'Intent Validation', 
    subtitle: 'Hook: before_tool_call',
    desc: 'Secondary reasoning model validates tool arguments against original user intent before execution.', 
    icon: Zap, 
    color: '#22d3ee' 
  },
  { 
    title: 'Truth Guard', 
    subtitle: 'Hook: message_sending',
    desc: 'Chain-of-Verification (CoVe) parses responses to identify and flag factual contradictions.', 
    icon: Shield, 
    color: '#14b8a6' 
  },
  { 
    title: 'Strict RAG', 
    subtitle: 'Hook: before_prompt_build',
    desc: 'Enforces source-only logic and citation requirements through mandatory system context injection.', 
    icon: Scale, 
    color: '#2dd4bf' 
  },
  { 
    title: 'Hybrid Retrieval', 
    subtitle: 'LanceDB Engine',
    desc: 'RRF-fused Vector + BM25 search ensures high-fidelity recall across L0/L1/L2 memory layers.', 
    icon: Search, 
    color: '#06b6d4' 
  },
  { 
    title: 'Memory Lifecycle', 
    subtitle: 'Weibull Decay',
    desc: 'Dynamic tiering (Core/Working/Peripheral) based on recency, frequency, and importance weights.', 
    icon: Clock, 
    color: '#0ea5e9' 
  },
  { 
    title: 'Dreamcycle', 
    subtitle: 'Nightly Distillation',
    desc: 'Automated routines prune low-relevance noise and consolidate recurring facts into core memory.', 
    icon: Brain, 
    color: '#22d3ee' 
  },
];

function ProcessFlow() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">Pipeline</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">3-Stage Governance</h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            The Reality-Check verification loop intercepts every agentic action within the OpenClaw ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 opacity-transition" style={{ background: `radial-gradient(circle at top right, ${step.color}, transparent 70%)` }} />
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`} style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                  <Icon className="w-6 h-6" style={{ color: step.color }} />
                </div>
                
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-2">{step.subtitle}</p>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const innovations = [
  { title: 'Zero-Latency Hooks', desc: 'Direct integration into OpenClaw event bus ensuring governance doesn\'t impede execution speed.' },
  { title: 'Chain-of-Verification', desc: 'Self-correcting truth-guard that fact-checks AI claims against verified database records.' },
  { title: 'Weibull Decay Lifecycle', desc: 'Sophisticated memory retention model that prioritizes important facts while pruning context noise.' },
  { title: 'Hybrid RRF Retrieval', desc: 'Combines semantic understanding with keyword precision to achieve near-perfect factual recall.' },
  { title: 'Automated Distillation', desc: 'Nightly "Dreamcycle" routines that condense thousands of daily events into core cognitive insights.' },
  { title: 'Hallucination Blockade', desc: 'Mandatory validation gate for sensitive tools like filesystem access or financial transactions.' },
];

function InnovationsSection() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">Innovation</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight">Key Advancements</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 transition-all flex flex-col gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <h4 className="font-bold text-white text-lg">{innovation.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{innovation.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-8 md:px-12 border-t border-white/[0.05] relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group p-10 sm:p-16 md:p-20 rounded-[3rem] bg-white/[0.02] border border-white/[0.08] relative overflow-hidden backdrop-blur-3xl"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          
          <div className="relative z-10 max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Truth is Mandatory.</h2>
            <p className="text-slate-400 mb-10 text-lg sm:text-xl font-light leading-relaxed">
              The Reality-Check Engine source code and the Dreamcycle memory skill are available for OpenClaw users. Explore the implementation of high-stakes AI governance.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://github.com/notjitin-1994/reality-check-engine"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github className="w-5 h-5" />
                <span>Request Source Access</span>
                <ExternalLink className="w-5 h-5" />
              </a>

              <Link
                href="/agents"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.05] text-white font-medium border border-white/[0.1] hover:bg-white/[0.1] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Workflow className="w-5 h-5" />
                <span>Explore the Fleet</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.05]"
        >
          <p className="text-slate-500 text-sm font-medium">
            Reality-Check Engine · Native OpenClaw Plugin · Hierarchical Memory Architecture
          </p>
          <p className="text-slate-600 text-xs mt-2">© 2026 Jitin Nair. Governance for the Agentic Era.</p>
        </motion.div>
      </div>
    </section>
  );
}

export default function RealityPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/20 relative">
      <AuroraBackground />
      <HeroSection />
      
      <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8 pb-6 sm:pb-10">
        <ProcessFlow />
        <MetricsDashboard />
        <CodeShowcase />
        <InnovationsSection />
        <TechStackGrid />
        <CTASection />
        <WorkingTogetherCTA />
      </div>

      <Footer />
    </main>
  );
}
