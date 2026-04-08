"use client";

import { motion } from "framer-motion";
import { Brain, ChevronRight, ArrowRight } from "lucide-react";
import { 
  Section, 
  SectionHeader, 
  FeaturedCard, 
  ButtonLink,
  Badge
} from "./ui";
import { blogPosts } from "../data/blogPosts";

export function FeaturedInsight() {
  const featuredPost = blogPosts.find(
    (p) => p.slug === "from-ld-to-ai-systems-engineering"
  );

  if (!featuredPost) return null;

  return (
    <Section id="featured-insight" className="py-6 md:py-8">
      <SectionHeader
        title="Intelligence Insights"
        label="Cognitive Architecture"
        align="left"
      />

      <div className="max-w-4xl">
        <FeaturedCard
          icon={<Brain className="w-6 h-6 text-cyan-400" />}
          title={featuredPost.title}
          description={featuredPost.excerpt}
          animate
          href={`/insights/${featuredPost.slug}`}
          meta={
            <div className="flex items-center gap-4">
              <Badge variant="cyan" size="sm">
                {featuredPost.category}
              </Badge>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                {featuredPost.readTime} Read
              </span>
            </div>
          }
          action={
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
              <p className="text-xs text-slate-500 italic max-w-md leading-relaxed">
                Exploring the 2026 career pivot: How pedagogical logic defines the blueprint for artificial reasoning.
              </p>
              <ButtonLink 
                href="/insights" 
                variant="outline" 
                size="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Explore all Insights
              </ButtonLink>
            </div>
          }
        >
          <></>
        </FeaturedCard>
      </div>
    </Section>
  );
}

export default FeaturedInsight;