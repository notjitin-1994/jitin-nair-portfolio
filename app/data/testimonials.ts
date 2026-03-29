export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "The multi-agent system seamlessly integrated with our existing tools and started delivering value from day one. Manual workload dropped significantly within weeks.",
    author: "Engineering Lead",
    role: "VP of Engineering",
    company: "Enterprise Client",
  },
  {
    quote: "The HITL learning platform transformed our entire L&D operation. What used to take weeks now happens in hours — with better quality and consistency.",
    author: "L&D Director",
    role: "Head of Learning & Development",
    company: "EdTech Client",
  },
  {
    quote: "RevOS eliminated our paper chaos overnight. We track every job card, every part, and every customer interaction digitally now.",
    author: "Workshop Owner",
    role: "Managing Director",
    company: "GlitchZero Automotive",
  },
  {
    quote: "A rare combination of instructional design expertise and deep AI engineering. Systems that are built around how people actually learn and work.",
    author: "Training Director",
    role: "Director of Training",
    company: "Financial Services Client",
  },
  {
    quote: "Fleet-wide AI governance deployed in under 3 minutes with 96% compliance. That's not incremental improvement — that's operational transformation.",
    author: "Technical Lead",
    role: "CTO",
    company: "AI Infrastructure Client",
  },
];
