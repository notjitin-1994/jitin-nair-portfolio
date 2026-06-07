"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Linkedin } from "lucide-react";
import { EASE, useFontsReady, Reveal, MagneticButton } from "../../../components/ld/primitives";
import { FloatingNav } from "../../../components/FloatingNav";
import { LdFooter } from "../../../components/ld/LdFooter";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

/* ---------- Nav ---------- */
function Nav({ title }: { title: string }) {
  return (
    <FloatingNav
      brandHref="/showcase"
      suffix={title}
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
function Hero({ title, description }: { title: string; description: string }) {
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
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
            Back to Showcase
          </Link>
        </Reveal>

        <div className="mt-10 max-w-3xl">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-serif text-[2.5rem] font-medium leading-[1.1] tracking-tight text-white sm:text-[3.5rem] lg:text-[4rem]"
          >
            {title}.
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Placeholder Content ---------- */
function PlaceholderContent() {
  return (
    <section className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="h-8 w-8" strokeWidth={1.5} />
            </motion.div>
          </div>
          <h2 className="font-serif text-3xl font-medium text-white sm:text-4xl">Deep-dive coming soon</h2>
          <p className="mt-6 max-w-lg text-lg text-neutral-400">
            I am currently documenting the methodology, architectural diagrams, and tool demos for this phase of the L&D lifecycle.
          </p>
          <div className="mt-12 flex gap-4">
            <MagneticButton href="/showcase" variant="ghost">
              Back to Showcase
            </MagneticButton>
            <MagneticButton href="#contact" variant="primary">
              Get Notified
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl text-left">
        <Reveal>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Let&apos;s build your capability engine.
          </h2>
          <p className="mt-8 max-w-xl text-lg text-neutral-400">
            Currently advising on AI-in-learning strategy and scaling modern L&D functions.
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

export function ShowcasePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30">
      <Nav title={title} />
      <Hero title={title} description={description} />
      <PlaceholderContent />
      <Contact />
      <LdFooter />
    </main>
  );
}
