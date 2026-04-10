"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PageLayout } from "../../components/PageLayout";
import { blogPosts } from "../../data/blogPosts";
import { Section, Card, Badge, fadeInUp } from "../../components/ui";
import { ArrowLeft, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { ShareButtons } from "../../components/ui/ShareButtons";
import { 
  SkillsMappingInfographic, 
  ROIMetricsInfographic, 
  BayesianArchitectureInfographic, 
  RealityCheckInfographic, 
  HITLArchitectureInfographic, 
  FrameworkComparisonInfographic, 
  AIEngineeringHarnessInfographic, 
  MCPNervousSystemInfographic, 
  MCPArchitectureInfographic, 
  CompoundAISystemInfographic,
  SkillsModularityInfographic
} from "../../components/InsightInfographics";

export function InsightDetail({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  if (!post) {
    return (
      <PageLayout>
        <Section className="pt-32 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Not Found</h1>
            <p className="text-slate-400 mb-6">Article not found.</p>
            <Link
              href="/insights"
              className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </Link>
          </div>
        </Section>
      </PageLayout>
    );
  }

  const renderContent = (content: string) => {
    // Split into blocks by newlines, but preserve internal newlines for tables/lists if needed
    // Simple block-based rendering
    const lines = content.split('\n');
    let inTable = false;
    let tableRows: string[][] = [];

    const result: React.ReactNode[] = [];

    lines.forEach((line, i) => {
      const trimmed = line.trim();

      // Table handling
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        const cells = trimmed.split('|').filter(c => c !== '').map(c => c.trim());
        if (!trimmed.includes('---')) { // Skip separator
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        inTable = false;
        result.push(
          <div key={`table-${i}`} className="my-8 overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                  {tableRows[0].map((cell, idx) => (
                    <th key={idx} className="px-6 py-4 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-6 py-4 text-sm text-slate-300 leading-relaxed font-medium">
                        {renderInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      if (trimmed === "<SkillsMappingInfographic />") {
        result.push(<SkillsMappingInfographic key={i} />);
        return;
      }
      if (trimmed === "<ROIMetricsInfographic />") {
        result.push(<ROIMetricsInfographic key={i} />);
        return;
      }
      if (trimmed === "<BayesianArchitectureInfographic />") {
        result.push(<BayesianArchitectureInfographic key={i} />);
        return;
      }
      if (trimmed === "<RealityCheckInfographic />") {
        result.push(<RealityCheckInfographic key={i} />);
        return;
      }
      if (trimmed === "<HITLArchitectureInfographic />") {
        result.push(<HITLArchitectureInfographic key={i} />);
        return;
      }
      if (trimmed === "<FrameworkComparisonInfographic />") {
        result.push(<FrameworkComparisonInfographic key={i} />);
        return;
      }
      if (trimmed === "<AIEngineeringHarnessInfographic />") {
        result.push(<AIEngineeringHarnessInfographic key={i} />);
        return;
      }
      if (trimmed === "<MCPNervousSystemInfographic />") {
        result.push(<MCPNervousSystemInfographic key={i} />);
        return;
      }
      if (trimmed === "<SkillsModularityInfographic />") {
        result.push(<SkillsModularityInfographic key={i} />);
        return;
      }
      if (trimmed === "<MCPArchitectureInfographic />") {
        result.push(<MCPArchitectureInfographic key={i} />);
        return;
      }
      if (trimmed === "<CompoundAISystemInfographic />") {
        result.push(<CompoundAISystemInfographic key={i} />);
        return;
      }

      if (line.startsWith("## ")) {
        result.push(<h2 key={i} className="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">{line.replace("## ", "")}</h2>);
      } else if (line.startsWith("### ")) {
        result.push(<h3 key={i} className="text-xl font-bold text-white mt-10 mb-4 border-l-2 border-cyan-500/50 pl-4">{line.replace("### ", "")}</h3>);
      } else if (line.startsWith("- ")) {
        result.push(<li key={i} className="text-slate-400 ml-6 mb-2 list-disc marker:text-cyan-500">{renderInlineMarkdown(line.replace("- ", ""))}</li>);
      } else if (trimmed === "") {
        // Skip
      } else {
        result.push(<p key={i} className="text-slate-400 leading-relaxed text-lg mb-6">{renderInlineMarkdown(line)}</p>);
      }
    });

    return result;
  };

  const renderInlineMarkdown = (text: string) => {
    // Very basic bold/italic handler
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="text-slate-300 italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  return (
    <PageLayout>
      {/* JSON-LD Article Schema for SEO/GEO — Enhanced */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": "https://jitinnair.com/og-image.svg",
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Person",
              "name": "Jitin Nair",
              "url": "https://jitinnair.com",
              "jobTitle": "AI Systems Architect",
              "sameAs": [
                "https://github.com/notjitin-1994",
                "https://www.linkedin.com/in/notjitin/",
                "https://twitter.com/not_jitin",
              ]
            },
            "publisher": {
              "@type": "Person",
              "name": "Jitin Nair",
              "url": "https://jitinnair.com"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://jitinnair.com/insights/${slug}`
            },
            "keywords": [post.category, "AI", "AI Systems Architect", "Jitin Nair", "Multi-Agent", "Agentic AI"],
            "articleSection": post.category,
            "wordCount": post.content.split(/\s+/).length,
          }),
        }}
      />
      {/* Article Header */}
      <Section className="pt-12 pb-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/insights"
            className="text-sm text-slate-500 hover:text-cyan-400 mb-8 inline-flex items-center gap-2 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <Badge variant="teal" className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-6">{post.category}</Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] text-white tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-10 border-y border-white/5 py-6">
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Clock className="w-4 h-4 text-cyan-400" /> {post.readTime} read
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Calendar className="w-4 h-4 text-cyan-400" />{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <span className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest">
                <CheckCircle2 className="w-4 h-4" /> Verified Data
              </span>
            </div>

            <ShareButtons title={post.title} url={"/insights/" + slug} />
          </motion.div>
        </div>
      </Section>

      {/* Article Content */}
      <Section className="py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="prose prose-invert prose-cyan max-w-none">
            {renderContent(post.content)}
          </div>
        </motion.div>
      </Section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <Section className="py-10 md:py-12 border-t border-white/[0.08]">
          <div className="max-w-4xl mx-auto">
            {/* Author Bio — Entity Reinforcement */}
            <div className="mb-12 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-white/[0.08] flex items-center justify-center">
                    <span className="text-2xl font-bold text-cyan-400">JN</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Written by</p>
                  <h4 className="text-lg font-bold text-white mb-1">Jitin Nair</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    AI Systems Architect specializing in multi-agent orchestration and agentic AI systems.
                    200+ agents deployed. Building at the intersection of instructional design and autonomous systems engineering.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <a
                      href="https://jitinnair.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      jitinnair.com
                    </a>
                    <a
                      href="https://github.com/notjitin-1994"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/notjitin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-10 text-white tracking-tight">
              Keep Reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp, i) => (
                <motion.div
                  key={rp.slug}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/insights/${rp.slug}`}>
                    <Card variant="ghost" hover className="h-full group p-8 bg-white/[0.02] border-white/[0.05] hover:border-cyan-500/30 transition-all rounded-3xl">
                      <Badge variant="teal" size="sm" className="mb-4">
                        {rp.category}
                      </Badge>
                      <h4 className="text-xl font-bold mb-3 text-slate-200 group-hover:text-cyan-400 transition-colors leading-tight">
                        {rp.title}
                      </h4>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> {rp.readTime}
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}
    </PageLayout>
  );
}
