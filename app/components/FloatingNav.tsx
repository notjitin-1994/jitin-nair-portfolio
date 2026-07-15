"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

export type NavItem = { label: string; href: string };
type Accent = "emerald" | "cyan" | "indigo";

/* Custom ease-out — stronger than CSS default, from easing.dev */
const EASE = [0.23, 1, 0.32, 1] as const;

const ACCENT: Record<
  Accent,
  {
    border: string;
    glow: string;
    suffix: string;
    cta: string;
    ctaMobile: string;
    toggle: string;
    panel: string;
    ring: string;
    avatarGlow: string;
    activePill: string;
  }
> = {
  emerald: {
    border: "border-emerald-400/20",
    glow: "shadow-[0_4px_32px_-8px_rgba(52,211,153,0.4)]",
    suffix: "text-emerald-400/55",
    cta: "bg-emerald-400 text-[#062a1d] hover:bg-emerald-300",
    ctaMobile: "bg-emerald-400 text-[#062a1d]",
    toggle: "border-emerald-400/25 text-emerald-300 hover:bg-emerald-400/[0.08]",
    panel: "border-emerald-400/15",
    ring: "ring-emerald-400/50",
    avatarGlow: "shadow-[0_0_14px_rgba(52,211,153,0.55)]",
    activePill: "bg-emerald-400/10 text-emerald-300",
  },
  cyan: {
    border: "border-cyan-400/20",
    glow: "shadow-[0_4px_32px_-8px_rgba(34,211,238,0.4)]",
    suffix: "text-cyan-400/55",
    cta: "bg-cyan-400 text-[#061828] hover:bg-cyan-300",
    ctaMobile: "bg-cyan-400 text-[#061828]",
    toggle: "border-cyan-400/25 text-cyan-300 hover:bg-cyan-400/[0.08]",
    panel: "border-cyan-400/15",
    ring: "ring-cyan-400/50",
    avatarGlow: "shadow-[0_0_14px_rgba(34,211,238,0.55)]",
    activePill: "bg-cyan-400/10 text-cyan-300",
  },
  indigo: {
    border: "border-indigo-400/20",
    glow: "shadow-[0_4px_32px_-8px_rgba(99,102,241,0.4)]",
    suffix: "text-indigo-400/55",
    cta: "bg-indigo-400 text-[#12121a] hover:bg-indigo-300",
    ctaMobile: "bg-indigo-400 text-[#12121a]",
    toggle: "border-indigo-400/25 text-indigo-300 hover:bg-indigo-400/[0.08]",
    panel: "border-indigo-400/15",
    ring: "ring-indigo-400/50",
    avatarGlow: "shadow-[0_0_14px_rgba(99,102,241,0.55)]",
    activePill: "bg-indigo-400/10 text-indigo-300",
  },
};

function isActivePath(href: string, pathname: string): boolean {
  if (!href.startsWith("/")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavAnchor({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className: string;
  onClick?: () => void;
}) {
  if (item.href.startsWith("/")) {
    return (
      <Link href={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

export function FloatingNav({
  brand = "Jitin Nair",
  brandHref = "/",
  suffix,
  links,
  accent,
  cta,
}: {
  brand?: string;
  brandHref?: string;
  suffix?: string;
  links: NavItem[];
  accent: Accent;
  cta?: NavItem;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const a = ACCENT[accent];

  /* Scroll detection — materialise nav background after 24px */
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* ── Pill nav ──────────────────────────────────────────────── */}
        <nav
          className={[
            "relative z-10 mt-3 flex h-[52px] items-center justify-between rounded-full pl-4 pr-2.5",
            "border backdrop-blur-2xl",
            "transition-[background-color,border-color,box-shadow] duration-300 ease-out",
            scrolled
              ? `${a.border} bg-black/20 ${a.glow}`
              : "border-white/[0.07] bg-white/[0.02]",
          ].join(" ")}
        >
          {/* Brand */}
          <Link
            href={brandHref}
            className="flex shrink-0 items-center gap-2.5 text-white transition-opacity duration-150 hover:opacity-75"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            <span
              className={[
                "relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-full ring-[1.5px]",
                "transition-[box-shadow] duration-300 ease-out",
                a.ring,
                scrolled ? a.avatarGlow : "",
              ].join(" ")}
            >
              <Image
                src="/hero-photo.jpg"
                alt="Jitin Nair"
                fill
                sizes="28px"
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
              />
            </span>
            <span className="font-serif text-[15px] font-medium leading-none tracking-tight">
              {brand}
            </span>
            {suffix && (
              <span className={`hidden text-[13px] sm:inline ${a.suffix}`}>
                · {suffix}
              </span>
            )}
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((n) => {
              const active = isActivePath(n.href, pathname);
              return (
                <div key={n.href} style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                  <NavAnchor
                    item={n}
                    className={[
                      "rounded-full px-3.5 py-1.5 text-[13px] font-medium leading-none block",
                      "transition-[color,background-color] duration-150 ease-out",
                      active
                        ? a.activePill
                        : "text-neutral-200 hover:bg-white/[0.05] hover:text-white",
                    ].join(" ")}
                  />
                </div>
              );
            })}
          </div>

          {/* Desktop CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            {cta && (
              <NavAnchor
                item={cta}
                className={[
                  "hidden items-center rounded-full px-4 py-2 text-[13px] font-semibold md:inline-flex",
                  "transition-[transform,background-color] duration-150 ease-out active:scale-[0.97]",
                  a.cta,
                ].join(" ")}
              />
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={[
                "flex h-9 w-9 items-center justify-center rounded-full border md:hidden",
                "transition-[background-color,transform] duration-150 ease-out active:scale-[0.92]",
                a.toggle,
              ].join(" ")}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={reduced ? {} : { opacity: 0, rotate: -45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={reduced ? {} : { opacity: 0, rotate: 45, scale: 0.7 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="flex items-center justify-center"
                  >
                    <X className="h-4 w-4" strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={reduced ? {} : { opacity: 0, rotate: 45, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={reduced ? {} : { opacity: 0, rotate: -45, scale: 0.7 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                    className="flex items-center justify-center"
                  >
                    <Menu className="h-4 w-4" strokeWidth={2.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* ── Mobile panel ──────────────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop — dismiss on tap */}
              <motion.div
                aria-hidden
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-0 md:hidden"
              />

              {/* Panel */}
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: EASE }}
                className={[
                  "relative z-10 mt-2 overflow-hidden rounded-[20px] md:hidden",
                  "border bg-[#0a0a0f]/92 py-1.5 backdrop-blur-xl",
                  a.panel,
                  a.glow,
                ].join(" ")}
              >
                {/* Nav links */}
                <div className="px-1.5">
                  {links.map((n) => {
                    const active = isActivePath(n.href, pathname);
                    return (
                      <NavAnchor
                        key={n.href}
                        item={n}
                        onClick={() => setOpen(false)}
                        className={[
                          "flex min-h-[44px] items-center rounded-xl px-3.5 text-[15px] font-medium",
                          "transition-[background-color,color,transform] duration-100 ease-out",
                          "active:scale-[0.97] active:bg-white/[0.07]",
                          active
                            ? a.activePill
                            : "text-neutral-300 hover:bg-white/[0.04] hover:text-white",
                        ].join(" ")}
                      />
                    );
                  })}
                </div>

                {/* Divider before CTA */}
                {cta && links.length > 0 && (
                  <div className="mx-3.5 my-1.5 h-px bg-white/[0.07]" />
                )}

                {/* CTA */}
                {cta && (
                  <div className="px-1.5 pb-0.5">
                    <NavAnchor
                      item={cta}
                      onClick={() => setOpen(false)}
                      className={[
                        "flex min-h-[44px] w-full items-center justify-center rounded-xl px-4",
                        "text-[15px] font-semibold",
                        "transition-[transform,opacity] duration-150 ease-out active:scale-[0.97] active:opacity-85",
                        a.ctaMobile,
                      ].join(" ")}
                    />
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
