'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Layout, Bot, Globe, Monitor, Network, Sparkles } from 'lucide-react';

interface ExpertiseItem {
  icon: React.ElementType;
  title: string;
  description: string;
  skills: string[];
  featured?: boolean;
}

// Marquee Component with proper pause support
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
        className={`flex shrink-0 ${isPaused ? 'marquee-paused' : ''}`}
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {children}
      </div>
      <div
        className={`flex shrink-0 ${isPaused ? 'marquee-paused' : ''}`}
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Expertise Card Component
function ExpertiseCard({ item, index, isPaused }: { item: ExpertiseItem; index: number; isPaused?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex-shrink-0 w-[320px] px-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl p-6 h-[240px] ${
          item.featured
            ? "bg-gradient-to-br from-cyan-500/20 via-white/[0.05] to-transparent border-cyan-500/30"
            : "bg-white/[0.03] border-white/[0.08]"
        } border backdrop-blur-sm transition-all duration-500`}
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

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
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
            {item.featured && (
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-cyan-400/60" />
              </motion.div>
            )}
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
            {item.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {item.skills.slice(0, 4).map((skill, i) => (
              <motion.span
                key={i}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-full border ${
                  item.featured
                    ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                    : "bg-white/5 text-slate-400 border-white/10"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
          <motion.div
            className="absolute top-4 left-4 h-px bg-gradient-to-r from-cyan-400/50 to-transparent"
            animate={{ width: isHovered ? 32 : 20 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-4 left-4 w-px bg-gradient-to-b from-cyan-400/50 to-transparent"
            animate={{ height: isHovered ? 32 : 20 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DesktopExpertiseMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const expertise: ExpertiseItem[] = [
    {
      icon: Brain,
      title: "AI Automation Systems",
      description:
        "Autonomous agents that streamline workflows, reduce manual tasks, and deliver measurable productivity gains for enterprise teams.",
      skills: ["LangGraph", "CrewAI", "Process Automation", "LLM Orchestration"],
      featured: true,
    },
    {
      icon: Layout,
      title: "Dashboards & Analytics",
      description:
        "Real-time data dashboards and admin panels that transform complex data into actionable insights for stakeholders.",
      skills: ["React", "D3.js", "PostgreSQL", "Data Visualization"],
    },
    {
      icon: Bot,
      title: "AI-Enabled Applications",
      description:
        "Production-grade apps with integrated AI features—semantic search, document processing, and intelligent recommendations.",
      skills: ["OpenAI", "RAG", "Vector DBs", "TypeScript"],
    },
    {
      icon: Globe,
      title: "Marketing Websites",
      description:
        "High-converting landing pages and marketing sites built for performance, SEO, and lead generation.",
      skills: ["Next.js", "Astro", "Tailwind", "SEO"],
    },
    {
      icon: Monitor,
      title: "Internal Tools",
      description:
        "Custom desktop applications and internal tools that accelerate team productivity and replace manual processes.",
      skills: ["Tauri", "Electron", "Rust", "Cross-platform"],
    },
    {
      icon: Network,
      title: "Integration Pipelines",
      description:
        "Scalable data pipelines and API integrations that connect disparate systems and automate data flows.",
      skills: ["Kafka", "Redis", "Docker", "Microservices"],
    },
  ];

  // Split expertise into two rows
  const row1 = expertise.slice(0, 3);
  const row2 = expertise.slice(3, 6);

  return (
    <section id="expertise" className="py-32 overflow-hidden">
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
          ref={containerRef}
          className="relative space-y-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Left to Right */}
          <div className="relative">
            <Marquee
              speed={40}
              direction="left"
              isPaused={isPaused}
            >
              {row1.map((item, index) => (
                <ExpertiseCard key={`r1-${index}`} item={item} index={index} isPaused={isPaused} />
              ))}
            </Marquee>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="relative">
            <Marquee
              speed={45}
              direction="right"
              isPaused={isPaused}
            >
              {row2.map((item, index) => (
                <ExpertiseCard key={`r2-${index}`} item={item} index={index + 3} isPaused={isPaused} />
              ))}
            </Marquee>
          </div>
        </div>

        {/* Hint - Removed "Paused" indicator */}
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
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-2">
              <span className="text-cyan-400">Click cards</span>
              <span>for details</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Global Styles for Marquee Animation */}
      <style jsx global>{`
        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

export default DesktopExpertiseMarquee;
