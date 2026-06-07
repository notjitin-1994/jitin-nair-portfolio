"use client";

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
} from "lucide-react";
import { EASE, Reveal, useFontsReady, MagneticButton } from "../../components/ld/primitives";
import { Grain } from "../../components/leading/visuals";
import { FloatingNav } from "../../components/FloatingNav";
import { LdFooter } from "../../components/ld/LdFooter";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

/* ---------- Nav ---------- */
function Nav() {
  return (
    <FloatingNav
      brandHref="/showcase"
      suffix="Instructional Design"
      accent="emerald"
      links={[
        { label: "Showcase", href: "/showcase" },
        { label: "L&D Portfolio", href: "/LD-Systems-Portfolio" },
        { label: "Experience", href: "/work" },
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
            href="/showcase"
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
function CommandCenterSection() {
  const [step, setStep] = (require("react").useState)(0);
  const steps = [
    { id: "diagnostic", label: "1. Diagnostic", icon: Terminal },
    { id: "engineering", label: "2. Engineering", icon: Brain },
    { id: "impact", label: "3. Impact", icon: Rocket },
  ];

  return (
    <section className="px-5 py-24 md:py-32 bg-[#030303] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vh] w-[80vh] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <Reveal className="text-center mb-16">
          <span className="mb-6 block text-xs font-medium uppercase tracking-[0.3em] text-emerald-500/80 font-mono">
            Interactive Demo
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            The Command Center: <br />
            <span className="text-emerald-400 italic font-serif">Performance-to-Pipeline</span>
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed font-light max-w-3xl mx-auto">
            A unified lifecycle engine that bridges the gap between organizational performance data and industrial-scale learning solutions. 
            This tool moves L&D from a reactive &quot;order-taker&quot; model to a proactive engineering discipline.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-start">
          {/* Navigation */}
          <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(i)}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left ${
                  step === i
                    ? "bg-emerald-500/10 border-emerald-500/30 text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "bg-white/[0.02] border-white/5 text-neutral-500 hover:border-white/10"
                }`}
              >
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                  step === i ? "bg-emerald-500 text-black" : "bg-white/5 text-neutral-500"
                }`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Display Area */}
          <div className="relative min-h-[450px] rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 overflow-hidden shadow-2xl">
            <Grain />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />
            
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative h-full flex flex-col"
            >
              {step === 0 && (
                <div className="font-mono text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-2 text-emerald-500 mb-4">
                    <Activity className="h-4 w-4 animate-pulse" />
                    <span className="uppercase tracking-widest font-bold">Live Data Ingestion</span>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-neutral-500">[08:42:11] <span className="text-white">Analyzing Support Stream...</span></p>
                    <p className="text-neutral-500">[08:42:15] <span className="text-emerald-400/80">Support Ticket #492: Technical logic error detected.</span></p>
                    <p className="text-neutral-500">[08:42:19] <span className="text-red-400/80">Customer Sentiment: Negative on troubleshooting steps.</span></p>
                    <p className="text-neutral-500">[08:42:24] <span className="text-white">Pattern Recognition: Recurring gap in advanced logic application.</span></p>
                    <p className="text-neutral-500">[08:42:30] <span className="text-emerald-400">Diagnostic Complete. Skill deficiency mapped.</span></p>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "100%" }} 
                        transition={{ duration: 4, ease: "linear" }}
                        className="h-full bg-emerald-500" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="relative mb-12">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
                    <div className="relative h-24 w-24 rounded-3xl bg-[#030303] border border-emerald-500/30 flex items-center justify-center">
                      <Brain className="h-12 w-12 text-emerald-400" />
                    </div>
                    {/* Glowing Nodes Simulation */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        className="absolute h-2 w-2 bg-emerald-500 rounded-full blur-[2px]"
                        style={{
                          top: `${50 + 40 * Math.sin((i * 2 * Math.PI) / 6)}%`,
                          left: `${50 + 40 * Math.cos((i * 2 * Math.PI) / 6)}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-4">Solution Forge Active</div>
                    <h4 className="text-2xl font-bold text-white mb-2">Architecting Modular Curriculum</h4>
                    <p className="text-neutral-400 text-sm max-w-md mx-auto">
                      AI identified a critical skill gap: <span className="text-white">Advanced Logic Application (Bloom Level 3)</span>. 
                      Generating optimized pedagogical nodes.
                    </p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-widest">
                      Solution Blueprint Generated
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <span className="text-2xl">$124K</span>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-500">Projected Monthly ROI</span>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-4">Curriculum: LogicMaster v2.0</h5>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Modality", val: "Adaptive Learning" },
                        { label: "Duration", val: "4.5 Hours" },
                        { label: "Target", val: "L3 Logic Mastery" },
                        { label: "Delivery", val: "In-Work AI Assist" },
                      ].map((stat, i) => (
                        <div key={i} className="space-y-1">
                          <div className="text-[10px] text-neutral-500 uppercase tracking-widest">{stat.label}</div>
                          <div className="text-sm font-medium text-emerald-100/90">{stat.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["Object A", "Object B", "Object C"].map((obj, i) => (
                      <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500/50 mb-2" />
                        <span className="text-[10px] font-bold text-neutral-400 uppercase">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
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
