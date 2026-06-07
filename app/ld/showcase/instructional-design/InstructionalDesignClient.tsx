"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Linkedin,
  Cpu,
  Layers,
  Sparkles,
  Workflow,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  Globe2,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  Brain,
  Rocket,
  ArrowUpRight,
  Hammer,
} from "lucide-react";
import { EASE, Reveal, useFontsReady, MagneticButton } from "../../../components/ld/primitives";
import { Grain } from "../../../components/leading/visuals";
import { FloatingNav } from "../../../components/FloatingNav";
import { LdFooter } from "../../../components/ld/LdFooter";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

/* ---------- Nav ---------- */
function Nav() {
  return (
    <FloatingNav
      brandHref="/ld/showcase"
      suffix="Instructional Design"
      accent="emerald"
      links={[
        { label: "Showcase", href: "/ld/showcase" },
        { label: "L&D Portfolio", href: "/ld" },
        { label: "Experience", href: "/ld/work" },
        { label: "Contact", href: "#contact" },
      ]}
      cta={{ label: "Get in touch", href: EMAIL }}
    />
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ready = useFontsReady();
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-16 bg-[#030303]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-20%] h-[70vh] w-[70vh] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[60vh] w-[60vh] rounded-full bg-emerald-900/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Link
            href="/ld/showcase"
            className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Showcase
          </Link>
        </Reveal>

        <div className="mt-10 max-w-4xl">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-[4rem] lg:text-[5rem]"
          >
            Industrializing <br />
            <span className="text-emerald-400 italic font-serif">Intelligence.</span>
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-8 text-xl leading-relaxed text-neutral-400 sm:text-2xl max-w-2xl font-light"
          >
            Engineering the scalable architecture that bridges enterprise strategy with measurable performance.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 1. Mini-Article ---------- */
function ArticleSection() {
  return (
    <section className="px-5 py-24 md:py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      <Grain />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <span className="mb-6 block text-xs font-medium uppercase tracking-[0.3em] text-emerald-500/80 font-mono">
            Strategic Architecture
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-10 leading-tight">
            Industrializing the Learning Pipeline
          </h2>
          <div className="space-y-6 text-lg text-neutral-400 leading-relaxed font-light">
            <p>
              In an era where knowledge velocity is the primary competitive advantage, &quot;course creation&quot; is no longer enough. 
              To move the needle on enterprise performance, we must pivot from artisanal, one-off content to industrialized learning ecosystems.
            </p>
            <p>
              My approach treats Learning & Development as a high-precision engineering discipline. By synthesizing the rigour of 
              <span className="text-white font-medium italic mx-1">ADDIE</span> and 
              <span className="text-white font-medium italic mx-1">Bloom&apos;s Taxonomy</span> with the speed of 
              <span className="text-emerald-400 font-medium mx-1">Agile L&D</span>, 
              I architect scalable content pipelines that bridge the gap between business strategy and measurable human performance.
            </p>
            <p className="border-l-2 border-emerald-500/50 pl-6 py-2 italic text-emerald-50/90 bg-emerald-500/5 rounded-r-lg">
              &quot;This isn&apos;t just about training; it&apos;s about building the cognitive infrastructure that allows an organization to learn, adapt, and scale at the speed of AI.&quot;
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 2. Bento Grid 2.0 Tools ---------- */
function ToolsGrid() {
  const tools = [
    {
      id: "learning-engine",
      title: "The Learning Engine",
      subtitle: "The Future of Content Velocity",
      description: (
        <span>
          A proprietary multi-agent orchestration layer that automates storyboarding, scripting, and localization (14+ languages). 
          Built with a <span className="font-bold text-white">Human-in-the-Loop</span> philosophy, it transforms months of development into hours, 
          delivering a robust first draft that empowers instructional designers to focus on creative refinement and strategic impact.
        </span>
      ),
      icon: Sparkles,
      colSpan: "lg:col-span-2",
      tags: ["Python", "OpenAI", "Multi-Agent"],
      status: "Production Ready",
    },
    {
      id: "performance-data",
      title: "Automated Performance Data Collection",
      subtitle: "Systematic Insight",
      description: "Beyond Simple Training. A custom-engineered data collection engine that automates the acquisition of pre and post-intervention performance metrics. By transforming mundane VBA forms into a high-precision diagnostic suite, this tool provides L&D leaders with the quantitative data needed to prove ROI and drive continuous organizational improvement.",
      icon: FileSpreadsheet,
      colSpan: "lg:col-span-1",
      tags: ["VBA", "Performance Tracking", "ROI"],
      status: "Active",
    },
    {
      id: "standardization",
      title: "Standardization Frameworks",
      subtitle: "Governance at Scale",
      description: "Robust design systems for L&D, featuring automated QA rubrics and component-based authoring for pedagogical excellence.",
      icon: ShieldCheck,
      colSpan: "lg:col-span-1",
      tags: ["Governance", "QA", "LXD"],
      status: "System-wide",
    },
    {
      id: "localization",
      title: "Global Reach",
      subtitle: "Multilingual Pipeline",
      description: "Seamless automated localization supporting 14+ languages, ensuring cultural and pedagogical consistency across global regions.",
      icon: Globe2,
      colSpan: "lg:col-span-2",
      tags: ["Localization", "i18n", "DeepL API"],
      status: "14+ Languages",
    },
  ];

  return (
    <section className="px-5 py-24 md:py-32 bg-[#030303]">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16">
          <span className="mb-6 block text-xs font-medium uppercase tracking-[0.3em] text-emerald-500/80 font-mono">
            Automation Suite
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The Instructional Design <span className="italic font-serif text-emerald-400">Toolkit.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
          {tools.map((tool, i) => (
            <Reveal key={tool.id} delay={i * 0.1} className={tool.colSpan}>
              <div className="group relative h-full p-8 rounded-3xl border border-white/5 bg-[#0a0a0a] hover:bg-[#0d0d0d] transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Liquid Glass Effect */}
                <div className="absolute -top-24 -right-24 h-48 w-48 bg-emerald-500/10 blur-[60px] group-hover:bg-emerald-500/20 transition-all duration-700 rounded-full" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-500">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">{tool.status}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {tool.title}
                  </h3>
                  <div className="text-xs font-mono text-emerald-500/60 uppercase tracking-wider mb-4">
                    {tool.subtitle}
                  </div>
                  <p className="text-neutral-400 leading-relaxed font-light mb-8 flex-grow">
                    {tool.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded border border-white/5 bg-white/5 text-neutral-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Ecosystem Architecture ---------- */
function EcosystemSection() {
  return (
    <section className="px-5 py-24 md:py-32 bg-[#080808] relative overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="mb-6 block text-xs font-medium uppercase tracking-[0.3em] text-emerald-500/80 font-mono">
              Ecosystem Map
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-8 leading-tight">
              Designing How <br />
              <span className="text-emerald-400 italic font-serif">Knowledge Moves.</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed font-light mb-8">
              Strategic L&D leadership isn&apos;t about content creation; it&apos;s about architectural integrity. 
              I design full-stack ecosystems where performance support is integrated directly into the flow of work.
            </p>
            
            <div className="space-y-4">
              {[
                { title: "Flow-of-Work Integration", desc: "Just-in-time aids within Slack, Teams, and Jira.", icon: Zap },
                { title: "Cognitive Search Hubs", desc: "AI-powered RAG systems for instant knowledge retrieval.", icon: Search },
                { title: "Industrialized Middleware", desc: "Unified pipelines for automated LMS/LXP deployment.", icon: Cpu },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/20 transition-all">
                  <div className="mt-1 h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                    <div className="text-xs text-neutral-500 font-light">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="relative aspect-square rounded-[3rem] border border-white/10 bg-[#050505] p-8 overflow-hidden group shadow-2xl">
            <Grain />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50" />
            
            {/* Visual Architecture Representation */}
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-64 w-64 rounded-full border border-emerald-500/20 animate-[spin_20s_linear_infinite]" />
                <div className="absolute h-48 w-48 rounded-full border border-emerald-500/30 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute h-32 w-32 rounded-full border border-emerald-500/40 animate-[spin_10s_linear_infinite]" />
              </div>
              <div className="relative h-20 w-20 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] transition-transform duration-700 group-hover:scale-110">
                <Layers className="h-10 w-10 text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Performance-to-Pipeline Command Center ---------- */
type CommandTab = "performance" | "sme";
type CommandState = "idle" | "diagnostic" | "engineering" | "designing" | "complete";
type SmeState = "idle" | "crystallizing" | "forging" | "validating" | "complete";

function CommandCenterSection() {
  const [activeTab, setActiveTab] = useState<CommandTab>("performance");
  const [state, setState] = useState<CommandState>("idle");
  const [smeState, setSmeState] = useState<SmeState>("idle");
  const reduced = useReducedMotion();

  const tabs: { id: CommandTab; label: string }[] = [
    { id: "performance", label: "Performance-to-Pipeline" },
    { id: "sme", label: "SME-to-Content Direct" },
  ];

  const states: { id: CommandState; label: string; icon: any }[] = [
    { id: "idle", label: "0. Status", icon: Activity },
    { id: "diagnostic", label: "1. Diagnostic", icon: Terminal },
    { id: "engineering", label: "2. Engineering", icon: Brain },
    { id: "designing", label: "3. Designing", icon: Layers },
    { id: "complete", label: "4. Deployment", icon: Rocket },
  ];

  return (
    <section className="px-5 py-24 md:py-32 bg-[#030303] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vh] w-[80vh] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <Reveal className="mb-16">
          <span className="mb-6 block text-xs font-medium uppercase tracking-[0.3em] text-emerald-500/80 font-mono">
            Command Center
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6 leading-tight">
            Command Center
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed font-light max-w-3xl">
            Industrializing human capability. Watch as raw performance data is vectorized, 
            diagnosed through Gilbert&apos;s BEM, and engineered into a strategic learning blueprint.
          </p>
        </Reveal>

        {/* Tab Switcher */}
        <div className="flex gap-1 p-1 bg-white/[0.02] border border-white/5 rounded-full mb-12 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all relative ${
                activeTab === tab.id ? "text-white" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === "performance" ? (
          <>
            <DiagnosticVision />
            <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8 items-start">
              {/* Navigation */}
              <div className="flex flex-col gap-3">
                {states.map((s) => (
                  <button
                    key={s.id}
                    disabled={state !== s.id && state !== "complete"}
                    onClick={() => state === "complete" && setState(s.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden group ${
                      state === s.id
                        ? "bg-emerald-500/10 border-emerald-500/30 text-white shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                        : "bg-white/[0.02] border-white/5 text-neutral-500 opacity-60"
                    }`}
                  >
                    {state === s.id && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute inset-0 bg-emerald-500/5"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <div className={`relative z-10 h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      state === s.id ? "bg-emerald-500 text-black scale-110 shadow-[0_0_20px_rgba(16,185,129,0.4)]" : "bg-white/5 text-neutral-500"
                    }`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <span className="relative z-10 font-bold text-xs uppercase tracking-[0.2em]">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Display Area */}
              <div className="relative min-h-[500px] rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 overflow-hidden shadow-2xl group/display">
                <Grain />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
                
                <motion.div
                  key={state}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative h-full flex flex-col"
                >
                  {state === "idle" && (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="relative mb-8 group/file">
                    <div className="absolute -inset-4 bg-emerald-500/10 blur-xl rounded-full opacity-0 group-hover/file:opacity-100 transition-opacity" />
                    <div className="relative p-6 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
                          <FileSpreadsheet className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-white mb-0.5">performance_data_q2.xlsx</div>
                          <div className="flex gap-3 text-[10px] text-neutral-500 font-mono uppercase tracking-tight">
                            <span>2.4 MB</span>
                            <span className="text-emerald-500/60">•</span>
                            <span className="text-emerald-400 font-bold">Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg border-2 border-[#0a0a0a]">
                      <CheckCircle2 className="h-3 w-3 text-black" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Dataset Loaded & Verified</h3>
                  <p className="text-neutral-500 text-sm max-w-sm mb-10 font-light leading-relaxed">
                    Secure ingestion pipeline established. 4,200 unique data signals across 12 global regions are ready for strategic audit.
                  </p>
                  
                  <button
                    onClick={() => setState("diagnostic")}
                    className="group relative px-10 py-4 rounded-full bg-emerald-500 text-black font-bold uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center gap-2">
                      Initiate Global Audit <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              )}

                  {state === "diagnostic" && (
                    <div className="space-y-8 py-6">
                      <div className="flex items-center gap-3 text-emerald-500 font-mono text-xs uppercase tracking-[0.3em]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Live Diagnostic
                      </div>
                      <div className="space-y-4">
                        {[
                          { text: "Vectorizing Benchmarks", delay: 0 },
                          { text: "Gilbert's BEM Analysis", delay: 0.8 },
                          { text: "Root Cause: Skill Gap Identified", delay: 1.6, highlight: true },
                        ].map((node, i) => (
                          <motion.div
                            key={node.text}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: node.delay, duration: 0.5 }}
                            className={`p-5 rounded-2xl border flex items-center gap-4 transition-colors ${
                              node.highlight 
                                ? "bg-emerald-500/10 border-emerald-500/30 text-white" 
                                : "bg-white/[0.03] border-white/5 text-neutral-400"
                            }`}
                          >
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                              node.highlight ? "bg-emerald-500 text-black" : "bg-white/5"
                            }`}>
                              {i === 2 ? <CheckCircle2 className="h-4 w-4" /> : <div className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />}
                            </div>
                            <span className="font-mono text-sm tracking-tight">{node.text}</span>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 2.2 }}
                        className="pt-6"
                      >
                        <button
                          onClick={() => setState("engineering")}
                          className="text-xs font-bold text-emerald-400 uppercase tracking-widest hover:text-emerald-300 transition-colors flex items-center gap-2"
                        >
                          Process to Engineering <ArrowRight className="h-3 w-3" />
                        </button>
                      </motion.div>
                    </div>
                  )}

                  {state === "engineering" && (
                    <div className="h-full flex flex-col items-center justify-center py-10 relative">
                      <div className="relative w-64 h-64 mb-12">
                        {/* Radar Circles */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 border border-emerald-500/20 rounded-full"
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                          />
                        ))}
                        {/* Rotating Scan Line */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent to-emerald-500 origin-left"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Found Node */}
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 1.5, type: "spring" }}
                          className="absolute top-1/4 right-1/4"
                        >
                          <div className="relative group/node">
                            <div className="absolute -inset-4 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
                            <div className="relative h-4 w-4 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-[#1a1a1a] border border-emerald-500/30 rounded-lg text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                              Solution: Logic Application Simulation
                            </div>
                          </div>
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Brain className="h-10 w-10 text-emerald-500/30" />
                        </div>
                      </div>
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 }}
                        onClick={() => setState("designing")}
                        className="px-6 py-2.5 rounded-full border border-emerald-500/50 text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500/10 transition-all"
                      >
                        Begin Architectural Design
                      </motion.button>
                    </div>
                  )}

                  {state === "designing" && (
                    <div className="space-y-10 py-4">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="text-emerald-500/60 font-mono text-[10px] uppercase tracking-[0.4em]">Drafting Pipeline</div>
                          <div className="space-y-4">
                            {[
                              { label: "Objectives", val: "Industrial Logic Mastery" },
                              { label: "Assessments", val: "Scenario-based simulation" },
                              { label: "Scripting", val: "Multilingual logic-branching" },
                            ].map((item, i) => (
                              <div key={item.label} className="relative">
                                <div className="text-[10px] text-neutral-500 uppercase tracking-widest mb-1">{item.label}</div>
                                <div className="text-sm font-mono text-white flex">
                                  <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: i * 0.8 }}
                                    className="overflow-hidden whitespace-nowrap border-r-2 border-emerald-500"
                                  >
                                    {item.val}
                                  </motion.span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="relative rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden p-6 flex items-center justify-center">
                          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10">
                            {[...Array(36)].map((_, i) => (
                              <div key={i} className="border-[0.5px] border-emerald-500" />
                            ))}
                          </div>
                          <Layers className="h-16 w-16 text-emerald-500/20" />
                          <motion.div
                            className="absolute inset-0 bg-emerald-500/5"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.8 }}
                        className="flex justify-center"
                      >
                        <button
                          onClick={() => setState("complete")}
                          className="px-10 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px] transition-all hover:scale-105"
                        >
                          Finalize & Deploy Blueprint
                        </button>
                      </motion.div>
                    </div>
                  )}

                  {state === "complete" && (
                    <div className="h-full flex flex-col py-2">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-2 inline-block">
                            Deployment Ready
                          </div>
                          <h3 className="text-2xl font-bold text-white tracking-tight">Strategic Learning Blueprint</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-1">Pipeline ID</div>
                          <div className="font-mono text-xs text-emerald-500/80">#LD-PR-2024-042</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                          { label: "Target ROI", val: "142%", sub: "Quarterly Projection" },
                          { label: "Throughput", val: "12k", sub: "Learners / Month" },
                          { label: "Logic Score", val: "94/100", sub: "Simulation Grade" },
                        ].map((stat) => (
                          <div key={stat.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="text-[9px] text-neutral-500 uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-xl font-bold text-emerald-400">{stat.val}</div>
                            <div className="text-[9px] text-neutral-600 mt-1">{stat.sub}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex-grow p-6 rounded-3xl bg-emerald-500 text-[#062a1d] relative overflow-hidden group/card shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
                        <div className="absolute top-0 right-0 p-6">
                          <Rocket className="h-12 w-12 opacity-20 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-transform" />
                        </div>
                        <div className="relative z-10">
                          <div className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">Impact Summary</div>
                          <p className="text-lg font-bold leading-tight mb-4">
                            Industrialized training infrastructure deployed to 12 global markets.
                          </p>
                          <ul className="space-y-2">
                            {["Automated Localized Scripting", "Real-time Skill Gap Tracking", "ROI-Driven Feedback Loop"].map((item) => (
                              <li key={item} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
                                <CheckCircle2 className="h-3 w-3" /> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setState("idle")}
                        className="mt-6 text-[10px] text-neutral-500 uppercase tracking-[0.3em] hover:text-emerald-400 transition-colors"
                      >
                        Reset System Simulation
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          <SmePipelineDemo state={smeState} setState={setSmeState} />
        )}
      </div>
    </section>
  );
}

/* ---------- 5. SME-to-Content Direct Pipeline ---------- */
function SmePipelineDemo({ state, setState }: { state: SmeState; setState: (s: SmeState) => void }) {
  const reduced = useReducedMotion();

  const states: { id: SmeState; label: string; icon: any }[] = [
    { id: "idle", label: "Intake", icon: Mail },
    { id: "crystallizing", label: "Crystallizing", icon: Sparkles },
    { id: "forging", label: "Forging", icon: Hammer },
    { id: "validating", label: "Validating", icon: ShieldCheck },
    { id: "complete", label: "Direct Export", icon: Rocket },
  ];

  return (
    <>
      <CrystallizationVision />
      <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8 items-start">
      {/* Navigation */}
      <div className="flex flex-col gap-3">
        {states.map((s) => (
          <button
            key={s.id}
            disabled={state !== s.id && state !== "complete"}
            onClick={() => state === "complete" && setState(s.id)}
            className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden group ${
              state === s.id
                ? "bg-emerald-500/10 border-emerald-500/30 text-white shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                : "bg-white/[0.02] border-white/5 text-neutral-500 opacity-60"
            }`}
          >
            {state === s.id && (
              <motion.div 
                layoutId="active-pill-sme"
                className="absolute inset-0 bg-emerald-500/5"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className={`relative z-10 h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
              state === s.id ? "bg-emerald-500 text-black scale-110 shadow-[0_0_20px_rgba(16,185,129,0.4)]" : "bg-white/5 text-neutral-500"
            }`}>
              <s.icon className="h-5 w-5" />
            </div>
            <span className="relative z-10 font-bold text-xs uppercase tracking-[0.2em]">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Display Area */}
      <div className="relative min-h-[500px] rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] p-10 overflow-hidden shadow-2xl group/display">
        <Grain />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
        
        <motion.div
          key={state}
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative h-full flex flex-col"
        >
          {state === "idle" && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="relative mb-8 group/file">
                <div className="absolute -inset-4 bg-emerald-500/10 blur-xl rounded-full opacity-0 group-hover/file:opacity-100 transition-opacity" />
                <div className="relative p-6 rounded-3xl bg-white/[0.03] border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-10 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
                      <FileSpreadsheet className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white mb-0.5">sme_brain_dump_v4.pdf</div>
                      <div className="flex gap-3 text-[10px] text-neutral-500 font-mono uppercase tracking-tight">
                        <span>1.8 MB</span>
                        <span className="text-emerald-500/60">•</span>
                        <span className="text-emerald-400 font-bold">Captured</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg border-2 border-[#0a0a0a]">
                  <CheckCircle2 className="h-3 w-3 text-black" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Expertise Captured & Verified</h3>
              <p className="text-neutral-500 text-sm max-w-sm mb-10 font-light leading-relaxed">
                Unstructured technical knowledge captured from SME session. Ready to deconstruct and engineer production-ready pedagogical flows.
              </p>
              
              <button
                onClick={() => setState("crystallizing")}
                className="group relative px-10 py-4 rounded-full bg-emerald-500 text-black font-bold uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10 flex items-center gap-2">
                  Initiate SME-to-Content Pipeline <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          )}

          {state === "crystallizing" && (
            <div className="space-y-8 py-6">
              <div className="flex items-center gap-3 text-emerald-500 font-mono text-xs uppercase tracking-[0.3em]">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Semantic Processing
              </div>
              <div className="relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] font-mono text-sm leading-relaxed text-neutral-400">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <p className="relative inline-block">
                    &quot;The system requires high-voltage isolation before any manual overrides...&quot;
                    <motion.div 
                      className="absolute inset-0 bg-emerald-500/20"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: [0, 1, 1] }}
                      transition={{ duration: 2, times: [0, 0.5, 1] }}
                      style={{ originX: 0 }}
                    />
                  </p>
                  <div className="grid grid-cols-1 gap-3 pt-6">
                    {[
                      { text: "Semantic Deconstruction", delay: 0 },
                      { text: "Pedagogical Chunking", delay: 1 },
                      { text: "Objective Alignment", delay: 2 },
                    ].map((node, i) => (
                      <motion.div
                        key={node.text}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: node.delay + 0.5 }}
                        className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-emerald-400/70"
                      >
                        <div className="h-1 w-1 rounded-full bg-emerald-500" />
                        {node.text}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                onClick={() => setState("forging")}
                className="text-xs font-bold text-emerald-400 uppercase tracking-widest hover:text-emerald-300 transition-colors flex items-center gap-2"
              >
                Proceed to Forging <ArrowRight className="h-3 w-3" />
              </motion.button>
            </div>
          )}

          {state === "forging" && (
            <div className="h-full flex flex-col">
              <div className="grid grid-cols-2 gap-4 flex-grow">
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest mb-4">Raw Ingest</span>
                  <div className="space-y-2 font-mono text-[10px] text-neutral-600">
                    <p>&quot;Isolation first. Check meters. Verify load. Safety protocol 42. Lockout-Tagout...&quot;</p>
                  </div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col"
                >
                  <span className="text-[10px] text-emerald-500 uppercase tracking-widest mb-4 font-bold">Storyboard Table</span>
                  <div className="space-y-3 font-mono text-[10px] text-emerald-400/80">
                    <div className="border-b border-emerald-500/20 pb-2 flex justify-between">
                      <span>Step 1: Prep</span>
                      <span className="opacity-50">#ID-01</span>
                    </div>
                    <div className="border-b border-emerald-500/20 pb-2 flex justify-between">
                      <span>Step 2: Verify</span>
                      <span className="opacity-50">#ID-02</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Step 3: Execute</span>
                      <span className="opacity-50">#ID-03</span>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={() => setState("validating")}
                className="mt-8 px-10 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px] transition-all hover:scale-105"
              >
                Validate Pedagogy
              </motion.button>
            </div>
          )}

          {state === "validating" && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="flex gap-4 mb-8">
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    animate={{ 
                      boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 20px rgba(16,185,129,0.3)", "0 0 0px rgba(16,185,129,0)"],
                      borderColor: ["rgba(255,255,255,0.05)", "rgba(16,185,129,0.5)", "rgba(255,255,255,0.05)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    className="h-12 w-12 rounded-xl border flex items-center justify-center text-emerald-400"
                  >
                    <ShieldCheck className="h-6 w-6" />
                  </motion.div>
                ))}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Human-in-the-Loop Validation</h3>
              <p className="text-neutral-500 text-xs mb-10 font-light uppercase tracking-widest">
                Automated QA complete. Manual pedagogical sign-off required.
              </p>
              <button
                onClick={() => setState("complete")}
                className="px-8 py-3 rounded-full bg-emerald-500 text-black font-bold uppercase tracking-widest text-[10px] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all"
              >
                Approve Pedagogy
              </button>
            </div>
          )}

          {state === "complete" && (
            <div className="h-full flex flex-col py-2">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-2 inline-block">
                    Pipeline Output
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Direct Export Successful</h3>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-1">Asset Status</div>
                  <div className="font-mono text-xs text-emerald-500/80">READY</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 flex-grow">
                {[
                  { title: "Storyline Template", desc: "Production-ready .story file" },
                  { title: "Markdown Base", desc: "Structured architectural docs" },
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col justify-center items-center text-center group/item hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500 mb-4 group-hover/item:scale-110 transition-transform">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                    <div className="text-[10px] text-neutral-500 font-light">{item.desc}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setState("idle")}
                className="mt-auto text-[10px] text-neutral-500 uppercase tracking-[0.3em] hover:text-emerald-400 transition-colors"
              >
                Reset Pipeline
              </button>
            </div>
          )}
        </motion.div>
      </div>
      </div>
    </>
  );
}


/* ---------- Final CTA ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-24 md:py-40 bg-[#030303] border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-emerald-500/5 blur-[120px] rounded-full" />
      <div className="mx-auto max-w-6xl relative z-10 text-center">
        <Reveal>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl max-w-3xl mx-auto">
            Ready to <span className="text-emerald-400 italic font-serif">Industrialize</span> your L&D?
          </h2>
          <p className="mt-8 max-w-xl mx-auto text-lg text-neutral-400 font-light">
            Architecting modern, scalable capability engines for global organizations.
          </p>
          <div className="mt-12 flex justify-center">
            <MagneticButton href={EMAIL} variant="primary" className="px-12 py-5 text-lg rounded-full">
              Start the Conversation
              <ArrowRight className="ml-3 h-5 w-5" />
            </MagneticButton>
          </div>
          <div className="mt-16 flex justify-center items-center gap-8 text-sm text-neutral-500">
            <a href={EMAIL} className="inline-flex items-center gap-2 transition-colors hover:text-white group">
              <Mail className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" /> not.jitin@gmail.com
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white group">
              <Linkedin className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 6. Vision Components ---------- */
function DiagnosticVision() {
  return (
    <div className="mb-12 text-left">
      <Reveal>
        <h3 className="text-xl font-bold text-white mb-4">Vision: The Performance Diagnostic</h3>
        <p className="text-neutral-400 text-sm max-w-2xl mb-8 leading-relaxed">
          Most L&D interventions fail because they treat symptoms, not root causes. This engine uses a multi-signal diagnostic logic to triangulate where human performance actually breaks down.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "Signal Ingestion", desc: "Aggregation of CRM/Jira/LMS data streams." },
            { step: "BEM Filter", desc: "Gilbert's Behavior Engineering Model logic gate." },
            { step: "Capability Mapping", desc: "Translation of gaps into Bloom's levels." },
          ].map((item, i) => (
            <div key={item.step} className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm">
              <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[8px]">{i + 1}</span>
                {item.step}
              </div>
              <div className="text-xs text-neutral-400 leading-snug">{item.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

function CrystallizationVision() {
  return (
    <div className="mb-12 text-left">
      <Reveal>
        <h3 className="text-xl font-bold text-white mb-4">Vision: Knowledge Crystallization</h3>
        <p className="text-neutral-400 text-sm max-w-2xl mb-8 leading-relaxed">
          The primary bottleneck in L&D is SME availability. By industrializing the handoff, we transform raw expertise into production-ready pedagogical objects in a single &apos;crystallization&apos; pass.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "Expertise Capture", desc: "Low-friction intake of unstructured data." },
            { step: "Pedagogical Refiner", desc: "AI-assisted deconstruction and chunking." },
            { step: "Direct Export", desc: "One-click generation of Storyline/SCORM assets." },
          ].map((item, i) => (
            <div key={item.step} className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm">
              <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-[8px]">{i + 1}</span>
                {item.step}
              </div>
              <div className="text-xs text-neutral-400 leading-snug">{item.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export function InstructionalDesignClient() {
  return (
    <main className="min-h-screen bg-[#030303] text-slate-100 selection:bg-emerald-500/30 font-sans">
      <Nav />
      <Hero />
      <ArticleSection />
      <ToolsGrid />
      <EcosystemSection />
      <CommandCenterSection />
      <Contact />
      <LdFooter />
    </main>
  );
}
