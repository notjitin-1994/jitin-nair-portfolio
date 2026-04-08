"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./Footer";

import { WorkingTogetherCTA } from "./WorkingTogetherCTA";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Insights", href: "/insights" },
];

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -inset-[10%] opacity-30">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}

export function PageLayout({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/20 relative overflow-hidden">
      <AuroraBackground />
      
      {/* Hero Header with Integrated Navigation */}
      {title && (
        <section className="pt-8 pb-6 px-6 relative z-10">
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
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">{title}</h1>
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
                  className="text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
          </div>
        </section>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-10 relative z-10">{children}</div>

      {/* CTA */}
      <WorkingTogetherCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
