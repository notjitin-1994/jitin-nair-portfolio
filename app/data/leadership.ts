import {
  Target,
  Workflow,
  Gauge,
  Waypoints,
  Scale,
  Rocket,
  UsersRound,
  LineChart,
  type LucideIcon,
} from "lucide-react";

// Every metric here is real, drawn from public/resume.md:
//   Moody's: 60% production time cut, 90%+ completion, led IDs & content developers,
//            work governed by the regulatory framework for the ratings business.
//   Accenture: 70% less F&A learning time, 54% retention, $80K + $60K = $140K saved,
//              HIPAA context, 1,400-line VBA audit suite, 300+ people / 16 teams.
//   SmartSlate: AI-native modular ecosystem, 45-sec reports, 500+ daily jobs, 7-stage discovery.
// The 90-day rollout in the Change Management study is methodology (a playbook),
// labelled as such, not a claimed historical adoption statistic.

export const leadingHero = {
  stats: [
    { to: 140, prefix: "$", suffix: "K+", label: "training cost removed" },
    { to: 70, suffix: "%", label: "faster training delivery" },
    { to: 60, suffix: "%", label: "less production time" },
    { to: 54, suffix: "%", label: "knowledge retention held" },
  ],
};

export type Principle = {
  k: string;
  icon: LucideIcon;
  title: string;
  body: string;
  proof: string;
};

export const leadingPrinciples: Principle[] = [
  {
    k: "01",
    icon: Target,
    title: "Design backwards from the business outcome",
    body: "Every program starts from the number it has to move, not the course it produces.",
    proof: "$140K removed at Accenture",
  },
  {
    k: "02",
    icon: Workflow,
    title: "Automate the busywork, keep the craft human",
    body: "I build the pipelines and agents that remove repetitive work, so design effort goes where judgment matters.",
    proof: "60% faster production at Moody's",
  },
  {
    k: "03",
    icon: Gauge,
    title: "Measure capability, not attendance",
    body: "Completion is table stakes. I instrument retention and tie it to dollars so learning is provably working.",
    proof: "54% retention, tracked to P&L",
  },
  {
    k: "04",
    icon: Waypoints,
    title: "Meet people in the flow of work",
    body: "The right modality at the point of need, so learning fits the job instead of interrupting it.",
    proof: "45-second answers at Smartslate",
  },
];

export type Outcome = { value: string; label: string };

export type LeadershipCase = {
  id: string;
  competency: string;
  icon: LucideIcon;
  title: string;
  org: string;
  context: string;
  imageSeed: string;
  problem: string;
  solution: string;
  leadership: string;
  outcomes: Outcome[];
};

export const leadershipCases: LeadershipCase[] = [
  {
    id: "business-alignment",
    competency: "Business alignment",
    icon: Scale,
    title: "Compliance that protects the business without halting it",
    org: "Moody's Ratings · Accenture",
    context: "Regulated financial environments",
    imageSeed: "regulated-finance-compliance-9021",
    problem:
      "In a regulated environment, a compliance gap is a balance-sheet risk. At Moody's the work sat inside the regulatory framework governing the ratings business; at Accenture it ran against HIPAA. The default reflex was long, disruptive classroom training that pulled analysts off the floor for hours.",
    solution:
      "I made the case for performance over seat time: a short, targeted micro-learning sprint paired with a performance-support tool people reach for in the moment of need. Less time lost, more behavior changed, and a learning record built to be audit-ready from the start.",
    leadership:
      "I secured buy-in across compliance, legal, and business-unit heads who wanted the big classroom build, then negotiated the leaner solution in their language: operational hours preserved and risk demonstrably covered.",
    outcomes: [
      { value: "60%", label: "less content production time (Moody's)" },
      { value: "90%+", label: "module completion rate" },
      { value: "$140K+", label: "training cost removed (Accenture)" },
    ],
  },
  {
    id: "change-management",
    competency: "Change management",
    icon: Rocket,
    title: "A 90-day playbook for landing a modern learning ecosystem",
    org: "Smartslate · operating playbook",
    context: "From fragmented legacy tools to learning in the flow of work",
    imageSeed: "modern-learning-platform-4417",
    problem:
      "Most organizations run a fragmented stack: clunky legacy LMS, siloed knowledge, low engagement. People cannot find the answer when the job actually demands it.",
    solution:
      "I lead the phased rollout of a modular, AI-native ecosystem that pulls knowledge into the flow of work and adapts to behavior and skill gaps. The platform is real; the rollout is a discipline I run to the same playbook every time.",
    leadership:
      "Adoption is won or lost on change management, not features. I run a champion-led, manager-enabled rollout and prove value with usage data before asking for scale.",
    outcomes: [
      { value: "45 sec", label: "to generate a tailored learning report" },
      { value: "500+", label: "automated jobs run every day" },
      { value: "7-stage", label: "AI-guided, expert-validated discovery" },
    ],
  },
  {
    id: "team-leadership",
    competency: "Team leadership",
    icon: UsersRound,
    title: "Turning instructional designers into learning experience engineers",
    org: "Moody's Ratings",
    context: "Leading designers and content developers through an automation shift",
    imageSeed: "design-team-studio-7733",
    problem:
      "My team of instructional designers and content developers was trapped in slow, traditional production cycles while the business needed content faster than the cycles could ship it.",
    solution:
      "I redesigned the operating model around standardized templates and automated production pipelines, and coached the team to offload low-value work so their effort moved to behavioral consulting, stakeholder alignment, and measurement.",
    leadership:
      "The hard part was psychological safety. I led people who were wary of automation by showing them it removes the grind, not the craft. The role grew from content creator to learning experience engineer.",
    outcomes: [
      { value: "60%", label: "less production time" },
      { value: "90%+", label: "completion held as throughput rose" },
      { value: "Global", label: "teams and curricula served" },
    ],
  },
  {
    id: "impact-measurement",
    competency: "Impact measurement",
    icon: LineChart,
    title: "From the smile sheet to the P&L",
    org: "Accenture",
    context: "Proving L&D as an efficiency driver, not a cost center",
    imageSeed: "business-analytics-strategy-2890",
    problem:
      "Onboarding and upskilling for client teams was time-heavy and costly, and the only evidence anyone collected was completion and satisfaction. L&D read as a cost line.",
    solution:
      "I instrumented programs against business metrics from day one: a video-first F&A redesign and a hybrid HRO model, with learning time and retention translated into operational hours and dollars. A 1,400-line VBA suite made the measurement automated and auditable across pan-India teams.",
    leadership:
      "I reported in the language the C-suite cares about. Not completion rates, but dollars saved and capability held, with a clear next step to instrument on-the-job behavior.",
    outcomes: [
      { value: "70%", label: "less learning time (F&A)" },
      { value: "54%", label: "knowledge retention held" },
      { value: "$140K+", label: "training cost removed" },
    ],
  },
];

// Qualitative comparison for the Business Alignment study (no invented metrics).
export const complianceComparison = {
  classroomLabel: "Classroom-first default",
  mineLabel: "How I ran it",
  rows: [
    { dim: "Time off the floor", classroom: "Hours per analyst", mine: "Minutes, in the flow of work" },
    { dim: "Behavior change", classroom: "Low, click-through", mine: "High, at the point of need" },
    { dim: "Audit-readiness", classroom: "Reconstructed later", mine: "Built into the record" },
    { dim: "Operational cost", classroom: "High disruption", mine: "Hours preserved" },
  ],
};

// 90-day rollout playbook (methodology, not a claimed historical stat).
export const rolloutPlaybook = [
  {
    window: "Days 1-30",
    title: "Build the champion network",
    body: "Recruit and prepare champions across business units, then run quiet pilots where the tool proves itself before any mandate lands.",
  },
  {
    window: "Days 31-60",
    title: "Enable the managers",
    body: "Run the communication campaign and manager-enablement sessions, and ease the move off completion-tracking legacy platforms.",
  },
  {
    window: "Days 61-90",
    title: "Prove it, then scale",
    body: "Track active usage, close qualitative feedback loops, and take a phased scaling case to executive leadership.",
  },
];

// Role transformation (Team Leadership) framed qualitatively, no fabricated splits.
export const roleTransform = {
  offloaded: ["First drafts", "Formatting and versioning", "Asset wrangling", "Repetitive QA"],
  reclaimed: ["Behavioral consulting", "Stakeholder alignment", "Measurement design", "Learning architecture"],
};

// Kirkpatrick mapping for the Impact study (honest: L2 + L4 proven, L3 is next).
export type KirkRung = {
  level: string;
  name: string;
  note: string;
  state: "skipped" | "proven" | "next";
};
export const kirkpatrick: KirkRung[] = [
  { level: "Level 1", name: "Reaction", note: "Did they enjoy it? Deliberately not the headline.", state: "skipped" },
  { level: "Level 2", name: "Learning", note: "54% knowledge retention. Capability held.", state: "proven" },
  { level: "Level 3", name: "Behavior", note: "On-the-job application. The step I instrument next.", state: "next" },
  { level: "Level 4", name: "Results", note: "$140K removed, 70% less learning time.", state: "proven" },
];

// Savings breakdown (real: $80K F&A + $60K HRO).
export const savingsBreakdown = [
  { label: "F&A client redesign", value: 80, display: "$80K" },
  { label: "HRO hybrid model", value: 60, display: "$60K" },
];
