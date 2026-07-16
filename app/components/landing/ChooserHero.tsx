"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Cpu, GraduationCap, ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMounted } from "../ld/primitives";

gsap.registerPlugin(ScrollTrigger);

// Emil Kowalski style easings
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// 1. MAGNETIC BUTTON COMPONENT
function MagneticButton({
  href,
  children,
  accentClass,
}: {
  href: string;
  children: ReactNode;
  accentClass: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={`group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-medium text-black transition-transform duration-200 ease-out active:scale-[0.97]`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        <div
          className={`absolute inset-0 z-0 origin-bottom translate-y-full scale-y-0 rounded-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-hover:scale-y-100 ${accentClass}`}
        />
      </Link>
    </motion.div>
  );
}

// 2. PARALLAX PORTRAIT WITH 3D TILT
function ParallaxPortrait({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // 3D tilt
  const rotateX = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(x, { stiffness: 100, damping: 30 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / r.width) * 15);
    y.set((-(e.clientY - cy) / r.height) * 15);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="absolute inset-0 lg:relative lg:aspect-[3/4] lg:w-full lg:max-w-[440px]"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Background layer (clipped to rounded corners) */}
        <div className="absolute inset-0 overflow-hidden lg:shadow-2xl lg:rounded-[24px] lg:border lg:border-white/[0.08] bg-gradient-to-br from-emerald-600 via-cyan-500 to-blue-700 bg-[length:200%_200%]" style={{ animation: "gradient-shift 8s ease infinite" }}>
          <style>{`
            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          {/* Desktop gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent hidden lg:block" />
        </div>

        {/* Image layer (NOT clipped, allows bleeding) */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={src}
            alt="Jitin Nair"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 500px"
            className="object-cover scale-[1.05] lg:scale-[1.25] lg:translate-x-[15%] lg:translate-y-[3%] transition-all duration-700 lg:hover:scale-[1.3]"
            style={{ objectPosition: "center 15%" }}
          />
          {/* Mobile dark overlay */}
          <div className="absolute inset-0 bg-black/75 lg:hidden" />
        </div>
      </motion.div>
    </div>
  );
}

// 3. AVATAR POP-OUT FOR CARDS 2 & 3
function AvatarPopOut({ src, glowColor, circleBg }: { src: string, glowColor: string, circleBg: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 80, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / r.width) * 30);
    y.set((-(e.clientY - cy) / r.height) * 30);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Scale the image up from the bottom so the upper body prominently pops out of the top
  const imageClasses = "object-cover object-bottom origin-bottom scale-[1.2] translate-y-[8%]";

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="relative w-full max-w-[280px] lg:max-w-[400px] aspect-square mx-auto mt-8 lg:mt-0" style={{ perspective: 1000 }}>
      <motion.div
        className="relative h-full w-full"
        style={{
           rotateX, 
           rotateY, 
           transformStyle: "preserve-3d",
        }}
      >
        {/* Layer 1: The Circle Base (Clipped) */}
        <div 
          className={`absolute inset-0 rounded-full border border-white/[0.05] ${circleBg} backdrop-blur-2xl overflow-hidden`}
          style={{
             boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1), 0 0 120px ${glowColor}`
          }}
        >
           <Image src={src} alt="Avatar" fill priority sizes="(max-width: 1024px) 280px, 400px" className={imageClasses} />
        </div>

        {/* Layer 2: The Pop-Out Top Half */}
        {/* We clip at exactly 50% height so it perfectly blends into the circle's boundaries for the bottom half */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ clipPath: "polygon(-50% -50%, 150% -50%, 150% 50%, -50% 50%)" }}
        >
           <Image src={src} alt="Avatar popout" fill priority sizes="(max-width: 1024px) 280px, 400px" className={imageClasses} />
        </div>
      </motion.div>
    </div>
  );
}

// 4. MAIN HERO / SCROLLYTELLING COMPONENT
export function ChooserHero() {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !ref.current || !mounted) return;
    
    // Smooth GSAP scroll integration using MatchMedia for responsive animations
    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      if (cardEls.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        cardEls.forEach((card, i) => {
          if (i === cardEls.length - 1) return;
          
          // Pin the current card
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: cardEls[cardEls.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });
          
          // Scale it down as the next one comes up
          const animationProps: any = {
            scale: 0.94,
            ease: "none",
            scrollTrigger: {
              trigger: cardEls[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          };

          // On desktop, add cinematic depth with blur and fade.
          // On mobile, keep 100% visibility and no blur for maximum performance.
          if (isDesktop) {
            animationProps.opacity = 0;
            animationProps.filter = "blur(12px)";
          }

          gsap.to(card, animationProps);
        });
      });
    }, ref);
    
    return () => ctx.revert();
  }, [mounted, reduce]);

  if (!mounted) return null;

  return (
    <div ref={ref} className="relative bg-[#030303] text-neutral-200 selection:bg-white/20">
      
      {/* ──────────────────────────────────────────────────────────
          CARD 1: HERO (SPLIT SCREEN)
      ────────────────────────────────────────────────────────── */}
      <section className="stack-card relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#030303] px-6 lg:flex-row lg:px-12 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
        <div className="z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          <motion.div 
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="relative z-10 flex flex-col pt-20 lg:pt-0"
          >
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Jitin Nair
            </p>
            <h1 className="text-balance text-[2.75rem] font-medium leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[4.5rem]">
              Designing how <br className="hidden lg:block"/> <span className="text-emerald-400">humans learn</span>. <br/>
              Architecting the <br className="hidden lg:block"/> <span className="text-cyan-400">AI</span> that empowers them.
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-neutral-200">
              I split my time between building multi-agent AI systems in production and designing scalable adult learning experiences. Scroll to explore the portfolios.
            </p>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1, duration: 1 }}
               className="mt-16 flex items-center gap-3 text-sm text-neutral-400"
            >
               <ArrowDown className="h-4 w-4 animate-bounce text-white" />
               <span className="text-white">Scroll to explore</span>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT }}
            className="absolute inset-0 z-0 lg:relative lg:z-auto lg:flex lg:justify-end"
          >
             <ParallaxPortrait src="/hero-photo-nobg.png" />
          </motion.div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          CARD 2: AI PORTFOLIO (SPLIT SCREEN LEFT TEXT)
      ────────────────────────────────────────────────────────── */}
      <section className="stack-card relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#030303] px-6 lg:px-12 z-[2] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(34,211,238,0.04)_0%,transparent_50%)] pointer-events-none" />
        <div className="z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col">
            <h2 className="text-balance text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[5.5rem]">
              AI Systems <br className="hidden lg:block"/> Architecture
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-200">
              Multi-agent orchestration in production. 200+ agents built on LangGraph, MCP, and advanced RAG architectures.
            </p>
            <div className="mt-10 self-start">
              <MagneticButton href="/ai" accentClass="bg-cyan-400">
                <Cpu className="h-5 w-5 text-current group-hover:text-black transition-colors" />
                <span className="group-hover:text-black transition-colors">Explore AI Portfolio</span>
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:text-black transition-colors" />
              </MagneticButton>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
             <AvatarPopOut src="/ai_avatar_nobg.png" glowColor="rgba(34,211,238,0.12)" circleBg="bg-cyan-500" />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          CARD 3: L&D PORTFOLIO (SPLIT SCREEN RIGHT TEXT)
      ────────────────────────────────────────────────────────── */}
      <section className="stack-card relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#030303] px-6 lg:px-12 z-[3] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(52,211,153,0.04)_0%,transparent_50%)] pointer-events-none" />
         <div className="z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
             <AvatarPopOut src="/ld_avatar_nobg.png" glowColor="rgba(52,211,153,0.12)" circleBg="bg-emerald-500" />
          </div>
          <div className="flex flex-col order-1 lg:order-2">
            <h2 className="text-balance text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[5.5rem]">
              Learning &amp; <br className="hidden lg:block"/> Development
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-200">
              Adult learning design, proven at scale. Achieving 90%+ completion rates and 70% faster content delivery.
            </p>
            <div className="mt-10 self-start">
              <MagneticButton href="/ld" accentClass="bg-emerald-400">
                <GraduationCap className="h-5 w-5 text-current group-hover:text-black transition-colors" />
                <span className="group-hover:text-black transition-colors">Explore L&D Portfolio</span>
                <ArrowRight className="h-4 w-4 opacity-50 group-hover:text-black transition-colors" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
