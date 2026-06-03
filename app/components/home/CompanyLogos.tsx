"use client";

/**
 * Real company logo images served from /public/logos/.
 * These are rendered inside white pill containers in JourneyCard
 * so the dark-on-white logos remain visible against the portfolio's
 * dark background.
 *
 * Each component is used as item.icon in the journey data, but the
 * JourneyCard in shared.tsx checks item.logoSrc instead and renders
 * a dedicated logo container — these exports are kept for fallback only.
 */

export function MoodysLogo({ className }: { className?: string }) {
  return (
    <img
      src="/logos/moodys.svg"
      alt="Moody's Ratings"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}

export function AccentureLogo({ className }: { className?: string }) {
  return (
    <img
      src="/logos/accenture.svg"
      alt="Accenture"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}

export function TwentyFourSevenLogo({ className }: { className?: string }) {
  return (
    <img
      src="/logos/247ai.svg"
      alt="[24]7.ai"
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
