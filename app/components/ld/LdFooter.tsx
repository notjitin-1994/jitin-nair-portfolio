"use client";

import Link from "next/link";
import { Mail, Linkedin, Instagram } from "lucide-react";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

export function LdFooter() {
  const LD_SECTIONS = [
    { label: "Work", href: "/ld/work", isLink: true },
    { label: "Showcase", href: "/ld/showcase", isLink: true },
    { label: "Capabilities", href: "/ld/capabilities", isLink: true },
  ];

  const PORTFOLIO_LINKS = [
    { label: "Home", href: "/" },
    { label: "AI Systems Portfolio", href: "/ai" },
    { label: "Insights", href: "/ai/insights" },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl font-bold text-white">Jitin Nair</span>
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
                href="https://instagram.com/not_jitin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
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

          {/* This page */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">This page</h3>
            <ul className="space-y-3">
              {LD_SECTIONS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                    {item.label}
                  </Link>
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
