'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, ExternalLink, Shield, 
  Brain, Database, Search,
  Zap, Scale, ChevronRight, HardDrive, 
  FileSearch, Cpu, Lock, Network
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

// Pixel banner for LOCALMIND
const pixelLetters = [
  [[1,0,0,0,0,0], [1,0,0,0,0,0], [1,0,0,0,0,0], [1,0,0,0,0,0], [1,1,1,1,1,1]], // L
  [[0,1,1,1,1,0], [1,1,0,0,1,1], [1,1,0,0,1,1], [1,1,0,0,1,1], [0,1,1,1,1,0]], // O
  [[0,1,1,1,1,0], [1,1,0,0,0,0], [1,1,0,0,0,0], [1,1,0,0,0,0], [0,1,1,1,1,0]], // C
  [[0,0,1,1,0,0], [0,1,1,1,1,0], [1,1,0,0,1,1], [1,1,1,1,1,1], [1,1,0,0,1,1]], // A
  [[1,1,0,0,1,1], [1,1,1,0,1,1], [1,1,0,1,0,1], [1,1,0,0,0,1], [1,1,0,0,0,1]], // M
  [[0,1,1,1,1,0], [0,0,1,1,0,0], [0,0,1,1,0,0], [0,0,1,1,0,0], [0,1,1,1,1,0]], // I
  [[1,1,0,0,0,1], [1,1,1,0,0,1], [1,1,0,1,0,1], [1,1,0,0,1,1], [1,1,0,0,0,1]], // N
  [[1,1,1,1,1,0], [1,1,0,0,1,1], [1,1,0,0,1,1], [1,1,0,0,1,1], [1,1,1,1,1,0]], // D
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
        <span className="px-2 py-0.5 rounded bg-cyan-500 text-[10px] font-black tracking-tighter text-[#0a0a0f] uppercase">Privacy-First RAG</span>
      </motion.div>
    </div>
  );
}

const heroStats = [
  { label: 'Indexing', value: 1000, suffix: '/min', icon: Zap, color: '#22d3ee' },
  { label: 'Retrieval', value: 1, suffix: 's', icon: Search, color: '#14b8a6' },
  { label: 'File Types', value: 12, suffix: '+', icon: Database, color: '#2dd4bf' },
  { label: 'Infrastructure', value: 0, suffix: '', icon: Lock, color: '#06b6d4' },
];

function HeroSection() {
  return (
    <section className="relative flex flex-col px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8 overflow-hidden min-h-[70vh]">
      <div className="relative z-10 max-w-6xl mx-auto w-full text-slate-200">
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
              Local RAG & File Intelligence System
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-100 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mb-10 sm:mb-14 leading-relaxed font-semibold relative z-10"
          >
            LocalMind provides natural language interaction with your local filesystems, employing{' '}
            <span className="text-cyan-400">RRF-fused hybrid search</span>
            {' '}and{' '}
            <span className="text-teal-400 underline underline-offset-8 decoration-teal-500/30">incremental delta-indexing</span>
            {' '}to deliver grounded intelligence entirely offline.
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
                      decimals={0}
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
  { id: 'index-speed', label: 'Indexing Speed', value: 1000, unit: ' files/min', description: 'Delta-indexing via SHA-256 hashing', trend: 'up', trendValue: 'Scalable', color: '#22d3ee' },
  { id: 'retrieval-latency', label: 'Search Latency', value: 1, unit: 's', description: 'p99 hybrid-search response time', trend: 'stable', trendValue: '<1s', color: '#14b8a6' },
  { id: 'storage-efficiency', label: 'Storage Density', value: 1, unit: ' GB', description: 'Vector store size for 14,000+ files', trend: 'down', trendValue: '-60%', color: '#2dd4bf' },
  { id: 'accuracy', label: 'Factual Grounding', value: 98, unit: '%', description: 'Source-only citation accuracy', trend: 'up', trendValue: '+15%', color: '#06b6d4' },
];

function MetricsDashboard() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 text-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">Performance</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight text-white">System Velocity</h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            Optimized for large-scale local filesystems with sub-second retrieval across thousands of heterogeneous documents.
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
  { name: 'Core Pipeline', items: ['Python 3.10+', 'ChromaDB', 'rank_bm25', 'SHA-256'], color: '#22d3ee' },
  { name: 'AI & Inference', items: ['Gemini Embeddings', 'Gemini-2.5-Flash', 'Ollama Vision'], color: '#14b8a6' },
  { name: 'Parsers', items: ['AST (Python)', 'Regex (JS/TS)', 'pdfplumber', 'trafilatura'], color: '#2dd4bf' },
  { name: 'Interface', items: ['Rich CLI', 'REPL', 'Citations', 'JSON API'], color: '#06b6d4' },
];

function TechStackGrid() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent text-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">Architecture</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight text-white">The Local Stack</h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            A zero-infrastructure RAG engine utilizing specialized parsers and hybrid retrieval algorithms.
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
  { title: 'Incremental Scan', subtitle: 'SHA-256 Hashing', desc: 'Identifies file changes using content-based delta detection to minimize redundant processing.', icon: HardDrive, color: '#22d3ee' },
  { title: 'Intelligent Parsing', subtitle: 'AST & Regex', desc: 'Extracts semantic structures from code, markdown, and documents using format-aware logic.', icon: Cpu, color: '#14b8a6' },
  { title: 'Hybrid Retrieval', subtitle: 'RRF Fusion', desc: 'Combines Vector Search and BM25 using Reciprocal Rank Fusion for high-recall precision.', icon: Network, color: '#2dd4bf' },
  { title: 'Source Grounding', subtitle: 'Citation Engine', desc: 'Enforces strict local context mandates to eliminate LLM hallucinations and provide citations.', icon: Shield, color: '#06b6d4' },
];

function ProcessFlow() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 text-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-4">Pipeline</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight text-white">Data Lifecycle</h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            From raw filesystem walking to grounded natural language answers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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

function CTASection() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-8 md:px-12 border-t border-white/[0.05] relative text-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group p-10 sm:p-16 md:p-20 rounded-[3rem] bg-white/[0.02] border border-white/[0.08] relative overflow-hidden backdrop-blur-3xl"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          
          <div className="relative z-10 max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Your Files, Locally Grounded.</h2>
            <p className="text-slate-400 mb-10 text-lg sm:text-xl font-light leading-relaxed">
              LocalMind is open source and ready for deployment on any local hardware. Explore the hybrid retrieval pipeline and multi-format parsers on GitHub.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://github.com/notjitin-1994/localmind"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
                <ExternalLink className="w-5 h-5" />
              </a>

              <Link
                href="/projects"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.05] text-white font-medium border border-white/[0.1] hover:bg-white/[0.1] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Database className="w-5 h-5" />
                <span>Browse Projects</span>
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
            LocalMind · Python-Native RAG · Privacy-First Cognitive Search
          </p>
          <p className="text-slate-600 text-xs mt-2">© 2026 Jitin Nair. Engineered for data sovereignty.</p>
        </motion.div>
      </div>
    </section>
  );
}

export default function LocalMindPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/20 relative">
      <AuroraBackground />
      <HeroSection />
      
      <div className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8 pb-6 sm:pb-10">
        <ProcessFlow />
        <MetricsDashboard />
        <CodeShowcase />
        <TechStackGrid />
        <CTASection />
        <WorkingTogetherCTA />
      </div>

      <Footer />
    </main>
  );
}