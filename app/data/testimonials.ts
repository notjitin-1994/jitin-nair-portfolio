export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Jitin's AI agent architecture reduced our manual workload by 80%. The multi-agent system seamlessly integrated with our existing tools and started delivering value from day one.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechScale Inc.",
  },
  {
    quote: "The HITL learning platform he built transformed our entire L&D operation. What used to take weeks now happens in hours — with better quality and consistency.",
    author: "Marcus Rivera",
    role: "Head of Learning & Development",
    company: "Smartslate",
  },
  {
    quote: "RevOS eliminated our paper chaos overnight. We track every job card, every part, and every customer interaction digitally now. Game changer for our workshops.",
    author: "Arjun Patel",
    role: "Managing Director",
    company: "GlitchZero Automotive",
  },
  {
    quote: "His understanding of both instructional design and AI is rare. He doesn't just build tools — he understands how people learn, and designs AI systems around that.",
    author: "Emily Nakamura",
    role: "Director of Training",
    company: "Moody's Analytics",
  },
  {
    quote: "The Reality-Check governance system gave us confidence to scale our AI fleet. 96% compliance across 147 agents in under 3 minutes — that's not incremental improvement, that's transformation.",
    author: "David Okonkwo",
    role: "CTO",
    company: "AgentForge Labs",
  },
];
