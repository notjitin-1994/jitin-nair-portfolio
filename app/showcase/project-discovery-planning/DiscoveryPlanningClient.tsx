"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Linkedin,
  ClipboardList,
  Cpu,
  ClipboardCheck,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { EASE, Reveal, useFontsReady, MagneticButton } from "../../components/ld/primitives";
import { Grain } from "../../components/leading/visuals";
import { FloatingNav } from "../../components/FloatingNav";
import { LdFooter } from "../../components/ld/LdFooter";
import { PolarisShowcaseSection } from "./PolarisShowcase";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

const PHASES = [
  {
    number: "01",
    phase: "Phase I · Intake",
    icon: ClipboardList,
    name: "Structured Intake",
    description:
      "30+ fields map the full org context: industry, headcount, data policy, learning gap, audience profile, delivery mode, timeline, and budget — captured as structured JSONB for precise AI processing.",
    stat: "30+",
    statLabel: "structured fields",
    accent: false,
    image: "https://images.unsplash.com/photo-1454165833767-027ff33026b4?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "02",
    phase: "AI Analysis",
    icon: Cpu,
    name: "Adaptive Question Generation",
    description:
      "The intelligence engine reads the intake signal and generates a bespoke discovery questionnaire — 10 thematic sections, 60+ precision questions — uniquely calibrated to the org, industry, and learning gap.",
    stat: "60+",
    statLabel: "AI-authored questions",
    accent: true,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "03",
    phase: "Phase II · Discovery",
    icon: ClipboardCheck,
    name: "Deep Discovery",
    description:
      "The L&D practitioner answers structured questions across cognitive levels, modality split, platform stack, KPIs, and budget allocation — using 13 purpose-built input types for maximum signal quality.",
    stat: "13",
    statLabel: "input types",
    accent: false,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    number: "04",
    phase: "AI Synthesis",
    icon: Sparkles,
    name: "Learning Experience Design Documentation",
    description:
      "All discovery signals converge. The AI synthesizes a 10-section learning experience design documentation — objectives, modules, assessments, rollout, and budget — in under 45 seconds, export-ready in JSON and Markdown.",
    stat: "< 45s",
    statLabel: "to full LX documentation",
    accent: true,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
];

const PIPELINE_NODES = [
  {
    id: "intake",
    label: "Phase I · Static Intake",
    icon: ClipboardList,
    name: "Structured Context Capture",
    detail: "Acme Services · Financial Services · 26–50 learners · $70,000 · 8 weeks",
    accent: false,
  },
  {
    id: "ai-gen",
    label: "AI Analysis · Intelligence Engine",
    icon: Cpu,
    name: "Adaptive Question Generation",
    detail: "10 sections · 60 precision questions · uniquely calibrated to context",
    accent: true,
  },
  {
    id: "discovery",
    label: "Phase II · Dynamic Questionnaire",
    icon: ClipboardCheck,
    name: "Deep Discovery",
    detail: "Cognitivism + Experiential · 80% async / 20% live · LMS + Zoom · Bloom's L4–L5",
    accent: false,
  },
  {
    id: "blueprint",
    label: "Synthesis · LX Documentation",
    icon: Sparkles,
    name: '"Data-Driven Leadership"',
    detail: "8 weeks · 4 modules · Phillips ROI · JSON + Markdown · < 45s",
    accent: true,
  },
];

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
      suffix="Discovery & Planning"
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
            Project <span className="text-emerald-400 font-serif italic">Discovery</span> &
            Planning.
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            Automated stakeholder discovery, strategic curriculum mapping, and the architectural
            documentation that bridges business needs with learning solutions.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pipeline Section ---------- */
function PipelineSection() {
  return (
    <section className="px-5 py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[80vh] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Label>The Methodology</Label>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-6">
            Intelligence in <span className="text-emerald-400 italic">Two Acts.</span>
          </h2>
          <p className="max-w-2xl text-lg text-neutral-400 leading-relaxed mb-16">
            Structured intake feeds an AI that generates precision discovery questions, and those
            answers synthesize into a production-ready learning experience design documentation — without a single manual
            reformatting step.
          </p>
        </Reveal>

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <Reveal key={phase.number} delay={i * 0.09} y={24}>
                <div
                  className={`relative group h-full flex flex-col rounded-2xl border p-6 transition-all duration-300 overflow-hidden ${
                    phase.accent
                      ? "border-emerald-500/20 bg-emerald-500/[0.04] hover:border-emerald-500/40"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14]"
                  }`}
                >
                  {/* Contextual Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={phase.image}
                      alt=""
                      fill
                      className="object-cover opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Large faded number */}
                  <span
                    aria-hidden
                    className="relative z-10 absolute -top-2 -right-1 font-mono text-[5.5rem] font-extrabold leading-none text-white/[0.025] select-none pointer-events-none"
                  >
                    {phase.number}
                  </span>

                  {/* Icon + phase eyebrow */}
                  <div className="relative z-10 flex items-start justify-between mb-5">
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

                  <h3 className="relative z-10 text-white font-semibold text-[15px] mb-3 leading-tight">
                    {phase.name}
                  </h3>
                  <p className="relative z-10 text-[13px] text-neutral-500 leading-relaxed flex-1">
                    {phase.description}
                  </p>

                  {/* Bottom stat */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06]">
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

/* ---------- Architecture Section ---------- */
function ArchitectureSection() {
  const reduced = useReducedMotion();

  return (
    <section className="px-5 py-16 md:py-24 bg-white/[0.02] border-y border-white/[0.05] relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* LEFT: Copy */}
          <Reveal>
            <Label>Core Architecture</Label>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-8">
              Two phases,
              <br />
              <span className="text-emerald-400 italic">one coherent</span> signal.
            </h2>
            <div className="space-y-5 text-neutral-400 leading-relaxed">
              <p className="text-lg">
                Most L&D tools treat intake and design as separate workflows. Polaris binds them:
                Phase I captures organizational context; Phase II extracts instructional
                intelligence — and the AI layer translates both into a structured LX documentation without
                manual reformatting.
              </p>
              <ul className="space-y-4 pt-2">
                {[
                  {
                    term: "Phase I → AI",
                    def: "Static intake feeds the intelligence engine, which generates 60+ bespoke discovery questions",
                  },
                  {
                    term: "Phase II → LX Documentation",
                    def: "Dynamic answers synthesized into a 10-section LX documentation structure",
                  },
                  {
                    term: "Dual-format export",
                    def: "Structured JSON for systems integration, Markdown for stakeholder review",
                  },
                  {
                    term: "< 45s synthesis",
                    def: "From final answer to production-ready, validated LX documentation",
                  },
                ].map(({ term, def }) => (
                  <li key={term} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span>
                      <span className="text-white font-medium">{term}</span> — {def}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* RIGHT: Vertical pipeline visualization */}
          <Reveal delay={0.2}>
            <div className="relative rounded-[3rem] border border-white/10 bg-[#0a0a0f] p-8 overflow-hidden">
              <Grain />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-transparent pointer-events-none"
              />

              <div className="relative flex flex-col gap-0">
                {PIPELINE_NODES.map((node, i) => {
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

                      {/* Connector */}
                      {i < PIPELINE_NODES.length - 1 && (
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
    <section className="px-5 py-16 md:py-24 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10 transition-colors duration-200 hover:border-emerald-500/20">
              <div className="font-serif text-5xl font-medium text-white mb-4">
                45<span className="text-2xl text-emerald-400">s</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Average Documentation Time</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                From raw stakeholder brief to a validated 20-section LX documentation, ready for
                production.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 p-10 transition-colors duration-200 hover:border-emerald-500/40">
              <div className="font-serif text-5xl font-medium text-white mb-4">
                500<span className="text-2xl text-emerald-400">+</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Automated Jobs / Day</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Scaled discovery agents running concurrently across multiple enterprise domains and
                contexts.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="h-full rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10 transition-colors duration-200 hover:border-emerald-500/20">
              <div className="font-serif text-5xl font-medium text-white mb-4">
                95<span className="text-2xl text-emerald-400">%</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Stakeholder Alignment</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                High-fidelity discovery accuracy verified through expert human-in-the-loop
                validation cycles.
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
    <section id="contact" className="scroll-mt-24 px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl text-left">
        <Reveal>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Let&apos;s build your capability engine.
          </h2>
          <p className="mt-8 max-w-xl text-lg text-neutral-400">
            Currently advising on AI-in-learning strategy and scaling modern L&D functions.
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

export function DiscoveryPlanningClient() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30">
      <Nav />
      <Hero />
      <PipelineSection />
      <ArchitectureSection />
      <MetricsSection />
      <PolarisShowcaseSection />
      <Contact />
      <LdFooter />
    </main>
  );
}
