import {
  Bot,
  ShieldCheck,
  Network,
  Gauge,
  Globe2,
  PiggyBank,
  Users,
  Code2,
  Trophy,
  Repeat,
  GraduationCap,
  Brain,
  Wrench,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// Every figure here is drawn verbatim from public/resume.md. No invented metrics.

export type WorkMetric = {
  // For animated count-ups. `to` is the numeric target; format wraps it.
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
};

export type ProgressStat = {
  label: string;
  // 0-100 fill value used for the animated bar.
  value: number;
  display: string;
  caption: string;
};

export type WorkRole = {
  id: string;
  org: string;
  monogram: string;
  role: string;
  location: string;
  period: string;
  tenure: string;
  // Narrative written to land with L&D leadership hiring teams.
  lede: string;
  metrics: WorkMetric[];
  bars?: ProgressStat[];
  achievements: string[];
  stack: string[];
  // Visual treatment selector so each dossier reads differently.
  accentNote: string;
};

export const workSummary = [
  { to: 10, suffix: "+ yrs", label: "across learning and AI" },
  { to: 50, suffix: "K+", label: "learners reached" },
  { to: 140, prefix: "$", suffix: "K+", label: "training cost saved" },
  { to: 200, suffix: "+", label: "AI agents deployed" },
];

export const careerArc = [
  {
    year: "2015",
    title: "Where the instinct started",
    org: "247.ai",
    scope: "Training new joiners on the floor",
  },
  {
    year: "2019",
    title: "L&D as a discipline",
    org: "Accenture",
    scope: "Multi-format design across client teams",
  },
  {
    year: "2022",
    title: "Learning at global scale",
    org: "Moody's Ratings",
    scope: "Standardised pipelines for worldwide teams",
  },
  {
    year: "2025",
    title: "Architecting the systems",
    org: "Independent",
    scope: "AI that automates discovery to delivery",
  },
];

export const workRoles: WorkRole[] = [
  {
    id: "independent",
    org: "Independent Consultant",
    monogram: "AI",
    role: "AI Systems Architect",
    location: "Bangalore, India",
    period: "Mar 2025 - Present",
    tenure: "Current",
    lede: "I build the AI infrastructure that removes the slowest parts of learning and operations. The same engineering that runs autonomous agent fleets now automates L&D from discovery through delivery, with expert validation kept in the loop so quality never trades for speed.",
    metrics: [
      { to: 200, suffix: "+", label: "autonomous agents deployed", icon: Bot },
      { to: 147, suffix: "", label: "agent instances sharing tools via MCP", icon: Network },
      { to: 96, suffix: "%", label: "fleet coverage on truth-verification", icon: ShieldCheck },
    ],
    achievements: [
      "Architected and deployed 200+ autonomous AI agents across multi-agent orchestration platforms.",
      "Shipped production systems end to end: an autonomous trading engine (Predator), a multi-agent governance platform (Reality-Check), and an AI-native LMS (SmartSlate).",
      "Built Model Context Protocol integrations that let 147 agent instances share tools and context safely.",
      "Reached 96% fleet coverage for truth-verification protocols across distributed agent networks, eliminating fabricated outputs.",
    ],
    stack: ["LangGraph", "Python", "TimescaleDB", "Claude", "ChatGPT", "FastAPI", "MCP", "RAG"],
    accentNote: "Systems and governance",
  },
  {
    id: "moodys",
    org: "Moody's Ratings",
    monogram: "M",
    role: "Instructional Designer",
    location: "Bangalore, India",
    period: "Sep 2022 - Mar 2025",
    tenure: "2.5 years",
    lede: "I took video-based learning at a global ratings agency from slow, bespoke builds to a repeatable production system. Standardised templates and automated workflows meant quality scaled across worldwide teams without effort scaling alongside it.",
    metrics: [
      { to: 60, suffix: "%", label: "less content production time", icon: Gauge },
      { to: 90, suffix: "%+", label: "module completion rate", icon: Globe2 },
    ],
    bars: [
      {
        label: "Production time",
        value: 40,
        display: "60% faster",
        caption: "Automation and template standardisation cut build time on every module.",
      },
      {
        label: "Completion rate",
        value: 90,
        display: "90%+",
        caption: "Interactive modules held attention through complex financial concepts.",
      },
    ],
    achievements: [
      "Led video-based learning development for a global ratings agency, creating standardised templates and automated workflows.",
      "Built scalable production pipelines that changed how financial knowledge is disseminated across global teams.",
      "Cut content production time by 60% through automation and template standardisation.",
      "Designed interactive modules for complex financial concepts that sustained 90%+ completion rates.",
    ],
    stack: ["Articulate Storyline", "Video Production", "SCORM", "LMS Administration", "ADDIE"],
    accentNote: "Scale and standardisation",
  },
  {
    id: "accenture",
    org: "Accenture",
    monogram: "A",
    role: "Instructor Analyst to Senior Analyst",
    location: "Bangalore, India",
    period: "Jan 2019 - Sep 2022",
    tenure: "3.75 years",
    lede: "Across multiple client teams I matched the modality to the need, then automated the audit and reporting work that used to eat weeks. The result was faster upskilling, retained knowledge, and six figures of measured savings, all of it auditable at scale.",
    metrics: [
      { to: 140, prefix: "$", suffix: "K+", label: "training cost saved", icon: PiggyBank },
      { to: 300, suffix: "+", label: "employees on New Joiner Training", icon: Users },
      { to: 1400, suffix: "+", label: "lines of VBA automating TNA audits", icon: Code2 },
    ],
    bars: [
      {
        label: "F&A learning time",
        value: 30,
        display: "70% reduction",
        caption: "Video-based redesign cut time to competency while holding 54% knowledge retention.",
      },
      {
        label: "Knowledge retention",
        value: 54,
        display: "54% maintained",
        caption: "Retention held even as learning time fell sharply.",
      },
    ],
    achievements: [
      "Managed learning needs for 50+ employees, running TNA and delivering content to close skill gaps.",
      "Built courses across modalities (ILT, video, e-learning, gamified) grounded in instructional design theory and adult-learning principles.",
      "Led a video-based redesign for an F&A client, cutting learning time 70% at 54% retention and saving roughly $80,000 in training time.",
      "Built a hybrid upskilling model for an HRO client that held retention while saving roughly $60,000 in training time.",
      "Designed the New Joiner Training program: 4 modules, 20+ topics, 50+ assessments, now used by 16 teams and 300+ employees.",
      "Wrote a 1,400-line MS Excel VBA suite for TNA audits, generating pivot tables, charts, and automated feedback emails, used pan-India.",
    ],
    stack: ["Excel VBA", "Video Production", "Instructional Design", "E-Learning", "TNA"],
    accentNote: "Impact and automation",
  },
  {
    id: "247ai",
    org: "247.ai",
    monogram: "24",
    role: "Senior Executive",
    location: "Bangalore, India",
    period: "May 2015 - Dec 2017",
    tenure: "2.5 years",
    lede: "The training instinct started on the support floor. Beyond handling customer operations for a US retail giant, I trained new joiners and ran quality and refresher programs until they could operate independently. The performance got noticed fast.",
    metrics: [
      { to: 3, suffix: "x", label: "top performer, consecutive months", icon: Trophy },
      { to: 24, suffix: " mo", label: "to be identified for leadership", icon: Repeat },
    ],
    achievements: [
      "Managed back-end customer support for a US retail and eCommerce giant, resolving seller-buyer issues for a seamless customer experience.",
      "Trained new joiners on process and ran quality assurance and refresher programs until independent operation.",
      "Awarded top performer for three consecutive months and identified for a leadership position within 24 months.",
    ],
    stack: ["Customer Support", "QA", "Training", "Problem Solving"],
    accentNote: "Foundation and recognition",
  },
];

export const competencyDomains: {
  title: string;
  icon: LucideIcon;
  skills: string[];
}[] = [
  {
    title: "Instructional design & learning architecture",
    icon: GraduationCap,
    skills: [
      "ADDIE & Agile for L&D",
      "AI-native learning design",
      "Video-based learning",
      "SCORM / xAPI",
      "Learning analytics",
      "Competency frameworks",
      "Microlearning",
    ],
  },
  {
    title: "AI & agentic systems",
    icon: Brain,
    skills: [
      "Multi-agent orchestration",
      "LLM integration",
      "RAG & vector databases",
      "Model Context Protocol",
      "Autonomous decision systems",
    ],
  },
  {
    title: "Full-stack development",
    icon: Code2,
    skills: ["React & Next.js", "Python & FastAPI", "TypeScript", "PostgreSQL & TimescaleDB", "Real-time systems"],
  },
  {
    title: "Enterprise automation",
    icon: Wrench,
    skills: ["Browser automation", "Workflow orchestration", "CI/CD pipelines", "Docker", "System integration"],
  },
];

export const languages = [
  { name: "English", level: "Native, professional" },
  { name: "Malayalam", level: "Native" },
  { name: "Hindi", level: "Fluent, professional" },
  { name: "Tamil", level: "Conversational" },
  { name: "Kannada", level: "Conversational" },
];

export const education = {
  degree: "Bachelor of Commerce (B.Com)",
  school: "Sindhi College of Commerce",
  location: "Bangalore, India",
  period: "2012 - 2015",
  notes: [
    "Built the foundation in business administration and analytical thinking.",
    "Self-taught programming through college and shipped first web applications.",
  ],
  icon: Sparkles,
};
