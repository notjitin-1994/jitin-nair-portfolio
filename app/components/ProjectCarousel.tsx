'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Project {
  name: string;
  technologies: string[];
  description: string;
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProject = projects[currentIndex];

  const goToNext = useCallback(() => {
    setDirection(1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.x > threshold) {
        goToPrev();
      } else if (info.offset.x < -threshold) {
        goToNext();
      }
    },
    [goToNext, goToPrev]
  );

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, handleFlip]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
      rotateY: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
      rotateY: 0,
    }),
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card Container */}
      <div
        ref={containerRef}
        className="relative"
        style={{ perspective: '1200px' }}
      >
        {/* Navigation Arrows - Left - Desktop Only */}
        <button
          onClick={goToPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all active:scale-95"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Navigation Arrows - Right - Desktop Only */}
        <button
          onClick={goToNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all active:scale-95"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Card Stack */}
        <div className="relative h-[580px] md:h-[620px] cursor-grab active:cursor-grabbing">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 400, damping: 35, mass: 0.8 },
                opacity: { duration: 0.15 },
                scale: { duration: 0.2, ease: 'easeOut' },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={handleFlip}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Flip Container */}
              <motion.div
                className="w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* FRONT SIDE */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
                  
                  {/* Animated Gradient Orb */}
                  <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      x: isHovered ? -20 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: isHovered ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Glassmorphic Layer */}
                  <div 
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col p-8">
                    {/* Project Number */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-slate-500 font-mono text-sm">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </span>
                      <motion.div
                        animate={{ rotate: isHovered ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Sparkles className="w-5 h-5 text-cyan-400/60" />
                      </motion.div>
                    </div>

                    {/* Main Title */}
                    <div className="flex-1 flex flex-col justify-center">
                      <motion.h3
                        className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6"
                        layoutId={`title-${currentIndex}`}
                      >
                        {currentProject.name}
                      </motion.h3>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {currentProject.technologies.slice(0, 4).map((tech, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="px-3 py-1.5 text-xs font-medium rounded-full"
                            style={{
                              background: 'rgba(34, 211, 238, 0.1)',
                              color: '#22d3ee',
                              border: '1px solid rgba(34, 211, 238, 0.25)',
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Tap/Click Hint */}
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="text-cyan-400/60">Tap or click</span>
                      </motion.div>
                      <span>to flip</span>
                    </div>
                  </div>

                  {/* Decorative Corner Lines */}
                  <div className="absolute top-0 left-0 w-20 h-20">
                    <div className="absolute top-6 left-6 w-8 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
                    <div className="absolute top-6 left-6 w-px h-8 bg-gradient-to-b from-cyan-400/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20">
                    <div className="absolute bottom-6 right-6 w-8 h-px bg-gradient-to-l from-cyan-400/50 to-transparent" />
                    <div className="absolute bottom-6 right-6 w-px h-8 bg-gradient-to-t from-cyan-400/50 to-transparent" />
                  </div>
                </div>

                {/* BACK SIDE */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  {/* Darker Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
                  
                  {/* Cyan Glow Effect */}
                  <div 
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
                    }}
                  />

                  {/* Glassmorphic Layer */}
                  <div 
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col p-8">
                    {/* Header */}
                    <h4 className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-4">
                      Project Details
                    </h4>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {currentProject.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {currentProject.description}
                    </p>

                    {/* Features */}
                    <div className="flex-1">
                      <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        Key Features
                      </h5>
                      <ul className="space-y-2">
                        {currentProject.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                            <span className="text-cyan-400 mt-1">→</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
                      {currentProject.githubUrl && (
                        <a
                          href={currentProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                          style={{
                            background: 'rgba(34, 211, 238, 0.1)',
                            color: '#22d3ee',
                            border: '1px solid rgba(34, 211, 238, 0.25)',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                          <span>Source</span>
                        </a>
                      )}
                      {currentProject.liveUrl && (
                        <a
                          href={currentProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                          style={{
                            background: 'rgba(34, 211, 238, 0.15)',
                            color: '#22d3ee',
                            border: '1px solid rgba(34, 211, 238, 0.3)',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setIsFlipped(false);
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-8 bg-cyan-400'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Swipe Hint */}
        <p className="text-center text-slate-500 text-xs mt-4">
          Swipe or use arrow keys to navigate
        </p>
      </div>
    </div>
  );
}

export default ProjectCarousel;
