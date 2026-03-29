"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "../components/PageLayout";
import {
  Section,
  SectionHeader,
  Card,
  Badge,
  FilterTabs,
  FilterContainer,
  fadeInUp,
} from "../components/ui";
import {
  Bot,
  Brain,
  Code2,
  Database,
  Globe,
  Search,
  Zap,
  Activity,
  CheckCircle,
  PauseCircle,
  Circle,
} from "lucide-react";

// Metrics with cyan/teal colors only
const metrics = [
  { label: "Total Agents", value: "200+", icon: Bot, color: "#22d3ee" },
  { label: "Active Instances", value: "147", icon: Activity, color: "#14b8a6" },
  { label: "Fleet Coverage", value: "96%", icon: CheckCircle, color: "#22d3ee" },
  { label: "Governance", value: "No Fiction", icon: Zap, color: "#14b8a6" },
];

const categories = [
  "All",
  "Automation",
  "Research",
  "Content",
  "DevOps",
  "Integration",
  "Analytics",
];

const agents = [
  {
    name: "CodeForge",
    type: "Automation",
    status: "live",
    description:
      "Automated code generation, refactoring, and PR reviews across multiple repositories",
    icon: Code2,
  },
  {
    name: "ResearchBot",
    type: "Research",
    status: "live",
    description:
      "Web research, paper analysis, and competitive intelligence gathering",
    icon: Search,
  },
  {
    name: "ContentMill",
    type: "Content",
    description:
      "Blog posts, documentation, social media content generation and optimization",
    status: "live",
    icon: Globe,
  },
  {
    name: "DataPipe",
    type: "Analytics",
    status: "live",
    description:
      "Real-time data pipeline monitoring, anomaly detection, and alerting",
    icon: Database,
  },
  {
    name: "InfraWatch",
    type: "DevOps",
    status: "live",
    description:
      "Infrastructure monitoring, auto-scaling, and incident response automation",
    icon: Activity,
  },
  {
    name: "APIBridge",
    type: "Integration",
    status: "live",
    description:
      "Cross-platform API integration, webhook management, and data sync",
    icon: Zap,
  },
  {
    name: "DocuGen",
    type: "Content",
    status: "live",
    description:
      "Technical documentation generation from codebases and API schemas",
    icon: Globe,
  },
  {
    name: "TestRunner",
    type: "Automation",
    status: "paused",
    description:
      "Automated test generation, execution, and coverage analysis",
    icon: Code2,
  },
  {
    name: "InsightAI",
    type: "Analytics",
    status: "live",
    description:
      "Business intelligence dashboards, trend analysis, and forecasting",
    icon: Database,
  },
  {
    name: "DeployBot",
    type: "DevOps",
    status: "live",
    description:
      "CI/CD pipeline orchestration, blue-green deployments, rollback automation",
    icon: Activity,
  },
  {
    name: "FactCheck",
    type: "Research",
    status: "live",
    description:
      "Source verification, claim validation, and anti-hallucination enforcement",
    icon: Search,
  },
  {
    name: "SyncMaster",
    type: "Integration",
    status: "live",
    description:
      "Multi-platform data synchronization across CRM, ERP, and communication tools",
    icon: Zap,
  },
  {
    name: "LangSmith",
    type: "Automation",
    status: "live",
    description:
      "Prompt optimization, A/B testing, and LLM performance benchmarking",
    icon: Brain,
  },
  {
    name: "MediaGen",
    type: "Content",
    status: "paused",
    description:
      "AI image generation, video processing, and multimedia content pipelines",
    icon: Globe,
  },
  {
    name: "QueryOpt",
    type: "Analytics",
    status: "live",
    description:
      "Database query optimization, index analysis, and performance tuning",
    icon: Database,
  },
  {
    name: "GitFlow",
    type: "DevOps",
    status: "live",
    description:
      "Git workflow automation, branch management, and merge conflict resolution",
    icon: Code2,
  },
  {
    name: "WebScout",
    type: "Research",
    status: "live",
    description:
      "Automated web scraping, price monitoring, and competitive tracking",
    icon: Search,
  },
  {
    name: "SlackOps",
    type: "Integration",
    status: "live",
    description:
      "Slack bot for team notifications, standup automation, and incident alerts",
    icon: Zap,
  },
];

function StatusBadge({ status }: { status: string }) {
  const isLive = status === "live";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono ${
        isLive
          ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
          : "bg-teal-500/15 text-teal-400 border border-teal-500/30"
      }`}
    >
      {isLive ? (
        <Circle className="w-2 h-2 fill-cyan-400" />
      ) : (
        <PauseCircle className="w-2 h-2" />
      )}
      {isLive ? "LIVE" : "PAUSED"}
    </span>
  );
}

export default function AgentsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? agents
      : agents.filter((a) => a.type === activeCategory);

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section withAurora className="pt-24 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mono-label-cyan mb-4">
            Autonomous Systems
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            AI Agent Showcase
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl">
            A fleet of 200+ specialized AI agents orchestrated via LangGraph,
            handling everything from code automation to research intelligence.
          </p>
        </motion.div>
      </Section>

      {/* Metrics */}
      <Section className="py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="default" hover className="text-center py-6">
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${m.color}20` }}
                >
                  <m.icon className="w-6 h-6" style={{ color: m.color }} />
                </div>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: m.color }}
                >
                  {m.value}
                </div>
                <div className="text-sm text-slate-400">{m.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Architecture Diagram */}
      <Section className="py-6">
        <Card variant="ghost" className="p-8">
          <h3 className="text-xl font-bold mb-6 text-center text-white">
            Multi-Agent Orchestration Architecture
          </h3>
          <svg viewBox="0 0 800 300" className="w-full h-auto max-w-3xl mx-auto">
            <defs>
              <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const x = 400 + 120 * Math.cos(angle);
              const y = 150 + 100 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1="400"
                  y1="150"
                  x2={x}
                  y2={y}
                  stroke="#22d3ee"
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <animate
                    attributeName="strokeDasharray"
                    values="0,200;200,0"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </line>
              );
            })}

            {/* Central node */}
            <rect
              x="355"
              y="115"
              width="90"
              height="70"
              rx="16"
              fill="url(#cyanGrad)"
              stroke="#22d3ee"
              strokeWidth="2"
              filter="url(#glow)"
            />
            <text
              x="400"
              y="145"
              textAnchor="middle"
              fill="#fff"
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
            >
              LangGraph
            </text>
            <text
              x="400"
              y="165"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="9"
              fontFamily="monospace"
            >
              Orchestrator
            </text>

            {/* Satellite nodes with cyan/teal alternation */}
            {[
              "Automation",
              "Research",
              "Content",
              "DevOps",
              "Integration",
              "Analytics",
            ].map((label, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const x = 400 + 120 * Math.cos(angle);
              const y = 150 + 100 * Math.sin(angle);
              const isCyan = i % 2 === 0;
              return (
                <g key={label}>
                  <circle
                    cx={x}
                    cy={y}
                    r="30"
                    fill={isCyan ? "url(#cyanGrad)" : "url(#tealGrad)"}
                    stroke={isCyan ? "#22d3ee" : "#14b8a6"}
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {label}
                  </text>
                  <circle
                    cx={x + 22}
                    cy={y - 22}
                    r="4"
                    fill={isCyan ? "#22d3ee" : "#14b8a6"}
                    opacity="0.8"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0.3;1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </svg>
        </Card>
      </Section>

      {/* Agent Grid with Filter */}
      <Section className="py-10 md:py-12">
        <FilterContainer
          totalCount={agents.length}
          filteredCount={filtered.length}
        >
          <FilterTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </FilterContainer>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((agent, i) => {
              const Icon = agent.icon;
              return (
                <motion.div
                  key={agent.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card variant="default" hover className="h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-white">
                            {agent.name}
                          </h3>
                          <span className="text-xs text-slate-500 font-mono">
                            {agent.type}
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={agent.status} />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {agent.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Section>
    </PageLayout>
  );
}
