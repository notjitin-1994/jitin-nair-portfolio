'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, LayoutDashboard, MapPin, Image as ImageIcon, Map, Users, Globe, Network } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '../../components/Footer';

// Minimalist, organic pixel banner
const pixelLetters = [
  [[0,1,1,1,0], [1,0,0,0,1], [1,0,0,0,0], [1,0,0,0,1], [0,1,1,1,0]], // C
  [[0,1,1,1,0], [1,0,0,0,1], [1,0,0,0,1], [1,0,0,0,1], [0,1,1,1,0]], // O
  [[1,0,0,0,1], [1,1,0,1,1], [1,0,1,0,1], [1,0,0,0,1], [1,0,0,0,1]], // M
  [[1,0,0,0,1], [1,1,0,1,1], [1,0,1,0,1], [1,0,0,0,1], [1,0,0,0,1]], // M
];

function PixelBanner() {
  return (
    <div className="flex gap-2 sm:gap-4 md:gap-6 opacity-70">
      {pixelLetters.map((letter, letterIndex) => (
        <motion.div
          key={letterIndex}
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${letter[0].length}, 4px)`,
            gridTemplateRows: `repeat(${letter.length}, 4px)`,
            gap: '2px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: letterIndex * 0.1 }}
        >
          {letter.map((row, rowIndex) =>
            row.map((pixel, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={pixel ? 'rounded-full w-[4px] h-[4px] sm:w-1.5 sm:h-1.5 md:w-2 md:h-2' : ''}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: pixel ? 1 : 0,
                  scale: pixel ? 1 : 0,
                  backgroundColor: pixel ? ['#fdba74', '#fed7aa', '#fdba74'] : 'transparent',
                }}
                transition={{
                  opacity: { delay: (letterIndex * 5 + rowIndex * 5 + colIndex) * 0.015, duration: 0.3 },
                  scale: { delay: (letterIndex * 5 + rowIndex * 5 + colIndex) * 0.015, duration: 0.4 },
                  backgroundColor: { duration: 4, repeat: Infinity, ease: 'linear', delay: letterIndex * 0.3 },
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
  { label: 'Map Tags', value: 1500, suffix: '+', icon: MapPin, color: '#fed7aa' },
  { label: 'Communities', value: 300, suffix: '+', icon: Users, color: '#ffedd5' },
  { label: 'Daily Posts', value: 50, suffix: 'K+', icon: ImageIcon, color: '#ffedd5' },
  { label: 'Coverage', value: 100, suffix: '%', icon: Globe, color: '#fdba74' },
];

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative flex flex-col px-4 sm:px-8 md:px-12 pt-32 sm:pt-40 pb-20 sm:pb-32 overflow-hidden min-h-[85vh] justify-center">
      <div className="absolute inset-0 bg-[#0a0500]" />
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-[0.05] pointer-events-none"
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="flex justify-start mb-10 sm:mb-14">
              <PixelBanner />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/[0.05] border border-orange-500/[0.1] text-orange-200 text-xs sm:text-sm tracking-wide uppercase font-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                </span>
                Community Communication Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight"
            >
              Connecting <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-500">
                People to Places.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-orange-100/60 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed font-light"
            >
              Commune redefines local engagement by anchoring digital conversations to physical reality. We built a geographical content engine where posts are organically aggregated through dynamic map tagging.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6 content-center"
          >
            {heroStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-6 rounded-2xl bg-orange-500/[0.02] border border-orange-500/[0.05] hover:bg-orange-500/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/[0.05] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-orange-200" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <span className="text-orange-200/50 text-sm font-medium uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  { title: 'Independent Tag Creation', desc: 'Locations exist autonomously as geographic anchor points.', icon: MapPin },
  { title: 'Content Generation', desc: 'Rich media posts with automated image compression.', icon: ImageIcon },
  { title: 'Dynamic Linking', desc: 'Optional 1:N mapping linking multiple posts to a single physical tag.', icon: Network },
  { title: 'Geographic Discovery', desc: 'Explore community updates naturally via an interactive map interface.', icon: Map },
];

function ProcessFlow() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 relative border-t border-orange-500/[0.05]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-left mb-16 max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Geographic Content Engine</h2>
          <p className="text-orange-100/60 text-lg sm:text-xl leading-relaxed font-light">
            A flexible relational architecture bridging the physical and digital.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-3xl bg-[#0a0500] border border-orange-500/[0.08] hover:border-orange-500/[0.2] transition-colors group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/[0.02] rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/[0.05] flex items-center justify-center border border-orange-500/[0.1]">
                    <Icon className="w-6 h-6 text-orange-200" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
                <p className="text-orange-100/60 leading-relaxed relative z-10">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

const techCategories = [
  { name: 'Frontend', items: ['Next.js 14', 'React Server Components', 'Tailwind CSS'], color: '#fdba74' },
  { name: 'Media Pipeline', items: ['Supabase Storage', 'WebP Optimization', 'CDN Delivery'], color: '#fed7aa' },
  { name: 'Backend', items: ['Supabase', 'PostgreSQL', 'Geospatial Queries'], color: '#ffedd5' },
];

function TechStackGrid() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#050200] border-t border-orange-500/[0.05]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">The Modern Stack</h2>
            <p className="text-orange-100/60 text-lg sm:text-xl leading-relaxed font-light">
              Built for speed and scale. Utilizing Supabase for fast media delivery and PostgreSQL for complex relational geospatial data mapping.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-orange-500/[0.02] border border-orange-500/[0.05]"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-xl bg-orange-500/[0.05] text-orange-200 text-sm font-medium tracking-wide border border-orange-500/[0.05]"
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

function CTASection() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 border-t border-orange-500/[0.05]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 sm:p-16 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-orange-500/[0.05] to-transparent border border-orange-500/[0.1] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/[0.02] blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Join the Commune</h2>
            <p className="text-orange-100/60 mb-10 text-lg sm:text-xl font-light leading-relaxed">
              Explore how location-based tagging transforms community interactions in our live platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://glitchzero.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-colors text-base"
              >
                <span>Launch Commune</span>
                <ExternalLink className="w-5 h-5" />
              </a>
              
              <Link
                href="/#projects"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.05] text-white font-medium border border-white/[0.1] hover:bg-white/[0.1] transition-colors text-base"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Return to Portfolio</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function CommunePage() {
  return (
    <main className="min-h-screen bg-[#0a0500] text-slate-200 font-sans selection:bg-orange-500/20">
      <HeroSection />
      <ProcessFlow />
      <TechStackGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
