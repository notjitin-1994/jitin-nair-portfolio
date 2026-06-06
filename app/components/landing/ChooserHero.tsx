"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Cpu, GraduationCap, Download } from "lucide-react";
import { DownloadResumeButton } from "../ld/DownloadResumeButton";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleaner classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE: ReactNode[] = [
  <>
    Ten years designing how humans <span className="text-emerald-400">learn</span>.
  </>,
  <>
    Now architecting the <span className="text-cyan-400">AI</span> that empowers them.
  </>,
];

const PROOF = [
  { to: 200, format: (n: number) => `${Math.round(n)}+`, label: "AI agents in production" },
  { to: 5, format: (n: number) => `${Math.round(n)}K+`, label: "learners trained" },
  { to: 140, format: (n: number) => `$${Math.round(n)}K+`, label: "training costs saved" },
];

const TRACKS = [
  {
    href: "/AI-Systems-Architecture-Portfolio",
    icon: Cpu,
    title: "AI Systems Architecture",
    what: "Multi-agent orchestration in production. 200+ agents on LangGraph, MCP, and RAG.",
    accent: "text-cyan-400",
    ring: "hover:border-cyan-400/40",
    glow: "hover:shadow-[0_0_36px_-10px_rgba(34,211,238,0.55)]",
  },
  {
    href: "/LD-Systems-Portfolio",
    icon: GraduationCap,
    title: "Learning & Development Systems",
    what: "Adult learning design, proven at scale. 90%+ completion, 70% faster delivery.",
    accent: "text-emerald-400",
    ring: "hover:border-emerald-400/40",
    glow: "hover:shadow-[0_0_36px_-10px_rgba(52,211,153,0.55)]",
  },
];

/* ---------- Background: brand-neutral dual-tone aurora ---------- */
function AuroraBackground() {
  const reduced = useReducedMotion();
  const orb = "pointer-events-none absolute rounded-full blur-[120px]";
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className={`${orb} left-[-12%] top-[-15%] h-[60vh] w-[60vh] bg-emerald-500/20`}
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 28, 0], scale: [1, 1.08, 1] }}
        transition={reduced ? undefined : { duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${orb} bottom-[-15%] right-[-12%] h-[55vh] w-[55vh] bg-cyan-500/20`}
        animate={reduced ? undefined : { x: [0, -36, 0], y: [0, -26, 0], scale: [1, 1.1, 1] }}
        transition={reduced ? undefined : { duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[#0a0a0f]/35" />
    </div>
  );
}

/* ---------- Count-up stat ---------- */
function StatTile({
  to,
  format,
  label,
  run,
}: {
  to: number;
  format: (n: number) => string;
  label: string;
  run: boolean;
}) {
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced || !run) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(to * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, run, to]);

  return (
    <div>
      <div className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">
        {format(val)}
      </div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

/* ---------- Magnetic track card (desktop) ---------- */
function MagneticCard({
  track,
  delay,
  ready,
}: {
  track: (typeof TRACKS)[number];
  delay: number;
  ready: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });
  const Icon = track.icon;

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.15);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={reduced ? { opacity: 1, y: 0 } : ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
        <Link
          href={track.href}
          className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-[transform,border-color,box-shadow] duration-200 ease-out active:scale-[0.98] ${track.ring} ${track.glow}`}
        >
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[320%]" />
          </span>
          <span className={`relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.05] ${track.accent}`}>
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="relative min-w-0">
            <span className="block text-[15px] font-semibold text-white">{track.title}</span>
            <span className="block text-[13px] leading-snug text-neutral-400">{track.what}</span>
          </span>
          <ArrowRight
            className={`relative ml-auto h-5 w-5 flex-shrink-0 ${track.accent} transition-transform duration-200 ease-out group-hover:translate-x-1`}
            strokeWidth={2}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Mobile track card: flat rows inside the glass panel ---------- */
function MobileTrackCard({
  track,
  delay,
  ready,
}: {
  track: (typeof TRACKS)[number];
  delay: number;
  ready: boolean;
}) {
  const reduced = useReducedMotion();
  const Icon = track.icon;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={reduced || ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      <Link
        href={track.href}
        className={`group flex w-full overflow-hidden items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] px-3.5 py-3 transition-[border-color,transform] duration-150 active:scale-[0.97] ${track.ring}`}
      >
        <span
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.08] ${track.accent}`}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <span className="min-w-0 flex-1 overflow-hidden">
          <span className="block text-[13px] font-semibold leading-snug text-white">
            {track.title}
          </span>
          <span className="block line-clamp-1 text-[11px] text-neutral-400">
            {track.what}
          </span>
        </span>
        <ArrowRight
          className={`flex-shrink-0 ${track.accent} h-4 w-4`}
          strokeWidth={2}
        />
      </Link>
    </motion.div>
  );
}

/* ---------- Portrait: clip-path reveal, settle, sheen, pointer tilt ---------- */
function Portrait({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateY = useSpring(mvX, { stiffness: 120, damping: 14 });
  const rotateX = useSpring(mvY, { stiffness: 120, damping: 14 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mvX.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    mvY.set((0.5 - (e.clientY - r.top) / r.height) * 10);
  };
  const reset = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex h-[360px] w-full items-stretch justify-center sm:h-[440px] md:h-full md:justify-start"
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="relative h-full w-full"
        style={{ perspective: 900 }}
      >
        <div className="absolute inset-0 scale-110 rounded-[28px] bg-gradient-to-tr from-emerald-500/25 to-cyan-500/25 blur-3xl" />
        <motion.div
          initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0% round 28px)", scale: 1.12 }}
          animate={
            reduced || ready
              ? { clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1 }
              : { clipPath: "inset(100% 0% 0% 0% round 28px)", scale: 1.12 }
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
              sizes="(max-width: 768px) 360px, 440px"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/55 via-transparent to-transparent" />
            {!reduced && (
              <motion.div
                aria-hidden
                initial={{ x: "-160%" }}
                animate={ready ? { x: "160%" } : { x: "-160%" }}
                transition={{ duration: 1.2, delay: 0.45, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
export function ChooserHero() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [countRun, setCountRun] = useState(false);
  const [resumeExpanded, setResumeExpanded] = useState(false);

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    if (typeof document !== "undefined" && document.readyState === "complete") {
      setReady(true);
      return;
    }
    let active = true;
    const done = () => { if (active) setReady(true); };
    const fallback = setTimeout(done, 800);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(done).catch(done);
    } else {
      done();
    }
    return () => { active = false; clearTimeout(fallback); };
  }, [reduced]);

  // Desktop timing
  const HEADING_DELAY = 1.0;
  const REST_DELAY = 2.0;

  // Mobile timing — image is immediately visible, start sooner
  const M_HEAD_DELAY = 0.35;
  const M_BODY_DELAY = 1.1;
  const M_LINKS_DELAY = 1.5;

  useEffect(() => {
    if (!ready || reduced) return;
    const t = setTimeout(() => setCountRun(true), REST_DELAY * 1000 + 150);
    return () => clearTimeout(t);
  }, [ready, reduced, REST_DELAY]);

  // Desktop stagger container
  const desktopContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.18,
        delayChildren: reduced ? 0 : HEADING_DELAY,
      },
    },
  };

  // Mobile stagger container
  const mobileContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.2,
        delayChildren: reduced ? 0 : M_HEAD_DELAY,
      },
    },
  };

  const lineVariant = reduced
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : {
        hidden: { y: "112%" },
        show: { y: 0, transition: { duration: 1.05, ease: EASE } },
      };

  const fade = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
          transition: { duration: 0.8, delay, ease: EASE },
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
      {...(isMobile ? mobileFade(M_BODY_DELAY + 0.2) : fade(REST_DELAY + 0.1))}
      className={cn("mt-6 flex items-center gap-3", !isMobile && "mt-8")}
    >
      <AnimatePresence>
        {!resumeExpanded && (
          <motion.a
            key="learn-more"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            href="#impact"
            className="flex-1 max-w-[200px] flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-4 py-3 text-xs font-semibold text-[#062a1d] transition-transform duration-150 active:scale-[0.97]"
          >
            Learn More
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </motion.a>
        )}
      </AnimatePresence>
      <div className={cn("transition-all duration-300", resumeExpanded ? "w-full" : "flex-1 max-w-[240px]")}>
        <DownloadResumeButton mobile onExpandChange={setResumeExpanded} />
      </div>
    </motion.div>
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          MOBILE: full-bleed portrait + text pinned to bottom
          Hidden at md+ breakpoint
      ═══════════════════════════════════════════════════ */}
      <section className="relative h-[100dvh] overflow-hidden bg-[#0a0a0f] md:hidden">
        <h1 className="sr-only">
          Jitin Nair · Learning &amp; Development Designer and AI Systems Architect
        </h1>

        {/* Full-bleed background portrait */}
        <Image
          src="/hero-photo.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center 12%" }}
          priority
          fetchPriority="high"
          sizes="100vw"
        />

        {/* Top vignette — keeps nav readable */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0a0a0f]/80 to-transparent"
        />

        {/* Soft scrim behind the glass panel */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0a0a0f]/60 via-[#0a0a0f]/20 to-transparent"
        />

        {/* ── Glass content panel — full viewport width, no rounded corners ── */}
        {/*
          Architecture: backdrop-filter lives on its own absolute child so
          the parent's overflow-hidden isn't sabotaged by WebKit's
          backdrop-filter stacking context. This ensures all button text
          is hard-clipped at the correct boundary.
        */}
        <div className="absolute inset-x-0 bottom-0">
          {/* Layer 1: frosted blur + dark base (no overflow-hidden here) */}
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.07] via-transparent to-cyan-500/[0.03]"
          />
          {/* Layer 3: top accent hairline */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-emerald-500/30"
          />

          {/* Layer 4: content — overflow-hidden here works cleanly */}
          <div className="relative overflow-hidden px-5 pt-6 pb-8">
            {/* ① Heading — first to reveal */}
            <motion.h2
              variants={mobileContainer}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="font-serif text-[1.8rem] font-medium leading-[1.18] tracking-tight text-white"
            >
              {HEADLINE.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    variants={lineVariant}
                    className="block transform-gpu will-change-transform"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            {/* ② Body — after headings complete */}
            <motion.p
              {...mobileFade(M_BODY_DELAY)}
              className="mt-3.5 text-sm leading-relaxed text-neutral-300"
            >
              Learning &amp; Development Designer{" "}
              <span className="text-neutral-500">·</span> AI Systems Architect
            </motion.p>

            {buttonsBlock(true)}

            {/* ③ Links — last to appear */}
            <div className="mt-4 grid gap-2.5">
              {TRACKS.map((track, i) => (
                <MobileTrackCard
                  key={track.href}
                  track={track}
                  delay={M_LINKS_DELAY + i * 0.14}
                  ready={ready}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DESKTOP: two-column portrait + content
          Hidden below md breakpoint
      ═══════════════════════════════════════════════════ */}
      <main className="relative hidden min-h-[100dvh] items-center overflow-hidden bg-[#0a0a0f] px-5 text-[#f8fafc] selection:bg-cyan-500/30 md:flex">
        <h1 className="sr-only">
          Jitin Nair · Learning &amp; Development Designer and AI Systems Architect
        </h1>

        <AuroraBackground />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 py-12 md:grid-cols-2 md:items-stretch md:gap-14">
          {/* Left - portrait */}
          <Portrait ready={ready} />

          {/* Right - content */}
          <div className="max-w-2xl">
            <motion.h2
              variants={desktopContainer}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="font-serif text-[2rem] font-medium leading-[1.18] tracking-tight text-white sm:text-[2.6rem] lg:text-[3rem]"
            >
              {HEADLINE.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <motion.span variants={lineVariant} className="block transform-gpu will-change-transform">
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p {...fade(REST_DELAY)} className="mt-6 text-base text-neutral-400 sm:text-lg">
              Learning &amp; Development Designer <span className="text-neutral-600">and</span> AI Systems Architect
            </motion.p>

            <motion.div
              {...fade(REST_DELAY + 0.12)}
              className="mt-8 grid max-w-md grid-cols-3 gap-5 border-t border-white/10 pt-6"
            >
              {PROOF.map((stat) => (
                <StatTile key={stat.label} {...stat} run={countRun} />
              ))}
            </motion.div>

            {buttonsBlock(false)}

            <div className="mt-9 grid gap-3.5">
              {TRACKS.map((track, i) => (
                <MagneticCard key={track.href} track={track} delay={REST_DELAY + 0.24 + i * 0.1} ready={ready} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
