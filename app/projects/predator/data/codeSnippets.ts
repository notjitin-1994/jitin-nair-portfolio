// Data: Key code snippets for Predator system showcase

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
    id: "regime-detection",
    title: "Gaussian HMM Trainer",
    filePath: "agents/argus/trainer.py",
    language: "python",
    description: "Multivariate Gaussian Hidden Markov Model for regime persistence. Uses BIC (Bayesian Information Criterion) to optimize the number of hidden market states.",
    code: `def find_best_k(self, X: np.ndarray, current_k: Optional[int] = None) -> int:
    """Find optimal K using BIC sweep."""
    k_range = [k for k in [current_k - 1, current_k, current_k + 1] if 3 <= k <= 7] if current_k else [3, 4, 5, 6, 7]
    best_bic, best_k = np.inf, k_range[0]
    
    for k in k_range:
        try:
            model = hmm.GaussianHMM(n_components=k, covariance_type="full", n_iter=100)
            model.fit(X)
            bic = model.bic(X)
            if bic < best_bic:
                best_bic, best_k = bic, k
        except: continue
    return best_k

async def train_cycle(self):
    """Main training loop with session-aware normalization."""
    df = await self.fetch_training_data(30)
    features_df = extract_regime_features(df)
    X_scaled = StandardScaler().fit_transform(features_df.values)
    
    # Model Evolution
    best_k = self.find_best_k(X_scaled)
    model = hmm.GaussianHMM(n_components=best_k, covariance_type="full")
    model.fit(X_scaled)
    
    # Validation & Persistence
    scores = model.score_samples(X_scaled)
    ll_5th = np.percentile(scores, 5)
    
    bundle = RegimeBundle(model=model, ood_threshold=ll_5th, metadata={"k": best_k})
    bundle.save(self.model_path)`
  },
  {
    id: "ingestion-daemon",
    title: "Hermes ProtoBuf Ingestor",
    filePath: "agents/hermes/main.py",
    language: "python",
    description: "High-throughput ProtoBuf stream handler for cTrader OpenAPI. Processes ticks and Depth of Market (LOB) with microsecond precision.",
    code: `async def handle_tick(self, event):
    """Processes real-time ticks from cTrader OpenAPI socket."""
    sid = event.symbolId
    if sid not in self.symbols: return
    
    cache = self.price_cache[sid]
    if event.HasField('bid'): cache["bid"] = event.bid / 100000.0
    if event.HasField('ask'): cache["ask"] = event.ask / 100000.0
    
    if cache["bid"] and cache["ask"]:
        now = datetime.now(timezone.utc)
        symbol = self.symbols[sid]
        spread = cache["ask"] - cache["bid"]
        
        # Publish to inter-agent Redis bus
        await self.redis.publish(f"{symbol.lower()}_ticks", json.dumps({
            "ts": now.isoformat(), 
            "bid": cache["bid"], 
            "ask": cache["ask"]
        }))
        
        # Persistent Time-Series Storage
        if symbol == "XAUUSD":
            async with self.db_pool.acquire() as conn:
                await conn.execute("""
                    INSERT INTO market_ticks (timestamp, symbol, bid, ask, spread) 
                    VALUES ($1, 'XAUUSD', $2, $3, $4)
                """, now, cache["bid"], cache["ask"], spread)`
  },
  {
    id: "bridge-nexus",
    title: "Redis-to-Socket.io Bridge",
    filePath: "nexus/api/src/index.ts",
    language: "typescript",
    description: "The Nexus bridge acts as a real-time conduit, piping internal agent signals from Redis to the frontend dashboard with zero-copy overhead.",
    code: `const redisSub = new Redis({ host: process.env.REDIS_HOST });

redisSub.subscribe('xauusd_ticks', 'predator:regime', 'predator:signals');

redisSub.on('message', async (channel, message) => {
  try {
    const payload = JSON.parse(message);
    
    // Broadcast to dashboard clients
    io.emit(channel, payload);
    
    // Audit Trail Logging
    if (channel === 'predator:system_logs') {
      await pool.query(
        'INSERT INTO system_logs (timestamp, service, level, event, data_json) VALUES ($1, $2, $3, $4, $5)',
        [payload.timestamp, payload.service, payload.level, payload.event, JSON.stringify(payload.data)]
      );
    }
  } catch (e) {
    logger.error({ channel, message }, 'Nexus Bridge: Parse Error');
  }
});`
  },
  {
    id: "risk-forge",
    title: "Institutional Risk Forge",
    filePath: "agents/ares/main.py",
    language: "python",
    description: "Dynamic position sizing with multi-stage circuit breakers and volatility-adjusted Kelly Criterion logic.",
    code: `def calculate_position_size(self, signal: Signal, balance: float) -> float:
    """Volatility-adjusted position sizing with institutional caps."""
    # 1. Base Kelly Fraction
    kelly = (signal.win_rate * signal.payout_ratio - (1 - signal.win_rate)) / signal.payout_ratio
    safe_kelly = min(max(kelly, 0), 0.20)  # Cap at 20% fractional
    
    # 2. Volatility Normalization
    vol_scale = 1.0 / (1 + signal.atr_percent * 5)
    
    # 3. Size Calculation
    risk_amount = balance * self.max_drawdown_limit * safe_kelly * vol_scale
    position_size = risk_amount / signal.stop_loss_pips
    
    # 4. Safety Overrides
    return min(position_size, balance * 0.1) # Max 10% exposure

async def monitor_pnl(self):
    """Real-time circuit breaker monitoring."""
    if self.current_daily_loss > self.daily_stop_threshold:
        await self.emergency_shutdown("Daily Loss Limit Breached")
        self.circuit_breaker_active = True`
  }
];

export default codeSnippets;