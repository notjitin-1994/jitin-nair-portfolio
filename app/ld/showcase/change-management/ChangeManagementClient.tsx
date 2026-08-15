/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Users, Zap, TrendingUp, GitMerge, Layout } from "lucide-react";
import Link from "next/link";
import { EASE, Reveal } from "../../../components/ld/primitives";

export function ChangeManagementClient() {
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
              <Users className="h-3 w-3" />
              Leadership Showcase
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-6">
              Change Management & Organizational Alignment
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Leading through ambiguity. How I architect and execute transition strategies that drive adoption, manage resistance, and ensure operational continuity at scale.
            </p>
          </Reveal>
        </header>

        {/* Philosophy Grid */}
        <section className="px-6 mx-auto max-w-6xl mb-32">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: GitMerge,
                title: "Stakeholder Alignment",
                desc: "Aligning cross-functional leaders—from VP of Sales to CTOs—by co-authoring the business problem before proposing any learning solution.",
              },
              {
                icon: Zap,
                title: "Managing Resistance",
                desc: "Anticipating friction points in tool adoption (e.g., AI integration) and developing psychological safety protocols to move teams from anxiety to advocacy.",
              },
              {
                icon: Layout,
                title: "Operational Continuity",
                desc: "Structuring staggered rollouts and parallel systems to ensure zero downtime or disruption to revenue-generating operations during major transitions.",
              },
              {
                icon: TrendingUp,
                title: "Measuring Adoption",
                desc: "Moving beyond completion metrics to measure behavioral shifts in the flow of work, actively tying new capabilities to P&L outcomes.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:border-emerald-500/30 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <item.icon className="h-8 w-8 text-emerald-400 mb-6" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif font-medium mb-3">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Strategic Framework */}
        <section className="px-6 mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-3xl font-serif font-medium tracking-tight mb-8 text-center">
              The Senior Manager Playbook
            </h2>
          </Reveal>
          
          <div className="space-y-6">
            {[
              { phase: "Phase 1: Diagnostic & Buy-In", text: "Identifying root causes of performance gaps and securing executive sponsorship by attaching learning initiatives to strategic business priorities." },
              { phase: "Phase 2: Communication Architecture", text: "Deploying multi-channel communication plans that address the 'What's In It For Me' (WIIFM) at every level of the organization." },
              { phase: "Phase 3: Capacity Building", text: "Equipping middle managers with the coaching frameworks and data they need to reinforce behavioral change on the ground." },
              { phase: "Phase 4: Optimization", text: "Using real-time analytics to identify adoption bottlenecks and deploying targeted micro-interventions before momentum is lost." },
            ].map((step, index) => (
              <Reveal key={step.phase} delay={index * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 items-start p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="shrink-0 pt-1">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-serif text-sm border border-emerald-500/30">
                      0{index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2">{step.phase}</h4>
                    <p className="text-neutral-400 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}