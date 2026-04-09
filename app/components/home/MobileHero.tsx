"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedBackground } from "../../components/animated-background";
import { Terminal as TerminalComponent } from "../../components/terminal";
import { useReducedMotion, SkeletonLoader } from "./shared";

export function MobileHero({ onUnlock }: { onUnlock?: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Check if image is already cached/loaded
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
    // Fallback: show image after 2 seconds even if onLoad hasn't fired
    const fallbackTimer = setTimeout(() => {
      setImageLoaded(true);
    }, 2000);
    return () => clearTimeout(fallbackTimer);
  }, [mounted]);

  // Prevent hydration mismatch - render placeholder on server
  if (!mounted) {
    return (
      <section className="relative min-h-[100svh] flex flex-col justify-end pb-4 pt-4 overflow-hidden bg-[#0a0a0f]">
        <div className="relative z-10 px-5">
          <div className="max-w-3xl mx-auto">
            <SkeletonLoader className="h-[380px] w-full" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-4 pt-4 overflow-hidden">
      <AnimatedBackground />
      {/* Photo Background - Cinematic Ken Burns + Fade */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ opacity: 0 }}
        animate={{
          opacity: imageLoaded ? 1 : 0,
          scale: reducedMotion ? 1 : (imageLoaded ? 1 : 1.05)
        }}
        transition={{
          duration: reducedMotion ? 0.3 : 2.0,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <Image
          ref={imgRef}
          src="/hero-photo.jpg"
          alt="Jitin Nair"
          fill
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
          onLoad={() => setImageLoaded(true)}
          priority
        />
      </motion.div>

      {/* Gradient Overlays - Fade in with image */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent transition-opacity duration-500"
        style={{ opacity: imageLoaded ? 1 : 0 }}
      />
      <div
        className="absolute inset-0 bg-[#0a0a0f]/40 transition-opacity duration-500"
        style={{ opacity: imageLoaded ? 1 : 0 }}
      />

      {/* Content - Terminal UI */}
      <div className="relative z-10 px-5">
        <motion.div
          initial={false}
          animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 30 }}
          transition={{ duration: reducedMotion ? 0.3 : 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
          style={{ willChange: 'opacity, transform' }}
        >
          <TerminalComponent
            username="jitin"
            typingSpeed={45}
            initialDelay={600}
            className="max-w-none"
            isMobile={true}
            onUnlock={onUnlock}
          />
        </motion.div>
      </div>
    </section>
  );
}
