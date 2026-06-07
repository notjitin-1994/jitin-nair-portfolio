"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Search, Filter, Plus, Calendar, Clock, Paperclip,
  MessageSquare, Activity, CheckCircle2, Circle, MoreHorizontal,
  Workflow, Zap, Users, LayoutDashboard, ChevronDown, Link as LinkIcon,
  FileText, Target, Globe, ShieldCheck, Mail, Linkedin, Upload,
  ListTodo, Info, UserCheck, Timer, ArrowRight, ChevronLeft, ChevronRight,
  FolderKanban, Briefcase, ChevronUp, Sparkles, TrendingUp, X, Trash2
} from "lucide-react";
import { FloatingNav } from "../../../components/FloatingNav";
import { LdFooter } from "../../../components/ld/LdFooter";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleaner classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

type Role = "Project Manager" | "Lead Instructional Designer" | "Instructional Designer" | "Content Developer" | "eLearning Developer";
type Status = "Backlog" | "In Progress" | "In Review" | "Done";
type Modality = "Video" | "Interactive" | "Hybrid" | "ILT" | "VILT";
type MainTab = "Dashboard" | "Kanban Board";
type DashboardType = "PM Dashboard" | "Team Member Dashboard";
type PMViewMode = "Home" | "Project List" | "Project Detail";

interface User {
  id: string;
  name: string;
  role: Role;
  avatar: string;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  assigneeId: string;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

interface Comment {
  id: string;
  authorId: string;
  text: string;
  time: string;
}

interface ActivityItem {
  id: string;
  text: string;
  time: string;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: Status;
  assigneeId: string;
  subtasks: Subtask[];
  attachments: Attachment[];
  comments: Comment[];
  activity: ActivityItem[];
  dueDate: string;
  tags: string[];
}

interface Project {
  id: string;
  name: string;
  uuid: string;
  modality: Modality;
  intakeDate: string;
  pmAssignmentDate: string;
  pmId: string;
  teamIds: string[];
}

// ----------------------------------------------------------------------
// DATE PICKER COMPONENT
// ----------------------------------------------------------------------

function PremiumDatePicker({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (newDate: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  const parseDate = (d: string) => {
    const parts = d.split('-');
    if (parts.length === 3) {
      return { day: parts[0], month: parts[1], year: parts[2] };
    }
    // Fallback for legacy data (e.g., "Oct 12")
    const month = d.split(' ')[0].toUpperCase();
    const dayNum = d.split(' ')[1] || "01";
    return { day: dayNum.padStart(2, '0'), month: months.includes(month) ? month : "OCT", year: "2025" };
  };

  const { day, month, year } = parseDate(value);

  const years = Array.from({ length: 50 }, (_, i) => (2020 + i).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const update = (newDay: string, newMonth: string, newYear: string) => {
    onChange(`${newDay}-${newMonth}-${newYear}`);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-all text-left w-full group"
      >
        <Calendar className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-mono font-bold text-white tracking-wider">
          {day}-{month}-{year}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[70]" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 z-[80] mt-2 p-3 rounded-2xl bg-zinc-900 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              <div className="grid grid-cols-3 gap-2">
                {/* Days */}
                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-neutral-500 uppercase text-center mb-1">Day</p>
                  <div className="h-40 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                    {days.map(d => (
                      <button 
                        key={d} 
                        onClick={() => update(d, month, year)}
                        className={cn(
                          "w-full py-1 rounded text-[10px] font-mono transition-colors",
                          day === d ? "bg-emerald-500 text-black font-bold" : "text-neutral-400 hover:bg-white/5"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Months */}
                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-neutral-500 uppercase text-center mb-1">Month</p>
                  <div className="h-40 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                    {months.map(m => (
                      <button 
                        key={m} 
                        onClick={() => update(day, m, year)}
                        className={cn(
                          "w-full py-1 rounded text-[10px] font-mono transition-colors",
                          month === m ? "bg-emerald-500 text-black font-bold" : "text-neutral-400 hover:bg-white/5"
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Years */}
                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-neutral-500 uppercase text-center mb-1">Year</p>
                  <div className="h-40 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                    {years.map(y => (
                      <button 
                        key={y} 
                        onClick={() => update(day, month, y)}
                        className={cn(
                          "w-full py-1 rounded text-[10px] font-mono transition-colors",
                          year === y ? "bg-emerald-500 text-black font-bold" : "text-neutral-400 hover:bg-white/5"
                        )}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------------------------
// INITIAL DATA
// ----------------------------------------------------------------------

const USERS: User[] = [
  { id: "u-1", name: "Jitin Nair", role: "Project Manager", avatar: "/hero-photo.jpg" },
  { id: "u-2", name: "Katrina Kaif", role: "Lead Instructional Designer", avatar: "https://ui-avatars.com/api/?name=Katrina+Kaif&background=ec4899&color=fff&bold=true&size=128" },
  { id: "u-3", name: "Shah Rukh Khan", role: "Instructional Designer", avatar: "https://ui-avatars.com/api/?name=Shah+Rukh+Khan&background=f59e0b&color=fff&bold=true&size=128" },
  { id: "u-4", name: "John Abraham", role: "Content Developer", avatar: "https://ui-avatars.com/api/?name=John+Abraham&background=3b82f6&color=fff&bold=true&size=128" },
  { id: "u-5", name: "Abhishek Bachchan", role: "eLearning Developer", avatar: "https://ui-avatars.com/api/?name=Abhishek+Bachchan&background=10b981&color=fff&bold=true&size=128" },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: "p-1",
    uuid: "8842-X-990-2025",
    name: "Enterprise AI Enablement",
    modality: "Hybrid",
    intakeDate: "Oct 01, 2025",
    pmAssignmentDate: "Oct 02, 2025",
    pmId: "u-1",
    teamIds: ["u-2", "u-3", "u-4", "u-5"]
  },
  {
    id: "p-2",
    uuid: "580e67ce-abfc-4932-862b-981f75c1d38b",
    name: "Great Indian University: Placement Readiness",
    modality: "Hybrid",
    intakeDate: "May 20, 2024",
    pmAssignmentDate: "May 21, 2024",
    pmId: "u-1",
    teamIds: ["u-2", "u-3", "u-4", "u-5"]
  }
];

const INITIAL_TASKS: Task[] = [
  {
    id: "TSK-001",
    projectId: "p-1",
    title: "Stakeholder Brief & Needs Analysis",
    description: "Automated extraction of business objectives and success metrics from the discovery intake form.",
    status: "Done",
    assigneeId: "u-1",
    dueDate: "Oct 12",
    tags: ["Discovery", "Strategy"],
    subtasks: [
      { id: "st-1", title: "Review intake form data", completed: true, assigneeId: "u-1" },
      { id: "st-2", title: "Conduct kickoff alignment call", completed: true, assigneeId: "u-1" },
      { id: "st-3", title: "Finalize learning objectives", completed: true, assigneeId: "u-1" },
    ],
    attachments: [{ id: "att-1", name: "Intake_Form_Export.pdf", url: "#", type: "pdf" }],
    comments: [{ id: "c-1", authorId: "u-1", text: "Intake form processed. Objectives align with Q4 OKRs.", time: "2 days ago" }],
    activity: [
      { id: "a-1", text: "Project automatically generated from Intake Form", time: "5 days ago" },
      { id: "a-2", text: "Manager assigned Jitin Nair", time: "5 days ago" },
      { id: "a-3", text: "Moved to Done", time: "2 days ago" }
    ]
  },
  {
    id: "TSK-002",
    projectId: "p-1",
    title: "Curriculum Mapping & LXD Strategy",
    description: "Map cognitive paths and behavioral milestones for the hybrid learning journey.",
    status: "Done",
    assigneeId: "u-2",
    dueDate: "Oct 15",
    tags: ["LXD", "Design"],
    subtasks: [
      { id: "st-4", title: "Draft high-level curriculum outline", completed: true, assigneeId: "u-2" },
      { id: "st-5", title: "Determine modality split (Hybrid)", completed: true, assigneeId: "u-2" },
      { id: "st-6", title: "SME review of content map", completed: true, assigneeId: "u-1" },
    ],
    attachments: [{ id: "att-2", name: "Curriculum_Map_v1.json", url: "#", type: "code" }],
    comments: [],
    activity: [{ id: "a-4", text: "Katrina Kaif completed subtask", time: "3 days ago" }]
  },
  {
    id: "TSK-003",
    projectId: "p-1",
    title: "Storyboard & Script Development",
    description: "Detailed storyboarding for interactive modules and scripting for video segments.",
    status: "In Review",
    assigneeId: "u-3",
    dueDate: "Oct 20",
    tags: ["ID", "Content"],
    subtasks: [
      { id: "st-7", title: "Write video scripts (Modules 1-3)", completed: true, assigneeId: "u-3" },
      { id: "st-8", title: "Draft interactive scenario branching", completed: true, assigneeId: "u-3" },
      { id: "st-9", title: "Peer review of storyboards", completed: false, assigneeId: "u-2" },
    ],
    attachments: [
      { id: "att-3", name: "Scenario_Branching.fig", url: "#", type: "design" },
      { id: "att-4", name: "Video_Scripts_Draft.docx", url: "#", type: "doc" }
    ],
    comments: [
      { id: "c-2", authorId: "u-3", text: "Scripts are ready for peer review. Let me know if the tone is right.", time: "4 hours ago" },
      { id: "c-3", authorId: "u-2", text: "Looking now. Will add comments directly in the doc.", time: "1 hour ago" }
    ],
    activity: [
      { id: "a-5", text: "Shah Rukh Khan attached Video_Scripts_Draft.docx", time: "5 hours ago" },
      { id: "a-6", text: "Moved to In Review", time: "4 hours ago" }
    ]
  },
  {
    id: "TSK-004",
    projectId: "p-1",
    title: "Interactive Content Authoring",
    description: "Develop SCORM-compliant interactive modules based on approved storyboards.",
    status: "In Progress",
    assigneeId: "u-4",
    dueDate: "Oct 28",
    tags: ["Development", "SCORM"],
    subtasks: [
      { id: "st-10", title: "Build base navigation UI", completed: true, assigneeId: "u-4" },
      { id: "st-11", title: "Implement branching logic", completed: false, assigneeId: "u-4" },
      { id: "st-12", title: "Add knowledge check assessments", completed: false, assigneeId: "u-4" },
    ],
    attachments: [],
    comments: [],
    activity: [{ id: "a-7", text: "Moved to In Progress", time: "1 day ago" }]
  },
  {
    id: "TSK-005",
    projectId: "p-1",
    title: "Video Production & Editing",
    description: "Record, edit, and animate motion graphics for the instructional videos.",
    status: "In Progress",
    assigneeId: "u-4",
    dueDate: "Oct 30",
    tags: ["Video", "Media"],
    subtasks: [
      { id: "st-13", title: "Record voiceovers", completed: true, assigneeId: "u-4" },
      { id: "st-14", title: "Sync audio with motion graphics", completed: false, assigneeId: "u-4" },
      { id: "st-15", title: "Render final MP4s", completed: false, assigneeId: "u-4" },
    ],
    attachments: [],
    comments: [],
    activity: []
  },
  {
    id: "TSK-008",
    projectId: "p-2",
    title: "Portfolio & Resume Optimization",
    description: "Phase 1: Transitioning mindset from student to professional; resume building and ATS alignment.",
    status: "Done",
    assigneeId: "u-2",
    dueDate: "Jun 05",
    tags: ["Portfolio", "ATS"],
    subtasks: [
      { id: "st-p2-1", title: "Resume formatting & template selection", completed: true, assigneeId: "u-2" },
      { id: "st-p2-2", title: "ATS compliance scan", completed: true, assigneeId: "u-2" },
      { id: "st-p2-3", title: "Peer validation session", completed: true, assigneeId: "u-2" },
    ],
    attachments: [{ id: "att-p2-1", name: "Great_Indian_Resume_Template.pdf", url: "#", type: "pdf" }],
    comments: [],
    activity: [{ id: "a-p2-1", text: "Katrina Kaif finalized resume templates", time: "10 days ago" }]
  },
  {
    id: "TSK-009",
    projectId: "p-2",
    title: "Aptitude & Logical Reasoning Drills",
    description: "Phase 2: Mastering quantitative, logical, and verbal reasoning under time pressure.",
    status: "In Progress",
    assigneeId: "u-3",
    dueDate: "Jun 20",
    tags: ["Aptitude", "Assessment"],
    subtasks: [
      { id: "st-p2-4", title: "Quantitative shortcut library build", completed: true, assigneeId: "u-3" },
      { id: "st-p2-5", title: "WhatsApp micro-challenge automation", completed: false, assigneeId: "u-3" },
      { id: "st-p2-6", title: "Logical reasoning pattern mapping", completed: false, assigneeId: "u-3" },
    ],
    attachments: [],
    comments: [{ id: "c-p2-1", authorId: "u-3", text: "WhatsApp integration for daily puzzles is 50% done.", time: "1 day ago" }],
    activity: []
  },
  {
    id: "TSK-010",
    projectId: "p-2",
    title: "Domain-Specific Technical Preparation",
    description: "Phase 3: Stream-specific technical interview preparation with faculty co-facilitators.",
    status: "Backlog",
    assigneeId: "u-2",
    dueDate: "Jul 10",
    tags: ["Technical", "Faculty"],
    subtasks: [
      { id: "st-p2-7", title: "Core subject review bank", completed: false, assigneeId: "u-2" },
      { id: "st-p2-8", title: "SME interview recordings", completed: false, assigneeId: "u-3" },
    ],
    attachments: [],
    comments: [],
    activity: []
  },
  {
    id: "TSK-011",
    projectId: "p-2",
    title: "Behavioral & Mock Interview Simulations",
    description: "Phase 4: Mastering the STAR method and high-pressure interpersonal conflict scenarios.",
    status: "Backlog",
    assigneeId: "u-4",
    dueDate: "Jul 25",
    tags: ["Behavioral", "Simulation"],
    subtasks: [
      { id: "st-p2-9", title: "External HR panel onboarding", completed: false, assigneeId: "u-1" },
      { id: "st-p2-10", title: "STAR method workshop drafting", completed: false, assigneeId: "u-4" },
    ],
    attachments: [],
    comments: [],
    activity: []
  }
];

const SPRING = { type: "spring", stiffness: 100, damping: 20 };
const EASE = [0.16, 1, 0.3, 1] as const; // expo-out — strong, intentional

// ----------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------

function ProgressBar({ value, color = "emerald", className }: { value: number, color?: string, className?: string }) {
  const bgColor = color === "emerald" ? "bg-emerald-500" : "bg-indigo-500";
  return (
    <div className={cn("h-1.5 w-full bg-white/5 rounded-full overflow-hidden", className)}>
      <motion.div 
        className={cn("h-full rounded-full", bgColor)}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function UserAvatar({ user, size = "md", showRing = false, className }: { user: User, size?: "xs" | "sm" | "md" | "lg", showRing?: boolean, className?: string }) {
  const sizeClasses = {
    xs: "h-5 w-5 text-[8px]",
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs",
    lg: "h-12 w-12 text-sm"
  };
  return (
    <div 
      className={cn("relative rounded-full overflow-hidden shrink-0 bg-zinc-900", 
        sizeClasses[size], 
        showRing ? "ring-2 ring-emerald-500/50 p-[1px]" : "border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
        className)}
      title={user.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover rounded-full" />
    </div>
  );
}

function SectionHeading({ title, subtitle, icon: Icon, badge }: { title: string, subtitle?: string, icon?: any, badge?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="h-5 w-5 text-emerald-400" />}
        <h2 className="text-xl font-serif text-white">{title}</h2>
        {badge && (
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 uppercase tracking-tighter">
            {badge}
          </span>
        )}
      </div>
      {subtitle && <p className="text-neutral-500 text-sm">{subtitle}</p>}
    </div>
  );
}

// ----------------------------------------------------------------------
// TASK CARD
// ----------------------------------------------------------------------

const STATUS_STYLES: Record<Status, string> = {
  "Backlog":     "text-neutral-400 bg-neutral-500/10 border-neutral-500/20",
  "In Progress": "text-blue-400 bg-blue-500/10 border-blue-500/20",
  "In Review":   "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "Done":        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

interface TaskCardActions {
  toggleSubtask: (taskId: string, subtaskId: string, userName: string) => void;
  moveTask: (taskId: string, newStatus: Status) => void;
  changeAssignee: (taskId: string, newAssigneeId: string, requesterName: string) => void;
  addComment: (taskId: string, authorId: string, text: string, userName: string) => void;
  addSubtask: (taskId: string, title: string, assigneeId: string, userName: string) => void;
}

function TaskCard({
  task, users, project, onClick, actions, activeUser, isDragging, handleDragStart, handleDragEnd
}: {
  task: Task;
  users: User[];
  project?: Project;
  onClick: () => void;
  actions?: TaskCardActions;
  activeUser?: User;
  isDragging?: boolean;
  handleDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnd?: () => void;
}) {
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);
  const assignee = users.find(u => u.id === task.assigneeId);
  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const progress = totalSubtasks === 0 ? (task.status === "Done" ? 100 : 0) : (completedSubtasks / totalSubtasks) * 100;

  return (
    <div
      draggable={!!handleDragStart}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="h-full"
    >
    <motion.div
      onClick={onClick}
      whileHover={isDragging ? undefined : { y: -3 }}
      whileTap={isDragging ? undefined : { scale: 0.98 }}
      transition={SPRING}
      className={cn(
        "group cursor-pointer rounded-2xl border bg-zinc-900/40 p-5 hover:bg-zinc-900/80 transition-colors duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_20px_-10px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_32px_-12px_rgba(16,185,129,0.25)] backdrop-blur-sm flex flex-col h-full",
        isDragging ? "border-emerald-500/50 opacity-50 cursor-grabbing" : "border-white/[0.08] hover:border-emerald-500/30"
      )}
    >
      {/* Header: tags + status selector */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex gap-1.5 flex-wrap flex-1 min-w-0">
          {project && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-widest truncate max-w-[100px]">
              {project.name}
            </span>
          )}
          {task.tags.slice(0, project ? 1 : 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-medium text-neutral-400 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        {actions ? (
          <div onClick={e => e.stopPropagation()} className="shrink-0 relative">
            <select
              value={task.status}
              onChange={e => actions.moveTask(task.id, e.target.value as Status)}
              className={cn(
                "text-[9px] font-bold uppercase tracking-wider border rounded-md px-1.5 py-0.5 bg-zinc-900 cursor-pointer focus:outline-none appearance-none pr-6",
                STATUS_STYLES[task.status as Status]
              )}
            >
              {(["Backlog", "In Progress", "In Review", "Done"] as Status[]).map(s => (
                <option key={s} value={s} className="bg-zinc-900 text-white normal-case text-xs">{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-white pointer-events-none stroke-[3]" />
          </div>
        ) : (
          <div className={cn("h-2 w-2 rounded-full shrink-0 mt-1", task.status === 'Done' ? 'bg-emerald-500' : 'bg-neutral-600')} />
        )}
      </div>

      <h4 className="text-sm font-medium text-neutral-200 mb-3 leading-snug group-hover:text-emerald-400 transition-colors">{task.title}</h4>

      {/* Subtask checklist */}
      {totalSubtasks > 0 && (
        <div className="mb-3 flex-1">
          <div className="flex justify-between text-[10px] text-neutral-500 mb-1.5 font-mono uppercase tracking-widest">
            <span>Subtasks</span>
            <span className="text-emerald-400/70">{completedSubtasks}/{totalSubtasks}</span>
          </div>
          <ProgressBar value={progress} className="mb-2" />
          <div className="space-y-0.5 overflow-hidden">
            {task.subtasks.slice(0, 3).map(st => (
              <div
                key={st.id}
                role={actions ? "button" : undefined}
                onClick={actions ? (e) => { e.stopPropagation(); actions.toggleSubtask(task.id, st.id, activeUser?.name || "Someone"); } : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 sm:py-1 text-[11px] transition-colors",
                  actions ? "cursor-pointer hover:bg-white/5" : "cursor-default"
                )}
              >
                {st.completed
                  ? <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                  : <Circle className="h-3 w-3 text-neutral-600 shrink-0" />
                }
                <span className={cn("truncate transition-all duration-300", st.completed ? "opacity-40 text-neutral-600" : "text-neutral-400")}>
                  <span className="relative inline-block">
                    {st.title}
                    {st.completed && (
                      <motion.div 
                        initial={{ scaleX: 0 }} 
                        animate={{ scaleX: 1 }} 
                        className="absolute top-1/2 left-0 right-0 h-px bg-neutral-600 origin-left" 
                      />
                    )}
                  </span>
                </span>
              </div>
            ))}
            {task.subtasks.length > 3 && (
              <span className="text-[9px] text-neutral-600 pl-2 font-mono">+{task.subtasks.length - 3} more</span>
            )}
          </div>
        </div>
      )}

      <div className={cn("flex items-center justify-between pt-3 border-t border-white/[0.04]", totalSubtasks === 0 && "mt-auto")}>
        {/* Assignee section */}
        {actions ? (
          <div
            className="relative"
            onClick={e => e.stopPropagation()}
            onMouseLeave={() => setShowAssigneePicker(false)}
          >
            <button
              onClick={() => setShowAssigneePicker(v => !v)}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              {assignee
                ? <UserAvatar user={assignee} size="sm" />
                : <div className="h-6 w-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Plus className="h-3 w-3 text-neutral-600" /></div>
              }
              <span className="text-[10px] font-medium text-neutral-400">{assignee?.name.split(' ')[0] || 'Assign'}</span>
            </button>
            <AnimatePresence>
              {showAssigneePicker && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 4 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-full mb-2 left-0 z-30 p-2 rounded-xl bg-zinc-900 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex gap-1.5"
                >
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        actions.changeAssignee(task.id, u.id, activeUser?.name || "Someone");
                        setShowAssigneePicker(false);
                      }}
                      title={u.name}
                      className={cn(
                        "rounded-full transition-all",
                        task.assigneeId === u.id ? "ring-2 ring-emerald-500 ring-offset-1 ring-offset-zinc-900" : "opacity-50 hover:opacity-100"
                      )}
                    >
                      <UserAvatar user={u} size="sm" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          assignee ? (
            <div className="flex items-center gap-2">
              <UserAvatar user={assignee} size="sm" />
              <span className="text-[10px] font-medium text-neutral-400">{assignee.name.split(' ')[0]}</span>
            </div>
          ) : (
            <span className="text-[10px] text-neutral-600 italic">Unassigned</span>
          )
        )}
        <div className="flex items-center gap-3 text-neutral-600">
          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-[10px]">
              <Paperclip className="h-3 w-3" /> {task.attachments.length}
            </div>
          )}
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-[10px]">
              <MessageSquare className="h-3 w-3" /> {task.comments.length}
            </div>
          )}
        </div>
      </div>
    </motion.div>
    </div>
  );
}


// ----------------------------------------------------------------------
// TASK DETAIL OVERLAY
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// TASK DETAIL OVERLAY
// ----------------------------------------------------------------------

function TaskDetailOverlay({ taskId, user, users, onClose, actions }: { taskId: string, user: User, users: User[], onClose: () => void, actions: any }) {
  const [commentText, setCommentText] = useState("");
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);
  const [showSubtaskAssigneePicker, setShowSubtaskAssigneePicker] = useState<string | null>(null);
  
  // Background Scroll Lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Directly subscribe to the live task state from actions/state
  const task = actions.getTaskById(taskId);
  if (!task) return null;

  const totalSubtasks = (task.subtasks || []).length;
  const completedSubtasks = (task.subtasks || []).filter((s: Subtask) => s.completed).length;
  const progress = totalSubtasks === 0 ? (task.status === "Done" ? 100 : 0) : (completedSubtasks / totalSubtasks) * 100;
  const taskAssignee = users.find(u => u.id === task.assigneeId);

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 24 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-zinc-950 border-t sm:border border-emerald-500/20 rounded-t-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_-8px_40px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] sm:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col max-h-[92vh] sm:max-h-[90vh]"
      >
        {/* Drag handle — mobile only */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>
        {/* Header */}
        <div className="p-5 pb-4 sm:p-8 sm:pb-6 border-b border-white/5 flex justify-between items-start shrink-0 bg-white/[0.01]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest">{task.id}</span>
              <div className="relative group">
                <select
                  value={task.status}
                  onChange={e => actions.moveTask(task.id, e.target.value as Status)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-wider border rounded-md px-2 py-0.5 bg-zinc-900 cursor-pointer focus:outline-none appearance-none transition-colors pr-7",
                    STATUS_STYLES[task.status as Status]
                  )}
                >
                  {(["Backlog", "In Progress", "In Review", "Done"] as Status[]).map(s => (
                    <option key={s} value={s} className="bg-zinc-950 text-white normal-case text-xs">{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white pointer-events-none group-hover:text-emerald-400 transition-colors stroke-[3]" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-tight">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-8 space-y-8 sm:space-y-10 overflow-y-auto custom-scrollbar">
          {/* Description & Management Sidebar */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">Description</span>
              <p className="text-sm text-neutral-400 leading-relaxed">{task.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {(task.tags || []).map((tag: string) => (
                  <span key={tag} className="px-2 py-1 rounded bg-white/[0.03] border border-white/5 text-[10px] font-medium text-neutral-500 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Unified Management Sidebar */}
            <div className="w-full md:w-64 shrink-0 p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
              {/* Status Section */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">Status</span>
                <div className="relative group w-full">
                  <select
                    value={task.status}
                    onChange={e => actions.moveTask(task.id, e.target.value as Status)}
                    className={cn(
                      "w-full text-xs font-bold uppercase tracking-wider border rounded-xl px-3 py-2.5 bg-zinc-900 cursor-pointer focus:outline-none appearance-none transition-all",
                      STATUS_STYLES[task.status as Status]
                    )}
                  >
                    {(["Backlog", "In Progress", "In Review", "Done"] as Status[]).map(s => (
                      <option key={s} value={s} className="bg-zinc-950 text-white normal-case text-sm">{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none group-hover:text-emerald-400 transition-colors stroke-[3]" />
                </div>
              </div>

              {/* Assignee Section */}
              <div className="relative">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">Assignee</span>
                <button 
                  onClick={() => setShowAssigneePicker(!showAssigneePicker)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-500/30 transition-all text-left"
                >
                  {taskAssignee && <UserAvatar user={taskAssignee} size="md" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{taskAssignee?.name || 'Unassigned'}</p>
                    <p className="text-[9px] text-neutral-500 truncate">{taskAssignee?.role || 'Click to assign'}</p>
                  </div>
                  <ChevronDown className={cn("h-4 w-4 text-white transition-transform stroke-[3]", showAssigneePicker && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {showAssigneePicker && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 right-0 z-50 mt-2 p-1.5 rounded-2xl bg-zinc-900 border border-white/10 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] max-h-60 overflow-y-auto"
                    >
                      {users.map(u => (
                        <button
                          key={u.id}
                          onClick={() => {
                            actions.changeAssignee(task.id, u.id, user.name);
                            setShowAssigneePicker(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 p-2 rounded-xl transition-colors text-left",
                            task.assigneeId === u.id ? "bg-emerald-500/10" : "hover:bg-white/5"
                          )}
                        >
                          <UserAvatar user={u} size="sm" />
                          <div className="min-w-0 flex-1">
                            <p className={cn("text-xs font-medium", task.assigneeId === u.id ? "text-emerald-400" : "text-white")}>{u.name}</p>
                            <p className="text-[9px] text-neutral-500 truncate">{u.role}</p>
                          </div>
                          {task.assigneeId === u.id && <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Due Date Section */}
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">Due Date</span>
                <PremiumDatePicker 
                  value={task.dueDate}
                  onChange={(newDate) => actions.updateDueDate(task.id, newDate, user.name)}
                />
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5" /> Checklist
              </span>
              <span className="text-xs text-emerald-400 font-mono">{Math.round(progress)}%</span>
            </div>
            <ProgressBar value={progress} className="mb-4" />
            
            <div className="space-y-2">
              {(task.subtasks || []).map((st: Subtask) => {
                const stUser = users.find(u => u.id === st.assigneeId);
                const isAssigneePickerOpen = showSubtaskAssigneePicker === st.id;
                
                return (
                  <motion.div layout key={st.id} className="relative flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-emerald-500/20 transition-all">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        actions.toggleSubtask(task.id, st.id, user.name);
                      }}
                      className="flex items-center gap-3 text-left focus:outline-none flex-1 min-w-0"
                    >
                      {st.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> : <Circle className="h-5 w-5 text-neutral-600 shrink-0 group-hover:text-neutral-400 transition-colors" />}
                      <span className={cn("text-sm transition-all duration-300 truncate", st.completed ? "opacity-40 text-neutral-600" : "text-neutral-300")}>
                        <span className="relative inline-block">
                          {st.title}
                          {st.completed && (
                            <motion.div 
                              initial={{ scaleX: 0 }} 
                              animate={{ scaleX: 1 }} 
                              className="absolute top-1/2 left-0 right-0 h-px bg-neutral-600 origin-left" 
                            />
                          )}
                        </span>
                      </span>
                    </button>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Subtask Assignee */}
                      <div className="relative" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSubtaskAssigneePicker(isAssigneePickerOpen ? null : st.id);
                          }}
                          className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
                        >
                          <span className="text-[10px] text-neutral-500 hidden sm:inline">{stUser?.name.split(' ')[0] || 'Unassigned'}</span>
                          {stUser ? <UserAvatar user={stUser} size="xs" /> : <Plus className="h-3.5 w-3.5 text-neutral-600" />}
                        </button>

                        <AnimatePresence>
                          {isAssigneePickerOpen && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9, x: 10 }}
                              className="absolute bottom-full right-0 mb-2 z-[90] p-1.5 rounded-2xl bg-zinc-900 border border-white/10 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] min-w-[200px]"
                            >
                              {users.map(u => (
                                <button
                                  key={u.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    actions.changeSubtaskAssignee(task.id, st.id, u.id, user.name);
                                    setShowSubtaskAssigneePicker(null);
                                  }}
                                  className={cn(
                                    "w-full flex items-center gap-2 p-1.5 rounded-lg transition-colors text-left",
                                    st.assigneeId === u.id ? "bg-emerald-500/10" : "hover:bg-white/5"
                                  )}
                                >
                                  <UserAvatar user={u} size="xs" />
                                  <span className={cn("text-[11px]", st.assigneeId === u.id ? "text-emerald-400" : "text-neutral-300")}>{u.name}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Delete Subtask */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          actions.removeSubtask(task.id, st.id, user.name);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 text-neutral-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                        title="Delete subtask"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
              {/* Add Subtask Input */}
              <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.01] border border-dashed border-white/10 mt-2 focus-within:border-emerald-500/40 transition-colors">
                <Plus className="h-4 w-4 text-neutral-600 shrink-0 ml-1" />
                <input 
                  type="text"
                  value={newSubtaskTitle}
                  onChange={e => setNewSubtaskTitle(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newSubtaskTitle.trim()) {
                      actions.addSubtask(task.id, newSubtaskTitle, user.id, user.name);
                      setNewSubtaskTitle("");
                    }
                  }}
                  placeholder="Add a new subtask..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Artifacts */}
          <div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Paperclip className="h-3.5 w-3.5" /> Artifacts
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(task.attachments || []).map((att: Attachment) => (
                <div key={att.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    {att.type === 'pdf' || att.type === 'doc' ? <FileText className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                  </div>
                  <span className="text-sm text-neutral-300 truncate group-hover:text-emerald-400 transition-colors">{att.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-white/10 text-neutral-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Upload className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">Upload File</span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="pb-8">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-6">
              <MessageSquare className="h-3.5 w-3.5" /> Discussion
            </span>
            <div className="space-y-6 mb-8">
              {(task.comments || []).length === 0 && <p className="text-sm text-neutral-600 italic">No comments yet.</p>}
              {(task.comments || []).map((c: Comment) => {
                const author = users.find(u => u.id === c.authorId);
                return (
                  <div key={c.id} className="flex gap-4">
                    {author && <UserAvatar user={author} />}
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="text-sm font-medium text-neutral-200">{author?.name}</span>
                        <span className="text-[10px] text-neutral-600">{c.time}</span>
                      </div>
                      <div className="p-3.5 rounded-2xl rounded-tl-none bg-white/[0.02] border border-white/5 text-sm text-neutral-300 leading-relaxed shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        {c.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 items-start">
              <UserAvatar user={user} />
              <div className="flex-1 relative">
                <textarea 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ask a question or share an update..."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/40 transition-all resize-none min-h-[100px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                />
                <button 
                  onClick={() => {
                    actions.addComment(task.id, user.id, commentText, user.name);
                    setCommentText("");
                  }}
                  disabled={!commentText.trim()}
                  className="absolute bottom-3 right-3 px-4 py-2 bg-emerald-500 text-black text-xs font-semibold rounded-xl disabled:opacity-30 hover:bg-emerald-400 transition-colors shadow-[0_4px_14px_rgba(16,185,129,0.3)]"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN APPLICATION
// ----------------------------------------------------------------------

export function ProjectManagementClient() {
  const [activeTab, setActiveTab] = useState<MainTab>("Dashboard");
  const [dashboardType, setDashboardType] = useState<DashboardType>("PM Dashboard");
  const [pmViewMode, setPmViewMode] = useState<PMViewMode>("Home");
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeUserId, setActiveUserId] = useState<string>("u-1"); // Default: Jitin
  const [kanbanProjectFilter, setKanbanProjectFilter] = useState<string | null>(null);
  const [kanbanAssigneeFilter, setKanbanAssigneeFilter] = useState<string | null>(null);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<Status | null>(null);
  const [mobileKanbanStatus, setMobileKanbanStatus] = useState<Status>("In Progress");

  const activeUser = USERS.find(u => u.id === activeUserId) || USERS[0];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Project Detail view local state — hoisted to the parent so the detail view
  // can be rendered as an inlined function (not a nested component type) and
  // therefore never remounts on a tasks state change.
  const [activeDetailTab, setActiveDetailTab] = useState<"tasks" | "activity" | "comments">("tasks");
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);

  const selectedTask = useMemo(() => tasks.find(t => t.id === selectedTaskId) || null, [tasks, selectedTaskId]);

  // Pagination logic
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Live aggregate for the hero stat bar
  const allSubtasks = tasks.flatMap(t => t.subtasks);
  const doneSubtasks = allSubtasks.filter(s => s.completed).length;
  const avgCompletion = allSubtasks.length ? Math.round((doneSubtasks / allSubtasks.length) * 100) : 0;

  // Collaborative Actions
  const actions = {
    getTaskById: (id: string) => tasks.find(t => t.id === id),
    toggleSubtask: (taskId: string, subtaskId: string, userName: string) => {
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          subtasks: t.subtasks.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st),
          activity: [{ id: `a-${Date.now()}`, text: `${userName} updated a subtask`, time: "Just now" }, ...t.activity]
        };
      }));
    },
    addComment: (taskId: string, authorId: string, text: string, userName: string) => {
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          comments: [{ id: `c-${Date.now()}`, authorId, text, time: "Just now" }, ...t.comments],
          activity: [{ id: `a-${Date.now()}`, text: `${userName} left a comment`, time: "Just now" }, ...t.activity]
        };
      }));
    },
    addSubtask: (taskId: string, title: string, assigneeId: string, userName: string) => {
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          subtasks: [...t.subtasks, { id: `st-new-${Date.now()}`, title, completed: false, assigneeId }],
          activity: [{ id: `a-${Date.now()}`, text: `${userName} added a subtask`, time: "Just now" }, ...t.activity]
        };
      }));
    },
    moveTask: (taskId: string, newStatus: Status) => {
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          status: newStatus,
          activity: [{ id: `a-${Date.now()}`, text: `Status changed to "${newStatus}"`, time: "Just now" }, ...t.activity]
        };
      }));
    },
    changeAssignee: (taskId: string, newAssigneeId: string, requesterName: string) => {
      const newAssignee = USERS.find(u => u.id === newAssigneeId);
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          assigneeId: newAssigneeId,
          activity: [{ id: `a-${Date.now()}`, text: `${requesterName} reassigned to ${newAssignee?.name.split(' ')[0] || 'someone'}`, time: "Just now" }, ...t.activity]
        };
      }));
    },
    updateDueDate: (taskId: string, newDate: string, userName: string) => {
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          dueDate: newDate,
          activity: [{ id: `a-${Date.now()}`, text: `${userName} changed due date to ${newDate}`, time: "Just now" }, ...t.activity]
        };
      }));
    },
    removeSubtask: (taskId: string, subtaskId: string, userName: string) => {
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        const subtask = t.subtasks.find(s => s.id === subtaskId);
        return {
          ...t,
          subtasks: t.subtasks.filter(s => s.id !== subtaskId),
          activity: [{ id: `a-${Date.now()}`, text: `${userName} removed subtask "${subtask?.title}"`, time: "Just now" }, ...t.activity]
        };
      }));
    },
    changeSubtaskAssignee: (taskId: string, subtaskId: string, newAssigneeId: string, userName: string) => {
      const newAssignee = USERS.find(u => u.id === newAssigneeId);
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          subtasks: t.subtasks.map(st => st.id === subtaskId ? { ...st, assigneeId: newAssigneeId } : st),
          activity: [{ id: `a-${Date.now()}`, text: `${userName} reassigned subtask to ${newAssignee?.name.split(' ')[0]}`, time: "Just now" }, ...t.activity]
        };
      }));
    }
  };

  // PM Dashboard Renderers
  const renderPMDashboard = () => {
    if (pmViewMode === "Home") {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div 
              onClick={() => setPmViewMode("Project List")}
              className="group cursor-pointer p-6 sm:p-8 md:p-10 rounded-[1.75rem] sm:rounded-[2.5rem] border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-emerald-500/40 transition-colors duration-300 active:scale-[0.99] backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FolderKanban className="h-48 w-48 text-emerald-500 translate-x-12 -translate-y-12" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-5 sm:mb-8">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-emerald-400 transition-colors">All Projects</h3>
                <p className="text-neutral-400 text-sm mb-8 sm:mb-12 max-w-sm">Manage and monitor high-level project health, team assignments, and delivery timelines.</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-2xl font-mono text-white">{projects.length} <span className="text-sm text-neutral-500 font-sans">Active</span></span>
                  <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveTab("Kanban Board")}
              className="group cursor-pointer p-6 sm:p-8 md:p-10 rounded-[1.75rem] sm:rounded-[2.5rem] border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-emerald-500/40 transition-colors duration-300 active:scale-[0.99] backdrop-blur-md relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ListTodo className="h-48 w-48 text-emerald-500 translate-x-12 -translate-y-12" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-5 sm:mb-8">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-emerald-400 transition-colors">All Tasks</h3>
                <p className="text-neutral-400 text-sm mb-8 sm:mb-12 max-w-sm">Global Kanban board aggregating workstreams across all projects for granular tracking.</p>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-2xl font-mono text-white">{tasks.length} <span className="text-sm text-neutral-500 font-sans">Total Tasks</span></span>
                  <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    if (pmViewMode === "Project List") {
      return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => setPmViewMode("Home")}
              className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-serif text-white">Active Projects</h2>
              <span className="text-xs text-neutral-500 font-mono uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
            </div>
          </div>

          <div className="grid gap-6">
            {currentProjects.map(project => {
              const projectTasks = tasks.filter(t => t.projectId === project.id);
              const totalSubtasks = projectTasks.reduce((acc, t) => acc + t.subtasks.length, 0);
              const completedSubtasks = projectTasks.reduce((acc, t) => acc + t.subtasks.filter(s => s.completed).length, 0);
              const progress = totalSubtasks === 0 ? 0 : (completedSubtasks / totalSubtasks) * 100;
              const pm = USERS.find(u => u.id === project.pmId);

              return (
                <div 
                  key={project.id} 
                  onClick={() => { setSelectedProject(project); setPmViewMode("Project Detail"); }}
                  className="group cursor-pointer p-6 sm:p-8 rounded-[2rem] border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-emerald-500/40 transition-colors duration-300 active:scale-[0.99] backdrop-blur-md"
                >
                  <div className="grid md:grid-cols-[1fr_200px_150px] gap-4 md:gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 truncate max-w-[140px] sm:max-w-none block sm:inline">{project.uuid}</span>
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{project.modality}</span>
                      </div>
                      <h3 className="text-xl font-serif text-white group-hover:text-emerald-400 transition-colors">{project.name}</h3>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">Project Manager</span>
                      <div className="flex items-center gap-3">
                        {pm ? (
                          <><UserAvatar user={pm} size="sm" showRing /><span className="text-sm text-neutral-300">{pm.name}</span></>
                        ) : (
                          <span className="text-sm text-neutral-600 italic">Unassigned</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Progress</span>
                        <span className="text-sm text-emerald-400 font-mono">{Math.round(progress)}%</span>
                      </div>
                      <ProgressBar value={progress} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-8 border-t border-white/5">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 rounded-full border border-white/10 text-neutral-400 hover:bg-white/5 disabled:opacity-20 transition-colors"><ChevronLeft className="h-5 w-5" /></button>
              <span className="text-sm font-mono text-neutral-500">{currentPage} / {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 rounded-full border border-white/10 text-neutral-400 hover:bg-white/5 disabled:opacity-20 transition-colors"><ChevronRight className="h-5 w-5" /></button>
            </div>
          )}
        </motion.div>
      );
    }

    if (pmViewMode === "Project Detail" && selectedProject) {
      return renderProjectDetailView(selectedProject);
    }

    return null;
  };

  const renderKanbanBoard = () => {
    const hasActiveFilter = kanbanProjectFilter !== null || kanbanAssigneeFilter !== null;

    const filteredTasks = tasks.filter(t => {
      const projectMatch = !kanbanProjectFilter || t.projectId === kanbanProjectFilter;
      const assigneeMatch = !kanbanAssigneeFilter || t.assigneeId === kanbanAssigneeFilter;
      return projectMatch && assigneeMatch;
    });

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div>
            <h2 className="text-3xl font-serif text-white tracking-tight mb-2">Global Kanban</h2>
            <p className="text-sm text-neutral-500">Cross-project task orchestration and status tracking.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search across all projects..." 
                className="w-full pl-9 pr-4 py-2 bg-zinc-900/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" 
              />
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 bg-zinc-900/30 border border-white/5 p-2 rounded-2xl backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold text-neutral-600 uppercase tracking-widest pl-2 flex items-center gap-2">
              <Filter className="h-3 w-3" /> Filter
            </span>
            
            {/* Project Filter Dropdown */}
            <div className="relative group">
              <select 
                value={kanbanProjectFilter || ""}
                onChange={(e) => setKanbanProjectFilter(e.target.value || null)}
                className="bg-black/40 border border-white/10 text-neutral-300 text-[11px] font-bold rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer uppercase tracking-tight"
              >
                <option value="">All Projects</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-600 pointer-events-none group-hover:text-emerald-400 transition-colors" />
            </div>

            {/* Assignee Filter Dropdown */}
            <div className="relative group">
              <select 
                value={kanbanAssigneeFilter || ""}
                onChange={(e) => setKanbanAssigneeFilter(e.target.value || null)}
                className="bg-black/40 border border-white/10 text-neutral-300 text-[11px] font-bold rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer uppercase tracking-tight"
              >
                <option value="">All Assignees</option>
                {USERS.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-600 pointer-events-none group-hover:text-emerald-400 transition-colors" />
            </div>
          </div>

          {hasActiveFilter && (
            <button 
              onClick={() => { setKanbanProjectFilter(null); setKanbanAssigneeFilter(null); }}
              className="text-[10px] font-bold text-rose-500/80 hover:text-rose-400 uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Mobile: status-tab switcher + single-column list */}
        <div className="sm:hidden mb-8">
          <div className="flex gap-1 p-1.5 bg-zinc-900/50 border border-white/10 rounded-2xl mb-5">
            {(["Backlog", "In Progress", "In Review", "Done"] as Status[]).map(s => {
              const count = filteredTasks.filter(t => t.status === s).length;
              const isActive = mobileKanbanStatus === s;
              return (
                <button
                  key={s}
                  onClick={() => setMobileKanbanStatus(s)}
                  className={cn(
                    "relative flex-1 py-2.5 text-[9px] font-bold uppercase tracking-wider rounded-xl transition-colors duration-200",
                    isActive ? "text-black" : "text-neutral-500"
                  )}
                >
                  {isActive && (
                    <motion.div layoutId="mobileKanbanTab" className="absolute inset-0 rounded-xl bg-emerald-500" transition={SPRING} />
                  )}
                  <span className="relative z-10 flex flex-col items-center leading-tight gap-0.5">
                    <span>{s}</span>
                    <span className={cn("font-mono text-[9px]", isActive ? "text-black/60" : "text-neutral-700")}>{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="space-y-4 pb-4">
            {filteredTasks.filter(t => t.status === mobileKanbanStatus).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-neutral-700 text-xs text-center gap-3">
                <Filter className="h-6 w-6 opacity-30" />
                <span>No tasks in {mobileKanbanStatus}</span>
              </div>
            ) : filteredTasks.filter(t => t.status === mobileKanbanStatus).map(task => {
              const proj = projects.find(p => p.id === task.projectId);
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  users={USERS}
                  project={proj}
                  onClick={() => setSelectedTaskId(task.id)}
                  actions={actions}
                  activeUser={activeUser}
                />
              );
            })}
          </div>
        </div>

        {/* Desktop: 4-column horizontal Kanban */}
        <div className="hidden sm:flex flex-1 overflow-x-auto custom-scrollbar pb-4">
          <div className="flex gap-6 min-w-max h-[calc(100vh-360px)] min-h-[500px]">
            {(["Backlog", "In Progress", "In Review", "Done"] as Status[]).map((status, idx) => {
              const colTasks = filteredTasks.filter(t => t.status === status);
              return (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
                  onDragOver={e => { e.preventDefault(); setDragOverColumn(status); }}
                  onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOverColumn(null); }}
                  onDrop={() => {
                    if (draggingTaskId) {
                      const draggedTask = tasks.find(t => t.id === draggingTaskId);
                      if (draggedTask && draggedTask.status !== status) actions.moveTask(draggingTaskId, status);
                      setDraggingTaskId(null);
                      setDragOverColumn(null);
                    }
                  }}
                  className={cn(
                    "w-[340px] flex flex-col h-full rounded-[2rem] border p-5 backdrop-blur-sm transition-colors duration-200",
                    dragOverColumn === status
                      ? "bg-emerald-500/5 border-emerald-500/30 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.12)]"
                      : "bg-zinc-900/20 border-white/5"
                  )}
                >
                  <div className="flex items-center justify-between mb-5 px-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full", status === 'Done' ? 'bg-emerald-500' : 'bg-neutral-600')} />
                      {status}
                    </h3>
                    <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-neutral-500">{colTasks.length}</span>
                  </div>
                  <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-2 h-full">
                    {colTasks.length === 0 ? (
                      <div className={cn("flex flex-col items-center justify-center h-full text-neutral-700 text-xs text-center px-4 gap-2 rounded-2xl border-2 border-dashed transition-colors duration-200",
                        dragOverColumn === status ? "border-emerald-500/30 text-emerald-600" : "border-transparent"
                      )}>
                        <Filter className="h-5 w-5 opacity-40" />
                        <span>{dragOverColumn === status ? "Drop here" : "No tasks match filters"}</span>
                      </div>
                    ) : colTasks.map(task => {
                      const proj = projects.find(p => p.id === task.projectId);
                      return (
                        <TaskCard
                          key={task.id}
                          task={task}
                          users={USERS}
                          project={proj}
                          onClick={() => setSelectedTaskId(task.id)}
                          actions={actions}
                          activeUser={activeUser}
                          isDragging={draggingTaskId === task.id}
                          handleDragStart={e => { e.stopPropagation(); setDraggingTaskId(task.id); }}
                          handleDragEnd={() => { setDraggingTaskId(null); setDragOverColumn(null); }}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderTeamMemberDashboard = () => {
    const userTasks = tasks.filter(t => t.assigneeId === activeUser.id || t.subtasks.some(st => st.assigneeId === activeUser.id));

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
        <div className="grid lg:grid-cols-[1fr_350px] gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <ListTodo className="h-5 w-5 text-emerald-400" />
              <h3 className="text-xl font-serif text-white">Your Workstreams</h3>
            </div>
            {userTasks.length === 0 ? (
              <div className="p-10 rounded-[2rem] border border-dashed border-white/10 text-center">
                <p className="text-neutral-500">No active tasks assigned to you right now.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {userTasks.map(task => {
                  const proj = projects.find(p => p.id === task.projectId);
                  return <TaskCard key={task.id} task={task} users={USERS} project={proj} onClick={() => setSelectedTaskId(task.id)} actions={actions} activeUser={activeUser} />;
                })}
              </div>
            )}
          </div>

          <div className="space-y-6">
             <div className="flex items-center gap-3 mb-6">
              <Activity className="h-5 w-5 text-emerald-400" />
              <h3 className="text-xl font-serif text-white">Recent Mentions</h3>
            </div>
            <div className="p-6 rounded-[2rem] bg-zinc-900/30 border border-white/10 space-y-5">
              {tasks.flatMap(t => t.comments).slice(0, 4).map(c => {
                 const author = USERS.find(u => u.id === c.authorId);
                 return (
                  <div key={c.id} className="text-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      {author && <UserAvatar user={author} size="xs" />}
                      <span className="text-neutral-300 font-medium text-xs">{author?.name}</span>
                      <span className="text-[10px] text-neutral-600">{c.time}</span>
                    </div>
                    <p className="text-neutral-400 bg-white/[0.02] p-3 rounded-xl border border-white/5">{c.text}</p>
                  </div>
                 )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderProjectDetailView = (project: Project) => {
    const pm = USERS.find(u => u.id === project.pmId);
    const team = USERS.filter(u => project.teamIds.includes(u.id));
    const projectTasks = tasks.filter(t => t.projectId === project.id);
    
    const totalSubtasks = projectTasks.reduce((acc, t) => acc + t.subtasks.length, 0);
    const completedSubtasks = projectTasks.reduce((acc, t) => acc + t.subtasks.filter(s => s.completed).length, 0);
    const completionRate = totalSubtasks === 0 ? 0 : (completedSubtasks / totalSubtasks) * 100;
  
    const allActivity = projectTasks.flatMap(t => t.activity.map(a => ({ ...a, taskTitle: t.title }))).sort((a, b) => {
      // Activity IDs are in format 'a-1780753461882'
      const timeA = parseInt(a.id.split('-')[1]) || 0;
      const timeB = parseInt(b.id.split('-')[1]) || 0;
      return timeB - timeA;
    });
    
    const allComments = projectTasks.flatMap(t => t.comments.map(c => ({ ...c, taskTitle: t.title }))).sort((a, b) => {
      // Comment IDs are in format 'c-1780753461882'
      const timeA = parseInt(a.id.split('-')[1]) || 0;
      const timeB = parseInt(b.id.split('-')[1]) || 0;
      return timeB - timeA;
    });

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
        <button 
          onClick={() => setPmViewMode("Project List")}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-emerald-400 transition-colors group w-fit"
        >
          <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to Projects
        </button>

        <div className="relative rounded-2xl sm:rounded-[3rem] border border-white/10 bg-zinc-900/40 p-5 sm:p-8 md:p-12 overflow-hidden backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Workflow className="h-64 w-64 text-emerald-500 translate-x-12 -translate-y-12" />
          </div>

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 uppercase tracking-widest shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] truncate max-w-[150px] sm:max-w-none">
                  {project.uuid}
                </span>
                <span className="h-1 w-1 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold shrink-0">{project.modality}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight mb-6 sm:mb-10 leading-tight">
                {project.name}
              </h1>
              <div className="flex flex-wrap gap-8">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Intake Received</span>
                  <span className="text-sm text-neutral-200">{project.intakeDate}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">PM Assigned</span>
                  <span className="text-sm text-neutral-200">{project.pmAssignmentDate}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Workstreams</span>
                  <span className="text-sm text-emerald-400 font-mono">{projectTasks.length} Active</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Completion</span>
                  <span className="text-3xl font-mono text-emerald-400 leading-none">{Math.round(completionRate)}%</span>
                </div>
                <ProgressBar value={completionRate} />
              </div>
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Assigned Team</span>
                <div className="flex -space-x-3">
                  {pm && <div className="relative z-40"><UserAvatar user={pm} showRing size="lg" /></div>}
                  {team.map((u, i) => (
                    <div key={u.id} className="relative transition-transform hover:-translate-y-2 hover:z-50" style={{ zIndex: 30 - i }}>
                      <UserAvatar user={u} size="lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Resource Allocation Overhaul */}
        <div className="rounded-[2rem] border border-white/10 bg-zinc-900/20 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <button 
            onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            className="w-full p-6 flex items-center justify-between bg-white/[0.01] hover:bg-white/[0.03] transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-serif text-white">Workload Distribution Matrix</h3>
            </div>
            <motion.div animate={{ rotate: isResourcesOpen ? 180 : 0 }} transition={SPRING}>
              <ChevronDown className="h-5 w-5 text-neutral-500" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {isResourcesOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/5"
              >
                <div className="p-6">
                   <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {USERS.map(user => {
                         const userTasks = projectTasks.filter(t => t.assigneeId === user.id);
                         const percentage = projectTasks.length > 0 ? (userTasks.length / projectTasks.length) * 100 : 0;
                         const isOverloaded = percentage > 40;

                         return (
                            <div key={user.id} className="group relative p-5 rounded-2xl border border-white/5 bg-black/20 hover:border-emerald-500/30 transition-all duration-300">
                               <div className="flex flex-col items-center text-center gap-3">
                                  <div className="relative">
                                     <UserAvatar user={user} size="lg" showRing />
                                     <div className={cn(
                                        "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-black flex items-center justify-center",
                                        isOverloaded ? "bg-amber-500" : "bg-emerald-500"
                                     )}>
                                        {isOverloaded ? <Clock className="h-2 w-2 text-black" /> : <CheckCircle2 className="h-2 w-2 text-black" />}
                                     </div>
                                  </div>
                                  <div>
                                     <p className="text-[13px] font-semibold text-white group-hover:text-emerald-400 transition-colors">{user.name}</p>
                                     <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mt-0.5">{user.role.split(' ')[0]}</p>
                                  </div>
                                  
                                  <div className="w-full space-y-2 mt-2">
                                     <div className="flex justify-between items-baseline">
                                        <span className="text-[10px] font-mono text-neutral-600">ALLOCATION</span>
                                        <span className={cn("text-xs font-bold", isOverloaded ? "text-amber-500" : "text-emerald-400")}>{Math.round(percentage)}%</span>
                                     </div>
                                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                           initial={{ width: 0 }}
                                           animate={{ width: `${percentage}%` }}
                                           className={cn("h-full rounded-full", isOverloaded ? "bg-amber-500" : "bg-emerald-400")}
                                        />
                                     </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 w-full gap-2 mt-1">
                                     <div className="text-center p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                        <p className="text-[14px] font-mono text-white leading-none">{userTasks.length}</p>
                                        <p className="text-[8px] text-neutral-600 uppercase mt-1">Tasks</p>
                                     </div>
                                     <div className="text-center p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                        <p className="text-[14px] font-mono text-white leading-none">{userTasks.filter(t => t.status === 'Done').length}</p>
                                        <p className="text-[8px] text-neutral-600 uppercase mt-1">Done</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         )
                      })}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tabbed Content */}
        <div className="space-y-6">
          <div className="flex gap-2 p-1.5 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md w-fit">
            {(["tasks", "activity", "comments"] as const).map(t => (
              <button
                key={t}
                onClick={() => setActiveDetailTab(t)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  activeDetailTab === t ? "bg-white/10 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeDetailTab === "tasks" && (
              <motion.div key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTasks.map(task => (
                  <TaskCard key={task.id} task={task} users={USERS} onClick={() => setSelectedTaskId(task.id)} actions={actions} activeUser={activeUser} />
                ))}
              </motion.div>
            )}

            {activeDetailTab === "activity" && (
              <motion.div key="activity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl space-y-4">
                {allActivity.map(act => (
                  <div key={act.id} className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-zinc-900/20">
                    <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-300">{act.text}</div>
                      <div className="text-[10px] font-mono text-neutral-600 mt-1.5 uppercase tracking-wider">
                        {act.time} • {act.taskTitle}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeDetailTab === "comments" && (
              <motion.div key="comments" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl space-y-6">
                {allComments.map(c => {
                  const author = USERS.find(u => u.id === c.authorId);
                  return (
                    <div key={c.id} className="flex gap-4">
                      {author && <UserAvatar user={author} size="md" />}
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between mb-1.5">
                          <span className="text-sm font-medium text-neutral-200">{author?.name}</span>
                          <span className="text-[10px] font-mono text-neutral-600">{c.time}</span>
                        </div>
                        <div className="p-4 rounded-2xl rounded-tl-none bg-zinc-900/40 border border-white/10 text-sm text-neutral-300 leading-relaxed">
                          {c.text}
                        </div>
                        <div className="mt-2 text-[10px] text-emerald-500/60 font-mono uppercase tracking-widest">
                          Task: {c.taskTitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30 flex flex-col font-sans overflow-x-hidden">
      <FloatingNav
        brandHref="/showcase"
        suffix="Enterprise Project Hub"
        accent="emerald"
        links={[]}
        cta={{ label: "Back to Portfolio", href: "/" }}
      />

      <div className="flex-1 pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">

        {/* Back to Showcase */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
          <Link
            href="/showcase"
            className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2} />
            Back to Showcase
          </Link>
        </motion.div>

        {/* Hero — frame the working system */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mb-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/3 -z-10 h-[44vh] w-[80vh] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[150px]"
          />

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2} />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-emerald-400/90">
              Self-built · Live system
            </span>
          </div>

          <h1 className="max-w-4xl font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-white sm:text-[3.25rem] lg:text-[3.75rem]">
            The Project <span className="italic text-emerald-400">Operating System.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
            A working command center I built to run L&amp;D delivery end-to-end — projects auto-spawn from
            the discovery intake pipeline, work routes to the right specialists, and progress tracks itself.
            Switch personas and open any task; it&apos;s fully interactive.
          </p>

          {/* Live stat bar — hairline-divided */}
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.07] sm:grid-cols-4">
            {[
              { label: "Active Projects", value: projects.length, icon: Briefcase },
              { label: "Live Tasks", value: tasks.length, icon: ListTodo },
              { label: "Team Members", value: USERS.length, icon: Users },
              { label: "Avg Completion", value: `${avgCompletion}%`, icon: TrendingUp },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.07, ease: EASE }}
                className="flex flex-col gap-2.5 bg-[#0a0a0f] p-5 sm:p-6"
              >
                <s.icon className="h-4 w-4 text-emerald-400/70" strokeWidth={2} />
                <span className="font-mono text-2xl font-medium tabular-nums text-white sm:text-3xl">{s.value}</span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Integration status line */}
          <div className="mt-6 flex items-center gap-2.5 text-xs text-neutral-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>
              Synced with the{" "}
              <Link
                href="/showcase/project-discovery-planning"
                className="font-medium text-emerald-400 underline-offset-4 transition-colors hover:underline"
              >
                discovery intake pipeline
              </Link>
            </span>
          </div>
        </motion.header>

        {/* Segmented control + Persona Dropdown */}
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/[0.06] pb-8">
          <div className="flex gap-1 rounded-2xl border border-white/10 bg-zinc-900/50 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {([
              { id: "Dashboard", icon: LayoutDashboard },
              { id: "Kanban Board", icon: ListTodo },
            ] as { id: MainTab; icon: typeof Briefcase }[]).map(({ id, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    if (id === "Dashboard") setPmViewMode("Home");
                  }}
                  className={cn(
                    "relative z-10 flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold uppercase tracking-widest transition-colors duration-200 active:scale-[0.97]",
                    isActive ? "text-black" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMainTab"
                      className="absolute inset-0 -z-10 rounded-xl bg-emerald-500 shadow-[0_4px_14px_rgba(16,185,129,0.3)]"
                      transition={SPRING}
                    />
                  )}
                  <Icon className="h-4 w-4" strokeWidth={2.5} />
                  <span>{id}</span>
                </button>
              );
            })}
          </div>

          {activeTab === "Dashboard" && (
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="h-8 w-px bg-white/[0.06] hidden sm:block" />
              <div className="flex items-center gap-3 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/10 w-full sm:w-64 relative group">
                <div className="pl-3 py-1 flex items-center gap-2 text-neutral-500 uppercase font-mono text-[10px] font-bold tracking-widest">
                  <Users className="h-3.5 w-3.5 text-emerald-500/60" />
                  <span>VIEW:</span>
                </div>
                <select 
                  value={dashboardType}
                  onChange={(e) => setDashboardType(e.target.value as DashboardType)}
                  className="bg-transparent text-white text-xs font-bold rounded-xl pl-1 pr-8 py-1.5 focus:outline-none appearance-none cursor-pointer flex-1 uppercase tracking-tight"
                >
                  <option value="PM Dashboard" className="bg-zinc-950 text-white">PM Dashboard</option>
                  <option value="Team Member Dashboard" className="bg-zinc-950 text-white">Team Member Dashboard</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none group-hover:text-emerald-400 transition-colors" />
              </div>
              
              <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <UserAvatar user={activeUser} size="xs" />
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">{activeUser.name.split(' ')[0]}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === "Dashboard" && (
              <motion.div key="dash-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {dashboardType === "PM Dashboard" ? renderPMDashboard() : renderTeamMemberDashboard()}
              </motion.div>
            )}
            
            {activeTab === "Kanban Board" && (
              <motion.div key="kanban-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                {renderKanbanBoard()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <LdFooter />

      <AnimatePresence>
        {selectedTaskId && (
          <TaskDetailOverlay 
            taskId={selectedTaskId} 
            user={activeUser}
            users={USERS}
            onClose={() => setSelectedTaskId(null)} 
            actions={actions}
          />
        )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.4); }
      `}} />
    </main>
  );
}