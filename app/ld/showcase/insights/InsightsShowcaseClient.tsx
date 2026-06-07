"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Calendar,
  Lock,
  Mail,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { EASE, Reveal, useFontsReady, MagneticButton } from "../../../components/ld/primitives";
import { FloatingNav } from "../../../components/FloatingNav";
import { LdFooter } from "../../../components/ld/LdFooter";
import { showcaseInsights, type ShowcaseInsight } from "../../../data/showcaseInsights";
import { SHOWCASE_ICON_MAP } from "../components/ShowcaseInfographics";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";
const PAGE_SIZE = 9;

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
        { label: "L&D Portfolio", href: "/LD-Systems-Portfolio" },
        { label: "Experience", href: "/work" },
        { label: "Contact", href: "#contact" },
      ]}
      cta={{ label: "Get in touch", href: EMAIL }}
    />
  );
}

/* ---------- Hero ---------- */
function Hero({ publishedCount }: { publishedCount: number }) {
  const ready = useFontsReady();
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-20%] h-[70vh] w-[70vh] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[60vh] w-[60vh] rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Link
            href="/showcase"
            className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            Back to Showcase
          </Link>
        </Reveal>

        <div className="mt-10 max-w-3xl">
          <Reveal delay={0.05}>
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-emerald-500/30" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
                Field Notes · L&amp;D × AI
              </span>
            </div>
          </Reveal>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-serif text-[2.5rem] font-medium leading-[1.1] tracking-tight text-white sm:text-[3.5rem] lg:text-[4rem]"
          >
            Insights on the future of{" "}
            <span className="text-emerald-400 italic">learning.</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            Data-driven essays on learning analytics, AI-native instruction, skills strategy, and the
            operating model rewiring the modern L&amp;D function — written from the build floor, not the
            sidelines.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-7 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {publishedCount} essays live · more in the works
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Published Card ---------- */
function InsightCard({ insight, index }: { insight: ShowcaseInsight; index: number }) {
  const reduced = useReducedMotion();
  const Icon = SHOWCASE_ICON_MAP[insight.icon];

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
    >
      <Link href={`/showcase/insights/${insight.slug}`} className="group block h-full">
        <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.04]">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="mb-5 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 transition-all duration-300 group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10 group-hover:text-emerald-400">
              <Icon className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-neutral-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400" />
          </div>

          <span className="mb-3 inline-flex w-fit items-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400/90">
            {insight.category}
          </span>

          <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-emerald-50">
            {insight.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-500">{insight.excerpt}</p>

          <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-4 text-xs text-neutral-600">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {insight.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {fmtDate(insight.date)}
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

/* ---------- Coming Soon Card ---------- */
function ComingSoonCard({ insight, index }: { insight: ShowcaseInsight; index: number }) {
  const reduced = useReducedMotion();
  const Icon = SHOWCASE_ICON_MAP[insight.icon];

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
      aria-disabled
      className="relative flex h-full cursor-not-allowed flex-col overflow-hidden rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] p-6"
    >
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-neutral-700">
          <Icon className="h-5 w-5" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-500">
          <Lock className="h-3 w-3" /> In the works
        </span>
      </div>

      <span className="mb-3 inline-flex w-fit items-center rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-neutral-600">
        {insight.category}
      </span>

      <h3 className="text-lg font-semibold leading-snug text-neutral-400">{insight.title}</h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{insight.excerpt}</p>

      <div className="mt-6 flex items-center gap-4 border-t border-white/[0.04] pt-4 text-xs text-neutral-700">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {insight.readTime}
        </span>
        <span className="font-mono uppercase tracking-wider">Coming soon</span>
      </div>
    </motion.div>
  );
}

/* ---------- Pagination ---------- */
function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const btn =
    "flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition-all duration-200";

  return (
    <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={`${btn} border-white/[0.08] bg-white/[0.02] text-neutral-400 hover:border-emerald-400/30 hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:text-neutral-400`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${btn} ${
            p === page
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              : "border-white/[0.08] bg-white/[0.02] text-neutral-400 hover:border-emerald-400/30 hover:text-emerald-400"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={`${btn} border-white/[0.08] bg-white/[0.02] text-neutral-400 hover:border-emerald-400/30 hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:text-neutral-400`}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

/* ---------- Grid Section ---------- */
function GridSection() {
  const [page, setPage] = useState(1);

  // Published first, then coming-soon — preserves the "6 live + rest locked" ordering.
  const ordered = useMemo(() => {
    const published = showcaseInsights.filter((i) => i.status === "published");
    const soon = showcaseInsights.filter((i) => i.status === "coming-soon");
    return [...published, ...soon];
  }, []);

  const totalPages = Math.ceil(ordered.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = ordered.slice(start, start + PAGE_SIZE);

  const handleChange = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    if (typeof window !== "undefined") {
      document.getElementById("insights-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="insights-grid" className="scroll-mt-28 px-5 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pageItems.map((insight, i) =>
              insight.status === "published" ? (
                <InsightCard key={insight.slug} insight={insight} index={i} />
              ) : (
                <ComingSoonCard key={insight.slug} insight={insight} index={i} />
              )
            )}
          </motion.div>
        </AnimatePresence>

        <Pagination page={page} totalPages={totalPages} onChange={handleChange} />
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-24 md:py-32 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl text-left">
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
  );
}

export function InsightsShowcaseClient() {
  const publishedCount = showcaseInsights.filter((i) => i.status === "published").length;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30">
      <Nav />
      <Hero publishedCount={publishedCount} />
      <GridSection />
      <Contact />
      <LdFooter />
    </main>
  );
}
