"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PageLayout } from "../../components/PageLayout";
import { blogPosts } from "../../data/blogPosts";
import { Section, Card, Badge, fadeInUp } from "../../components/ui";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { ShareButtons } from "../../components/ui/ShareButtons";

export function InsightDetail({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

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

  return (
    <PageLayout>
      {/* JSON-LD Article Schema for SEO/GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": "https://jitinnair.com/og-image.png",
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": "Jitin Nair",
              "url": "https://jitinnair.com"
            },
            "publisher": {
              "@type": "Person",
              "name": "Jitin Nair"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://jitinnair.com/insights/${slug}`
            }
          }),
        }}
      />
      {/* Article Header */}
      <Section className="pt-24 pb-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/insights"
            className="text-sm text-slate-500 hover:text-cyan-400 mb-6 inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <Badge variant="teal">{post.category}</Badge>

            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 leading-tight text-white">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime} read
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <ShareButtons title={post.title} url={"/insights/" + slug} />
          </motion.div>
        </div>
      </Section>

      {/* Article Content */}
      <Section className="py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {post.content.split("\n").map((line, i) => {
            if (line.startsWith("## "))
              return (
                <h2
                  key={i}
                  className="text-2xl font-bold text-white mt-10 mb-4"
                >
                  {line.replace("## ", "")}
                </h2>
              );
            if (line.startsWith("### "))
              return (
                <h3
                  key={i}
                  className="text-xl font-bold text-white mt-8 mb-3"
                >
                  {line.replace("### ", "")}
                </h3>
              );
            if (line.startsWith("- **")) {
              const match = line.match(/- \*\*(.+?)\*\* — (.+)/);
              if (match)
                return (
                  <li key={i} className="text-slate-400 ml-4 list-disc">
                    <strong className="text-white">{match[1]}</strong> —{" "}
                    {match[2]}
                  </li>
                );
              const match2 = line.match(/- \*\*(.+?)\*\*(.*)/);
              if (match2)
                return (
                  <li key={i} className="text-slate-400 ml-4 list-disc">
                    <strong className="text-white">{match2[1]}</strong>
                    {match2[2]}
                  </li>
                );
            }
            if (line.startsWith("- "))
              return (
                <li key={i} className="text-slate-400 ml-4 list-disc">
                  {line.replace("- ", "")}
                </li>
              );
            if (line.trim() === "") return null;
            return (
              <p key={i} className="text-slate-400 leading-relaxed">
                {line}
              </p>
            );
          })}
        </motion.div>
      </Section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <Section className="py-10 md:py-12 border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-white">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Card variant="ghost" hover className="h-full">
                      <Badge variant="teal" size="sm" className="mb-2">
                        {rp.category}
                      </Badge>
                      <h4 className="font-bold text-sm mt-1 mb-1 text-slate-200 group-hover:text-cyan-400 transition-colors">
                        {rp.title}
                      </h4>
                      <p className="text-xs text-slate-500">{rp.readTime}</p>
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
