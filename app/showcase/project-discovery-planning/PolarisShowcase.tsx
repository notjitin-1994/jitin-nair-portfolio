"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Users,
  Target,
  Brain,
  BarChart3,
  Calendar,
  TrendingUp,
  Shield,
  BookOpen,
  Layers,
  Award,
  Clock,
  FileText,
  Briefcase,
  MapPin,
  DollarSign,
} from "lucide-react";
import { EASE } from "../../components/ld/primitives";

// ─── Design tokens ───────────────────────────────────────────────────────────

const em = "emerald";

// ─── Static Questionnaire Data ───────────────────────────────────────────────

interface RadioPillsData { type: "radio"; options: string[]; selected: string }
interface CheckPillsData { type: "check"; options: string[]; selected: string[] }
interface TextareaData { type: "textarea"; value: string; rows?: number }
interface TextField { type: "text"; value: string }
interface ScaleData { type: "scale"; value: number; min: number; max: number; minLabel?: string; maxLabel?: string }
interface SliderData { type: "slider"; value: number; min: number; max: number; unit: string }
interface CurrencyData { type: "currency"; amount: number; symbol: string }
interface NumberData { type: "number"; value: number }
interface ToggleData { type: "toggle"; selected: string; offValue: string; offLabel: string; onValue: string; onLabel: string }
interface RadioCardsData { type: "rcards"; options: { value: string; label: string; description: string }[]; selected: string }

type FieldData = RadioPillsData | CheckPillsData | TextareaData | TextField | ScaleData | SliderData | CurrencyData | NumberData | ToggleData | RadioCardsData;

interface StaticField { id: string; label: string; help?: string; field: FieldData }
interface StaticSection { id: number; title: string; subtitle: string; fields: StaticField[] }
interface DynQuestion { id: string; label: string; help?: string; field: FieldData }
interface DynSection { id: number; title: string; questions: DynQuestion[] }

const STATIC_SECTIONS: StaticSection[] = [
  {
    id: 1,
    title: "Role & Experience",
    subtitle: "Your professional context and L&D background",
    fields: [
      {
        id: "current_role",
        label: "Your primary role",
        field: {
          type: "radio",
          options: ["L&D Lead", "CLO / VP L&D", "Instructional Designer", "HR BP", "Consultant", "Other"],
          selected: "L&D Lead",
        },
      },
      {
        id: "industry_exp",
        label: "Industries you've worked in",
        help: "Select all that apply",
        field: {
          type: "check",
          options: ["Technology", "Financial Services", "Healthcare", "Manufacturing", "Retail", "Education"],
          selected: ["Technology", "Financial Services"],
        },
      },
      {
        id: "team_size",
        label: "L&D team size",
        field: {
          type: "radio",
          options: ["Solo", "2–5", "6–10", "11–50", "50+"],
          selected: "6–10",
        },
      },
      {
        id: "years",
        label: "Years in current role",
        field: { type: "number", value: 4 },
      },
    ],
  },
  {
    id: 2,
    title: "Organisation Context",
    subtitle: "Your organisation's structure and compliance landscape",
    fields: [
      {
        id: "org_name",
        label: "Organisation name",
        field: { type: "text", value: "Acme Financial Services" },
      },
      {
        id: "sector",
        label: "Primary industry sector",
        field: {
          type: "radio",
          options: ["Technology", "Financial Services", "Healthcare", "Retail", "Manufacturing", "Education", "Government"],
          selected: "Financial Services",
        },
      },
      {
        id: "org_size",
        label: "Organisation size",
        field: {
          type: "radio",
          options: ["1–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"],
          selected: "1,001–5,000",
        },
      },
      {
        id: "regions",
        label: "Operating regions",
        field: {
          type: "check",
          options: ["North America", "LATAM", "EMEA", "APAC", "ANZ"],
          selected: ["North America", "EMEA"],
        },
      },
      {
        id: "compliance",
        label: "Compliance frameworks",
        help: "Select all that apply to your learning content",
        field: {
          type: "check",
          options: ["GDPR", "CCPA", "SOC 2", "HIPAA", "ISO 27001", "FCA", "None"],
          selected: ["GDPR", "SOC 2", "FCA"],
        },
      },
    ],
  },
  {
    id: 3,
    title: "Learning Gap & Audience",
    subtitle: "The skill deficit and the learner population",
    fields: [
      {
        id: "gap",
        label: "Describe the learning gap",
        help: "What business problem does this programme need to solve?",
        field: {
          type: "textarea",
          value:
            "Our 450 sales professionals lack foundational AI literacy to leverage our newly deployed AI-assisted CRM. They're missing opportunities to use predictive lead scoring, AI proposal generation, and model-driven insights — costing an estimated 15% in pipeline efficiency.",
          rows: 4,
        },
      },
      {
        id: "learners",
        label: "Total number of learners",
        field: {
          type: "radio",
          options: ["1–10", "11–50", "51–200", "201–1,000", "1,000+"],
          selected: "201–1,000",
        },
      },
      {
        id: "knowledge_level",
        label: "Current baseline knowledge level",
        field: { type: "scale", value: 2, min: 1, max: 5, minLabel: "Novice", maxLabel: "Expert" },
      },
      {
        id: "motivation",
        label: "Primary motivation factors",
        field: {
          type: "check",
          options: ["Mandatory compliance", "Performance improvement", "Career growth", "Certification", "Personal interest"],
          selected: ["Mandatory compliance", "Performance improvement"],
        },
      },
      {
        id: "budget",
        label: "Available budget",
        field: { type: "currency", amount: 48000, symbol: "$" },
      },
    ],
  },
];

const DYNAMIC_SECTIONS: DynSection[] = [
  {
    id: 1,
    title: "Learning Objectives & Outcomes",
    questions: [
      {
        id: "s1_q1",
        label: "What are the 3 key behaviours learners must demonstrate 90 days post-training?",
        help: "Be specific — these become the programme's north-star metrics",
        field: {
          type: "textarea",
          value:
            "1. Confidently use AI lead scoring to prioritise daily outreach\n2. Generate first-draft AI proposals in under 5 minutes\n3. Accurately interpret model confidence scores before acting",
          rows: 4,
        },
      },
      {
        id: "s1_q2",
        label: "How will success be measured at 90 days?",
        field: {
          type: "radio",
          options: ["Manager assessment", "Knowledge test", "Pipeline metric", "Composite KPI"],
          selected: "Pipeline metric",
        },
      },
      {
        id: "s1_q3",
        label: "Is executive sponsorship secured?",
        field: { type: "toggle", selected: "yes", offValue: "no", offLabel: "Not yet", onValue: "yes", onLabel: "Secured" },
      },
    ],
  },
  {
    id: 2,
    title: "Target Audience Deep Dive",
    questions: [
      {
        id: "s2_q1",
        label: "Average tenure of learners in their current role?",
        field: {
          type: "radio",
          options: ["< 1 year", "1–3 years", "3–5 years", "5+ years"],
          selected: "3–5 years",
        },
      },
      {
        id: "s2_q2",
        label: "Which prior knowledge areas already exist in this group?",
        field: {
          type: "check",
          options: ["CRM proficiency", "Data literacy", "AI concepts", "Sales methodology", "Limited baseline"],
          selected: ["CRM proficiency", "Sales methodology"],
        },
      },
      {
        id: "s2_q3",
        label: "Rate the group's general technical comfort level",
        field: { type: "scale", value: 5, min: 1, max: 10, minLabel: "Tech-averse", maxLabel: "Tech-native" },
      },
    ],
  },
  {
    id: 3,
    title: "Content Scope & Structure",
    questions: [
      {
        id: "s3_q1",
        label: "How many learning modules should the programme contain?",
        field: { type: "number", value: 6 },
      },
      {
        id: "s3_q2",
        label: "Preferred primary delivery format",
        field: {
          type: "rcards",
          selected: "blended",
          options: [
            { value: "async", label: "Self-paced eLearning", description: "Asynchronous, learner-controlled pace via LMS" },
            { value: "live", label: "Live Virtual Sessions", description: "Cohort-based synchronous instructor delivery" },
            { value: "blended", label: "Blended Programme", description: "Async modules + live practice sessions" },
            { value: "on_job", label: "On-the-job Learning", description: "Embedded in workflow with performance support" },
          ],
        },
      },
    ],
  },
  {
    id: 4,
    title: "Instructional Strategy & Methods",
    questions: [
      {
        id: "s4_q1",
        label: "Which instructional methods are most appropriate?",
        field: {
          type: "check",
          options: ["Scenario-based", "Tool simulation", "Case studies", "Spaced practice", "Peer learning", "Manager coaching"],
          selected: ["Scenario-based", "Tool simulation", "Spaced practice"],
        },
      },
      {
        id: "s4_q2",
        label: "Desired cognitive scaffolding level",
        field: { type: "scale", value: 3, min: 1, max: 5, minLabel: "Highly guided", maxLabel: "Discovery-led" },
      },
    ],
  },
  {
    id: 5,
    title: "Learning Activities & Interactions",
    questions: [
      {
        id: "s5_q1",
        label: "Ideal session duration for live components",
        field: {
          type: "radio",
          options: ["30 min", "60 min", "90 min", "Half-day"],
          selected: "60 min",
        },
      },
      {
        id: "s5_q2",
        label: "Hours per week learners can dedicate to formal learning",
        field: { type: "slider", value: 2.5, min: 0.5, max: 10, unit: "hrs" },
      },
    ],
  },
  {
    id: 6,
    title: "Assessment & Evaluation",
    questions: [
      {
        id: "s6_q1",
        label: "Which assessment types should be included?",
        field: {
          type: "check",
          options: ["Knowledge checks", "Scenario simulation", "Performance task", "Manager observation", "Peer review"],
          selected: ["Knowledge checks", "Scenario simulation", "Performance task"],
        },
      },
      {
        id: "s6_q2",
        label: "Minimum pass score for certification",
        field: { type: "slider", value: 80, min: 60, max: 100, unit: "%" },
      },
    ],
  },
  {
    id: 7,
    title: "Resources & Existing Assets",
    questions: [
      {
        id: "s7_q1",
        label: "What existing assets can be repurposed?",
        field: {
          type: "check",
          options: ["Product documentation", "Sales decks", "Existing video", "SOPs / job aids", "Starting from scratch"],
          selected: ["Product documentation", "Sales decks"],
        },
      },
      {
        id: "s7_q2",
        label: "Describe any content quality or currency concerns",
        field: {
          type: "textarea",
          value:
            "The CRM training deck is 18 months old — pre-dates the AI feature rollout. Product documentation is comprehensive but written for engineers, not end-users.",
          rows: 3,
        },
      },
    ],
  },
  {
    id: 8,
    title: "Technology & Platform",
    questions: [
      {
        id: "s8_q1",
        label: "Which LMS / learning platform is in use?",
        field: {
          type: "radio",
          options: ["Workday Learning", "Cornerstone", "SAP SuccessFactors", "Docebo", "Custom / Other"],
          selected: "Cornerstone",
        },
      },
      {
        id: "s8_q2",
        label: "Is SCORM / xAPI compliance required?",
        field: { type: "toggle", selected: "yes", offValue: "no", offLabel: "Not required", onValue: "yes", onLabel: "Required" },
      },
    ],
  },
  {
    id: 9,
    title: "Implementation & Rollout",
    questions: [
      {
        id: "s9_q1",
        label: "Target go-live date",
        field: { type: "text", value: "September 2026" },
      },
      {
        id: "s9_q2",
        label: "Will a pilot cohort be used before full rollout?",
        field: { type: "toggle", selected: "yes", offValue: "no", offLabel: "Full rollout", onValue: "yes", onLabel: "Pilot first" },
      },
      {
        id: "s9_q3",
        label: "Pilot cohort size",
        field: { type: "number", value: 25 },
      },
    ],
  },
  {
    id: 10,
    title: "Success Metrics & Improvement",
    questions: [
      {
        id: "s10_q1",
        label: "Which business KPIs will this programme be tracked against?",
        field: {
          type: "check",
          options: ["Pipeline value", "Win rate", "Time to close", "AI tool adoption", "Learner satisfaction", "Knowledge retention"],
          selected: ["Pipeline value", "Win rate", "AI tool adoption"],
        },
      },
      {
        id: "s10_q2",
        label: "Reporting cadence for learning analytics",
        field: {
          type: "radio",
          options: ["Weekly", "Bi-weekly", "Monthly", "Quarterly"],
          selected: "Monthly",
        },
      },
    ],
  },
];

// ─── Blueprint Data ───────────────────────────────────────────────────────────

const BLUEPRINT = {
  title: "AI Literacy for Sales Professionals",
  org: "Acme Financial Services",
  generated: "Polaris · June 2026",
  executive_summary:
    "This programme addresses a critical performance gap: 450 sales professionals lack the AI literacy needed to leverage Acme's newly deployed AI-assisted CRM, costing an estimated 15% in pipeline efficiency. The solution is a 6-module blended learning programme combining asynchronous skill-building with live facilitated practice sessions. Grounded in spaced retrieval, scenario-based simulation, and manager-led coaching, the programme targets three measurable behavioural outcomes at 90 days: AI lead scoring adoption, first-draft proposal velocity, and model recommendation interpretation. Success will be tracked against three business KPIs — pipeline value, win rate, and AI tool adoption — with monthly reporting through Cornerstone.",
  objectives: [
    { id: "O1", title: "AI Lead Scoring Adoption", metric: "≥75% of reps using AI scoring daily", baseline: "12%", target: "75%", due: "Oct 2026" },
    { id: "O2", title: "Proposal Generation Velocity", metric: "First draft in < 5 min", baseline: "22 min avg", target: "< 5 min", due: "Oct 2026" },
    { id: "O3", title: "Model Confidence Interpretation", metric: "≥80% on simulation assessment", baseline: "No baseline", target: "80% pass rate", due: "Sep 2026" },
    { id: "O4", title: "Pipeline Uplift", metric: "+15% pipeline value", baseline: "$4.2M avg/quarter", target: "$4.83M avg/quarter", due: "Dec 2026" },
    { id: "O5", title: "Win Rate Improvement", metric: "+8pp win rate", baseline: "22%", target: "30%", due: "Dec 2026" },
  ],
  modules: [
    { num: "01", title: "AI Foundations for Sales", duration: "45 min", format: "Async eLearning", topics: ["What is generative AI", "How your CRM's AI model works", "Understanding confidence scores"], tag: "Awareness" },
    { num: "02", title: "Lead Scoring in Practice", duration: "60 min", format: "Async + Simulation", topics: ["Reading the scoring dashboard", "Prioritisation workflow", "Override criteria and when to use them"], tag: "Application" },
    { num: "03", title: "AI-Assisted Proposal Writing", duration: "90 min", format: "Blended", topics: ["Prompt engineering for sales context", "First-draft generation workflow", "Quality review checklist"], tag: "Application" },
    { num: "04", title: "Live Practice Lab 1", duration: "60 min", format: "Live Virtual", topics: ["Guided scenario: lead prioritisation", "Peer review of AI proposals", "Manager Q&A"], tag: "Practice" },
    { num: "05", title: "Data Literacy & Model Limits", duration: "45 min", format: "Async eLearning", topics: ["How models fail and why", "Bias in training data", "Escalation criteria"], tag: "Analysis" },
    { num: "06", title: "Live Practice Lab 2 + Certification", duration: "90 min", format: "Live Virtual", topics: ["Full deal scenario simulation", "360° peer feedback", "Certification assessment"], tag: "Evaluation" },
  ],
  assessment: {
    kpis: [
      { metric: "Module completion rate", target: "95%", method: "LMS tracking", freq: "Weekly" },
      { metric: "Knowledge check score", target: "≥80%", method: "Embedded quizzes", freq: "Per module" },
      { metric: "Simulation pass rate", target: "≥80%", method: "Scenario assessment", freq: "Module 6" },
      { metric: "Manager observation score", target: "≥4/5", method: "30-day check-in", freq: "Monthly" },
      { metric: "AI tool adoption", target: "≥75% DAU", method: "CRM analytics", freq: "Monthly" },
    ],
  },
  timeline: [
    { phase: "Discovery & Design", dates: "Jun – Jul 2026", milestones: ["SME workshops completed", "Storyboards approved", "Pilot cohort confirmed"], status: "active" },
    { phase: "Development", dates: "Jul – Aug 2026", milestones: ["eLearning modules built", "Simulation scenarios scripted", "Cornerstone configuration complete"], status: "upcoming" },
    { phase: "Pilot", dates: "Aug – Sep 2026", milestones: ["25-person pilot cohort", "Feedback collected and iterated", "Go / no-go decision"], status: "upcoming" },
    { phase: "Full Rollout", dates: "Sep – Oct 2026", milestones: ["450 learners enrolled", "Live labs scheduled", "90-day KPI baseline set"], status: "upcoming" },
  ],
  budget: [
    { item: "Instructional design (2 IDs × 8 weeks)", cost: 18400 },
    { item: "eLearning development (Articulate 360)", cost: 3200 },
    { item: "Simulation scenario development", cost: 6800 },
    { item: "Live facilitation (6 sessions × cohort)", cost: 9600 },
    { item: "LMS configuration & SCORM packaging", cost: 4200 },
    { item: "Evaluation & reporting setup", cost: 3800 },
    { item: "Contingency (5%)", cost: 2400 },
  ],
  risks: [
    { risk: "Low manager engagement in coaching", prob: "Medium", impact: "High", mitigation: "Executive briefing and manager readiness pack pre-launch" },
    { risk: "CRM AI feature updates mid-programme", prob: "Low", impact: "Medium", mitigation: "Modular content architecture enables targeted updates" },
    { risk: "Learner time availability", prob: "High", impact: "Medium", mitigation: "Micro-learning sessions ≤90 min, calendar holds booked in advance" },
  ],
};

// ─── Field Display Renderers ──────────────────────────────────────────────────

function RadioPills({ data }: { data: RadioPillsData }) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.options.map((opt) => {
        const active = opt === data.selected;
        return (
          <span
            key={opt}
            className={[
              "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-medium border transition-colors",
              active
                ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                : "border-white/10 bg-white/[0.04] text-neutral-400",
            ].join(" ")}
          >
            {active && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" strokeWidth={2.5} />}
            {opt}
          </span>
        );
      })}
    </div>
  );
}

function CheckPills({ data }: { data: CheckPillsData }) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.options.map((opt) => {
        const active = data.selected.includes(opt);
        return (
          <span
            key={opt}
            className={[
              "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-medium border transition-colors",
              active
                ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300"
                : "border-white/10 bg-white/[0.04] text-neutral-400",
            ].join(" ")}
          >
            {active && (
              <svg className="h-3 w-3 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {opt}
          </span>
        );
      })}
    </div>
  );
}

function TextareaDisplay({ data }: { data: TextareaData }) {
  return (
    <div
      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] leading-relaxed text-neutral-300 whitespace-pre-wrap"
      style={{ minHeight: `${(data.rows ?? 3) * 1.6}rem` }}
    >
      {data.value}
    </div>
  );
}

function TextFieldDisplay({ data }: { data: TextField }) {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] text-neutral-300">
      {data.value}
    </div>
  );
}

function ScaleDisplay({ data }: { data: ScaleData }) {
  const pct = ((data.value - data.min) / (data.max - data.min)) * 100;
  const steps = Array.from({ length: data.max - data.min + 1 }, (_, i) => data.min + i);
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="flex items-center justify-between text-[11px] text-neutral-500">
        <span>{data.minLabel}</span>
        <span className="text-lg font-bold text-emerald-400">{data.value}</span>
        <span>{data.maxLabel}</span>
      </div>
      <div className="relative h-2 rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between">
        {steps.map((s) => (
          <div key={s} className="flex flex-col items-center gap-0.5">
            <div className={["h-1.5 w-0.5 rounded-full", s === data.value ? "bg-emerald-400" : "bg-white/15"].join(" ")} />
            <span className={["text-[10px]", s === data.value ? "text-emerald-400 font-semibold" : "text-neutral-600"].join(" ")}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SliderDisplay({ data }: { data: SliderData }) {
  const pct = ((data.value - data.min) / (data.max - data.min)) * 100;
  return (
    <div className="space-y-2">
      <div className="text-center">
        <span className="text-2xl font-bold text-emerald-400">{data.value}</span>
        <span className="ml-1 text-sm text-neutral-500">{data.unit}</span>
      </div>
      <div className="relative h-2 rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-emerald-400 bg-[#0a0a0f] shadow-[0_0_10px_rgba(52,211,153,0.4)]"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-neutral-600">
        <span>{data.min}{data.unit}</span>
        <span>{data.max}{data.unit}</span>
      </div>
    </div>
  );
}

function CurrencyDisplay({ data }: { data: CurrencyData }) {
  return (
    <div className="relative">
      <span className="absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-medium text-neutral-500">
        {data.symbol}
      </span>
      <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-8 pr-4 text-[13px] text-neutral-300">
        {data.amount.toLocaleString()}
      </div>
    </div>
  );
}

function NumberDisplay({ data }: { data: NumberData }) {
  return (
    <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] text-neutral-300">
      {data.value}
    </div>
  );
}

function ToggleDisplay({ data }: { data: ToggleData }) {
  const isOn = data.selected === data.onValue;
  return (
    <div className="flex items-center gap-3">
      <span className={["text-[13px] font-medium transition-colors", !isOn ? "text-white" : "text-neutral-600"].join(" ")}>
        {data.offLabel}
      </span>
      <div className={["relative inline-flex h-7 w-12 items-center rounded-full transition-colors", isOn ? "bg-emerald-500" : "bg-white/15"].join(" ")}>
        <span className={["inline-block h-5 w-5 rounded-full bg-white shadow transition-transform", isOn ? "translate-x-6" : "translate-x-1"].join(" ")} />
      </div>
      <span className={["text-[13px] font-medium transition-colors", isOn ? "text-white" : "text-neutral-600"].join(" ")}>
        {data.onLabel}
      </span>
    </div>
  );
}

function RadioCardsDisplay({ data }: { data: RadioCardsData }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {data.options.map((opt) => {
        const active = opt.value === data.selected;
        return (
          <div
            key={opt.value}
            className={[
              "rounded-xl border px-4 py-3 transition-colors",
              active
                ? "border-emerald-500/50 bg-emerald-500/[0.07]"
                : "border-white/10 bg-white/[0.02]",
            ].join(" ")}
          >
            <div className="flex items-start gap-2.5">
              <div
                className={[
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  active ? "border-emerald-400 bg-emerald-400/20" : "border-white/20",
                ].join(" ")}
              >
                {active && <div className="h-2 w-2 rounded-full bg-emerald-400" />}
              </div>
              <div>
                <p className={["text-[13px] font-medium", active ? "text-emerald-300" : "text-neutral-300"].join(" ")}>
                  {opt.label}
                </p>
                <p className="mt-0.5 text-[11px] text-neutral-500">{opt.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FieldRenderer({ field }: { field: FieldData }) {
  switch (field.type) {
    case "radio": return <RadioPills data={field} />;
    case "check": return <CheckPills data={field} />;
    case "textarea": return <TextareaDisplay data={field} />;
    case "text": return <TextFieldDisplay data={field} />;
    case "scale": return <ScaleDisplay data={field} />;
    case "slider": return <SliderDisplay data={field} />;
    case "currency": return <CurrencyDisplay data={field} />;
    case "number": return <NumberDisplay data={field} />;
    case "toggle": return <ToggleDisplay data={field} />;
    case "rcards": return <RadioCardsDisplay data={field} />;
    default: return null;
  }
}

// ─── Static Questionnaire Card ────────────────────────────────────────────────

const STATIC_SECTION_ICONS = [Briefcase, MapPin, Users];

function StaticQuestionnaireCard() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const section = STATIC_SECTIONS[active];

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-500">
            Phase 1 · Static Questionnaire
          </span>
        </div>
        <p className="text-[11px] text-neutral-600 ml-3.5">Baseline context capture — 3 sections, 30+ fields</p>
      </div>

      {/* Section tabs */}
      <div className="flex border-b border-white/[0.06]">
        {STATIC_SECTIONS.map((s, i) => {
          const Icon = STATIC_SECTION_ICONS[i];
          return (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={[
                "flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] font-medium transition-colors border-b-2 -mb-px",
                active === i
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent text-neutral-600 hover:text-neutral-400",
              ].join(" ")}
            >
              <Icon className="h-3 w-3 shrink-0" strokeWidth={2} />
              <span className="hidden sm:inline">{s.title.split(" ")[0]}</span>
              <span className="sm:hidden">{i + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto px-5 py-5" style={{ maxHeight: "440px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div>
              <h3 className="text-[13px] font-semibold text-white">{section.title}</h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">{section.subtitle}</p>
            </div>
            {section.fields.map((f, idx) => (
              <motion.div
                key={f.id}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: idx * 0.04, ease: EASE }}
                className="space-y-2"
              >
                <div>
                  <label className="text-[12px] font-medium text-neutral-300">{f.label}</label>
                  {f.help && <p className="text-[11px] text-neutral-600 mt-0.5">{f.help}</p>}
                </div>
                <FieldRenderer field={f.field} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
        <button
          onClick={() => setActive((p) => Math.max(0, p - 1))}
          disabled={active === 0}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-medium text-neutral-500 transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
        </button>
        <div className="flex items-center gap-1.5">
          {STATIC_SECTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={[
                "h-1.5 rounded-full transition-all duration-200",
                active === i ? "w-5 bg-emerald-400" : "w-1.5 bg-white/20 hover:bg-white/40",
              ].join(" ")}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((p) => Math.min(STATIC_SECTIONS.length - 1, p + 1))}
          disabled={active === STATIC_SECTIONS.length - 1}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-medium text-neutral-500 transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Dynamic Questionnaire Card ───────────────────────────────────────────────

function DynamicQuestionnaireCard() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const section = DYNAMIC_SECTIONS[active];
  const total = DYNAMIC_SECTIONS.length;

  return (
    <div className="flex flex-col rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] overflow-hidden h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-emerald-500/[0.12] bg-emerald-500/[0.03]">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-400">
            Phase 2 · AI-Generated Questions
          </span>
        </div>
        <p className="text-[11px] text-neutral-600 ml-3.5">Context-aware deep dive — 10 sections, 50–70 questions</p>
      </div>

      {/* Section number navigation */}
      <div className="flex items-center gap-0.5 overflow-x-auto border-b border-white/[0.05] px-4 py-2 scrollbar-none">
        {DYNAMIC_SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            title={s.title}
            className={[
              "flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-[11px] font-semibold transition-all duration-150",
              active === i
                ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
                : "text-neutral-600 hover:text-neutral-400 hover:bg-white/[0.03]",
            ].join(" ")}
          >
            {i + 1}
          </button>
        ))}
        <div className="ml-auto shrink-0 text-[10px] text-neutral-600 pl-3">
          {active + 1} / {total}
        </div>
      </div>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto px-5 py-5" style={{ maxHeight: "440px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-[11px] font-bold text-emerald-400">
                {active + 1}
              </span>
              <h3 className="text-[13px] font-semibold text-white">{section.title}</h3>
            </div>
            {section.questions.map((q, idx) => (
              <motion.div
                key={q.id}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: idx * 0.05, ease: EASE }}
                className="space-y-2"
              >
                <div>
                  <label className="text-[12px] font-medium text-neutral-300">{q.label}</label>
                  {q.help && <p className="text-[11px] text-neutral-600 mt-0.5">{q.help}</p>}
                </div>
                <FieldRenderer field={q.field} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
        <button
          onClick={() => setActive((p) => Math.max(0, p - 1))}
          disabled={active === 0}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-medium text-neutral-500 transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
        </button>
        <div className="h-1 flex-1 mx-4 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
            style={{ width: `${((active + 1) / total) * 100}%` }}
          />
        </div>
        <button
          onClick={() => setActive((p) => Math.min(total - 1, p + 1))}
          disabled={active === total - 1}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-medium text-neutral-500 transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Blueprint Viewer ─────────────────────────────────────────────────────────

const BLUEPRINT_TABS = [
  { id: "overview", label: "Overview", icon: Target },
  { id: "modules", label: "Modules", icon: BookOpen },
  { id: "assessment", label: "Assessment", icon: Award },
  { id: "timeline", label: "Timeline", icon: Calendar },
  { id: "budget", label: "Budget", icon: DollarSign },
  { id: "risks", label: "Risks", icon: Shield },
] as const;

type BlueprintTab = typeof BLUEPRINT_TABS[number]["id"];

const TAG_COLORS: Record<string, string> = {
  Awareness: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Application: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Practice: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Analysis: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Evaluation: "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

function BlueprintViewer() {
  const [tab, setTab] = useState<BlueprintTab>("overview");
  const reduced = useReducedMotion();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      {/* Blueprint header */}
      <div className="border-b border-white/[0.06] bg-white/[0.02] px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-500">
                Polaris Blueprint · Generated Output
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white">{BLUEPRINT.title}</h3>
            <p className="text-[12px] text-neutral-500 mt-0.5">{BLUEPRINT.org} · {BLUEPRINT.generated}</p>
          </div>
          <div className="shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5">
            <p className="text-[10px] font-bold text-emerald-400 tabular-nums">45s</p>
            <p className="text-[9px] text-emerald-600 whitespace-nowrap">generation time</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-white/[0.06] scrollbar-none">
        {BLUEPRINT_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={[
              "flex shrink-0 items-center gap-1.5 border-b-2 px-4 py-3 text-[12px] font-medium transition-colors -mb-px",
              tab === id
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-neutral-600 hover:text-neutral-400",
            ].join(" ")}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6 overflow-y-auto" style={{ maxHeight: "520px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "overview" && (
              <div className="space-y-6">
                <p className="text-sm leading-relaxed text-neutral-400">{BLUEPRINT.executive_summary}</p>
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
                    Learning Objectives
                  </h4>
                  <div className="space-y-2.5">
                    {BLUEPRINT.objectives.map((obj, i) => (
                      <motion.div
                        key={obj.id}
                        initial={reduced ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15, delay: i * 0.05, ease: EASE }}
                        className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                          {obj.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-white">{obj.title}</p>
                          <p className="text-[11px] text-neutral-500 mt-0.5">{obj.metric}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[11px] font-semibold text-emerald-400">{obj.target}</p>
                          <p className="text-[10px] text-neutral-600">{obj.due}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "modules" && (
              <div className="space-y-3">
                {BLUEPRINT.modules.map((mod, i) => (
                  <motion.div
                    key={mod.num}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.14, delay: i * 0.04, ease: EASE }}
                    className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <span className="font-mono text-[10px] font-bold text-emerald-400">{mod.num}</span>
                      {i < BLUEPRINT.modules.length - 1 && (
                        <div className="flex-1 w-px bg-white/10" style={{ minHeight: "24px" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-[13px] font-semibold text-white leading-snug">{mod.title}</p>
                        <span className={["shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold", TAG_COLORS[mod.tag] ?? "text-neutral-400 bg-white/5 border-white/10"].join(" ")}>
                          {mod.tag}
                        </span>
                      </div>
                      <ul className="space-y-0.5">
                        {mod.topics.map((t) => (
                          <li key={t} className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-neutral-700" />
                            {t}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-[10px] text-neutral-600">
                          <Clock className="h-3 w-3" strokeWidth={1.75} /> {mod.duration}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-neutral-600">
                          <Layers className="h-3 w-3" strokeWidth={1.75} /> {mod.format}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "assessment" && (
              <div className="space-y-4">
                <p className="text-[12px] text-neutral-500">
                  Five-layer evaluation framework aligned to Kirkpatrick Levels 2 and 3, tracked monthly via Cornerstone analytics.
                </p>
                <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                        {["Metric", "Target", "Method", "Frequency"].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-600">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {BLUEPRINT.assessment.kpis.map((kpi, i) => (
                        <motion.tr
                          key={kpi.metric}
                          initial={reduced ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.06, ease: EASE }}
                          className={["border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]", i % 2 === 0 ? "" : "bg-white/[0.01]"].join(" ")}
                        >
                          <td className="px-4 py-3 text-neutral-300">{kpi.metric}</td>
                          <td className="px-4 py-3 font-semibold text-emerald-400">{kpi.target}</td>
                          <td className="px-4 py-3 text-neutral-500">{kpi.method}</td>
                          <td className="px-4 py-3 text-neutral-500">{kpi.freq}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "timeline" && (
              <div className="space-y-3">
                {BLUEPRINT.timeline.map((phase, i) => (
                  <motion.div
                    key={phase.phase}
                    initial={reduced ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.06, ease: EASE }}
                    className={[
                      "rounded-xl border p-4",
                      phase.status === "active"
                        ? "border-emerald-500/30 bg-emerald-500/[0.05]"
                        : "border-white/[0.06] bg-white/[0.02]",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={[
                          "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shrink-0",
                          phase.status === "active"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-white/[0.06] text-neutral-500",
                        ].join(" ")}>
                          {i + 1}
                        </div>
                        <p className="text-[13px] font-semibold text-white">{phase.phase}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {phase.status === "active" && (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                            In Progress
                          </span>
                        )}
                        <span className="text-[11px] text-neutral-600">{phase.dates}</span>
                      </div>
                    </div>
                    <ul className="grid grid-cols-1 gap-1 sm:grid-cols-3">
                      {phase.milestones.map((m) => (
                        <li key={m} className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                          <CheckCircle2 className={["h-3 w-3 shrink-0", phase.status === "active" ? "text-emerald-500" : "text-neutral-700"].join(" ")} strokeWidth={2} />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "budget" && (
              <div className="space-y-4">
                <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                        <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-neutral-600">Line Item</th>
                        <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-neutral-600">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BLUEPRINT.budget.map((line, i) => (
                        <motion.tr
                          key={line.item}
                          initial={reduced ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05, ease: EASE }}
                          className={["border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]", i % 2 === 0 ? "" : "bg-white/[0.01]"].join(" ")}
                        >
                          <td className="px-4 py-3 text-neutral-400">{line.item}</td>
                          <td className="px-4 py-3 text-right font-semibold text-emerald-400 tabular-nums">
                            ${line.cost.toLocaleString()}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-white/10 bg-white/[0.03]">
                        <td className="px-4 py-3 text-[12px] font-bold text-white">Total Programme Budget</td>
                        <td className="px-4 py-3 text-right text-[14px] font-bold text-emerald-400 tabular-nums">
                          ${BLUEPRINT.budget.reduce((a, b) => a + b.cost, 0).toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {tab === "risks" && (
              <div className="space-y-3">
                {BLUEPRINT.risks.map((r, i) => (
                  <motion.div
                    key={r.risk}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.14, delay: i * 0.07, ease: EASE }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="shrink-0 mt-0.5">
                        <Shield className="h-4 w-4 text-amber-500/70" strokeWidth={1.75} />
                      </div>
                      <p className="text-[13px] font-medium text-white">{r.risk}</p>
                    </div>
                    <div className="flex items-center gap-4 mb-2 ml-7">
                      <span className="text-[11px] text-neutral-600">
                        Probability: <span className={r.prob === "High" ? "text-rose-400" : r.prob === "Medium" ? "text-amber-400" : "text-emerald-400"}>{r.prob}</span>
                      </span>
                      <span className="text-[11px] text-neutral-600">
                        Impact: <span className={r.impact === "High" ? "text-rose-400" : r.impact === "Medium" ? "text-amber-400" : "text-emerald-400"}>{r.impact}</span>
                      </span>
                    </div>
                    <div className="ml-7 rounded-lg border border-white/[0.05] bg-white/[0.03] px-3 py-2">
                      <p className="text-[11px] text-neutral-500">
                        <span className="text-neutral-400 font-medium">Mitigation: </span>
                        {r.mitigation}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Expand Panel Wrapper ─────────────────────────────────────────────────────

function ExpandPanel({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className={["rounded-2xl border transition-colors duration-200", open ? "border-emerald-500/25 bg-emerald-500/[0.02]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/15"].join(" ")}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="group w-full flex items-center gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="shrink-0 font-mono text-[11px] font-bold text-neutral-700 group-hover:text-emerald-500/60 transition-colors">
          {step}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-white">{title}</p>
          <p className="text-[12px] text-neutral-600 mt-0.5">{subtitle}</p>
        </div>
        <div className={[
          "shrink-0 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200",
          open
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
            : "border-white/10 text-neutral-600 group-hover:border-white/20 group-hover:text-white",
        ].join(" ")}>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronDown className="h-4 w-4" strokeWidth={2} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: reduced ? 0 : 0.2 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-white/[0.06] px-6 py-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function PolarisShowcaseSection() {
  const reduced = useReducedMotion();

  return (
    <section className="px-5 py-20 md:py-28 bg-[#0a0a0f] relative">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-emerald-500/30" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">Live System Demo</span>
          </div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl mb-3">
            See the <span className="text-emerald-400 italic">system</span> in motion.
          </h2>
          <p className="max-w-xl text-base text-neutral-500 leading-relaxed">
            Expand either panel to explore the actual questionnaire UI and a real generated blueprint — same stack, same logic as production.
          </p>
        </motion.div>

        <div className="space-y-3">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            <ExpandPanel
              step="01"
              title="Project Planning Questionnaire"
              subtitle="Two-phase intake: static baseline capture + AI-generated deep-dive questions"
            >
              <div className="grid gap-5 lg:grid-cols-2">
                <StaticQuestionnaireCard />
                <DynamicQuestionnaireCard />
              </div>
            </ExpandPanel>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
          >
            <ExpandPanel
              step="02"
              title="Generated Learning Blueprint"
              subtitle="AI-synthesised 20-page curriculum architecture — output of a complete Polaris run"
            >
              <BlueprintViewer />
            </ExpandPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
