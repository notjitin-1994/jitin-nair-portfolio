"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PageLayout } from "../components/PageLayout";
import { blogPosts } from "../data/blogPosts";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

const allCategories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function InsightsPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <PageLayout title="Insights" subtitle="Thoughts & Analysis">
      <p className="text-slate-400 text-lg mb-12 max-w-3xl -mt-8">
        Technical deep-dives on AI enablement, agent architecture, and the intersection of instructional design and artificial intelligence.
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {allCategories.map((cat) => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === cat ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:bg-white/[0.06]"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post, i) => (
          <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link href={`/insights/${post.slug}`}
              className="group block rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all h-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-[11px] font-mono bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/20">{post.category}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-cyan-400 transition-colors">{post.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
