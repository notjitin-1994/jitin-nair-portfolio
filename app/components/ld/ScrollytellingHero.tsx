"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { useMounted } from "./primitives";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const TOTAL_FRAMES = 91;
const FRAME_PATH = "https://lymilwegnuzimngpawik.supabase.co/storage/v1/object/public/course-images/hero-frames/hero-frames/frame_";

const SCROLL_ACTS = [
  {
    position: "bottom-left" as const,
    eyebrow: "Jitin Nair",
    headline: "Strategic Learning & Development Leadership",
    sub: "",
  },
  {
    position: "top-right" as const,
    eyebrow: "The Mission",
    headline: "Transforming corporate education into a measurable engine for growth.",
    sub: "",
  },
  {
    position: "bottom-right" as const,
    eyebrow: "Proven Impact",
    headline: "",
    sub: "",
    stats: [
      { value: "5,000+", label: "Global Learners" },
      { value: "70%", label: "Time-to-Competency Cut" },
      { value: "$140K+", label: "Saved Annually" },
      { value: "10+", label: "Years of Leadership" },
    ],
  },
  {
    position: "top-left" as const,
    eyebrow: "Core Expertise",
    headline: "Mastering instructional design, leveraging AI, and scaling global training architectures.",
    sub: "",
  },
];

const POSITIONS = {
  "top-left": "top-[40dvh] md:top-[20%] left-0 right-0 mx-auto md:mx-0 md:left-[8%] md:right-auto text-center md:text-left",
  "top-right": "top-[40dvh] md:top-[20%] left-0 right-0 mx-auto md:mx-0 md:right-[8%] md:left-auto text-center md:text-right",
  "bottom-left": "top-[40dvh] md:top-auto md:bottom-[25%] left-0 right-0 mx-auto md:mx-0 md:left-[8%] md:right-auto text-center md:text-left",
  "bottom-right": "top-[40dvh] md:top-auto md:bottom-[25%] left-0 right-0 mx-auto md:mx-0 md:right-[8%] md:left-auto text-center md:text-right",
};

function useFramePreloader() {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (imagesRef.current.length > 0) return; // already initialized
    
    const imgs = new Array(TOTAL_FRAMES).fill(null);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `${FRAME_PATH}${String(i + 1).padStart(4, "0")}.webp`;
      imgs[i] = img;
    }
    imagesRef.current = imgs;
  }, []);

  return imagesRef;
}

function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full h-full rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_80px_rgba(16,185,129,0.3)] flex items-end justify-center">
      
      {/* Decorative Geometric Shapes */}
      {/* 1. Medium Square */}
      <div 
        data-geo-shape
        className="absolute -left-8 -top-8 z-30 h-14 w-14 drop-shadow-[0_0_15px_rgba(16,185,129,0.7)]"
      >
        <svg data-geo-svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <rect x="15" y="15" width="70" height="70" rx="16" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="4" />
        </svg>
      </div>
      
      {/* 2. Medium Triangle */}
      <div 
        data-geo-shape
        className="absolute -left-12 top-16 z-30 h-12 w-12 drop-shadow-[0_0_15px_rgba(16,185,129,0.7)]"
      >
        <svg data-geo-svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <polygon points="50,15 90,85 10,85" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 3. Small Triangle */}
      <div 
        data-geo-shape
        className="absolute left-10 -top-12 z-30 h-8 w-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
      >
        <svg data-geo-svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <polygon points="50,15 90,85 10,85" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="5" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 4. Small Square */}
      <div 
        data-geo-shape
        className="absolute -left-4 top-36 z-30 h-10 w-10 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
      >
        <svg data-geo-svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <rect x="20" y="20" width="60" height="60" rx="14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="4" />
        </svg>
      </div>

      {/* 5. Extra Small Square (New) */}
      <div 
        data-geo-shape
        className="absolute left-16 top-24 z-30 h-5 w-5 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
      >
        <svg data-geo-svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <rect x="25" y="25" width="50" height="50" rx="10" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="6" />
        </svg>
      </div>

      {/* 6. Extra Small Triangle (New) */}
      <div 
        data-geo-shape
        className="absolute left-24 -top-6 z-30 h-6 w-6 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
      >
        <svg data-geo-svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <polygon points="50,20 85,80 15,80" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinejoin="round" />
        </svg>
      </div>

      <img
        data-portrait-img
        src="/hero-photo-nobg.png"
        alt="Jitin Nair"
        className="absolute bottom-0 w-[130%] max-w-none origin-bottom drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-10"
        style={{ 
          left: "-15%",
          clipPath: "inset(-100% -100% 0 -100% round 0 0 1.5rem 1.5rem)"
        }}
      />
    </div>
  );
}

function HeroConsole() {
  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-6 px-5 pt-8 md:flex-row md:gap-12 lg:gap-16 md:pt-0">
      {/* Left: Bleeding Portrait */}
      <div className="h-[280px] w-full max-w-[280px] shrink-0 md:h-[440px] md:w-[440px]">
        <HeroPortrait />
      </div>
      
      {/* Right: Glassmorphic Marketing Copy */}
      <div className="flex h-auto w-full max-w-[280px] flex-col justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl md:h-[440px] md:w-[440px] md:gap-6 md:p-10">
        <div>
          <h2 className="mb-1 text-3xl font-bold tracking-tight text-white md:mb-2 md:text-5xl">
            Jitin Nair
          </h2>
          <p className="text-lg font-medium text-emerald-400 md:text-xl">
            Learning & Development Professional
          </p>
        </div>
        
        <div className="h-px w-16 bg-white/20"></div>
        
        <p className="max-w-md text-base leading-relaxed text-neutral-300 md:text-lg">
          I engineer scalable learning architectures that directly drive business performance. Fusing instructional design with cutting-edge technical execution to transform how modern organizations learn, adapt, and scale.
        </p>
      </div>
    </div>
  );
}

function ScrollytellingExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useFramePreloader();
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const currentFrameRef = useRef(-1);

  const paintFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    // Hide the LCP image permanently once the canvas is actively painting
    const lcp = document.getElementById("lcp-fallback");
    if (lcp && lcp.style.opacity !== "0") {
      lcp.style.opacity = "0";
    }
  }, [imagesRef]);

  // Resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      if (currentFrameRef.current >= 0) {
        paintFrame(currentFrameRef.current);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [paintFrame]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=500%",
        pin: true,
        pinSpacing: true,
        pinType: "fixed",
        scrub: 1,
        anticipatePin: 1,
      },
    });

    const frameObj = { frame: 0 };
    tl.to(
      frameObj,
      {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        duration: 11.5,
        onUpdate: () => {
          const idx = Math.round(frameObj.frame);
          if (idx !== currentFrameRef.current) {
            currentFrameRef.current = idx;
            paintFrame(idx);
          }
        },
      },
      0
    );

    const actEls = gsap.utils.toArray<HTMLElement>("[data-act]", container);
    
    // Explicitly set start states with premium vertical directional blur
    actEls.forEach((el, i) => {
      const startY = 80;

      if (i === 0) {
        gsap.set(el, { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }); // First text visible immediately
      } else {
        gsap.set(el, { opacity: 0, x: 0, y: startY, filter: "blur(12px)" }); // Others hidden with blur
      }
    });

    actEls.forEach((el, i) => {
      const exitY = -80; // Sweeps out vertically, continuing the scroll motion
      
      const actStart = i * 2.2;
      const fadeIn = 0.8;
      const hold = 1.0;
      const fadeOut = 0.6;

      if (i === 0) {
        // First text is already visible on load, just fade it out directionally
        tl.to(
          el,
          { opacity: 0, y: exitY, filter: "blur(8px)", duration: fadeOut, ease: "power2.inOut" },
          actStart + fadeIn + hold
        );
      } else {
        tl.to(
          el,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: fadeIn, ease: "power3.out" },
          actStart
        );
        if (i < SCROLL_ACTS.length - 1) {
          tl.to(
            el,
            { opacity: 0, y: exitY, filter: "blur(8px)", duration: fadeOut, ease: "power2.inOut" },
            actStart + fadeIn + hold
          );
        } else {
          tl.to(
            el,
            { opacity: 0, y: exitY, filter: "blur(8px)", duration: fadeOut, ease: "power2.inOut" },
            actStart + fadeIn + hold
          );
        }
      }
    });

    const journeyEl = journeyRef.current;
    if (journeyEl) {
      gsap.set(journeyEl, { opacity: 0, scale: 0.92, y: 50, filter: "blur(12px)" });
      const journeyStart = SCROLL_ACTS.length * 2.2;
      tl.to(
        journeyEl,
        { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.4, ease: "power3.out" },
        journeyStart
      );

      const portraitImg = journeyEl.querySelector<HTMLElement>("[data-portrait-img]");
      if (portraitImg) {
        gsap.set(portraitImg, { scale: 0.9, y: 40 });
        tl.to(
          portraitImg,
          { scale: 1, y: 0, duration: 1.6, ease: "power2.out" },
          journeyStart + 0.2
        );
      }

      const shapes = journeyEl.querySelectorAll<HTMLElement>("[data-geo-shape]");
      if (shapes.length > 0) {
        gsap.set(shapes, { opacity: 0, y: 40, rotation: -45, scale: 0.8 });
        tl.to(
          shapes,
          { 
            opacity: 1, 
            y: 0, 
            rotation: 15, 
            scale: 1, 
            duration: 1.8, 
            ease: "back.out(1.5)", 
            stagger: 0.15 
          },
          journeyStart + 0.3
        );
      }

      const svgs = journeyEl.querySelectorAll<HTMLElement>("[data-geo-svg]");
      if (svgs.length > 0) {
        gsap.to(svgs, {
          y: -12,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.4,
            from: "random",
          },
        });
      }

      tl.to(journeyEl, { duration: 1.5 }, journeyStart + 1.2);
    }

    const scrim = container.querySelector<HTMLElement>("[data-scrim]");
    if (scrim) {
      gsap.set(scrim, { opacity: 0 });
      const scrimStart = SCROLL_ACTS.length * 2.2 - 0.5;
      tl.to(scrim, { opacity: 0.7, duration: 1.5, ease: "power1.in" }, scrimStart);
    }
    
    setGsapLoaded(true);
  }, { scope: containerRef, dependencies: [paintFrame] });

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a0f]"
    >
        <h1 className="sr-only">
          Jitin Nair · Learning &amp; Development leader turning learning into
          measurable business performance
        </h1>

      {/* Sub-second LCP: First frame standard image, behind canvas */}
      <div id="lcp-fallback" aria-hidden className="absolute inset-0 z-0 will-change-transform transition-opacity duration-500">
        <Image
          src="https://lymilwegnuzimngpawik.supabase.co/storage/v1/object/public/course-images/hero-frames/hero-frames/frame_0001.webp"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          priority
          fetchPriority="high"
          sizes="100vw"
        />
      </div>

      {/* Canvas — scrubs through frames, covering the LCP image when ready */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        aria-hidden
      />

      {/* Rule of Thirds grid overlay (visual guide, very subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
        style={{
          opacity: 0,
        }}
      >
        <div className="absolute left-1/3 top-0 h-full w-px bg-white/5" />
        <div className="absolute left-2/3 top-0 h-full w-px bg-white/5" />
        <div className="absolute left-0 top-1/3 h-px w-full bg-white/5" />
        <div className="absolute left-0 top-2/3 h-px w-full bg-white/5" />
      </div>

      {/* Contrast improving dark wash to ensure text readability */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-black/50 mix-blend-multiply"
      />

      {/* Brand accent translucent overlay for premium contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] mix-blend-overlay bg-emerald-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,42,29,0.3)_60%,rgba(10,10,15,0.85)_100%)]"
      />
      
      {/* Text acts */}
      {SCROLL_ACTS.map((act, i) => {
        const positionClasses = POSITIONS[act.position];
        return (
          <div
            key={i}
            data-act={i}
            className={`pointer-events-none absolute z-10 w-full max-w-[90%] sm:max-w-lg md:max-w-[720px] opacity-0 md:px-0 ${positionClasses}`}
          >
            {/* Eyebrow */}
            {act.eyebrow && (
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-400/80 md:text-xs">
                {act.eyebrow}
              </div>
            )}

            {/* Headline */}
            {act.headline && (
              <h2
                className="mt-3 font-serif text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:mt-4 md:text-4xl lg:text-5xl"
                style={{
                  whiteSpace: "pre-line",
                  textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                }}
              >
                {act.headline}
              </h2>
            )}

            {/* Stats grid (Act 3) */}
            {act.stats && (
              <div className="mt-4 grid grid-cols-2 gap-3 md:mt-5 md:gap-4">
                {act.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 backdrop-blur-md md:rounded-2xl md:px-5 md:py-4"
                  >
                    <div
                      className="font-serif text-xl font-medium tracking-tight text-white md:text-2xl lg:text-3xl"
                      style={{
                        textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-neutral-400 md:text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Subtitle */}
            {act.sub && (
              <p
                className="mt-3 text-base leading-relaxed text-neutral-300 md:mt-4 md:text-lg"
                style={{
                  textShadow: "0 1px 10px rgba(0,0,0,0.5)",
                }}
              >
                {act.sub}
              </p>
            )}
          </div>
        );
      })}

      {/* Final 2-Column Console */}
      <div
        ref={journeyRef}
        className="absolute left-1/2 top-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 opacity-0 flex justify-center"
      >
        <HeroConsole />
      </div>

      {/* Darkening scrim for journey readability */}
      <div
        data-scrim
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[15] bg-[#0a0a0f] opacity-0"
      />

      {/* Persistent bottom gradient for visual grounding */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/3 bg-gradient-to-t from-[#0a0a0f]/80 to-transparent"
      />
    </section>
  );
}

/* ── Reduced Motion Fallback ──────────────────────────────────── */

function ReducedMotionHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#0a0a0f] pb-4 pt-4">
      <h1 className="sr-only">
        Jitin Nair · Learning &amp; Development leader turning learning into
        measurable business performance
      </h1>

      <div aria-hidden className="absolute inset-0 will-change-transform">
        <Image
          src="https://lymilwegnuzimngpawik.supabase.co/storage/v1/object/public/course-images/hero-frames/hero-frames/frame_0001.webp"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          priority
          fetchPriority="high"
          sizes="100vw"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent"
      />
      <div aria-hidden className="absolute inset-0 bg-[#0a0a0f]/40" />

      <div className="relative z-10 w-full flex justify-center pb-20">
        <HeroConsole />
      </div>
    </section>
  );
}

export function ScrollytellingHero() {
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const reduced = mounted ? reducedMotion : false;

  if (!mounted || reduced) {
    return <ReducedMotionHero />;
  }

  return <ScrollytellingExperience />;
}
