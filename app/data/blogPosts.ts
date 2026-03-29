export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "from-ld-to-ai-prompt-engineering",
    title: "From L&D to AI: How Instructional Design Skills Transfer to Prompt Engineering",
    excerpt: "Years of designing learning experiences taught me exactly how to design prompts that work. Here's the unexpected overlap between instructional design and AI.",
    category: "AI Enablement",
    date: "2026-03-15",
    readTime: "8 min",
    content: `## The Unexpected Bridge

After years in Learning & Development — designing curricula at Accenture, building video-based learning at Moody's — I made a sharp pivot into AI systems architecture. What surprised me most wasn't how different the fields are. It was how similar they are.

### Instructional Design IS Prompt Engineering

Think about what an instructional designer does:
- **Defines clear learning objectives** → Defining clear output expectations for an LLM
- **Structures content for comprehension** → Structuring prompts for optimal model understanding
- **Anticipates misconceptions** → Anticipating hallucination patterns
- **Designs assessments** → Designing evaluation criteria for AI outputs
- **Iterates based on learner feedback** → Iterating prompts based on model behavior

The core skill is the same: taking complex requirements and translating them into structured instructions that produce predictable outcomes — whether the "learner" is human or artificial.

### Bloom's Taxonomy Meets Chain-of-Thought

When I design a prompt, I unconsciously apply Bloom's Taxonomy. Lower-order prompts ask for recall ("List the features of X"). Higher-order prompts demand synthesis ("Given these constraints, design an architecture that..."). The best prompts, like the best learning experiences, scaffold from simple to complex.

### The HITL Advantage

My L&D background gave me something most AI engineers lack: an intuitive understanding of Human-in-the-Loop systems. In L&D, every automated system has human checkpoints — SME reviews, learner feedback loops, quality gates. I brought this same philosophy to AI, building validation gates into every agent workflow.

### What This Means for AI Enablement

If you're in L&D and curious about AI, you're closer than you think. The skills that make you effective at designing learning — clarity, structure, empathy for the "user," iterative refinement — are exactly the skills that make great prompt engineers.

The future of AI Enablement isn't just technical. It's pedagogical.`,
  },
  {
    slug: "building-200-ai-agents",
    title: "Building 200+ AI Agents: Lessons in Multi-Agent Orchestration",
    excerpt: "What I learned deploying over 200 autonomous AI agents across 147 instances. Architecture decisions, failure patterns, and the governance frameworks that keep it all running.",
    category: "Agent Architecture",
    date: "2026-03-10",
    readTime: "12 min",
    content: `## The Scale Problem

When you go from 1 agent to 10, things get interesting. When you go from 10 to 200+, things get architectural. Here's what I learned building and orchestrating a fleet of autonomous AI agents.

### Architecture: LangGraph as the Backbone

Every agent in the fleet runs on LangGraph state machines. The key insight: treat agent workflows as directed graphs with explicit state transitions, not as chains of function calls. This gives you:
- **Persistence** — resume from any state after failure
- **Branching** — conditional logic based on intermediate results
- **Human-in-the-loop** — pause for approval at critical junctions
- **Observability** — trace every decision path

### The Three Failure Modes

At scale, agents fail in three predictable ways:

**1. Hallucination Cascade** — One agent hallucinates data, passes it to another, which builds on the fiction. Solution: Chain-of-Verification at every hand-off point.

**2. Resource Contention** — Multiple agents hitting the same API simultaneously. Solution: Redis-based rate limiting with exponential backoff.

**3. Context Drift** — Long-running agents gradually lose track of their original objective. Solution: Periodic context refresh with original instructions re-injection.

### Governance at Scale

The Reality-Check system was born from necessity. With 147 independent agent instances, manual oversight is impossible. The No Fiction Protocol enforces truth-verification at the system level — every agent must verify before reporting, cite sources, and flag uncertainty.

### Key Metrics

After 6 months of operation: 99.7% uptime, <50ms average response time, zero critical hallucination incidents post-governance deployment.

The biggest lesson? Agent architecture is systems engineering, not AI research. The hard problems aren't in the models — they're in the orchestration, governance, and observability.`,
  },
  {
    slug: "reality-check-anti-hallucination",
    title: "The Reality-Check Protocol: Eliminating Hallucinations in AI Agent Fleets",
    excerpt: "How I built an autonomous governance system that enforces truth-only protocols across 147 AI agents — achieving 96% compliance in under 3 minutes.",
    category: "AI Enablement",
    date: "2026-03-05",
    readTime: "10 min",
    content: `## The Problem With AI at Scale

AI agents hallucinate. That's not news. What IS news is what happens when 147 independent agents can each fabricate data, and their outputs feed into downstream systems, reports, and decisions.

### The No Fiction Protocol

Reality-Check enforces a simple but absolute mandate across every agent:
1. **Verify before reporting** — cross-reference claims against known data
2. **Cite sources** — every factual claim must have a traceable origin
3. **Say UNKNOWN** — when uncertain, acknowledge it explicitly
4. **Never simulate data** — no synthetic metrics, no fabricated examples

### How It Works

The system traverses all 147 agent directories, injects protocol references into their AGENTS.md configuration files, and establishes a centralized GLOBAL_PROTOCOLS.md mandate. It's automated policy injection at fleet scale.

### Results

- 141 of 147 agents enforced (96% coverage) in under 3 minutes
- Zero policy violations post-deployment
- Immutable audit trail for every compliance check
- Self-healing: new agents automatically inherit the protocol

### Why This Matters for Enterprise AI

As organizations deploy more AI agents, governance becomes the bottleneck. You can't have humans reviewing every agent output. You need automated, scalable governance systems that enforce truth without blocking productivity.

The future of enterprise AI isn't just smarter models — it's smarter governance.`,
  },
  {
    slug: "hitl-enterprise-ai",
    title: "HITL AI: Why Human-in-the-Loop is Non-Negotiable for Enterprise",
    excerpt: "Fully autonomous AI sounds great until it costs you a client. Here's why every production AI system needs human checkpoints — and how to design them without killing velocity.",
    category: "AI Enablement",
    date: "2026-02-28",
    readTime: "7 min",
    content: `## The Autonomy Trap

There's a seductive narrative in AI: remove all humans from the loop, let the machines run. It sounds efficient. In practice, it's how you get hallucinated financial reports, fabricated customer data, and AI-generated content that damages your brand.

### The Smartslate Model

When building Smartslate's AI-first learning platform, I designed HITL validation gates at every AI generation stage:
- **Discovery Phase** — AI conducts stakeholder interviews, humans validate the strategy
- **Design Phase** — AI generates instructional frameworks, IDs review and refine
- **Content Phase** — AI produces learning modules, SMEs curate and enhance
- **Delivery Phase** — AI tutors with human escalation paths

### Designing HITL Without Killing Velocity

The key is making human checkpoints asynchronous and lightweight:
1. **Batch reviews** — Don't interrupt the pipeline for every output. Queue items for batch human review.
2. **Confidence scoring** — Route only low-confidence outputs to humans. High-confidence items auto-approve.
3. **Template validation** — Humans approve templates once; AI generates variations within approved bounds.
4. **Escalation paths** — AI handles 90% autonomously, escalates 10% that need human judgment.

### The Math

With Smartslate, HITL added roughly 15% overhead to processing time but eliminated 95% of quality issues. That's not a trade-off — that's a bargain.

Enterprise AI that works is AI that knows when to ask for help.`,
  },
  {
    slug: "langgraph-vs-crewai",
    title: "LangGraph vs. CrewAI: Choosing Your Agent Framework",
    excerpt: "A practical comparison from someone who's built production systems with both. When to use LangGraph's state machines vs. CrewAI's role-based agents.",
    category: "Agent Architecture",
    date: "2026-02-20",
    readTime: "9 min",
    content: `## Two Philosophies of Agent Orchestration

LangGraph and CrewAI represent fundamentally different approaches to multi-agent systems. Having built production systems with both, here's my honest assessment.

### LangGraph: The State Machine Approach

LangGraph models agent workflows as directed graphs with explicit state transitions. You define nodes (actions), edges (transitions), and state (shared context).

**Strengths:**
- Deterministic control flow — you know exactly what happens when
- Built-in persistence — resume from any checkpoint
- Human-in-the-loop — native support for approval gates
- Debugging — trace every state transition

**Weaknesses:**
- Steeper learning curve
- More boilerplate for simple workflows
- Requires upfront architecture planning

### CrewAI: The Role-Based Approach

CrewAI defines agents as roles (researcher, writer, reviewer) that collaborate on tasks. You describe what each agent does, and CrewAI orchestrates the conversation.

**Strengths:**
- Intuitive mental model (team of specialists)
- Rapid prototyping
- Built-in delegation and task management
- Lower boilerplate

**Weaknesses:**
- Less control over execution order
- Harder to debug complex workflows
- Limited persistence options

### My Recommendation

**Use LangGraph when:**
- Building production systems with strict reliability requirements
- You need deterministic control flow
- Human-in-the-loop is required
- The workflow has complex branching logic

**Use CrewAI when:**
- Prototyping agent interactions quickly
- The workflow is naturally conversational
- You want role-based specialization
- Speed of development matters more than fine-grained control

For my agent fleet (200+ agents), LangGraph is the backbone. For quick experiments and proof-of-concepts, CrewAI gets me to "working demo" faster.

The best answer? Learn both. They solve different problems.`,
  },
];
