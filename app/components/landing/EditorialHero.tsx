"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { EASE, useFontsReady, useMounted } from "../ld/primitives";

/* Shared editorial hero for the /ai and /ld portfolios. Same visual
   vocabulary as the landing ChooserHero: aurora glows, film grain,
   serif mask-reveal headline, arch portrait on desktop, full-bleed
   mask-dissolve portrait on mobile (locked to the viewport height). */

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const PORTRAIT_MASK =
  "linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.6) 78%, transparent 99%)";

type Accent = "cyan" | "emerald";

const ACCENTS: Record<
  Accent,
  {
    orbDesktopA: string;
    orbDesktopB: string;
    orbMobileA: string;
    orbMobileB: string;
    portraitGlow: string;
    selection: string;
  }
> = {
  cyan: {
    orbDesktopA: "bg-cyan-500/[0.14]",
    orbDesktopB: "bg-teal-500/[0.12]",
    orbMobileA: "bg-cyan-500/[0.11]",
    orbMobileB: "bg-teal-500/[0.1]",
    portraitGlow: "from-cyan-500/[0.18] via-transparent to-teal-500/[0.14]",
    selection: "selection:bg-cyan-500/30",
  },
  emerald: {
    orbDesktopA: "bg-emerald-500/[0.14]",
    orbDesktopB: "bg-teal-500/[0.12]",
    orbMobileA: "bg-emerald-500/[0.1]",
    orbMobileB: "bg-teal-500/[0.1]",
    portraitGlow: "from-emerald-500/[0.18] via-transparent to-teal-500/[0.14]",
    selection: "selection:bg-emerald-500/30",
  },
};

export interface HeroStat {
  to: number;
  format: (n: number) => string;
  label: string;
}

interface EditorialHeroProps {
  accent: Accent;
  eyebrow: string;
  headline: ReactNode[];
  subline: ReactNode;
  stats?: HeroStat[];
  /* Render prop so callers can vary CTA layout between breakpoints
     and own any CTA-local state (e.g. the resume download flow). */
  ctas?: (mobile: boolean) => ReactNode;
  mobilePortraitPosition?: string;
  desktopPortraitPosition?: string;
}

/* ---------- Background: quiet accent-toned aurora + vignette ---------- */
function Aurora({ accent }: { accent: Accent }) {
  const reduced = useReducedMotion();
  const a = ACCENTS[accent];
  const orb = "pointer-events-none absolute rounded-full blur-[130px]";
  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className={`${orb} left-[-14%] top-[-18%] h-[58vh] w-[58vh] ${a.orbDesktopA}`}
        animate={reduced ? undefined : { x: [0, 36, 0], y: [0, 24, 0], scale: [1, 1.06, 1] }}
        transition={reduced ? undefined : { duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${orb} bottom-[-18%] right-[-10%] h-[52vh] w-[52vh] ${a.orbDesktopB}`}
        animate={reduced ? undefined : { x: [0, -30, 0], y: [0, -22, 0], scale: [1, 1.08, 1] }}
        transition={reduced ? undefined : { duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_40%,rgba(10,10,15,0.7)_100%)]" />
    </div>
  );
}

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
}: HeroStat & { run: boolean; compact?: boolean }) {
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

/* ---------- Desktop portrait: arch frame, hairline echo, settle, tilt ---------- */
function ArchPortrait({
  ready,
  accent,
  objectPosition,
}: {
  ready: boolean;
  accent: Accent;
  objectPosition: string;
}) {
  const reduced = useReducedMotion();
  const a = ACCENTS[accent];
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
      <div
        aria-hidden
        className={`absolute -inset-8 ${arch} bg-gradient-to-tr ${a.portraitGlow} blur-3xl`}
      />
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
              style={{ objectPosition }}
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

/* ---------- Mobile portrait: full-bleed, dissolves into the page ---------- */
function CinematicPortrait({
  ready,
  objectPosition,
}: {
  ready: boolean;
  objectPosition: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      className="relative h-[44dvh] w-full overflow-hidden [@media(max-height:700px)]:h-[40dvh]"
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
          style={{ objectPosition }}
          priority
          fetchPriority="high"
          sizes="100vw"
        />
      </motion.div>
    </div>
  );
}

/* ---------- Hero ---------- */
export function EditorialHero({
  accent,
  eyebrow,
  headline,
  subline,
  stats,
  ctas,
  mobilePortraitPosition = "center 10%",
  desktopPortraitPosition = "center 18%",
}: EditorialHeroProps) {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const ready = useFontsReady();
  const [countRun, setCountRun] = useState(false);

  const reduced = mounted ? reducedMotion : false;
  const a = ACCENTS[accent];

  // Desktop choreography: confident and quick, not theatrical
  const HEADING_DELAY = 0.2;
  const REST_DELAY = 1.05;

  // Mobile choreography: portrait first, then type, then thumb-zone CTAs
  const M_HEAD_DELAY = 0.6;
  const M_BODY_DELAY = 1.0;
  const M_STATS_DELAY = 1.1;
  const M_CTAS_DELAY = 1.2;

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
          Locked to the viewport height. Hidden at md+ breakpoint.
      ═══════════════════════════════════════════════════ */}
      <section className={`relative flex h-[100dvh] flex-col overflow-hidden bg-[#0a0a0f] ${a.selection} md:hidden`}>
        {/* Static ambient glows behind the content block: cheap, no loops */}
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute bottom-[20%] left-[-30%] h-[36vh] w-[36vh] rounded-full ${a.orbMobileA} blur-[70px]`} />
          <div className={`absolute bottom-[-12%] right-[-28%] h-[36vh] w-[36vh] rounded-full ${a.orbMobileB} blur-[70px]`} />
        </div>

        <CinematicPortrait ready={ready} objectPosition={mobilePortraitPosition} />

        <Grain />

        <div className="relative z-10 -mt-10 flex flex-1 flex-col px-5 pb-5 [@media(max-height:700px)]:pb-3">
          <motion.p
            {...mobileFade(0.5)}
            className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-400"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={mobileContainer}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            className="mt-2 max-w-[22rem] font-serif text-[1.6rem] font-medium leading-[1.16] tracking-tight text-white [@media(max-height:700px)]:text-[1.4rem]"
          >
            {headline.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={lineVariant}
                  className="block transform-gpu will-change-transform"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            {...mobileFade(M_BODY_DELAY)}
            className="mt-2.5 text-[12px] leading-relaxed text-neutral-400"
          >
            {subline}
          </motion.p>

          {/* Spacer pushes stats + CTAs into the thumb zone */}
          <div className="flex-1" />

          {stats && stats.length > 0 && (
            <motion.div
              {...mobileFade(M_STATS_DELAY)}
              className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-4"
            >
              {stats.map((stat) => (
                <StatTile key={stat.label} {...stat} run={countRun} compact />
              ))}
            </motion.div>
          )}

          {ctas && (
            <motion.div {...mobileFade(M_CTAS_DELAY)} className="mt-4">
              {ctas(true)}
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          DESKTOP: editorial asymmetric split, type left, arch
          portrait right. Hidden below md breakpoint.
      ═══════════════════════════════════════════════════ */}
      <section className={`relative hidden min-h-[100dvh] items-center overflow-hidden bg-[#0a0a0f] px-6 text-[#f8fafc] ${a.selection} md:flex lg:px-10`}>
        <Aurora accent={accent} />
        <Grain />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-x-10 gap-y-12 pb-16 pt-24 lg:gap-x-16">
          {/* Left: type column */}
          <div className="col-span-12 md:col-span-7">
            <motion.p
              {...fade(0.1)}
              className="text-[12px] font-medium uppercase tracking-[0.3em] text-neutral-400"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              variants={desktopContainer}
              initial="hidden"
              animate={ready ? "show" : "hidden"}
              className="mt-6 font-serif text-[2.4rem] font-medium leading-[1.1] tracking-tight text-white md:text-[2.6rem] lg:text-[3.4rem] xl:text-[4rem]"
            >
              {headline.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.1em]">
                  <motion.span
                    variants={lineVariant}
                    className="block transform-gpu will-change-transform"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...fade(REST_DELAY)}
              className="mt-6 max-w-2xl text-base text-neutral-400 lg:text-lg"
            >
              {subline}
            </motion.p>

            {stats && stats.length > 0 && (
              <motion.div
                {...fade(REST_DELAY + 0.12)}
                className="mt-9 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7"
              >
                {stats.map((stat) => (
                  <StatTile key={stat.label} {...stat} run={countRun} />
                ))}
              </motion.div>
            )}

            {ctas && (
              <motion.div {...fade(REST_DELAY + 0.24)} className="mt-10">
                {ctas(false)}
              </motion.div>
            )}
          </div>

          {/* Right: arch portrait */}
          <div className="col-span-12 md:col-span-5">
            <ArchPortrait ready={ready} accent={accent} objectPosition={desktopPortraitPosition} />
          </div>
        </div>
      </section>
    </>
  );
}
