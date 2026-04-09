"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, VideoIcon, Users, Headphones, GraduationCap, ChevronDown, Sparkles } from "lucide-react";

export function MobileJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const journeyData = [
    {
      year: "2025",
      period: "Present",
      title: "AI Systems Architect",
      role: "Independent Consultant",
      description: "Architecting sophisticated multi-agent orchestration platforms and autonomous systems. Engineered institutional-grade infrastructure including high-frequency trading engines (Predator), distributed governance frameworks (Reality-Check), and AI-native learning ecosystems (Smarslate). Specialized in LangGraph and Model Context Protocol (MCP) to enable seamless tool-sharing and truth-verified agentic autonomy.",
      highlights: ["Multi-Agent Orchestration", "HFT Engine Architecture", "MCP Tool Integration"],
      icon: Bot,
      bgImage: "/journey-ai.jpg",
      gradient: "from-cyan-500/20 to-teal-500/20",
      stats: { agents: "Active", compliance: "96%", mcp: "Standard" }
    },
    {
      year: "2022",
      period: "3 Years",
      title: "Instructional Designer",
      role: "Moody's Ratings",
      description: "Led video-based learning production for global ratings agency. Built scalable content pipelines and automated workflows, reducing production time by 60% while maintaining 90%+ completion rates for complex financial curriculum.",
      highlights: ["60% Production Save", "90%+ Completion", "Global L&D Scale"],
      icon: VideoIcon,
      bgImage: "/journey-finance.jpg",
      gradient: "from-emerald-500/20 to-teal-500/20",
      stats: { production: "-60%", completion: "90%+", reach: "Global" }
    },
    {
      year: "2019",
      period: "3 Years",
      title: "Instructor Analyst",
      role: "Accenture",
      description: "Managed L&D for 300+ employees. Developed hybrid learning models that reduced training time by 70% while maintaining retention, saving ~$140K. Engineered a 1,400+ line VBA automation suite for pan-India TNA audits.",
      highlights: ["$140K Cost Savings", "70% Time Reduction", "VBA Audit Engine"],
      icon: Users,
      bgImage: "/journey-training.jpg",
      gradient: "from-teal-500/20 to-cyan-500/20",
      stats: { savings: "$140K+", reduction: "70%", reach: "300+" }
    },
    {
      year: "2015",
      period: "2 Years",
      title: "Senior Executive",
      role: "247.ai",
      description: "Managed back-end support for a US retail giant, ensuring seamless buyer-seller experiences. Recognized as 3x Top Performer and identified for the leadership track within 24 months for excellence in process training and problem solving.",
      highlights: ["3x Top Performer", "Leadership Track", "Customer Success"],
      icon: Headphones,
      bgImage: "/journey-support.jpg",
      gradient: "from-cyan-500/20 to-emerald-500/20",
      stats: { performance: "Top 1%", tenure: "2.5y", training: "SME" }
    },
    {
      year: "2015",
      period: "Foundation",
      title: "Bachelor of Commerce",
      role: "Sindhi College",
      description: "Developed foundation in business administration and systems logic. Self-taught programmer during college years, architecting early web applications and automated business tools.",
      highlights: ["Self-Taught Dev", "Business Logic", "Analytical Core"],
      icon: GraduationCap,
      bgImage: "/journey-edu.jpg",
      gradient: "from-emerald-500/20 to-cyan-500/20",
      stats: { degree: "B.Com", systems: "Core", logic: "Advanced" }
    }
  ];

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    setExpandedCard(null);
    const element = document.getElementById(`journey-card-${index}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="overflow-hidden relative">
      {/* Header */}
      <div className="mb-6 px-5 sm:px-6" suppressHydrationWarning>        <p className={`text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3 ${mounted ? 'mobile-section-subtitle' : 'opacity-0'}`}>Journey So Far</p>
        <h2 className={`text-3xl font-bold mb-2 ${mounted ? 'mobile-section-title' : 'opacity-0'}`}>Career Timeline</h2>
        <p className={`text-slate-400 text-sm ${mounted ? 'mobile-section-desc' : 'opacity-0'}`}>From commerce grad to AI architect — {journeyData.length} milestones</p>
      </div>

      {/* Progress Stepper - Simplified for performance */}
      <div
        className={`flex items-center justify-between mb-8 px-2 ${mounted ? 'mobile-section-desc' : 'opacity-0'}`}
      >
        {journeyData.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          
          return (
            <motion.button
              key={item.year + item.title}
              onClick={() => scrollToCard(index)}
              className={`relative flex flex-col items-center gap-2 transition-all ${
                isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                isActive 
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20' 
                  : isPast
                    ? 'bg-cyan-500/10 border-cyan-500/30'
                    : 'bg-white/5 border-white/10'
              }`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                {item.year}
              </span>
              
              {/* Connector Line */}
              {index < journeyData.length - 1 && (
                <div className={`absolute top-5 left-full w-[calc(100%-1rem)] h-0.5 -ml-1 ${
                  isPast ? 'bg-cyan-500' : 'bg-white/10'
                }`} style={{ width: '2rem' }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Timeline Cards */}
      <div ref={containerRef} className="space-y-6">
        {journeyData.map((item, index) => {
          const Icon = item.icon;
          const isExpanded = expandedCard === index;
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={item.year + item.title}
              id={`journey-card-${index}`}
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              onViewportEnter={() => setActiveIndex(index)}
              className="relative"
            >
              {/* Timeline Connector - Solid Cyan */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-cyan-500/40" />
              
              {/* Card */}
              <motion.div
                layout
                onClick={() => setExpandedCard(isExpanded ? null : index)}
                className={`ml-10 relative rounded-2xl border overflow-hidden cursor-pointer transition-all ${
                  isExpanded 
                    ? 'border-cyan-500/40 bg-white/[0.05]' 
                    : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.12]'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Image - subtle blur */}
                <div 
                  className="absolute inset-0 scale-105"
                  style={{
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30`} />
                <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-[8px]" />

                {/* Content */}
                <div className="relative z-10 p-5">
                  {/* Header Row */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Icon */}
                    <motion.div
                      animate={{ 
                        boxShadow: isExpanded 
                          ? '0 0 20px rgba(34, 211, 238, 0.3)' 
                          : '0 0 0px rgba(34, 211, 238, 0)'
                      }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${item.gradient} border border-white/10`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    {/* Title Group */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-500/30">
                          {item.year}
                        </span>
                        <span className="text-slate-500 text-xs">{item.period}</span>
                      </div>
                      <h3 className="font-bold text-lg leading-tight mb-0.5">{item.title}</h3>
                      <p className="text-cyan-400 text-sm">{item.role}</p>
                    </div>
                    
                    {/* Expand Indicator */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-slate-500"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                          {Object.entries(item.stats).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <p className="text-lg font-bold text-cyan-400">{value}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-wide">{key}</p>
                            </div>
                          ))}
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {item.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-xs text-slate-300"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Tap Hint */}
                  {!isExpanded && (
                    <p className="text-xs text-slate-600 mt-3 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Tap to expand
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
     </section>
  );
}
