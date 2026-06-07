'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, ExternalLink, FileText, ChevronDown, Quote, Newspaper, Book, Shield } from 'lucide-react';
import { citations } from '../data/citations';

const typeIcons = { paper: FileText, book: Book, article: Newspaper, standard: Shield };
const typeColors = { paper: '#22d3ee', book: '#14b8a6', article: '#2dd4bf', standard: '#06b6d4' };

function CitationCard({ citation, index }: { citation: typeof citations[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = typeIcons[citation.type as keyof typeof typeIcons];
  const color = typeColors[citation.type as keyof typeof typeColors];

  return (
    <motion.div
      key={citation.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-5 sm:p-7 rounded-[1.5rem] border transition-all duration-500 cursor-pointer relative overflow-hidden active:scale-[0.99] ${
          isExpanded 
            ? 'bg-cyan-500/[0.04] border-cyan-500/30 shadow-xl' 
            : 'bg-white/[0.02] border-white/[0.06] hover:border-cyan-500/20'
        }`}
      >
        <div className="flex items-start gap-4 sm:gap-6 relative z-10">
          {/* Icon */}
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-lg border border-white/5"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color }} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Title Row */}
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="font-bold text-white text-base sm:text-lg leading-tight tracking-tight group-hover:text-cyan-400 transition-colors">{citation.title}</h3>
              <span 
                className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest font-mono"
                style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}30` }}
              >
                {citation.type}
              </span>
            </div>

            {/* Author & Year */}
            <p className="text-slate-400 text-xs sm:text-sm mb-4 font-mono">
              <span className="text-cyan-500/70">{citation.author}</span>
              <span className="mx-2 opacity-30">|</span>
              <span className="text-slate-500">{citation.year}</span>
              {citation.doi && (
                <>
                  <span className="mx-2 opacity-30">|</span>
                  <span className="text-[10px] text-slate-600 uppercase">DOI: {citation.doi}</span>
                </>
              )}
            </p>

            {/* Relevance */}
            <AnimatePresence initial={false}>
              {(isExpanded || true) && (
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isExpanded ? 'auto' : '2.8em',
                    opacity: isExpanded ? 1 : 0.5
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-slate-400 text-sm leading-relaxed font-light italic">
                    <Quote className="inline-block w-3 h-3 mb-3 mr-2 text-cyan-500/30" />
                    {citation.relevance}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Link */}
            <AnimatePresence>
              {isExpanded && citation.url && (
                <motion.a
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-widest hover:text-cyan-300 transition-colors mt-6 py-2 px-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shadow-inner group/link"
                >
                  <span>Repository / Source</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </motion.a>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Expand Indicator */}
        <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 border border-white/10"
          >
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function CitationsSection() {
  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-left mb-12 sm:mb-16"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-[0.4em] uppercase font-bold mb-4">Scholarly Foundation</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 tracking-tight font-display text-white">Academic Integrity</h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            Predator Nexus is built upon peer-reviewed research in Bayesian inference, HMM state discovery, and causal signal engineering.
          </p>
        </motion.div>

        {/* Citations List */}
        <div className="space-y-4 sm:space-y-6">
          {citations.map((citation, index) => (
            <CitationCard key={citation.id} citation={citation} index={index} />
          ))}
        </div>

        {/* MLOps Governance Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-20 p-6 sm:p-10 rounded-[2.5rem] bg-[#050505] border border-white/[0.05] relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-start gap-4 sm:gap-6 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/20 shadow-inner">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-2 text-lg sm:text-xl tracking-tight">Institutional Governance</h4>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                Every algorithm implemented in the Predator system undergoes rigorous statistical validation via our Champion/Challenger framework. We maintain a zero-drift policy, where any model exceeding a 0.2 PSI threshold is automatically quarantined from the production execution cluster.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CitationsSection;
