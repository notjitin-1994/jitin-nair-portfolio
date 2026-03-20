'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Sparkles, Layers } from 'lucide-react';

interface Project {
  name: string;
  technologies: string[];
  description: string;
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface DesktopProductsProps {
  projects: Project[];
}

// Individual Project Card with 3D Flip
function ProductCard({
  project,
  index,
  isFlipped,
  onFlip,
}: {
  project: Project;
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative h-full cursor-pointer group"
      style={{ perspective: '1200px' }}
      onClick={onFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-2 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.8 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* 3D Flip Container */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d0d12] transition-all duration-300 hover:border-cyan-500/20"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-slate-500 font-mono text-xs">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <Sparkles className="w-4 h-4 text-cyan-400/60" />
              </motion.div>
            </div>

            {/* Title & Tech */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-white leading-tight mb-4">
                {project.name}
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-[10px] font-medium rounded-full"
                    style={{
                      background: 'rgba(34, 211, 238, 0.08)',
                      color: '#22d3ee',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <span className="text-slate-500 text-xs flex items-center gap-1.5">
                <motion.span
                  animate={{ x: isHovered ? 3 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
                Click to explore
              </span>
              <div className="flex gap-1.5">
                {project.githubUrl && (
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                    <Github className="w-3 h-3 text-slate-400" />
                  </div>
                )}
                {project.liveUrl && (
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
            <div className="absolute top-4 left-4 w-6 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
            <div className="absolute top-4 left-4 w-px h-6 bg-gradient-to-b from-cyan-400/50 to-transparent" />
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d0d12] transition-all duration-300 hover:border-cyan-500/20"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest">
                Details
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Features */}
            <div className="flex-1 overflow-hidden">
              <h5 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Features
              </h5>
              <ul className="space-y-1.5">
                {project.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-cyan-400 mt-0.5 flex-shrink-0">→</span>
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{
                    background: 'rgba(34, 211, 238, 0.1)',
                    color: '#22d3ee',
                    border: '1px solid rgba(34, 211, 238, 0.25)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3 h-3" />
                  <span>Source</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{
                    background: 'rgba(34, 211, 238, 0.15)',
                    color: '#22d3ee',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Live</span>
                </a>
              )}
            </div>

            {/* Click to flip back */}
            <div className="mt-3 text-center">
              <span className="text-slate-600 text-[10px]">Click to flip back</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DesktopProducts({ projects }: DesktopProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const cardsPerView = 3;
  const maxIndex = Math.max(0, projects.length - cardsPerView);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setFlippedCards(new Set()); // Reset flips on navigation
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setFlippedCards(new Set());
  }, []);

  const handleFlip = useCallback((index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const visibleProjects = projects.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section id="projects" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase mb-4"
          >
            Featured Deliverables
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Production <span className="text-cyan-400">Systems</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 max-w-2xl text-lg"
          >
            Enterprise-grade implementations spanning algorithmic trading, multi-agent orchestration, browser automation, and AI infrastructure tooling.
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div ref={containerRef} className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 w-12 h-12 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 w-12 h-12 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            aria-label="Next projects"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Grid */}
          <div className="overflow-hidden px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project, i) => (
                  <motion.div
                    key={project.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="h-[420px]"
                  >
                    <ProductCard
                      project={project}
                      index={currentIndex + i}
                      isFlipped={flippedCards.has(currentIndex + i)}
                      onFlip={() => handleFlip(currentIndex + i)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <span className="text-slate-500 text-sm font-mono">
              {String(currentIndex + 1).padStart(2, '0')} — {String(Math.min(currentIndex + cardsPerView, projects.length)).padStart(2, '0')} of {String(projects.length).padStart(2, '0')}
            </span>
            
            <div className="flex gap-2 ml-4">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    setFlippedCards(new Set());
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-8 bg-cyan-400'
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Keyboard Hint */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">←</kbd>
                <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">→</kbd>
                <span>Navigate</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-2">
                <span className="text-cyan-400">Click cards</span>
                <span>to flip</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesktopProducts;
