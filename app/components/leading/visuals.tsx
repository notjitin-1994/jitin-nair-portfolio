"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { EASE } from "../ld/primitives";
import { Check, Minus, ArrowUpRight } from "lucide-react";
import type { KirkRung } from "../../data/leadership";

const picsum = (seed: string, w: number, h: number) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ---------- Grain overlay (data-uri SVG noise, CSP-safe) ---------- */
export function Grain() {
  const noise =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.55'/></svg>`
    );
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
      style={{ backgroundImage: `url("${noise}")`, backgroundSize: "120px 120px" }}
    />
  );
}

/* ---------- Scene media: treated stock image with Ken Burns + emerald duotone.
   Drop a licensed muted clip at /public/leading/{video}.mp4 and pass `video`
   to upgrade the still to motion. The image stays as the poster fallback. ---------- */
export function SceneMedia({
  seed,
  alt,
  video,
  className = "",
  rounded = "rounded-3xl",
}: {
  seed: string;
  alt: string;
  video?: string;
  className?: string;
  rounded?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${rounded} ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.12 }}
        animate={reduced || inView ? { scale: 1 } : { scale: 1.12 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <motion.div
          className="h-full w-full"
          animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
          transition={reduced ? undefined : { duration: 26, repeat: Infinity, ease: "easeInOut" }}
        >
          {video ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={picsum(seed, 1200, 1500)}
            >
              <source src={video} type="video/mp4" />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={picsum(seed, 1200, 1500)} alt={alt} className="h-full w-full object-cover" loading="lazy" />
          )}
        </motion.div>
      </motion.div>
      {/* Emerald duotone + legibility scrim */}
      <div className="absolute inset-0 bg-emerald-500/15 mix-blend-color" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/35 to-[#0a0a0f]/10" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" style={{ borderRadius: "inherit" }} />
      <Grain />
    </div>
  );
}

/* ---------- Reveal-once wrapper that returns whether it is in view (for charts) ---------- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return { ref, inView };
}

/* ---------- Radial progress (donut) ---------- */
export function RadialStat({
  value,
  display,
  label,
  size = 168,
}: {
  value: number; // 0-100
  display: string;
  label: string;
  size?: number;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useReveal();
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const target = c * (1 - value / 100);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="url(#radialGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={reduced ? false : { strokeDashoffset: c }}
            animate={reduced || inView ? { strokeDashoffset: target } : { strokeDashoffset: c }}
            transition={{ duration: 1.3, ease: EASE }}
          />
          <defs>
            <linearGradient id="radialGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-serif text-3xl font-medium text-white">{display}</span>
        </div>
      </div>
      <span className="mt-4 max-w-[12rem] text-left text-sm leading-snug text-neutral-400">{label}</span>
    </div>
  );
}

/* ---------- Before/after bar (visualizes a real reduction) ---------- */
export function BeforeAfterBar({
  beforeLabel,
  afterLabel,
  afterPct,
  caption,
}: {
  beforeLabel: string;
  afterLabel: string;
  afterPct: number; // remaining share, e.g. 40 for a 60% cut
  caption: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="text-neutral-500">{beforeLabel}</span>
          <span className="text-neutral-500">100%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-white/[0.06]">
          <div className="h-full w-full rounded-full bg-white/15" />
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="text-emerald-300">{afterLabel}</span>
          <span className="font-serif text-lg font-medium text-white">{afterPct}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
            initial={reduced ? false : { transform: "scaleX(0)" }}
            whileInView={{ transform: `scaleX(${afterPct / 100})` }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: EASE }}
          />
        </div>
      </div>
      <p className="text-sm leading-relaxed text-neutral-500">{caption}</p>
    </div>
  );
}

/* ---------- Stacked savings bar ($80K + $60K = $140K) ---------- */
export function SavingsStack({
  segments,
  total,
}: {
  segments: { label: string; value: number; display: string }[];
  total: string;
}) {
  const reduced = useReducedMotion();
  const sum = segments.reduce((a, s) => a + s.value, 0);
  return (
    <div>
      <div className="flex items-end justify-between">
        <span className="text-sm text-neutral-400">Training cost removed</span>
        <span className="font-serif text-4xl font-medium tracking-tight text-white">{total}</span>
      </div>
      <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-white/[0.06]">
        {segments.map((s, i) => (
          <motion.div
            key={s.label}
            className={`h-full ${i === 0 ? "bg-emerald-400" : "bg-teal-400/80"}`}
            initial={reduced ? false : { width: 0 }}
            whileInView={{ width: `${(s.value / sum) * 100}%` }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: EASE }}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {segments.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2 text-sm">
            <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-emerald-400" : "bg-teal-400/80"}`} />
            <span className="text-neutral-300">{s.display}</span>
            <span className="text-neutral-500">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Kirkpatrick ladder ---------- */
export function KirkpatrickLadder({ rungs }: { rungs: KirkRung[] }) {
  const reduced = useReducedMotion();
  return (
    <div className="flex flex-col gap-3">
      {rungs.map((r, i) => {
        const proven = r.state === "proven";
        const next = r.state === "next";
        return (
          <motion.div
            key={r.level}
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            className={`flex items-start gap-4 rounded-2xl border p-5 ${
              proven
                ? "border-emerald-400/30 bg-emerald-400/[0.06]"
                : next
                ? "border-dashed border-emerald-400/40 bg-transparent"
                : "border-white/[0.06] bg-white/[0.01]"
            }`}
          >
            <span
              className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                proven ? "bg-emerald-400 text-[#062a1d]" : next ? "border border-emerald-400/50 text-emerald-300" : "bg-white/[0.05] text-neutral-500"
              }`}
            >
              {proven ? <Check className="h-4 w-4" strokeWidth={2.5} /> : next ? <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} /> : <Minus className="h-4 w-4" strokeWidth={2.5} />}
            </span>
            <div>
              <div className="flex items-baseline gap-2">
                <span className={`text-xs font-medium uppercase tracking-[0.16em] ${proven ? "text-emerald-400/80" : "text-neutral-500"}`}>
                  {r.level}
                </span>
                <span className={`font-serif text-lg font-medium ${proven || next ? "text-white" : "text-neutral-400"}`}>{r.name}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-neutral-400">{r.note}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- Comparison table ---------- */
export function ComparisonTable({
  classroomLabel,
  mineLabel,
  rows,
}: {
  classroomLabel: string;
  mineLabel: string;
  rows: { dim: string; classroom: string; mine: string }[];
}) {
  const reduced = useReducedMotion();
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
      <div className="grid grid-cols-[1.1fr_1fr_1.2fr] bg-white/[0.02] text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
        <div className="p-4" />
        <div className="p-4">{classroomLabel}</div>
        <div className="border-l border-emerald-400/20 bg-emerald-400/[0.05] p-4 text-emerald-300">{mineLabel}</div>
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={r.dim}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
          className="grid grid-cols-[1.1fr_1fr_1.2fr] border-t border-white/[0.06] text-sm"
        >
          <div className="p-4 font-medium text-neutral-200">{r.dim}</div>
          <div className="p-4 text-neutral-500">{r.classroom}</div>
          <div className="border-l border-emerald-400/20 bg-emerald-400/[0.04] p-4 text-neutral-200">{r.mine}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- 90-day rollout timeline ---------- */
export function RolloutTimeline({
  phases,
}: {
  phases: { window: string; title: string; body: string }[];
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useReveal();
  return (
    <div ref={ref} className="relative">
      {/* connecting line (desktop) */}
      <div className="absolute left-0 right-0 top-[18px] hidden h-px bg-white/[0.08] md:block" />
      <motion.div
        aria-hidden
        className="absolute left-0 top-[18px] hidden h-px origin-left bg-gradient-to-r from-emerald-400 to-teal-400 md:block"
        style={{ right: "8%" }}
        initial={reduced ? false : { scaleX: 0 }}
        animate={reduced || inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {phases.map((p, i) => (
          <motion.div
            key={p.window}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            className="relative"
          >
            <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-400 bg-[#0a0a0f] font-serif text-sm font-medium text-emerald-300">
              {i + 1}
            </span>
            <div className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-emerald-400/70">{p.window}</div>
            <h4 className="mt-2 font-serif text-xl font-medium tracking-tight text-white">{p.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Role transformation (offloaded vs reclaimed) ---------- */
export function RoleTransform({
  offloaded,
  reclaimed,
}: {
  offloaded: string[];
  reclaimed: string[];
}) {
  const col = (heading: string, sub: string, items: string[], lit: boolean) => (
    <div className={`rounded-2xl border p-6 ${lit ? "border-emerald-400/25 bg-emerald-400/[0.05]" : "border-white/[0.08] bg-white/[0.02]"}`}>
      <div className={`text-xs font-medium uppercase tracking-[0.16em] ${lit ? "text-emerald-400/80" : "text-neutral-500"}`}>{heading}</div>
      <div className={`mt-1 font-serif text-lg font-medium ${lit ? "text-white" : "text-neutral-300"}`}>{sub}</div>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((it) => (
          <span
            key={it}
            className={`rounded-full border px-3 py-1.5 text-xs ${
              lit ? "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-200" : "border-white/[0.08] bg-white/[0.03] text-neutral-400"
            }`}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
      {col("Offloaded to automation", "The grind", offloaded, false)}
      <div className="hidden items-center justify-center sm:flex">
        <ArrowUpRight className="h-6 w-6 rotate-45 text-emerald-400" strokeWidth={2} />
      </div>
      {col("Reclaimed for craft", "The judgment", reclaimed, true)}
    </div>
  );
}

/* ---------- Small section label ---------- */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80">{children}</span>;
}
