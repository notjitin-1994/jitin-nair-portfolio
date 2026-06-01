"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
  useReducedMotion,
} from "framer-motion";

// Smooth expo-out curve. Same vocabulary as the landing hero for cohesion.
export const EASE = [0.16, 1, 0.3, 1] as const;

// Gate display-font reveals until the serif has loaded, so it never swaps
// mid-animation (the cause of janky reveals).
export function useFontsReady() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    let active = true;
    const done = () => active && setReady(true);
    const fallback = setTimeout(done, 1200);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(done).catch(done);
    } else {
      done();
    }
    return () => {
      active = false;
      clearTimeout(fallback);
    };
  }, [reduced]);
  return ready;
}

// Fire-once scroll reveal: opacity + small translate, reduced-motion safe.
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Count-up that fires once when scrolled into view.
export function CountUp({
  to,
  format,
  className,
}: {
  to: number;
  format: (n: number) => string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) {
      setVal(to);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(to * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);

  return (
    <span ref={ref} className={className}>
      {format(val)}
    </span>
  );
}

// Magnetic CTA. Spring values stay off the React render path.
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.3 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-[transform,background-color,border-color] duration-200 ease-out active:scale-[0.97]";
  const styles =
    variant === "primary"
      ? "bg-emerald-400 text-[#062a1d] hover:bg-emerald-300"
      : "border border-white/15 text-white hover:border-emerald-400/50 hover:bg-white/[0.04]";

  const isInternal = href.startsWith("/") || href.startsWith("#");
  const inner = `${base} ${styles} ${className}`;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {isInternal ? (
        <Link href={href} className={inner}>
          {children}
        </Link>
      ) : (
        <a href={href} className={inner}>
          {children}
        </a>
      )}
    </motion.div>
  );
}
