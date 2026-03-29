"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PageLayout } from "../components/PageLayout";
import { blogPosts } from "../data/blogPosts";
import {
  Section,
  SectionHeader,
  Card,
  Badge,
  FilterTabs,
  FilterContainer,
  fadeInUp,
} from "../components/ui";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

const allCategories = [
  "All",
  ...Array.from(new Set(blogPosts.map((p) => p.category))),
];

export default function InsightsPage() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === active);

  return (
    <PageLayout>
      {/* Hero Section */}
      <Section withAurora className="pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mono-label-cyan mb-4">Insights</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Thoughts & Analysis
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl">
            Technical deep-dives on AI enablement, agent architecture, and the
            intersection of instructional design and artificial intelligence.
          </p>
        </motion.div>
      </Section>

      {/* Insights Grid */}
      <Section className="py-16">
        <FilterContainer
          totalCount={blogPosts.length}
          filteredCount={filtered.length}
        >
          <FilterTabs
            categories={allCategories}
            activeCategory={active}
            onSelect={setActive}
          />
        </FilterContainer>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/insights/${post.slug}`}>
                <Card variant="default" hover className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="teal" size="sm">
                      {post.category}
                    </Badge>
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-cyan-400 transition-colors text-white">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />{" "}
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </PageLayout>
  );
}
