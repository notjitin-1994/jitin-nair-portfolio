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
  { to: 50, suffix: "K+", label: "learners reached" },
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
    title: "An L&D engine that designs as fast as the business moves",
    challenge:
      "Learning discovery and design is slow, manual, and inconsistent. It is the bottleneck between a business need and a solution that ships.",
    strategy:
      "Build an AI-native platform that automates discovery through delivery, with human-in-the-loop validation so quality is never traded for speed.",
    note: "Multi-provider AI (Claude, ChatGPT, Perplexity) with expert oversight at every stage.",
    outcomes: [
      { value: "45 sec", label: "to generate a tailored learning report" },
      { value: "500+", label: "automated jobs run every day" },
      { value: "7-stage", label: "AI-guided, expert-validated discovery" },
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
    "Discovery to delivery automated, with expert validation (Smartslate)",
    "Production pipelines that cut build time by 60% (Moody's)",
    "Audit and reporting automation across pan-India teams (Accenture)",
  ],
  link: { label: "See the AI systems behind it", href: "/AI-Systems-Architecture-Portfolio" },
};

export const ldCapabilities: { title: string; body: string; featured?: boolean; icon: LucideIcon }[] = [
  {
    title: "AI-native learning design",
    body: "Learning systems where AI does the heavy lifting and experts guarantee the quality.",
    featured: true,
    icon: Sparkles,
  },
  { title: "Instructional design", body: "ADDIE, Bloom's taxonomy, and adult-learning principles as the backbone.", icon: GraduationCap },
  { title: "Video-based learning", body: "Standardized, scalable production for complex subject matter.", icon: Video },
  { title: "Learning analytics", body: "Completion, retention, and capability, instrumented and acted on.", icon: BarChart3 },
  { title: "Microlearning", body: "Right-sized learning delivered in the flow of work.", icon: Layers },
  { title: "Automation & ops", body: "VBA, workflow orchestration, and multi-agent pipelines that remove bottlenecks.", icon: Workflow },
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
    note: "AI-native learning infrastructure and 200+ deployed agents, automating L&D from discovery to delivery.",
  },
];

export const ldRecognition: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Award, title: "Fast-tracked leader", body: "3x top performer, identified for leadership within 24 months." },
  { icon: Boxes, title: "Dual fluency", body: "Learning science (ADDIE, Bloom's) and AI engineering (LangGraph, RAG, MCP)." },
  { icon: Gauge, title: "Outcome record", body: "70% faster training, $140K+ saved, 90%+ completion across roles." },
  { icon: Languages, title: "Built for global teams", body: "English, Malayalam, Hindi, Tamil, and Kannada." },
];
