'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Workflow, Zap, Sparkles, Search, Target, Bot, Award } from 'lucide-react';

const capabilitiesData = {
  aiAndAgents: {
    title: "AI & Agentic Systems",
    icon: Brain,
    color: "#22d3ee",
    skills: [
      { name: "LangGraph Orchestration", level: 95 },
      { name: "Multi-Agent Systems", level: 95 },
      { name: "LLM Integration (GPT-4, Claude, Gemini)", level: 90 },
      { name: "RAG & Vector Databases", level: 88 },
      { name: "Chain-of-Verification", level: 92 },
      { name: "Autonomous Decision Systems", level: 90 },
      { name: "Prompt Engineering", level: 95 },
      { name: "AI Safety & Alignment", level: 85 },
    ],
  },
  development: {
    title: "Full-Stack Development",
    icon: Code2,
    color: "#22d3ee",
    skills: [
      { name: "React & Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Node.js & Python", level: 88 },
      { name: "Database Design (PostgreSQL, TimescaleDB)", level: 85 },
      { name: "API Architecture", level: 90 },
      { name: "Real-time Systems", level: 88 },
      { name: "Desktop Apps (Tauri, Electron)", level: 82 },
      { name: "Cloud Infrastructure", level: 85 },
    ],
  },
  integrations: {
    title: "Enterprise Integrations",
    icon: Workflow,
    color: "#22d3ee",
    skills: [
      { name: "GitHub API & Automation", level: 90 },
      { name: "Google Workspace (Gmail, Calendar, Drive)", level: 88 },
      { name: "1Password Secrets Management", level: 85 },
      { name: "Discord & Telegram Bots", level: 92 },
      { name: "WhatsApp Business API", level: 80 },
      { name: "Philips Hue & IoT", level: 85 },
      { name: "Sonos/BluOS Audio Systems", level: 82 },
      { name: "Email (IMAP/SMTP)", level: 88 },
    ],
  },
  automation: {
    title: "Intelligent Automation",
    icon: Zap,
    color: "#22d3ee",
    skills: [
      { name: "Browser Automation (Playwright)", level: 92 },
      { name: "Web Scraping & Data Extraction", level: 90 },
      { name: "CI/CD Pipeline Design", level: 85 },
      { name: "Infrastructure as Code", level: 82 },
      { name: "Docker & Containerization", level: 88 },
      { name: "Systemd & Process Management", level: 85 },
      { name: "Monitoring & Observability", level: 88 },
      { name: "Auto-recovery Systems", level: 90 },
    ],
  },
  content: {
    title: "Content & Media",
    icon: Sparkles,
    color: "#22d3ee",
    skills: [
      { name: "AI Image Generation", level: 88 },
      { name: "Video Processing (FFmpeg)", level: 85 },
      { name: "Speech-to-Text (Whisper)", level: 90 },
      { name: "Text Summarization", level: 92 },
      { name: "Technical Writing", level: 90 },
      { name: "Documentation Systems", level: 88 },
      { name: "GIF/Visual Search", level: 82 },
      { name: "Audio Analysis", level: 80 },
    ],
  },
  research: {
    title: "Research & Intelligence",
    icon: Search,
    color: "#22d3ee",
    skills: [
      { name: "Web Search & Verification", level: 92 },
      { name: "Code Search (GitHub/StackOverflow)", level: 90 },
      { name: "Company Intelligence", level: 85 },
      { name: "Source Verification", level: 92 },
      { name: "Technical Research", level: 90 },
      { name: "Trend Analysis", level: 85 },
      { name: "Academic Paper Analysis", level: 82 },
      { name: "Competitive Intelligence", level: 85 },
    ],
  },
};

interface CapabilityCardProps {
  categoryKey: string;
  data: {
    title: string;
    icon: React.ElementType;
    color: string;
    skills: { name: string; level: number }[];
  };
  index: number;
}

function CapabilityCard({ categoryKey, data, index }: CapabilityCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d12] p-5 h-full transition-all duration-300 hover:border-cyan-500/20">
        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 211, 238, 0.06), transparent 40%)`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <motion.div
            className="w-10 h-10 rounded-lg bg-cyan-500/15 flex items-center justify-center border border-cyan-500/25"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-5 h-5 text-cyan-400" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-base text-white">{data.title}</h3>
            <p className="text-slate-500 text-sm">{data.skills.length} skills</p>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          {data.skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + idx * 0.03 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-300">{skill.name}</span>
                <span className="text-sm text-cyan-400 font-mono">{skill.level}%</span>
              </div>
              <div className="h-2 bg-white/[0.06] rounded-sm overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-500 rounded-sm"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + idx * 0.05, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function DesktopCapabilitiesEnhanced() {
  const categories = Object.entries(capabilitiesData);

  const stats = [
    { value: "50+", label: "Technical Skills", icon: Target },
    { value: "200+", label: "AI Agents Deployed", icon: Bot },
    { value: "25+", label: "Enterprise Integrations", icon: Workflow },
    { value: "95%", label: "Success Rate", icon: Award },
  ];

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header - Left Aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase mb-4"
          >
            Capabilities Matrix
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Production <span className="text-cyan-400">Systems</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 max-w-2xl text-lg"
          >
            Six core competency domains spanning AI systems, software engineering, enterprise integrations, automation, content pipelines, and research intelligence.
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl p-5 text-center border border-white/[0.08] bg-[#0d0d12] hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([key, data], index) => (
            <CapabilityCard
              key={key}
              categoryKey={key}
              data={data}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DesktopCapabilitiesEnhanced;
