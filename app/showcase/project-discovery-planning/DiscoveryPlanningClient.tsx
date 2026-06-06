"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Target, 
  Search, 
  Map, 
  FileText, 
  Users, 
  Zap, 
  ChevronRight, 
  ArrowRight,
  Database,
  Workflow,
  Layout,
  Layers,
  ArrowLeft,
  Mail,
  Linkedin
} from "lucide-react";
import { EASE, Reveal, useFontsReady, MagneticButton } from "../../components/ld/primitives";
import { Grain } from "../../components/leading/visuals";
import { FloatingNav } from "../../components/FloatingNav";
import { LdFooter } from "../../components/ld/LdFooter";
import { PolarisShowcaseSection } from "./PolarisShowcase";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

const STAGES = [
  { id: "01", name: "Brief", icon: Target, description: "Automated extraction of business objectives and success metrics." },
  { id: "02", name: "Audit", icon: Search, description: "Deep-scan of existing collateral and knowledge gaps." },
  { id: "03", name: "Design", icon: Map, description: "Strategic mapping of cognitive paths and behavioral milestones." },
  { id: "04", name: "Draft", icon: FileText, description: "AI-accelerated blueprint generation and structure validation." },
  { id: "05", name: "Review", icon: Users, description: "Human-in-the-loop validation of pedagogical integrity." },
  { id: "06", name: "Refine", icon: Zap, description: "Iterative optimization based on stakeholder feedback loops." },
  { id: "07", name: "Ship", icon: Layout, description: "Deployment-ready architecture for production pipelines." },
];

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
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
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
            Project <span className="text-emerald-400 font-serif italic">Discovery</span> & Planning.
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            Automated stakeholder discovery, strategic curriculum mapping, and the architectural blueprints that bridge business needs with learning solutions.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pipeline Section ---------- */
function PipelineSection() {
  const reduced = useReducedMotion();

  return (
    <section className="px-5 py-24 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-emerald-500/30" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">The Methodology</span>
          </div>
          <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-8">
            The 7-Stage <span className="text-emerald-400 italic">Discovery</span> Engine.
          </h2>
          <p className="max-w-2xl text-lg text-neutral-400 leading-relaxed mb-16">
            How I replace weeks of manual stakeholder interviews and curriculum drafting with a unified, AI-powered infrastructure that outputs production-ready blueprints in minutes.
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-7 relative">
          {/* Connector line for desktop */}
          <div className="absolute top-[2.25rem] left-0 right-0 h-px bg-white/10 hidden md:block" />
          
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <Reveal key={stage.id} delay={i * 0.08} y={20}>
                <div className="relative group">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-18 w-18 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0f] p-4 transition-all duration-300 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.1)] mb-6">
                      <Icon className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
                      <div className="absolute -top-2 -right-2 font-mono text-[10px] font-bold text-emerald-500/50">
                        {stage.id}
                      </div>
                    </div>
                    <h3 className="text-white font-medium mb-2">{stage.name}</h3>
                    <p className="text-[11px] text-neutral-500 leading-normal max-w-[120px] md:max-w-none">
                      {stage.description}
                    </p>
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
  return (
    <section className="px-5 py-24 md:py-32 bg-white/[0.02] border-y border-white/[0.05] relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-emerald-500/30" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">Architectural Core</span>
            </div>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-8">
              From <span className="text-emerald-400 italic">Chaos</span> to Blueprint.
            </h2>
            <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
              <p>
                Organizations often rely on 7-15 disconnected tools for learning design, creating a massive bottleneck between a business need and the solution.
              </p>
              <p>
                My architecture unifies fragmented data—emails, Slack threads, legacy docs, and interviews—into a <span className="text-white">Structured Learning Context</span>.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Multi-agent synthesis of stakeholder needs",
                  "Automated curriculum gap detection",
                  "Behavioral milestone orchestration",
                  "Export-ready Markdown/JSON blueprints"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative aspect-square rounded-[3rem] border border-white/10 bg-[#0a0a0f] p-8 overflow-hidden group">
              <Grain />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-50" />
              
              <div className="relative h-full flex flex-col justify-center gap-8">
                {/* Visual Architecture Representation */}
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-neutral-400">
                    <Database className="h-6 w-6" />
                  </div>
                  <motion.div 
                    animate={{ x: [0, 20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="flex-1 h-px bg-gradient-to-r from-white/5 via-emerald-500/30 to-white/5 mx-4" 
                  />
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Workflow className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-mono text-emerald-400/70 tracking-widest uppercase">Orchestration Layer</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 0.85 }}
                        transition={{ duration: 1.5, ease: EASE }}
                        className="h-full w-full bg-emerald-400 origin-left" 
                      />
                    </div>
                    <div className="h-2 w-[70%] bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 0.6 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: EASE }}
                        className="h-full w-full bg-teal-400 origin-left" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/5 shadow-[0_0_30px_rgba(52,211,153,0.1)]">
                      <Layers className="h-8 w-8 text-emerald-400" />
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-emerald-400/20 -z-10" 
                    />
                  </div>
                </div>
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
    <section className="px-5 py-24 md:py-32 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10">
              <div className="font-serif text-5xl font-medium text-white mb-4">45<span className="text-2xl text-emerald-400">s</span></div>
              <h3 className="text-lg font-medium text-white mb-2">Average Blueprint Time</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                From raw stakeholder brief to a validated 20-page curriculum blueprint, ready for production.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 p-10">
              <div className="font-serif text-5xl font-medium text-white mb-4">500<span className="text-2xl text-emerald-400">+</span></div>
              <h3 className="text-lg font-medium text-white mb-2">Automated Jobs / Day</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Scaled discovery agents running concurrently across multiple enterprise domains and contexts.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="h-full rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-10">
              <div className="font-serif text-5xl font-medium text-white mb-4">95<span className="text-2xl text-emerald-400">%</span></div>
              <h3 className="text-lg font-medium text-white mb-2">Stakeholder Alignment</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                High-fidelity discovery accuracy verified through expert human-in-the-loop validation cycles.
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
    <section id="contact" className="scroll-mt-24 px-5 py-24 md:py-32">
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
            <a href={EMAIL} className="inline-flex items-center gap-2 transition-colors hover:text-white">
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
