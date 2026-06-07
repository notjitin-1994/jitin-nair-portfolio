"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { 
  ArrowLeft, 
  ArrowRight, 
  Target, 
  Rocket, 
  UsersRound, 
  GraduationCap, 
  Video, 
  LineChart,
  Mail,
  Linkedin
} from "lucide-react";
import { EASE, useFontsReady, Reveal, MagneticButton } from "../components/ld/primitives";
import { Grain } from "../components/leading/visuals";
import { FloatingNav } from "../components/FloatingNav";
import { LdFooter } from "../components/ld/LdFooter";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

const SHOWCASE_ITEMS = [
  {
    id: "cases",
    title: "Leadership Case Studies",
    description: "Proven leadership outcomes and measurable business impact.",
    icon: LineChart,
    href: "/showcase/case-studies",
    imageUrl: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80&w=800",
    featured: true,
  },
  {
    id: "discovery",
    title: "Project Discovery & Planning",
    description: "Automated stakeholder discovery and strategic curriculum mapping.",
    icon: Target,
    href: "/showcase/project-discovery-planning",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "management",
    title: "Project Management",
    description: "Driving complex learning initiatives from kick-off to delivery.",
    icon: UsersRound,
    href: "/showcase/project-management",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "instructional",
    title: "Instructional Design",
    description: "Cognitive-first architectures built on learning science.",
    icon: GraduationCap,
    href: "/showcase/instructional-design",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "content",
    title: "Content Development",
    description: "High-fidelity video and automated production pipelines.",
    icon: Video,
    href: "/showcase/content-development",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "insights",
    title: "Insights",
    description: "Data-driven analytics and performance measurement systems.",
    icon: Rocket,
    href: "/showcase/insights",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
];

/* ---------- Nav ---------- */
function Nav() {
  return (
    <FloatingNav
      brandHref="/LD-Systems-Portfolio"
      suffix="Showcase"
      accent="emerald"
      links={[
        { label: "L&D Portfolio", href: "/LD-Systems-Portfolio" },
        { label: "Case Studies", href: "/showcase/case-studies" },
        { label: "Experience", href: "/work" },
        { label: "Contact", href: "#contact" },
      ]}
      cta={{ label: "Get in touch", href: EMAIL }}
    />
  );
}

/* ---------- Hero ---------- */
function Hero() {
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
            href="/LD-Systems-Portfolio"
            className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
            Back to Portfolio
          </Link>
        </Reveal>

        <div className="mt-10 max-w-3xl">
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-serif text-[2.5rem] font-medium leading-[1.1] tracking-tight text-white sm:text-[3.5rem] lg:text-[4rem]"
          >
            The <span className="text-emerald-400 font-serif italic">L&D</span> Showcase.
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl"
          >
            A curated deep-dive into the methodology, orchestration, and results of a decade in learning leadership.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Showcase Grid ---------- */
function ShowcaseGrid() {
  return (
    <section className="px-5 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const featured = item.featured;

            return (
              <div key={item.id} className={featured ? "sm:col-span-2 lg:col-span-1" : ""}>
              <Reveal delay={i * 0.05} y={30}>
                <Link
                  href={item.href}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border transition-all duration-300 sm:hover:-translate-y-1 ${
                    featured
                      ? "border-emerald-400/30 bg-emerald-500/10 hover:border-emerald-400/50"
                      : "border-white/10 bg-white/[0.03] hover:border-emerald-400/30 hover:bg-white/[0.05]"
                  }`}
                >
                  {/* Visual Background */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-60" />
                  </div>

                  <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        featured ? "bg-emerald-400/20 text-emerald-300" : "bg-white/10 text-emerald-400"
                      }`}>
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4 text-emerald-400" />
                      </div>
                    </div>

                    <h3 className="mt-4 sm:mt-6 font-serif text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                  
                  <Grain />
                </Link>
              </Reveal>
              </div>
            );
          })}
        </div>
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

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30 overflow-x-hidden">
      <Nav />
      <Hero />
      <ShowcaseGrid />
      <Contact />
      <LdFooter />
    </main>
  );
}
