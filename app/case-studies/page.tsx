"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PageLayout } from "../components/PageLayout";
import { caseStudies } from "../data/caseStudies";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "AI Automation", "Agentic Systems", "Full-Stack", "L&D"];

export default function CaseStudiesPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? caseStudies : caseStudies.filter((cs) => cs.category === active);

  return (
    <PageLayout title="Case Studies" subtitle="Featured Deliverables">
      <p className="text-slate-400 text-lg mb-12 max-w-3xl -mt-8">
        Production systems with measurable outcomes. Each project solves real problems and delivers quantifiable results.
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === cat ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:bg-white/[0.06]"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((cs, i) => (
          <motion.div key={cs.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={`/case-studies/${cs.slug}`}
              className="group block rounded-3xl border border-white/[0.08] bg-white/[0.03] overflow-hidden hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-mono bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">{cs.category}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{cs.title}</h3>
                <p className="text-sm text-slate-500 mb-1">{cs.client} — {cs.industry}</p>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{cs.challenge.slice(0, 150)}...</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {cs.results.slice(0, 4).map((r, j) => (
                    <div key={j} className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <div className="text-lg font-bold text-cyan-400">{r.value}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{r.metric}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {cs.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-white/[0.05] text-slate-400 rounded border border-white/[0.08]">{t}</span>
                  ))}
                  {cs.technologies.length > 5 && <span className="px-2 py-0.5 text-[10px] text-slate-500">+{cs.technologies.length - 5}</span>}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
