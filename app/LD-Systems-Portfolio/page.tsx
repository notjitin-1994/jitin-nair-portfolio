import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Learning & Development Systems Portfolio",
  description:
    "Jitin Nair's Learning & Development Systems portfolio: instructional design, L&D platforms, and capability-building systems. Coming soon.",
  alternates: {
    canonical: "https://jitinnair.com/LD-Systems-Portfolio",
  },
};

export default function LDSystemsPortfolio() {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0a0a0f] px-6 text-[#f8fafc] selection:bg-violet-500/30">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-violet-400">
          Learning &amp; Development Systems
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Coming soon
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
          This portfolio is being put together: instructional design, L&amp;D platforms,
          and capability-building systems that scale. Check back shortly.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium text-slate-300 transition-all hover:border-violet-400/40 hover:bg-white/[0.05] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
