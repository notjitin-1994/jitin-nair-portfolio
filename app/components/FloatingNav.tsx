"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export type NavItem = { label: string; href: string };
type Accent = "emerald" | "cyan";

const ACCENT: Record<
  Accent,
  { border: string; glow: string; suffix: string; cta: string; toggle: string; panel: string; ring: string; avatarGlow: string }
> = {
  emerald: {
    border: "border-emerald-400/25",
    glow: "shadow-[0_0_28px_-8px_rgba(52,211,153,0.5)]",
    suffix: "text-emerald-400/70",
    cta: "bg-emerald-400 text-[#062a1d] hover:bg-emerald-300",
    toggle: "border-emerald-400/30 text-emerald-300 hover:bg-emerald-400/10",
    panel: "border-emerald-400/20",
    ring: "ring-emerald-400/60",
    avatarGlow: "shadow-[0_0_14px_rgba(52,211,153,0.55)]",
  },
  cyan: {
    border: "border-cyan-400/25",
    glow: "shadow-[0_0_28px_-8px_rgba(34,211,238,0.5)]",
    suffix: "text-cyan-400/70",
    cta: "bg-cyan-400 text-[#061828] hover:bg-cyan-300",
    toggle: "border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10",
    panel: "border-cyan-400/20",
    ring: "ring-cyan-400/60",
    avatarGlow: "shadow-[0_0_14px_rgba(34,211,238,0.55)]",
  },
};

const EASE = [0.16, 1, 0.3, 1] as const;

function NavAnchor({ item, className, onClick }: { item: NavItem; className: string; onClick?: () => void }) {
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
  const a = ACCENT[accent];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5">
      <div className="mx-auto max-w-6xl">
        <nav
          className={`relative z-10 mt-4 flex h-14 items-center justify-between rounded-full border ${a.border} bg-[#0a0a0f]/70 pl-5 pr-3 ${a.glow} backdrop-blur-xl`}
        >
          <Link href={brandHref} className="flex items-center gap-2.5 text-white">
            <span className={`relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full ring-2 ${a.ring} ${a.avatarGlow}`}>
              <Image
                src="/hero-photo.jpg"
                alt="Jitin Nair"
                fill
                sizes="32px"
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
              />
            </span>
            <span className="font-serif text-base font-medium tracking-tight">{brand}</span>
            {suffix && <span className={`hidden text-sm sm:inline ${a.suffix}`}>· {suffix}</span>}
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {links.map((n) => (
              <NavAnchor key={n.href} item={n} className="text-sm text-neutral-400 transition-colors hover:text-white" />
            ))}
          </div>

          {/* Desktop CTA */}
          {cta && (
            <NavAnchor
              item={cta}
              className={`hidden items-center rounded-full px-4 py-2 text-sm font-semibold transition-[transform,background-color] duration-200 ease-out active:scale-[0.97] md:inline-flex ${a.cta}`}
            />
          )}

          {/* Mobile toggle (replaces the CTA on mobile) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors md:hidden ${a.toggle}`}
          >
            {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </nav>

        {/* Mobile expansion panel */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                aria-hidden
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-0 md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: EASE }}
                className={`relative z-10 mt-2 overflow-hidden rounded-3xl border bg-[#0a0a0f]/90 p-2 backdrop-blur-xl md:hidden ${a.panel} ${a.glow}`}
              >
                {links.map((n) => (
                  <NavAnchor
                    key={n.href}
                    item={n}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base text-neutral-300 transition-colors hover:bg-white/[0.05] hover:text-white active:scale-[0.99]"
                  />
                ))}
                {cta && (
                  <NavAnchor
                    item={cta}
                    onClick={() => setOpen(false)}
                    className={`mt-1 block rounded-2xl px-4 py-3 text-center text-base font-semibold active:scale-[0.98] ${a.cta}`}
                  />
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
