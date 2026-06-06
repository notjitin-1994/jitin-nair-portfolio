import {
  Sparkles,
  GraduationCap,
  Video,
  BarChart3,
  Layers,
  Workflow,
  Award,
  Boxes,
  Gauge,
  Languages,
  type LucideIcon,
} from "lucide-react";

// All copy here is drawn verbatim from Jitin's real resume (public/resume.md).
// No invented metrics. The earlier SmartSlate "95% / 100K+ / 50+ countries"
// numbers were hallucinated and are deliberately NOT used.

export const ldImpact: { to: number; prefix?: string; suffix?: string; label: string }[] = [
  { to: 5, suffix: "K+", label: "learners reached" },
  { to: 70, suffix: "%", label: "faster training delivery" },
  { to: 140, prefix: "$", suffix: "K+", label: "training cost saved" },
  { to: 90, suffix: "%+", label: "course completion" },
];

export type LdCaseStudy = {
  id: string;
  org: string;
  context: string;
  title: string;
  challenge: string;
  strategy: string;
  note: string;
  outcomes: { value: string; label: string }[];
};

export const ldCaseStudies: LdCaseStudy[] = [
  {
    id: "smartslate",
    org: "Smartslate",
    context: "smartslate.io · Lead Architect & Designer",
    title: "Solara: The AI-Native Learning Ecosystem for Enterprise Scale",
    challenge:
      "Learning discovery and design is slow, manual, and inconsistent. Organizations rely on fragmented toolstacks, creating a massive bottleneck between business velocity and workforce capability.",
    strategy:
      "Architect Solara, an ecosystem of 7 standalone but cross-integrated AI products. Polaris automates Learning Experience Design (LXD) into blueprints in 45 seconds. Constellation functions as an artifact repository, reviewing PDFs, videos, and notes to instructionally design content and flag gaps against the Polaris blueprint.",
    note: "A modular, cross-integrated infrastructure replacing 7-15 fragmented legacy tools.",
    outcomes: [
      { value: "45 sec", label: "to a validated learning blueprint" },
      { value: "7 / 7", label: "integrated ecosystem products" },
      { value: "Auto", label: "artifact review & gap analysis" },
    ],
  },
  {
    id: "moodys",
    org: "Moody's Ratings",
    context: "Global · Instructional Designer",
    title: "Standardizing how a global ratings agency learns",
    challenge:
      "Complex financial knowledge had to reach teams worldwide, but bespoke video production was slow and inconsistent.",
    strategy:
      "Standardized templates and automated production workflows, so quality scaled without effort scaling with it.",
    note: "Automation turned one-off video builds into a repeatable production pipeline.",
    outcomes: [
      { value: "60%", label: "less content production time" },
      { value: "90%+", label: "module completion rate" },
      { value: "Global", label: "teams and curricula served" },
    ],
  },
  {
    id: "accenture",
    org: "Accenture",
    context: "F&A · HRO · New-joiner · Instructor to Senior Analyst",
    title: "Cutting training time and cost without losing retention",
    challenge:
      "Multiple client teams needed faster upskilling, but training was time-heavy, costly, and hard to audit at scale.",
    strategy:
      "Match the modality to the need (ILT, video, e-learning, gamified), then automate the audit and reporting busywork.",
    note: "A 1,400-line automation suite ran training-needs audits across pan-India teams.",
    outcomes: [
      { value: "70%", label: "less learning time (F&A client)" },
      { value: "54%", label: "knowledge retention maintained" },
      { value: "$140K+", label: "training cost saved" },
    ],
  },
];

export const ldPrinciples = [
  {
    k: "01",
    title: "Design backwards from the business outcome",
    body: "Every program starts from the metric it has to move (time, cost, capability), not the course it produces.",
  },
  {
    k: "02",
    title: "Automate the busywork, keep the craft human",
    body: "I build the pipelines and agents that remove repetitive work, so design effort goes where judgment actually matters.",
  },
  {
    k: "03",
    title: "Measure capability, not attendance",
    body: "Completion is table stakes. I instrument retention, time-to-competency, and behaviour change so learning is provably working.",
  },
  {
    k: "04",
    title: "Meet people in the flow of work",
    body: "The right modality for each audience: microlearning, video, hands-on. Learning that fits the job instead of interrupting it.",
  },
];

export const ldAiLever = {
  heading: "AI as a lever, not a layer",
  body: "I do not just adopt AI tools, I architect them. The same engineering behind 200+ deployed agents removes the real L&D bottlenecks: automated discovery and design, self-running content pipelines, and audits that used to eat weeks.",
  points: [
    "Programme leadership leveraging AI-native design (Smartslate)",
    "Production pipelines that cut build time by 60% (Moody's)",
    "Audit and reporting automation across pan-India teams (Accenture)",
  ],
  link: { label: "Read more about Jitin's AI Systems Architecture", href: "/AI-Systems-Architecture-Portfolio" },
};

export const ldCapabilities = [
  {
    id: "leadership",
    title: "Programme leadership & strategy",
    body: "Orchestrating high-impact learning architectures for global scale.",
    featured: true,
    icon: Sparkles,
  },
  {
    id: "science",
    title: "Instructional science & design",
    body: "Outcome-first design anchored in adult-learning principles (ADDIE, Bloom's).",
    icon: GraduationCap,
  },
  {
    id: "ecosystems",
    title: "Scalable content ecosystems",
    body: "Standardizing production via automated technical pipelines and templates.",
    icon: Video,
  },
  {
    id: "roi",
    title: "Learning analytics & ROI",
    body: "Measuring the P&L impact of learning using Kirkpatrick Level 4 standards.",
    icon: BarChart3,
  },
  {
    id: "support",
    title: "In-flow performance support",
    body: "Right-sized microlearning delivered at the point of need for 90%+ completion.",
    icon: Layers,
  },
  {
    id: "ops",
    title: "Learning operations & AI",
    body: "Automating the busywork (TNA, auditing) to keep the instructional craft human.",
    icon: Workflow,
  },
];

export const ldJourney = [
  {
    year: "2015",
    role: "Senior Executive",
    org: "247.ai",
    note: "Trained new joiners, ran QA and refresher programs. Top performer three months running; identified for leadership within 24 months.",
  },
  {
    year: "2019",
    role: "Instructor to Senior Analyst",
    org: "Accenture",
    note: "Multi-format L&D for client teams. New-joiner training across 16 teams (300+ people), $140K+ saved, and a 1,400-line audit automation suite.",
  },
  {
    year: "2022",
    role: "Instructional Designer",
    org: "Moody's Ratings",
    note: "Global video-based L&D. Automated pipelines cut production time 60% at 90%+ completion.",
  },
  {
    year: "2025",
    role: "AI Systems Architect",
    org: "Independent · Smartslate",
    note: "AI-native learning infrastructure replacing 7-15 fragmented legacy tools. 200+ deployed agents automating L&D from discovery to delivery.",
  },
];

export const ldRecognition: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Award, title: "Fast-tracked leader", body: "3x top performer, identified for leadership within 24 months." },
  { icon: Boxes, title: "Dual fluency", body: "Learning science (ADDIE, Bloom's) and AI engineering (LangGraph, RAG, MCP)." },
  { icon: Gauge, title: "Outcome record", body: "70% faster training, $140K+ saved, 90%+ completion across roles." },
  { icon: Languages, title: "Built for global teams", body: "English, Malayalam, Hindi, Tamil, and Kannada." },
];
