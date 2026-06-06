"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, CheckCircle2, Mail, Linkedin } from "lucide-react";
import { EASE, Reveal, useFontsReady, MagneticButton } from "../../../components/ld/primitives";
import { FloatingNav } from "../../../components/FloatingNav";
import { LdFooter } from "../../../components/ld/LdFooter";
import { showcaseInsights } from "../../../data/showcaseInsights";
import {
  MeasurementMaturityInfographic,
  LearningEcosystemInfographic,
  AdaptiveLoopInfographic,
  SkillsTaxonomyInfographic,
  ForgettingCurveInfographic,
  OperatingModelInfographic,
} from "../../components/ShowcaseInfographics";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

const INFOGRAPHICS: Record<string, () => JSX.Element> = {
  "<MeasurementMaturityInfographic />": MeasurementMaturityInfographic,
  "<LearningEcosystemInfographic />": LearningEcosystemInfographic,
  "<AdaptiveLoopInfographic />": AdaptiveLoopInfographic,
  "<SkillsTaxonomyInfographic />": SkillsTaxonomyInfographic,
  "<ForgettingCurveInfographic />": ForgettingCurveInfographic,
  "<OperatingModelInfographic />": OperatingModelInfographic,
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/* ---------- Nav ---------- */
function Nav() {
  return (
    <FloatingNav
      brandHref="/showcase"
      suffix="Insights"
      accent="emerald"
      links={[
        { label: "Showcase", href: "/showcase" },
        { label: "All Insights", href: "/showcase/insights" },
        { label: "Experience", href: "/work" },
        { label: "Contact", href: "#contact" },
      ]}
      cta={{ label: "Get in touch", href: EMAIL }}
    />
  );
}

/* ---------- Inline markdown (bold/italic) ---------- */
function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="italic text-neutral-300">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

/* ---------- Block renderer ---------- */
function renderContent(content: string): ReactNode[] {
  const lines = content.split("\n");
  const result: ReactNode[] = [];
  let listBuffer: string[] = [];
  let quoteBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    result.push(
      <ul key={key} className="my-6 space-y-3 pl-1">
        {listBuffer.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-neutral-400 leading-relaxed">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <span className="text-[1.05rem]">{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  const flushQuote = (key: string) => {
    if (quoteBuffer.length === 0) return;
    result.push(
      <blockquote
        key={key}
        className="my-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-7 text-lg font-medium leading-relaxed text-emerald-50"
      >
        {quoteBuffer.map((q, idx) => (
          <p key={idx} className={idx > 0 ? "mt-3" : ""}>
            {renderInline(q)}
          </p>
        ))}
      </blockquote>
    );
    quoteBuffer = [];
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // Infographic token
    if (INFOGRAPHICS[trimmed]) {
      flushList(`l-${i}`);
      flushQuote(`q-${i}`);
      const Comp = INFOGRAPHICS[trimmed];
      result.push(<Comp key={`ig-${i}`} />);
      return;
    }

    // Blockquote
    if (trimmed.startsWith(">")) {
      flushList(`l-${i}`);
      quoteBuffer.push(trimmed.replace(/^>\s?/, ""));
      return;
    } else if (quoteBuffer.length) {
      flushQuote(`q-${i}`);
    }

    // List item
    if (trimmed.startsWith("- ")) {
      listBuffer.push(trimmed.replace("- ", ""));
      return;
    } else if (listBuffer.length) {
      flushList(`l-${i}`);
    }

    if (trimmed.startsWith("## ")) {
      result.push(
        <h2 key={i} className="mt-14 mb-5 font-serif text-3xl font-medium tracking-tight text-white sm:text-[2.25rem]">
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      result.push(
        <h3 key={i} className="mt-10 mb-4 border-l-2 border-emerald-500/50 pl-4 text-xl font-semibold text-white">
          {trimmed.replace("### ", "")}
        </h3>
      );
    } else if (trimmed === "---") {
      result.push(<hr key={i} className="my-10 border-white/[0.08]" />);
    } else if (trimmed.startsWith("*") && trimmed.endsWith("*") && !trimmed.startsWith("**")) {
      // citation/footnote lines (italic)
      result.push(
        <p key={i} className="text-sm text-neutral-600 leading-relaxed">
          {renderInline(trimmed)}
        </p>
      );
    } else if (trimmed === "") {
      // skip
    } else {
      result.push(
        <p key={i} className="mb-6 text-[1.075rem] leading-relaxed text-neutral-400">
          {renderInline(trimmed)}
        </p>
      );
    }
  });

  flushList("l-end");
  flushQuote("q-end");
  return result;
}

export function InsightShowcaseDetail({ slug }: { slug: string }) {
  const ready = useFontsReady();
  const reduced = useReducedMotion();

  const post = showcaseInsights.find((p) => p.slug === slug && p.status === "published");
  const related = showcaseInsights
    .filter((p) => p.slug !== slug && p.status === "published")
    .slice(0, 2);

  if (!post || !post.content) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30">
        <Nav />
        <section className="px-5 pt-40 pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-3xl font-medium text-white">Not found</h1>
            <p className="mt-4 text-neutral-400">This insight isn&apos;t available yet.</p>
            <Link
              href="/showcase/insights"
              className="mt-8 inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Insights
            </Link>
          </div>
        </section>
        <LdFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30">
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: "https://jitinnair.com/og-image.png",
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: "Jitin Nair",
              url: "https://jitinnair.com",
              jobTitle: "L&D Leader & AI Systems Architect",
              sameAs: ["https://www.linkedin.com/in/notjitin/"],
            },
            publisher: { "@type": "Person", name: "Jitin Nair", url: "https://jitinnair.com" },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://jitinnair.com/showcase/insights/${slug}`,
            },
            keywords: [post.category, "L&D", "Learning & Development", "AI in Learning", "Jitin Nair"],
            articleSection: post.category,
            wordCount: post.content.split(/\s+/).length,
          }),
        }}
      />

      {/* Header */}
      <section className="relative overflow-hidden px-5 pt-32 pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-20%] h-[60vh] w-[60vh] rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/showcase/insights"
              className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back to Insights
            </Link>
          </Reveal>

          <div className="mt-8">
            <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-400/90">
              {post.category}
            </span>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-6 font-serif text-[2rem] font-medium leading-[1.12] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.25rem]"
            >
              {post.title}
            </motion.h1>

            <div className="mt-7 flex flex-wrap items-center gap-4 border-y border-white/[0.06] py-5 text-sm text-neutral-500">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" /> {post.readTime} read
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-400" /> {fmtDate(post.date)}
              </span>
              <div className="hidden h-4 w-px bg-white/10 sm:block" />
              <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Researched &amp; cited
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-5 pt-8 pb-8">
        <motion.article
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mx-auto max-w-3xl"
        >
          {renderContent(post.content)}
        </motion.article>
      </section>

      {/* Author + related */}
      <section className="px-5 py-24 md:py-32 border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="flex items-start gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-emerald-400/20">
                <Image
                  src="/hero-photo.jpg"
                  alt="Jitin Nair"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400">Written by</p>
                <h4 className="text-lg font-semibold text-white">Jitin Nair</h4>
                <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                  L&amp;D leader and AI systems architect. A decade turning learning into measurable
                  performance — now building the AI systems that instrument it at scale.
                </p>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-14">
              <h3 className="mb-8 font-serif text-2xl font-medium tracking-tight text-white">Keep reading</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {related.map((rp, i) => (
                  <motion.div
                    key={rp.slug}
                    initial={reduced ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  >
                    <Link href={`/showcase/insights/${rp.slug}`} className="group block h-full">
                      <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04]">
                        <span className="mb-3 inline-flex w-fit items-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400/90">
                          {rp.category}
                        </span>
                        <h4 className="text-base font-semibold leading-snug text-white transition-colors group-hover:text-emerald-50">
                          {rp.title}
                        </h4>
                        <span className="mt-4 flex items-center gap-1.5 text-xs text-neutral-600">
                          <Clock className="h-3.5 w-3.5" /> {rp.readTime}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 px-5 py-24 md:py-32 border-t border-white/[0.05]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
              Let&apos;s build your capability engine.
            </h2>
            <p className="mt-8 max-w-xl text-lg text-neutral-400">
              Currently advising on AI-in-learning strategy and scaling modern L&amp;D functions.
            </p>
            <div className="mt-12 flex">
              <MagneticButton href={EMAIL} variant="primary" className="px-10 py-4 text-base">
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </MagneticButton>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-neutral-500">
              <a href={EMAIL} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <Mail className="h-4 w-4" strokeWidth={1.75} /> not.jitin@gmail.com
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.75} /> LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <LdFooter />
    </main>
  );
}
