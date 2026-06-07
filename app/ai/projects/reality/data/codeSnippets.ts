// Data: Key code snippets for Reality Check Engine & Dreamcycle

export interface CodeSnippet {
  id: string;
  title: string;
  filePath: string;
  language: string;
  description: string;
  code: string;
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: "intent-validation",
    title: "Stage 1: Intent Validator",
    filePath: "extensions/reality-check-engine/src/index.ts",
    language: "typescript",
    description: "Intercepts sensitive tool calls (hooks: before_tool_call) and uses a secondary reasoning model to validate the action against original user intent.",
    code: `api.on("before_tool_call", async (event, ctx) => {
  const { tool, params } = event;
  if (!SENSITIVE_TOOLS.includes(tool)) return;

  const validationResult = await api.runtime.subagent.run({
    sessionKey: \`rce-validator:\${ctx.sessionKey}\`,
    message: \`### TASK: INTENT VALIDATION
    Compare this action: [\${tool}] args: \${JSON.stringify(params)}
    against original user intent. Respond SAFE or HALLUCINATION: <reason>.\`,
    provider: "google",
    model: "gemini-3-flash-preview"
  });

  const result = await api.runtime.subagent.waitForRun({ runId: validationResult.runId });
  if (lastMessage?.includes("HALLUCINATION")) {
    return { block: true, blockReason: "Reality Check Failed: Action is a hallucination." };
  }
  return {};
});`
  },
  {
    id: "truth-guard",
    title: "Stage 2: Truth-Guard (CoVe)",
    filePath: "extensions/reality-check-engine/src/index.ts",
    language: "typescript",
    description: "Implements Chain-of-Verification (CoVe) to fact-check AI responses before they are delivered, flagging contradictions in real-time.",
    code: `api.on("message_sending", async (event, ctx) => {
  const { content } = event;
  if (content.length < 100) return;

  const coveResult = await api.runtime.subagent.run({
    sessionKey: \`rce-cove:\${ctx.sessionKey}\`,
    message: \`### TASK: CHAIN-OF-VERIFICATION (CoVe)
    Examine claims against known facts: "\${content}"
    Respond JSON array: [{"claim": "...", "status": "VERIFIED|CONTRADICTED"}]\`,
    model: "gemini-3-flash-preview"
  });

  const report = JSON.parse(lastMessage.match(/\\[[\\s\\S]*\\]/)[0]);
  const contradictions = report.filter(c => c.status === "CONTRADICTED");

  if (contradictions.length > 0) {
    return { content: content + "\\n\\n⚠️ **Reality Check Warning**\\n" + format(contradictions) };
  }
  return {};
});`
  },
  {
    id: "hybrid-retrieval",
    title: "Hybrid Retrieval & RRF",
    filePath: "skills/memory-lancedb-pro/src/retrieval.ts",
    language: "typescript",
    description: "Reciprocal Rank Fusion (RRF) combining semantic vector search (70%) and BM25 keyword matching (30%) for optimal recall.",
    code: `function calculateHybridScore(vectorScore: number, bm25Score: number): number {
  // RRF Weighting: (Vector × 0.7) + (BM25 × 0.3)
  const vectorWeight = 0.7;
  const bm25Weight = 0.3;
  
  // BM25 bypass: High-confidence keyword matches (≥ 0.75) 
  // bypass semantic filters to protect API keys/technical terms.
  if (bm25Score >= 0.75) return Math.max(bm25Score, vectorScore);

  return (vectorScore * vectorWeight) + (bm25Score * bm25Weight);
}

const pipeline = [
  RRF_Fusion,
  CrossEncoder_Rerank,
  Weibull_Decay_Boost,
  Length_Normalization
];`
  },
  {
    id: "weibull-decay",
    title: "Weibull Memory Lifecycle",
    filePath: "skills/memory-lancedb-pro/src/lifecycle.ts",
    language: "typescript",
    description: "Tiered memory decay using Weibull distribution. Memories are promoted/demoted between Core, Working, and Peripheral tiers based on access patterns.",
    code: `/**
 * Weibull Decay Formula:
 * recency = exp(-lambda * daysSince^beta)
 */
const TIERS = {
  CORE:       { beta: 0.8, floor: 0.9 }, // Decays slowest
  WORKING:    { beta: 1.0, floor: 0.7 }, // Linear decay
  PERIPHERAL: { beta: 1.3, floor: 0.5 }  // Decays fastest
};

function calculateCompositeScore(memory: Memory): number {
  const recency = weibullDecay(memory.age, TIERS[memory.tier]);
  const frequency = Math.log1p(memory.accessCount);
  const intrinsic = memory.importanceWeight;

  // Composite: Recency 40% + Frequency 30% + Intrinsic 30%
  return (recency * 0.4) + (frequency * 0.3) + (intrinsic * 0.3);
}`
  }
];

export default codeSnippets;