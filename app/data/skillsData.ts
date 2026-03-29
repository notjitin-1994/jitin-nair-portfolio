export interface Skill {
  name: string;
  level: number;
  description: string;
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "AI & LLM Orchestration",
    color: "#22d3ee",
    skills: [
      { name: "LangGraph", level: 95, description: "Stateful multi-agent workflow orchestration" },
      { name: "Claude (Anthropic)", level: 95, description: "Advanced reasoning and agentic tasks" },
      { name: "GPT-4o (OpenAI)", level: 90, description: "Multimodal AI integration" },
      { name: "Gemini Pro", level: 90, description: "Google long-context multimodal AI" },
      { name: "RAG Architecture", level: 92, description: "Retrieval-augmented generation systems" },
      { name: "Prompt Engineering", level: 95, description: "Advanced prompt design and optimization" },
      { name: "Chain-of-Verification", level: 90, description: "Self-correction and fact-checking" },
      { name: "LangChain", level: 90, description: "LLM application framework" },
      { name: "CrewAI", level: 85, description: "Role-based multi-agent collaboration" },
      { name: "Pinecone", level: 88, description: "Vector database for semantic search" },
    ],
  },
  {
    title: "Frontend & UX",
    color: "#a78bfa",
    skills: [
      { name: "React 18", level: 92, description: "Server Components, Suspense, Concurrent" },
      { name: "Next.js 14", level: 92, description: "App Router, RSC, Edge Runtime" },
      { name: "TypeScript", level: 90, description: "Strict type-safe development" },
      { name: "Tailwind CSS", level: 95, description: "Utility-first CSS framework" },
      { name: "Framer Motion", level: 90, description: "Production animation library" },
      { name: "Radix UI", level: 85, description: "Accessible component primitives" },
      { name: "Figma-to-Code", level: 82, description: "Design handoff automation" },
      { name: "Accessibility (WCAG)", level: 85, description: "Inclusive design standards" },
    ],
  },
  {
    title: "Backend & Data",
    color: "#f472b6",
    skills: [
      { name: "Python", level: 92, description: "AI/ML backbone, FastAPI, automation" },
      { name: "FastAPI", level: 90, description: "High-performance async Python APIs" },
      { name: "Node.js", level: 85, description: "Server-side JavaScript runtime" },
      { name: "PostgreSQL", level: 88, description: "Advanced relational database" },
      { name: "Redis", level: 85, description: "In-memory caching and pub/sub" },
      { name: "Supabase", level: 90, description: "Open-source Firebase alternative" },
      { name: "GraphQL", level: 82, description: "Flexible API query language" },
      { name: "TimescaleDB", level: 80, description: "Time-series database" },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    color: "#22c55e",
    skills: [
      { name: "Docker", level: 88, description: "Containerization and orchestration" },
      { name: "Linux / Systemd", level: 90, description: "System administration" },
      { name: "GitHub Actions", level: 88, description: "CI/CD automation" },
      { name: "AWS / GCP", level: 82, description: "Cloud platform deployment" },
      { name: "Nginx", level: 82, description: "Reverse proxy and load balancing" },
      { name: "Terraform", level: 78, description: "Infrastructure as Code" },
    ],
  },
  {
    title: "Automation & Integration",
    color: "#f59e0b",
    skills: [
      { name: "Playwright", level: 92, description: "Browser automation and testing" },
      { name: "n8n", level: 88, description: "Workflow automation platform" },
      { name: "MCP Protocol", level: 85, description: "Model Context Protocol integration" },
      { name: "Telegram/Discord Bots", level: 90, description: "Chat platform automation" },
      { name: "WhatsApp API", level: 80, description: "Business messaging integration" },
      { name: "Cron Scheduling", level: 90, description: "Time-based task automation" },
    ],
  },
  {
    title: "Instructional Design & L&D",
    color: "#ec4899",
    skills: [
      { name: "ADDIE Model", level: 95, description: "Systematic instructional design" },
      { name: "Video-Based Learning", level: 92, description: "Educational video production" },
      { name: "SCORM / xAPI", level: 85, description: "E-learning standards" },
      { name: "Bloom's Taxonomy", level: 92, description: "Learning objective design" },
      { name: "Microlearning", level: 90, description: "Bite-sized learning modules" },
      { name: "Learning Analytics", level: 82, description: "Data-driven L&D insights" },
    ],
  },
];
