'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, ChevronLeft, ChevronRight, Lock, Unlock, Mail, Phone, ArrowRight, Check } from 'lucide-react';
import CodeBlock from './ui/CodeBlock';

const codeSnippets = [
  {
    id: "regime-detection",
    title: "Regime Detection",
    filePath: "agents/regime_agent/detection.py",
    language: "python",
    description: "Adaptive regime classification using ADX, Choppiness Index, and Efficiency Ratio with hysteresis filtering.",
    code: `def detect_regime(self, data: pd.DataFrame) -> RegimeClassification:
    adx = self.calculate_adx(data['high'], data['low'], data['close'])
    chop = self.choppiness_index(data['high'], data['low'], data['close'])
    er = self.efficiency_ratio(data['close'])
    
    adx_threshold = self.adaptive_threshold(adx, window=20)
    
    if adx > adx_threshold and er > 0.6:
        regime = Regime.TRENDING
        confidence = min(adx / 50, 1.0) * er
    elif chop > 60 and adx < adx_threshold * 0.7:
        regime = Regime.RANGING
        confidence = (chop / 100) * (1 - adx / adx_threshold)
    elif self.atr_percent(data) > 1.5:
        regime = Regime.VOLATILE
        confidence = min(self.atr_percent(data) / 3.0, 1.0)
    else:
        regime = Regime.UNCERTAIN
        confidence = 0.35
    
    return RegimeClassification(
        regime=regime,
        confidence=confidence,
        timestamp=datetime.utcnow(),
        features={'adx': adx, 'chop': chop, 'er': er}
    )`
  },
  {
    id: "risk-management",
    title: "Risk Management",
    filePath: "agents/strategy_agent/risk.py",
    language: "python",
    description: "Kelly Criterion position sizing with maximum drawdown circuit breakers and volatility-adjusted exposure limits.",
    code: `class RiskManager:
    def __init__(self, max_risk_per_trade: float = 0.02):
        self.max_risk = max_risk_per_trade
        self.circuit_breaker = CircuitBreaker(
            daily_loss_limit=0.05,
            consecutive_losses=3
        )
    
    def calculate_position_size(self, signal: Signal, account_balance: float, current_exposure: float) -> PositionSizing:
        win_rate = signal.backtest_metrics.win_rate
        avg_win = signal.backtest_metrics.avg_profit
        avg_loss = abs(signal.backtest_metrics.avg_loss)
        
        kelly = (win_rate * avg_win - (1 - win_rate) * avg_loss) / avg_win
        kelly_capped = min(max(kelly, 0), 0.25)
        
        vol_factor = 1.0 / (1 + signal.volatility_index * 2)
        
        risk_amount = account_balance * self.max_risk * kelly_capped * vol_factor
        position_size = risk_amount / signal.stop_loss_distance
        
        max_position = account_balance * 0.1
        position_size = min(position_size, max_position)
        
        return PositionSizing(
            size=position_size,
            risk_pct=risk_amount / account_balance,
            kelly_fraction=kelly_capped,
            confidence=signal.confidence
        )`
  },
  {
    id: "circuit-breaker",
    title: "Circuit Breaker",
    filePath: "core/circuit_breaker.py",
    language: "python",
    description: "Three-state circuit breaker with automatic recovery and exponential backoff for system protection.",
    code: `class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5, recovery_timeout: int = 300, half_open_max_calls: int = 3):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.half_open_max_calls = half_open_max_calls
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.last_failure_time: Optional[datetime] = None
        self.half_open_calls = 0
        self._lock = asyncio.Lock()
    
    async def call(self, func: Callable, *args, **kwargs):
        async with self._lock:
            if self.state == CircuitState.OPEN:
                if self.should_attempt_reset():
                    self.state = CircuitState.HALF_OPEN
                    self.half_open_calls = 0
                else:
                    raise CircuitBreakerOpen(f"Circuit open. Retry after {self.get_remaining_timeout()}s")
            
            if self.state == CircuitState.HALF_OPEN:
                if self.half_open_calls >= self.half_open_max_calls:
                    raise CircuitBreakerOpen("Half-open limit reached")
                self.half_open_calls += 1
        
        try:
            result = await func(*args, **kwargs)
            await self.on_success()
            return result
        except Exception as e:
            await self.on_failure()
            raise e`
  },
  {
    id: "websocket-handler",
    title: "WebSocket Handler",
    filePath: "agents/ingestion_agent/websocket.py",
    language: "python",
    description: "High-performance WebSocket connection with automatic reconnection, buffering, and sub-50ms latency guarantee.",
    code: `class TickWebSocketHandler:
    def __init__(self, buffer_size: int = 1000):
        self.buffer = asyncio.Queue(maxsize=buffer_size)
        self.latency_tracker = LatencyTracker()
        self.reconnect_policy = ExponentialBackoff(base_delay=1.0, max_delay=60.0, max_retries=10)
        self._running = False
        self._ws: Optional[websockets.WebSocketClientProtocol] = None
    
    async def connect(self, uri: str):
        self._running = True
        while self._running:
            try:
                async with websockets.connect(uri, compression=None, ping_interval=20, ping_timeout=10) as ws:
                    self._ws = ws
                    self.reconnect_policy.reset()
                    await self._handle_messages(ws)
            except websockets.exceptions.ConnectionClosed:
                pass
            except Exception as e:
                logger.error(f"WebSocket error: {e}")
            
            if self._running:
                delay = self.reconnect_policy.next_delay()
                await asyncio.sleep(delay)
    
    async def _handle_messages(self, ws):
        async for message in ws:
            receive_time = time.time_ns()
            tick = self._parse_tick(message)
            tick.received_at = receive_time
            try:
                self.buffer.put_nowait(tick)
            except asyncio.QueueFull:
                self.buffer.get_nowait()
                self.buffer.put_nowait(tick)
            latency_ms = (receive_time - tick.timestamp) / 1_000_000
            self.latency_tracker.record(latency_ms)`
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
