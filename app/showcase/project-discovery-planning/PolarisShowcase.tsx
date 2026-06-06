"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Users,
  Target,
  BookOpen,
  Calendar,
  TrendingUp,
  Shield,
  Layers,
  Clock,
  FileText,
  Briefcase,
  MapPin,
  DollarSign,
  BarChart3,
  Leaf,
  PlayCircle,
  Wrench,
  RefreshCw,
  AlertTriangle,
  AlertCircle,
  Maximize2,
  Minimize2,
  Activity,
  Accessibility,
  X,
  ArrowUpRight,
} from "lucide-react";
import { EASE } from "../../components/ld/primitives";

// ─── Brand accent palette (maps Polaris semantic colours → portfolio brand) ───

type Accent = "emerald" | "teal" | "amber" | "rose";

const ACCENT: Record<Accent, { text: string; iconBg: string; soft: string; border: string; bar: string }> = {
  emerald: { text: "text-emerald-400", iconBg: "bg-emerald-500/15", soft: "bg-emerald-500/10", border: "border-emerald-500/30", bar: "bg-emerald-400" },
  teal: { text: "text-teal-400", iconBg: "bg-teal-500/15", soft: "bg-teal-500/10", border: "border-teal-500/30", bar: "bg-teal-400" },
  amber: { text: "text-amber-400", iconBg: "bg-amber-500/15", soft: "bg-amber-500/10", border: "border-amber-500/30", bar: "bg-amber-400" },
  rose: { text: "text-rose-400", iconBg: "bg-rose-500/15", soft: "bg-rose-500/10", border: "border-rose-500/30", bar: "bg-rose-400" },
};

// ─── Static Questionnaire (Phase 1) — Acme Services ──────────────────────────

interface RadioPillsData { type: "radio"; options: string[]; selected: string }
interface CheckPillsData { type: "check"; options: string[]; selected: string[] }
interface TextareaData { type: "textarea"; value: string; rows?: number }
interface TextField { type: "text"; value: string }
interface ScaleData { type: "scale"; value: number; min: number; max: number; minLabel?: string; maxLabel?: string }
interface CurrencyData { type: "currency"; amount: number; symbol: string }
interface NumberData { type: "number"; value: number }

type FieldData = RadioPillsData | CheckPillsData | TextareaData | TextField | ScaleData | CurrencyData | NumberData;

interface StaticField { id: string; label: string; help?: string; field: FieldData }
interface StaticSection { id: number; title: string; subtitle: string; fields: StaticField[] }

const STATIC_SECTIONS: StaticSection[] = [
  {
    id: 1,
    title: "Role & Experience",
    subtitle: "Your professional context and L&D background",
    fields: [
      { id: "current_role", label: "Your primary role", field: { type: "radio", options: ["L&D Lead", "Instructional Designer", "CLO / VP L&D", "HR Business Partner", "Consultant"], selected: "Instructional Designer" } },
      { id: "years", label: "Years in current role", field: { type: "number", value: 4 } },
      { id: "team_size", label: "L&D team size", field: { type: "radio", options: ["Solo", "2-5", "6-10", "11-50", "50+"], selected: "2-5" } },
      { id: "industry_exp", label: "Industries you've worked in", field: { type: "check", options: ["Technology", "Financial Services", "Healthcare", "Manufacturing", "Retail"], selected: ["Financial Services"] } },
      { id: "skills", label: "Technical skills", help: "Select all that apply", field: { type: "check", options: ["LMS Admin", "SCORM/xAPI", "Video Production", "Graphic Design", "HTML/CSS", "Instructional Design Tools", "Data Analytics"], selected: ["LMS Admin", "SCORM/xAPI", "Video Production", "Graphic Design", "HTML/CSS", "Instructional Design Tools", "Data Analytics"] } },
    ],
  },
  {
    id: 2,
    title: "Organisation Context",
    subtitle: "Structure, scale, and compliance landscape",
    fields: [
      { id: "org_name", label: "Organisation name", field: { type: "text", value: "Acme Services" } },
      { id: "sector", label: "Primary industry sector", field: { type: "radio", options: ["Technology", "Financial Services", "Healthcare", "Retail", "Government"], selected: "Financial Services" } },
      { id: "org_size", label: "Organisation size", field: { type: "radio", options: ["1-50", "51-200", "201-1000", "1001-5000", "5001-10000", "10000+"], selected: "5001-10000" } },
      { id: "regions", label: "Operating regions", field: { type: "check", options: ["North America", "EMEA", "APAC", "LATAM", "Global"], selected: ["Global"] } },
      { id: "clearance", label: "Security clearance", field: { type: "radio", options: ["None", "Internal", "Confidential", "Restricted"], selected: "Confidential" } },
      { id: "data_policy", label: "Data sharing policies", field: { type: "radio", options: ["Open", "Internal Only", "Need to Know", "Air-gapped"], selected: "Internal Only" } },
      { id: "compliance", label: "Compliance frameworks", field: { type: "check", options: ["GDPR", "SOC 2", "ISO 27001", "FCA", "None"], selected: ["None"] } },
    ],
  },
  {
    id: 3,
    title: "Learning Gap & Audience",
    subtitle: "The skill deficit and the learner population",
    fields: [
      { id: "gap", label: "Describe the learning gap", help: "What business problem does this programme need to solve?", field: { type: "textarea", rows: 6, value: "Senior leadership often lacks a structured understanding of how data science can be strategically leveraged to drive business outcomes. While executives are experienced in decision-making, there is a gap in translating data-driven insights into actionable strategies, understanding the capabilities and limitations of data science models, and effectively collaborating with technical teams. This results in missed opportunities for innovation, inefficient resource allocation, and challenges in evaluating data initiatives. A focused learning program is needed to bridge this gap by equipping leaders with the ability to interpret data insights, ask the right questions, and align data science efforts with organizational goals." } },
      { id: "learners", label: "Total number of learners", field: { type: "radio", options: ["1-10", "11-25", "26-50", "51-200", "201-1000", "1000+"], selected: "26-50" } },
      { id: "knowledge_level", label: "Current baseline knowledge level", field: { type: "scale", value: 2, min: 1, max: 5, minLabel: "Novice", maxLabel: "Expert" } },
      { id: "motivation", label: "Primary motivation factors", field: { type: "check", options: ["Mandatory compliance", "Career Advancement", "Performance Improvement", "Certification", "Personal Interest"], selected: ["Career Advancement", "Performance Improvement", "Personal Interest"] } },
      { id: "location", label: "Learning location", field: { type: "check", options: ["Office/Workplace", "Home", "Flexible/Any Location", "Field/On-site"], selected: ["Office/Workplace", "Home", "Flexible/Any Location"] } },
      { id: "devices", label: "Devices used", field: { type: "check", options: ["Desktop Computer", "Laptop", "Tablet", "Mobile Phone"], selected: ["Desktop Computer", "Laptop", "Mobile Phone"] } },
      { id: "hours", label: "Hours available per week", field: { type: "radio", options: ["< 2 hours", "2-5 hours", "5-10 hours", "10-20 hours", "20+ hours"], selected: "20+ hours" } },
      { id: "budget", label: "Available budget", field: { type: "currency", amount: 70000, symbol: "$" } },
    ],
  },
];

// ─── Dynamic Questionnaire (Phase 2) — raw questions + answers ────────────────

interface DQOption { label: string; value: string; description?: string }
interface DQuestion {
  id: string;
  type: string;
  label: string;
  helpText?: string;
  options?: DQOption[];
  sliderConfig?: { min: number; max: number; step: number; unit: string };
  scaleConfig?: { min: number; max: number; minLabel?: string; maxLabel?: string; labels?: string[] };
  currencyConfig?: { symbol?: string };
  rows?: number;
}
interface DQSection { id: string; title: string; description: string; questions: DQuestion[] }

const DYNAMIC_SECTIONS: DQSection[] = [
  {
    id: "s1", title: "Learning Objectives & Outcomes", description: "Define the specific, measurable outcomes and success criteria.",
    questions: [
      { id: "s1_q1", type: "checkbox_cards", label: "Which primary business impact areas should this program target?", helpText: "Select the high-level organizational impacts.", options: [{ label: "Revenue Growth", value: "revenue-growth", description: "Directly impact top-line revenue through improved skills" }, { label: "Operational Efficiency", value: "operational-efficiency", description: "Reduce time, cost, or resources required for tasks" }, { label: "Risk Mitigation", value: "risk-mitigation", description: "Decrease compliance, security, or operational risks" }, { label: "Innovation & Transformation", value: "innovation", description: "Drive new processes, products, or strategic shifts" }] },
      { id: "s1_q2", type: "radio_pills", label: "What is the highest Bloom's Taxonomy level required?", options: [{ label: "Remember", value: "remember" }, { label: "Understand", value: "understand" }, { label: "Apply", value: "apply" }, { label: "Analyze", value: "analyze" }, { label: "Evaluate", value: "evaluate" }, { label: "Create", value: "create" }] },
      { id: "s1_q3", type: "textarea", rows: 4, label: "Define the primary SMART objective for this program.", helpText: "Specific, Measurable, Achievable, Relevant, Time-bound." },
      { id: "s1_q4", type: "labeled_slider", label: "Expected time-to-competency post-training?", sliderConfig: { min: 1, max: 52, step: 1, unit: " weeks" } },
      { id: "s1_q5", type: "checkbox_pills", label: "Which criteria will stakeholders use to evaluate success?", options: [{ label: "Completion Rate", value: "completion-rate" }, { label: "Learner NPS", value: "nps" }, { label: "Demonstrated Application", value: "skill-application" }, { label: "Error Reduction", value: "error-reduction" }, { label: "Process Acceleration", value: "process-speed" }] },
      { id: "s1_q6", type: "radio_cards", label: "What is the primary organizational driver for this program?", options: [{ label: "Strategic Alignment", value: "strategic-alignment", description: "Aligning workforce capabilities with new business strategies" }, { label: "Performance Gap", value: "performance-gap", description: "Addressing current deficiencies in output or quality" }, { label: "Role Transition", value: "onboarding", description: "Preparing employees for new responsibilities" }] },
    ],
  },
  {
    id: "s2", title: "Target Audience Analysis (Deep Dive)", description: "Persona behaviors, prerequisite gaps, and potential barriers.",
    questions: [
      { id: "s2_q1", type: "checkbox_cards", label: "What are the primary behavioral barriers to learning adoption?", options: [{ label: "Time Constraints", value: "time-constraints", description: "High workload preventing dedicated learning time" }, { label: "Lack of Perceived Value", value: "perceived-value", description: "Skepticism about relevance to daily tasks" }, { label: "Technology Anxiety", value: "tech-anxiety", description: "Discomfort with new platforms or digital tools" }, { label: "Change Fatigue", value: "change-fatigue", description: "Exhaustion from previous organizational shifts" }] },
      { id: "s2_q2", type: "radio_pills", label: "Preferred learning format for this audience?", options: [{ label: "Microlearning (Bite-sized)", value: "microlearning" }, { label: "Long-form Modules", value: "long-form" }, { label: "Cohort-based Learning", value: "cohort-based" }, { label: "Self-paced Exploration", value: "self-paced" }] },
      { id: "s2_q3", type: "toggle_switch", label: "Accessibility accommodations needed beyond standard WCAG?", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "s2_q4", type: "text", label: "Identify the most critical prerequisite skill gap." },
      { id: "s2_q5", type: "enhanced_scale", label: "Expected level of resistance to the concepts being taught?", scaleConfig: { min: 1, max: 5, labels: ["Very Low", "Low", "Moderate", "High", "Very High"] } },
      { id: "s2_q6", type: "checkbox_pills", label: "Which technical proficiencies are required to engage?", options: [{ label: "Data Interpretation", value: "data-interpretation" }, { label: "Basic Statistics", value: "basic-stats" }, { label: "Complex Software Navigation", value: "software-nav" }, { label: "Report Generation", value: "report-gen" }] },
    ],
  },
  {
    id: "s3", title: "Content Scope & Structure", description: "Topic hierarchy, sequencing logic, and case study requirements.",
    questions: [
      { id: "s3_q1", type: "radio_cards", label: "Preferred content sequencing logic?", options: [{ label: "Linear / Sequential", value: "linear", description: "Strict, predefined order" }, { label: "Modular / Non-linear", value: "modular", description: "Choose your own path through standalone topics" }, { label: "Adaptive / Personalized", value: "adaptive", description: "System adjusts path based on performance" }] },
      { id: "s3_q2", type: "checkbox_pills", label: "What types of case studies are required?", options: [{ label: "Industry-Specific", value: "industry-specific" }, { label: "Cross-Industry Analogies", value: "cross-industry" }, { label: "Fictional/Abstracted", value: "fictional" }, { label: "Historical Internal Data", value: "historical" }] },
      { id: "s3_q3", type: "number_spinner", label: "Estimated number of distinct modules or major topics?" },
      { id: "s3_q4", type: "scale", label: "Balance between theoretical concepts and practical application?", scaleConfig: { min: 1, max: 10, minLabel: "Heavy Theory", maxLabel: "Heavy Practice" } },
      { id: "s3_q5", type: "radio_pills", label: "Primary content sourcing strategy?", options: [{ label: "Build from Scratch", value: "build" }, { label: "Curate Existing", value: "curate" }, { label: "Hybrid Approach", value: "hybrid" }, { label: "Vendor Off-the-Shelf", value: "vendor" }] },
      { id: "s3_q6", type: "radio_pills", label: "Primary content delivery format?", options: [{ label: "Video-Heavy", value: "video" }, { label: "Text/Reading-Heavy", value: "text" }, { label: "Interactive Multimedia", value: "interactive" }, { label: "Audio/Podcast", value: "audio" }] },
    ],
  },
  {
    id: "s4", title: "Instructional Strategy & Methods", description: "Pedagogical mix, social learning balance, and scaffolding.",
    questions: [
      { id: "s4_q1", type: "checkbox_cards", label: "Which pedagogical approaches will anchor the design?", options: [{ label: "Constructivism", value: "constructivism", description: "Build knowledge through experiences and reflection" }, { label: "Experiential Learning", value: "experiential", description: "Learning through doing, followed by analysis" }, { label: "Cognitivism", value: "cognitivism", description: "Focus on mental processes and problem-solving" }, { label: "Connectivism", value: "connectivism", description: "Learning through networks and digital connections" }] },
      { id: "s4_q2", type: "labeled_slider", label: "What percentage should rely on social/collaborative learning?", sliderConfig: { min: 0, max: 100, step: 10, unit: "%" } },
      { id: "s4_q3", type: "radio_pills", label: "Primary scaffolding technique for complex topics?", options: [{ label: "Guided Practice", value: "guided-practice" }, { label: "Worked Examples", value: "worked-examples" }, { label: "Concept Mapping", value: "concept-mapping" }, { label: "Peer Tutoring", value: "peer-tutoring" }] },
      { id: "s4_q4", type: "toggle_switch", label: "Utilize a blended learning approach (sync + async)?", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "s4_q5", type: "scale", label: "Required level of pacing flexibility?", scaleConfig: { min: 1, max: 5, minLabel: "Strictly Scheduled", maxLabel: "Completely Self-Paced" } },
      { id: "s4_q6", type: "checkbox_pills", label: "Strategies for post-training reinforcement?", options: [{ label: "Spaced Repetition", value: "spaced-repetition" }, { label: "Job Aids / Checklists", value: "job-aids" }, { label: "Manager Coaching", value: "manager-coaching" }, { label: "Peer Discussions", value: "peer-discussions" }] },
    ],
  },
  {
    id: "s5", title: "Learning Activities & Interactions", description: "Engagement activities, simulations, and hands-on practice.",
    questions: [
      { id: "s5_q1", type: "checkbox_cards", label: "Which types of hands-on practice are most appropriate?", options: [{ label: "Software Simulations", value: "software-sims", description: "Click-through environments mimicking real tools" }, { label: "Role-Play Exercises", value: "role-play", description: "Practicing interpersonal or decision-making scenarios" }, { label: "Case Analysis", value: "case-analysis", description: "Deep dives into complex business problems" }, { label: "Peer Review", value: "peer-review", description: "Evaluating and critiquing colleagues' work" }] },
      { id: "s5_q2", type: "radio_pills", label: "Required fidelity level for scenario simulations?", options: [{ label: "Low (Text-based)", value: "low" }, { label: "Medium (Interactive 2D)", value: "medium" }, { label: "High (Immersive/3D)", value: "high" }] },
      { id: "s5_q3", type: "checkbox_pills", label: "Which collaboration mechanisms will be integrated?", options: [{ label: "Discussion Boards", value: "discussion-boards" }, { label: "Live Workshops", value: "live-workshops" }, { label: "Group Projects", value: "group-projects" }, { label: "Structured Peer Feedback", value: "peer-feedback" }] },
      { id: "s5_q4", type: "enhanced_scale", label: "Desired frequency of interactive elements in async modules?", scaleConfig: { min: 1, max: 4, labels: ["Every 5 mins", "Every 15 mins", "End of module", "None"] } },
      { id: "s5_q5", type: "textarea", rows: 4, label: "Describe the requirements for the capstone activity.", helpText: "The final project learners must complete to prove mastery." },
      { id: "s5_q6", type: "scale", label: "Required immediacy of feedback during practice?", scaleConfig: { min: 1, max: 5, minLabel: "Delayed/Manual", maxLabel: "Instant/Automated" } },
    ],
  },
  {
    id: "s6", title: "Assessment & Evaluation", description: "Measurement strategies, certification needs, data collection rigor.",
    questions: [
      { id: "s6_q1", type: "radio_cards", label: "Primary assessment strategy for validating competency?", options: [{ label: "Objective Knowledge Checks", value: "knowledge-checks", description: "Multiple choice, matching, true/false quizzes" }, { label: "Scenario-Based Branching", value: "scenario-based", description: "Decision paths with natural consequences" }, { label: "Performance Tasks", value: "performance-tasks", description: "Real-world assignments evaluated via rubric" }, { label: "Portfolio Review", value: "portfolio", description: "Collection of work demonstrating growth" }] },
      { id: "s6_q2", type: "labeled_slider", label: "Ratio of formative to summative assessments?", sliderConfig: { min: 0, max: 100, step: 10, unit: "% Formative" } },
      { id: "s6_q3", type: "checkbox_pills", label: "Which data collection methods will be utilized?", options: [{ label: "SCORM Tracking", value: "scorm" }, { label: "xAPI Statements", value: "xapi" }, { label: "Self-Reported Surveys", value: "surveys" }, { label: "Manager Evaluations", value: "manager-evals" }] },
      { id: "s6_q4", type: "toggle_switch", label: "Is formal certification required upon completion?", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "s6_q5", type: "radio_pills", label: "Timing strategy for formal assessments?", options: [{ label: "Pre and Post-Training", value: "pre-post" }, { label: "Post-Training Only", value: "post-only" }, { label: "Continuous/Embedded", value: "continuous" }, { label: "No Formal Assessment", value: "none" }] },
      { id: "s6_q6", type: "scale", label: "Target difficulty level for the final assessment?", scaleConfig: { min: 1, max: 5, minLabel: "Basic Recall", maxLabel: "Complex Synthesis" } },
    ],
  },
  {
    id: "s7", title: "Resources & Materials", description: "Existing asset quality, human resource availability, content gaps.",
    questions: [
      { id: "s7_q1", type: "radio_cards", label: "Quality and readiness of existing source materials?", options: [{ label: "Ready to Use", value: "ready", description: "Current, accurate, instructionally sound" }, { label: "Needs Minor Updates", value: "minor-updates", description: "Solid but requires formatting tweaks" }, { label: "Needs Major Overhaul", value: "major-overhaul", description: "Outdated, disorganized, or highly technical" }, { label: "Non-existent", value: "non-existent", description: "Must be generated from scratch via SME interviews" }] },
      { id: "s7_q2", type: "checkbox_pills", label: "Expected availability of Subject Matter Experts?", options: [{ label: "Dedicated Weekly Hours", value: "dedicated" }, { label: "Ad-hoc Interviews", value: "ad-hoc" }, { label: "Review/Sign-off Only", value: "review-only" }, { label: "Largely Unavailable", value: "unavailable" }] },
      { id: "s7_q3", type: "currency", label: "Target financial impact / ROI value per learner?", currencyConfig: { symbol: "$" } },
      { id: "s7_q4", type: "textarea", rows: 3, label: "Identify the most significant content gaps." },
      { id: "s7_q5", type: "radio_pills", label: "Expected shelf-life before major updates?", options: [{ label: "< 6 Months", value: "under-6m" }, { label: "6-12 Months", value: "6-12m" }, { label: "1-2 Years", value: "1-2y" }, { label: "> 2 Years", value: "over-2y" }] },
      { id: "s7_q6", type: "text", label: "Primary internal tool used for existing asset creation." },
    ],
  },
  {
    id: "s8", title: "Technology & Platform", description: "Integration details, API needs, and specific UX requirements.",
    questions: [
      { id: "s8_q1", type: "checkbox_cards", label: "Which enterprise systems require direct integration?", options: [{ label: "HRIS / HCM", value: "hris", description: "Automated user provisioning and role mapping" }, { label: "CRM", value: "crm", description: "Tie learning completion to sales metrics" }, { label: "Communication Tools", value: "comms", description: "Slack, Teams, or Zoom for notifications" }, { label: "BI Dashboards", value: "bi", description: "Tableau or PowerBI for advanced analytics" }] },
      { id: "s8_q2", type: "radio_pills", label: "Primary API data flow requirements?", options: [{ label: "Read Only (Import)", value: "read-only" }, { label: "Write Only (Export)", value: "write-only" }, { label: "Bi-directional Sync", value: "bi-directional" }, { label: "No API Required", value: "none" }] },
      { id: "s8_q3", type: "toggle_switch", label: "Is Single Sign-On (SSO) required?", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] },
      { id: "s8_q4", type: "textarea", rows: 3, label: "Describe any specific UX constraints or brand guidelines." },
      { id: "s8_q5", type: "checkbox_pills", label: "Which web browsers must be fully supported?", options: [{ label: "Google Chrome", value: "chrome" }, { label: "Microsoft Edge", value: "edge" }, { label: "Apple Safari", value: "safari" }, { label: "Mozilla Firefox", value: "firefox" }, { label: "Legacy (IE11)", value: "legacy" }] },
      { id: "s8_q6", type: "radio_cards", label: "Requirements for mobile offline synchronization?", options: [{ label: "Required (Full Course)", value: "full", description: "Entire modules downloadable and trackable offline" }, { label: "Required (Partial)", value: "partial", description: "Only specific assets need offline access" }, { label: "Not Required", value: "none", description: "Always-on internet connection assumed" }] },
    ],
  },
  {
    id: "s9", title: "Implementation & Rollout", description: "Deployment strategy, pilot selection, and change management.",
    questions: [
      { id: "s9_q1", type: "radio_cards", label: "Strategy for selecting the pilot cohort?", options: [{ label: "Volunteer Basis", value: "volunteer", description: "Open call for early adopters" }, { label: "Manager Nominated", value: "manager-nom", description: "Leaders select high-potential individuals" }, { label: "Random Selection", value: "random", description: "Statistically representative sample" }, { label: "Specific Department", value: "specific-dept", description: "Roll out to one business unit first" }] },
      { id: "s9_q2", type: "checkbox_pills", label: "Communication channels for the rollout campaign?", options: [{ label: "Email Campaigns", value: "email" }, { label: "Intranet Banners", value: "intranet" }, { label: "Town Hall Announcements", value: "town-halls" }, { label: "Manager 1:1s", value: "manager-1on1" }] },
      { id: "s9_q3", type: "date", label: "Target date for the pilot launch?" },
      { id: "s9_q4", type: "textarea", rows: 3, label: "Key change management risks associated with this rollout." },
      { id: "s9_q5", type: "scale", label: "Expected level of active leadership sponsorship?", scaleConfig: { min: 1, max: 10, minLabel: "Passive Support", maxLabel: "Active Championing" } },
      { id: "s9_q6", type: "text", label: "Primary incentive or recognition method for early completion." },
    ],
  },
  {
    id: "s10", title: "Success Metrics & Continuous Improvement", description: "ROI formulas, reporting frequencies, and iteration cycles.",
    questions: [
      { id: "s10_q1", type: "checkbox_cards", label: "Which ROI measurement models will be applied?", options: [{ label: "Phillips ROI Model", value: "phillips", description: "Converting business impact into monetary value" }, { label: "Kirkpatrick Level 4", value: "kirkpatrick-4", description: "Measuring specific business outcomes" }, { label: "Cost-Benefit Analysis", value: "cba", description: "Development costs vs operational savings" }, { label: "Time-to-Proficiency", value: "time-to-prof", description: "Reduction in time to reach full productivity" }] },
      { id: "s10_q2", type: "radio_pills", label: "Required reporting frequency to executive stakeholders?", options: [{ label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }, { label: "Quarterly", value: "quarterly" }, { label: "Annually", value: "annually" }] },
      { id: "s10_q3", type: "number_spinner", label: "Planned iteration cycle frequency (in months)?" },
      { id: "s10_q4", type: "textarea", rows: 4, label: "Describe the long-term maintenance strategy." },
      { id: "s10_q5", type: "enhanced_scale", label: "Expected timeline to realize measurable business impact?", scaleConfig: { min: 1, max: 4, labels: ["Immediate", "30-90 Days", "6 Months", "1+ Years"] } },
      { id: "s10_q6", type: "radio_pills", label: "Planned duration for formal post-training support?", options: [{ label: "30 Days", value: "30-days" }, { label: "60 Days", value: "60-days" }, { label: "90 Days", value: "90-days" }, { label: "Ongoing/Indefinite", value: "ongoing" }] },
    ],
  },
];

const DYNAMIC_ANSWERS: Record<string, string | string[] | number> = {
  s1_q1: ["revenue-growth", "innovation"], s1_q2: "apply",
  s1_q3: "Within 8 weeks, senior leaders will be able to identify at least 3 high-impact data science use cases, interpret key analytical outputs, and make data-informed decisions by applying structured frameworks in business scenarios, as measured through case-based assessments and a final strategic data initiative proposal.",
  s1_q4: 4, s1_q5: ["completion-rate", "skill-application", "process-speed"], s1_q6: "performance-gap",
  s2_q1: ["change-fatigue", "tech-anxiety", "perceived-value"], s2_q2: "microlearning", s2_q3: "no",
  s2_q4: "Limited understanding of data fundamentals, analytics concepts, and how data translates into business insights and decision-making.",
  s2_q5: 3, s2_q6: ["data-interpretation", "basic-stats", "report-gen"],
  s3_q1: "linear", s3_q2: ["industry-specific", "historical"], s3_q3: 10, s3_q4: 6, s3_q5: "build", s3_q6: "video",
  s4_q1: ["cognitivism", "experiential"], s4_q2: 20, s4_q3: "concept-mapping", s4_q4: "yes", s4_q5: 4, s4_q6: ["spaced-repetition", "job-aids"],
  s5_q1: ["software-sims", "case-analysis"], s5_q2: "medium", s5_q3: ["group-projects", "live-workshops"], s5_q4: 2,
  s5_q5: "Learners will complete a capstone by developing a data-driven strategic initiative for their organization. This includes identifying a high-impact use case, defining success metrics, interpreting sample analytics outputs, and outlining an implementation roadmap. Participants must present their proposal, justify decisions using data insights, and demonstrate alignment with business objectives.",
  s5_q6: 3,
  s6_q1: "knowledge-checks", s6_q2: 40, s6_q3: ["scorm", "manager-evals"], s6_q4: "yes", s6_q5: "continuous", s6_q6: 4,
  s7_q1: "non-existent", s7_q2: ["dedicated"], s7_q3: 3000,
  s7_q4: "Lack of content on translating business problems into data science use cases, evaluating model outputs and limitations, data governance and ethics for leaders, and structured decision-making frameworks. Missing guidance on stakeholder alignment, ROI measurement of data initiatives, and practical case studies.",
  s7_q5: "1-2y", s7_q6: "Articulate 360 (Storyline/Rise)",
  s8_q1: ["comms"], s8_q2: "read-only", s8_q3: "yes",
  s8_q4: "Must adhere to Acme Services brand guidelines—use approved blue/grey palette, clean typography, and minimalistic layouts. Ensure WCAG-compliant contrast, clear navigation, and professional, data-centric visuals suitable for senior leadership.",
  s8_q5: ["chrome", "safari"], s8_q6: "none",
  s9_q1: "manager-nom", s9_q2: ["email", "intranet", "town-halls", "manager-1on1"], s9_q3: "2026-06-30",
  s9_q4: "Resistance from senior leaders due to time constraints or perceived low relevance; low data literacy causing disengagement; misalignment with business priorities; limited leadership sponsorship; difficulty integrating learning into workflows.",
  s9_q5: 7, s9_q6: "Digital Badges & Bonus Rewards & Recognition Points",
  s10_q1: ["phillips", "time-to-prof"], s10_q2: "monthly", s10_q3: 6,
  s10_q4: "The program will be owned by the central L&D or Data Strategy team, with a designated program manager responsible for governance. Content will be reviewed biannually or triggered by changes in business strategy, tools, or data regulations. SMEs will update modules, while feedback and business impact metrics inform continuous improvements.",
  s10_q5: 4, s10_q6: "ongoing",
};

// ─── Blueprint data — Acme Services ──────────────────────────────────────────

const BLUEPRINT = {
  title: "Data-Driven Leadership: Strategic Data Science for Executives",
  organization: "Acme Services",
  role: "Instructional Designer",
  generated: "Polaris · Apr 2026",
  version: "1.0",
  executive_summary:
    "The ‘Data-Driven Leadership’ program is an 8-week, highly targeted learning initiative designed to bridge the data literacy gap among senior leaders at Acme Services. While executives possess deep financial services expertise, translating data science capabilities into actionable business strategies remains a critical performance gap. This program empowers 26-50 senior leaders to interpret analytical outputs, evaluate model limitations, and align data initiatives with overarching organizational goals, directly driving revenue growth and innovation.\n\nUtilizing a blended instructional strategy rooted in cognitivism and experiential learning, the 6-hour curriculum combines asynchronous microlearning (developed in Articulate 360) with synchronous live workshops and group case analyses. The program culminates in a practical capstone project where leaders propose a data-driven strategic initiative.",
  objectives: [
    { id: "obj1", title: "Identify Strategic Use Cases", description: "Identify at least 3 high-impact data science use cases aligned with Acme Services' business priorities.", metric: "Capstone Proposal Rubric", baseline: 1, target: 4, due: "Jun 15, 2026" },
    { id: "obj2", title: "Interpret Analytical Outputs", description: "Accurately interpret key data science model outputs, basic statistics, and report generations.", metric: "Case-Based Assessment Score", baseline: 2, target: 4, due: "Jun 1, 2026" },
    { id: "obj3", title: "Formulate Data-Driven Decisions", description: "Apply structured frameworks to make informed decisions and allocate resources efficiently.", metric: "Manager Evaluation (Post-30 Days)", baseline: 2, target: 5, due: "Jun 30, 2026" },
  ],
  audience: {
    roles: ["Senior Director", "Managing Director", "VP of Strategy"],
    experience: ["Senior", "Executive"],
    departments: [
      { department: "Ratings & Research", percentage: 40 },
      { department: "Strategy & Innovation", percentage: 35 },
      { department: "Operations", percentage: 25 },
    ],
    modalities: [
      { type: "Asynchronous Microlearning", percentage: 60 },
      { type: "Live Case Workshops", percentage: 20 },
      { type: "Peer Social Learning", percentage: 20 },
    ],
  },
  assessment: {
    overview: "A continuous assessment model utilizing pre/post evaluations to measure knowledge gain, embedded SCORM knowledge checks for formative feedback, and a heavily weighted capstone project to evaluate real-world skill application.",
    kpis: [
      { metric: "Program Completion Rate", target: "90%", method: "LMS Analytics", frequency: "Weekly" },
      { metric: "Skill Application (Capstone)", target: "85%", method: "Rubric Scoring", frequency: "End of Program" },
      { metric: "Time-to-Proficiency", target: "30 Days", method: "Manager Evaluations", frequency: "Post-Program (30 Days)" },
    ],
    methods: [
      { method: "Pre/Post Knowledge Assessment", timing: "Week 1 & Week 8", weight: "20%" },
      { method: "Module Knowledge Checks", timing: "End of Modules 1-3", weight: "40%" },
      { method: "Capstone Strategic Proposal", timing: "Week 8", weight: "40%" },
    ],
  },
  modules: [
    { id: "m1", num: 1, title: "Data Fundamentals for Financial Leaders", description: "Establishing a baseline understanding of data science concepts and terminology.", duration: "Week 1-2 (1.5 hrs)", delivery: "Asynchronous Microlearning", topics: ["Data Science vs. Traditional Analytics", "Basic Statistical Concepts for Executives"], activities: [{ type: "Exercise", activity: "Interactive Glossary & Concept Mapping", duration: "30 minutes" }], assessment: { type: "Knowledge Check", description: "Scenario-based quiz on identifying correct analytical approaches." } },
    { id: "m2", num: 2, title: "Translating Business Problems to Data Use Cases", description: "Frameworks for identifying and scoping high-impact data initiatives.", duration: "Week 3-4 (1.5 hrs)", delivery: "Blended (Async + Live Workshop)", topics: ["The Data-to-Value Framework", "Historical Data Analysis in Credit Ratings"], activities: [{ type: "Discussion", activity: "Group Case Analysis", duration: "45 minutes" }], assessment: { type: "Formative Assessment", description: "Drafting a preliminary use case statement." } },
    { id: "m3", num: 3, title: "Evaluating Models, Governance & Ethics", description: "Understanding model limitations, ROI measurement, and data governance.", duration: "Week 5-6 (1.5 hrs)", delivery: "Asynchronous Microlearning", topics: ["Interpreting Model Outputs & Limitations", "Data Ethics and Internal Compliance"], activities: [{ type: "Simulation", activity: "Software Simulation (Read-Only Dashboards)", duration: "40 minutes" }], assessment: { type: "Knowledge Check", description: "Identifying bias and limitations in sample model outputs." } },
    { id: "m4", num: 4, title: "Capstone: Strategic Data Initiative", description: "Synthesizing learning into a practical, actionable business proposal.", duration: "Week 7-8 (1.5 hrs)", delivery: "Live Workshop & Presentations", topics: ["Stakeholder Alignment", "Implementation Roadmapping"], activities: [{ type: "Project", activity: "Capstone Project Development", duration: "60 minutes" }], assessment: { type: "Presentation", description: "Presenting a data-driven strategic initiative to peers and SMEs." } },
  ],
  strategy: {
    overview: "The strategy leverages a blended, linear approach tailored for time-constrained executives. It combines cognitivism (mental models for data interpretation) with experiential learning (real-world Acme Services case studies). Content is delivered via 80% asynchronous microlearning (video-heavy, Articulate Rise) and 20% synchronous live workshops. Spaced repetition and job aids reinforce learning to combat tech anxiety and change fatigue.",
    modalities: [
      { type: "Asynchronous Microlearning", percentage: 80, rationale: "Accommodates 20+ hour work weeks and flexible locations.", tools: ["Articulate 360 (Rise/Storyline)", "Video Snippets"] },
      { type: "Synchronous Workshops", percentage: 20, rationale: "Facilitates group projects, social learning, and SME Q&A.", tools: ["MS Teams/Zoom", "Miro (Concept Mapping)"] },
    ],
    cohort: "Manager-nominated cohorts of 10-15 leaders to ensure high-touch facilitation and cross-functional peer networking.",
    accessibility: ["WCAG-compliant contrast using the approved design palette", "Closed captioning and transcripts for all video content", "Mobile-responsive design for Chrome/Safari access", "Screen-reader compatible Articulate modules"],
  },
  resources: {
    budget: { currency: "USD", total: 70000, items: [{ item: "ID & Content Development (Internal/Contract)", amount: 45000 }, { item: "SME Compensation/Backfill", amount: 15000 }, { item: "Specialized Tooling & Media Assets", amount: 3000 }, { item: "Rewards (Badges, Bonus Points)", amount: 7000 }] },
    human: [{ role: "Instructional Designer", fte: 1, duration: "8 weeks" }, { role: "Data Science SME", fte: 0.2, duration: "6 weeks" }, { role: "Program Manager", fte: 0.25, duration: "10 weeks" }],
    tools: [{ name: "Articulate 360", category: "Content Authoring", cost: "Existing License" }, { name: "Internal LMS (SCORM)", category: "LMS", cost: "Existing Infrastructure" }, { name: "Data Viz Simulators", category: "Specialized Tools", cost: "New Subscription" }],
  },
  timeline: {
    critical_path: ["Design & Prototyping", "Development & QA", "Launch & Delivery"],
    phases: [
      { phase: "Design & Prototyping", start: "Apr 26, 2026", end: "May 10, 2026", milestones: ["SME Alignment", "Storyboard Approval", "UI/UX Brand Check"], dependencies: ["SME Availability"] },
      { phase: "Development & QA", start: "May 11, 2026", end: "May 31, 2026", milestones: ["Articulate Build", "SCORM Testing", "Pilot Review"], dependencies: ["Content Sign-off"] },
      { phase: "Launch & Delivery", start: "Jun 1, 2026", end: "Jun 30, 2026", milestones: ["Cohort Kickoff", "Live Workshops", "Capstone Presentations"], dependencies: ["Manager Nominations"] },
    ],
  },
  metrics: {
    cadence: "Monthly",
    items: [
      { metric: "Phillips ROI (Business Impact)", baseline: "0 (No formal tracking)", target: "15% increase in approved data initiatives", method: "Data Strategy Team Tracking", timeline: "6 Months Post-Launch" },
      { metric: "Process Speed (Decision Making)", baseline: "Slow/Ad-hoc", target: "20% reduction in initiative scoping time", method: "Manager Surveys", timeline: "3 Months Post-Launch" },
      { metric: "Learner Engagement", baseline: "N/A", target: "85% positive feedback score", method: "Post-Course Evaluation", timeline: "Immediate (June 30)" },
    ],
  },
  risks: [
    { risk: "Executive Time Constraints", probability: "High", impact: "High", mitigation: "Strict adherence to microlearning (max 15-min chunks); integrate into existing workflows." },
    { risk: "Low Data Literacy / Tech Anxiety", probability: "High", impact: "Medium", mitigation: "Provide foundational pre-work glossary; use intuitive, read-only dashboard simulations." },
    { risk: "Limited Leadership Sponsorship", probability: "Medium", impact: "High", mitigation: "Leverage manager nominations; align capstone directly to current strategic OKRs." },
  ],
  contingency: ["If live workshop attendance is low, record sessions and require asynchronous peer review of capstones.", "If completion lags, trigger automated LMS reminders and escalate to nominating managers."],
  sustainability: {
    content: "To ensure the program remains relevant within the fast-paced financial services sector, ownership will be jointly held by Central L&D and the Data Strategy team. The curriculum is designed with a 1-2 year shelf life, utilizing modular Articulate 360 files to allow for rapid updates without overhauling the entire program.",
    review_frequency: "Biannually",
    triggers: ["Changes in Data Strategy", "New Financial Data Regulations", "Introduction of new internal analytics tools"],
    scaling: ["Convert live workshops to asynchronous peer-review formats for global rollout.", "Translate core modules for non-English speaking regional offices.", "Develop a 'Train-the-Trainer' model for regional Data SMEs."],
  },
};

// ─── Shared static field renderers ────────────────────────────────────────────

function RadioPills({ data }: { data: RadioPillsData }) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.options.map((opt) => {
        const active = opt === data.selected;
        return (
          <span key={opt} className={["inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-medium border transition-colors", active ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/[0.04] text-neutral-400"].join(" ")}>
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
          <span key={opt} className={["inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-medium border transition-colors", active ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/[0.04] text-neutral-400"].join(" ")}>
            {active && (
              <svg className="h-3 w-3 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            )}
            {opt}
          </span>
        );
      })}
    </div>
  );
}

function TextareaDisplay({ data }: { data: TextareaData }) {
  return <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] leading-relaxed text-neutral-300 whitespace-pre-wrap" style={{ minHeight: `${(data.rows ?? 3) * 1.5}rem` }}>{data.value}</div>;
}

function TextFieldDisplay({ data }: { data: TextField }) {
  return <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] text-neutral-300">{data.value}</div>;
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
      <div className="relative h-2 rounded-full bg-white/10"><div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${pct}%` }} /></div>
      <div className="flex justify-between">
        {steps.map((s) => (
          <div key={s} className="flex flex-col items-center gap-0.5">
            <div className={["h-1.5 w-0.5 rounded-full", s === data.value ? "bg-emerald-400" : "bg-white/15"].join(" ")} />
            <span className={["text-[10px]", s === data.value ? "text-emerald-400 font-semibold" : "text-neutral-600"].join(" ")}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrencyDisplay({ data }: { data: CurrencyData }) {
  return (
    <div className="relative">
      <span className="absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-medium text-neutral-500">{data.symbol}</span>
      <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-8 pr-4 text-[13px] text-neutral-300">{data.amount.toLocaleString()}</div>
    </div>
  );
}

function NumberDisplay({ data }: { data: NumberData }) {
  return <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] text-neutral-300">{data.value}</div>;
}

function StaticFieldRenderer({ field }: { field: FieldData }) {
  switch (field.type) {
    case "radio": return <RadioPills data={field} />;
    case "check": return <CheckPills data={field} />;
    case "textarea": return <TextareaDisplay data={field} />;
    case "text": return <TextFieldDisplay data={field} />;
    case "scale": return <ScaleDisplay data={field} />;
    case "currency": return <CurrencyDisplay data={field} />;
    case "number": return <NumberDisplay data={field} />;
    default: return null;
  }
}

// ─── Dynamic question renderer (reads raw question + answer) ───────────────────

function OptionPills({ options, selected, multi }: { options: DQOption[]; selected: string[]; multi: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <span key={opt.value} className={["inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-medium border transition-colors", active ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300" : "border-white/10 bg-white/[0.04] text-neutral-400"].join(" ")}>
            {active && (multi
              ? <svg className="h-3 w-3 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              : <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" strokeWidth={2.5} />)}
            {opt.label}
          </span>
        );
      })}
    </div>
  );
}

function OptionCards({ options, selected, multi }: { options: DQOption[]; selected: string[]; multi: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <div key={opt.value} className={["rounded-xl border px-4 py-3 transition-colors", active ? "border-emerald-500/50 bg-emerald-500/[0.07]" : "border-white/10 bg-white/[0.02]"].join(" ")}>
            <div className="flex items-start gap-2.5">
              <div className={["mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border-2 transition-colors", multi ? "rounded" : "rounded-full", active ? "border-emerald-400 bg-emerald-400/20" : "border-white/20"].join(" ")}>
                {active && (multi
                  ? <svg className="h-2.5 w-2.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                  : <div className="h-2 w-2 rounded-full bg-emerald-400" />)}
              </div>
              <div>
                <p className={["text-[13px] font-medium", active ? "text-emerald-300" : "text-neutral-300"].join(" ")}>{opt.label}</p>
                {opt.description && <p className="mt-0.5 text-[11px] text-neutral-500">{opt.description}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ToggleDisplay({ options, selected }: { options: DQOption[]; selected: string }) {
  const yes = options.find((o) => o.value === "yes") ?? options[0];
  const no = options.find((o) => o.value === "no") ?? options[1];
  const isOn = selected === yes.value;
  return (
    <div className="flex items-center gap-3">
      <span className={["text-[13px] font-medium", !isOn ? "text-white" : "text-neutral-600"].join(" ")}>{no.label}</span>
      <div className={["relative inline-flex h-7 w-12 items-center rounded-full transition-colors", isOn ? "bg-emerald-500" : "bg-white/15"].join(" ")}>
        <span className={["inline-block h-5 w-5 rounded-full bg-white shadow transition-transform", isOn ? "translate-x-6" : "translate-x-1"].join(" ")} />
      </div>
      <span className={["text-[13px] font-medium", isOn ? "text-white" : "text-neutral-600"].join(" ")}>{yes.label}</span>
    </div>
  );
}

function SliderDisplay({ value, min, max, unit }: { value: number; min: number; max: number; unit: string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="text-center"><span className="text-2xl font-bold text-emerald-400">{value}</span><span className="ml-0.5 text-sm text-neutral-500">{unit}</span></div>
      <div className="relative h-2 rounded-full bg-white/10">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${pct}%` }} />
        <div className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-emerald-400 bg-[#0a0a0f] shadow-[0_0_10px_rgba(52,211,153,0.4)]" style={{ left: `calc(${pct}% - 8px)` }} />
      </div>
    </div>
  );
}

function EnhancedScaleDisplay({ value, labels }: { value: number; labels: string[] }) {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="text-center"><span className="text-xl font-semibold text-emerald-400">{labels[value - 1] ?? value}</span></div>
      <div className="flex gap-1.5">
        {labels.map((l, i) => (
          <div key={l} className="flex-1">
            <div className={["h-1.5 rounded-full transition-colors", i + 1 === value ? "bg-emerald-400" : "bg-white/10"].join(" ")} />
            <p className={["mt-1.5 text-center text-[10px]", i + 1 === value ? "text-emerald-400 font-semibold" : "text-neutral-600"].join(" ")}>{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DynamicFieldRenderer({ question }: { question: DQuestion }) {
  const answer = DYNAMIC_ANSWERS[question.id];
  const asArray = Array.isArray(answer) ? (answer as string[]) : [];
  const asString = typeof answer === "string" ? answer : "";
  const asNumber = typeof answer === "number" ? answer : 0;

  switch (question.type) {
    case "checkbox_cards": return <OptionCards options={question.options ?? []} selected={asArray} multi />;
    case "radio_cards": return <OptionCards options={question.options ?? []} selected={[asString]} multi={false} />;
    case "checkbox_pills": return <OptionPills options={question.options ?? []} selected={asArray} multi />;
    case "radio_pills": return <OptionPills options={question.options ?? []} selected={[asString]} multi={false} />;
    case "toggle_switch": return <ToggleDisplay options={question.options ?? []} selected={asString} />;
    case "textarea": return <TextareaDisplay data={{ type: "textarea", value: asString, rows: question.rows }} />;
    case "text": return <TextFieldDisplay data={{ type: "text", value: asString }} />;
    case "date": {
      const d = new Date(asString + "T00:00:00");
      const formatted = isNaN(d.getTime()) ? asString : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      return (
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] text-neutral-300">
          <Calendar className="h-3.5 w-3.5 text-emerald-400" strokeWidth={1.75} />{formatted}
        </div>
      );
    }
    case "currency": return <CurrencyDisplay data={{ type: "currency", amount: asNumber, symbol: question.currencyConfig?.symbol ?? "$" }} />;
    case "number_spinner": return <NumberDisplay data={{ type: "number", value: asNumber }} />;
    case "labeled_slider": {
      const c = question.sliderConfig ?? { min: 0, max: 100, step: 1, unit: "" };
      return <SliderDisplay value={asNumber} min={c.min} max={c.max} unit={c.unit} />;
    }
    case "enhanced_scale": return <EnhancedScaleDisplay value={asNumber} labels={question.scaleConfig?.labels ?? []} />;
    case "scale": {
      const c = question.scaleConfig ?? { min: 1, max: 5 };
      return <ScaleDisplay data={{ type: "scale", value: asNumber, min: c.min, max: c.max, minLabel: c.minLabel, maxLabel: c.maxLabel }} />;
    }
    default: return null;
  }
}

// ─── Static Questionnaire Card ────────────────────────────────────────────────

const STATIC_ICONS = [Briefcase, MapPin, Users];

function StaticQuestionnaireCard({ fullscreen = false }: { fullscreen?: boolean }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const section = STATIC_SECTIONS[active];

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-500">Phase 1 · Static Questionnaire</span>
        </div>
        <p className="text-[11px] text-neutral-600 ml-3.5">Baseline context capture · 3 sections</p>
      </div>

      <div className="flex border-b border-white/[0.06]">
        {STATIC_SECTIONS.map((s, i) => {
          const Icon = STATIC_ICONS[i];
          return (
            <button key={s.id} onClick={() => setActive(i)} className={["flex flex-1 items-center justify-center gap-1.5 py-3 text-[11px] font-medium transition-colors border-b-2 -mb-px", active === i ? "border-emerald-500 text-emerald-400" : "border-transparent text-neutral-600 hover:text-neutral-400"].join(" ")}>
              <Icon className="h-3 w-3 shrink-0" strokeWidth={2} />
              <span className="hidden sm:inline">{s.title.split(" ")[0]}</span>
              <span className="sm:hidden">{i + 1}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5" style={fullscreen ? undefined : { maxHeight: "460px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }} className="space-y-5">
            <div>
              <h3 className="text-[13px] font-semibold text-white">{section.title}</h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">{section.subtitle}</p>
            </div>
            {section.fields.map((f, idx) => (
              <motion.div key={f.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: idx * 0.04, ease: EASE }} className="space-y-2">
                <div>
                  <label className="text-[12px] font-medium text-neutral-300">{f.label}</label>
                  {f.help && <p className="text-[11px] text-neutral-600 mt-0.5">{f.help}</p>}
                </div>
                <StaticFieldRenderer field={f.field} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <SectionFooterNav active={active} total={STATIC_SECTIONS.length} setActive={setActive} dots />
    </div>
  );
}

// ─── Dynamic Questionnaire Card ───────────────────────────────────────────────

function DynamicQuestionnaireCard({ fullscreen = false }: { fullscreen?: boolean }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const section = DYNAMIC_SECTIONS[active];
  const total = DYNAMIC_SECTIONS.length;

  return (
    <div className="flex flex-col rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-emerald-500/[0.12] bg-emerald-500/[0.03]">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-400">Phase 2 · AI-Generated Questions</span>
        </div>
        <p className="text-[11px] text-neutral-600 ml-3.5">Context-aware deep dive · 10 sections, 60 questions</p>
      </div>

      <div className="flex items-center gap-0.5 overflow-x-auto border-b border-white/[0.05] px-4 py-2" style={{ scrollbarWidth: "none" }}>
        {DYNAMIC_SECTIONS.map((s, i) => (
          <button key={s.id} onClick={() => setActive(i)} title={s.title} className={["flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-[11px] font-semibold transition-all duration-150", active === i ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40" : "text-neutral-600 hover:text-neutral-400 hover:bg-white/[0.03]"].join(" ")}>{i + 1}</button>
        ))}
        <div className="ml-auto shrink-0 text-[10px] text-neutral-600 pl-3">{active + 1} / {total}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5" style={fullscreen ? undefined : { maxHeight: "460px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }} className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/15 text-[11px] font-bold text-emerald-400">{active + 1}</span>
              <h3 className="text-[13px] font-semibold text-white">{section.title}</h3>
            </div>
            {section.questions.map((q, idx) => (
              <motion.div key={q.id} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, delay: idx * 0.04, ease: EASE }} className="space-y-2">
                <div>
                  <label className="text-[12px] font-medium text-neutral-300">{q.label}</label>
                  {q.helpText && <p className="text-[11px] text-neutral-600 mt-0.5">{q.helpText}</p>}
                </div>
                <DynamicFieldRenderer question={q} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <SectionFooterNav active={active} total={total} setActive={setActive} progress />
    </div>
  );
}

function SectionFooterNav({ active, total, setActive, dots, progress }: { active: number; total: number; setActive: (fn: (p: number) => number) => void; dots?: boolean; progress?: boolean }) {
  return (
    <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
      <button onClick={() => setActive((p) => Math.max(0, p - 1))} disabled={active === 0} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-medium text-neutral-500 transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
        <ChevronLeft className="h-3.5 w-3.5" />Prev
      </button>
      {dots && (
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <button key={i} onClick={() => setActive(() => i)} className={["h-1.5 rounded-full transition-all duration-200", active === i ? "w-5 bg-emerald-400" : "w-1.5 bg-white/20 hover:bg-white/40"].join(" ")} />
          ))}
        </div>
      )}
      {progress && (
        <div className="h-1 flex-1 mx-4 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300" style={{ width: `${((active + 1) / total) * 100}%` }} /></div>
      )}
      <button onClick={() => setActive((p) => Math.min(total - 1, p + 1))} disabled={active === total - 1} className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[12px] font-medium text-neutral-500 transition-colors hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
        Next<ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── Blueprint: metric card ───────────────────────────────────────────────────

function MetricCard({ icon: Icon, label, value, suffix, accent, delay }: { icon: React.ElementType; label: string; value: number; suffix?: string; accent: Accent; delay: number }) {
  const a = ACCENT[accent];
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-white/[0.12]"
    >
      <div className={["absolute inset-0 opacity-[0.04] transition-opacity group-hover:opacity-[0.08]", a.bar].join(" ")} />
      <div className="relative">
        <div className={["mb-4 inline-flex rounded-xl p-2.5 transition-transform group-hover:scale-110", a.iconBg].join(" ")}><Icon className={["h-5 w-5", a.text].join(" ")} strokeWidth={1.75} /></div>
        <p className="text-[12px] font-medium text-neutral-500">{label}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white tabular-nums">{value}</span>
          {suffix && <span className={["text-base font-medium", a.text].join(" ")}>{suffix}</span>}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Blueprint: expandable section ────────────────────────────────────────────

interface BPSection { id: string; title: string; icon: React.ElementType; accent: Accent; description: string }

function ExpandableSection({ section, isExpanded, onToggle, children }: { section: BPSection; isExpanded: boolean; onToggle: () => void; children: React.ReactNode }) {
  const a = ACCENT[section.accent];
  const Icon = section.icon;
  const reduced = useReducedMotion();
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left transition-colors hover:bg-white/[0.02]" aria-expanded={isExpanded}>
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className={["shrink-0 rounded-xl p-2.5", a.iconBg].join(" ")}><Icon className={["h-5 w-5", a.text].join(" ")} strokeWidth={1.75} /></div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-white">{section.title}</h3>
            <p className="text-[12px] text-neutral-500 mt-0.5 truncate">{section.description}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="shrink-0 rounded-full bg-white/5 p-2"><ChevronDown className="h-4 w-4 text-neutral-400" /></motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: reduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: reduced ? 0 : 0.2 } }} style={{ overflow: "hidden" }}>
            <div className="border-t border-white/[0.06] p-4 sm:p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Blueprint: section bodies ────────────────────────────────────────────────

function ObjectivesBody() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {BLUEPRINT.objectives.map((obj, i) => {
        const pct = Math.round((obj.baseline / obj.target) * 100);
        return (
          <div key={obj.id} className="flex h-full flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="mb-3 flex items-start justify-between">
              <div className="rounded-lg bg-emerald-500/10 p-2"><Target className="h-5 w-5 text-emerald-400" strokeWidth={1.75} /></div>
              <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] text-neutral-400">{obj.due}</span>
            </div>
            <h4 className="text-[14px] font-semibold text-white">{obj.title}</h4>
            <p className="mt-1 mb-3 flex-grow text-[12px] leading-relaxed text-neutral-500">{obj.description}</p>
            <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300"><BarChart3 className="h-3 w-3" />{obj.metric}</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"><p className="text-[10px] text-neutral-500">Baseline</p><p className="text-base font-semibold text-white">{obj.baseline}</p></div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2"><p className="text-[10px] text-neutral-500">Target</p><p className="text-base font-bold text-emerald-400">{obj.target}</p></div>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[10px] text-neutral-500"><span>Current progress</span><span>{pct}%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: EASE }} className="h-full rounded-full bg-emerald-400" /></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DistributionBars({ data, accent }: { data: { label: string; percentage: number }[]; accent: Accent }) {
  const a = ACCENT[accent];
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="mb-1.5 flex justify-between text-[12px]"><span className="text-neutral-300">{d.label}</span><span className={["font-semibold", a.text].join(" ")}>{d.percentage}%</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: `${d.percentage}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }} className={["h-full rounded-full", a.bar].join(" ")} /></div>
        </div>
      ))}
    </div>
  );
}

function TargetAudienceBody() {
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center gap-2"><Users className="h-4 w-4 text-emerald-400" /><h4 className="text-[13px] font-semibold text-white">Target Roles</h4></div>
        <div className="flex flex-wrap gap-2">{BLUEPRINT.audience.roles.map((r) => <span key={r} className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3.5 py-1.5 text-[12px] text-emerald-300">{r}</span>)}</div>
      </div>
      <div>
        <p className="mb-3 text-[12px] font-medium text-neutral-400">Experience Levels</p>
        <div className="flex flex-wrap gap-2">{BLUEPRINT.audience.experience.map((e) => <span key={e} className="rounded-lg bg-white/5 px-3.5 py-1.5 text-[12px] text-neutral-300">{e}</span>)}</div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="mb-3 text-[12px] font-medium text-neutral-400">Department Distribution</p>
          <DistributionBars data={BLUEPRINT.audience.departments.map((d) => ({ label: d.department, percentage: d.percentage }))} accent="teal" />
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="mb-3 text-[12px] font-medium text-neutral-400">Learning Preferences</p>
          <DistributionBars data={BLUEPRINT.audience.modalities.map((m) => ({ label: m.type, percentage: m.percentage }))} accent="emerald" />
        </div>
      </div>
    </div>
  );
}

function AssessmentBody() {
  return (
    <div className="space-y-5">
      <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-[13px] leading-relaxed text-neutral-400">{BLUEPRINT.assessment.overview}</p>
      <div>
        <div className="mb-3 flex items-center gap-2"><BarChart3 className="h-4 w-4 text-emerald-400" /><h4 className="text-[13px] font-semibold text-white">Key Performance Indicators</h4></div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {BLUEPRINT.assessment.kpis.map((kpi) => (
            <div key={kpi.metric} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="mb-2 flex items-start justify-between gap-2"><p className="text-[12px] font-semibold text-white">{kpi.metric}</p><span className="text-xl font-bold text-emerald-400">{kpi.target}</span></div>
              <p className="text-[11px] text-neutral-500">{kpi.method}</p>
              <p className="mt-1 text-[11px] text-neutral-600">{kpi.frequency}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-400" /><h4 className="text-[13px] font-semibold text-white">Evaluation Methods</h4></div>
        <div className="space-y-2">
          {BLUEPRINT.assessment.methods.map((m) => (
            <div key={m.method} className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5">
              <div><p className="text-[13px] font-medium text-white">{m.method}</p><p className="text-[11px] text-neutral-500">{m.timing}</p></div>
              <span className="text-base font-bold text-emerald-400">{m.weight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentOutlineBody() {
  const [open, setOpen] = useState<string | null>(BLUEPRINT.modules[0].id);
  return (
    <div className="relative">
      <div className="absolute top-2 bottom-2 left-[18px] w-px bg-white/10" />
      <div className="space-y-3">
        {BLUEPRINT.modules.map((mod) => {
          const isOpen = open === mod.id;
          return (
            <div key={mod.id} className="relative pl-12">
              <div className="absolute top-3 left-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/30 bg-[#0a0a0f] text-[13px] font-bold text-emerald-400">{mod.num}</div>
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
                <button onClick={() => setOpen(isOpen ? null : mod.id)} className="flex w-full items-start justify-between gap-3 p-4 text-left transition-colors hover:bg-white/[0.02]">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white">{mod.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500"><Clock className="h-3 w-3" />{mod.duration}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500"><PlayCircle className="h-3 w-3" />{mod.delivery}</span>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0"><ChevronDown className="h-4 w-4 text-neutral-500" /></motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                      <div className="space-y-4 border-t border-white/[0.06] p-4">
                        <p className="text-[12px] leading-relaxed text-neutral-400">{mod.description}</p>
                        <div>
                          <p className="mb-2 text-[11px] font-semibold text-neutral-500">TOPICS</p>
                          <div className="flex flex-wrap gap-2">{mod.topics.map((t) => <span key={t} className="rounded-lg bg-white/5 px-3 py-1.5 text-[12px] text-neutral-300">{t}</span>)}</div>
                        </div>
                        <div>
                          <p className="mb-2 text-[11px] font-semibold text-neutral-500">LEARNING ACTIVITIES</p>
                          <div className="space-y-2">{mod.activities.map((act) => (
                            <div key={act.activity} className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
                              <div className="mt-0.5 shrink-0 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">{act.type}</div>
                              <div><p className="text-[12px] text-neutral-300">{act.activity}</p><p className="text-[11px] text-neutral-600">{act.duration}</p></div>
                            </div>
                          ))}</div>
                        </div>
                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-3">
                          <div className="mb-1 flex items-center gap-2"><Target className="h-3.5 w-3.5 text-emerald-400" /><span className="text-[12px] font-semibold text-emerald-300">{mod.assessment.type}</span></div>
                          <p className="text-[12px] text-neutral-400">{mod.assessment.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StrategyBody() {
  return (
    <div className="space-y-5">
      <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-[13px] leading-relaxed text-neutral-400">{BLUEPRINT.strategy.overview}</p>
      <div>
        <div className="mb-3 flex items-center gap-2"><Layers className="h-4 w-4 text-emerald-400" /><h4 className="text-[13px] font-semibold text-white">Delivery Modalities</h4></div>
        <div className="space-y-3">
          {BLUEPRINT.strategy.modalities.map((m, i) => (
            <div key={m.type} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <div className="mb-2 flex items-start justify-between gap-3"><div><p className="text-[13px] font-semibold text-white">{m.type}</p><p className="text-[11px] text-neutral-500">{m.rationale}</p></div><span className="text-xl font-bold text-emerald-400">{m.percentage}%</span></div>
              <div className="mb-3 h-2 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: `${m.percentage}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }} className="h-full rounded-full bg-emerald-400" /></div>
              <div className="flex flex-wrap gap-2">{m.tools.map((t) => <span key={t} className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300">{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-2 flex items-center gap-2"><Users className="h-4 w-4 text-teal-400" /><h4 className="text-[13px] font-semibold text-white">Cohort Model</h4></div>
          <p className="text-[12px] leading-relaxed text-neutral-400">{BLUEPRINT.strategy.cohort}</p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-2 flex items-center gap-2"><Accessibility className="h-4 w-4 text-amber-400" /><h4 className="text-[13px] font-semibold text-white">Accessibility</h4></div>
          <ul className="space-y-1.5">{BLUEPRINT.strategy.accessibility.map((c) => <li key={c} className="flex items-start gap-2 text-[12px] text-neutral-400"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />{c}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function ResourcesBody() {
  const { budget, human, tools } = BLUEPRINT.resources;
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-3 flex items-center gap-2"><DollarSign className="h-4 w-4 text-emerald-400" /><h4 className="text-[13px] font-semibold text-white">Budget Allocation</h4></div>
        <div className="space-y-2">
          {budget.items.map((line, i) => {
            const pct = Math.round((line.amount / budget.total) * 100);
            return (
              <div key={line.item} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="mb-1.5 flex items-center justify-between"><span className="text-[12px] text-neutral-300">{line.item}</span><span className="text-[12px] font-bold text-emerald-400">${line.amount.toLocaleString()}</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }} className="h-full rounded-full bg-emerald-400" /></div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] p-3.5"><span className="text-[13px] font-semibold text-white">Total Programme Budget</span><span className="text-lg font-bold text-emerald-400">${budget.total.toLocaleString()} {budget.currency}</span></div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center gap-2"><Users className="h-4 w-4 text-teal-400" /><h4 className="text-[13px] font-semibold text-white">Human Resources</h4></div>
          <div className="space-y-2">{human.map((h) => (
            <div key={h.role} className="rounded-lg bg-white/5 p-3"><p className="mb-1 text-[12px] font-semibold text-white">{h.role}</p><div className="flex items-center justify-between text-[11px]"><span className="text-neutral-500">FTE: <span className="text-emerald-400 font-semibold">{h.fte}</span></span><span className="text-neutral-500">{h.duration}</span></div></div>
          ))}</div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center gap-2"><Wrench className="h-4 w-4 text-amber-400" /><h4 className="text-[13px] font-semibold text-white">Tools & Platforms</h4></div>
          <div className="space-y-2">{tools.map((t) => (
            <div key={t.name} className="rounded-lg bg-white/5 p-3"><p className="mb-1 text-[12px] font-medium text-white">{t.name}</p><div className="flex items-center gap-3 text-[11px]"><span className="text-emerald-400">{t.category}</span><span className="text-neutral-500">{t.cost}</span></div></div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

function TimelineBody() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5">
        <div className="mb-1 flex items-center gap-2 text-[12px] font-semibold text-amber-400"><ChevronRight className="h-3.5 w-3.5" />Critical Path</div>
        <p className="text-[12px] text-neutral-400">{BLUEPRINT.timeline.critical_path.join("  →  ")}</p>
      </div>
      <div className="relative">
        <div className="absolute top-2 bottom-2 left-[11px] w-px bg-white/10" />
        <div className="space-y-3">
          {BLUEPRINT.timeline.phases.map((phase, i) => (
            <motion.div key={phase.phase} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }} className="relative pl-9">
              <div className="absolute top-4 left-0 h-6 w-6 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10" />
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[14px] font-semibold text-white">{phase.phase}</p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500"><Calendar className="h-3 w-3" />{phase.start} – {phase.end}</span>
                </div>
                <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-3">{phase.milestones.map((m) => <li key={m} className="flex items-center gap-1.5 text-[11px] text-neutral-400"><CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />{m}</li>)}</ul>
                <div className="mt-3 rounded-lg bg-white/5 px-3 py-2"><span className="text-[10px] text-neutral-500">Dependencies: </span><span className="text-[11px] text-emerald-400">{phase.dependencies.join(", ")}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricsBody() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5"><Calendar className="h-4 w-4 text-emerald-400" /><span className="text-[13px] font-semibold text-white">{BLUEPRINT.metrics.cadence} Reporting Cadence</span></div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {BLUEPRINT.metrics.items.map((m) => (
          <div key={m.metric} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="mb-4 flex items-start justify-between gap-3"><p className="text-[14px] font-bold text-white leading-tight">{m.metric}</p><div className="shrink-0 rounded-full bg-emerald-500/15 p-2"><TrendingUp className="h-4 w-4 text-emerald-400" /></div></div>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="border-b border-white/10 bg-white/[0.02] p-3"><p className="text-[10px] uppercase tracking-wider text-neutral-500">Baseline</p><p className="text-[13px] font-semibold text-white">{m.baseline}</p></div>
              <div className="bg-emerald-500/[0.06] p-3"><p className="text-[10px] uppercase tracking-wider text-emerald-500">Target</p><p className="text-[13px] font-bold text-emerald-400">{m.target}</p></div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2"><Activity className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" /><div><p className="text-[10px] text-neutral-500">Method</p><p className="text-[12px] text-neutral-300">{m.method}</p></div></div>
              <div className="flex items-start gap-2"><Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-400" /><div><p className="text-[10px] text-neutral-500">Timeline</p><p className="text-[12px] text-neutral-300">{m.timeline}</p></div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskBody() {
  const probColor = (v: string) => (v === "High" ? "text-rose-400" : v === "Medium" ? "text-amber-400" : "text-emerald-400");
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {BLUEPRINT.risks.map((r) => (
          <div key={r.risk} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="mb-3 flex items-start gap-3">
              <div className="shrink-0 rounded-lg bg-amber-500/10 p-2"><AlertTriangle className="h-4 w-4 text-amber-400" /></div>
              <div><p className="text-[13px] font-semibold text-white">{r.risk}</p><div className="mt-1 flex items-center gap-3 text-[11px] text-neutral-500"><span>Prob: <span className={probColor(r.probability)}>{r.probability}</span></span><span>Impact: <span className={probColor(r.impact)}>{r.impact}</span></span></div></div>
            </div>
            <div className="rounded-lg bg-white/5 p-3"><div className="mb-1 flex items-center gap-1.5"><Shield className="h-3 w-3 text-emerald-400" /><span className="text-[11px] font-medium text-white">Mitigation</span></div><p className="text-[12px] leading-relaxed text-neutral-400">{r.mitigation}</p></div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4">
        <div className="mb-3 flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-400" /><h4 className="text-[13px] font-semibold text-white">Contingency Plans</h4></div>
        <ul className="space-y-2">{BLUEPRINT.contingency.map((c) => <li key={c} className="flex items-start gap-2 text-[12px] text-neutral-400"><ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />{c}</li>)}</ul>
      </div>
    </div>
  );
}

function SustainabilityBody() {
  const s = BLUEPRINT.sustainability;
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5">
        <div className="mb-3 flex items-center gap-2"><Leaf className="h-5 w-5 text-emerald-400" /><h4 className="text-[14px] font-bold text-white">Long-Term Viability</h4></div>
        <p className="text-[13px] leading-relaxed text-neutral-400">{s.content}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center gap-2"><RefreshCw className="h-4 w-4 text-emerald-400" /><h4 className="text-[13px] font-semibold text-white">Maintenance Schedule</h4></div>
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-emerald-500/10 p-3"><Calendar className="h-4 w-4 shrink-0 text-emerald-400" /><div><p className="text-[10px] uppercase tracking-wider text-emerald-500">Review Frequency</p><p className="text-[13px] font-medium text-white">{s.review_frequency}</p></div></div>
          <div className="mb-2 flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5 text-amber-400" /><span className="text-[12px] font-semibold text-white">Update Triggers</span></div>
          <ul className="space-y-1.5">{s.triggers.map((t) => <li key={t} className="flex items-start gap-2 rounded-lg bg-white/5 p-2.5 text-[12px] text-neutral-400"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />{t}</li>)}</ul>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-teal-400" /><h4 className="text-[13px] font-semibold text-white">Scaling Considerations</h4></div>
          <div className="space-y-2">{s.scaling.map((c, i) => (
            <div key={c} className="flex items-start gap-3 rounded-lg bg-white/5 p-3"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-400">{i + 1}</span><p className="text-[12px] leading-relaxed text-neutral-400">{c}</p></div>
          ))}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Blueprint Viewer (Polaris dashboard UX) ──────────────────────────────────

const BP_SECTIONS: BPSection[] = [
  { id: "learning_objectives", title: "Learning Objectives", icon: Target, accent: "emerald", description: "3 objectives to achieve · Target completion rates and KPIs defined" },
  { id: "target_audience", title: "Target Audience", icon: Users, accent: "teal", description: "3 target roles · 3 learning modalities · Demographics analysed" },
  { id: "assessment_strategy", title: "Assessment Strategy", icon: BarChart3, accent: "emerald", description: "3 KPIs defined · 3 evaluation methods · Continuous measurement" },
  { id: "content_outline", title: "Content Outline", icon: BookOpen, accent: "emerald", description: "4 learning modules · 4 activities · 8 topics covered" },
  { id: "instructional_strategy", title: "Instructional Strategy", icon: FileText, accent: "emerald", description: "2 delivery modalities · 4 accessibility considerations · Cohort model" },
  { id: "resources", title: "Resources & Budget", icon: DollarSign, accent: "emerald", description: "USD 70,000 budget · 3 team roles · 3 platforms" },
  { id: "implementation_timeline", title: "Implementation Timeline", icon: Calendar, accent: "teal", description: "3 phases from start to finish · 9 milestones · Critical path defined" },
  { id: "success_metrics", title: "Success Metrics", icon: TrendingUp, accent: "emerald", description: "3 success metrics tracked · Monthly reporting · Dashboard requirements" },
  { id: "risk_mitigation", title: "Risk Mitigation", icon: Shield, accent: "amber", description: "3 risks identified · 2 high-impact · 2 contingency plans" },
  { id: "sustainability_plan", title: "Sustainability Plan", icon: Leaf, accent: "emerald", description: "Biannual reviews · 3 scaling strategies · Long-term viability" },
];

function renderBody(id: string) {
  switch (id) {
    case "learning_objectives": return <ObjectivesBody />;
    case "target_audience": return <TargetAudienceBody />;
    case "assessment_strategy": return <AssessmentBody />;
    case "content_outline": return <ContentOutlineBody />;
    case "instructional_strategy": return <StrategyBody />;
    case "resources": return <ResourcesBody />;
    case "implementation_timeline": return <TimelineBody />;
    case "success_metrics": return <MetricsBody />;
    case "risk_mitigation": return <RiskBody />;
    case "sustainability_plan": return <SustainabilityBody />;
    default: return null;
  }
}

function BlueprintViewer() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["learning_objectives"]));
  const reduced = useReducedMotion();

  const toggle = (id: string) => setExpanded((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const expandAll = () => setExpanded(new Set(BP_SECTIONS.map((s) => s.id)));
  const collapseAll = () => setExpanded(new Set());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 rounded-xl bg-emerald-500/15 p-3"><FileText className="h-6 w-6 text-emerald-400" strokeWidth={1.75} /></div>
            <div>
              <div className="mb-1.5 flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-400" /><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-500">LX Documentation</span></div>
              <h3 className="font-serif text-lg font-medium text-white leading-snug">{BLUEPRINT.title}</h3>
              <p className="mt-1 text-[12px] text-neutral-500">{BLUEPRINT.organization} · {BLUEPRINT.role} · {BLUEPRINT.generated}</p>
            </div>
          </div>
          <div className="hidden shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5 text-center sm:block"><p className="text-[12px] font-bold text-emerald-400 tabular-nums">v{BLUEPRINT.version}</p><p className="text-[9px] text-emerald-600">lxd</p></div>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-neutral-400 whitespace-pre-line">{BLUEPRINT.executive_summary}</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <MetricCard icon={Clock} label="Total Duration" value={6} suffix="hrs" accent="emerald" delay={0.05} />
        <MetricCard icon={BookOpen} label="Modules" value={4} accent="teal" delay={0.1} />
        <MetricCard icon={Target} label="Objectives" value={3} accent="emerald" delay={0.15} />
        <MetricCard icon={Layers} label="Activities" value={4} accent="amber" delay={0.2} />
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button onClick={expandAll} className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-emerald-500/20 active:scale-95"><Maximize2 className="h-3.5 w-3.5" />Expand All</button>
          <button onClick={collapseAll} className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/10 active:scale-95"><Minimize2 className="h-3.5 w-3.5" />Collapse All</button>
        </div>
        <span className="text-[12px] text-neutral-500">{expanded.size} of {BP_SECTIONS.length} sections expanded</span>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {BP_SECTIONS.map((section, i) => (
          <motion.div key={section.id} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2), ease: EASE }}>
            <ExpandableSection section={section} isExpanded={expanded.has(section.id)} onToggle={() => toggle(section.id)}>
              {renderBody(section.id)}
            </ExpandableSection>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Modal type ───────────────────────────────────────────────────────────────

type ModalId = "static" | "dynamic" | "lxd";

// ─── Preview thumbnails (decorative, no hooks) ────────────────────────────────

function StaticPreview() {
  return (
    <div className="w-full" style={{ transform: "scale(0.82)", transformOrigin: "top left", width: "122%" }}>
      <div className="flex items-center gap-1.5 mb-3">
        <div className="h-1 w-1 rounded-full bg-emerald-400" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-500">Phase 1 · Static Questionnaire</span>
      </div>
      <div className="flex gap-1 mb-3">
        {["Role & Exp.", "Organisation", "Learning Gap"].map((t, i) => (
          <div key={t} className={["rounded-md px-2 py-1 text-[9px] font-medium border", i === 0 ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-white/[0.04] text-neutral-600 border-white/10"].join(" ")}>{t}</div>
        ))}
      </div>
      <div className="space-y-2.5">
        <div>
          <div className="text-[9px] font-medium text-neutral-400 mb-1.5">Your primary role</div>
          <div className="flex flex-wrap gap-1">
            {["L&D Lead", "Instructional Designer", "CLO / VP"].map((opt, i) => (
              <span key={opt} className={["rounded px-1.5 py-0.5 text-[8px] font-medium border", i === 1 ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "border-white/10 text-neutral-600"].join(" ")}>{opt}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[9px] font-medium text-neutral-400 mb-1.5">Technical skills</div>
          <div className="flex flex-wrap gap-1">
            {["LMS Admin", "SCORM/xAPI", "Video Production", "HTML/CSS"].map((opt) => (
              <span key={opt} className="rounded px-1.5 py-0.5 text-[8px] font-medium border border-emerald-500/50 bg-emerald-500/10 text-emerald-400">{opt}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[9px] font-medium text-neutral-400 mb-1">Industry experience</div>
          <div className="flex flex-wrap gap-1">
            <span className="rounded px-1.5 py-0.5 text-[8px] font-medium border border-emerald-500/50 bg-emerald-500/10 text-emerald-400">Financial Services</span>
            <span className="rounded px-1.5 py-0.5 text-[8px] font-medium border border-white/10 text-neutral-600">Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DynamicPreview() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="h-1 w-1 rounded-full bg-teal-400" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-teal-400">Phase 2 · AI-Generated Questions</span>
      </div>
      <div className="flex gap-1 mb-3 flex-wrap">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className={["flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold", i === 0 ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40" : "bg-white/[0.04] text-neutral-600"].join(" ")}>{i + 1}</div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/15 text-[8px] font-bold text-emerald-400">1</span>
          <span className="text-[9px] font-semibold text-white">Learning Objectives & Outcomes</span>
        </div>
        {[
          { label: "Primary business impact areas", chips: ["Revenue Growth", "Innovation"] },
          { label: "Highest Bloom's Taxonomy level", chips: ["Apply"] },
          { label: "Success criteria", chips: ["Completion Rate", "Skill Application"] },
        ].map((q) => (
          <div key={q.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
            <div className="text-[8px] text-neutral-500 mb-1.5">{q.label}</div>
            <div className="flex flex-wrap gap-1">
              {q.chips.map((c) => (
                <span key={c} className="rounded px-1.5 py-0.5 text-[8px] border border-emerald-500/50 bg-emerald-500/10 text-emerald-400">{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LXDocPreview() {
  const preview = BP_SECTIONS.slice(0, 5);
  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="h-1 w-1 rounded-full bg-emerald-400" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-500">LX Documentation · 10 sections</span>
      </div>
      <div className="space-y-1.5">
        {preview.map((s, i) => {
          const Icon = s.icon;
          const a = ACCENT[s.accent];
          return (
            <div key={s.id} className={["flex items-center gap-2 rounded-lg border px-2.5 py-2", i === 0 ? "border-emerald-500/25 bg-emerald-500/[0.04]" : "border-white/[0.06] bg-white/[0.02]"].join(" ")}>
              <div className={["flex h-5 w-5 shrink-0 items-center justify-center rounded-md", a.iconBg].join(" ")}>
                <Icon className={["h-3 w-3", a.text].join(" ")} strokeWidth={1.75} />
              </div>
              <span className="text-[9px] font-medium text-neutral-300 truncate">{s.title}</span>
              {i === 0 && <ChevronDown className="ml-auto h-3 w-3 shrink-0 text-emerald-500 rotate-180" />}
            </div>
          );
        })}
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.01] px-2.5 py-2 opacity-40">
          <span className="text-[9px] text-neutral-600">5 more sections…</span>
        </div>
      </div>
    </div>
  );
}

// ─── Showcase card config ─────────────────────────────────────────────────────

interface ShowcaseCardData {
  id: ModalId;
  step: string;
  title: string;
  description: string;
  chips: string[];
  preview: React.ReactNode;
}

const CARDS: ShowcaseCardData[] = [
  {
    id: "static",
    step: "01",
    title: "Context Intake Questionnaire",
    description: "Baseline context capture across role, organisation, and learning gap",
    chips: ["3 sections", "30+ fields", "Phase I"],
    preview: <StaticPreview />,
  },
  {
    id: "dynamic",
    step: "02",
    title: "Adaptive Discovery Questionnaire",
    description: "AI-generated deep-dive questions across 10 thematic domains",
    chips: ["10 sections", "60 questions", "Phase II"],
    preview: <DynamicPreview />,
  },
  {
    id: "lxd",
    step: "03",
    title: "Learning Experience Design Documentation",
    description: "AI-synthesised curriculum architecture — the full Polaris LX dashboard",
    chips: ["10 sections", "Full documentation", "Acme Services"],
    preview: <LXDocPreview />,
  },
];

const MODAL_META: Record<ModalId, { title: string; subtitle: string; icon: React.ElementType; maxW: string }> = {
  static: { title: "Context Intake Questionnaire", subtitle: "Phase I · 3 sections · 30+ fields", icon: FileText, maxW: "max-w-2xl" },
  dynamic: { title: "Adaptive Discovery Questionnaire", subtitle: "Phase II · 10 sections · 60 questions", icon: BarChart3, maxW: "max-w-3xl" },
  lxd: { title: "Learning Experience Design Documentation", subtitle: "Acme Services · 10 sections", icon: BookOpen, maxW: "max-w-6xl" },
};

// ─── Showcase Card ─────────────────────────────────────────────────────────────

function ShowcaseCard({ card, onClick, index }: { card: ShowcaseCardData; onClick: () => void; index: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      onClick={onClick}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className="group relative flex flex-col w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] text-left transition-all duration-300 hover:border-emerald-500/25 hover:bg-white/[0.04] active:scale-[0.98]"
    >
      {/* Preview area */}
      <div className="relative overflow-hidden bg-[#0d0d14] border-b border-white/[0.06]" style={{ height: "220px" }}>
        <div className="absolute inset-0 flex items-start p-5 overflow-hidden pointer-events-none select-none">
          {card.preview}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <span className="font-mono text-[11px] font-bold text-neutral-700 transition-colors group-hover:text-emerald-500/60">{card.step}</span>
        <h3 className="text-[15px] font-semibold text-white leading-snug">{card.title}</h3>
        <p className="text-[12px] text-neutral-500 leading-relaxed">{card.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {card.chips.map((chip) => (
            <span key={chip} className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-neutral-500">{chip}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-1.5 pt-2 text-[12px] font-medium text-emerald-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span>Explore full view</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.button>
  );
}

// ─── Lightbox Modal ───────────────────────────────────────────────────────────

function LightboxModal({ id, onClose }: { id: ModalId; onClose: () => void }) {
  const reduced = useReducedMotion();
  const meta = MODAL_META[id];
  const Icon = meta.icon;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:px-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={[
          "relative z-10 flex flex-col w-full bg-[#0f0f17] border border-white/[0.08] shadow-2xl",
          "h-[95dvh] rounded-t-[2rem]",
          "sm:h-auto sm:max-h-[92dvh] sm:rounded-[2rem]",
          meta.maxW,
        ].join(" ")}
      >
        {/* Drag handle — mobile only */}
        <div className="flex shrink-0 justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15">
            <Icon className="h-[18px] w-[18px] text-emerald-400" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[14px] font-semibold text-white sm:text-[15px]">{meta.title}</h2>
            <p className="text-[11px] text-neutral-500">{meta.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-400 transition-colors hover:border-white/20 hover:text-white active:scale-95"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {id === "static" && <StaticQuestionnaireCard fullscreen />}
          {id === "dynamic" && <DynamicQuestionnaireCard fullscreen />}
          {id === "lxd" && <BlueprintViewer />}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Section label (eyebrow, used sparingly) ---------- */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-6 block text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80">
      {children}
    </span>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function PolarisShowcaseSection() {
  const [modal, setModal] = useState<ModalId | null>(null);
  const reduced = useReducedMotion();

  return (
    <section className="relative bg-[#0a0a0f] px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12"
        >
          <Label>Live System Demo</Label>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl mb-3">
            See the <span className="italic text-emerald-400">system</span> in motion.
          </h2>
          <p className="max-w-xl text-base text-neutral-500 leading-relaxed">
            Explore the two-phase questionnaire and the LX documentation it produces — same stack, same logic, same dashboard experience as the Polaris production platform.
          </p>
        </motion.div>

        {/* 3-card grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <ShowcaseCard key={card.id} card={card} onClick={() => setModal(card.id)} index={i} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {modal && <LightboxModal key={modal} id={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  );
}
