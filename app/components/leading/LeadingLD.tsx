"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Linkedin } from "lucide-react";
import { EASE, useFontsReady, Reveal, CountUp, MagneticButton } from "../ld/primitives";
import {
  SceneMedia,
  ComparisonTable,
  RolloutTimeline,
  BeforeAfterBar,
  RoleTransform,
  KirkpatrickLadder,
  SavingsStack,
  RadialStat,
  Eyebrow,
} from "./visuals";
import { FloatingNav } from "../FloatingNav";
import {
  leadingHero,
  leadingPrinciples,
  leadershipCases,
  complianceComparison,
  rolloutPlaybook,
  roleTransform,
  kirkpatrick,
  savingsBreakdown,
  type LeadershipCase,
} from "../../data/leadership";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";
const fmt = (n: number, prefix = "", suffix = "") => `${prefix}${Math.round(n).toLocaleString()}${suffix}`;

/* ---------- Nav ---------- */
function Nav() {
  return (
    <FloatingNav
      brandHref="/LD-Systems-Portfolio"
      suffix="Leading L&D"
      accent="emerald"
      links={[
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
            href="/showcase"
            className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
            Back to Showcase
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
                  L&amp;D leadership, measured in
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={line} className="block transform-gpu will-change-transform">
                  <span className="text-emerald-400">business outcomes</span>.
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="mt-6 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg"
            >
              Four competencies a leadership panel scores you on, each backed by a real program and a real number.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <MagneticButton href="#cases" variant="primary">
                See the case studies
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </MagneticButton>
              <MagneticButton href="/work" variant="ghost">
                The full experience
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="order-first lg:order-last"
          >
            {/* Drop a licensed clip at /public/leading/strategy.mp4 to upgrade this to muted video. */}
            <SceneMedia seed="executive-strategy-boardroom-5521" alt="" className="aspect-[4/3] w-full lg:aspect-[4/5]" />
          </motion.div>
        </div>

        {/* Stat strip */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.08] pt-10 md:grid-cols-4">
          {leadingHero.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
            >
              <CountUp
                to={s.to}
                format={(n) => fmt(n, s.prefix, s.suffix)}
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

/* ---------- Philosophy (the 4 principles, with proof) ---------- */
function Philosophy() {
  return (
    <section className="px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <Eyebrow>Leadership Philosophy</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Four principles, and the proof behind each.
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {leadingPrinciples.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.k} delay={i * 0.05}>
                <div className="flex h-full gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors duration-200 hover:border-emerald-400/25">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-400/[0.08] text-emerald-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-medium tracking-tight text-white">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-neutral-400">{p.body}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-xs font-medium text-emerald-300">
                      {p.proof}
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

/* ---------- Case header (shared) ---------- */
function CaseHeader({ cs, index }: { cs: LeadershipCase; index: number }) {
  const Icon = cs.icon;
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/[0.1] text-emerald-400">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <span className="text-sm font-medium text-emerald-300">{cs.competency}</span>
        <span className="text-sm tabular-nums text-neutral-600">0{index + 1} / 04</span>
      </div>
      <h3 className="mt-5 font-serif text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">{cs.title}</h3>
      <div className="mt-3 text-sm text-neutral-500">
        {cs.org} · {cs.context}
      </div>
    </div>
  );
}

function ProblemSolution({ cs }: { cs: LeadershipCase }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400/70">The business problem</div>
        <p className="mt-2 leading-relaxed text-neutral-300">{cs.problem}</p>
      </div>
      <div>
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400/70">The strategy</div>
        <p className="mt-2 leading-relaxed text-neutral-300">{cs.solution}</p>
      </div>
      <div>
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400/70">The leadership angle</div>
        <p className="mt-2 leading-relaxed text-neutral-300">{cs.leadership}</p>
      </div>
    </div>
  );
}

function OutcomeTiles({ cs }: { cs: LeadershipCase }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3">
      {cs.outcomes.map((o) => (
        <div key={o.label} className="bg-[#0a0a0f] p-5">
          <div className="font-serif text-3xl font-medium tracking-tight text-white">{o.value}</div>
          <div className="mt-1.5 text-sm leading-snug text-neutral-500">{o.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Case 1: Business alignment (media + comparison table) ---------- */
function CaseBusinessAlignment() {
  const cs = leadershipCases[0];
  return (
    <div className="border-t border-white/[0.08] pt-16">
      <Reveal>
        <CaseHeader cs={cs} index={0} />
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SceneMedia seed={cs.imageSeed} alt="" className="aspect-[4/5] w-full" />
        </Reveal>
        <div>
          <Reveal delay={0.05}>
            <ProblemSolution cs={cs} />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <ComparisonTable
              classroomLabel={complianceComparison.classroomLabel}
              mineLabel={complianceComparison.mineLabel}
              rows={complianceComparison.rows}
            />
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
            <OutcomeTiles cs={cs} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ---------- Case 2: Change management (full-width 90-day timeline) ---------- */
function CaseChangeManagement() {
  const cs = leadershipCases[1];
  return (
    <div className="border-t border-white/[0.08] pt-16">
      <Reveal>
        <CaseHeader cs={cs} index={1} />
      </Reveal>
      <Reveal delay={0.05} className="mt-8 max-w-3xl">
        <ProblemSolution cs={cs} />
      </Reveal>
      <Reveal delay={0.1} className="mt-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-10">
        <div className="mb-8 font-serif text-lg font-medium text-white">The 90-day rollout playbook</div>
        <RolloutTimeline phases={rolloutPlaybook} />
      </Reveal>
      <Reveal delay={0.12} className="mt-8">
        <OutcomeTiles cs={cs} />
      </Reveal>
    </div>
  );
}

/* ---------- Case 3: Team leadership (before/after + role transform) ---------- */
function CaseTeamLeadership() {
  const cs = leadershipCases[2];
  return (
    <div className="border-t border-white/[0.08] pt-16">
      <Reveal>
        <CaseHeader cs={cs} index={2} />
      </Reveal>
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <ProblemSolution cs={cs} />
        </Reveal>
        <Reveal delay={0.05} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
          <div className="mb-6 font-serif text-lg font-medium text-white">Production time, before and after</div>
          <BeforeAfterBar
            beforeLabel="Traditional cycles"
            afterLabel="Standardized + automated"
            afterPct={40}
            caption="60% less production time, with completion held at 90%+ as throughput rose."
          />
        </Reveal>
      </div>
      <Reveal delay={0.08} className="mt-10">
        <RoleTransform offloaded={roleTransform.offloaded} reclaimed={roleTransform.reclaimed} />
      </Reveal>
      <Reveal delay={0.1} className="mt-8">
        <OutcomeTiles cs={cs} />
      </Reveal>
    </div>
  );
}

/* ---------- Case 4: Impact measurement (dashboard) ---------- */
function CaseImpactMeasurement() {
  const cs = leadershipCases[3];
  return (
    <div className="border-t border-white/[0.08] pt-16">
      <Reveal>
        <CaseHeader cs={cs} index={3} />
      </Reveal>
      <Reveal delay={0.05} className="mt-8 max-w-3xl">
        <ProblemSolution cs={cs} />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9">
          <div className="mb-6 font-serif text-lg font-medium text-white">The Kirkpatrick ladder, told honestly</div>
          <KirkpatrickLadder rungs={kirkpatrick} />
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
            <SavingsStack
              segments={savingsBreakdown.map((s) => ({ label: s.label, value: s.value, display: s.display }))}
              total="$140K+"
            />
          </Reveal>
          <Reveal delay={0.05} className="flex items-center rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
            <RadialStat value={54} display="54%" label="knowledge retention held while learning time fell 70%" />
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-8">
        <OutcomeTiles cs={cs} />
      </Reveal>
    </div>
  );
}

function Cases() {
  return (
    <section id="cases" className="scroll-mt-24 px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl space-y-20">
        <CaseBusinessAlignment />
        <CaseChangeManagement />
        <CaseTeamLeadership />
        <CaseImpactMeasurement />
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
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

/* ---------- Footer ---------- */
function LeadingFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <span className="text-xl font-bold text-white">Jitin Nair</span>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              L&amp;D leader and AI systems architect. A decade turning learning into measurable performance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={EMAIL}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">Portfolio</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/LD-Systems-Portfolio" className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                  L&amp;D Portfolio
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/AI-Systems-Architecture-Portfolio" className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                  AI Systems Portfolio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">Get in touch</h3>
            <ul className="space-y-3">
              <li>
                <a href={EMAIL} className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                  not.jitin@gmail.com
                </a>
              </li>
              <li className="text-sm text-slate-500">Bangalore, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Jitin Nair. All rights reserved.</p>
          <p className="text-xs text-slate-600">Built with Next.js, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export function LeadingLD() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#0a0a0f] text-[#f8fafc] selection:bg-emerald-500/30">
      <Nav />
      <Hero />
      <Philosophy />
      <Cases />
      <Contact />
      <LeadingFooter />
    </main>
  );
}
