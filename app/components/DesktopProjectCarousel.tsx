'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ExpandableCard from './ExpandableCard';
import { projectsData } from '../data/projects';

// Simple fade transition for the non-selected card
const fadeTransition = {
  duration: 0.15,
  ease: "easeOut"
};

// Smooth expansion transition for the selected card
const expandTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export function DesktopProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);

  // Get current pair of projects
  const project1 = projectsData[currentIndex];
  const project2 = projectsData[(currentIndex + 1) % projectsData.length];

  const goToNext = useCallback(() => {
    if (expandedId) return; // Don't navigate if a card is expanded
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  }, [expandedId]);

  const goToPrev = useCallback(() => {
    if (expandedId) return; // Don't navigate if a card is expanded
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

  const isLeftExpanded = expandedId === project1.id;
  const isRightExpanded = expandedId === project2.id;
  const anyExpanded = expandedId !== null;

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-left mb-16"
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
          Production <span className="text-cyan-400">Systems</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 max-w-2xl text-lg"
        >
          Enterprise-grade implementations spanning algorithmic trading, multi-agent orchestration,
          browser automation, and AI infrastructure tooling.
        </motion.p>
      </motion.div>

      {/* Cards Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          disabled={anyExpanded}
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-400 transition-all z-10 group disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={goToNext}
          disabled={anyExpanded}
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-400 transition-all z-10 group disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next project"
        >
          <ChevronRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Cards Layout */}
        <div className="flex gap-6 relative">
          {/* Left Card */}
          <AnimatePresence mode="wait">
            {!isRightExpanded && (
              <motion.div
                key={`left-${project1.id}`}
                layout
                initial={direction !== 0 ? { x: direction > 0 ? -100 : 100, opacity: 0 } : { opacity: 1 }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  flex: isLeftExpanded ? 2 : 1,
                }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.1 }
                }}
                transition={isLeftExpanded ? expandTransition : { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="min-w-0"
              >
                <ExpandableCard 
                  project={project1}
                  isExpanded={isLeftExpanded}
                  onExpand={() => handleExpand(project1.id)}
                  isDesktop={true}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Card */}
          <AnimatePresence mode="wait">
            {!isLeftExpanded && (
              <motion.div
                key={`right-${project2.id}`}
                layout
                initial={direction !== 0 ? { x: direction > 0 ? 100 : -100, opacity: 0 } : { opacity: 1 }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  flex: isRightExpanded ? 2 : 1,
                }}
                exit={{ 
                  opacity: 0,
                  transition: { duration: 0.1 }
                }}
                transition={isRightExpanded ? expandTransition : { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="min-w-0"
              >
                <ExpandableCard 
                  project={project2}
                  isExpanded={isRightExpanded}
                  onExpand={() => handleExpand(project2.id)}
                  isDesktop={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Navigation */}
      <div className="flex flex-col items-center gap-6 mt-12">
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-sm font-mono">
            {String(currentIndex + 1).padStart(2, '0')}-{String((currentIndex + 1) % projectsData.length + 1).padStart(2, '0')}
          </span>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full"
              initial={false}
              animate={{ width: `${((currentIndex + 1) / projectsData.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-slate-500 text-sm font-mono">
            {String(projectsData.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-6 text-slate-500 text-sm">
          <span className="flex items-center gap-2">
            <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">←</kbd>
            <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">→</kbd>
            <span>Navigate</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-2">
            <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">ESC</kbd>
            <span>Close expanded</span>
          </span>
        </div>
      </div>
    </div>
  );
}
