"use client";

/**
 * Inline SVG logo marks for companies in the Journey section.
 * Each component accepts className (used for sizing: w-5 h-5 / w-6 h-6).
 * Colors are fixed to each brand's actual identity regardless of className color utilities.
 */

/** Moody's Ratings — navy wordmark "M" in #003A70 on white circle, or white on dark */
export function MoodysLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Moody's Ratings"
    >
      {/* Navy backdrop circle */}
      <circle cx="20" cy="20" r="19" fill="#0028A1" />
      {/* White "M" lettermark */}
      <path
        d="M8 29V11h3.6l5.4 11.2L22.4 11H26v18h-3.2V17.2l-4.4 9.2h-2.8l-4.4-9.2V29H8Z"
        fill="#FFFFFF"
      />
      {/* Moody's accent line */}
      <rect x="8" y="30.5" width="24" height="1.5" rx="0.75" fill="#00A651" />
    </svg>
  );
}

/** Accenture — the iconic purple ">" chevron mark */
export function AccentureLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Accenture"
    >
      {/* Dark background */}
      <rect width="40" height="40" rx="10" fill="#1A0533" />
      {/* Purple chevron ">" */}
      <path
        d="M11 10 L29 20 L11 30"
        stroke="#A100FF"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** [24]7.ai — bracket notation wordmark in their teal/cyan brand color */
export function TwentyFourSevenLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="[24]7.ai"
    >
      {/* Dark background */}
      <rect width="48" height="40" rx="8" fill="#0A1628" />
      {/* [24]7 text mark */}
      {/* Left bracket */}
      <path d="M7 10 L4 10 L4 30 L7 30" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* "24" */}
      <text
        x="9"
        y="27"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="14"
        fontWeight="700"
        fill="#FFFFFF"
      >
        24
      </text>
      {/* Right bracket */}
      <path d="M31 10 L34 10 L34 30 L31 30" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* "7" */}
      <text
        x="36"
        y="27"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="14"
        fontWeight="700"
        fill="#22D3EE"
      >
        7
      </text>
    </svg>
  );
}
