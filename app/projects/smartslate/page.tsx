'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, LayoutDashboard, Sparkles, Clock, Users, Brain, Zap } from 'lucide-react';
import Link from 'next/link';

// Pixel banner for SMARTSLATE
const pixelLetters = [
  [[0,0,1,1,1,1], [0,1,1,0,0,0], [0,0,1,1,1,0], [0,0,0,0,1,1], [0,1,1,1,1,0]],
  [[1,1,0,0,0,0], [1,1,1,1,0,0], [1,1,0,0,1,1], [1,1,0,0,1,1], [1,1,1,1,0,0]],
  [[0,1,1,1,1,0], [1,1,0,0,1,1], [1,1,1,1,1,1], [1,1,0,0,1,1], [1,1,0,0,1,1]],
  [[1,1,1,1,1,0], [1,1,0,0,1,1], [1,1,1,1,1,0], [1,1,0,1,0,0], [1,1,0,0,1,1]],
  [[1,1,1,1,1,1], [0,1,1,0,0,0], [0,0,1,1,0,0], [0,0,1,1,0,0], [0,0,1,1,0,0]],
  [[0,1,1,1,1,0], [1,1,0,0,0,0], [0,1,1,1,0,0], [0,0,0,1,1], [1,1,1,1,0]],
  [[1,1,1,1,1,0], [0,0,1,1,0,0], [0,0,1,1,0,0], [0,0,1,1,0,0], [1,1,1,1,1,1]],
  [[1,1,1,1,1,0], [1,1,0,0,0,0], [1,1,1,1,1,0], [1,1,0,0,0,0], [1,1,1,1,1,0]],
  [[1,1,1,1,1,1], [1,1,0,0,0,0], [1,1,1,1,1,0], [1,1,0,0,0,0], [1,1,0,0,0,0]],
];

function PixelBanner() {
  return (
    <div className="flex gap-1.5 sm:gap-2 md:gap-3">
      {pixelLetters.map((letter, letterIndex) => (
        <motion.div
          key={letterIndex}
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${letter[0].length}, 2px)`,
            gridTemplateRows: `repeat(${letter.length}, 2px)`,
            gap: '1px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: letterIndex * 0.06 }}
        >
          {letter.map((row, rowIndex) =>
            row.map((pixel, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={pixel ? 'rounded-[0.5px] w-[2px] h-[2px] sm:w-[3px] sm:h-[3px]' : ''}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: pixel ? 1 : 0,
                  scale: pixel ? 1 : 0,
                  backgroundColor: pixel
                    ? ['#22d3ee', '#a78bfa', '#22d3ee']
                    : 'transparent',
                }}
                transition={{
                  opacity: { delay: (letterIndex * 4 + rowIndex * 5 + colIndex) * 0.008, duration: 0.08 },
                  scale: { delay: (letterIndex * 4 + rowIndex * 5 + colIndex) * 0.008, duration: 0.15 },
                  backgroundColor: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: letterIndex * 0.15,
                  },
                }}
              />
            ))
          )}
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedCounter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onViewportEnter={() => {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
      }}
    >
      {count.toFixed(decimals)}{suffix}
    </motion.span>
  );
}

const heroStats = [
  { label: 'Stages', value: 7, suffix: '', icon: Sparkles, color: '#22d3ee' },
  { label: 'Providers', value: 3, suffix: '', icon: Brain, color: '#a78bfa' },
  { label: 'Jobs/Day', value: 500, suffix: '+', icon: Zap, color: '#22c55e' },
  { label: 'Speed', value: 45, suffix: 's', icon: Clock, color: '#f472b6' },
];

function HeroSection() {
  return (
    <section className="relative flex flex-col px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 pb-10 sm:pb-14 overflow-hidden min-h-[70vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d12] to-[#0a0a0f]" />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 md:p-10"
        >
          <div className="flex justify-start mb-6 sm:mb-8">
            <PixelBanner />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              AI-First Learning & Development Platform
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-400 text-base sm:text-lg md:text-xl max-w-4xl mb-8 sm:mb-12 leading-relaxed"
          >
            AI-native L&D platform with{' '}
            <span className="text-cyan-400">Human-in-the-Loop validation</span>
            , automating discovery to delivery while maintaining quality through expert oversight.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            {heroStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: stat.color }} />
                    </div>
                    <span className="text-slate-500 text-[10px] sm:text-xs">{stat.label}</span>
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
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
  { id: 'stages', label: 'Questionnaire Stages', value: 7, unit: '', description: 'Contextual discovery flow', trend: 'stable', trendValue: '7' },
  { id: 'providers', label: 'AI Providers', value: 3, unit: '', description: 'Multi-provider redundancy', trend: 'up', trendValue: '+1' },
  { id: 'jobs', label: 'Async Jobs', value: 500, unit: '/day', description: 'Daily background processing', trend: 'up', trendValue: '+150' },
  { id: 'time', label: 'Report Generation', value: 45, unit: 'sec', description: 'Average generation time', trend: 'down', trendValue: '-15s' },
];

function MetricsDashboard() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">Performance</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Platform at a Glance</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Real-time metrics from the learning platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/20 transition-all"
            >
              <p className="text-slate-500 text-xs mb-2">{metric.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-white">{metric.value}{metric.unit}</span>
              </div>
              <p className="text-slate-400 text-xs mt-2">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const techCategories = [
  { name: 'Frontend', items: ['React 18', 'TypeScript', 'Vite', 'Framer Motion'], color: '#22d3ee' },
  { name: 'AI/ML', items: ['Claude 3.5', 'GPT-4o', 'Perplexity'], color: '#a78bfa' },
  { name: 'Backend', items: ['Supabase', 'PostgreSQL', 'Edge Functions'], color: '#f472b6' },
  { name: 'Pipeline', items: ['Webhook Workers', 'Job Queue', 'Real-time'], color: '#22c55e' },
];

function TechStackGrid() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">Technology</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Built With</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Modern stack for AI-native learning experiences.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 sm:p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/20 transition-all"
            >
              <h3 className="text-cyan-400 font-medium mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-slate-300 text-sm border border-white/[0.08]"
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
  { title: 'Discovery', desc: 'Role & organization analysis', color: '#22d3ee' },
  { title: 'Questionnaire', desc: '7-stage contextual flow', color: '#a78bfa' },
  { title: 'AI Analysis', desc: 'Multi-provider processing', color: '#22d3ee' },
  { title: 'Async Generation', desc: 'Background job queue', color: '#a78bfa' },
  { title: 'HITL Review', desc: 'Expert validation', color: '#22d3ee' },
  { title: 'Delivery', desc: 'Interactive Starmap', color: '#a78bfa' },
];

function ProcessFlow() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">Pipeline</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">HITL Learning Pipeline</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            From discovery to delivery with human oversight at every stage.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/20 transition-all"
            >
              <div
                className="absolute -top-3 -left-3 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: `${step.color}20`, color: step.color }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-white font-medium mb-2 mt-2">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const innovations = [
  'Human-in-the-Loop validation gates at every stage',
  'Automated discovery via 7-stage questionnaires',
  'AI-native instructional design frameworks',
  'Integrated content development workflows',
  'Unified AI-powered LMS with adaptive paths',
  '24/7 AI Tutor with human escalation',
];

function InnovationsSection() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3">Innovation</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Key Innovations</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/20 transition-all flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
              <p className="text-slate-300 text-sm">{innovation}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20"
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4">Experience Smartslate</h2>
          <p className="text-slate-400 mb-6 sm:mb-8 max-w-xl text-sm sm:text-base">
            Visit the live platform to see AI-native learning in action with Human-in-the-Loop validation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="https://smartslate.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all text-sm sm:text-base"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Visit Live Site</span>
            </a>
            
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white/[0.03] text-slate-300 border border-white/[0.08] hover:border-cyan-500/20 transition-all text-sm sm:text-base"
            >
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Dashboard</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/[0.08]"
        >
          <p className="text-slate-500 text-xs sm:text-sm">
            Smartslate · Built with React, Supabase, and Claude
          </p>
          <p className="text-slate-600 text-[10px] sm:text-xs mt-1 sm:mt-2">© 2026 Jitin Nair. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}

export default function SmartslatePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/[0.1] text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all text-xs sm:text-sm"
          >
            <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Dashboard</span>
          </Link>
        
      {/* Cross-link to Case Study */}
      <section className="py-10 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/case-studies/smartslate-learning-platform" className="group block p-5 sm:p-6 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-violet-400 font-mono uppercase tracking-wider mb-1">Detailed Case Study</p>
                <p className="text-sm sm:text-base text-slate-300">Read the full breakdown — challenge, solution, results, and tech stack →</p>
              </div>
              <svg className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
          </Link>
        </div>
      </section>
</div>
      </nav>

      <HeroSection />
      <ProcessFlow />
      <MetricsDashboard />
      <InnovationsSection />
      <TechStackGrid />
      <CTASection />
    </main>
  );
}
