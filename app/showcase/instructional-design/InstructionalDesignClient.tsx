"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Linkedin,
  Target,
  Zap,
  Shield,
  Users,
  LayoutDashboard,
  Cpu,
  Layers,
  Settings,
  Workflow,
  Sparkles,
  FileText,
  Search,
  MessageSquare,
  ChevronRight,
  Download,
  CheckCircle2,
} from "lucide-react";
import { EASE, Reveal, useFontsReady, MagneticButton } from "../../components/ld/primitives";
import { Grain } from "../../components/leading/visuals";
import { FloatingNav } from "../../components/FloatingNav";
import { LdFooter } from "../../components/ld/LdFooter";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

/* ---------- Section label (eyebrow, used sparingly) ---------- */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-6 block text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80">
      {children}
    </span>
  );
}

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
    <section className="relative overflow-hidden px-5 pt-32 pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-20%] h-[70vh] w-[70vh] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[60vh] w-[60vh] rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Link
            href="/showcase"
            className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            Back to Showcase
          </Link>
        </Reveal>

        <div className="mt-10 max-w-3xl">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-serif text-[2.5rem] font-medium leading-[1.1] tracking-tight text-white sm:text-[3.5rem] lg:text-[4rem]"
          >
            The Learning <span className="text-emerald-400 font-serif italic">Engine.</span>
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            Pivoting from artisanal course creation to industrialized learning ecosystems. 
            Engineering the scalable architecture that bridges business strategy with measurable performance.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 1. Learning Architecture Blueprint ---------- */
function BlueprintSection() {
  const nodes = [
    { id: "work", label: "Work Context", icon: MessageSquare, sub: "Slack / Teams / Jira", pos: "top" },
    { id: "support", label: "Performance Support", icon: Zap, sub: "Just-in-time AI Aids", pos: "mid-left" },
    { id: "core", label: "Hub (LMS/LXP)", icon: LayoutDashboard, sub: "The System of Record", pos: "center" },
    { id: "knowledge", label: "Knowledge Base", icon: Search, sub: "Cognitive Search Hub", pos: "mid-right" },
    { id: "automation", label: "Automation Layer", icon: Cpu, sub: "Middleware / Reporting", pos: "bottom" },
  ];

  return (
    <section className="px-5 py-24 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Label>System Architecture</Label>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-6">
            The <span className="text-emerald-400 italic">Full-Stack</span> Ecosystem.
          </h2>
          <p className="max-w-2xl text-lg text-neutral-400 leading-relaxed mb-16">
            Leaders don&apos;t just upload SCORM files. We design how knowledge moves. 
            This blueprint visualizes a learning environment where performance support is baked into the flow of work.
          </p>
        </Reveal>

        <div className="relative aspect-[16/9] w-full max-w-4xl mx-auto rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 overflow-hidden group">
          <Grain />
          
          {/* Animated Connectors (Simple SVG implementation) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <motion.path
              d="M 50% 10% L 50% 90% M 20% 50% L 80% 50% M 20% 50% L 50% 10% M 80% 50% L 50% 10%"
              stroke="url(#gradient)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          <div className="relative z-10 w-full h-full grid grid-cols-3 grid-rows-3 gap-4">
            {/* Top: Work Context */}
            <div className="col-start-2 row-start-1 flex justify-center items-center">
              <BlueprintNode node={nodes[0]} />
            </div>
            {/* Mid Left: Support */}
            <div className="col-start-1 row-start-2 flex justify-center items-center">
              <BlueprintNode node={nodes[1]} />
            </div>
            {/* Center: Core */}
            <div className="col-start-2 row-start-2 flex justify-center items-center">
              <BlueprintNode node={nodes[2]} active />
            </div>
            {/* Mid Right: Knowledge */}
            <div className="col-start-3 row-start-2 flex justify-center items-center">
              <BlueprintNode node={nodes[3]} />
            </div>
            {/* Bottom: Automation */}
            <div className="col-start-2 row-start-3 flex justify-center items-center">
              <BlueprintNode node={nodes[4]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlueprintNode({ node, active = false }: { node: any; active?: boolean }) {
  const Icon = node.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-2xl border text-center transition-all duration-300 w-48 ${
        active 
          ? "bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
          : "bg-white/5 border-white/10"
      }`}
    >
      <div className={`mx-auto h-10 w-10 flex items-center justify-center rounded-xl mb-3 ${
        active ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-neutral-400"
      }`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-[13px] font-bold text-white mb-0.5">{node.label}</div>
      <div className="text-[10px] text-neutral-500 font-mono">{node.sub}</div>
    </motion.div>
  );
}

/* ---------- 2. Operations & Governance ---------- */
function OperationsSection() {
  const categories = [
    { title: "Blended Program", criteria: "Complex Behavioral Change", outcome: "8-12 Week Multi-Modality Journey", complexity: "High" },
    { title: "Performance Aid", criteria: "Just-in-time Support", outcome: "Infographic / 2-min Video", complexity: "Medium" },
    { title: "Strategic 'No'", criteria: "Low ROI / Missing Alignment", outcome: "Consultation on alternative fixes", complexity: "N/A" },
  ];

  return (
    <section className="px-5 py-24 md:py-32 bg-white/[0.02] border-y border-white/[0.05]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <Reveal>
            <Label>Operations & Governance</Label>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-8">
              Ruthless <span className="text-emerald-400 italic">Standardisation.</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              Scalability requires governance. I build triage systems that transform L&D from an order-taking department into a strategic performance consultancy.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span>QA Rubrics & Peer-Review Standards</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Settings className="h-5 w-5 text-emerald-400" />
                <span>Unified Design System for Rapid Dev</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <Users className="h-5 w-5 text-emerald-400" />
                <span>Standardized Stakeholder Intake Matrix</span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] group hover:border-emerald-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white">{cat.title}</h3>
                    <span className={`px-2 py-1 rounded text-[10px] font-mono ${
                      cat.complexity === "High" ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-neutral-500"
                    }`}>
                      {cat.complexity} Complexity
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-neutral-500">CRITERIA: <span className="text-neutral-300">{cat.criteria}</span></div>
                    <div className="text-xs text-neutral-500">OUTCOME: <span className="text-emerald-400/80 font-medium">{cat.outcome}</span></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Technology & Automation ---------- */
function TechStackSection() {
  const tools = [
    { name: "Multi-Agent AI", impact: "70% faster storyboarding", icon: Sparkles },
    { name: "Localized VO", impact: "Automated translations in 14 languages", icon: Workflow },
    { name: "Data Pipeline", impact: "Real-time performance reporting", icon: Cpu },
    { name: "LXD Middleware", impact: "Unified export to LMS/LXP", icon: Layers },
  ];

  return (
    <section className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-16">
          <Label>Technology Leverage</Label>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl">
            The <span className="text-emerald-400 italic">Automation</span> Stack.
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-neutral-400">
            Scaling means doing more with the same headcount. I integrate AI and custom automation into the ID workflow to collapse development cycles.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, i) => (
            <Reveal key={tool.name} delay={i * 0.05}>
              <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] h-full flex flex-col items-center text-center group hover:bg-white/[0.04] transition-all">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <tool.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{tool.impact}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. SME Enablement ---------- */
function SmeSection() {
  return (
    <section className="px-5 py-24 md:py-32 bg-[#0d0d14] relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="relative rounded-[3rem] border border-emerald-500/15 bg-emerald-500/[0.03] p-8 md:p-16 overflow-hidden">
          <div aria-hidden className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
          
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Label>SME Enablement</Label>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-6">
                Decentralising <span className="text-emerald-400 italic">Knowledge.</span>
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                Break the L&D bottleneck. I empower subject matter experts to capture knowledge through governed toolkits, maintaining quality while accelerating output.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-xs font-bold text-emerald-400 hover:bg-emerald-400/20 transition-all">
                  <Download className="h-4 w-4" /> SME TOOLKIT PREVIEW
                </button>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-neutral-500">
                  <FileText className="h-4 w-4" /> RECORDING GUIDELINES
                </div>
              </div>
            </div>
            
            <div className="bg-[#0a0a0f] rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-bold text-white uppercase tracking-widest">SME Toolkit v2.0</div>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-4">
                {[
                  "Guided Scripting Templates",
                  "AI-Powered Video Cleanup Rules",
                  "Modular Content Checklists",
                  "One-Click Upload Pipeline"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-neutral-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Agile Workflows ---------- */
function WorkflowSection() {
  const columns = [
    { title: "Analysis", tasks: ["Intake Processing", "SME Alignment"] },
    { title: "Design", tasks: ["LXD Blueprint", "Storyboard Gen"] },
    { title: "Dev", tasks: ["Iterative Prototyping", "Peer Review"] },
    { title: "Done", tasks: ["LMS Deployment", "Impact Metrics"] },
  ];

  return (
    <section className="px-5 py-24 md:py-32 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14">
          <Label>Team & Lifecycle</Label>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Agile Learning <span className="text-emerald-400 italic">Workflows.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            From order-taking to performance consulting. I run teams on a modified Agile/Scrum process, collapsing the traditional ADDIE cycle into rapid, high-impact sprints.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.08}>
              <div className="p-4 rounded-3xl border border-white/5 bg-white/[0.01] h-full flex flex-col">
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 flex items-center justify-between">
                  {col.title}
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/40" />
                </h3>
                <div className="space-y-3">
                  {col.tasks.map((task) => (
                    <div key={task} className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 text-sm text-white font-medium shadow-sm">
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-24 md:py-32 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl text-left">
        <Reveal>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Let&apos;s build your capability engine.
          </h2>
          <p className="mt-8 max-w-xl text-lg text-neutral-400">
            Currently advising on AI-in-learning strategy and architecting modern, scalable L&D functions.
          </p>
          <div className="mt-12 flex">
            <MagneticButton href={EMAIL} variant="primary" className="px-10 py-4 text-base">
              Get in touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-neutral-500">
            <a
              href={EMAIL}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} /> not.jitin@gmail.com
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function InstructionalDesignClient() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30">
      <Nav />
      <Hero />
      <BlueprintSection />
      <OperationsSection />
      <TechStackSection />
      <SmeSection />
      <WorkflowSection />
      <Contact />
      <LdFooter />
    </main>
  );
}
