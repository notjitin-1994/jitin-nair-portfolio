"use client";

import { motion } from "framer-motion";
import { PageLayout } from "../../components/PageLayout";
import { blogPosts } from "../../data/blogPosts";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export function InsightDetail({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <PageLayout title="Not Found">
        <p className="text-slate-400">Article not found.</p>
        <Link href="/insights" className="text-cyan-400 hover:underline mt-4 inline-block">← Back to Insights</Link>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <article className="pt-24 pb-12 max-w-3xl mx-auto">
        <Link href="/insights" className="text-sm text-slate-500 hover:text-cyan-400 mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Back to Insights
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <span className="px-3 py-1 text-xs font-mono bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/20">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime} read</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="space-y-4">
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.replace("## ", "")}</h2>;
            if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.replace("### ", "")}</h3>;
            if (line.startsWith("- **")) {
              const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
              if (match) return <li key={i} className="text-slate-400 ml-4 list-disc"><strong className="text-white">{match[1]}</strong> — {match[2]}</li>;
              const match2 = line.match(/- \*\*(.+?)\*\*(.*)/);
              if (match2) return <li key={i} className="text-slate-400 ml-4 list-disc"><strong className="text-white">{match2[1]}</strong>{match2[2]}</li>;
            }
            if (line.startsWith("- ")) return <li key={i} className="text-slate-400 ml-4 list-disc">{line.replace("- ", "")}</li>;
            if (line.trim() === "") return null;
            return <p key={i} className="text-slate-400 leading-relaxed">{line}</p>;
          })}
        </motion.div>
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t border-white/[0.08]">
            <h3 className="text-xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/insights/${rp.slug}`}
                  className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-cyan-500/30 transition-all">
                  <span className="text-[10px] text-violet-400 font-mono">{rp.category}</span>
                  <h4 className="font-bold text-sm mt-1 mb-1">{rp.title}</h4>
                  <p className="text-xs text-slate-500">{rp.readTime}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </PageLayout>
  );
}
