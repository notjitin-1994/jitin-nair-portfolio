export interface Resource {
  title: string;
  description: string;
  type: string;
  icon: string;
  downloadUrl: string;
}

export const resources: Resource[] = [
  {
    title: "Prompt Engineering Playbook",
    description: "10 battle-tested prompt patterns for LLM integration. Includes chain-of-thought, few-shot, and role-based templates.",
    type: "PDF Guide",
    icon: "FileText",
    downloadUrl: "#",
  },
  {
    title: "Multi-Agent Architecture Blueprint",
    description: "System design template for LangGraph-based multi-agent orchestration. Includes state machine diagrams and data flow patterns.",
    type: "Architecture Doc",
    icon: "Network",
    downloadUrl: "#",
  },
  {
    title: "AI Enablement Readiness Checklist",
    description: "30-point assessment for organizations evaluating AI integration. Covers infrastructure, data, team skills, and governance.",
    type: "Checklist",
    icon: "CheckSquare",
    downloadUrl: "#",
  },
  {
    title: "HITL Pipeline Design Guide",
    description: "Step-by-step guide for implementing Human-in-the-Loop validation gates in AI workflows without sacrificing velocity.",
    type: "Technical Guide",
    icon: "Users",
    downloadUrl: "#",
  },
];
