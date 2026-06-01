"use client";

import { Vortex } from "@/components/ui/vortex";

interface LdVortexBackgroundProps {
  children?: React.ReactNode;
}

export function LdVortexBackground({ children }: LdVortexBackgroundProps) {
  return (
    <Vortex
      particleCount={250}
      baseHue={145}
      rangeY={400}
      baseSpeed={0.05}
      rangeSpeed={0.5}
      baseRadius={0.6}
      rangeRadius={1.2}
      backgroundColor="#0a0a0f"
      containerClassName="absolute inset-0 z-0 pointer-events-none"
      className="w-full h-full"
    >
      {children}
    </Vortex>
  );
}
