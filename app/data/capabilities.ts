import {
  Sparkles,
  GraduationCap,
  Video,
  BarChart3,
  Layers,
  Workflow,
  Brain,
  type LucideIcon,
} from "lucide-react";

// All skills and tools are drawn from public/resume.md (Core Competencies +
// Technical Skills table). Proof metrics are real outcomes from prior roles.

export const capHero = {
  stats: [
    { to: 6, suffix: "", label: "capability domains" },
    { to: 50, suffix: "+", label: "skills and tools" },
    { to: 10, suffix: "+ yrs", label: "compounding the craft" },
    { to: 5, suffix: "", label: "languages for global teams" },
  ],
};

export const dualFluency = {
  left: {
    title: "Learning science",
    icon: GraduationCap,
    items: ["ADDIE & adult-learning theory", "Bloom's taxonomy", "Measurement & analytics", "Competency frameworks"],
  },
  right: {
    title: "AI & systems engineering",
    icon: Brain,
    items: ["Multi-agent orchestration", "RAG & vector retrieval", "Model Context Protocol", "Production automation"],
  },
  intersection: {
    title: "AI-native L&D",
    body: "The rare overlap that lets me remove the real bottlenecks: automated discovery and design, self-running content pipelines, and audits that used to eat weeks.",
  },
};

export type CapabilityDomain = {
  id: string;
  title: string;
  icon: LucideIcon;
  featured?: boolean;
  statement: string;
  detail: string;
  expert: string[];
  advanced: string[];
  proofValue: string;
  proofLabel: string;
};

export const capabilityDomains: CapabilityDomain[] = [
  {
    id: "ai-native",
    title: "AI-native learning design",
    icon: Sparkles,
    featured: true,
    statement: "Learning systems where AI does the heavy lifting and experts guarantee the quality.",
    detail:
      "I architect platforms that automate discovery through delivery with human-in-the-loop validation, so quality is never traded for speed.",
    expert: ["Multi-provider LLM integration", "Human-in-the-loop design", "Agentic workflows", "Prompt engineering"],
    advanced: ["RAG & vector retrieval", "Chain-of-verification", "MCP tool sharing"],
    proofValue: "45 sec",
    proofLabel: "to a tailored learning report (SmartSlate)",
  },
  {
    id: "instructional-design",
    title: "Instructional design & architecture",
    icon: GraduationCap,
    statement: "ADDIE, Bloom's, and adult-learning principles behind every build.",
    detail: "Outcome-first design across modalities, matched to the audience and the number it has to move.",
    expert: ["ADDIE", "Adult-learning theory", "Agile for L&D", "Competency frameworks"],
    advanced: ["Bloom's taxonomy", "Gamification", "H5P"],
    proofValue: "70%",
    proofLabel: "less learning time (Accenture F&A)",
  },
  {
    id: "video",
    title: "Video-based learning",
    icon: Video,
    statement: "Standardized, scalable production for complex subject matter.",
    detail: "Templates and automated pipelines that scale quality across global teams without effort scaling with it.",
    expert: ["Articulate Storyline", "Video production", "Standardized templates"],
    advanced: ["SCORM/xAPI", "LMS administration"],
    proofValue: "60%",
    proofLabel: "less production time (Moody's)",
  },
  {
    id: "analytics",
    title: "Learning analytics & measurement",
    icon: BarChart3,
    statement: "Completion is table stakes. I measure retention and tie it to dollars.",
    detail: "Programs instrumented against business metrics, translated into operational hours and P&L impact.",
    expert: ["Kirkpatrick L2 to L4", "Retention measurement", "Cost-impact modeling"],
    advanced: ["xAPI analytics", "Dashboards & reporting"],
    proofValue: "$140K+",
    proofLabel: "training cost removed, measured",
  },
  {
    id: "microlearning",
    title: "Microlearning & performance support",
    icon: Layers,
    statement: "Right-sized learning delivered in the flow of work.",
    detail: "Minutes, not hours: targeted sprints plus embedded support people reach for at the point of need.",
    expert: ["Microlearning design", "Performance support", "In-flow delivery"],
    advanced: ["Mobile-first learning", "Just-in-time content"],
    proofValue: "Audit-ready",
    proofLabel: "compliance learning in regulated environments",
  },
  {
    id: "automation",
    title: "Automation & learning ops",
    icon: Workflow,
    statement: "The engineering that turns one-off L&D work into self-running systems.",
    detail: "VBA, workflow orchestration, and multi-agent pipelines that remove the bottlenecks slowing a function down.",
    expert: ["Workflow orchestration", "VBA automation", "Multi-agent pipelines"],
    advanced: ["Playwright", "n8n", "CI/CD", "Docker"],
    proofValue: "1,400-line",
    proofLabel: "VBA suite automating audits pan-India",
  },
];

// Straight from the resume Technical Skills table. Honest Expert / Advanced tiers.
export const skillMatrix: { category: string; expert: string[]; advanced: string[] }[] = [
  {
    category: "AI & LLMs",
    expert: ["Claude", "ChatGPT", "Gemini", "LangGraph", "RAG architecture", "Prompt engineering"],
    advanced: ["LangChain", "Fine-tuning", "Vector DBs", "Chain-of-verification"],
  },
  {
    category: "Instructional design",
    expert: ["ADDIE", "Video-based learning", "Agile for L&D", "Learning analytics", "Microlearning"],
    advanced: ["SCORM/xAPI", "H5P", "Articulate Storyline", "Gamification", "Competency frameworks"],
  },
  {
    category: "Full-stack development",
    expert: ["React", "Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
    advanced: ["Node.js", "GraphQL", "Supabase", "Prisma", "Redis"],
  },
  {
    category: "Automation & infrastructure",
    expert: ["Playwright", "Docker", "GitHub Actions", "Linux/Systemd"],
    advanced: ["Kubernetes", "Terraform", "n8n", "Temporal", "AWS/GCP"],
  },
];
