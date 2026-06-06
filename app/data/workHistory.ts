import {
  Bot,
  Video,
  Headphones,
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
  Timer,
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
  logo: LucideIcon;
  logoSrc?: string;
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
  { to: 5, suffix: "K+", label: "learners trained" },
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
    logo: Bot,
    role: "AI-Enabled L&D Architect & Platform Designer",
    location: "Bangalore, India",
    period: "Mar 2025 - Present",
    tenure: "Current",
    lede: "I architect the AI infrastructure that eliminates weeks of manual L&D discovery and design. By building AI-native platforms like Solara, I compress the discovery-to-delivery cycle into minutes while maintaining rigorous instructional standards through human-in-the-loop validation.",
    metrics: [
      { to: 45, suffix: "s", label: "to a validated learning blueprint", icon: Sparkles },
      { to: 500, suffix: "+", label: "automated daily discovery jobs", icon: Network },
      { to: 7, suffix: "", label: "AI products in the Solara ecosystem", icon: Bot },
    ],
    achievements: [
      "Architected Smartslate, an AI-native L&D platform that compresses programme discovery and design from weeks to under 45 seconds.",
      "Built a 7-stage contextual discovery pipeline (Polaris) integrating Claude, ChatGPT, and Perplexity for pedagogically sound design documentation.",
      "Developed 'Constellation', an automated artifact repository that reviews multi-format media (PDFs, videos, notes) to flag instructional design gaps.",
      "Integrated ADDIE, Bloom's Taxonomy, and performance-mapping frameworks as the engineering backbone of autonomous L&D systems.",
    ],
    stack: ["Solara Polaris", "Constellation", "LangGraph", "MCP", "RAG", "Next.js", "Python"],
    accentNote: "AI-Native L&D Architecture",
  },
  {
    id: "moodys",
    org: "Moody's Ratings",
    monogram: "M",
    logo: Video,
    logoSrc: "/logos/moodys.svg",
    role: "Instructional Designer | Lead: Video Based Learning",
    location: "Bangalore, India",
    period: "Sep 2022 - Mar 2025",
    tenure: "2.5 years",
    lede: "I transformed video-based learning for a global ratings agency from slow, bespoke production into a scalable, automated engine. Standardized templates and automated workflows enabled rapid global delivery without sacrificing financial rigor or compliance.",
    metrics: [
      { to: 60, suffix: "%", label: "less content production time", icon: Gauge },
      { to: 90, suffix: "%+", label: "module completion rate", icon: Globe2 },
    ],
    bars: [
      {
        label: "Production Efficiency",
        value: 40,
        display: "60% saved",
        caption: "Systematic automation and template standardization cut build cycles.",
      },
      {
        label: "Curricula Completion",
        value: 90,
        display: "90%+",
        caption: "Chunked content design and adult learning principles drove high engagement.",
      },
    ],
    achievements: [
      "Led global video-based learning development, creating the standardized infrastructure for international business units.",
      "Reduced production time by 60% via automated pipelines, allowing for faster response to business velocity.",
      "Achieved 90%+ completion on complex financial curricula through iterative feedback loops and chunked design.",
      "Built scalable content frameworks that enabled the team to absorb increased demand without linear headcount growth.",
    ],
    stack: ["Articulate Storyline", "Standardized Templates", "SCORM", "LMS Admin", "Video Ops"],
    accentNote: "Global Scale & Standardization",
  },
  {
    id: "accenture",
    org: "Accenture",
    monogram: "A",
    logo: Users,
    logoSrc: "/logos/accenture.svg",
    role: "Instructor Analyst → Senior Analyst",
    location: "Bangalore, India",
    period: "Jan 2019 - Sep 2022",
    tenure: "3.75 years",
    lede: "I owned L&D for 300+ employees across 16 client teams, pioneering blended learning models that delivered measurable six-figure savings. I bridged the gap between manual upskilling and automated auditing, ensuring retention while slashing training time.",
    metrics: [
      { to: 140, prefix: "$", suffix: "K+", label: "training cost saved", icon: PiggyBank },
      { to: 70, suffix: "%", label: "less learning time (F&A)", icon: Timer },
      { to: 1400, suffix: "+", label: "lines of VBA automating audits", icon: Code2 },
    ],
    bars: [
      {
        label: "Time-to-Competency",
        value: 30,
        display: "70% faster",
        caption: "Blended models reduced learning time while holding knowledge retention.",
      },
      {
        label: "Program Scalability",
        value: 100,
        display: "Portfolio Standard",
        caption: "New Joiner Training adopted as the standard onboarding for F&A and HRO.",
      },
    ],
    achievements: [
      "Designed a New Joiner Training suite (4 modules, 20+ topics, 50+ assessments) adopted as the portfolio standard.",
      "Delivered $140K+ in measured cost avoidance across F&A and HRO client upskilling programs.",
      "Engineered a 1,400-line VBA automation suite to eliminate weeks of manual TNA reporting overhead.",
      "Maintained 54% knowledge retention parity despite cutting training time by 70% for a key F&A client.",
    ],
    stack: ["VBA Automation", "Blended Learning", "TNA", "E-Learning", "Gamification"],
    accentNote: "Measured ROI & Automation",
  },
  {
    id: "247ai",
    org: "247.ai",
    monogram: "24",
    logo: Headphones,
    logoSrc: "/logos/247ai.svg",
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
    title: "Programme leadership & strategy",
    icon: GraduationCap,
    skills: [
      "L&D Leadership",
      "Stakeholder Management",
      "ROI Measurement",
      "Resource Allocation",
      "Global Remit Management",
      "Agile for L&D",
    ],
  },
  {
    title: "Instructional science & design",
    icon: Brain,
    skills: [
      "ADDIE Model",
      "Bloom's Taxonomy",
      "Curriculum Architecture",
      "Adult Learning Theory",
      "Blended Learning",
      "Gamification",
    ],
  },
  {
    title: "Development & operations",
    icon: Code2,
    skills: [
      "Video-Based Learning",
      "E-Learning Development",
      "Articulate Storyline",
      "Standardized Templates",
      "LMS Administration",
      "SCORM / xAPI",
    ],
  },
  {
    title: "AI & technical architecture",
    icon: Wrench,
    skills: [
      "AI-Native L&D Design",
      "TNA Automation",
      "Workflow Orchestration",
      "Agentic Workflows",
      "VBA / Custom Scripting",
      "RAG Architecture",
    ],
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
