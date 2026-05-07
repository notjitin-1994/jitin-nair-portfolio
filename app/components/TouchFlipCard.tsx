'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TouchFlipCardProps {
  project: {
    name: string;
    technologies: string[];
    description: string;
    features: string[];
    githubUrl?: string;
    liveUrl?: string;
    learnMoreUrl?: string;
    image?: string; // optional background
  };
}

export function TouchFlipCard({ project }: TouchFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleFlip();
      }
    },
    [handleFlip]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setIsFlipped(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsFlipped(false);
  }, []);

  return (
    <div
      className="relative w-full max-w-[280px] mx-auto cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${project.name} project card. Press Enter to flip and see details.`}
      aria-pressed={isFlipped}
    >
      {/* Card Container with 3D Transform */}
      <motion.div
        className="relative w-full"
        style={{
          aspectRatio: '2/3',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier for 60fps
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Background Image or Gradient */}
          {project.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          )}

          {/* Glassmorphic Overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
            {/* Project Name */}
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">
              {project.name}
            </h3>

            {/* Technology Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full"
                  style={{
                    backgroundColor: 'rgba(34, 211, 238, 0.15)',
                    color: '#22d3ee',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Tap Hint (Mobile) */}
            <div className="absolute bottom-4 text-white/50 text-xs flex items-center gap-1 md:hidden">
              <span>Tap to flip</span>
            </div>

            {/* Hover Hint (Desktop) */}
            <div className="absolute bottom-4 text-white/50 text-xs hidden md:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Hover to flip</span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

          {/* Glassmorphic Overlay */}
          <div
            className="absolute inset-0 border rounded-2xl"
            style={{
              backgroundColor: 'rgba(34, 211, 238, 0.08)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderColor: 'rgba(34, 211, 238, 0.25)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full p-6">
            {/* Header */}
            <h3
              className="text-xl font-bold mb-3 tracking-tight"
              style={{ color: '#22d3ee' }}
            >
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-white/80 text-sm leading-relaxed mb-4 flex-shrink-0">
              {project.description}
            </p>

            {/* Features */}
            <div className="flex-1 overflow-hidden">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">
                Key Features
              </h4>
              <ul className="space-y-1.5">
                {project.features.slice(0, 4).map((feature, index) => (
                  <li
                    key={index}
                    className="text-xs text-white/70 flex items-start gap-2"
                  >
                    <span style={{ color: '#22d3ee' }}>•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
              {project.learnMoreUrl && (
                <Link
                  href={project.learnMoreUrl}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(34, 211, 238, 0.2)',
                    color: '#22d3ee',
                    border: '1px solid rgba(34, 211, 238, 0.4)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Learn more about ${project.name}`}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(34, 211, 238, 0.15)',
                    color: '#22d3ee',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                  }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`View ${project.name} live demo`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Glow Effect on Hover (Desktop) */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15), transparent 70%)`,
          zIndex: -1,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export default TouchFlipCard;
