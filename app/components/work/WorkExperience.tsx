"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail, Linkedin, MapPin } from "lucide-react";
import { EASE, useFontsReady, Reveal, CountUp, MagneticButton } from "../ld/primitives";
import {
  workSummary,
  careerArc,
  workRoles,
  competencyDomains,
  languages,
  education,
  type WorkRole,
  type ProgressStat,
} from "../../data/workHistory";

const EMAIL = "mailto:not.jitin@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/notjitin/";

const fmt = (n: number, prefix = "", suffix = "") =>
  `${prefix}${Math.round(n).toLocaleString()}${suffix}`;

/* Shared stagger primitives. Cascading entry (Emil: items shouldn't all pop at once). */
const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? undefined : groupVariants}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const links = [
    { label: "L&D Portfolio", href: "/LD-Systems-Portfolio" },
    { label: "AI Systems", href: "/AI-Systems-Architecture-Portfolio" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5">
      <nav className="mx-auto mt-4 flex h-14 max-w-6xl items-center justify-between rounded-full border border-emerald-400/25 bg-[#0a0a0f]/70 pl-5 pr-3 shadow-[0_0_28px_-8px_rgba(52,211,153,0.5)] backdrop-blur-xl">
        <Link href="/LD-Systems-Portfolio" className="flex items-center gap-2 text-sm font-semibold text-white">
          Jitin Nair
          <span className="hidden text-emerald-400/70 sm:inline">· Experience</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((n) =>
            n.href.startsWith("/") ? (
              <Link key={n.href} href={n.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                {n.label}
              </Link>
            ) : (
              <a key={n.href} href={n.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                {n.label}
              </a>
            )
          )}
        </div>
        <a
          href={EMAIL}
          className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-[#062a1d] transition-[transform,background-color] duration-200 ease-out hover:bg-emerald-300 active:scale-[0.97]"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const reduced = useReducedMotion();
  const ready = useFontsReady();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.16, delayChildren: reduced ? 0 : 0.1 } },
  };
  const line: Variants = reduced
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : { hidden: { y: "112%" }, show: { y: 0, transition: { duration: 1.0, ease: EASE } } };

  return (
    <section className="relative overflow-hidden px-5 pt-24 pb-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-20%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link
            href="/LD-Systems-Portfolio"
            className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
            Back to L&amp;D portfolio
          </Link>
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="mt-8 font-serif text-[2.3rem] font-medium leading-[1.1] tracking-tight text-white sm:text-[3rem] lg:text-[3.4rem]"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={line} className="block transform-gpu will-change-transform">
              Ten years turning learning into
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={line} className="block transform-gpu will-change-transform">
              measurable <span className="text-emerald-400">business performance</span>.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg"
        >
          From the support floor to AI systems architecture. Every role here moved a number the business cared about.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- Summary band ---------- */
function SummaryBand() {
  return (
    <section className="px-5 pb-8">
      <StaggerGroup className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 border-y border-white/[0.08] py-8 md:grid-cols-4">
        {workSummary.map((s) => (
          <motion.div key={s.label} variants={itemVariants}>
            <CountUp
              to={s.to}
              format={(n) => fmt(n, s.prefix, s.suffix)}
              className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl"
            />
            <div className="mt-2 text-sm leading-snug text-neutral-500">{s.label}</div>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}

/* ---------- Career arc (interactive horizontal progression) ---------- */
function CareerArc() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(careerArc.length - 1);
  // Track fill reaches the active node. Nodes sit at 0 / 25 / 50 / 75% of the row.
  const fillScale = active / (careerArc.length - 1);

  return (
    <section className="px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            From the floor to the architecture.
          </h2>
          <p className="mt-3 leading-relaxed text-neutral-400">
            Each move widened the mandate: train the people, design the programs, scale them across a global org, then build the AI that runs them.
          </p>
        </Reveal>

        {/* Desktop: horizontal track */}
        <div className="relative hidden md:block">
          <div className="absolute left-0 right-[25%] top-[11px] h-px bg-white/[0.08]" />
          {/* Animated emerald fill up to the active node */}
          <motion.div
            aria-hidden
            className="absolute left-0 right-[25%] top-[11px] h-px origin-left bg-gradient-to-r from-emerald-400 to-teal-400"
            animate={{ scaleX: reduced ? 1 : fillScale }}
            transition={{ duration: 0.5, ease: EASE }}
          />
          <div className="grid grid-cols-4">
            {careerArc.map((step, i) => {
              const on = i === active;
              return (
                <button
                  key={step.year}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex flex-col items-start pr-6 text-left outline-none transition-transform duration-200 active:scale-[0.98]"
                >
                  <span
                    className={`relative z-10 grid h-[23px] w-[23px] place-items-center rounded-full border-2 transition-colors duration-300 ${
                      on ? "border-emerald-400 bg-emerald-400/15" : "border-white/20 bg-[#0a0a0f]"
                    }`}
                  >
                    <motion.span
                      className="h-[9px] w-[9px] rounded-full bg-emerald-400"
                      animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  </span>
                  <span className={`mt-5 text-sm tabular-nums transition-colors duration-300 ${on ? "text-emerald-400" : "text-neutral-500"}`}>
                    {step.year}
                  </span>
                  <span className={`mt-1 font-serif text-lg font-medium leading-snug tracking-tight transition-colors duration-300 ${on ? "text-white" : "text-neutral-400"}`}>
                    {step.title}
                  </span>
                  <span className="mt-1 text-sm text-emerald-400/70">{step.org}</span>
                  <motion.span
                    className="mt-2 text-sm leading-relaxed text-neutral-500"
                    animate={{ opacity: on ? 1 : 0.4 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {step.scope}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="space-y-6 md:hidden">
          {careerArc.map((step) => (
            <div key={step.year} className="relative border-l-2 border-emerald-400/40 pl-5">
              <div className="text-sm tabular-nums text-emerald-400">{step.year}</div>
              <div className="mt-1 font-serif text-xl font-medium tracking-tight text-white">{step.title}</div>
              <div className="mt-1 text-sm text-emerald-400/70">{step.org}</div>
              <p className="mt-1 text-sm leading-relaxed text-neutral-500">{step.scope}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Animated progress bar (GPU: scaleX, not width) ---------- */
function Bar({ stat }: { stat: ProgressStat }) {
  const reduced = useReducedMotion();
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-neutral-400">{stat.label}</span>
        <span className="font-serif text-lg font-medium text-white">{stat.display}</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
          initial={reduced ? false : { transform: "scaleX(0)" }}
          whileInView={{ transform: `scaleX(${stat.value / 100})` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-neutral-500">{stat.caption}</p>
    </div>
  );
}

/* ---------- Role dossier ---------- */
function RoleDossier({ role }: { role: WorkRole }) {
  const cols = role.metrics.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3";
  return (
    <div className="grid gap-10 border-t border-white/[0.08] pt-12 lg:grid-cols-[300px_1fr] lg:gap-16">
      {/* Sticky rail */}
      <div className="self-start lg:sticky lg:top-28">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-neutral-300 shadow-sm ring-1 ring-inset ring-emerald-400/20">
              <role.logo className="h-6 w-6 text-neutral-800" strokeWidth={1.75} />
            </span>
            <div>
              <div className="font-serif text-xl font-medium leading-tight tracking-tight text-white">{role.org}</div>
              <div className="mt-0.5 text-sm text-emerald-400/80">{role.accentNote}</div>
            </div>
          </div>
          <div className="mt-6 space-y-1.5 text-sm text-neutral-500">
            <div className="text-base font-medium text-neutral-200">{role.role}</div>
            <div className="tabular-nums">{role.period}</div>
            <div className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
              {role.location}
            </div>
            <div className="pt-1">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs text-neutral-400">
                {role.tenure}
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Content */}
      <div>
        <Reveal delay={0.05}>
          <p className="max-w-2xl text-lg leading-relaxed text-neutral-300">{role.lede}</p>
        </Reveal>

        {/* Metric tiles */}
        <StaggerGroup className={`mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] ${cols}`}>
          {role.metrics.map((m) => {
            const Icon = m.icon;
            return (
              <motion.div key={m.label} variants={itemVariants} className="flex flex-col bg-[#0a0a0f] p-5">
                <Icon className="h-5 w-5 text-emerald-400" strokeWidth={1.75} />
                <CountUp
                  to={m.to}
                  format={(n) => fmt(n, m.prefix, m.suffix)}
                  className="mt-4 font-serif text-3xl font-medium tracking-tight text-white"
                />
                <div className="mt-1.5 text-sm leading-snug text-neutral-500">{m.label}</div>
              </motion.div>
            );
          })}
        </StaggerGroup>

        {/* Bars (only some roles) */}
        {role.bars && (
          <StaggerGroup className="mt-8 grid gap-6 sm:grid-cols-2">
            {role.bars.map((b) => (
              <motion.div key={b.label} variants={itemVariants}>
                <Bar stat={b} />
              </motion.div>
            ))}
          </StaggerGroup>
        )}

        {/* Achievements: left-accent rows, no decorative dots */}
        <StaggerGroup className="mt-10 flex flex-col gap-1.5">
          {role.achievements.map((a) => (
            <motion.div
              key={a}
              variants={itemVariants}
              className="rounded-lg border-l-2 border-white/[0.1] bg-white/[0.01] px-4 py-3 leading-relaxed text-neutral-300 transition-[border-color,background-color,transform] duration-200 hover:border-emerald-400/70 hover:bg-emerald-400/[0.04]"
            >
              {a}
            </motion.div>
          ))}
        </StaggerGroup>

        {/* Stack */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap gap-2">
            {role.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-400 transition-colors duration-200 hover:border-emerald-400/40 hover:text-emerald-300"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Roles() {
  return (
    <section className="px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl space-y-20">
        {workRoles.map((role) => (
          <RoleDossier key={role.id} role={role} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Competencies ---------- */
function Competencies() {
  return (
    <section className="px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Where learning science meets systems engineering.
          </h2>
        </Reveal>
        <StaggerGroup className="grid gap-5 md:grid-cols-2">
          {competencyDomains.map((d) => {
            const Icon = d.icon;
            return (
              <motion.div key={d.title} variants={itemVariants}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors duration-200 hover:border-emerald-400/25">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/[0.08] text-emerald-400">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-serif text-lg font-medium tracking-tight text-white">{d.title}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {d.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ---------- Languages + Education ---------- */
function LanguagesAndEducation() {
  const EduIcon = education.icon;
  return (
    <section className="px-5 py-6 md:py-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">Languages</h2>
          <ul className="mt-8 divide-y divide-white/[0.06]">
            {languages.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between py-3.5">
                <span className="font-medium text-neutral-200">{l.name}</span>
                <span className="text-sm text-neutral-500">{l.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">Education</h2>
          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-400/[0.08] text-emerald-400">
                <EduIcon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <div className="font-serif text-lg font-medium tracking-tight text-white">{education.degree}</div>
                <div className="mt-0.5 text-sm text-emerald-400/80">{education.school}</div>
                <div className="mt-0.5 text-sm text-neutral-500">
                  {education.location} · {education.period}
                </div>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {education.notes.map((n) => (
                <li key={n} className="leading-relaxed text-neutral-400">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-5 py-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Let&apos;s build your capability engine.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-neutral-400">
            Open to L&amp;D leadership roles, AI-in-learning strategy, and advisory. If you are scaling a learning
            function or clearing its bottlenecks, let&apos;s talk.
          </p>
          <div className="mt-10 flex">
            <MagneticButton href={EMAIL} variant="primary">
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
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

/* ---------- Footer ---------- */
function WorkFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <span className="text-xl font-bold text-white">Jitin Nair</span>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              L&amp;D leader and AI systems architect. A decade turning learning into measurable performance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={EMAIL}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-all hover:border-emerald-500/30 hover:text-emerald-400"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">Portfolio</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/LD-Systems-Portfolio" className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                  L&amp;D Portfolio
                </Link>
              </li>
              <li>
                <Link href="/AI-Systems-Architecture-Portfolio" className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                  AI Systems Portfolio
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                  Insights
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">Get in touch</h3>
            <ul className="space-y-3">
              <li>
                <a href={EMAIL} className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                  not.jitin@gmail.com
                </a>
              </li>
              <li className="text-sm text-slate-500">Bangalore, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Jitin Nair. All rights reserved.</p>
          <p className="text-xs text-slate-600">Built with Next.js, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
export function WorkExperience() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#0a0a0f] text-[#f8fafc] selection:bg-emerald-500/30">
      <Nav />
      <Hero />
      <SummaryBand />
      <CareerArc />
      <Roles />
      <Competencies />
      <LanguagesAndEducation />
      <Contact />
      <WorkFooter />
    </main>
  );
}
