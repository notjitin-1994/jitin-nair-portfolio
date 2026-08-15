/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Network, GitPullRequest, Workflow, GraduationCap, Compass, Briefcase } from "lucide-react";
import Link from "next/link";
import { EASE, Reveal } from "../../../components/ld/primitives";

export function SkillsTaxonomyClient() {
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
              <Network className="h-3 w-3" />
              Leadership Showcase
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-6">
              Skills Taxonomies & Talent Mobility
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Moving beyond siloed learning paths. Architecting enterprise-wide skills ontologies that map directly to internal mobility, succession planning, and performance consulting.
            </p>
          </Reveal>
        </header>

        {/* Feature Grid */}
        <section className="px-6 mx-auto max-w-6xl mb-32">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: GitPullRequest,
                title: "Dynamic Skills Ontologies",
                desc: "Mapping the DNA of the organization by establishing a standardized, AI-assisted taxonomy of critical business skills rather than arbitrary job titles.",
              },
              {
                icon: Compass,
                title: "Performance Consulting",
                desc: "Diagnosing root causes of underperformance through data-driven gap analysis, ensuring interventions solve actual business problems, not just symptoms.",
              },
              {
                icon: Workflow,
                title: "Internal Talent Mobility",
                desc: "Designing learning architectures that serve as literal bridges between departments, allowing high-potential talent to rapidly upskill and cross-skill into business-critical roles.",
              },
              {
                icon: Briefcase,
                title: "Succession Planning Pipelines",
                desc: "Partnering with HR Leadership to build verifiable, data-backed leadership development pipelines that prepare the next generation of executives before the need arises.",
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

        {/* Deep Dive */}
        <section className="px-6 mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 md:p-14">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl font-serif font-medium tracking-tight">
                    The Solara Advantage
                  </h2>
                  <p className="text-neutral-400 leading-relaxed">
                    A skills taxonomy is only as useful as the system that maintains it. Static spreadsheets decay the moment they are published. 
                  </p>
                  <p className="text-neutral-400 leading-relaxed">
                    By embedding these taxonomies into the <strong className="text-white">Smartslate ecosystem</strong> and our proprietary <strong className="text-white">Solara</strong> applications, we automate the mapping of emerging skills against existing learning assets. This provides real-time visibility into organizational capability gaps and allows L&D to proactively deploy targeted enablement, rather than reacting to operational failures.
                  </p>
                </div>
                <div className="w-full md:w-1/3 aspect-square relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[80px]" />
                  <GraduationCap className="h-32 w-32 text-emerald-400/80 relative z-10" strokeWidth={1} />
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
