'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Zap, Brain, Activity, Clock } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';

const heroStats = [
  { label: 'Latency', value: 47, suffix: 'ms', icon: Zap, color: '#22d3ee' },
  { label: 'Accuracy', value: 88, suffix: '%', icon: Brain, color: '#14b8a6' },
  { label: 'Uptime', value: 99.9, suffix: '%', icon: Activity, color: '#2dd4bf', decimals: 1 },
  { label: 'Agents', value: 5, suffix: '', icon: Clock, color: '#5eead4' },
];

const pixelLetters = [
  [[1,1,1,1,1,1], [1,1,0,0,0,1], [1,1,1,1,1,1], [1,1,0,0,0,0], [1,1,0,0,0,0]],
  [[1,1,1,1,1,1], [1,1,0,0,0,1], [1,1,1,1,1,1], [1,1,0,1,0,0], [1,1,0,0,1,1]],
  [[1,1,1,1,1,1], [1,1,0,0,0,0], [1,1,1,1,1,0], [1,1,0,0,0,0], [1,1,1,1,1,1]],
  [[1,1,1,1,1,0], [1,1,0,0,0,1], [1,1,0,0,0,1], [1,1,0,0,0,1], [1,1,1,1,1,0]],
  [[0,0,1,1,0,0], [0,1,1,1,1,0], [1,1,0,0,1,1], [1,1,1,1,1,1], [1,1,0,0,1,1]],
  [[1,1,1,1,1,1], [0,0,1,1,0,0], [0,0,1,1,0,0], [0,0,1,1,0,0], [0,0,1,1,0,0]],
  [[0,1,1,1,1,0], [1,1,0,0,1,1], [1,1,0,0,1,1], [1,1,0,0,1,1], [0,1,1,1,1,0]],
  [[1,1,1,1,1,1], [1,1,0,0,0,1], [1,1,1,1,1,1], [1,1,0,1,0,0], [1,1,0,0,1,1]],
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
    </div>
  );
}

export function HeroSection() {
  return (
    <section 
      className="relative flex flex-col px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 pb-10 sm:pb-14 overflow-hidden min-h-[70vh]"
      style={{
        backgroundImage: 'url(/predator-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#0a0a0f]/70" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Glassmorphic Card containing all hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 md:p-10"
        >
          {/* Pixel Banner */}
          <div className="flex justify-start mb-6 sm:mb-8">
            <PixelBanner />
          </div>

          {/* Badge */}
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
              Autonomous XAU/USD Scalping Engine
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-400 text-base sm:text-lg md:text-xl max-w-4xl mb-8 sm:mb-12 leading-relaxed"
          >
            A multi-agent trading system deploying{' '}
            <span className="text-cyan-400">5 specialized AI agents</span>
            {' '}that detect market regimes, predict micro-movements, and execute
            sub-50ms trades with institutional-grade risk management.
          </motion.p>

          {/* Stats Grid - Mobile Optimized */}
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
                  className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:border-cyan-500/30 transition-all active:scale-95"
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
