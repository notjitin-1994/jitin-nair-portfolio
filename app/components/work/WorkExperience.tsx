"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.16, delayChildren: reduced ? 0 : 0.1 } },
  };
  const line = reduced
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : { hidden: { y: "112%" }, show: { y: 0, transition: { duration: 1.0, ease: EASE } } };

  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-16 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-20%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link
            href="/LD-Systems-Portfolio"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
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
              A decade turning learning into
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span variants={line} className="block transform-gpu will-change-transform">
              <span className="text-emerald-400">measurable performance</span>.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg"
        >
          Ten years across instructional design and AI systems, told role by role with the numbers behind each.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- Summary band ---------- */
function SummaryBand() {
  return (
    <section className="px-5 pb-8">
      <Reveal className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 border-y border-white/[0.08] py-12 md:grid-cols-4">
        {workSummary.map((s) => (
          <div key={s.label}>
            <CountUp
              to={s.to}
              format={(n) => fmt(n, s.prefix, s.suffix)}
              className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl"
            />
            <div className="mt-2 text-sm leading-snug text-neutral-500">{s.label}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* ---------- Career arc (interactive horizontal progression) ---------- */
function CareerArc() {
  const [active, setActive] = useState(careerArc.length - 1);
  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            From the floor to the architecture.
          </h2>
          <p className="mt-3 leading-relaxed text-neutral-400">
            Each step widened the scope: train people, design programs, scale them globally, then build the systems that run them.
          </p>
        </Reveal>

        {/* Desktop: horizontal track */}
        <div className="relative hidden md:block">
          <div className="absolute left-0 right-0 top-[11px] h-px bg-white/[0.08]" />
          <div className="grid grid-cols-4">
            {careerArc.map((step, i) => {
              const on = i === active;
              return (
                <button
                  key={step.year}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex flex-col items-start pr-6 text-left outline-none"
                >
                  <span
                    className={`relative z-10 h-[23px] w-[23px] rounded-full border-2 transition-colors duration-300 ${
                      on ? "border-emerald-400 bg-emerald-400/20" : "border-white/20 bg-[#0a0a0f]"
                    }`}
                  >
                    <span
                      className={`absolute inset-[5px] rounded-full transition-colors duration-300 ${
                        on ? "bg-emerald-400" : "bg-white/15"
                      }`}
                    />
                  </span>
                  <span className={`mt-5 text-sm tabular-nums transition-colors ${on ? "text-emerald-400" : "text-neutral-500"}`}>
                    {step.year}
                  </span>
                  <span className={`mt-1 font-serif text-lg font-medium tracking-tight transition-colors ${on ? "text-white" : "text-neutral-400"}`}>
                    {step.title}
                  </span>
                  <span className="mt-1 text-sm text-emerald-400/70">{step.org}</span>
                  <motion.span
                    initial={false}
                    animate={{ opacity: on ? 1 : 0.45 }}
                    className="mt-2 text-sm leading-relaxed text-neutral-500"
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

/* ---------- Animated progress bar ---------- */
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
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
          initial={reduced ? false : { width: 0 }}
          whileInView={{ width: `${stat.value}%` }}
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
  return (
    <div className="grid gap-10 border-t border-white/[0.08] pt-12 lg:grid-cols-[300px_1fr] lg:gap-16">
      {/* Sticky rail */}
      <div className="self-start lg:sticky lg:top-28">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] font-serif text-xl font-medium text-emerald-300">
              {role.monogram}
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
            <div className="inline-flex items-center gap-2 pt-1">
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
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-3">
            {role.metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex flex-col bg-[#0a0a0f] p-5">
                  <Icon className="h-5 w-5 text-emerald-400" strokeWidth={1.75} />
                  <CountUp
                    to={m.to}
                    format={(n) => fmt(n, m.prefix, m.suffix)}
                    className="mt-4 font-serif text-3xl font-medium tracking-tight text-white"
                  />
                  <div className="mt-1.5 text-sm leading-snug text-neutral-500">{m.label}</div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Bars (only some roles) */}
        {role.bars && (
          <Reveal delay={0.12}>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {role.bars.map((b) => (
                <Bar key={b.label} stat={b} />
              ))}
            </div>
          </Reveal>
        )}

        {/* Achievements */}
        <Reveal delay={0.14}>
          <ul className="mt-10 space-y-px overflow-hidden rounded-2xl border border-white/[0.06]">
            {role.achievements.map((a) => (
              <li
                key={a}
                className="flex items-start gap-3 bg-white/[0.02] px-5 py-4 leading-relaxed text-neutral-300 transition-colors duration-200 hover:bg-emerald-400/[0.05]"
              >
                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Stack */}
        <Reveal delay={0.16}>
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
    <section className="px-5 py-12 sm:py-16">
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
    <section className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-2xl">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
            What I bring to the table.
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {competencyDomains.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title} delay={i * 0.05}>
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Languages + Education ---------- */
function LanguagesAndEducation() {
  const EduIcon = education.icon;
  return (
    <section className="px-5 py-20 sm:py-28">
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
                <li key={n} className="flex items-start gap-3 leading-relaxed text-neutral-400">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400/60" />
                  <span>{n}</span>
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
    <section id="contact" className="scroll-mt-24 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Let&apos;s build your capability engine.
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-neutral-400">
            Open to L&amp;D leadership roles, AI-in-learning strategy, and advisory. If you are scaling a learning
            function or removing its bottlenecks, let&apos;s talk.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href={EMAIL} variant="primary">
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </MagneticButton>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-neutral-500">
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
  const cols = [
    {
      head: "Portfolio",
      links: [
        { label: "L&D Portfolio", href: "/LD-Systems-Portfolio" },
        { label: "AI Systems Portfolio", href: "/AI-Systems-Architecture-Portfolio" },
        { label: "Insights", href: "/insights" },
      ],
    },
  ];
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
          {cols.map((c) => (
            <div key={c.head}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">{c.head}</h3>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-400 transition-colors hover:text-emerald-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
