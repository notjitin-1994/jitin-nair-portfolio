'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ExpandableCard from './ExpandableCard';
import { projectsData } from '../data/projects';

export function DesktopProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const goToNext = useCallback(() => {
    if (expandedId) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  }, [expandedId]);

  const goToPrev = useCallback(() => {
    if (expandedId) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  }, [expandedId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') setExpandedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const project = projectsData[currentIndex];
  const isExpanded = expandedId === project.id;

  // Animation variants for the card slide
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(4px)',
    }),
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
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
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Production <span className="text-cyan-400 text-glow-cyan">Systems</span>
        </motion.h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Enterprise-grade implementations spanning algorithmic trading, multi-agent orchestration,
          and intelligent AI infrastructure.
        </p>
      </motion.div>

      {/* Main Carousel Area */}
      <div className="relative min-h-[550px] flex items-center justify-center">
        {/* Navigation Arrows - Repositioned for cleaner look */}
        <div className="absolute inset-y-0 -left-4 flex items-center z-20">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            disabled={!!expandedId}
            className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-400 transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-md"
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>
        </div>

        <div className="absolute inset-y-0 -right-4 flex items-center z-20">
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            disabled={!!expandedId}
            className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-400 transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-md"
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </div>

        {/* Card Display with AnimatePresence */}
        <div className="w-full relative overflow-visible flex justify-center py-4">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 400, damping: 35 },
                opacity: { duration: 0.3, ease: "easeOut" },
                scale: { duration: 0.3, ease: "easeOut" },
                filter: { duration: 0.3, ease: "easeOut" }
              }}
              className="w-full max-w-3xl perspective-1000"
            >
              <ExpandableCard 
                project={project}
                isExpanded={isExpanded}
                onExpand={() => handleExpand(project.id)}
                isDesktop={true}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination & Indicators */}
      <div className="flex flex-col items-center gap-8 mt-12">
        {/* Dots */}
        <div className="flex gap-3">
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (expandedId) return;
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className="group relative py-2"
            >
              <div className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex 
                  ? 'w-12 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' 
                  : 'w-3 bg-white/20 group-hover:bg-white/40'
              }`} />
            </button>
          ))}
        </div>

        {/* Status Text */}
        <div className="flex items-center gap-6">
          <div className="text-slate-500 text-sm font-mono tracking-widest flex items-center gap-3">
            <span className="text-cyan-400 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
            <div className="w-8 h-px bg-white/10" />
            <span>{String(projectsData.length).padStart(2, '0')}</span>
          </div>
          
          <div className="h-4 w-px bg-white/10" />
          
          <div className="flex items-center gap-4 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-medium">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">ESC</kbd>
              <span>Minimize</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">←</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">→</kbd>
              <span>Switch</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
