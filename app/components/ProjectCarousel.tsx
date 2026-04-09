'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandableCard from './ExpandableCard';
import { projectsData } from '../data/projects';

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  }, []);

  const setIndex = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Touch/drag handlers for navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button, a, [role="button"]')) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStartX;
    setDragOffset(delta);
  }, [isDragging, dragStartX]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    const threshold = 50;
    if (dragOffset > threshold) {
      goToPrev();
    } else if (dragOffset < -threshold) {
      goToNext();
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [dragOffset, goToNext, goToPrev, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, [role="button"]')) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    setDragOffset(delta);
  }, [isDragging, dragStartX]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    const threshold = 50;
    if (dragOffset > threshold) {
      goToPrev();
    } else if (dragOffset < -threshold) {
      goToNext();
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [dragOffset, goToNext, goToPrev, isDragging]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  const currentProject = projectsData[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            <ExpandableCard 
              project={currentProject} 
              layoutId={`project-${currentIndex}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4 md:mt-6">
        {projectsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-cyan-400'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Project Counter */}
      <div className="text-center mt-2 md:mt-4 text-slate-400 text-sm">
        <span className="text-cyan-400 font-medium">{currentIndex + 1}</span>
        <span className="mx-2">/</span>
        <span>{projectsData.length}</span>
      </div>
    </div>
  );
}
