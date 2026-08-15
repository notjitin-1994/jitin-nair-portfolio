/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, PiggyBank, BarChart3, Receipt, Scale, LineChart, Target } from "lucide-react";
import Link from "next/link";
import { EASE, Reveal } from "../../../components/ld/primitives";

export function BudgetManagementClient() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
          <Link
            href="/ld/showcase"
            className="group flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Showcase
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24">
        {/* Header */}
        <header className="px-6 mx-auto max-w-4xl text-center mb-24">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300 mb-6">
              <PiggyBank className="h-3 w-3" />
              Leadership Showcase
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-6">
              Budget Management & ROI Maximization
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Managing P&L constraints without compromising quality. How I leverage zero-based budgeting, vendor consolidation, and AI ecosystems to generate $2.5M+ in business impact.
            </p>
          </Reveal>
        </header>

        {/* Core Capabilities Grid */}
        <section className="px-6 mx-auto max-w-6xl mb-32">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Zero-Based Budgeting",
                desc: "Every initiative starts at zero. Funding is allocated strictly based on the projected business impact (e.g., pipeline generation, error reduction) rather than historical spending habits.",
              },
              {
                icon: Receipt,
                title: "Vendor Consolidation",
                desc: "Auditing overlapping platforms and agency retainers to streamline the tech stack. Reinvesting the saved capital into high-leverage proprietary AI tools like Smartslate.",
              },
              {
                icon: Target,
                title: "Kirkpatrick Level 4 ROI",
                desc: "Shifting the reporting dialogue with C-suite stakeholders from completion metrics to measurable P&L outcomes, proving the financial return on learning investments.",
              },
              {
                icon: Scale,
                title: "Resource Allocation",
                desc: "Balancing the ledger between outsourced agency production and in-house capability building, optimizing for both speed-to-market and long-term cost efficiency.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-emerald-500/30 transition-colors h-full">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <item.icon className="h-8 w-8 text-emerald-400 mb-6" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-medium mb-3">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* AI as a Budget Multiplier */}
        <section className="px-6 mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#0a0a0f] to-emerald-950/20 p-10 md:p-14 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-1/2 h-full bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-serif font-medium tracking-tight mb-6">
                    AI as a Budget Multiplier
                  </h2>
                  <p className="text-neutral-300 leading-relaxed mb-6">
                    As a Senior Manager, the mandate isn't just to manage the budget—it's to exponentially expand what that budget can achieve.
                  </p>
                  <p className="text-neutral-300 leading-relaxed">
                    By architecting AI-native platforms like Solara and Smartslate, I effectively eliminated $140K+ in traditional training costs, reducing production dependencies and allowing the L&D budget to be heavily reinvested into advanced performance consulting and leadership development.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-serif text-emerald-400 mb-2">$140K+</div>
                      <div className="text-xs text-neutral-400 uppercase tracking-wider">Hard Costs Removed</div>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-serif text-emerald-400 mb-2">60%</div>
                      <div className="text-xs text-neutral-400 uppercase tracking-wider">Production Savings</div>
                    </div>
                    <div className="col-span-2 bg-black/40 border border-white/10 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-serif text-emerald-400 mb-2">$2.5M+</div>
                      <div className="text-xs text-neutral-400 uppercase tracking-wider">Projected Business ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
