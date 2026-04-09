"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// Custom hook for detecting mobile
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Hook to detect reduced motion preference
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return reducedMotion;
}

// Hook for strict one-card-per-scroll carousel
export function useStrictCarousel(containerRef: React.RefObject<HTMLDivElement>, itemCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const accumulatedDelta = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || itemCount <= 1) return;

    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollLeft = container.scrollLeft;
      const itemWidth = container.firstElementChild?.clientWidth || container.clientWidth * 0.88;
      const gap = 16; // matches the gap-4 (16px) in the container
      const newIndex = Math.round(scrollLeft / (itemWidth + gap));
      const clampedIndex = Math.min(Math.max(newIndex, 0), itemCount - 1);

      setActiveIndex(clampedIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef, itemCount]);

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container || isScrolling.current) return;

    isScrolling.current = true;
    const itemWidth = container.firstElementChild?.clientWidth || container.clientWidth * 0.88;
    const gap = 16;

    container.scrollTo({
      left: index * (itemWidth + gap),
      behavior: 'smooth'
    });
    setActiveIndex(index);

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
    }, 500);
  }, [containerRef]);

  // Handle wheel events for strict one-scroll-per-card
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelTimeout: NodeJS.Timeout;
    const WHEEL_THRESHOLD = 80; // Increased threshold

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      // Only handle horizontal scrolling or significant vertical
      const deltaX = e.deltaX || 0;
      const deltaY = e.deltaY || 0;
      const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

      accumulatedDelta.current += Math.abs(delta);

      if (accumulatedDelta.current > WHEEL_THRESHOLD) {
        e.preventDefault();
        accumulatedDelta.current = 0;

        const direction = delta > 0 ? 1 : -1;
        const newIndex = Math.min(Math.max(activeIndex + direction, 0), itemCount - 1);

        if (newIndex !== activeIndex) {
          scrollToIndex(newIndex);
        }
      }

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        accumulatedDelta.current = 0;
      }, 200);
    };

    // Touch handling for one-swipe-per-card
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;

      // Only handle horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        e.preventDefault();
        const direction = deltaX > 0 ? 1 : -1;
        const newIndex = Math.min(Math.max(activeIndex + direction, 0), itemCount - 1);

        if (newIndex !== activeIndex) {
          scrollToIndex(newIndex);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(wheelTimeout);
      clearTimeout(scrollTimeout.current);
    };
  }, [containerRef, itemCount, activeIndex, scrollToIndex]);

  return { activeIndex, scrollToIndex };
}

// Skeleton Loader Component
export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-white/5 rounded", className)} />
  );
}

// Marquee Component for smooth perpetual motion
export function Marquee({
  children,
  speed = 30,
  direction = "left",
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-5">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-4"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="flex shrink-0 gap-4">
          {children}
        </div>
        <div className="flex shrink-0 gap-4">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Bento Grid Components
export function BentoCard({
  children,
  className = "",
  spotlight = true,
}: {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-[2px] transition-all duration-500 hover:border-cyan-500/30 hover:bg-white/[0.05] ${className}`}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,211,238,0.15), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

// Individual Journey Card Component with Scroll Animations
export function JourneyCard({ item, index, isLast }: {
  item: any;
  index: number;
  isLast: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: index * 0.1 }}
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Desktop Layout */}
      <div className={`hidden md:flex w-full items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>

        {/* Card Container */}
        <motion.div
          className={`w-[calc(50%-60px)] ${isEven ? 'pr-0' : 'pl-0'}`}
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="relative p-8 rounded-3xl border border-white/[0.08] backdrop-blur-xl overflow-hidden cursor-pointer group text-left"
            animate={{
              backgroundColor: isHovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
              borderColor: isHovered ? "rgba(34, 211, 238, 0.3)" : "rgba(255,255,255,0.08)",
              y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated Gradient Border */}
            <motion.div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              style={{ padding: '1px' }}
            >
              <div className="w-full h-full rounded-3xl bg-[#0a0a0f]" />
            </motion.div>

            {/* Parallax Background Image */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url(${item.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)',
                scale: 1.2
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/90 via-[#0a0a0f]/80 to-transparent" />

            {/* Glowing Accent */}
            <motion.div
              className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50`}
              animate={{ opacity: isHovered ? 1 : 0.3 }}
            />

            <div className="relative z-10">
              {/* Year Badge with Glow */}
              <motion.div
                className={`flex items-center gap-3 mb-4 ${isEven ? '' : 'justify-end'}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.span
                  className="px-3 py-1.5 rounded-full bg-cyan-400/15 text-cyan-400 text-xs font-mono font-bold border border-cyan-400/30"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.25)" }}
                >
                  {item.year}
                </motion.span>
                <span className="text-slate-500 text-sm">{item.period}</span>
              </motion.div>

              {/* Title with Reveal Animation */}
              <motion.h3
                className="text-xl font-bold mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {item.title}
              </motion.h3>

              <motion.p
                className="text-cyan-400 text-sm mb-4 font-medium"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
              >
                {item.role}
              </motion.p>

              <motion.p
                className="text-slate-400 text-sm leading-relaxed mb-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {item.description}
              </motion.p>

              {/* Highlights with Stagger */}
              <motion.div
                className={`flex flex-wrap gap-2 ${isEven ? '' : 'justify-end'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {item.highlights.map((highlight: string, i: number) => (
                  <motion.span
                    key={highlight}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(34, 211, 238, 0.15)" }}
                    className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-slate-300 backdrop-blur-sm transition-colors"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Icon Hub with Connection */}
        <div className="w-24 flex-shrink-0 flex items-center justify-center relative">
          {/* Connector Line */}
          <motion.div
            className={`absolute h-0.5 bg-cyan-400 ${isEven ? 'left-0 right-1/2' : 'left-1/2 right-0'}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ originX: isEven ? 0 : 1 }}
          />

          {/* Pulsing Icon Container */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="relative z-10"
          >
            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-cyan-400/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Icon */}
            <motion.div
              className="relative w-14 h-14 rounded-2xl bg-[#0a0a0f] border-2 border-cyan-400/60 flex items-center justify-center shadow-lg shadow-cyan-400/30"
              whileHover={{
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
                borderColor: "rgba(34, 211, 238, 1)"
              }}
            >
              <item.icon className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Empty Space */}
        <div className="w-[calc(50%-60px)]" />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex items-start gap-5">
        {/* Timeline with Progress */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative z-10 w-12 h-12 rounded-xl bg-[#0a0a0f] border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-400/20"
          >
            <item.icon className="w-5 h-5 text-cyan-400" />
          </motion.div>

          {!isLast && (
            <motion.div
              className="w-0.5 flex-1 min-h-[60px] bg-cyan-400"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ originY: 0 }}
            />
          )}
        </div>

        {/* Mobile Card */}
        <motion.div
          className="flex-1 pb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="relative p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden"
            whileHover={{ scale: 1.02, borderColor: "rgba(34, 211, 238, 0.2)" }}
          >
            <motion.div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `url(${item.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/90 via-[#0a0a0f]/80 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-cyan-400/15 text-cyan-400 text-xs font-mono font-bold border border-cyan-400/30">
                  {item.year}
                </span>
                <span className="text-slate-500 text-xs">{item.period}</span>
              </div>

              <h3 className="text-base font-bold mb-1">{item.title}</h3>
              <p className="text-cyan-400 text-xs mb-2">{item.role}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">{item.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {item.highlights.slice(0, 3).map((highlight: string) => (
                  <span
                    key={highlight}
                    className="px-2 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-[10px] text-slate-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
