"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { 
  ArrowLeft, Search, Filter, Plus, Calendar, Clock, Paperclip, 
  MessageSquare, Activity, CheckCircle2, Circle, MoreHorizontal,
  Workflow, Zap, Users, LayoutDashboard, ChevronDown, Link as LinkIcon,
  FileText, Target
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
// DATA TYPES & MOCK DATA
// ----------------------------------------------------------------------

type Assignee = "Jitin Nair" | "Abhishek Bachan" | "Shah Rukh Khan" | "John Abraham";
type Status = "Backlog" | "In Progress" | "In Review" | "Done";
type Modality = "Video" | "Interactive" | "Hybrid" | "ILT" | "VILT";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  assignee: Assignee;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

interface Comment {
  id: string;
  author: Assignee;
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
  title: string;
  description: string;
  status: Status;
  assignees: Assignee[];
  subtasks: Subtask[];
  attachments: Attachment[];
  comments: Comment[];
  activity: ActivityItem[];
  dueDate: string;
  tags: string[];
}

const AVATARS: Record<Assignee, string> = {
  "Jitin Nair": "https://i.pravatar.cc/150?u=jitin",
  "Abhishek Bachan": "https://i.pravatar.cc/150?u=abhi",
  "Shah Rukh Khan": "https://i.pravatar.cc/150?u=srk",
  "John Abraham": "https://i.pravatar.cc/150?u=john",
};

const ROLES: Record<Assignee, string> = {
  "Jitin Nair": "Project Manager",
  "Abhishek Bachan": "Lead Instructional Designer",
  "Shah Rukh Khan": "Instructional Designer",
  "John Abraham": "Content Developer",
};

const MOCK_TASKS: Task[] = [
  {
    id: "TSK-001",
    title: "Stakeholder Brief & Needs Analysis",
    description: "Automated extraction of business objectives and success metrics from the discovery intake form.",
    status: "Done",
    assignees: ["Jitin Nair"],
    dueDate: "Oct 12",
    tags: ["Discovery", "Strategy"],
    subtasks: [
      { id: "st-1", title: "Review intake form data", completed: true, assignee: "Jitin Nair" },
      { id: "st-2", title: "Conduct kickoff alignment call", completed: true, assignee: "Jitin Nair" },
      { id: "st-3", title: "Finalize learning objectives", completed: true, assignee: "Jitin Nair" },
    ],
    attachments: [
      { id: "att-1", name: "Intake_Form_Export.pdf", url: "#", type: "pdf" }
    ],
    comments: [
      { id: "c-1", author: "Jitin Nair", text: "Intake form processed. Objectives align with Q4 OKRs.", time: "2 days ago" }
    ],
    activity: [
      { id: "a-1", text: "Project automatically generated from Intake Form", time: "5 days ago" },
      { id: "a-2", text: "Manager assigned Jitin Nair", time: "5 days ago" },
      { id: "a-3", text: "Moved to Done", time: "2 days ago" }
    ]
  },
  {
    id: "TSK-002",
    title: "Curriculum Mapping & LXD Strategy",
    description: "Map cognitive paths and behavioral milestones for the hybrid learning journey.",
    status: "Done",
    assignees: ["Abhishek Bachan"],
    dueDate: "Oct 15",
    tags: ["LXD", "Design"],
    subtasks: [
      { id: "st-4", title: "Draft high-level curriculum outline", completed: true, assignee: "Abhishek Bachan" },
      { id: "st-5", title: "Determine modality split (Hybrid)", completed: true, assignee: "Abhishek Bachan" },
      { id: "st-6", title: "SME review of content map", completed: true, assignee: "Jitin Nair" },
    ],
    attachments: [
      { id: "att-2", name: "Curriculum_Map_v1.json", url: "#", type: "code" }
    ],
    comments: [],
    activity: [
      { id: "a-4", text: "Abhishek Bachan completed subtask", time: "3 days ago" }
    ]
  },
  {
    id: "TSK-003",
    title: "Storyboard & Script Development",
    description: "Detailed storyboarding for interactive modules and scripting for video segments.",
    status: "In Review",
    assignees: ["Shah Rukh Khan", "Abhishek Bachan"],
    dueDate: "Oct 20",
    tags: ["ID", "Content"],
    subtasks: [
      { id: "st-7", title: "Write video scripts (Modules 1-3)", completed: true, assignee: "Shah Rukh Khan" },
      { id: "st-8", title: "Draft interactive scenario branching", completed: true, assignee: "Shah Rukh Khan" },
      { id: "st-9", title: "Peer review of storyboards", completed: false, assignee: "Abhishek Bachan" },
    ],
    attachments: [
      { id: "att-3", name: "Scenario_Branching.fig", url: "#", type: "design" },
      { id: "att-4", name: "Video_Scripts_Draft.docx", url: "#", type: "doc" }
    ],
    comments: [
      { id: "c-2", author: "Shah Rukh Khan", text: "Scripts are ready for peer review. Let me know if the tone is right.", time: "4 hours ago" },
      { id: "c-3", author: "Abhishek Bachan", text: "Looking now. Will add comments directly in the doc.", time: "1 hour ago" }
    ],
    activity: [
      { id: "a-5", text: "Shah Rukh Khan attached Video_Scripts_Draft.docx", time: "5 hours ago" },
      { id: "a-6", text: "Moved to In Review", time: "4 hours ago" }
    ]
  },
  {
    id: "TSK-004",
    title: "Interactive Content Authoring",
    description: "Develop SCORM-compliant interactive modules based on approved storyboards.",
    status: "In Progress",
    assignees: ["John Abraham"],
    dueDate: "Oct 28",
    tags: ["Development", "SCORM"],
    subtasks: [
      { id: "st-10", title: "Build base navigation UI", completed: true, assignee: "John Abraham" },
      { id: "st-11", title: "Implement branching logic", completed: false, assignee: "John Abraham" },
      { id: "st-12", title: "Add knowledge check assessments", completed: false, assignee: "John Abraham" },
    ],
    attachments: [],
    comments: [],
    activity: [
      { id: "a-7", text: "Moved to In Progress", time: "1 day ago" }
    ]
  },
  {
    id: "TSK-005",
    title: "Video Production & Editing",
    description: "Record, edit, and animate motion graphics for the instructional videos.",
    status: "In Progress",
    assignees: ["John Abraham"],
    dueDate: "Oct 30",
    tags: ["Video", "Media"],
    subtasks: [
      { id: "st-13", title: "Record voiceovers", completed: true, assignee: "John Abraham" },
      { id: "st-14", title: "Sync audio with motion graphics", completed: false, assignee: "John Abraham" },
      { id: "st-15", title: "Render final MP4s", completed: false, assignee: "John Abraham" },
    ],
    attachments: [],
    comments: [],
    activity: []
  },
  {
    id: "TSK-006",
    title: "Alpha Review & UAT",
    description: "End-to-end testing of the hybrid program with pilot users.",
    status: "Backlog",
    assignees: ["Jitin Nair", "Abhishek Bachan"],
    dueDate: "Nov 5",
    tags: ["QA", "Review"],
    subtasks: [
      { id: "st-16", title: "Deploy to staging LMS", completed: false, assignee: "Jitin Nair" },
      { id: "st-17", title: "Collect pilot feedback", completed: false, assignee: "Abhishek Bachan" },
    ],
    attachments: [],
    comments: [],
    activity: []
  },
  {
    id: "TSK-007",
    title: "LMS Implementation & Rollout",
    description: "Final deployment to production LMS and global audience assignment.",
    status: "Backlog",
    assignees: ["Jitin Nair"],
    dueDate: "Nov 10",
    tags: ["Deployment"],
    subtasks: [
      { id: "st-18", title: "Upload final SCORM packages", completed: false, assignee: "Jitin Nair" },
      { id: "st-19", title: "Configure dynamic assignment rules", completed: false, assignee: "Jitin Nair" },
    ],
    attachments: [],
    comments: [],
    activity: []
  }
];

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-indigo-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function IntegrationCallout() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-4 flex items-start gap-4 backdrop-blur-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
        <Zap className="h-5 w-5" />
      </div>
      <div>
        <h4 className="text-sm font-medium text-indigo-100">Automated Intake Pipeline Active</h4>
        <p className="mt-1 text-sm text-indigo-200/60 leading-relaxed">
          This project was automatically generated from the Discovery Intake Form. The manager was notified, 
          the blueprint was parsed into tasks, and email assignments were dispatched to the global L&D team.
        </p>
      </div>
    </motion.div>
  );
}

function AssigneeAvatar({ assignee, size = "md" }: { assignee: Assignee, size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs",
    lg: "h-10 w-10 text-sm"
  };
  
  return (
    <div className={cn("relative rounded-full overflow-hidden border border-white/10 bg-white/5 shrink-0", sizeClasses[size])}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={AVATARS[assignee]} alt={assignee} className="h-full w-full object-cover" />
    </div>
  );
}

function TaskCard({ task, onClick }: { task: Task, onClick: () => void }) {
  const totalSubtasks = task.subtasks.length;
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const progress = totalSubtasks === 0 ? (task.status === "Done" ? 100 : 0) : (completedSubtasks / totalSubtasks) * 100;

  return (
    <motion.div
      layoutId={`task-${task.id}`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-indigo-500/30 transition-colors shadow-[0_4px_20px_-10px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2 flex-wrap">
          {task.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        <MoreHorizontal className="h-4 w-4 text-neutral-600 group-hover:text-neutral-400" />
      </div>
      
      <h4 className="text-sm font-medium text-neutral-200 mb-2 leading-tight">{task.title}</h4>
      
      {totalSubtasks > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-[11px] text-neutral-500 mb-1.5">
            <span>Progress</span>
            <span>{completedSubtasks}/{totalSubtasks}</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.04]">
        <div className="flex -space-x-2">
          {task.assignees.map((a, i) => (
            <div key={a} className="relative z-10" style={{ zIndex: 10 - i }}>
              <AssigneeAvatar assignee={a} size="sm" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 text-neutral-500">
          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-[11px]">
              <Paperclip className="h-3 w-3" /> {task.attachments.length}
            </div>
          )}
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-[11px]">
              <MessageSquare className="h-3 w-3" /> {task.comments.length}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TaskDetailModal({ task, onClose }: { task: Task, onClose: () => void }) {
  // Local state for demo interactivity
  const [localTask, setLocalTask] = useState<Task>(task);
  const [newComment, setNewComment] = useState("");

  const totalSubtasks = localTask.subtasks.length;
  const completedSubtasks = localTask.subtasks.filter(s => s.completed).length;
  const progress = totalSubtasks === 0 ? (localTask.status === "Done" ? 100 : 0) : (completedSubtasks / totalSubtasks) * 100;

  const toggleSubtask = (id: string) => {
    setLocalTask(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(s => s.id === id ? { ...s, completed: !s.completed } : s),
      activity: [
        { id: `a-new-${Date.now()}`, text: `Jitin Nair updated a subtask`, time: "Just now" },
        ...prev.activity
      ]
    }));
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    setLocalTask(prev => ({
      ...prev,
      comments: [
        ...prev.comments,
        { id: `c-new-${Date.now()}`, author: "Jitin Nair", text: newComment, time: "Just now" }
      ],
      activity: [
        { id: `a-new2-${Date.now()}`, text: `Jitin Nair commented on the task`, time: "Just now" },
        ...prev.activity
      ]
    }));
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-sm"
      />
      
      <motion.div 
        layoutId={`task-${task.id}`}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2rem] border border-white/10 bg-[#12121a] shadow-2xl flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Left Column: Main Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10 border-r border-white/5 custom-scrollbar">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-mono tracking-widest uppercase border border-indigo-500/20">
              {localTask.id}
            </span>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-sm text-neutral-500">In list <strong className="text-neutral-300">{localTask.status}</strong></span>
          </div>

          <h2 className="text-2xl font-serif text-white mb-4">{localTask.title}</h2>
          
          <div className="prose prose-invert prose-sm max-w-none text-neutral-400 mb-10">
            <p>{localTask.description}</p>
          </div>

          {/* Subtasks */}
          {localTask.subtasks.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                  Subtasks
                </h3>
                <span className="text-xs text-neutral-500">{Math.round(progress)}% Complete</span>
              </div>
              <div className="mb-6">
                <ProgressBar value={progress} />
              </div>
              <div className="space-y-2">
                {localTask.subtasks.map(st => (
                  <div key={st.id} className="group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleSubtask(st.id)}
                        className="text-neutral-500 hover:text-indigo-400 transition-colors focus:outline-none"
                      >
                        {st.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </button>
                      <span className={cn("text-sm transition-colors", st.completed ? "text-neutral-500 line-through" : "text-neutral-300")}>
                        {st.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-neutral-500">{st.assignee}</span>
                      <AssigneeAvatar assignee={st.assignee} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div>
            <h3 className="text-sm font-medium text-white flex items-center gap-2 mb-6">
              <MessageSquare className="h-4 w-4 text-indigo-400" />
              Discussion
            </h3>
            
            <div className="space-y-6 mb-6">
              {localTask.comments.map(c => (
                <div key={c.id} className="flex gap-4">
                  <AssigneeAvatar assignee={c.author} size="md" />
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-sm font-medium text-neutral-200">{c.author}</span>
                      <span className="text-xs text-neutral-600">{c.time}</span>
                    </div>
                    <div className="p-3 rounded-xl rounded-tl-none bg-white/[0.03] border border-white/5 text-sm text-neutral-300">
                      {c.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <AssigneeAvatar assignee="Jitin Nair" size="md" />
              <div className="flex-1 relative">
                <textarea 
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Ask a question or post an update..."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none min-h-[80px]"
                />
                <button 
                  onClick={addComment}
                  disabled={!newComment.trim()}
                  className="absolute bottom-3 right-3 px-4 py-1.5 bg-indigo-500 text-white text-xs font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-400 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Meta */}
        <div className="w-full md:w-80 bg-white/[0.02] p-8 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="space-y-8">
            
            {/* Meta Items */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-3">Assignees</span>
                <div className="flex flex-col gap-3">
                  {localTask.assignees.map(a => (
                    <div key={a} className="flex items-center gap-3">
                      <AssigneeAvatar assignee={a} size="md" />
                      <div>
                        <div className="text-sm text-neutral-200">{a}</div>
                        <div className="text-[10px] text-neutral-500">{ROLES[a]}</div>
                      </div>
                    </div>
                  ))}
                  <button className="flex items-center gap-3 text-sm text-neutral-500 hover:text-indigo-400 transition-colors mt-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-neutral-600 bg-transparent">
                      <Plus className="h-4 w-4" />
                    </div>
                    Add Assignee
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-3">Due Date</span>
                <div className="flex items-center gap-2 text-sm text-neutral-300 p-2.5 rounded-lg bg-white/5 border border-white/5 w-fit">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                  {localTask.dueDate}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider block mb-3">Attachments</span>
                {localTask.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {localTask.attachments.map(att => (
                      <div key={att.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="h-8 w-8 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          {att.type === 'pdf' || att.type === 'doc' ? <FileText className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                        </div>
                        <span className="text-xs text-neutral-300 truncate group-hover:text-indigo-400 transition-colors">{att.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-neutral-600 italic">No attachments</div>
                )}
                <button className="text-xs text-indigo-400 mt-3 font-medium hover:text-indigo-300 transition-colors">
                  + Add Document or Link
                </button>
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Activity Tracker */}
            <div>
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-2 mb-4">
                <Activity className="h-4 w-4" />
                Activity Log
              </span>
              <div className="relative space-y-4 before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/5 before:to-transparent">
                {localTask.activity.map(act => (
                  <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border border-[#12121a] bg-neutral-700 group-[.is-active]:bg-indigo-500 text-slate-100 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 transform -translate-x-1/2 z-10" />
                    
                    {/* Content */}
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[11px] text-neutral-400 leading-snug">{act.text}</div>
                      <div className="text-[9px] text-neutral-600 mt-1">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN PAGE
// ----------------------------------------------------------------------

export function ProjectManagementClient() {
  const [tasks] = useState<Task[]>(MOCK_TASKS);
  const [modality, setModality] = useState<Modality>("Hybrid");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const columns: Status[] = ["Backlog", "In Progress", "In Review", "Done"];

  // Overall Project Progress
  const totalSubtasks = useMemo(() => tasks.reduce((acc, t) => acc + t.subtasks.length, 0), [tasks]);
  const completedSubtasks = useMemo(() => tasks.reduce((acc, t) => acc + t.subtasks.filter(s => s.completed).length, 0), [tasks]);
  const projectProgress = totalSubtasks === 0 ? 0 : (completedSubtasks / totalSubtasks) * 100;

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-indigo-500/30 flex flex-col font-sans">
      <FloatingNav
        brandHref="/showcase"
        suffix="Orchestration Demo"
        accent="indigo"
        links={[]}
        cta={{ label: "Back to Portfolio", href: "/" }}
      />

      <div className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-12 max-w-[1600px] mx-auto w-full flex flex-col">
        
        {/* Header Section */}
        <header className="mb-8">
          <IntegrationCallout />
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">PRJ-9942</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">Enterprise AI Enablement</h1>
              <p className="text-neutral-500 mt-2 max-w-2xl text-sm">
                Orchestrating the global rollout of AI capability upskilling across engineering and product teams. 
                Data synchronized from the Discovery Intake Pipeline.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Modality Selector */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-[#12121a]">
                {(["Video", "Interactive", "Hybrid", "VILT"] as Modality[]).map(m => (
                  <button
                    key={m}
                    onClick={() => setModality(m)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                      modality === m 
                        ? "bg-white/10 text-white shadow-sm" 
                        : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
              
              <div className="flex -space-x-2">
                {(Object.keys(AVATARS) as Assignee[]).map((a, i) => (
                  <div key={a} className="relative z-10" style={{ zIndex: 10 - i }} title={a}>
                    <AssigneeAvatar assignee={a} size="lg" />
                  </div>
                ))}
                <div className="relative z-0 flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-white/20 bg-[#12121a] text-xs font-medium text-neutral-500 hover:text-white hover:border-white/40 cursor-pointer transition-colors">
                  +2
                </div>
              </div>
            </div>
          </div>

          {/* Top Level Project Progress */}
          <div className="p-5 rounded-[1.5rem] border border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-medium text-white">Milestone Progress</span>
              </div>
              <span className="text-sm font-mono text-indigo-400">{Math.round(projectProgress)}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${projectProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </header>

        {/* Board Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="pl-9 pr-4 py-2 bg-[#12121a] border border-white/10 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500/50 transition-colors w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-[#12121a] border border-white/10 rounded-xl text-sm text-neutral-400 hover:text-white hover:border-white/20 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white font-medium text-sm rounded-xl hover:bg-indigo-400 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <Plus className="h-4 w-4" />
            New Task
          </button>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto custom-scrollbar pb-4">
          <div className="flex gap-6 min-w-max h-full">
            {columns.map(status => {
              const columnTasks = tasks.filter(t => t.status === status);
              return (
                <div key={status} className="w-[320px] flex flex-col h-full bg-white/[0.01] rounded-[2rem] border border-white/[0.03] p-4">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                      {status}
                      <span className="flex items-center justify-center h-5 px-1.5 rounded bg-white/5 text-[10px] text-neutral-500 font-mono">
                        {columnTasks.length}
                      </span>
                    </h3>
                    <button className="text-neutral-600 hover:text-neutral-300 transition-colors">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar flex-1 pr-1">
                    {columnTasks.map((task, i) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <TaskCard task={task} onClick={() => setSelectedTask(task)} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <LdFooter />

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
        )}
      </AnimatePresence>
      
      {/* Global styles for custom scrollbar within this component scope */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </main>
  );
}