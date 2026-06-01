"use client";

import { Vortex } from "@/components/ui/vortex";

interface LdVortexBackgroundProps {
  children?: React.ReactNode;
}

export function LdVortexBackground({ children }: LdVortexBackgroundProps) {
  return (
    <Vortex
      particleCount={220}
      baseHue={150}
      rangeHue={16}
      saturation={68}
      lightness={56}
      subtleGlow
      rangeY={420}
      baseSpeed={0.0}
      rangeSpeed={0.32}
      baseRadius={0.6}
      rangeRadius={1.1}
      backgroundColor="transparent"
      containerClassName="absolute inset-0 z-0 pointer-events-none"
      className="w-full h-full"
    >
      {children}
    </Vortex>
  );
}
