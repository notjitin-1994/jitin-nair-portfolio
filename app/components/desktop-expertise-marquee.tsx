'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, Network, Monitor, VideoIcon, Database, TrendingUp } from 'lucide-react';

interface ExpertiseItem {
  icon: React.ElementType;
  title: string;
  description: string;
  skills: string[];
  featured?: boolean;
}

// Marquee Component with proper pause/resume via CSS
function Marquee({
  children,
  speed = 30,
  direction = "left",
  isPaused = false,
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  isPaused?: boolean;
}) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-4 will-change-transform ${
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        } ${isPaused ? '[animation-play-state:paused]' : ''}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <div className="flex shrink-0 gap-4">
          {children}
        </div>
        <div className="flex shrink-0 gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// Expertise Card Component
function ExpertiseCard({ item, index }: { item: ExpertiseItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="flex-shrink-0 w-[450px] px-3 py-6">
      <motion.div
        className={`relative overflow-hidden rounded-2xl p-8 h-[320px] ${
          item.featured
            ? "bg-gradient-to-br from-cyan-500/20 via-white/[0.05] to-transparent border-cyan-500/30"
            : "bg-white/[0.03] border-white/[0.08]"
        } border backdrop-blur-sm transition-all duration-500`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -8 : 0,
          borderColor: isHovered
            ? "rgba(34, 211, 238, 0.4)"
            : item.featured
            ? "rgba(34, 211, 238, 0.3)"
            : "rgba(255, 255, 255, 0.08)",
          backgroundColor: isHovered
            ? "rgba(255, 255, 255, 0.08)"
            : item.featured
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(255, 255, 255, 0.03)",
        }}
      >
        {/* Glow Effect */}
        {item.featured && (
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        )}

        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%)",
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 h-full flex flex-col text-left">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className={`w-12 h-12 rounded-xl ${
                item.featured
                  ? "bg-cyan-500 shadow-lg shadow-cyan-500/25"
                  : "bg-white/10"
              } flex items-center justify-center`}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <item.icon
                className={`w-6 h-6 ${
                  item.featured ? "text-white" : "text-cyan-400"
                }`}
              />
            </motion.div>
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold mb-3 text-white whitespace-nowrap">{item.title}</h3>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-grow">
            {item.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill, i) => (
              <motion.span
                key={i}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-full border ${
                  item.featured
                    ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                    : "bg-white/5 text-slate-400 border-white/10"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function DesktopExpertiseMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  const expertise: ExpertiseItem[] = [
    {
      icon: Brain,
      title: "Autonomous Agentic Systems",
      description: "Multi-agent orchestration networks that perceive, decide, and act autonomously—spanning trading, operations, monitoring, and decision intelligence.",
      skills: ["LangGraph", "AutoGen", "CrewAI", "Vector DBs"],
      featured: true,
    },
    {
      icon: Sparkles,
      title: "AI-Native Applications",
      description: "RAG-powered apps, semantic search, document intelligence, and verification frameworks achieving 95%+ accuracy.",
      skills: ["OpenAI", "RAG", "CoVe", "TypeScript"],
    },
    {
      icon: Zap,
      title: "Intelligent Process Automation",
      description: "Self-healing infrastructure, browser automation, and workflow engines that reduce manual work by 80%+.",
      skills: ["Playwright", "Python", "systemd", "Docker"],
    },
    {
      icon: Network,
      title: "Enterprise Integration Platforms",
      description: "API orchestration, chatbots, IoT systems, messaging, and secrets management across 200+ connected agents.",
      skills: ["Discord/Telegram", "1Password", "IoT", "GitHub"],
    },
    {
      icon: Monitor,
      title: "Desktop & Internal Tools",
      description: "Cross-platform desktop applications and internal productivity accelerators built for engineering teams.",
      skills: ["Tauri", "Electron", "Rust", "React"],
    },
    {
      icon: VideoIcon,
      title: "Content & Media Pipelines",
      description: "AI-generated content, video processing, speech-to-text, and automated media workflows at scale.",
      skills: ["FFmpeg", "Whisper", "AI Gen", "Summarization"],
    },
    {
      icon: Database,
      title: "Real-Time Data Infrastructure",
      description: "Streaming pipelines, time-series databases, and live analytics dashboards with sub-second latency.",
      skills: ["Kafka", "Redis", "TimescaleDB", "D3"],
    },
    {
      icon: TrendingUp,
      title: "Quantitative & Algorithmic Systems",
      description: "Institutional-grade trading infrastructure with regime detection, MLOps, and sub-second execution.",
      skills: ["TimescaleDB", "Polars", "Backtesting", "Risk"],
    },
  ];

  // Split expertise into two rows (4 each)
  const row1 = expertise.slice(0, 4);
  const row2 = expertise.slice(4, 8);

  return (
    <section id="expertise" className="py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - Left Aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase mb-4"
          >
            What I Deliver
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Products That <span className="text-cyan-400">Drive Results</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 max-w-2xl text-lg"
          >
            Production-ready solutions that reduce costs, accelerate workflows,
            and deliver measurable business impact.
          </motion.p>
        </motion.div>

        {/* Marquee Container */}
        <div
          className="relative space-y-6 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Row 1 - Left */}
          <div className="relative">
            <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
            <Marquee
              speed={40}
              direction="left"
              isPaused={isPaused}
            >
              {row1.map((item, index) => (
                <ExpertiseCard key={`r1-${index}`} item={item} index={index} />
              ))}
            </Marquee>
          </div>

          {/* Row 2 - Right */}
          <div className="relative">
            <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
            <Marquee
              speed={45}
              direction="right"
              isPaused={isPaused}
            >
              {row2.map((item, index) => (
                <ExpertiseCard key={`r2-${index}`} item={item} index={index} />
              ))}
            </Marquee>
          </div>
        </div>

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-left"
        >
          <div className="inline-flex items-center gap-4 text-slate-500 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-cyan-400">Hover</span>
              <span>to pause</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
