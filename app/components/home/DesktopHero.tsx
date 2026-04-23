"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DesktopVortexBackground } from "../../components/desktop-vortex-background";
import { AnimatedBackground } from "../../components/animated-background";
import { Terminal as TerminalComponent } from "../../components/terminal";

export function DesktopHero({ onUnlock }: { onUnlock?: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check if image is already cached/loaded
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
    // Fallback: show image after 3 seconds even if onLoad hasn't fired
    const fallbackTimer = setTimeout(() => {
      setImageLoaded(true);
    }, 3000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
     <section className="relative min-h-screen flex items-center overflow-hidden px-4 bg-[#0a0a0f]">
      {/* Vortex particles - desktop only (transparent, overlays on dark bg) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <DesktopVortexBackground>
          <div className="absolute inset-0" /> {/* Empty div to satisfy children prop */}
        </DesktopVortexBackground>
      </div>

      {/* Animated background - mobile only */}
      <div className="md:hidden absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto py-4">
        <h1 className="sr-only">Jitin Nair | AI Systems Architect & Agentic AI Expert</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Left Column - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1 h-[480px]"
          >
            <TerminalComponent
              username="jitin"
              typingSpeed={45}
              initialDelay={600}
              isMobile={false}
              onUnlock={onUnlock}
            />
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[480px] h-[480px]">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-3xl scale-110" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  ref={imgRef as any}
                  src="/hero-photo.jpg"
                  alt="Jitin Nair"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
     </section>
  );
}
