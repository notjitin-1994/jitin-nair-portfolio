"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Cpu, GraduationCap } from "lucide-react";
import { useMounted } from "../ld/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Film grain: inline SVG noise, tiled. Static texture, zero JS cost. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const HEADLINE: ReactNode[] = [
  <>
    Ten years designing how humans{" "}
    <em className="italic text-emerald-400">learn</em>.
  </>,
  <>
    Now architecting the <span className="text-cyan-400">AI</span> that
    empowers them.
  </>,
];

const PROOF = [
  { to: 200, format: (n: number) => `${Math.round(n)}+`, label: "AI agents in production" },
  { to: 5, format: (n: number) => `${Math.round(n)}K+`, label: "learners trained" },
  { to: 140, format: (n: number) => `$${Math.round(n)}K+`, label: "training costs saved" },
];

const TRACKS = [
  {
    href: "/ai",
    icon: Cpu,
    title: "AI Systems Architecture",
    what: "Multi-agent orchestration in production. 200+ agents on LangGraph, MCP, and RAG.",
    accent: "text-cyan-400",
    bar: "bg-cyan-400",
    ring: "hover:border-cyan-400/30 focus-visible:border-cyan-400/40",
    arrowRing: "group-hover:border-cyan-400/40",
  },
  {
    href: "/ld",
    icon: GraduationCap,
    title: "Learning & Development Systems",
    what: "Adult learning design, proven at scale. 90%+ completion, 70% faster delivery.",
    accent: "text-emerald-400",
    bar: "bg-emerald-400",
    ring: "hover:border-emerald-400/30 focus-visible:border-emerald-400/40",
    arrowRing: "group-hover:border-emerald-400/40",
  },
];

/* ---------- Background: quiet dual-tone aurora + vignette ---------- */
function AuroraBackground() {
  const reduced = useReducedMotion();
  const orb = "pointer-events-none absolute rounded-full blur-[130px]";
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className={`${orb} left-[-14%] top-[-18%] h-[58vh] w-[58vh] bg-emerald-500/[0.14]`}
        animate={reduced ? undefined : { x: [0, 36, 0], y: [0, 24, 0], scale: [1, 1.06, 1] }}
        transition={reduced ? undefined : { duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${orb} bottom-[-18%] right-[-10%] h-[52vh] w-[52vh] bg-cyan-500/[0.13]`}
        animate={reduced ? undefined : { x: [0, -30, 0], y: [0, -22, 0], scale: [1, 1.08, 1] }}
        transition={reduced ? undefined : { duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Vignette pulls focus to the composition's center */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_40%,rgba(10,10,15,0.7)_100%)]" />
    </div>
  );
}

/* ---------- Grain overlay ---------- */
function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 opacity-[0.04]"
      style={{ backgroundImage: GRAIN }}
    />
  );
}

/* ---------- Count-up stat ---------- */
function StatTile({
  to,
  format,
  label,
  run,
  compact = false,
}: {
  to: number;
  format: (n: number) => string;
  label: string;
  run: boolean;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced || !run) {
      if (reduced) setVal(to);
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
      <div
        className={
          compact
            ? "font-serif text-xl font-medium tracking-tight text-white"
            : "font-serif text-3xl font-medium tracking-tight text-white lg:text-[2.1rem]"
        }
      >
        {format(val)}
      </div>
      <div className={compact ? "mt-0.5 text-[10px] leading-tight text-neutral-500" : "mt-1.5 text-xs text-neutral-500"}>
        {label}
      </div>
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
    x.set((e.clientX - (r.left + r.width / 2)) * 0.12);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.22);
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
          className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-5 outline-none transition-[transform,border-color,background-color] duration-200 ease-out hover:bg-white/[0.04] active:scale-[0.98] ${track.ring}`}
        >
          {/* Accent edge grows in on hover */}
          <span
            aria-hidden
            className={`absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 ${track.bar}`}
          />
          <Icon className={`h-6 w-6 flex-shrink-0 ${track.accent}`} strokeWidth={1.5} />
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold text-white">{track.title}</span>
            <span className="mt-0.5 block text-[13px] leading-snug text-neutral-400">{track.what}</span>
          </span>
          <span
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 transition-[border-color,transform] duration-200 ease-out group-hover:translate-x-1 ${track.arrowRing}`}
          >
            <ArrowRight className={`h-4 w-4 ${track.accent}`} strokeWidth={2} />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Mobile track card ---------- */
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
        className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 transition-[border-color,transform] duration-150 active:scale-[0.97] ${track.ring}`}
      >
        <span aria-hidden className={`absolute left-0 top-0 h-full w-[2px] ${track.bar} opacity-70`} />
        <Icon className={`h-5 w-5 flex-shrink-0 ${track.accent}`} strokeWidth={1.5} />
        <span className="min-w-0 flex-1 overflow-hidden">
          <span className="block text-[13px] font-semibold leading-snug text-white">
            {track.title}
          </span>
          <span className="block line-clamp-1 text-[11px] text-neutral-400">
            {track.what}
          </span>
        </span>
        <ArrowRight className={`h-4 w-4 flex-shrink-0 ${track.accent}`} strokeWidth={2} />
      </Link>
    </motion.div>
  );
}

/* ---------- Portrait: arch frame, hairline echo, slow settle, pointer tilt ---------- */
function Portrait({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateY = useSpring(mvX, { stiffness: 110, damping: 16 });
  const rotateX = useSpring(mvY, { stiffness: 110, damping: 16 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mvX.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    mvY.set((0.5 - (e.clientY - r.top) / r.height) * 7);
  };
  const reset = () => {
    mvX.set(0);
    mvY.set(0);
  };

  const arch = "rounded-t-full rounded-b-[28px]";

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px]" style={{ perspective: 1000 }}>
      {/* Ambient glow behind the arch */}
      <div
        aria-hidden
        className={`absolute -inset-8 ${arch} bg-gradient-to-tr from-emerald-500/[0.18] via-transparent to-cyan-500/[0.18] blur-3xl`}
      />
      {/* Hairline echo arch, offset for editorial depth */}
      <motion.div
        aria-hidden
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced || ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
        className={`absolute inset-0 -translate-x-4 translate-y-4 ${arch} border border-white/10`}
      />
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className={`relative aspect-[7/10] w-full overflow-hidden ${arch} border border-white/[0.12] shadow-2xl`}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="h-full w-full"
        >
          <motion.div
            initial={reduced ? false : { scale: 1.16, opacity: 0 }}
            animate={reduced || ready ? { scale: 1, opacity: 1 } : { scale: 1.16, opacity: 0 }}
            transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
            className="relative h-full w-full will-change-transform"
          >
            <Image
              src="/hero-photo.jpg"
              alt="Jitin Nair"
              fill
              className="object-cover"
              style={{ objectPosition: "center 18%" }}
              sizes="(max-width: 1024px) 360px, 420px"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />
            {!reduced && (
              <motion.div
                aria-hidden
                initial={{ x: "-160%" }}
                animate={ready ? { x: "160%" } : { x: "-160%" }}
                transition={{ duration: 1.2, delay: 0.85, ease: "easeInOut" }}
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-2/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Mobile portrait: full-bleed, dissolves into the page via mask.
   No card, no frame, no overlay. The subject stays fully visible. ---------- */
const PORTRAIT_MASK =
  "linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.6) 78%, transparent 99%)";

function CinematicPortrait({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div
      className="relative h-[48dvh] min-h-[300px] w-full overflow-hidden [@media(max-height:740px)]:h-[42dvh] [@media(max-height:740px)]:min-h-[240px]"
      style={{
        maskImage: PORTRAIT_MASK,
        WebkitMaskImage: PORTRAIT_MASK,
      }}
    >
      <motion.div
        initial={reduced ? false : { scale: 1.08, opacity: 0 }}
        animate={reduced || ready ? { scale: 1, opacity: 1 } : { scale: 1.08, opacity: 0 }}
        transition={{ duration: 1.6, ease: EASE }}
        className="relative h-full w-full will-change-transform"
      >
        <Image
          src="/hero-photo.jpg"
          alt="Jitin Nair"
          fill
          className="object-cover"
          style={{ objectPosition: "center 10%" }}
          priority
          fetchPriority="high"
          sizes="100vw"
        />
      </motion.div>
    </div>
  );
}

/* ---------- Hero ---------- */
export function ChooserHero() {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [countRun, setCountRun] = useState(false);

  const reduced = mounted ? reducedMotion : false;

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

  // Desktop choreography: confident and quick, not theatrical
  const HEADING_DELAY = 0.2;
  const REST_DELAY = 1.05;

  // Mobile choreography: portrait first, then type, then thumb-zone CTAs
  const M_HEAD_DELAY = 0.6;
  const M_BODY_DELAY = 1.0;
  const M_STATS_DELAY = 1.1;
  const M_LINKS_DELAY = 1.2;

  useEffect(() => {
    if (!ready) return;
    if (reduced) {
      setCountRun(true);
      return;
    }
    const t = setTimeout(() => setCountRun(true), (REST_DELAY + 0.3) * 1000);
    return () => clearTimeout(t);
  }, [ready, reduced]);

  const desktopContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.16,
        delayChildren: reduced ? 0 : HEADING_DELAY,
      },
    },
  };

  const mobileContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.14,
        delayChildren: reduced ? 0 : M_HEAD_DELAY,
      },
    },
  };

  const lineVariant = reduced
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : {
        hidden: { y: "112%" },
        show: { y: 0, transition: { duration: 1.0, ease: EASE } },
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

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          MOBILE: cinematic full-bleed portrait dissolving into the
          page, editorial type below, CTAs in the thumb zone.
          Hidden at md+ breakpoint
      ═══════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#0a0a0f] md:hidden">
        <h1 className="sr-only">
          Jitin Nair · Learning &amp; Development Designer and AI Systems Architect
        </h1>

        {/* Static ambient glows behind the content block: cheap, no loops */}
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute bottom-[20%] left-[-30%] h-[36vh] w-[36vh] rounded-full bg-emerald-500/[0.1] blur-[70px]" />
          <div className="absolute bottom-[-12%] right-[-28%] h-[36vh] w-[36vh] rounded-full bg-cyan-500/[0.11] blur-[70px]" />
        </div>

        <CinematicPortrait ready={ready} />

        <Grain />

        <div className="relative z-10 -mt-14 flex flex-1 flex-col px-5 pb-7">
          <motion.p
            {...mobileFade(0.5)}
            className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400"
          >
            Jitin Nair
          </motion.p>

          <motion.h2
            variants={mobileContainer}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            className="mt-2.5 max-w-[22rem] font-serif text-[1.7rem] font-medium leading-[1.16] tracking-tight text-white [@media(max-height:740px)]:text-[1.45rem]"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={lineVariant}
                  className="block transform-gpu will-change-transform"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.p
            {...mobileFade(M_BODY_DELAY)}
            className="mt-2.5 text-[12px] leading-relaxed text-neutral-400"
          >
            Learning &amp; Development Designer{" "}
            <span className="text-neutral-600">·</span> AI Systems Architect
          </motion.p>

          {/* Spacer pushes stats + CTAs into the thumb zone */}
          <div className="flex-1" />

          <motion.div
            {...mobileFade(M_STATS_DELAY)}
            className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-4"
          >
            {PROOF.map((stat) => (
              <StatTile key={stat.label} {...stat} run={countRun} compact />
            ))}
          </motion.div>

          <div className="mt-4 grid gap-2.5">
            {TRACKS.map((track, i) => (
              <MobileTrackCard
                key={track.href}
                track={track}
                delay={M_LINKS_DELAY + i * 0.08}
                ready={ready}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DESKTOP: editorial asymmetric split, type left, arch portrait right
          Hidden below md breakpoint
      ═══════════════════════════════════════════════════ */}
      <main className="relative hidden min-h-[100dvh] items-center overflow-hidden bg-[#0a0a0f] px-6 text-[#f8fafc] selection:bg-cyan-500/30 md:flex lg:px-10">
        <h1 className="sr-only">
          Jitin Nair · Learning &amp; Development Designer and AI Systems Architect
        </h1>

        <AuroraBackground />
        <Grain />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-x-10 gap-y-12 py-16 lg:gap-x-16">
          {/* Left: type column */}
          <div className="col-span-12 md:col-span-7">
            <motion.p
              {...fade(0.1)}
              className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-400"
            >
              Jitin Nair
            </motion.p>

            <motion.h2
              variants={desktopContainer}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="mt-6 font-serif text-[2.4rem] font-medium leading-[1.1] tracking-tight text-white md:text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem]"
            >
              {HEADLINE.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    variants={lineVariant}
                    className="block transform-gpu will-change-transform"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...fade(REST_DELAY)}
              className="mt-6 text-base text-neutral-400 lg:text-lg"
            >
              Learning &amp; Development Designer{" "}
              <span className="text-neutral-600">·</span> AI Systems Architect
            </motion.p>

            <motion.div
              {...fade(REST_DELAY + 0.12)}
              className="mt-9 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7"
            >
              {PROOF.map((stat) => (
                <StatTile key={stat.label} {...stat} run={countRun} />
              ))}
            </motion.div>

            <div className="mt-10 grid max-w-xl gap-3.5">
              {TRACKS.map((track, i) => (
                <MagneticCard
                  key={track.href}
                  track={track}
                  delay={REST_DELAY + 0.24 + i * 0.1}
                  ready={ready}
                />
              ))}
            </div>
          </div>

          {/* Right: arch portrait */}
          <div className="col-span-12 md:col-span-5">
            <Portrait ready={ready} />
          </div>
        </div>
      </main>
    </>
  );
}
