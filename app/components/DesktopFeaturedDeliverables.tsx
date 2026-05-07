'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

interface Project {
  name: string;
  technologies: string[];
  description: string;
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface DesktopFeaturedDeliverablesProps {
  projects: Project[];
}

// Individual Project Card Component with 3D Flip
function ProjectCard({ 
  project, 
  index, 
  isFlipped, 
  onFlip,
  isFocused 
}: { 
  project: Project; 
  index: number; 
  isFlipped: boolean;
  onFlip: () => void;
  isFocused: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative aspect-[4/5] cursor-pointer group"
      style={{ perspective: '1200px' }}
      onClick={onFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onFlip();
        }
      }}
      role="button"
      aria-label={`View details for ${project.name}`}
      aria-pressed={isFlipped}
    >
      {/* Glow Effect Behind Card */}
      <motion.div
        className="absolute -inset-2 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* 3D Flip Container */}
      <motion.div
        className="relative w-full h-full"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          y: isHovered && !isFlipped ? -8 : 0,
        }}
        transition={{ 
          rotateY: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
          y: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        }}
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
          
          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute -top-32 -right-32 w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, transparent 70%)',
            }}
            animate={{
              scale: isHovered ? 1.3 : 1,
              x: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
            }}
            animate={{
              scale: isHovered ? 1.4 : 1,
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Glassmorphic Layer */}
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />

          {/* Hover Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: '1px solid rgba(34, 211, 238, 0.3)',
              boxShadow: 'inset 0 0 30px rgba(34, 211, 238, 0.05)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-6 lg:p-8">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold font-mono" style={{ color: '#22d3ee' }}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center">
              <motion.h3
                className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-6"
                layoutId={`desktop-title-${index}`}
              >
                {project.name}
              </motion.h3>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                    className="px-3 py-1.5 text-xs font-medium rounded-full"
                    style={{
                      background: 'rgba(34, 211, 238, 0.08)',
                      color: '#22d3ee',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Footer Hint */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
              <span className="text-slate-500 text-sm flex items-center gap-2">
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
                Click to explore
              </span>
              <div className="flex gap-2">
                {project.liveUrl && (
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Decorative Corner Lines */}
          <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
            <motion.div 
              className="absolute top-6 left-6 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? 32 : 24 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="absolute top-6 left-6 w-px bg-gradient-to-b from-cyan-400/50 to-transparent"
              initial={{ height: 0 }}
              animate={{ height: isHovered ? 32 : 24 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
            <motion.div 
              className="absolute bottom-6 right-6 h-px bg-gradient-to-l from-cyan-400/50 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? 32 : 24 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="absolute bottom-6 right-6 w-px bg-gradient-to-t from-cyan-400/50 to-transparent"
              initial={{ height: 0 }}
              animate={{ height: isHovered ? 32 : 24 }}
              transition={{ duration: 0.3 }}
            />
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
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.06) 0%, transparent 70%)',
            }}
          />

          {/* Glassmorphic Layer */}
          <div 
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.04) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(34, 211, 238, 0.15)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">
                Project Details
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
              {project.description}
            </p>

            {/* Features */}
            <div className="flex-1 overflow-hidden">
              <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Key Features
              </h5>
              <ul className="space-y-2.5">
                {project.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-cyan-400 mt-0.5 flex-shrink-0">→</span>
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex gap-3 mt-6 pt-5 border-t border-white/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
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
              {!project.liveUrl && (
                <span className="flex-1 text-center text-slate-500 text-sm py-3">
                  Production Environment
                </span>
              )}
            </div>

            {/* Click to flip back hint */}
            <div className="mt-4 text-center">
              <span className="text-slate-600 text-xs">Click to flip back</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DesktopFeaturedDeliverables({ projects }: DesktopFeaturedDeliverablesProps) {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [focusedCard, setFocusedCard] = useState<number | null>(null);

  const handleFlip = useCallback((index: number) => {
    setFlippedCards(prev => {
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
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedCard(prev => {
          if (prev === null) return 0;
          const maxIndex = projects.length - 1;
          if (e.key === 'ArrowLeft') {
            return prev > 0 ? prev - 1 : maxIndex;
          } else {
            return prev < maxIndex ? prev + 1 : 0;
          }
        });
      }
      if ((e.key === 'Enter' || e.key === ' ') && focusedCard !== null) {
        e.preventDefault();
        handleFlip(focusedCard);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedCard, projects.length, handleFlip]);

  // Focus management
  useEffect(() => {
    if (focusedCard !== null) {
      const card = document.getElementById(`project-card-${focusedCard}`);
      card?.focus();
    }
  }, [focusedCard]);

  return (
    <section id="projects" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20"
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
            Production Systems &{' '}
            <span className="text-cyan-400">Platform Architecture</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 max-w-2xl text-lg"
          >
            Enterprise-grade solutions built for scale, performance, and measurable business impact.
            Click any card to explore details.
          </motion.p>
        </motion.div>

        {/* Projects Grid - 3x2 Layout */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          role="grid"
          aria-label="Featured projects grid"
        >
          {projects.map((project, index) => (
            <div 
              key={project.name}
              id={`project-card-${index}`}
              role="gridcell"
              tabIndex={focusedCard === index ? 0 : -1}
              aria-label={`${project.name} - Press Enter to flip card`}
            >
              <ProjectCard
                project={project}
                index={index}
                isFlipped={flippedCards.has(index)}
                onFlip={() => handleFlip(index)}
                isFocused={focusedCard === index}
              />
            </div>
          ))}
        </div>

        {/* Keyboard Navigation Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 text-slate-500 text-sm">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">←</kbd>
              <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">→</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">Enter</kbd>
              <span>Flip Card</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-cyan-400">Click</span>
              <span>to Explore</span>
            </span>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
        >
          {[
            { value: "6", label: "Production Systems" },
            { value: "200+", label: "Agents Deployed" },
            { value: "95%", label: "Uptime SLA" },
            { value: "24/7", label: "Monitoring" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-cyan-500/20 transition-colors"
            >
              <div className="text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default DesktopFeaturedDeliverables;