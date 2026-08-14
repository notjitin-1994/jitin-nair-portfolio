# L&D Project Management System - Architecture Plan

## 1. Core Objectives
- **Single Source of Truth (SSOT):** A unified data structure for projects, tasks, comments, and activities.
- **Role-Based Views:** Specialized dashboards for Project Managers and Team Members.
- **Interactive Kanban:** High-fidelity task management with real-time state synchronization.
- **Premium Emerald Branding:** Strict adherence to the `emerald` brand accent.
- **Automated Workflow Callout:** Visual integration with the Discovery intake pipeline.

## 2. Data Model
The system will use a normalized relational-style JSON structure managed via React state.

### `User`
- `id`: Unique identifier.
- `name`: Full name.
- `role`: Default role (PM, Lead ID, ID, Content Dev).
- `avatar`: URL to actual celebrity images.

### `Project`
- `id`: UUID.
- `name`: String.
- `modality`: `Hybrid` | `Video` | `Interactive` | `ILT` | `VILT`.
- `intakeDate`: ISO Date.
- `assignmentDate`: ISO Date.
- `pmId`: Link to User.
- `teamIds`: Array of User IDs.
- `completionRate`: Calculated percentage (0-100).
- `tasks`: Nested task structure or flat array with project ID.

### `Task`
- `id`: Unique ID.
- `projectId`: Link to project.
- `title`: String.
- `status`: `Backlog` | `In Progress` | `In Review` | `Done`.
- `assigneeId`: Link to User ID.
- `subtasks`: Array of `Subtask` objects.
- `comments`: Array of `Comment` objects.
- `artifacts`: Array of `Artifact` objects.

## 3. UI Hierarchy & Views

### Level 0: Global Navigation
- Fixed `FloatingNav` with `emerald` accent.
- "Back to Portfolio" CTA.

### Level 1: Project Hub (Initial Landing)
- **Project List Grid:** 3 projects per page (paginated).
- **Metric Cards:** High-level overview of completion rates and active workstreams.

### Level 2: Project Detail View (The "Project Page")
- Deep dive into a single project.
- Header: UUID, Name, Key Dates (Intake/Assignment).
- Team Section: Visual representation of PM and assigned members.
- Tabbed Area: Activity Log vs. Comments (synchronized with tasks).

### Level 3: Team Tasks View (The "Kanban Board")
- Unified board showing tasks across all projects (currently filtered to one).
- Status Columns: Backlog, In Progress, In Review, Done.

### Level 4: Specialized Dashboards
- **Project Manager View:** Management of all projects, unassigned filter, adding new projects, deadline overview.
- **Team Member View:** Personal task inbox, comment thread, artifact upload zone.

## 4. State Management Strategy
I will implement a **Centralized State Hub** within `ProjectManagementClient.tsx`. 
- **Unified Actions:** Functions like `updateTaskStatus`, `addComment`, `toggleSubtask` will be defined once and passed down.
- **Re-renders:** Because this is a demo, a single high-level state object is sufficient for reactivity.
- **Cross-Component Sync:** Any change made in the "Team Member View" will automatically reflect in the "Project View" and "Kanban Board" because they reference the same state pointers.

## 5. Visual Refinements (Emerald Only)
- Replace all `indigo` and `violet` instances with `emerald-400`, `emerald-500`, and `emerald-600`.
- Use `zinc-950` as the off-black base.
- Implement "Liquid Glass" refraction for all cards and modals.
- Staggered animations for list entry.

## 6. Real Assets
- **Jitin Nair:** `/hero-photo.jpg` (from repo).
- **Katrina Kaif:** High-quality placeholder (Lead ID).
- **Shah Rukh Khan:** High-quality placeholder (ID).
- **John Abraham:** High-quality placeholder (Content Dev).

---
*Implementation will begin by rewriting the `ProjectManagementClient.tsx` to accommodate this multi-view architecture.*