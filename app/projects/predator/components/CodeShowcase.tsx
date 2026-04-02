'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, ChevronLeft, ChevronRight, Lock, Unlock, Mail, Phone, ArrowRight, Check } from 'lucide-react';
import CodeBlock from './ui/CodeBlock';

const codeSnippets = [
  {
    id: "bayesian-confluence",
    title: "Bayesian Confluence",
    filePath: "agents/regime_agent/confluence.py",
    language: "python",
    description: "Argus Bayesian engine fusing Price Action, RF Classifier, and Gaussian HMM into a weighted regime confidence score.",
    code: `def calculate_confluence(self, pa_regime, ml_regime, hmm_regime) -> dict:
    # Bayesian Prior Weights
    PA_WEIGHT, ML_WEIGHT, HMM_WEIGHT = 0.60, 0.30, 0.10
    
    regime_probs = {r: 0.0 for r in RegimeType}
    
    # Apply evidence fusion
    regime_probs[pa_regime] += PA_WEIGHT
    regime_probs[ml_regime] += ML_WEIGHT
    regime_probs[hmm_regime] += HMM_WEIGHT
    
    # Select mode and calculate entropy-based confidence
    final_regime = max(regime_probs, key=regime_probs.get)
    confidence = regime_probs[final_regime]
    
    return {
        "regime": final_regime,
        "confidence": confidence,
        "is_stable": confidence >= 0.70
    }`
  },
  {
    id: "strategy-matrix",
    title: "Strategy Matrix",
    filePath: "agents/strategy_agent/matrix.py",
    language: "python",
    description: "Athena dynamic node switching system that activates specific strategy logic based on the Bayesian regime.",
    code: `class StrategyMatrix:
    def __init__(self):
        self.nodes = {
            Regime.TREND_UP: EMAPullbackNode(direction="LONG"),
            Regime.TREND_DOWN: EMAPullbackNode(direction="SHORT"),
            Regime.RANGE: MeanReversionNode(threshold=2.0),
            Regime.VOLATILE: BreakoutNode(atr_mult=1.5)
        }

    async def get_directive(self, state: AgentState) -> StrategyDirective:
        regime = state["regime_consensus"]
        node = self.nodes.get(regime, self.nodes[Regime.VOLATILE])
        
        # Execute logic for active node
        decision = await node.evaluate(state["features"])
        
        return StrategyDirective(
            node_id=node.id,
            decision=decision,
            rationale=node.generate_rationale(state)
        )`
  },
  {
    id: "ofi-extraction",
    title: "OFI Extraction",
    filePath: "agents/ingestion_agent/hermes.py",
    language: "python",
    description: "Hermes Level 2 microstructure analysis extracting Order Flow Imbalance from the top 5 levels of the LOB.",
    code: `def calculate_ofi(self, snapshot: DepthSnapshot) -> float:
    \"\"\"Calculates Order Flow Imbalance (OFI) across LOB levels.\"\"\"
    ofi_sum = 0.0
    
    for level in range(5):
        bid_delta = snapshot.bids[level].size - self.prev_snap.bids[level].size
        ask_delta = snapshot.asks[level].size - self.prev_snap.asks[level].size
        
        # OFI logic: Increase in bid volume or decrease in ask volume is bullish
        weight = 1.0 / (level + 1)
        ofi_sum += (bid_delta - ask_delta) * weight
        
    self.prev_snap = snapshot
    return np.tanh(ofi_sum / self.norm_factor)  # Normalized [-1, 1]`
  },
  {
    id: "state-graph",
    title: "LangGraph Workflow",
    filePath: "graph.py",
    language: "python",
    description: "Stateful agent orchestration using LangGraph to manage the Bayesian Pantheon's decision loop.",
    code: `def build_nexus_graph():
    builder = StateGraph(AgentState)
    
    builder.add_node("hermes", ingest_data)
    builder.add_node("argus", detect_regime)
    builder.add_node("athena", select_strategy)
    builder.add_node("apollo", generate_signal)
    
    builder.set_entry_point("hermes")
    builder.add_edge("hermes", "argus")
    builder.add_edge("argus", "athena")
    builder.add_edge("athena", "apollo")
    builder.add_edge("apollo", END)
    
    return builder.compile()`
  }
];

// Access Request Form Component
function AccessRequestForm({ onUnlock }: { onUnlock: () => void }) {
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: '', phone: '' });

  const validate = () => {
    const newErrors = { email: '', phone: '' };
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }
    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = 'Valid phone required';
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    // Collect data and unlock session
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    onUnlock();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      {/* Glass Card */}
      <div className="p-6 rounded-2xl bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl">
        {/* Header */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-12 h-12 mx-auto mb-3 rounded-xl bg-cyan-500/20 flex items-center justify-center"
          >
            <Lock className="w-6 h-6 text-cyan-400" />
          </motion.div>
          <h3 className="text-base font-bold text-white mb-1">Access Required</h3>
          <p className="text-slate-400 text-xs">
            Unlock all code with your details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 transition-all"
                placeholder="Email"
              />
            </div>
            {errors.email && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 transition-all"
                placeholder="Phone"
              />
            </div>
            {errors.phone && <p className="text-red-400 text-[10px] mt-1 ml-1">{errors.phone}</p>}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all text-sm font-medium disabled:opacity-50 mt-1"
          >
            {isSubmitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                Unlocking...
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5" />
                Unlock All Code
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

// Code Block with Session-Wide Unlock
function CodeBlockContainer({ 
  code, 
  language, 
  filePath,
  isUnlocked,
  onUnlock
}: { 
  code: string; 
  language: string; 
  filePath: string;
  isUnlocked: boolean;
  onUnlock: () => void;
}) {
  return (
    <div className="relative min-h-[400px] sm:min-h-[500px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0a0a0f] border border-white/[0.08]">
      {/* Code Content - Always rendered, blur controlled by isUnlocked */}
      <motion.div
        animate={{
          filter: isUnlocked ? 'blur(0px)' : 'blur(10px)',
          opacity: isUnlocked ? 1 : 0.5,
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 overflow-auto"
      >
        <div className="p-4 sm:p-6">
          <CodeBlock code={code} language={language} filePath={filePath} />
        </div>
      </motion.div>

      {/* Locked Overlay - Shows blurred code through it */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.85) 50%, rgba(10,10,15,0.7) 100%)'
            }}
          >
            <AccessRequestForm onUnlock={onUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlocked Badge */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
            className="absolute top-3 right-3 z-10"
          >
            <div className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center gap-1.5">
              <Check className="w-3 h-3 text-cyan-400" />
              <span className="text-cyan-400 text-[10px] font-medium">Unlocked</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlock Ripple Effect */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-40 h-40 rounded-full border border-cyan-400/30"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(codeSnippets[0].id);
  const [showDescription, setShowDescription] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false); // Session-only, no localStorage
  
  const activeSnippet = codeSnippets.find((s) => s.id === activeTab);
  const activeIndex = codeSnippets.findIndex((s) => s.id === activeTab);

  // Unlock all code blocks (session-wide)
  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const nextTab = () => {
    const nextIndex = (activeIndex + 1) % codeSnippets.length;
    setActiveTab(codeSnippets[nextIndex].id);
  };

  const prevTab = () => {
    const prevIndex = (activeIndex - 1 + codeSnippets.length) % codeSnippets.length;
    setActiveTab(codeSnippets[prevIndex].id);
  };

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase">Implementation</p>
            {!isUnlocked ? (
              <span className="px-2 py-0.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[10px] flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Locked
              </span>
            ) : (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] flex items-center gap-1"
              >
                <Unlock className="w-3 h-3" />
                Session Unlocked
              </motion.span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Key Algorithms</h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Core algorithms powering the Predator system, from regime detection to risk management.
          </p>
        </motion.div>

        {/* Mobile: Horizontal Scrollable Tabs + Navigation */}
        <div className="lg:hidden">
          {/* Tab Strip */}
          <div className="relative mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
              {codeSnippets.map((snippet) => (
                <button
                  key={snippet.id}
                  onClick={() => setActiveTab(snippet.id)}
                  className={`flex-shrink-0 snap-start px-3 py-2 rounded-lg border text-left transition-all min-w-[140px] ${
                    activeTab === snippet.id
                      ? 'bg-cyan-500/10 border-cyan-500/30'
                      : 'bg-white/[0.03] border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeTab === snippet.id ? 'bg-cyan-500/20' : 'bg-white/5'
                    }`}>
                      <FileCode className={`w-4 h-4 ${activeTab === snippet.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <p className={`text-xs font-medium ${activeTab === snippet.id ? 'text-white' : 'text-slate-300'}`}>
                        {snippet.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[100px]">{snippet.filePath}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mb-4 px-1">
            <button
              onClick={prevTab}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex gap-1">
              {codeSnippets.map((snippet) => (
                <button
                  key={snippet.id}
                  onClick={() => setActiveTab(snippet.id)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTab === snippet.id ? 'bg-cyan-400 w-4' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTab}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Description Toggle */}
          <AnimatePresence>
            {showDescription && activeSnippet && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10"
              >
                <p className="text-slate-400 text-xs leading-relaxed">{activeSnippet.description}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Code Block */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeSnippet && (
              <CodeBlockContainer
                code={activeSnippet.code}
                language={activeSnippet.language}
                filePath={activeSnippet.filePath}
                isUnlocked={isUnlocked}
                onUnlock={handleUnlock}
              />
            )}
          </motion.div>
        </div>

        {/* Desktop: Side-by-Side Layout */}
        <div className="hidden lg:grid lg:grid-cols-[320px_1fr] gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            {codeSnippets.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => setActiveTab(snippet.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${
                  activeTab === snippet.id
                    ? 'bg-cyan-500/10 border-cyan-500/30'
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-cyan-500/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    activeTab === snippet.id ? 'bg-cyan-500/20' : 'bg-white/5 group-hover:bg-cyan-500/10'
                  }`}>
                    <FileCode className={`w-5 h-5 transition-colors ${
                      activeTab === snippet.id ? 'text-cyan-400' : 'text-slate-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium mb-1 transition-colors ${
                      activeTab === snippet.id ? 'text-white' : 'text-slate-300'
                    }`}>
                      {snippet.title}
                    </h3>
                    <p className="text-slate-500 text-xs">{snippet.filePath}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {activeTab === snippet.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-slate-400 text-sm mt-3 pt-3 border-t border-white/10"
                    >
                      {snippet.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {activeSnippet && (
                <motion.div
                  key={activeSnippet.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CodeBlockContainer
                    code={activeSnippet.code}
                    language={activeSnippet.language}
                    filePath={activeSnippet.filePath}
                    isUnlocked={isUnlocked}
                    onUnlock={handleUnlock}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default CodeShowcase;
