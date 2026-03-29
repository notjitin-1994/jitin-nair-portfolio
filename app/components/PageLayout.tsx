"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./Footer";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Agents", href: "/agents" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export function PageLayout({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Hero Header with Integrated Navigation */}
      {title && (
        <section className="pt-16 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-lg font-bold tracking-tight">Jitin <span className="text-cyan-400">Nair</span></span>
              </Link>
            </motion.div>

            {/* Page Title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              {subtitle && <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">{subtitle}</p>}
              <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
            </motion.div>

            {/* Inline Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-6"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
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
      <Footer />
    </main>
  );
}
