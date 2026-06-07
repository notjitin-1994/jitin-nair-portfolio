'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Zap, Brain, Activity, Clock, ShieldCheck, Search } from 'lucide-react';
import { AnimatedCounter } from '@/app/components/ui/AnimatedCounter';

const heroStats = [
  { label: 'p99 Latency', value: 8.4, suffix: 'ms', icon: Zap, color: '#22d3ee', decimals: 1 },
  { label: 'MLARD Accuracy', value: 91.2, suffix: '%', icon: Brain, color: '#14b8a6', decimals: 1 },
  { label: 'Drift Sensitivity', value: 0.1, suffix: ' PSI', icon: ShieldCheck, color: '#2dd4bf', decimals: 1 },
  { label: 'Active Agents', value: 6, suffix: '', icon: Clock, color: '#06b6d4' },
];

const pixelLetters = [
  [[1,1,1,1,1,1], [1,1,0,0,0,1], [1,1,1,1,1,1], [1,1,0,0,0,0], [1,1,0,0,0,0]], // P
  [[1,1,1,1,1,1], [1,1,0,0,0,1], [1,1,1,1,1,1], [1,1,0,1,0,0], [1,1,0,0,1,1]], // R
  [[1,1,1,1,1,1], [1,1,0,0,0,0], [1,1,1,1,1,0], [1,1,0,0,0,0], [1,1,1,1,1,1]], // E
  [[1,1,1,1,1,0], [1,1,0,0,0,1], [1,1,0,0,0,1], [1,1,0,0,0,1], [1,1,1,1,1,0]], // D
  [[0,0,1,1,0,0], [0,1,1,1,1,0], [1,1,0,0,1,1], [1,1,1,1,1,1], [1,1,0,0,1,1]], // A
  [[1,1,1,1,1,1], [0,0,1,1,0,0], [0,0,1,1,0,0], [0,0,1,1,0,0], [0,0,1,1,0,0]], // T
  [[0,1,1,1,1,0], [1,1,0,0,1,1], [1,1,0,0,1,1], [1,1,0,0,1,1], [0,1,1,1,1,0]], // O
  [[1,1,1,1,1,1], [1,1,0,0,0,1], [1,1,1,1,1,1], [1,1,0,1,0,0], [1,1,0,0,1,1]], // R
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
                    ? ['#22d3ee', '#14b8a6', '#2dd4bf', '#22d3ee']
                    : 'transparent',
                }}
                transition={{
                  opacity: { delay: (letterIndex * 5 + rowIndex * 6 + colIndex) * 0.01, duration: 0.1 },
                  scale: { delay: (letterIndex * 5 + rowIndex * 6 + colIndex) * 0.01, duration: 0.2 },
                  backgroundColor: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: letterIndex * 0.2,
                  },
                }}
              />
            ))
          )}
        </motion.div>
      ))}
      
      {/* Nexus V4 Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="flex items-end mb-1"
      >
        <span className="px-2 py-0.5 rounded bg-cyan-500 text-[10px] font-black tracking-tighter text-[#0a0a0f] uppercase font-mono">Nexus V4.0</span>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section 
      className="relative flex flex-col px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8 overflow-hidden min-h-[70vh]"
    >
      {/* 2026 Aurora Background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Glassmorphic Card containing all hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group relative rounded-[2.5rem] bg-white/[0.02] border border-white/[0.08] backdrop-blur-3xl p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden"
        >
          {/* Spotlight effect */}
          <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

          {/* Pixel Banner */}
          <div className="flex justify-start mb-10 sm:mb-12 relative z-10">
            <PixelBanner />
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 sm:mb-8 relative z-10"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-bold tracking-widest uppercase font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Production Ready · MLARD V2.0
            </span>
          </motion.div>

          {/* Description */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-100 text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-5xl mb-10 sm:mb-14 leading-[1.3] font-bold relative z-10 font-display tracking-tight"
          >
            Institutional-grade trading ecosystem orchestrating{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Multi-Layer Adaptive Regime Detection</span>
            {' '}and high-frequency execution with{' '}
            <span className="text-white underline underline-offset-[12px] decoration-cyan-500/30">sub-10ms decision integrity</span>
            {' '}across XAU/USD.
          </motion.h1>

          {/* Stats Grid - Mobile Optimized */}
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
                  className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all group active:scale-95 shadow-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner border border-white/5"
                      style={{ backgroundColor: `${stat.color}10` }}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color }} />
                    </div>
                    <span className="text-slate-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] font-mono">{stat.label}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter relative z-10 font-mono">
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

export default HeroSection;
