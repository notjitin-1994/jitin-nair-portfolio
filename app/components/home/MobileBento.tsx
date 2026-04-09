"use client";

import { useState, useEffect } from "react";
import { Brain, Sparkles, Zap, Network, Monitor, VideoIcon, Database, TrendingUp } from "lucide-react";
import { useReducedMotion, SkeletonLoader, Marquee } from "./shared";

interface ExpertiseItem {
  icon: React.ElementType;
  title: string;
  description: string;
  skills: string[];
  featured?: boolean;
}

const expertiseData: ExpertiseItem[] = [
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

export function MobileBento() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const Card = ({ item }: { item: ExpertiseItem; index: number }) => {
    const Icon = item.icon;

    return (
      <div className="flex-shrink-0 w-[320px] px-2 py-6">
        <div className={`relative overflow-hidden rounded-2xl p-6 h-[220px] ${item.featured ? "bg-gradient-to-br from-cyan-500/20 via-white/[0.05] to-transparent border-cyan-500/30" : "bg-white/[0.03] border-white/[0.08]"} border backdrop-blur-[2px] transition-all duration-500 hover:border-cyan-500/30 hover:bg-white/[0.05] hover:scale-[1.02] group`}>
          {item.featured && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          )}
          <div className="relative z-10 h-full flex flex-col text-left">
            <div className={`w-12 h-12 rounded-xl ${item.featured ? "bg-cyan-500 shadow-lg shadow-cyan-500/25" : "bg-white/10"} flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110`}>
              <Icon className={`w-6 h-6 ${item.featured ? "text-white" : "text-cyan-400"}`} />
            </div>
            <h3 className="text-lg font-bold mb-2 whitespace-nowrap">{item.title}</h3>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed flex-grow">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.skills.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded-full border ${item.featured ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20" : "bg-white/5 text-slate-400 border-white/10"}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Skeleton loader for initial render
  if (!mounted) {
    return (
      <section className="overflow-hidden">
        <div className="mb-10 px-5">
          <SkeletonLoader className="h-4 w-32 mb-3" />
          <SkeletonLoader className="h-8 w-64 mb-3" />
          <SkeletonLoader className="h-4 w-full max-w-md" />
        </div>
        <div className="flex gap-4 px-5 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonLoader key={i} className="h-[220px] w-[320px] flex-shrink-0" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden relative">
      {/* Section Header - CSS Animated, SSR Safe */}
      <div className="mb-6 px-5 sm:px-6" suppressHydrationWarning>
        <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 mobile-section-subtitle">
          What I Deliver
        </p>
        <h2 className="text-3xl font-bold mb-2 mobile-section-title">
          Products That Drive Results
        </h2>
        <p className="text-slate-400 text-sm mobile-section-desc">
          Production-ready solutions that reduce costs, accelerate workflows, and deliver measurable business impact.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
        <Marquee speed={40} direction="left">
          {expertiseData.map((item, index) => (
            <Card key={index} item={item} index={index} />
          ))}
        </Marquee>
      </div>
     </section>
  );
}
