"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowDown, Mail, Linkedin, Check, Phone, MessageCircle, Instagram, Users, ChevronRight, X, ExternalLink, ChevronDown } from "lucide-react";
import { EASE, useFontsReady, Reveal, CountUp, MagneticButton, useMounted } from "./primitives";
import { DownloadResumeButton } from "./DownloadResumeButton";
import { LdVortexBackground } from "./LdVortexBackground";
import { FloatingNav } from "../FloatingNav";
import {
  ldImpact,
  ldCaseStudies,
  ldPrinciples,
  ldAiLever,
  ldJourney,
  ldRecognition,
  type LdCaseStudy,
} from "../../data/ldPortfolio";
import { CaseStudyInfographic } from "./CaseStudyInfographics";
import { LdFooter } from "./LdFooter";
import { leadershipCases } from "../../data/leadership";
import { capabilityDomains, type CapabilityDomain } from "../../data/capabilities";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleaner classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

const NAV = [
  { label: "Work", href: "/work" },
  { label: "Approach", href: "#approach" },
  { label: "Capabilities", href: "/capabilities" },
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
    <FloatingNav
      brandHref="/"
      suffix="L&D"
      accent="emerald"
      links={NAV}
      cta={{ label: "Get in touch", href: "#contact" }}
    />
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const ready = useFontsReady();
  const [resumeExpanded, setResumeExpanded] = useState(false);
  
  const reduced = mounted ? reducedMotion : false;

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

  const M_HEAD_DELAY = 0.35;
  const M_BODY_DELAY = 1.1;
  const M_BUTTONS_DELAY = 1.5;

  const mobileContainer = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.2, delayChildren: reduced ? 0 : M_HEAD_DELAY } },
  };

  const mobileFade = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  const buttonsBlock = (isMobile: boolean) => (
    <motion.div
      {...(isMobile ? mobileFade(M_BUTTONS_DELAY) : {
        initial: reduced ? false : { opacity: 0, y: 16 },
        animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        transition: { duration: 0.7, delay: 0.68, ease: EASE }
      })}
      className={cn("mt-5 flex items-center gap-3", !isMobile && "mt-9")}
    >
      <AnimatePresence>
        {!resumeExpanded && (
          <motion.a
            key="learn-more"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            href="#impact"
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-3 text-xs font-semibold text-[#062a1d] transition-transform duration-150 active:scale-[0.97]"
          >
            Learn More
            <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} />
          </motion.a>
        )}
      </AnimatePresence>
      <div className={cn("transition-all duration-300", resumeExpanded ? "w-full" : "flex-1")}>
        <DownloadResumeButton mobile onExpandChange={setResumeExpanded} />
      </div>
    </motion.div>
  );

  return (
    <>
      {/* ══════════════════════════════════════════════
          MOBILE: full-bleed portrait + text at bottom
          Hidden at md+ breakpoint
      ══════════════════════════════════════════════ */}
      <section className="relative h-[100dvh] overflow-hidden bg-[#0a0a0f] md:hidden">
        {/* Aurora fallback */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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

        {/* Hero photo */}
        <div aria-hidden className="absolute inset-0 z-[1]">
          <Image
            src="/hero-photo.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "center 15%" }}
            priority
            sizes="100vw"
          />
        </div>

        {/* Top vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#0a0a0f]/80 to-transparent"
        />

        {/* Soft scrim behind glass panel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[55%] bg-gradient-to-t from-[#0a0a0f]/60 via-[#0a0a0f]/20 to-transparent"
        />

        {/* Glass panel — full viewport width, no rounded corners */}
        <div className="absolute inset-x-0 bottom-0 z-[3]">
          {/* Layer 1: frosted blur (separate from overflow-hidden — fixes WebKit backdrop-filter bug) */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "rgba(10,10,15,0.64)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />
          {/* Layer 2: emerald tint */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.07] via-transparent to-teal-500/[0.03]"
          />
          {/* Layer 3: top accent hairline */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-emerald-500/30"
          />
          {/* Layer 4: content — overflow-hidden works cleanly here */}
          <div className="relative overflow-hidden px-5 pt-6 pb-8">
            <motion.h1
              variants={mobileContainer}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="font-serif text-[1.8rem] font-medium leading-[1.18] tracking-tight text-white"
            >
              {HERO_LINES.map((l, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                  <motion.span variants={line} className="block transform-gpu will-change-transform">
                    {l}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...mobileFade(M_BODY_DELAY)}
              className="mt-3.5 text-sm leading-relaxed text-neutral-300"
            >
              A decade designing how people learn, and building the AI that scales it.
            </motion.p>

            {buttonsBlock(true)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DESKTOP: vortex + two-column layout
          Hidden below md breakpoint
      ══════════════════════════════════════════════ */}
      <section className="relative hidden min-h-[100dvh] items-center overflow-hidden px-5 pt-16 pb-8 md:flex">
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <LdVortexBackground />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Content */}
          <div className="order-2 md:order-1 pb-4 md:pb-0">
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

            {buttonsBlock(false)}
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
                style={{ rotateX, rotateY }}
                className="group relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#12121a] shadow-2xl"
              >
                <Image
                  src="/hero-photo.jpg"
                  alt="Jitin Nair"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center 15%" }}
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 via-transparent to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ---------- Impact strip ---------- */
function Impact() {
  const ready = useFontsReady();
  const reduced = useReducedMotion();
  return (
    <section id="impact" className="scroll-mt-20 px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {ldImpact.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 transition-colors hover:border-emerald-400/20">
                <CountUp
                  to={stat.to}
                  format={(n) => {
                    const p = stat.prefix ?? "";
                    const s = stat.suffix ?? "";
                    return `${p}${Math.round(n).toLocaleString()}${s}`;
                  }}
                  className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl"
                />
                <div className="mt-1 text-sm leading-snug text-neutral-500">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Case study (sticky infographic panel on desktop) ---------- */
function CaseStudy({ cs, index, flip }: { cs: LdCaseStudy; index: number; flip: boolean }) {
  return (
    <div className="grid gap-8 border-t border-white/[0.06] pt-12 lg:grid-cols-2 lg:gap-16">
      {/* Infographic panel */}
      <div className={`self-start lg:sticky lg:top-28 ${flip ? "lg:order-2" : ""}`}>
        <Reveal>
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">
            {String(index + 1).padStart(2, "0")} / {cs.org}
          </div>
          <div className="mt-2 text-sm text-neutral-500">{cs.context}</div>
          <div className="mt-8">
            <CaseStudyInfographic id={cs.id} />
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
    <section id="work" className="scroll-mt-24 px-5 py-6 md:py-8">
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

        <Reveal className="mt-12 flex">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/[0.06] px-7 py-3.5 text-sm font-semibold text-emerald-300 transition-[transform,background-color,border-color] duration-200 ease-out hover:border-emerald-400/70 hover:bg-emerald-400/[0.12] hover:text-emerald-200 active:scale-[0.97]"
          >
            Full Work Experience
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Approach ---------- */
function Approach() {
  const reduced = useReducedMotion();
  return (
    <section id="approach" className="scroll-mt-24 px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            My L&amp;D Leadership Philosophy.
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

        {/* Leadership case-study teaser, deep version lives on /case-studies */}
        <Reveal className="relative mt-20 overflow-hidden rounded-3xl border border-emerald-400/15 bg-[#0a0a0f] p-8 sm:p-12">
          {/* Aesthetic background with contextual image + drifting aurora */}
          <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 scale-105 opacity-30 blur-[2px]">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Drifting emerald aurora (always-on, reliable motion layer) */}
            <motion.div
              className="absolute left-[-15%] top-[-35%] h-[110%] w-[60%] rounded-full bg-emerald-500/25 blur-[90px]"
              animate={reduced ? undefined : { x: [0, 50, 0], y: [0, 36, 0], scale: [1, 1.1, 1] }}
              transition={reduced ? undefined : { duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[-15%] bottom-[-35%] h-[110%] w-[55%] rounded-full bg-teal-500/20 blur-[100px]"
              animate={reduced ? undefined : { x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
              transition={reduced ? undefined : { duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/85 via-[#0a0a0f]/55 to-emerald-950/40" />
          </div>

          <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h3 className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">
                The Showcase: methodology, orchestration, and results.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-neutral-300">
                A detailed deep-dive into the tools and systems built for every phase of the L&amp;D lifecycle—from automated discovery to scalable content production.
              </p>
              <Link
                href="/showcase"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#062a1d] transition-[transform,background-color] duration-200 ease-out hover:bg-emerald-300 active:scale-[0.97]"
              >
                Explore the Showcase
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {leadershipCases.map((cs, i) => {
                const Icon = cs.icon;
                return (
                  <Reveal key={cs.id} delay={i * 0.06}>
                    <div className="group/card relative h-full overflow-hidden rounded-2xl border border-white/[0.12] bg-zinc-900/60 p-5 backdrop-blur-md transition-colors duration-200 hover:border-emerald-400/40">
                      {/* Contextual background stock image */}
                      <Image
                        src={cs.bgImage}
                        alt=""
                        fill
                        className="absolute inset-0 z-0 object-cover opacity-[0.12] transition-opacity duration-300 group-hover/card:opacity-[0.18]"
                      />
                      <div className="relative z-10">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/[0.1] text-emerald-400 border border-emerald-400/20">
                          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                        </span>
                        <div className="mt-4 font-medium text-white">{cs.competency}</div>
                        <div className="mt-1 text-sm leading-snug text-neutral-400">{cs.context}</div>
                      </div>
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
    <section className="px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="relative overflow-hidden rounded-3xl border border-emerald-400/15 bg-zinc-950 p-8 sm:p-12 lg:p-16">
          {/* Background Video — High-reliability source with robust attributes */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              style={{ filter: "brightness(0.8) contrast(1.2)" }}
            >
              <source
                src="https://cdn.pixabay.com/video/2023/10/20/185791-876251213_large.mp4"
                type="video/mp4"
              />
            </video>
            {/* Scrim for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0a0a0f]/80 to-emerald-950/40" />
          </div>

          <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {ldAiLever.heading}
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-neutral-300">{ldAiLever.body}</p>
              <Link
                href={ldAiLever.link.href}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
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

/* ---------- Capability tile infographic ---------- */
const capPicsum = (seed: string) => `https://picsum.photos/seed/${seed}/700/500`;

function TileViz({ c }: { c: CapabilityDomain }) {
  const reduced = useReducedMotion();
  const viz = c.viz;
  const inView = { once: true, margin: "-40px" } as const;
  const headline = (
    <span className="font-serif text-[2rem] font-medium leading-none tracking-tight text-white">{c.proofValue}</span>
  );

  // 1. Semicircle speed gauge
  if (viz.kind === "gauge") {
    const len = 148;
    // Needle pivots from the hub (55,56); animate the tip coordinates so the base
    // always sits exactly on the hub dot (avoids SVG transform-origin pitfalls).
    const hubX = 55;
    const hubY = 56;
    const needleLen = 34;
    const phi = Math.PI * (1 - viz.fill); // 0% -> pointing left, 100% -> pointing right
    const tipX = hubX + needleLen * Math.cos(phi);
    const tipY = hubY - needleLen * Math.sin(phi);
    return (
      <div>
        <div className="mx-auto w-full max-w-[150px]">
          <svg viewBox="0 0 110 64" className="w-full">
            <path d="M8 56 A47 47 0 0 1 102 56" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" strokeLinecap="round" />
            <motion.path
              d="M8 56 A47 47 0 0 1 102 56"
              fill="none"
              stroke="url(#capGauge)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={len}
              initial={reduced ? false : { strokeDashoffset: len }}
              whileInView={{ strokeDashoffset: len * (1 - viz.fill) }}
              viewport={inView}
              transition={{ duration: 1.2, ease: EASE }}
            />
            <motion.line
              x1={hubX}
              y1={hubY}
              x2={tipX}
              y2={tipY}
              stroke="#e5e7eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={reduced ? false : { x2: hubX - needleLen, y2: hubY }}
              whileInView={{ x2: tipX, y2: tipY }}
              viewport={inView}
              transition={{ duration: 1.2, ease: EASE }}
            />
            <circle cx={hubX} cy={hubY} r="4" fill="#34d399" />
            <defs>
              <linearGradient id="capGauge" x1="0" x2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          {headline}
          <span className="text-xs text-neutral-400">{viz.label}</span>
        </div>
      </div>
    );
  }

  // 2. Donut ring
  if (viz.kind === "donut") {
    const r = 26;
    const circ = 2 * Math.PI * r;
    return (
      <div className="flex items-center gap-4">
        <div className="relative h-[68px] w-[68px] flex-shrink-0">
          <svg viewBox="0 0 68 68" className="h-full w-full -rotate-90">
            <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
            <motion.circle
              cx="34" cy="34" r={r}
              fill="none" stroke="url(#capDonut)" strokeWidth="7" strokeLinecap="round"
              strokeDasharray={circ}
              initial={reduced ? false : { strokeDashoffset: circ }}
              whileInView={{ strokeDashoffset: circ * (1 - viz.value / 100) }}
              viewport={inView}
              transition={{ duration: 1.2, ease: EASE }}
            />
            <defs>
              <linearGradient id="capDonut" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.35" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-serif text-lg font-medium text-white">{c.proofValue}</span>
          </div>
        </div>
        <span className="text-sm leading-snug text-neutral-400">{viz.label}</span>
      </div>
    );
  }

  // 3. Horizontal bar
  if (viz.kind === "bar") {
    return (
      <div>
        <div className="flex items-baseline gap-2">
          {headline}
          <span className="text-xs text-neutral-400">{viz.label}</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
            initial={reduced ? false : { transform: "scaleX(0)" }}
            whileInView={{ transform: `scaleX(${viz.value / 100})` }}
            viewport={inView}
            transition={{ duration: 1, ease: EASE }}
          />
        </div>
      </div>
    );
  }

  // 4. Vertical column chart
  if (viz.kind === "columns") {
    const max = Math.max(...viz.segments.map((s) => s.v));
    return (
      <div>
        <div className="flex items-baseline gap-2">
          {headline}
          <span className="text-xs text-neutral-400">removed</span>
        </div>
        <div className="mt-3 flex items-end gap-3" style={{ height: 58 }}>
          {viz.segments.map((s, i) => (
            <div key={s.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <motion.div
                className="w-full origin-bottom rounded-t-md bg-gradient-to-t from-emerald-500/40 to-emerald-400"
                style={{ height: `${(s.v / max) * 100}%` }}
                initial={reduced ? false : { transform: "scaleY(0)" }}
                whileInView={{ transform: "scaleY(1)" }}
                viewport={inView}
                transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              />
              <span className="text-[10px] text-neutral-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. Checklist
  if (viz.kind === "checks") {
    return (
      <div>
        {headline}
        <div className="mt-3 space-y-1.5">
          {viz.items.map((it, i) => (
            <motion.div
              key={it}
              className="flex items-center gap-2 text-xs text-neutral-300"
              initial={reduced ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.4, delay: i * 0.1, ease: EASE }}
            >
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                <Check className="h-2.5 w-2.5 text-emerald-400" strokeWidth={3} />
              </span>
              {it}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // 6. Area sparkline with count-up
  const linePath = "M2,38 L13,30 L24,33 L35,20 L46,24 L57,12 L68,16 L79,6";
  const areaPath = `${linePath} L79,44 L2,44 Z`;
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <CountUp
          to={viz.to}
          format={(n) => Math.round(n).toLocaleString()}
          className="font-serif text-[2rem] font-medium leading-none tracking-tight text-white"
        />
        <span className="text-xs text-neutral-400">{viz.label}</span>
      </div>
      <svg viewBox="0 0 81 46" preserveAspectRatio="none" className="mt-3 h-12 w-full">
        <motion.path
          d={areaPath}
          fill="url(#capSpark)"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={inView}
          transition={{ duration: 1.1, ease: EASE }}
        />
        <defs>
          <linearGradient id="capSpark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function CapabilityTile({ c }: { c: CapabilityDomain }) {
  const Icon = c.icon;
  return (
    <div className="group relative flex h-full min-h-[268px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] transition-colors duration-200 hover:border-emerald-400/30">
      {/* Blurred contextual background */}
      <Image
        src={capPicsum(c.bgSeed)}
        alt=""
        aria-hidden
        fill
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-[0.18] blur-[3px] transition-opacity duration-300 group-hover:opacity-[0.26]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/92 via-[#0a0a0f]/82 to-emerald-950/40" />
      <div className="relative z-10 flex h-full flex-col p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-emerald-400">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-white">{c.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300/90">{c.statement}</p>
        <div className="mt-auto pt-7">
          <TileViz c={c} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Capabilities ---------- */
function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <Label>What I bring</Label>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Range across learning and the systems that scale it.
          </h2>
          <p className="mt-3 leading-relaxed text-neutral-400">
            Six capability domains, each one backed by a result rather than a buzzword.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilityDomains.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.05}>
              <CapabilityTile c={c} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex">
          <Link
            href="/capabilities"
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/[0.06] px-7 py-3.5 text-sm font-semibold text-emerald-300 transition-[transform,background-color,border-color] duration-200 ease-out hover:border-emerald-400/70 hover:bg-emerald-400/[0.12] hover:text-emerald-200 active:scale-[0.97]"
          >
            See the full capability map
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </Reveal>
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
    <section className="px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">The path here.</h2>
            <p className="mt-3 leading-relaxed text-neutral-400">Ten years of growing scope: from training teams to architecting the systems that train them.</p>
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
      </div>
    </section>
  );
}

/* ---------- Recognition ---------- */
function Recognition() {
  return (
    <section className="px-5 py-6 md:py-8">
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
const CONTACT_OPTIONS = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:not.jitin@gmail.com",
    color: "from-emerald-500/20 to-emerald-400/10",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: Phone,
    label: "Call",
    href: "tel:+919008898642",
    color: "from-teal-500/20 to-teal-400/10",
    borderColor: "border-teal-500/30",
    iconColor: "text-teal-400",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/919008898642",
    color: "from-emerald-500/15 to-teal-500/15",
    borderColor: "border-emerald-500/25",
    iconColor: "text-emerald-400",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: LINKEDIN,
    description: "Connect professionally",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/not_jitin",
    description: "@not_jitin",
  },
];

function Contact() {
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left - headline + availability */}
          <div className="text-left">
            <Reveal>
              <Label>Get in touch</Label>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
                Let&apos;s build your capability engine.
              </h2>
              <p className="mt-6 max-w-xl leading-relaxed text-neutral-400">
                Open to L&amp;D leadership roles, AI-in-learning strategy, and advisory. If you are scaling a learning
                function or removing its bottlenecks, let&apos;s talk.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 inline-block rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors hover:border-emerald-500/30">
                <div className="mb-3 flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-medium text-emerald-400">Available for new opportunities</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Full-time", "Contract", "Advisory"].map((t) => (
                    <span key={t} className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right - social + connect cards, one per line */}
          <div className="grid grid-cols-1 gap-4">
            {/* Static social links */}
            {SOCIAL_LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.06]"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                      <Icon className="h-6 w-6 text-emerald-400" strokeWidth={1.75} />
                    </div>
                    <ExternalLink className="h-5 w-5 text-neutral-600 transition-colors group-hover:text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-emerald-400">
                    {link.label}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{link.description}</p>
                </motion.a>
              );
            })}

            {/* Expandable connect card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                connectOpen
                  ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-emerald-500/30 hover:bg-white/[0.06]"
              }`}
            >
              <AnimatePresence mode="wait">
                {!connectOpen ? (
                  <motion.button
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setConnectOpen(true)}
                    className="group w-full p-6 text-left"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                        <Users className="h-6 w-6 text-emerald-400" strokeWidth={1.75} />
                        <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-[#0a0a0f] bg-emerald-400" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-neutral-600 transition-all group-hover:translate-x-1 group-hover:text-emerald-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-emerald-400">Connect</h3>
                    <p className="mt-1 text-sm text-neutral-500">Click to see options</p>
                  </motion.button>
                ) : (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/20 shadow-lg shadow-emerald-500/10">
                          <Users className="h-5 w-5 text-emerald-400" strokeWidth={1.75} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Choose how to connect</p>
                          <p className="text-xs text-neutral-500">Direct contact options</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setConnectOpen(false)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
                      >
                        <X className="h-4 w-4 text-neutral-400" strokeWidth={1.75} />
                      </button>
                    </div>

                    <div className="mb-5 grid grid-cols-3 gap-3">
                      {CONTACT_OPTIONS.map((opt, i) => {
                        const Icon = opt.icon;
                        return (
                          <motion.a
                            key={opt.label}
                            href={opt.href}
                            target={opt.label === "WhatsApp" ? "_blank" : undefined}
                            rel={opt.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className={`flex flex-col items-center gap-2 rounded-xl border bg-gradient-to-br p-4 transition-all duration-200 ${opt.color} ${opt.borderColor}`}
                          >
                            <Icon className={`h-6 w-6 ${opt.iconColor}`} strokeWidth={1.75} />
                            <span className="text-xs font-medium text-neutral-200">{opt.label}</span>
                          </motion.a>
                        );
                      })}
                    </div>

                    <div className="space-y-2 border-t border-white/[0.08] pt-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Mail className="h-4 w-4 text-emerald-400" strokeWidth={1.75} />
                        <span>not.jitin@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Phone className="h-4 w-4 text-teal-400" strokeWidth={1.75} />
                        <span>+91 90088 98642</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
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
