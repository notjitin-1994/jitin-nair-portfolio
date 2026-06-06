"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Search, Filter, Plus, Calendar, Clock, Paperclip, 
  MessageSquare, Activity, CheckCircle2, Circle, MoreHorizontal,
  Workflow, Zap, Users, LayoutDashboard, ChevronDown, Link as LinkIcon,
  FileText, Target, Globe, ShieldCheck, Mail, Linkedin, Upload,
  ListTodo, Info, UserCheck, Timer, ArrowRight, ChevronLeft, ChevronRight
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

type Role = "Project Manager" | "Lead Instructional Designer" | "Instructional Designer" | "Content Developer";
type Status = "Backlog" | "In Progress" | "In Review" | "Done";
type Modality = "Video" | "Interactive" | "Hybrid" | "ILT" | "VILT";
type MainView = "Project List" | "Project Detail" | "Team Tasks" | "PM View" | "Team Member View";

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
  { id: "u-2", name: "Katrina Kaif", role: "Lead Instructional Designer", avatar: "https://i.pravatar.cc/150?u=katrina" },
  { id: "u-3", name: "Shah Rukh Khan", role: "Instructional Designer", avatar: "https://i.pravatar.cc/150?u=srk" },
  { id: "u-4", name: "John Abraham", role: "Content Developer", avatar: "https://i.pravatar.cc/150?u=john" },
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
    teamIds: ["u-2", "u-3", "u-4"]
  },
  {
    id: "p-2",
    uuid: "580e67ce-abfc-4932-862b-981f75c1d38b",
    name: "Great Indian University: Placement Readiness",
    modality: "Hybrid",
    intakeDate: "May 20, 2024",
    pmAssignmentDate: "May 21, 2024",
    pmId: "u-1",
    teamIds: ["u-2", "u-3", "u-4"]
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
  }
];

// ----------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------

function ProgressBar({ value, color = "emerald" }: { value: number, color?: string }) {
  const bgColor = color === "emerald" ? "bg-emerald-500" : "bg-indigo-500";
  return (
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        className={cn("h-full rounded-full", bgColor)}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function UserAvatar({ user, size = "md", showRing = false }: { user: User, size?: "xs" | "sm" | "md" | "lg", showRing?: boolean }) {
  const sizeClasses = {
    xs: "h-5 w-5 text-[8px]",
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs",
    lg: "h-10 w-10 text-sm"
  };
  
  return (
    <div 
      className={cn(
        "relative rounded-full overflow-hidden bg-zinc-900 shrink-0", 
        sizeClasses[size],
        showRing ? "ring-2 ring-emerald-500/50 p-[1px]" : "border border-white/10"
      )}
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

function TaskCard({ task, users, onClick }: { task: Task, users: User[], onClick: () => void }) {
  const assignee = users.find(u => u.id === task.assigneeId);
  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const progress = totalSubtasks === 0 ? (task.status === "Done" ? 100 : 0) : (completedSubtasks / totalSubtasks) * 100;

  return (
    <motion.div
      layoutId={`task-${task.id}`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      className="group cursor-pointer rounded-2xl border border-white/[0.08] bg-zinc-900/50 p-4 hover:bg-zinc-900/80 hover:border-emerald-500/30 transition-all shadow-sm backdrop-blur-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2 flex-wrap">
          {task.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-medium text-neutral-400 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        <div className={cn("h-2 w-2 rounded-full", task.status === 'Done' ? 'bg-emerald-500' : 'bg-neutral-700 animate-pulse')} />
      </div>
      
      <h4 className="text-sm font-medium text-neutral-200 mb-3 leading-tight group-hover:text-emerald-400 transition-colors">{task.title}</h4>
      
      {totalSubtasks > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-neutral-500 mb-1.5 font-mono">
            <span>Progress</span>
            <span>{completedSubtasks}/{totalSubtasks}</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.04]">
        {assignee && (
          <div className="flex items-center gap-2">
            <UserAvatar user={assignee} size="sm" />
            <span className="text-[10px] text-neutral-500">{assignee.name.split(' ')[0]}</span>
          </div>
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
// PROJECT DETAIL COMPONENT (Project View)
// ----------------------------------------------------------------------

function ProjectDetail({ project, tasks, users, actions }: { project: Project, tasks: Task[], users: User[], actions: any }) {
  const [activeTab, setActiveTab] = useState<"activity" | "comments">("activity");
  
  const pm = users.find(u => u.id === project.pmId);
  const team = users.filter(u => project.teamIds.includes(u.id));
  const projectTasks = tasks.filter(t => t.projectId === project.id);
  
  const totalSubtasks = projectTasks.reduce((acc, t) => acc + t.subtasks.length, 0);
  const completedSubtasks = projectTasks.reduce((acc, t) => acc + t.subtasks.filter(s => s.completed).length, 0);
  const completionRate = totalSubtasks === 0 ? 0 : (completedSubtasks / totalSubtasks) * 100;

  const allActivity = projectTasks.flatMap(t => t.activity.map(a => ({ ...a, taskTitle: t.title }))).sort((a, b) => b.id.localeCompare(a.id));
  const allComments = projectTasks.flatMap(t => t.comments.map(c => ({ ...c, taskTitle: t.title }))).sort((a, b) => b.id.localeCompare(a.id));

  return (
    <div className="space-y-12">
      {/* Project Header Card */}
      <div className="relative rounded-[2.5rem] border border-white/10 bg-zinc-900/40 p-8 md:p-12 overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Workflow className="h-40 w-40 text-emerald-500" />
        </div>

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                UUID: {project.uuid}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-sm text-neutral-400 italic">{project.modality} Delivery</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-8">
              {project.name}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Intake Received</span>
                <div className="text-sm text-neutral-200 flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                  {project.intakeDate}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">PM Assigned</span>
                <div className="text-sm text-neutral-200 flex items-center gap-2">
                  <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
                  {project.pmAssignmentDate}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Workstreams</span>
                <div className="text-sm text-neutral-200 flex items-center gap-2">
                  <ListTodo className="h-3.5 w-3.5 text-emerald-400" />
                  {projectTasks.length} Active
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Status</span>
                <div className="text-sm text-emerald-400 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  In Progress
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-neutral-300">Completion</span>
                <span className="text-2xl font-mono text-emerald-400">{Math.round(completionRate)}%</span>
              </div>
              <ProgressBar value={completionRate} />
            </div>
            
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">Assigned Team</span>
              <div className="flex flex-wrap gap-2">
                {pm && <UserAvatar user={pm} showRing size="md" />}
                {team.map(u => (
                  <UserAvatar key={u.id} user={u} size="md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task & Subtask Grid */}
      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <SectionHeading 
            title="Resource Allocation" 
            subtitle="Task-level assignment matrix across the project lifecycle."
            icon={Users}
            badge="Unified View"
          />
          <div className="space-y-4">
            {projectTasks.map(task => {
              const taskAssignee = users.find(u => u.id === task.assigneeId);
              return (
                <div key={task.id} className="p-5 rounded-2xl border border-white/5 bg-zinc-900/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white">{task.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-neutral-500 italic">{taskAssignee?.role}</span>
                      {taskAssignee && <UserAvatar user={taskAssignee} size="xs" />}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    {task.subtasks.map(st => {
                      const stAssignee = users.find(u => u.id === st.assigneeId);
                      return (
                        <div key={st.id} className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-white/[0.02]">
                          <span className="text-neutral-400">{st.title}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-neutral-600">{stAssignee?.name}</span>
                            {stAssignee && <UserAvatar user={stAssignee} size="xs" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tabbed Activity/Comments */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab("activity")}
                className={cn(
                  "text-sm font-medium pb-2 border-b-2 transition-all",
                  activeTab === "activity" ? "text-emerald-400 border-emerald-500" : "text-neutral-500 border-transparent hover:text-neutral-300"
                )}
              >
                Activity Log
              </button>
              <button 
                onClick={() => setActiveTab("comments")}
                className={cn(
                  "text-sm font-medium pb-2 border-b-2 transition-all",
                  activeTab === "comments" ? "text-emerald-400 border-emerald-500" : "text-neutral-500 border-transparent hover:text-neutral-300"
                )}
              >
                Global Comments
              </button>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-500">
              <Info className="h-4 w-4" />
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto custom-scrollbar pr-4">
            <AnimatePresence mode="wait">
              {activeTab === "activity" ? (
                <motion.div 
                  key="activity" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {allActivity.map(act => (
                    <div key={act.id} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-zinc-900/30">
                      <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-200">{act.text}</div>
                        <div className="text-[10px] text-neutral-600 mt-1 uppercase tracking-tighter">
                          {act.taskTitle} • {act.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="comments" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {allComments.map(c => {
                    const author = users.find(u => u.id === c.authorId);
                    return (
                      <div key={c.id} className="flex gap-4">
                        {author && <UserAvatar user={author} size="md" />}
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between mb-1">
                            <span className="text-xs font-medium text-neutral-300">{author?.name}</span>
                            <span className="text-[10px] text-neutral-600">{c.time}</span>
                          </div>
                          <div className="p-3 rounded-xl rounded-tl-none bg-zinc-900/50 border border-white/5 text-[13px] text-neutral-400 leading-relaxed">
                            {c.text}
                          </div>
                          <div className="mt-2 text-[9px] text-emerald-500/50 font-mono uppercase">
                            Thread: {c.taskTitle}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// TASK DETAIL OVERLAY
// ----------------------------------------------------------------------

function TaskDetailOverlay({ task, user, onClose, actions }: { task: Task, user: User, onClose: () => void, actions: any }) {
  const [commentText, setCommentText] = useState("");
  
  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const progress = totalSubtasks === 0 ? (task.status === "Done" ? 100 : 0) : (completedSubtasks / totalSubtasks) * 100;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      <motion.div 
        layoutId={`task-${task.id}`}
        className="relative w-full max-w-2xl bg-zinc-950 border border-emerald-500/20 rounded-[2rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 mb-2 block">{task.id}</span>
              <h2 className="text-2xl font-serif text-white">{task.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-white/5 text-neutral-500 hover:text-white transition-colors">
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs text-neutral-500 uppercase font-bold tracking-widest">Execution Progress</span>
              <span className="text-xs text-emerald-400 font-mono">{Math.round(progress)}%</span>
            </div>
            <ProgressBar value={progress} />
          </div>

          <div className="space-y-4">
            <span className="text-xs text-neutral-500 uppercase font-bold tracking-widest block">Checklist</span>
            <div className="grid gap-2">
              {task.subtasks.map(st => (
                <button 
                  key={st.id}
                  onClick={() => actions.toggleSubtask(task.id, st.id)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all text-left"
                >
                  {st.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-neutral-700" />}
                  <span className={cn("text-sm", st.completed ? "text-neutral-600 line-through" : "text-neutral-300")}>{st.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Artifacts */}
          <div className="space-y-4">
            <span className="text-xs text-neutral-500 uppercase font-bold tracking-widest block">Artifacts</span>
            <div className="grid grid-cols-2 gap-3">
              {task.attachments.map(att => (
                <div key={att.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <FileText className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-neutral-300 truncate">{att.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-white/10 text-neutral-600 hover:text-neutral-400 hover:border-white/20 transition-all cursor-pointer">
                <Plus className="h-4 w-4" />
                <span className="text-xs">Upload</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <span className="text-xs text-neutral-500 uppercase font-bold tracking-widest block">Collaboration</span>
            <div className="space-y-4 mb-4">
              {task.comments.map(c => (
                <div key={c.id} className="text-xs text-neutral-400 leading-relaxed bg-white/[0.02] p-3 rounded-xl">
                  {c.text}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <UserAvatar user={user} size="sm" />
              <div className="flex-1 relative">
                <input 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share update..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                />
                <button 
                  onClick={() => {
                    actions.addComment(task.id, user.id, commentText);
                    setCommentText("");
                  }}
                  disabled={!commentText.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-emerald-500 text-black flex items-center justify-center disabled:opacity-30"
                >
                  <ArrowRight className="h-4 w-4" />
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
  const [activeMainView, setActiveMainView] = useState<MainView>("Project List");
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Pagination logic
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Collaborative Actions
  const actions = {
    toggleSubtask: (taskId: string, subtaskId: string) => {
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          subtasks: t.subtasks.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st),
          activity: [{ id: `a-${Date.now()}`, text: `Subtask status updated`, time: "Just now" }, ...t.activity]
        };
      }));
    },
    addComment: (taskId: string, authorId: string, text: string) => {
      setTasks(prev => prev.map(t => {
        if (t.id !== taskId) return t;
        return {
          ...t,
          comments: [{ id: `c-${Date.now()}`, authorId, text, time: "Just now" }, ...t.comments],
          activity: [{ id: `a-${Date.now()}`, text: `New comment added`, time: "Just now" }, ...t.activity]
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

        {/* Global View Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md mb-12 w-fit">
          {(["Project List", "Project Detail", "Team Tasks", "PM View", "Team Member View"] as MainView[]).map(v => (
            <button
              key={v}
              onClick={() => setActiveMainView(v)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200",
                activeMainView === v ? "bg-emerald-500 text-black shadow-lg" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="min-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeMainView === "Project List" && (
              <motion.div 
                key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {currentProjects.map(p => {
                    const pTasks = tasks.filter(t => t.projectId === p.id);
                    const total = pTasks.reduce((acc, t) => acc + t.subtasks.length, 0);
                    const done = pTasks.reduce((acc, t) => acc + t.subtasks.filter(s => s.completed).length, 0);
                    const rate = total === 0 ? 0 : (done / total) * 100;
                    
                    return (
                      <div 
                        key={p.id}
                        onClick={() => {
                          setSelectedProject(p);
                          setActiveMainView("Project Detail");
                        }}
                        className="group cursor-pointer p-8 rounded-[2.5rem] border border-white/10 bg-zinc-900/40 hover:border-emerald-500/40 transition-all backdrop-blur-md flex flex-col"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                            <Target className="h-5 w-5" />
                          </div>
                          <span className="text-[10px] font-mono text-neutral-500">{p.uuid}</span>
                        </div>
                        <h3 className="text-xl font-serif text-white mb-8 group-hover:text-emerald-400 transition-colors flex-1">{p.name}</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-neutral-500">Progress</span>
                            <span className="text-emerald-400">{Math.round(rate)}%</span>
                          </div>
                          <ProgressBar value={rate} />
                        </div>
                      </div>
                    );
                  })}
                  {/* Initialize Workstream Placeholder */}
                  {currentProjects.length < 3 && (
                    <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-white/20 transition-all">
                      <div className="h-10 w-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-600 mb-4 group-hover:text-neutral-400 group-hover:border-neutral-500 transition-colors">
                        <Plus className="h-5 w-5" />
                      </div>
                      <span className="text-sm text-neutral-600 font-medium">Initialize New Workstream</span>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="p-2 rounded-full border border-white/10 text-neutral-500 disabled:opacity-20 hover:text-emerald-400 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="text-xs font-mono text-neutral-500">Page {currentPage} of {totalPages}</span>
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="p-2 rounded-full border border-white/10 text-neutral-500 disabled:opacity-20 hover:text-emerald-400 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeMainView === "Project Detail" && (
              <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProjectDetail project={selectedProject || projects[0]} tasks={tasks} users={USERS} actions={actions} />
              </motion.div>
            )}

            {activeMainView === "Team Tasks" && (
              <motion.div key="kanban" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SectionHeading 
                  title="Unified Kanban Board" 
                  subtitle="Global workstreams prioritized across all active delivery phases."
                  icon={LayoutDashboard}
                />
                <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar">
                  {(["Backlog", "In Progress", "In Review", "Done"] as Status[]).map(status => (
                    <div key={status} className="w-[320px] shrink-0 space-y-4">
                      <div className="flex justify-between items-center px-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                          <div className={cn("h-1.5 w-1.5 rounded-full", status === 'Done' ? 'bg-emerald-500' : 'bg-neutral-700')} />
                          {status}
                        </h3>
                        <span className="text-[10px] font-mono text-neutral-700">{tasks.filter(t => t.status === status).length}</span>
                      </div>
                      <div className="space-y-4">
                        {tasks.filter(t => t.status === status).map(task => (
                          <TaskCard key={task.id} task={task} users={USERS} onClick={() => setSelectedTask(task)} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeMainView === "PM View" && (
              <motion.div key="pm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProjectManagerView projects={projects} tasks={tasks} users={USERS} />
              </motion.div>
            )}

            {activeMainView === "Team Member View" && (
              <motion.div key="member" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TeamMemberView user={USERS[0]} tasks={tasks} actions={actions} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <LdFooter />

      <AnimatePresence>
        {selectedTask && (
          <TaskDetailOverlay task={selectedTask} user={USERS[0]} onClose={() => setSelectedTask(null)} actions={actions} />
        )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.3); }
      `}} />
    </main>
  );
}

// PM View Logic Component (placed at end for organization)
function ProjectManagerView({ projects, tasks, users }: { projects: Project[], tasks: Task[], users: User[] }) {
  const [filterUnassigned, setFilterUnassigned] = useState(false);
  const displayedProjects = filterUnassigned ? projects.filter(p => !p.pmId) : projects;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeading title="Executive Oversight" subtitle="Manager control plane for project assignment and tracking." icon={LayoutDashboard} />
        <div className="flex gap-2">
          <button onClick={() => setFilterUnassigned(!filterUnassigned)} className={cn("px-4 py-2 rounded-xl text-xs font-medium border transition-all", filterUnassigned ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-white/5 border-white/10 text-neutral-400")}>
            {filterUnassigned ? "Showing Unassigned" : "All Projects"}
          </button>
        </div>
      </div>
      <div className="grid gap-6">
        {displayedProjects.map(project => {
          const projectTasks = tasks.filter(t => t.projectId === project.id);
          const pm = users.find(u => u.id === project.pmId);
          return (
            <div key={project.id} className="p-6 rounded-3xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition-all backdrop-blur-md">
              <div className="grid gap-8 md:grid-cols-[1fr_200px_100px] items-center">
                <div>
                  <h3 className="text-lg font-serif text-white">{project.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1"><Timer className="h-3 w-3" /> {projectTasks.length} Workstreams</div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">Owner</span>
                  <div className="flex items-center gap-2">{pm && <UserAvatar user={pm} size="sm" />}<span className="text-xs text-neutral-300">{pm?.name || "Unassigned"}</span></div>
                </div>
                <div className="flex justify-end"><button className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-500"><MoreHorizontal className="h-4 w-4" /></button></div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {projectTasks.map(task => (
                  <div key={task.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex justify-between items-start mb-2"><span className="text-[10px] font-medium text-neutral-300 truncate">{task.title}</span></div>
                    <div className="flex items-center justify-between"><div className="flex items-center gap-1 text-[9px] text-neutral-500"><Calendar className="h-2.5 w-3.5" /> {task.dueDate}</div></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Team Member View Logic Component
function TeamMemberView({ user, tasks, actions }: { user: User, tasks: Task[], actions: any }) {
  const userTasks = tasks.filter(t => t.assigneeId === user.id || t.subtasks.some(st => st.assigneeId === user.id));
  const [selectedLocalTask, setSelectedLocalTask] = useState<Task | null>(null);

  return (
    <div className="space-y-12">
      <header className="flex items-center gap-6">
        <UserAvatar user={user} size="lg" showRing />
        <div>
          <h2 className="text-2xl font-serif text-white">Welcome back, {user.name.split(' ')[0]}</h2>
          <p className="text-neutral-500 text-sm">{user.role}</p>
        </div>
      </header>
      <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
        <section>
          <SectionHeading title="Your Workstreams" subtitle="Assigned tasks requiring attention." icon={ListTodo} badge="My Focus" />
          <div className="grid gap-4 sm:grid-cols-2">
            {userTasks.map(task => (
              <TaskCard key={task.id} task={task} users={[user]} onClick={() => setSelectedLocalTask(task)} />
            ))}
          </div>
        </section>
        <div className="space-y-8">
          <section className="p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
            <h3 className="text-sm font-medium text-white flex items-center gap-2 mb-4"><Upload className="h-4 w-4" /> Quick Artifact Upload</h3>
            <div className="border-2 border-dashed border-emerald-500/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-emerald-500/30 transition-all">
              <Plus className="h-5 w-5 text-emerald-400 mb-2" /><span className="text-xs text-neutral-400">Drop files here</span>
            </div>
          </section>
        </div>
      </div>
      <AnimatePresence>
        {selectedLocalTask && <TaskDetailOverlay task={selectedLocalTask} user={user} onClose={() => setSelectedLocalTask(null)} actions={actions} />}
      </AnimatePresence>
    </div>
  );
}