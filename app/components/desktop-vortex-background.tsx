"use client";

import { Vortex } from "@/components/ui/vortex";

interface DesktopVortexBackgroundProps {
  children: React.ReactNode;
}

export function DesktopVortexBackground({ children }: DesktopVortexBackgroundProps) {
  return (
    <Vortex
      particleCount={250}
      baseHue={180} // Cyan
      rangeY={400}
      baseSpeed={0.05}
      rangeSpeed={0.5}
      baseRadius={0.6}
      rangeRadius={1.2}
      containerClassName="absolute inset-0 z-0 pointer-events-none"
      className="w-full h-full"
    >
      {children}
    </Vortex>
  );
}
