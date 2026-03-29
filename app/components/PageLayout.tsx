"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Agents", href: "/agents" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export function PageLayout({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-lg font-bold tracking-tight">Jitin <span className="text-cyan-400">Nair</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-400 hover:text-white py-2">
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Header */}
      {title && (
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {subtitle && <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">{subtitle}</p>}
              <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">{children}</div>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-slate-400 mb-6">Let&apos;s discuss how AI enablement can transform your operations.</p>
          <Link href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all text-sm font-medium">
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">Crafted with precision — Jitin Nair © 2025</p>
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-slate-500 hover:text-cyan-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
