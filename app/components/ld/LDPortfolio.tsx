"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Linkedin } from "lucide-react";
import { EASE, useFontsReady, Reveal, CountUp, MagneticButton } from "./primitives";
import { LdVortexBackground } from "./LdVortexBackground";
import {
  ldImpact,
  ldCaseStudies,
  ldPrinciples,
  ldAiLever,
  ldCapabilities,
  ldJourney,
  ldRecognition,
  type LdCaseStudy,
} from "../../data/ldPortfolio";
import { leadershipCases } from "../../data/leadership";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Approach", href: "#approach" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

const HERO_LINES: ReactNode[] = [
  <>I turn learning into</>,
  <>
    measurable <span className="text-emerald-400">business performance</span>.
  </>,
];

/* ---------- Section label (eyebrow, used sparingly) ---------- */
function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80">
      {children}
    </span>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5">
      <nav className="mx-auto mt-4 flex h-14 max-w-6xl items-center justify-between rounded-full border border-emerald-400/25 bg-[#0a0a0f]/70 pl-5 pr-3 shadow-[0_0_28px_-8px_rgba(52,211,153,0.5)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-white">
          Jitin Nair
          <span className="hidden text-emerald-400/70 sm:inline">· L&amp;D</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {NAV.map((n) =>
            n.href.startsWith("/") ? (
              <Link key={n.href} href={n.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                {n.label}
              </Link>
            ) : (
              <a key={n.href} href={n.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                {n.label}
              </a>
            )
          )}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-[#062a1d] transition-[transform,background-color] duration-200 ease-out hover:bg-emerald-300 active:scale-[0.97]"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const reduced = useReducedMotion();
  const ready = useFontsReady();

  // Portrait pointer tilt + clip-path reveal (reuses the landing treatment).
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateY = useSpring(mvX, { stiffness: 120, damping: 14 });
  const rotateX = useSpring(mvY, { stiffness: 120, damping: 14 });
  const pRef = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (reduced || !pRef.current) return;
    const r = pRef.current.getBoundingClientRect();
    mvX.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    mvY.set((0.5 - (e.clientY - r.top) / r.height) * 8);
  };
  const reset = () => {
    mvX.set(0);
    mvY.set(0);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.16, delayChildren: reduced ? 0 : 0.1 } },
  };
  const line = reduced
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : { hidden: { y: "112%" }, show: { y: 0, transition: { duration: 1.0, ease: EASE } } };

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pt-28 pb-16">
      {/* Desktop: particle vortex in emerald */}
      <div aria-hidden className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <LdVortexBackground />
      </div>

      {/* Mobile: emerald aurora fallback */}
      <div aria-hidden className="md:hidden pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute left-[-10%] top-[-12%] h-[55vh] w-[55vh] rounded-full bg-emerald-500/20 blur-[120px]"
          animate={reduced ? undefined : { x: [0, 36, 0], y: [0, 26, 0], scale: [1, 1.08, 1] }}
          transition={reduced ? undefined : { duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10%] bottom-[-12%] h-[50vh] w-[50vh] rounded-full bg-teal-500/15 blur-[120px]"
          animate={reduced ? undefined : { x: [0, -30, 0], y: [0, -22, 0], scale: [1, 1.1, 1] }}
          transition={reduced ? undefined : { duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Content */}
        <div className="order-2 md:order-1">
          <motion.h1
            variants={container}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            className="font-serif text-[2.1rem] font-medium leading-[1.12] tracking-tight text-white sm:text-[2.8rem] lg:text-[3.2rem]"
          >
            {HERO_LINES.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={line} className="block transform-gpu will-change-transform">
                  {l}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            className="mt-6 max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg"
          >
            A decade designing how people learn, and building the AI that scales it.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#work" variant="primary">
              View the work
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in touch
            </MagneticButton>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="order-1 flex justify-center md:order-2 md:justify-end"
        >
          <div
            ref={pRef}
            onPointerMove={onMove}
            onPointerLeave={reset}
            className="relative aspect-[4/5] w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px]"
            style={{ perspective: 900 }}
          >
            <div className="absolute inset-0 scale-110 rounded-[28px] bg-gradient-to-tr from-emerald-500/25 to-teal-500/20 blur-3xl" />
            <motion.div
              initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0% round 28px)", scale: 1.1 }}
              animate={
                reduced || ready
                  ? { clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1 }
                  : { clipPath: "inset(100% 0% 0% 0% round 28px)", scale: 1.1 }
              }
              transition={{ duration: 1.15, ease: EASE }}
              className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 shadow-2xl will-change-transform"
            >
              <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative h-full w-full">
                <Image
                  src="/hero-photo.jpg"
                  alt="Jitin Nair"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                  sizes="(max-width: 768px) 360px, 420px"
                  priority
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/55 via-transparent to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Impact strip ---------- */
function Impact() {
  return (
    <section className="px-5 py-10">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 border-y border-white/[0.08] py-12 md:grid-cols-4">
        {ldImpact.map((s) => (
          <div key={s.label}>
            <CountUp
              to={s.to}
              format={(n) => `${s.prefix ?? ""}${Math.round(n)}${s.suffix ?? ""}`}
              className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl"
            />
            <div className="mt-2 text-sm text-neutral-500">{s.label}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* ---------- Case study (sticky metric panel on desktop) ---------- */
function CaseStudy({ cs, index, flip }: { cs: LdCaseStudy; index: number; flip: boolean }) {
  return (
    <div className="grid gap-8 border-t border-white/[0.06] pt-12 lg:grid-cols-2 lg:gap-16">
      {/* Metric panel */}
      <div className={`self-start lg:sticky lg:top-28 ${flip ? "lg:order-2" : ""}`}>
        <Reveal>
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            {String(index + 1).padStart(2, "0")} / {cs.org}
          </div>
          <div className="mt-2 text-sm text-neutral-500">{cs.context}</div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-7">
            {cs.outcomes.map((o) => (
              <div key={o.label} className="border-l-2 border-emerald-400/50 pl-4">
                <div className="font-serif text-3xl font-medium tracking-tight text-white">{o.value}</div>
                <div className="mt-1 text-sm leading-snug text-neutral-400">{o.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Narrative */}
      <div className={flip ? "lg:order-1" : ""}>
        <Reveal delay={0.05}>
          <h3 className="font-serif text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
            {cs.title}
          </h3>
          <div className="mt-8 space-y-7">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400/70">The challenge</div>
              <p className="mt-2 leading-relaxed text-neutral-300">{cs.challenge}</p>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400/70">The strategy</div>
              <p className="mt-2 leading-relaxed text-neutral-300">{cs.strategy}</p>
            </div>
            <p className="border-t border-white/[0.06] pt-6 text-sm leading-relaxed text-neutral-500">{cs.note}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 max-w-2xl">
          <Label>Selected work</Label>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Programs measured by what they made possible.
          </h2>
        </Reveal>
        <div className="space-y-20">
          {ldCaseStudies.map((cs, i) => (
            <CaseStudy key={cs.id} cs={cs} index={i} flip={i % 2 === 1} />
          ))}
        </div>

        <Reveal className="mt-16 flex justify-center border-t border-white/[0.06] pt-12">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/[0.06] px-7 py-3.5 text-sm font-semibold text-emerald-300 transition-[transform,background-color,border-color] duration-200 ease-out hover:border-emerald-400/70 hover:bg-emerald-400/[0.12] hover:text-emerald-200 active:scale-[0.97]"
          >
            Read the full experience
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Approach ---------- */
function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            How I lead L&amp;D.
          </h2>
          <p className="mt-3 leading-relaxed text-neutral-400">
            Four principles I run every program by, each proven across a leadership case study.
          </p>
        </Reveal>

        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
          {ldPrinciples.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.05} className="border-t border-white/[0.08] pt-6">
              <div className="font-serif text-lg text-emerald-400/70">{p.k}</div>
              <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-white sm:text-2xl">{p.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-neutral-400">{p.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Leadership case-study teaser, deep version lives on /leading-ld */}
        <Reveal className="mt-20 overflow-hidden rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.07] to-transparent p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h3 className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">
                Leadership, proven in the numbers.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-neutral-300">
                Four case studies across the competencies a leadership panel scores you on, each backed by a real
                program and a real result.
              </p>
              <Link
                href="/leading-ld"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#062a1d] transition-[transform,background-color] duration-200 ease-out hover:bg-emerald-300 active:scale-[0.97]"
              >
                Explore the case studies
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {leadershipCases.map((cs, i) => {
                const Icon = cs.icon;
                return (
                  <Reveal key={cs.id} delay={i * 0.06}>
                    <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-200 hover:border-emerald-400/30">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/[0.1] text-emerald-400">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>
                      <div className="mt-4 font-medium text-white">{cs.competency}</div>
                      <div className="mt-1 text-sm leading-snug text-neutral-500">{cs.context}</div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- AI lever ---------- */
function AiLever() {
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="relative overflow-hidden rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.07] to-transparent p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {ldAiLever.heading}
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-neutral-300">{ldAiLever.body}</p>
              <Link
                href={ldAiLever.link.href}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
              >
                {ldAiLever.link.label}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
              </Link>
            </div>
            <ul className="flex flex-col justify-center gap-5">
              {ldAiLever.points.map((pt, i) => (
                <Reveal key={pt} delay={i * 0.08}>
                  <li className="flex items-start gap-3 text-neutral-200">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Capabilities (bento) ---------- */
function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 max-w-2xl">
          <Label>What I bring</Label>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Range across learning and the systems that scale it.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 lg:auto-rows-[180px] lg:grid-cols-3">
          {ldCapabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal
                key={c.title}
                delay={i * 0.05}
                className={c.featured ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                <div
                  className={`group flex h-full flex-col rounded-2xl border p-6 transition-colors duration-200 ${
                    c.featured
                      ? "border-emerald-400/20 bg-emerald-500/[0.06] hover:border-emerald-400/40"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-emerald-400/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      c.featured ? "bg-emerald-400/15 text-emerald-300" : "bg-white/[0.05] text-emerald-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3
                    className={`mt-auto pt-6 font-serif font-medium tracking-tight text-white ${
                      c.featured ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className={`mt-2 leading-relaxed text-neutral-400 ${c.featured ? "max-w-sm text-base" : "text-sm"}`}>
                    {c.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Journey ---------- */
function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });

  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-16">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">The path here.</h2>
          <p className="mt-3 text-neutral-400">Ten years of growing scope: from training teams to architecting the systems that train them.</p>
        </Reveal>

        <div ref={ref} className="relative pl-10">
          {/* Track (centered under the dots at x=7.5px) */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.08]" />
          {!reduced && (
            <motion.div
              style={{ scaleY: fill }}
              className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-emerald-400 to-teal-500"
            />
          )}

          <div className="space-y-12">
            {ldJourney.map((j) => (
              <Reveal key={j.year} className="relative">
                <span className="absolute -left-10 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-emerald-400 bg-[#0a0a0f]" />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-serif text-xl font-medium text-white">{j.role}</span>
                  <span className="text-sm text-emerald-400/80">{j.org}</span>
                  <span className="ml-auto text-sm tabular-nums text-neutral-500">{j.year}</span>
                </div>
                <p className="mt-2 leading-relaxed text-neutral-400">{j.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Recognition ---------- */
function Recognition() {
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">Recognition &amp; range.</h2>
        </Reveal>
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {ldRecognition.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 0.05} className="flex gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-emerald-400">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-medium text-white">{r.title}</h3>
                  <p className="mt-1 leading-relaxed text-neutral-400">{r.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-14 text-sm text-neutral-600">
            References from L&amp;D and business stakeholders available on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-24 sm:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Let&apos;s build your capability engine.
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-neutral-400">
            Open to L&amp;D leadership roles, AI-in-learning strategy, and advisory. If you are scaling a learning
            function or removing its bottlenecks, let&apos;s talk.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href={EMAIL} variant="primary">
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </MagneticButton>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-neutral-500">
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
function LdFooter() {
  const LD_SECTIONS = [
    { label: "Work", href: "#work" },
    { label: "Approach", href: "#approach" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Contact", href: "#contact" },
  ];

  const PORTFOLIO_LINKS = [
    { label: "Home", href: "/" },
    { label: "AI Systems Portfolio", href: "/AI-Systems-Architecture-Portfolio" },
    { label: "Insights", href: "/insights" },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold text-white">Jitin Nair</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
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
                href="mailto:not.jitin@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* This page */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">This page</h3>
            <ul className="space-y-3">
              {LD_SECTIONS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">Portfolio</h3>
            <ul className="space-y-3">
              {PORTFOLIO_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Jitin Nair. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export function LDPortfolio() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#0a0a0f] text-[#f8fafc] selection:bg-emerald-500/30">
      <Nav />
      <Hero />
      <Impact />
      <Work />
      <Approach />
      <AiLever />
      <Capabilities />
      <Journey />
      <Recognition />
      <Contact />
      <LdFooter />
    </main>
  );
}
