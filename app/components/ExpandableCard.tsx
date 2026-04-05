'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
  Github,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Brain,
  Target,
  Scale,
  Rocket,
  Activity,
  Layers,
  Code2,
  Workflow,
  BarChart3,
  X,
  ChevronDown,
} from 'lucide-react';
import type { Project } from '../data/projects';

interface ExpandableCardProps {
  project: Project;
  layoutId?: string;
  isDesktop?: boolean;
  isExpanded?: boolean;
  onExpand?: () => void;
}

const CYAN = '#22d3ee';
const TEAL = '#14b8a6';

const processIcons = [Zap, Brain, Target, Scale, Rocket, Activity];
const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };

function getBackgroundImage(projectId: string): string | null {
  const images: Record<string, string> = {
    'predator': '/predator-bg.jpg',
    'agency': '/agency-bg.jpg',
    'reality': '/reality-bg.jpg',
    'smartslate': '/smartslate-bg.jpg',
    'revos': '/revos-bg.jpg',
    'commune': '/commune-bg.jpg',
  };
  return images[projectId] || null;
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (value - startValue) * easeOutQuart;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
      {suffix}
    </span>
  );
}

// Trend Badge Component
function TrendBadge({ trend, value }: { trend: 'up' | 'down' | 'stable'; value?: string }) {
  const Icon = trendIcons[trend];
  const colors = {
    up: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
    down: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
    stable: { bg: 'rgba(148, 163, 184, 0.15)', text: '#94a3b8', border: 'rgba(148, 163, 184, 0.3)' },
  };
  const color = colors[trend];

  return (
    <span
      className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border"
      style={{ background: color.bg, color: color.text, borderColor: color.border }}
    >
      <Icon className="w-3 h-3" />
      {value}
    </span>
  );
}

// Main ExpandableCard Component
export default function ExpandableCard({ 
  project, 
  isDesktop = false,
  isExpanded: externalExpanded,
  onExpand 
}: ExpandableCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'process' | 'metrics'>('overview');

  // Use external state if provided, otherwise internal
  const isExpanded = externalExpanded !== undefined ? externalExpanded : internalExpanded;
  
  const setIsExpanded = useCallback((v: boolean) => {
    if (externalExpanded === undefined) {
      setInternalExpanded(v);
    } else if (onExpand) {
      onExpand();
    }
  }, [externalExpanded, onExpand]);

  // Reset tab when closing
  const handleClose = useCallback(() => {
    setIsExpanded(false);
    setActiveTab('overview');
  }, [setIsExpanded]);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
  }, [setIsExpanded]);

  if (isDesktop) {
    return (
      <DesktopCard
        project={project}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  }

  // Mobile: Use inline expansion instead of portal modal
  return (
    <MobileInlineCard 
      project={project}
      isExpanded={isExpanded}
      onExpand={handleExpand}
      onClose={handleClose}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}

// Mobile Inline Expansion Card - Industry Standard
function MobileInlineCard({
  project,
  isExpanded,
  onExpand,
  onClose,
  activeTab,
  setActiveTab,
}: {
  project: Project;
  isExpanded: boolean;
  onExpand: () => void;
  onClose: () => void;
  activeTab: 'overview' | 'tech' | 'process' | 'metrics';
  setActiveTab: (tab: 'overview' | 'tech' | 'process' | 'metrics') => void;
}) {
  const bgImage = getBackgroundImage(project.id);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Layers },
    { id: 'tech' as const, label: 'Tech', icon: Code2 },
    { id: 'process' as const, label: 'Process', icon: Workflow },
    { id: 'metrics' as const, label: 'Metrics', icon: BarChart3 },
  ];

  const handleCardClick = () => {
    if (!isExpanded) {
      onExpand();
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        backgroundColor: isExpanded ? 'rgba(18, 18, 26, 0.98)' : 'rgba(13, 13, 18, 0.9)',
      }}
      transition={{
        layout: { type: "spring", stiffness: 400, damping: 35 }
      }}
      className={`relative overflow-hidden rounded-2xl border cursor-pointer ${
        isExpanded 
          ? 'border-cyan-500/40 shadow-2xl shadow-cyan-500/10' 
          : 'border-white/[0.08] hover:border-cyan-500/30'
      }`}
      onClick={handleCardClick}
    >
      {/* Background Image */}
      {bgImage && (
        <>
          <motion.div
            className="absolute inset-0"
            animate={{ 
              opacity: isExpanded ? 0.08 : 0.15,
              scale: isExpanded ? 1.1 : 1
            }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px) brightness(0.5)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />
        </>
      )}

      {/* Collapsed View */}
      <motion.div 
        layout
        className="relative z-10 p-5"
        animate={{ 
          padding: isExpanded ? '20px 16px 16px' : '20px'
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-white/10">{String(project.number).padStart(2, '0')}</span>
            <div>
              <h3 className="text-lg font-bold text-white">{project.name}</h3>
              <p className="text-xs" style={{ color: CYAN }}>{project.tagline}</p>
            </div>
          </div>
          {!isExpanded && (
            <span className="text-[10px] text-slate-500">Tap to expand</span>
          )}
        </div>

        {/* Description */}
        <motion.p 
          layout
          className="text-slate-400 text-sm leading-relaxed"
          animate={{
            WebkitLineClamp: isExpanded ? 'unset' : 2,
          }}
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </motion.p>

        {/* Tech Tags */}
        <motion.div 
          layout
          className="flex flex-wrap gap-2 mt-3"
        >
          {project.techCategories.slice(0, isExpanded ? 4 : 2).map((cat, idx) => (
            <span 
              key={cat.name} 
              className="px-2.5 py-1 rounded-full text-xs border"
              style={{ 
                background: `${CYAN}10`, 
                borderColor: `${CYAN}25`, 
                color: idx === 0 ? CYAN : TEAL 
              }}
            >
              {cat.name}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              height: { type: "spring", stiffness: 400, damping: 35 },
              opacity: { duration: 0.2 }
            }}
            className="relative z-10 overflow-hidden"
          >
            {/* Tab Navigation */}
            <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={(e) => { e.stopPropagation(); setActiveTab(tab.id); }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap border ${
                        isActive 
                          ? 'text-white border-cyan-500/40' 
                          : 'text-slate-400 border-white/5 hover:border-white/10'
                      }`}
                      style={{
                        background: isActive ? `${CYAN}15` : 'rgba(255,255,255,0.03)'
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: isActive ? CYAN : 'currentColor' }} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 pb-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-3">
                      {project.whatItDoes && (
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: CYAN }}>What It Does</h4>
                          <p className="text-sm text-slate-300 leading-relaxed">{project.whatItDoes}</p>
                        </div>
                      )}
                      {project.howItWorks && (
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: CYAN }}>How It Works</h4>
                          <p className="text-sm text-slate-300 leading-relaxed">{project.howItWorks}</p>
                        </div>
                      )}
                      {project.keyInnovations && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: CYAN }}>Key Innovations</h4>
                          <div className="space-y-2">
                            {project.keyInnovations.slice(0, 4).map((innovation, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                                <span className="w-5 h-5 rounded-md bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ color: CYAN }}>{i + 1}</span>
                                <p className="text-xs text-slate-300 leading-relaxed">{innovation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'tech' && (
                    <div className="space-y-3">
                      {project.techCategories.map((cat) => (
                        <div key={cat.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: CYAN }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: CYAN }} />
                            {cat.name}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.items.slice(0, 6).map((item) => (
                              <span key={item} className="px-2.5 py-1 text-xs rounded-lg border" style={{ background: `${CYAN}08`, borderColor: `${CYAN}20`, color: CYAN }}>{item}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'process' && (
                    <div className="space-y-3">
                      {project.processFlow?.map((step, i) => {
                        const Icon = processIcons[i % processIcons.length];
                        return (
                          <div key={i} className="relative pl-10">
                            {i < (project.processFlow?.length || 0) - 1 && (
                              <div className="absolute left-4 top-8 w-px h-full" style={{ background: `linear-gradient(to bottom, ${CYAN}50, transparent)` }} />
                            )}
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${CYAN}20`, border: `1px solid ${CYAN}40` }}>
                              <Icon className="w-4 h-4" style={{ color: CYAN }} />
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${CYAN}15`, color: CYAN }}>STEP {i + 1}</span>
                              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{step}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'metrics' && (
                    <div className="grid grid-cols-2 gap-3">
                      {project.metrics?.map((metric, i) => (
                        <div key={metric.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                          <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${CYAN}80` }}>{metric.id}</span>
                          <div className="text-2xl font-bold text-white mt-1">
                            <AnimatedCounter value={metric.value} suffix={metric.unit} />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{metric.description}</p>
                          <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${Math.min((metric.value / (metric.value * 1.2)) * 100, 100)}%` }} 
                              transition={{ duration: 0.8, delay: i * 0.1 }}
                              className="h-full rounded-full"
                              style={{ background: CYAN }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="px-4 pb-5 pt-2 border-t border-white/[0.08] flex gap-3">
              {project.learnMoreUrl && (
                <a
                  href={project.learnMoreUrl}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: CYAN, color: '#0a0a0f' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Full Project
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-white/20 text-white bg-white/5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                  Source
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Desktop Card Component
function DesktopCard({ project, isExpanded, setIsExpanded, activeTab, setActiveTab }: {
  project: Project;
  isExpanded: boolean;
  setIsExpanded: (v: boolean) => void;
  activeTab: 'overview' | 'tech' | 'process' | 'metrics';
  setActiveTab: (tab: 'overview' | 'tech' | 'process' | 'metrics') => void;
}) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const bgImage = getBackgroundImage(project.id);

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Layers },
    { id: 'tech' as const, label: 'Tech', icon: Code2 },
    { id: 'process' as const, label: 'Process', icon: Workflow },
    { id: 'metrics' as const, label: 'Metrics', icon: BarChart3 },
  ];

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      layout
      onClick={handleCardClick}
      className="relative overflow-hidden rounded-3xl cursor-pointer h-full"
      style={{
        background: 'rgba(18, 18, 26, 0.8)',
        border: `1px solid ${isExpanded ? CYAN : 'rgba(255,255,255,0.1)'}`,
        boxShadow: isExpanded ? `0 0 60px ${CYAN}10` : 'none',
      }}
      transition={{
        layout: { type: "spring", stiffness: 400, damping: 35 }
      }}
      whileHover={{ 
        borderColor: isExpanded ? CYAN : 'rgba(34, 211, 238, 0.3)',
        boxShadow: isExpanded ? `0 0 60px ${CYAN}10` : `0 0 30px rgba(34, 211, 238, 0.05)`
      }}
    >
      {bgImage && (
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(30px) brightness(0.4)',
          }}
        />
      )}

      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-white/10">{String(project.number).padStart(2, '0')}</span>
            <div>
              <h3 className="text-3xl font-bold text-white">{project.name}</h3>
              <p className="text-sm" style={{ color: CYAN }}>{project.tagline}</p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium">Click to expand</span>
        </div>

        <p className="text-slate-300 text-base leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.techCategories.slice(0, 3).map((cat, idx) => (
            <span key={cat.name} className="px-3 py-1.5 text-sm rounded-full border"
              style={{ background: `${CYAN}15`, borderColor: `${CYAN}30`, color: idx === 0 ? CYAN : TEAL }}
            >{cat.name}</span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {isExpanded && (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              y: -10,
              transition: { duration: 0.15, ease: "easeIn" }
            }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 35
            }}
          >
            <div className="px-8 pt-4 border-b border-white/[0.08]" onClick={handleActionClick}>
              <div className="flex gap-1">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                    style={{ background: activeTab === tab.id ? `${CYAN}20` : 'transparent' }}
                  >{tab.label}</button>
                ))}
              </div>
            </div>

            <div className="p-8" onClick={handleActionClick}>
              <DesktopTabContent 
                project={project} 
                activeTab={activeTab}
                expandedStep={expandedStep}
                setExpandedStep={setExpandedStep}
              />
            </div>

            <div className="px-8 pb-8 pt-4 border-t border-white/[0.08] flex gap-4" onClick={handleActionClick}>
              {project.learnMoreUrl && (
                <a href={project.learnMoreUrl}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: CYAN, color: '#0a0a0f' }}
                  onClick={handleActionClick}>
                  View Full Project <ArrowRight className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 border border-white/20 text-white hover:bg-white/5"
                  onClick={handleActionClick}>
                  <Github className="w-4 h-4" /><span>Source</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Desktop Tab Content
function DesktopTabContent({ project, activeTab, expandedStep, setExpandedStep }: {
  project: Project;
  activeTab: 'overview' | 'tech' | 'process' | 'metrics';
  expandedStep: number | null;
  setExpandedStep: (step: number | null) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {activeTab === 'overview' && (
        <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
          <div className="p-5 rounded-2xl border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">What It Does</h4>
            <p className="text-slate-300 leading-relaxed">{project.whatItDoes}</p>
          </div>
          <div className="p-5 rounded-2xl border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">How It Works</h4>
            <p className="text-slate-300 leading-relaxed">{project.howItWorks}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">Key Innovations</h4>
            <div className="space-y-3">
              {project.keyInnovations.map((innovation, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: 'rgba(34, 211, 238, 0.05)', border: '1px solid rgba(34, 211, 238, 0.1)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${CYAN}20` }}>
                    <span className="text-sm font-bold" style={{ color: CYAN }}>{i + 1}</span>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed pt-1">{innovation}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'tech' && (
        <motion.div key="tech" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
          {project.techCategories.map((cat) => (
            <div key={cat.name} className="p-5 rounded-2xl border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <h4 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: CYAN }}>
                <span className="w-2 h-2 rounded-full" style={{ background: CYAN }} />
                {cat.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span key={item} className="px-3 py-2 text-sm rounded-lg border" style={{ background: `${CYAN}08`, borderColor: `${CYAN}20`, color: CYAN }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === 'process' && (
        <motion.div key="process" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
          {project.processFlow.map((step, i) => {
            const Icon = processIcons[i % processIcons.length];
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="relative pl-14"
              >
                {i < project.processFlow.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-full -ml-px" style={{ background: `linear-gradient(to bottom, ${CYAN}50, transparent)` }} />
                )}
                <div className="absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center z-10" style={{ background: `${CYAN}20`, border: `1px solid ${CYAN}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: CYAN }} />
                </div>
                <div className="p-4 rounded-xl border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${CYAN}15`, color: CYAN }}>STEP {i + 1}</span>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">{step}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {activeTab === 'metrics' && (
        <motion.div key="metrics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 gap-4">
          {project.metrics.map((metric, i) => (
            <motion.div key={metric.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="p-5 rounded-2xl border border-white/[0.08]" style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: `${CYAN}80` }}>{metric.id}</span>
                {metric.trend && <TrendBadge trend={metric.trend} value={metric.trendValue} />}
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                <AnimatedCounter value={metric.value} suffix={metric.unit} decimals={0} />
              </div>
              <p className="text-sm text-slate-500">{metric.description}</p>
              <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((metric.value / (metric.value * 1.2)) * 100, 100)}%` }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full rounded-full" style={{ background: CYAN }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
