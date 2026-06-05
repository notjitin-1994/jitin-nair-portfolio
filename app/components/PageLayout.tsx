"use client";

import { motion } from "framer-motion";
import { Footer } from "./Footer";
import { FloatingNav } from "./FloatingNav";

function SiteNav() {
  return (
    <FloatingNav
      brandHref="/"
      accent="cyan"
      links={[
        { label: "AI Systems", href: "/AI-Systems-Architecture-Portfolio" },
        { label: "L&D Portfolio", href: "/LD-Systems-Portfolio" },
        { label: "Insights", href: "/insights" },
      ]}
      cta={{ label: "Contact", href: "mailto:not.jitin@gmail.com" }}
    />
  );
}

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
      <SiteNav />
      <AuroraBackground />

      {/* Page header */}
      {title && (
        <section className="pt-24 pb-6 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              {subtitle && <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">{subtitle}</p>}
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">{title}</h1>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <div className={`max-w-7xl mx-auto px-6 pb-10 relative z-10${!title ? " pt-24" : ""}`}>{children}</div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
