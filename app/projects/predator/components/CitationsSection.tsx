'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, ExternalLink, FileText, ChevronDown } from 'lucide-react';

const typeIcons = { paper: FileText, book: BookOpen, article: FileText, standard: FileText };
const typeColors = { paper: '#22d3ee', book: '#14b8a6', article: '#2dd4bf', standard: '#06b6d4' };

const citations = [
  { id: "hmm-rabiner", title: "A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition", author: "Lawrence R. Rabiner", year: 1989, type: "paper", relevance: "The foundational text for HMM implementation. Argus uses Rabiner's scaling and Viterbi algorithms to maintain regime state persistence without look-ahead bias.", doi: "10.1109/5.18626" },
  { id: "bayesian-multiagent", title: "Multi-Agent Bayesian Surveillance", author: "Z. Sun et al.", year: 2011, type: "paper", relevance: "Informational basis for Predator's Pantheon. Specialized agents (Apollo, Athena) use independent posterior updates to reach a consensus state in non-deterministic environments.", url: "https://arxiv.org/abs/1105.4121" },
  { id: "adwin-bifet", title: "Adaptive Learning from Evolving Data Streams", author: "Albert Bifet, Ricard Gavaldà", year: 2007, type: "paper", relevance: "ADWIN (Adaptive Windowing) algorithm for drift detection. Predator's Guard Rails (Sentinel) use this to monitor ML feature drift and trigger emergency circuit breakers.", doi: "10.1007/978-3-540-76931-6_11" },
  { id: "kelly-criterion", title: "A New Interpretation of Information Rate", author: "John L. Kelly Jr.", year: 1956, type: "paper", relevance: "Original Kelly Criterion paper. Ares implements a volatility-adjusted fractional Kelly formula to maximize geometric growth while maintaining institutional risk caps.", doi: "10.1002/j.1538-7305.1956.tb03809.x" },
  { id: "timescale", title: "TimescaleDB: SQL Made Scalable for Time-Series Data", author: "Michael J. Freedman, et al.", year: 2018, type: "paper", relevance: "The storage backbone. Enables sub-10ms insertion of ProtoBuf tick streams from Hermes while allowing complex PostgreSQL analytics on historical regime data.", url: "https://www.timescale.com/" },
  { id: "langgraph", title: "LangGraph: Building Stateful, Multi-Agent Applications", author: "LangChain Team", year: 2024, type: "standard", relevance: "Framework for building cyclic agent workflows. Athena uses LangGraph to manage the Directed Acyclic Graph (DAG) logic for context-aware strategy routing.", url: "https://langchain-ai.github.io/langgraph/" }
];

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
        className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all cursor-pointer active:scale-[0.98] ${
          isExpanded 
            ? 'bg-cyan-500/5 border-cyan-500/20' 
            : 'bg-white/[0.03] border-white/[0.08] hover:border-cyan-500/20'
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Icon */}
          <div 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color }} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Title Row */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-white text-sm sm:text-base leading-tight">{citation.title}</h3>
              <span 
                className="px-2 py-0.5 rounded text-[10px] font-medium uppercase"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {citation.type}
              </span>
            </div>

            {/* Author & Year */}
            <p className="text-slate-400 text-xs sm:text-sm mb-2">
              {citation.author} · {citation.year}
              {citation.doi && (
                <span className="text-slate-500"> · DOI: {citation.doi}</span>
              )}
            </p>

            {/* Relevance - Collapsible on Mobile */}
            <motion.div
              initial={false}
              animate={{ 
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              className="overflow-hidden sm:hidden"
            >
              <p className="text-slate-500 text-xs leading-relaxed">{citation.relevance}</p>
            </motion.div>
            
            {/* Relevance - Always visible on Desktop */}
            <p className="hidden sm:block text-slate-500 text-sm leading-relaxed">{citation.relevance}</p>

            {/* Expand Indicator - Mobile Only */}
            <div className="flex items-center justify-between mt-3 sm:hidden">
              <span className="text-slate-500 text-xs">
                {isExpanded ? 'Tap to collapse' : 'Tap to expand'}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </motion.div>
            </div>

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
                  className="inline-flex items-center gap-1.5 text-cyan-400 text-xs sm:text-sm hover:text-cyan-300 transition-colors mt-3"
                >
                  <span>View Source</span>
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </motion.a>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CitationsSection() {
  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-left mb-8 sm:mb-10"
        >
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">References</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Methodology & Sources</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Academic foundations and industry standards that inform the Predator system&apos;s design and implementation.
          </p>
        </motion.div>

        {/* Citations List */}
        <div className="space-y-3 sm:space-y-4">
          {citations.map((citation, index) => (
            <CitationCard key={citation.id} citation={citation} index={index} />
          ))}
        </div>

        {/* Academic Integrity Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-cyan-500/5 border border-cyan-500/20"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-medium text-white mb-1 text-sm sm:text-base">Academic Integrity</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                All algorithms and methods implemented in the Predator system are based on peer-reviewed research and established industry standards. Citations are provided for transparency and further reading.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CitationsSection;
