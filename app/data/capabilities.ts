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
    items: ["ADDIE & Bloom's Taxonomy", "Kirkpatrick Evaluation", "Training Needs Analysis", "Competency Frameworks"],
  },
  right: {
    title: "Learning infrastructure",
    icon: Brain,
    items: ["AI-Native Platform Design", "Multi-agent Orchestration", "Learning Analytics & ROI", "Automated Ops Pipelines"],
  },
  intersection: {
    title: "L&D Orchestration",
    body: "I architect the systems that remove the real L&D bottlenecks: automated stakeholder discovery, self-running content pipelines, and audits that used to eat weeks of manual effort.",
  },
};

export type TileViz =
  | { kind: "gauge"; fill: number; label: string }
  | { kind: "donut"; value: number; label: string }
  | { kind: "bar"; value: number; label: string }
  | { kind: "columns"; segments: { v: number; label: string }[] }
  | { kind: "checks"; items: string[] }
  | { kind: "sparkline"; to: number; label: string };

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
  bgSeed: string;
  viz: TileViz;
};

export const capabilityDomains: CapabilityDomain[] = [
  {
    id: "programme-leadership",
    title: "Programme leadership & strategy",
    icon: Sparkles,
    featured: true,
    statement: "Orchestrating high-impact learning architectures for global scale.",
    detail:
      "I build and lead L&D functions that move measurable business outcomes. From architecting AI-native platforms like Solara to managing multi-national curricula, I focus on the strategic alignment of learning with business velocity.",
    expert: ["Programme Leadership", "Stakeholder Management", "ROI Measurement", "L&D Strategy"],
    advanced: ["Agile for L&D", "Change Management", "Talent Development"],
    proofValue: "10+ yrs",
    proofLabel: "designing architectures that move business metrics",
    bgSeed: "leadership-strategy-workshop-99",
    viz: { kind: "gauge", fill: 0.92, label: "strategic alignment score" },
  },
  {
    id: "instructional-design",
    title: "Instructional science & design",
    icon: GraduationCap,
    statement: "Outcome-first design anchored in adult-learning principles.",
    detail: "Applying ADDIE, Bloom's Taxonomy, and performance-mapping to ensure every intervention is pedagogically sound and instructionally rigorous.",
    expert: ["ADDIE Model", "Bloom's Taxonomy", "Instructional Design", "Blended Learning"],
    advanced: ["Microlearning Design", "Gamification", "Curriculum Mapping"],
    proofValue: "70%",
    proofLabel: "less learning time while maintaining retention",
    bgSeed: "instructional-science-nodes-21",
    viz: { kind: "donut", value: 70, label: "delivery efficiency" },
  },
  {
    id: "content-ecosystems",
    title: "Scalable content ecosystems",
    icon: Video,
    statement: "Standardizing production via automated technical pipelines.",
    detail: "I turn bespoke content creation into a repeatable production engine using standardized templates and automated video/e-learning workflows.",
    expert: ["Video-Based Learning", "Standardized Templates", "E-Learning Development", "Articulate Storyline"],
    advanced: ["SCORM / xAPI", "LMS Administration", "Asset Management"],
    proofValue: "60%",
    proofLabel: "less content production time (Moody's Ratings)",
    bgSeed: "content-production-pipeline-08",
    viz: { kind: "bar", value: 60, label: "production saved" },
  },
  {
    id: "analytics",
    title: "Learning analytics & ROI",
    icon: BarChart3,
    statement: "Measuring the P&L impact of every learning dollar spent.",
    detail: "I instrument retention and capability metrics using Kirkpatrick Level 4 standards, translating learning data into operational hours and hard cost savings.",
    expert: ["Kirkpatrick Evaluation", "Learning Analytics", "ROI Measurement", "Cost-Impact Modeling"],
    advanced: ["Data Visualization", "xAPI Tracking", "Predictive Analytics"],
    proofValue: "$140K+",
    proofLabel: "training cost saved & measured (Accenture)",
    bgSeed: "business-impact-charts-44",
    viz: { kind: "columns", segments: [{ v: 80, label: "Cost Savings" }, { v: 60, label: "Efficiency Gain" }] },
  },
  {
    id: "performance-support",
    title: "In-flow performance support",
    icon: Layers,
    statement: "Right-sized learning delivered at the point of need.",
    detail: "Designing microlearning and just-in-time assets that fit into the workflow instead of interrupting it, ensuring high completion and immediate application.",
    expert: ["Performance Support", "Microlearning Design", "In-Flow Delivery", "ILT Facilitation"],
    advanced: ["Mobile-first learning", "Just-in-time content", "Knowledge Management"],
    proofValue: "90%+",
    proofLabel: "module completion rate on complex curricula",
    bgSeed: "workflow-integration-support-63",
    viz: { kind: "checks", items: ["In the flow", "Audit-ready", "90%+ Completion"] },
  },
  {
    id: "learning-ops",
    title: "Learning operations & AI",
    icon: Workflow,
    statement: "Automating the busywork to keep the craft human.",
    detail: "Leveraging 1,400-line automation suites and AI-native design to remove the bottlenecks in TNA, auditing, and design sprints.",
    expert: ["Training Needs Analysis", "Automation Pipelines", "AI-Native L&D Design", "VBA / Workflow Ops"],
    advanced: ["Agentic Workflows", "LMS Integration", "Process Engineering"],
    proofValue: "45 sec",
    proofLabel: "from discovery to learning blueprint",
    bgSeed: "automation-ops-pipeline-90",
    viz: { kind: "sparkline", to: 45, label: "seconds to blueprint" },
  },
];

// Refined Skill Matrix for L&D Leadership roles
export const skillMatrix: { category: string; expert: string[]; advanced: string[] }[] = [
  {
    category: "L&D Leadership",
    expert: ["Programme Leadership", "Stakeholder Management", "ROI Measurement", "Resource Allocation", "Global Remit Management"],
    advanced: ["Talent Strategy", "Vendor Management", "Budgeting", "Change Management"],
  },
  {
    category: "Learning Science",
    expert: ["Instructional Design", "ADDIE", "Bloom's Taxonomy", "Kirkpatrick Evaluation", "Curriculum Architecture"],
    advanced: ["Gamification", "Blended Learning", "Social Learning", "Adult Learning Theory"],
  },
  {
    category: "Development & Ops",
    expert: ["Video-Based Learning", "E-Learning Development", "Articulate Storyline", "Standardized Templates", "LMS Administration"],
    advanced: ["SCORM / xAPI", "H5P", "Accessibility (WCAG)", "Authoring Tools"],
  },
  {
    category: "AI & Automation",
    expert: ["AI-Native L&D Design", "TNA Automation", "Prompt Engineering", "Workflow Orchestration", "VBA / Custom Scripting"],
    advanced: ["LLM Integration", "Agentic Workflows", "RAG Architecture", "Analytics Pipelines"],
  },
];
