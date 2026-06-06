"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Video,
  Monitor,
  Cpu,
  FileText,
  GitBranch,
  BarChart3,
  ArrowLeft,
  ArrowRight,
  Mail,
  Linkedin,
  CheckCircle2,
  Upload,
  Database,
  Layers,
  Search,
  ChevronDown,
  Sparkles,
  Target,
} from "lucide-react";
import { EASE, Reveal, useFontsReady, MagneticButton } from "../../components/ld/primitives";
import { Grain } from "../../components/leading/visuals";
import { FloatingNav } from "../../components/FloatingNav";
import { LdFooter } from "../../components/ld/LdFooter";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

/* ---------- Data ---------- */

const FORMATS = [
  {
    icon: Video,
    name: "Video-Based Learning",
    description:
      "Cinematic eLearning anchored in narrated video — crafted for maximum learner engagement and cognitive retention across async delivery contexts.",
    tools: ["Camtasia", "Articulate Rise", "Adobe Premiere"],
    accent: false,
  },
  {
    icon: Monitor,
    name: "Interactive E-Learning",
    description:
      "Self-paced modules with embedded branching, knowledge checks, and adaptive feedback loops — built to Bloom's L3–L5 cognitive targets.",
    tools: ["Articulate 360", "Storyline", "Adobe Captivate"],
    accent: false,
  },
  {
    icon: Cpu,
    name: "AI-Accelerated Development",
    description:
      "LLM-orchestrated pipelines that compress scripting, storyboarding, and quiz generation into minutes — not days. Production quality, automated.",
    tools: ["Custom AI Pipelines", "LLM Orchestration", "Auto-QA"],
    accent: true,
  },
  {
    icon: FileText,
    name: "Performance Support",
    description:
      "Job aids, quick reference cards, and decision-tree guides engineered for point-of-need access — where the real work happens.",
    tools: ["Figma", "InDesign", "Markdown"],
    accent: false,
  },
  {
    icon: GitBranch,
    name: "Simulations & Scenarios",
    description:
      "High-fidelity branching simulations that mirror real work decisions — safe environments for high-stakes practice before it counts.",
    tools: ["Storyline Branching", "Twine", "xAPI Tracking"],
    accent: false,
  },
  {
    icon: BarChart3,
    name: "Assessment & Evaluation",
    description:
      "Bloom-aligned assessments, Kirkpatrick-mapped evaluation frameworks, and Phillips ROI instruments that prove impact, not just completion.",
    tools: ["Bloom's Taxonomy", "Kirkpatrick L1–L4", "Phillips ROI"],
    accent: false,
  },
];

const PHASES = [
  {
    number: "01",
    phase: "Phase I · Brief",
    icon: Search,
    name: "Brief & Analysis",
    description:
      "Stakeholder brief translated to a learning objectives matrix — audience profile, cognitive targets, delivery constraints, and success metrics captured as structured input for the pipeline.",
    stat: "< 30",
    statLabel: "min to objectives matrix",
    accent: false,
  },
  {
    number: "02",
    phase: "AI Generation",
    icon: Cpu,
    name: "AI Scripting & Storyboard",
    description:
      "Objectives feed a bespoke prompt stack that generates a full narration script, on-screen text, and slide-level storyboard — reviewed and approved in under twenty minutes.",
    stat: "< 20",
    statLabel: "min to approved script",
    accent: true,
  },
  {
    number: "03",
    phase: "Phase II · Build",
    icon: Layers,
    name: "Template-Driven Build",
    description:
      "Branded master templates and component libraries accelerate module assembly — voice sync, interactivity hooks, and accessibility passes are automated, not manual.",
    stat: "3×",
    statLabel: "faster than traditional build",
    accent: false,
  },
  {
    number: "04",
    phase: "QA & Deploy",
    icon: CheckCircle2,
    name: "Automated QA & Publish",
    description:
      "Completion logic, WCAG 2.1 AA, and SCORM packaging validated by automated checks before a human reviews. LMS upload, versioning, and launch happen in one step.",
    stat: "< 1",
    statLabel: "hr from build to live",
    accent: true,
  },
];

const AUTO_NODES = [
  {
    id: "source",
    label: "Source Layer",
    icon: Database,
    name: "Structured Brief Intake",
    detail: "Audience · Objectives · Constraints · Success metrics",
    accent: false,
  },
  {
    id: "ai",
    label: "AI Processing Engine",
    icon: Cpu,
    name: "Script & Storyboard Generation",
    detail: "Narration script · On-screen text · Slide-level storyboard · Quiz items",
    accent: true,
  },
  {
    id: "template",
    label: "Template Engine",
    icon: Layers,
    name: "Branded Asset Assembly",
    detail: "Master templates · Component library · Voiceover sync · Accessibility pass",
    accent: false,
  },
  {
    id: "qa",
    label: "Quality Gate",
    icon: CheckCircle2,
    name: "Automated Validation",
    detail: "WCAG 2.1 AA · SCORM compliance · Completion logic · xAPI events",
    accent: true,
  },
  {
    id: "deploy",
    label: "LMS Delivery",
    icon: Upload,
    name: "Publish & Version Control",
    detail: "Package · Upload · Version tracking · Launch checklist",
    accent: false,
  },
];

const EFFICIENCY = [
  {
    task: "Script Writing",
    before: "4–6 hrs",
    after: "< 20 min",
    beforePct: 100,
    afterPct: 8,
    label: "92% time reduction",
  },
  {
    task: "Storyboard Development",
    before: "3–5 hrs",
    after: "< 30 min",
    beforePct: 100,
    afterPct: 10,
    label: "90% time reduction",
  },
  {
    task: "Module Production",
    before: "8–12 hrs",
    after: "3–4 hrs",
    beforePct: 100,
    afterPct: 35,
    label: "65% time reduction",
  },
  {
    task: "QA & Packaging",
    before: "2–3 hrs",
    after: "< 1 hr",
    beforePct: 100,
    afterPct: 40,
    label: "60% time reduction",
  },
];

/* ---------- Nav ---------- */
function Nav() {
  return (
    <FloatingNav
      brandHref="/showcase"
      suffix="Content Development"
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vh] w-[90vw] rounded-full bg-emerald-500/[0.04] blur-[80px]" />
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
          <Reveal delay={0.05}>
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-emerald-500/30" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
                Content Engineering
              </span>
            </div>
          </Reveal>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-serif text-[2.5rem] font-medium leading-[1.1] tracking-tight text-white sm:text-[3.5rem] lg:text-[4rem]"
          >
            High-impact content,{" "}
            <span className="text-emerald-400 italic">engineered</span>
            <br />
            to scale.
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            From high-fidelity video-based learning to fully automated production pipelines —
            content that meets learners where they are, delivered 60% faster than traditional methods.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Formats Section ---------- */
function FormatsSection() {
  return (
    <section className="px-5 py-24 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-[40vh] w-[60vh] rounded-full bg-emerald-500/[0.05] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-emerald-500/30" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
              The Full Spectrum
            </span>
          </div>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-6">
            Every format.{" "}
            <span className="text-emerald-400 italic">One craft.</span>
          </h2>
          <p className="max-w-2xl text-lg text-neutral-400 leading-relaxed mb-16">
            Modality follows instructional strategy, not preference. Each format is deployed
            deliberately — matched to the learning gap, audience context, and delivery environment.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FORMATS.map((format, i) => {
            const Icon = format.icon;
            return (
              <Reveal key={format.name} delay={i * 0.07} y={20}>
                <div
                  className={`group relative h-full flex flex-col rounded-2xl border p-6 transition-all duration-300 overflow-hidden ${
                    format.accent
                      ? "border-emerald-500/20 bg-emerald-500/[0.04] hover:border-emerald-500/40 hover:bg-emerald-500/[0.07]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]"
                  }`}
                >
                  {format.accent && (
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent pointer-events-none"
                    />
                  )}

                  <div className="relative flex items-start justify-between mb-5">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                        format.accent
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                          : "border-white/10 bg-white/5 text-neutral-400 group-hover:border-emerald-400/20 group-hover:bg-emerald-400/5 group-hover:text-emerald-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    {format.accent && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-emerald-500/70 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                        AI-Native
                      </span>
                    )}
                  </div>

                  <h3 className="relative text-white font-semibold text-[15px] mb-3 leading-tight">
                    {format.name}
                  </h3>
                  <p className="relative text-[13px] text-neutral-500 leading-relaxed flex-1">
                    {format.description}
                  </p>

                  <div className="relative mt-5 flex flex-wrap gap-1.5">
                    {format.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-mono text-neutral-500"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pipeline Section ---------- */
function PipelineSection() {
  return (
    <section className="px-5 py-24 md:py-32 bg-white/[0.02] border-y border-white/[0.05] relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[80vh] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-emerald-500/30" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
              The Methodology
            </span>
          </div>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-6">
            Intelligence in{" "}
            <span className="text-emerald-400 italic">Four Acts.</span>
          </h2>
          <p className="max-w-2xl text-lg text-neutral-400 leading-relaxed mb-16">
            Structured brief feeds an AI that generates scripts and storyboards in minutes, template-driven
            build accelerates production by 3×, and automated QA ships modules the same day.
          </p>
        </Reveal>

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Desktop thread */}
          <div
            aria-hidden
            className="absolute top-[3.75rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent hidden lg:block"
          />

          {PHASES.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <Reveal key={phase.number} delay={i * 0.09} y={24}>
                <div
                  className={`relative group h-full flex flex-col rounded-2xl border p-6 transition-all duration-300 overflow-hidden ${
                    phase.accent
                      ? "border-emerald-500/20 bg-emerald-500/[0.04] hover:border-emerald-500/40 hover:bg-emerald-500/[0.07]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute -top-2 -right-1 font-mono text-[5.5rem] font-extrabold leading-none text-white/[0.025] select-none pointer-events-none"
                  >
                    {phase.number}
                  </span>

                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                        phase.accent
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                          : "border-white/10 bg-white/5 text-neutral-400 group-hover:border-emerald-400/20 group-hover:bg-emerald-400/5 group-hover:text-emerald-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-neutral-600 pt-1">
                      {phase.phase}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-[15px] mb-3 leading-tight">
                    {phase.name}
                  </h3>
                  <p className="text-[13px] text-neutral-500 leading-relaxed flex-1">
                    {phase.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/[0.06]">
                    <div
                      className={`text-2xl font-mono font-bold tabular-nums ${
                        phase.accent ? "text-emerald-400" : "text-white"
                      }`}
                    >
                      {phase.stat}
                    </div>
                    <div className="text-[11px] text-neutral-600 mt-0.5 tracking-wide">
                      {phase.statLabel}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Efficiency Section ---------- */
function EfficiencySection() {
  const reduced = useReducedMotion();

  return (
    <section className="px-5 py-24 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* LEFT: Before/after comparison */}
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-emerald-500/30" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
                Automation Impact
              </span>
            </div>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-8">
              60% faster.
              <br />
              <span className="text-emerald-400 italic">Same quality floor.</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed mb-12">
              The AI pipeline doesn&apos;t cut corners — it eliminates the mechanical labour. Every hour saved
              is an hour reinvested into instructional thinking, learner experience, and impact
              validation.
            </p>

            <div className="space-y-7">
              {EFFICIENCY.map((item, i) => (
                <Reveal key={item.task} delay={i * 0.08} y={12}>
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm font-medium text-white">{item.task}</span>
                      <span className="text-[11px] font-mono text-emerald-400/80 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5">
                        {item.label}
                      </span>
                    </div>

                    {/* Before bar */}
                    <div className="mb-1.5">
                      <div className="flex items-center gap-3">
                        <span className="w-16 text-[11px] text-neutral-600 font-mono shrink-0 text-right">
                          Before
                        </span>
                        <div className="flex-1 h-5 rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-white/[0.12]"
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${item.beforePct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                          />
                        </div>
                        <span className="w-14 text-[11px] text-neutral-500 font-mono shrink-0">
                          {item.before}
                        </span>
                      </div>
                    </div>

                    {/* After bar */}
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="w-16 text-[11px] text-emerald-600 font-mono shrink-0 text-right">
                          After
                        </span>
                        <div className="flex-1 h-5 rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-emerald-400/40"
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${item.afterPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.15, ease: EASE }}
                          />
                        </div>
                        <span className="w-14 text-[11px] text-emerald-400 font-mono shrink-0 font-medium">
                          {item.after}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* RIGHT: Automation pipeline visualization */}
          <Reveal delay={0.2}>
            <div className="relative rounded-[3rem] border border-white/10 bg-[#0a0a0f] p-8 overflow-hidden">
              <Grain />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-transparent pointer-events-none"
              />

              <div className="relative mb-6">
                <div className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-emerald-400">
                    Automation Pipeline
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-neutral-600">
                  One brief-to-publish workflow
                </p>
              </div>

              <div className="relative flex flex-col gap-0">
                {AUTO_NODES.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <div key={node.id}>
                      <motion.div
                        initial={reduced ? false : { opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
                        viewport={{ once: true }}
                        className={`rounded-xl border p-4 ${
                          node.accent
                            ? "border-emerald-400/25 bg-emerald-400/[0.06]"
                            : "border-white/[0.08] bg-white/[0.03]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              node.accent
                                ? "bg-emerald-400/[0.15] text-emerald-400"
                                : "bg-white/5 text-neutral-500"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-600 mb-1">
                              {node.label}
                            </div>
                            <div className="text-sm font-semibold text-white leading-tight mb-1">
                              {node.name}
                            </div>
                            <div className="text-xs text-neutral-500 leading-relaxed">
                              {node.detail}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {i < AUTO_NODES.length - 1 && (
                        <div className="flex flex-col items-center py-0.5 ml-6">
                          <motion.div
                            className="w-px h-4 bg-gradient-to-b from-emerald-500/40 to-emerald-500/20"
                            animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 }}
                          />
                          <motion.div
                            animate={reduced ? undefined : { y: [0, 2, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 }}
                          >
                            <ChevronDown className="h-3 w-3 text-emerald-500/30" />
                          </motion.div>
                          <motion.div
                            className="w-px h-4 bg-gradient-to-b from-emerald-500/20 to-emerald-500/5"
                            animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: i * 0.7 + 0.5,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Metrics Section ---------- */
function MetricsSection() {
  return (
    <section className="px-5 py-24 md:py-32 bg-white/[0.02] border-y border-white/[0.05]">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-emerald-500/30" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
              Proven at Scale
            </span>
            <span className="h-px w-8 bg-emerald-500/30" />
          </div>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Numbers that matter.
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10">
              <div className="font-serif text-5xl font-medium text-white mb-4">
                200<span className="text-2xl text-emerald-400">+</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Modules Produced</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Across video, interactive eLearning, performance support, and simulation formats —
                deployed across enterprise and SME contexts.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 p-10">
              <div className="font-serif text-5xl font-medium text-white mb-4">
                60<span className="text-2xl text-emerald-400">%</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Faster Production</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                AI-accelerated pipeline compresses scripting, storyboarding, and build cycles without
                reducing quality or instructional integrity.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="h-full rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10">
              <div className="font-serif text-5xl font-medium text-white mb-4">
                4.8<span className="text-2xl text-emerald-400">/5</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Learner Satisfaction</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Kirkpatrick Level 1 scores averaged across deployed programmes — speed of delivery
                never comes at the cost of learner experience.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-24 md:py-32 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[40vh] w-[80vw] rounded-full bg-emerald-500/[0.06] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative rounded-[3rem] border border-white/[0.08] bg-white/[0.02] p-12 md:p-16 overflow-hidden">
            <Grain />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.07] via-transparent to-transparent pointer-events-none"
            />

            <div className="relative max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <Target className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
                  Let&apos;s Build
                </span>
              </div>

              <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl mb-8">
                Let&apos;s build something worth learning.
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed mb-12">
                Whether you need a single high-fidelity module, a full content library, or an automated
                production system — I&apos;d love to hear about the challenge.
              </p>

              <div className="flex flex-wrap gap-4">
                <MagneticButton href={EMAIL} variant="primary" className="px-10 py-4 text-base">
                  Get in touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
                <MagneticButton href="/showcase" variant="ghost" className="px-8 py-4 text-base">
                  Back to Showcase
                </MagneticButton>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-neutral-500">
                <a
                  href={EMAIL}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                  not.jitin@gmail.com
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Linkedin className="h-4 w-4" strokeWidth={1.75} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Page Root ---------- */
export function ContentDevelopmentClient() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30">
      <Nav />
      <Hero />
      <FormatsSection />
      <PipelineSection />
      <EfficiencySection />
      <MetricsSection />
      <Contact />
      <LdFooter />
    </main>
  );
}
