"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Linkedin, Plus } from "lucide-react";
import { EASE, useFontsReady, Reveal, CountUp, MagneticButton } from "../ld/primitives";
import { LdFooter } from "../ld/LdFooter";
import { SceneMedia, Eyebrow } from "../leading/visuals";
import { FloatingNav } from "../FloatingNav";
import {
  capHero,
  dualFluency,
  capabilityDomains,
  skillMatrix,
  type CapabilityDomain,
} from "../../data/capabilities";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";
const fmt = (n: number, prefix = "", suffix = "") => `${prefix}${Math.round(n).toLocaleString()}${suffix}`;

/* ---------- Nav ---------- */
function Nav() {
  return (
    <FloatingNav
      brandHref="/LD-Systems-Portfolio"
      suffix="Capabilities"
      accent="emerald"
      links={[
        { label: "L&D Portfolio", href: "/LD-Systems-Portfolio" },
        { label: "Showcase", href: "/showcase" },
        { label: "Contact", href: "#contact" },
      ]}
      cta={{ label: "Get in touch", href: EMAIL }}
    />
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const reduced = useReducedMotion();
  const ready = useFontsReady();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.16, delayChildren: reduced ? 0 : 0.1 } },
  };
  const line: Variants = reduced
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : { hidden: { y: "112%" }, show: { y: 0, transition: { duration: 1.0, ease: EASE } } };

  return (
    <section className="relative overflow-hidden px-5 pt-24 pb-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-5%] top-[-15%] h-[55vh] w-[55vh] rounded-full bg-emerald-500/12 blur-[140px]" />
        <div className="absolute right-[-5%] bottom-[-20%] h-[45vh] w-[45vh] rounded-full bg-teal-500/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link
            href="/LD-Systems-Portfolio"
            className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
            Back to L&amp;D portfolio
          </Link>
        </motion.div>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <motion.h1
              variants={container}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="font-serif text-[2.3rem] font-medium leading-[1.1] tracking-tight text-white sm:text-[3rem] lg:text-[3.3rem]"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={line} className="block transform-gpu will-change-transform">
                  Learning craft,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={line} className="block transform-gpu will-change-transform">
                  <span className="text-emerald-400">engineered</span> to scale.
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="mt-6 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg"
            >
              Six capability domains across learning science and AI, each one backed by a result, not a buzzword.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <MagneticButton href="#domains" variant="primary">
                Explore the domains
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </MagneticButton>
              <MagneticButton href="/showcase" variant="ghost">
                Explore the Showcase
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="order-first lg:order-last"
          >
            {/* Drop a licensed clip at /public/leading/capabilities.mp4 to upgrade this to muted video. */}
            <SceneMedia seed="learning-design-studio-craft-3140" alt="" className="aspect-[4/3] w-full lg:aspect-[4/5]" />
          </motion.div>
        </div>

        {/* Stat strip */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.08] pt-10 md:grid-cols-4">
          {capHero.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            >
              <CountUp
                to={s.to}
                format={(n) => fmt(n, "", s.suffix)}
                className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl"
              />
              <div className="mt-1.5 text-sm leading-snug text-neutral-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Dual fluency ---------- */
function Pillar({ title, icon: Icon, items }: { title: string; icon: any; items: string[] }) {
  return (
    <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-emerald-400">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="font-serif text-lg font-medium tracking-tight text-white">{title}</h3>
      </div>
      <ul className="mt-5 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="text-sm leading-relaxed text-neutral-400">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DualFluency() {
  const reduced = useReducedMotion();
  return (
    <section className="px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <Eyebrow>The differentiator</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Two disciplines, one rare overlap.
          </h2>
          <p className="mt-3 leading-relaxed text-neutral-400">
            Most L&amp;D leaders have one of these. I operate fluently in both, which is what makes the bottlenecks
            disappear.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <Pillar title={dualFluency.left.title} icon={dualFluency.left.icon} items={dualFluency.left.items} />
          </Reveal>
          <div className="flex items-center justify-center py-2 md:py-0">
            <motion.span
              initial={reduced ? false : { scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
            </motion.span>
          </div>
          <Reveal delay={0.08}>
            <Pillar title={dualFluency.right.title} icon={dualFluency.right.icon} items={dualFluency.right.items} />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-4">
          <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/[0.09] to-transparent p-7 sm:p-8">
            <div className="font-serif text-xl font-medium tracking-tight text-emerald-300">{dualFluency.intersection.title}</div>
            <p className="mt-3 max-w-2xl leading-relaxed text-neutral-200">{dualFluency.intersection.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Capability domain card ---------- */
function CapabilityCard({ d, wide }: { d: CapabilityDomain; wide: boolean }) {
  const Icon = d.icon;
  return (
    <div
      className={`flex h-full flex-col rounded-3xl border p-7 transition-colors duration-200 ${
        d.featured
          ? "border-emerald-400/25 bg-emerald-500/[0.06] hover:border-emerald-400/40"
          : "border-white/[0.08] bg-white/[0.02] hover:border-emerald-400/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            d.featured ? "bg-emerald-400/15 text-emerald-300" : "bg-white/[0.05] text-emerald-400"
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="font-serif text-xl font-medium tracking-tight text-white sm:text-2xl">{d.title}</h3>
      </div>

      <p className={`mt-5 leading-relaxed text-neutral-300 ${wide ? "max-w-2xl text-lg" : ""}`}>{d.statement}</p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">{d.detail}</p>

      {/* proof metric */}
      <div className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-xs font-medium text-emerald-300">
        <span className="font-serif text-sm">{d.proofValue}</span>
        <span className="text-emerald-300/70">{d.proofLabel}</span>
      </div>

      <div className={`mt-6 grid gap-5 ${wide ? "sm:grid-cols-2" : ""}`}>
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400/70">Expert</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {d.expert.map((s) => (
              <span key={s} className="rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3 py-1.5 text-xs text-emerald-200">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">Advanced</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {d.advanced.map((s) => (
              <span key={s} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-400">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Domains() {
  return (
    <section id="domains" className="scroll-mt-24 px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <Eyebrow>What I bring</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Six domains, each proven by a result.
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {capabilityDomains.map((d, i) => {
            const wide = d.featured || i === capabilityDomains.length - 1;
            return (
              <Reveal key={d.id} delay={(i % 2) * 0.05} className={wide ? "md:col-span-2" : ""}>
                <CapabilityCard d={d} wide={wide} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skill matrix (animated table) ---------- */
function SkillChips({ items, tier }: { items: string[]; tier: "expert" | "advanced" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <span
          key={s}
          className={`rounded-full px-3 py-1.5 text-xs ${
            tier === "expert"
              ? "border border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-200"
              : "border border-white/[0.08] bg-white/[0.03] text-neutral-400"
          }`}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function SkillMatrix() {
  const reduced = useReducedMotion();
  return (
    <section className="px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">The full skill matrix.</h2>
          <p className="mt-3 leading-relaxed text-neutral-400">Every tool and method, sorted by the depth I bring to it.</p>
        </Reveal>

        {/* Desktop table header */}
        <div className="hidden grid-cols-[180px_1fr_1fr] gap-6 border-b border-white/[0.08] pb-4 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500 lg:grid">
          <div />
          <div className="text-emerald-400/80">Expert</div>
          <div>Advanced</div>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {skillMatrix.map((row, i) => (
            <motion.div
              key={row.category}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="grid gap-4 py-7 lg:grid-cols-[180px_1fr_1fr] lg:gap-6"
            >
              <div className="font-serif text-lg font-medium tracking-tight text-white">{row.category}</div>
              <div>
                <div className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-emerald-400/80 lg:hidden">Expert</div>
                <SkillChips items={row.expert} tier="expert" />
              </div>
              <div>
                <div className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500 lg:hidden">Advanced</div>
                <SkillChips items={row.advanced} tier="advanced" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl text-left">
        <Reveal>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Let&apos;s build your capability engine.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-neutral-400">
            Open to L&amp;D leadership roles, AI-in-learning strategy, and advisory. If you are scaling a learning
            function or clearing its bottlenecks, let&apos;s talk.
          </p>
          <div className="mt-10 flex">
            <MagneticButton href={EMAIL} variant="primary">
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
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

/* ---------- Page ---------- */
export function CapabilitiesPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#0a0a0f] text-[#f8fafc] selection:bg-emerald-500/30">
      <Nav />
      <Hero />
      <DualFluency />
      <Domains />
      <SkillMatrix />
      <Contact />
      <LdFooter />
    </main>
  );
}
