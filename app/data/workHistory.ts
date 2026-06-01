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
  // Short label that frames what the role proves.
  accentNote: string;
};

export const workSummary = [
  { to: 10, suffix: "+ yrs", label: "across L&D and AI" },
  { to: 50, suffix: "K+", label: "learners trained" },
  { to: 140, prefix: "$", suffix: "K+", label: "in training cost removed" },
  { to: 200, suffix: "+", label: "AI agents in production" },
];

export const careerArc = [
  {
    year: "2015",
    title: "Learned to teach under pressure",
    org: "247.ai",
    scope: "Training every new hire on a live support floor",
  },
  {
    year: "2019",
    title: "Made L&D a measurable discipline",
    org: "Accenture",
    scope: "Multi-format program design across client teams",
  },
  {
    year: "2022",
    title: "Scaled learning across a global org",
    org: "Moody's Ratings",
    scope: "Standardized production for worldwide teams",
  },
  {
    year: "2025",
    title: "Started building the systems",
    org: "Independent",
    scope: "AI that automates discovery through delivery",
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
    lede: "I build the AI infrastructure that strips weeks out of learning and operations. The agent fleets and pipelines I run now carry the heavy lifting of L&D, from discovery to delivery, with expert review wired in so speed never costs quality.",
    metrics: [
      { to: 200, suffix: "+", label: "autonomous agents in production", icon: Bot },
      { to: 147, suffix: "", label: "agent instances sharing tools via MCP", icon: Network },
      { to: 96, suffix: "%", label: "truth-verification fleet coverage", icon: ShieldCheck },
    ],
    achievements: [
      "Architected and deployed 200+ autonomous AI agents across multi-agent orchestration platforms.",
      "Shipped three production systems end to end: an autonomous trading engine, a multi-agent governance platform, and an AI-native LMS.",
      "Built Model Context Protocol integrations so 147 agent instances share tools and context without stepping on each other.",
      "Drove truth-verification coverage to 96% across the fleet, ending fabricated outputs at the source.",
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
    lede: "I turned video learning at a global ratings agency from slow, one-off builds into a production line. Templates and automation let quality scale across worldwide teams while the effort behind each module dropped sharply.",
    metrics: [
      { to: 60, suffix: "%", label: "less content production time", icon: Gauge },
      { to: 90, suffix: "%+", label: "module completion rate", icon: Globe2 },
    ],
    bars: [
      {
        label: "Production time",
        value: 40,
        display: "60% faster",
        caption: "Automation and standardized templates cut build time on every module.",
      },
      {
        label: "Completion rate",
        value: 90,
        display: "90%+",
        caption: "Interactive design held attention through dense financial material.",
      },
    ],
    achievements: [
      "Led video-based learning for a global ratings agency, building the templates and workflows the function now runs on.",
      "Stood up production pipelines that changed how financial knowledge moves across global teams.",
      "Cut content production time by 60% through automation and standardization.",
      "Designed interactive modules for dense financial topics that held 90%+ completion.",
    ],
    stack: ["Articulate Storyline", "Video Production", "SCORM", "LMS Administration", "ADDIE"],
    accentNote: "Scale and standardization",
  },
  {
    id: "accenture",
    org: "Accenture",
    monogram: "A",
    role: "Instructor Analyst to Senior Analyst",
    location: "Bangalore, India",
    period: "Jan 2019 - Sep 2022",
    tenure: "3.75 years",
    lede: "Across multiple client teams I matched each program to the outcome it had to move, then automated the audit work that used to swallow weeks. The result was faster upskilling, retained knowledge, and six figures in measured savings, all of it provable.",
    metrics: [
      { to: 140, prefix: "$", suffix: "K+", label: "training cost removed", icon: PiggyBank },
      { to: 300, suffix: "+", label: "people on the New Joiner program", icon: Users },
      { to: 1400, suffix: "+", label: "lines of VBA automating audits", icon: Code2 },
    ],
    bars: [
      {
        label: "F&A learning time",
        value: 30,
        display: "70% lower",
        caption: "A video-first redesign cut time to competency while retention held.",
      },
      {
        label: "Knowledge retention",
        value: 54,
        display: "54% held",
        caption: "Retention stayed steady even as learning time fell sharply.",
      },
    ],
    achievements: [
      "Owned learning needs for 50+ employees, running TNA and closing skill gaps with targeted content.",
      "Built across every modality (ILT, video, e-learning, gamified), grounded in instructional design and adult-learning theory.",
      "Redesigned F&A training as video-first: 70% less learning time at 54% retention, roughly $80,000 saved.",
      "Built a hybrid upskilling model for an HRO client that held retention and saved roughly $60,000.",
      "Designed the New Joiner Training program (4 modules, 20+ topics, 50+ assessments), now used by 16 teams and 300+ people.",
      "Wrote a 1,400-line VBA suite that automated TNA audits, pivots, charts, and feedback emails across pan-India teams.",
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
    lede: "The L&D instinct started on a live support floor. Alongside running operations for a US retail giant, I trained every new hire and owned quality and refresher coaching until they could run solo. The results got noticed fast.",
    metrics: [
      { to: 3, suffix: "x", label: "top performer, months running", icon: Trophy },
      { to: 24, suffix: " mo", label: "to the leadership track", icon: Repeat },
    ],
    achievements: [
      "Ran back-end support for a US retail and eCommerce giant, resolving seller and buyer issues end to end.",
      "Trained every new hire on process and owned QA and refresher coaching until they operated independently.",
      "Named top performer three months running and flagged for leadership inside 24 months.",
    ],
    stack: ["Customer Support", "QA", "Training", "Problem Solving"],
    accentNote: "Where it started",
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
    "Taught myself to code through college and shipped my first web applications.",
  ],
  icon: Sparkles,
};
