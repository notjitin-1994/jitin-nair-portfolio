"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  ArrowLeft, Search, Filter, Plus, Calendar, Clock, Paperclip, 
  MessageSquare, Activity, CheckCircle2, Circle, MoreHorizontal,
  Workflow, Zap, Users, LayoutDashboard, ChevronDown, Link as LinkIcon,
  FileText, Target, Globe, ShieldCheck, Mail, Linkedin, Upload,
  ListTodo, Info, UserCheck, Timer, ArrowRight, ChevronLeft, ChevronRight,
  FolderKanban, Briefcase, ChevronUp
} from "lucide-react";
import { FloatingNav } from "../../components/FloatingNav";
import { LdFooter } from "../../components/ld/LdFooter";
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
type MainTab = "PM Dashboard" | "Kanban Board" | "Team Member Dashboard";
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

function TaskCard({ task, users, project, onClick }: { task: Task, users: User[], project?: Project, onClick: () => void }) {
  const assignee = users.find(u => u.id === task.assigneeId);
  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const progress = totalSubtasks === 0 ? (task.status === "Done" ? 100 : 0) : (completedSubtasks / totalSubtasks) * 100;

  return (
    <motion.div
      layoutId={`task-card-${task.id}`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={SPRING}
      className="group cursor-pointer rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-5 hover:bg-zinc-900/80 hover:border-emerald-500/30 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_20px_-10px_rgba(0,0,0,0.2)] backdrop-blur-sm flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2 flex-wrap">
          {project && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-widest truncate max-w-[120px]">
              {project.name}
            </span>
          )}
          {task.tags.slice(0, project ? 1 : 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-medium text-neutral-400 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        <div className={cn("h-2 w-2 rounded-full shrink-0 ml-2", task.status === 'Done' ? 'bg-emerald-500' : 'bg-neutral-600')} />
      </div>
      
      <h4 className="text-sm font-medium text-neutral-200 mb-4 leading-snug group-hover:text-emerald-400 transition-colors flex-1">{task.title}</h4>
      
      {totalSubtasks > 0 && (
        <div className="mb-4 mt-auto">
          <div className="flex justify-between text-[10px] text-neutral-500 mb-1.5 font-mono uppercase tracking-widest">
            <span>Progress</span>
            <span>{completedSubtasks}/{totalSubtasks}</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      )}

      <div className={cn("flex items-center justify-between pt-4 border-t border-white/[0.04]", totalSubtasks === 0 && "mt-auto")}>
        {assignee ? (
          <div className="flex items-center gap-2">
            <UserAvatar user={assignee} size="sm" />
            <span className="text-[10px] font-medium text-neutral-400">{assignee.name.split(' ')[0]}</span>
          </div>
        ) : (
          <span className="text-[10px] text-neutral-600 italic">Unassigned</span>
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
  );
}


// ----------------------------------------------------------------------
// TASK DETAIL OVERLAY
// ----------------------------------------------------------------------

function TaskDetailOverlay({ task, user, users, onClose, actions }: { task: Task, user: User, users: User[], onClose: () => void, actions: any }) {
  const [commentText, setCommentText] = useState("");
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  
  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const progress = totalSubtasks === 0 ? (task.status === "Done" ? 100 : 0) : (completedSubtasks / totalSubtasks) * 100;
  const taskAssignee = users.find(u => u.id === task.assigneeId);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-md"
      />
      <motion.div 
        layoutId={`task-card-${task.id}`}
        className="relative w-full max-w-3xl bg-zinc-950 border border-emerald-500/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-8 pb-6 border-b border-white/5 flex justify-between items-start shrink-0 bg-white/[0.01]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest">{task.id}</span>
              <span className="text-xs text-neutral-500 font-medium px-2 py-0.5 rounded bg-white/5">{task.status}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-tight">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 space-y-10 overflow-y-auto custom-scrollbar">
          {/* Description & Meta */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <p className="text-sm text-neutral-400 leading-relaxed">{task.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {task.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded bg-white/[0.03] border border-white/5 text-[10px] font-medium text-neutral-500 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full md:w-48 shrink-0 space-y-6">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">Assignee</span>
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                  {taskAssignee && <UserAvatar user={taskAssignee} />}
                  <span className="text-sm text-neutral-200">{taskAssignee?.name || 'Unassigned'}</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">Due Date</span>
                <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 p-2 rounded-xl w-fit">
                  <Calendar className="h-4 w-4" /> {task.dueDate}
                </div>
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
              {task.subtasks.map(st => {
                const stUser = users.find(u => u.id === st.assigneeId);
                return (
                  <motion.div layout key={st.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-emerald-500/20 transition-colors">
                    <button 
                      onClick={() => actions.toggleSubtask(task.id, st.id, user.name)}
                      className="flex items-center gap-3 text-left focus:outline-none flex-1"
                    >
                      {st.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> : <Circle className="h-5 w-5 text-neutral-600 shrink-0 group-hover:text-neutral-400 transition-colors" />}
                      <span className={cn("text-sm transition-colors", st.completed ? "text-neutral-600 line-through" : "text-neutral-300")}>{st.title}</span>
                    </button>
                    {stUser && (
                      <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-neutral-500 hidden sm:inline">{stUser.name.split(' ')[0]}</span>
                        <UserAvatar user={stUser} size="sm" />
                      </div>
                    )}
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
              {task.attachments.map(att => (
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
          <div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2 mb-6">
              <MessageSquare className="h-3.5 w-3.5" /> Discussion
            </span>
            <div className="space-y-6 mb-6">
              {task.comments.length === 0 && <p className="text-sm text-neutral-600 italic">No comments yet.</p>}
              {task.comments.map(c => {
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
  const [activeTab, setActiveTab] = useState<MainTab>("PM Dashboard");
  const [pmViewMode, setPmViewMode] = useState<PMViewMode>("Home");
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeUserId, setActiveUserId] = useState<string>("u-1"); // Default: Jitin

  const activeUser = USERS.find(u => u.id === activeUserId) || USERS[0];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Pagination logic
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Collaborative Actions
  const actions = {
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
    }
  };

  useEffect(() => {
    if (selectedTask) {
      const updated = tasks.find(t => t.id === selectedTask.id);
      if (updated) setSelectedTask(updated);
    }
  }, [tasks, selectedTask]);

  // PM Dashboard Renderers
  const renderPMDashboard = () => {
    if (pmViewMode === "Home") {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-white tracking-tight">Oversight Dashboard</h2>
            <p className="text-neutral-500 mt-2 text-sm">Global view of all active learning initiatives and resource allocations.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div 
              onClick={() => setPmViewMode("Project List")}
              className="group cursor-pointer p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-emerald-500/40 transition-all backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FolderKanban className="h-48 w-48 text-emerald-500 translate-x-12 -translate-y-12" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-8">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-emerald-400 transition-colors">All Projects</h3>
                <p className="text-neutral-400 text-sm mb-12 max-w-sm">Manage and monitor high-level project health, team assignments, and delivery timelines.</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-2xl font-mono text-white">{projects.length} <span className="text-sm text-neutral-500 font-sans">Active</span></span>
                  <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveTab("Kanban Board")}
              className="group cursor-pointer p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-emerald-500/40 transition-all backdrop-blur-md relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ListTodo className="h-48 w-48 text-emerald-500 translate-x-12 -translate-y-12" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 mb-8">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-emerald-400 transition-colors">All Tasks</h3>
                <p className="text-neutral-400 text-sm mb-12 max-w-sm">Global Kanban board aggregating workstreams across all projects for granular tracking.</p>
                <div className="mt-auto flex items-center justify-between">
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
                  className="group cursor-pointer p-6 sm:p-8 rounded-[2rem] border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-emerald-500/40 transition-all backdrop-blur-md"
                >
                  <div className="grid md:grid-cols-[1fr_200px_150px] gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{project.uuid}</span>
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
      return <ProjectDetailView project={selectedProject} />;
    }

    return null;
  };

  const renderKanbanBoard = () => {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="h-full flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-serif text-white tracking-tight mb-2">Global Kanban</h2>
            <p className="text-sm text-neutral-500">Cross-project task orchestration and status tracking.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input type="text" placeholder="Search across all projects..." className="w-full pl-9 pr-4 py-2 bg-zinc-900/50 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />
            </div>
            <button className="p-2 bg-zinc-900/50 border border-white/10 rounded-xl text-neutral-400 hover:text-white transition-colors"><Filter className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto custom-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-6 min-w-max h-[calc(100vh-300px)] min-h-[500px]">
            {(["Backlog", "In Progress", "In Review", "Done"] as Status[]).map(status => {
              const colTasks = tasks.filter(t => t.status === status);
              return (
                <div key={status} className="w-[340px] flex flex-col h-full bg-zinc-900/20 rounded-[2rem] border border-white/5 p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-5 px-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full", status === 'Done' ? 'bg-emerald-500' : 'bg-neutral-600')} />
                      {status}
                    </h3>
                    <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-neutral-500">{colTasks.length}</span>
                  </div>
                  <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-2 h-full">
                    {colTasks.map(task => {
                      const proj = projects.find(p => p.id === task.projectId);
                      return <TaskCard key={task.id} task={task} users={USERS} project={proj} onClick={() => setSelectedTask(task)} />;
                    })}
                  </div>
                </div>
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-zinc-900/30 border border-white/10 p-6 rounded-[2rem] backdrop-blur-md">
          <div className="flex items-center gap-5">
            <UserAvatar user={activeUser} size="lg" showRing />
            <div>
              <h2 className="text-2xl font-serif text-white">Welcome back, {activeUser.name.split(' ')[0]}</h2>
              <p className="text-sm text-emerald-400/80 font-mono mt-1">{activeUser.role}</p>
            </div>
          </div>
          
          {/* Persona Switcher for Demo */}
          <div className="flex items-center gap-3 bg-black/40 p-2 rounded-2xl border border-white/5 w-full sm:w-auto">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold pl-2 hidden sm:block">View As:</span>
            <select 
              value={activeUserId}
              onChange={(e) => setActiveUserId(e.target.value)}
              className="bg-zinc-900 border border-white/10 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500/50 appearance-none cursor-pointer flex-1 sm:w-48"
            >
              {USERS.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
              ))}
            </select>
          </div>
        </div>

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
                  return <TaskCard key={task.id} task={task} users={USERS} project={proj} onClick={() => setSelectedTask(task)} />;
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

  const ProjectDetailView = ({ project }: { project: Project }) => {
    const [activeDetailTab, setActiveDetailTab] = useState<"tasks" | "activity" | "comments">("tasks");
    const [isResourcesOpen, setIsResourcesOpen] = useState(true);
    
    const pm = USERS.find(u => u.id === project.pmId);
    const team = USERS.filter(u => project.teamIds.includes(u.id));
    const projectTasks = tasks.filter(t => t.projectId === project.id);
    
    const totalSubtasks = projectTasks.reduce((acc, t) => acc + t.subtasks.length, 0);
    const completedSubtasks = projectTasks.reduce((acc, t) => acc + t.subtasks.filter(s => s.completed).length, 0);
    const completionRate = totalSubtasks === 0 ? 0 : (completedSubtasks / totalSubtasks) * 100;
  
    const allActivity = projectTasks.flatMap(t => t.activity.map(a => ({ ...a, taskTitle: t.title }))).sort((a, b) => b.id.localeCompare(a.id));
    const allComments = projectTasks.flatMap(t => t.comments.map(c => ({ ...c, taskTitle: t.title }))).sort((a, b) => b.id.localeCompare(a.id));

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

        <div className="relative rounded-[3rem] border border-white/10 bg-zinc-900/40 p-8 md:p-12 overflow-hidden backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Workflow className="h-64 w-64 text-emerald-500 translate-x-12 -translate-y-12" />
          </div>

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 uppercase tracking-widest shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  {project.uuid}
                </span>
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">{project.modality}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-10 leading-tight">
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

        {/* Collapsible Resource Allocation */}
        <div className="rounded-[2rem] border border-white/10 bg-zinc-900/20 overflow-hidden">
          <button 
            onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            className="w-full p-6 flex items-center justify-between bg-white/[0.01] hover:bg-white/[0.03] transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-serif text-white">Resource Allocation Matrix</h3>
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
                <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                   {projectTasks.map(task => {
                    const taskAssignee = USERS.find(u => u.id === task.assigneeId);
                    return (
                      <div key={task.id} className="p-4 rounded-xl border border-white/5 bg-black/20 space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-xs font-medium text-neutral-300 leading-tight">{task.title}</h4>
                          {taskAssignee && <UserAvatar user={taskAssignee} size="sm" />}
                        </div>
                        <div className="space-y-1.5">
                          {task.subtasks.slice(0, 3).map(st => {
                            const stAssignee = USERS.find(u => u.id === st.assigneeId);
                            return (
                              <div key={st.id} className="flex items-center justify-between text-[10px] bg-white/[0.02] p-1.5 rounded">
                                <span className="text-neutral-500 truncate pr-2">{st.title}</span>
                                <span className="text-neutral-600 font-medium shrink-0">{stAssignee?.name.split(' ')[0]}</span>
                              </div>
                            );
                          })}
                          {task.subtasks.length > 3 && <div className="text-[9px] text-neutral-600 pl-1">+{task.subtasks.length - 3} more</div>}
                        </div>
                      </div>
                    );
                  })}
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
                  <TaskCard key={task.id} task={task} users={USERS} onClick={() => setSelectedTask(task)} />
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
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-emerald-500/30 flex flex-col font-sans">
      <FloatingNav
        brandHref="/showcase"
        suffix="Enterprise Project Hub"
        accent="emerald"
        links={[]}
        cta={{ label: "Back to Portfolio", href: "/" }}
      />

      <div className="flex-1 pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full">
        
        {/* Automated Workflow Callout */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-6 flex items-start gap-4 backdrop-blur-xl"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Zap className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-md font-serif text-emerald-100">Intake Pipeline Synchronized</h4>
              <span className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest">Active Connectivity: discovery-blueprint-v2</span>
            </div>
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed max-w-3xl">
              Project management automation is fully integrated with the <Link href="/showcase/project-discovery-planning" className="text-emerald-400 hover:underline">Discovery intake pipeline</Link>.
            </p>
          </div>
        </motion.div>

        {/* Main 3-Tab Switcher */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] w-full max-w-2xl relative">
            {(["PM Dashboard", "Kanban Board", "Team Member Dashboard"] as MainTab[]).map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab === "PM Dashboard") setPmViewMode("Home");
                  }}
                  className={cn(
                    "flex-1 py-3 text-sm font-medium transition-colors relative z-10 rounded-xl",
                    isActive ? "text-black" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeMainTab"
                      className="absolute inset-0 bg-emerald-500 rounded-xl -z-10 shadow-[0_4px_14px_rgba(16,185,129,0.3)]"
                      transition={SPRING}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === "PM Dashboard" && (
              <motion.div key="pm-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {renderPMDashboard()}
              </motion.div>
            )}
            
            {activeTab === "Kanban Board" && (
              <motion.div key="kanban-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                {renderKanbanBoard()}
              </motion.div>
            )}

            {activeTab === "Team Member Dashboard" && (
              <motion.div key="team-dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {renderTeamMemberDashboard()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <LdFooter />

      <AnimatePresence>
        {selectedTask && (
          <TaskDetailOverlay 
            task={selectedTask} 
            user={activeUser}
            users={USERS}
            onClose={() => setSelectedTask(null)} 
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