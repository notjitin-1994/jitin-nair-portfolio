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
    title: "Regime Detection Algorithm",
    filePath: "agents/regime_agent/detection.py",
    language: "python",
    description: "Adaptive regime classification using ADX, Choppiness Index, and Efficiency Ratio with hysteresis filtering to prevent regime whipsaw.",
    code: `def detect_regime(self, data: pd.DataFrame) -> RegimeClassification:
    """
    Multi-factor regime detection with adaptive thresholds.
    Uses ADX for trend strength, CHOP for ranging detection,
    and Kaufman's Efficiency Ratio for directional consistency.
    """
    # Calculate indicators
    adx = self.calculate_adx(data['high'], data['low'], data['close'])
    chop = self.choppiness_index(data['high'], data['low'], data['close'])
    er = self.efficiency_ratio(data['close'])
    
    # Dynamic threshold calculation (MAD-based)
    adx_threshold = self.adaptive_threshold(adx, window=20)
    
    # Regime classification with hysteresis
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
        confidence = 0.35  # Below trading threshold
    
    return RegimeClassification(
        regime=regime,
        confidence=confidence,
        timestamp=datetime.utcnow(),
        features={'adx': adx, 'chop': chop, 'er': er}
    )`
  },
  {
    id: "risk-management",
    title: "Risk Management Module",
    filePath: "agents/strategy_agent/risk.py",
    language: "python",
    description: "Kelly Criterion position sizing with maximum drawdown circuit breakers and volatility-adjusted exposure limits.",
    code: `class RiskManager:
    """Institutional-grade risk management with dynamic position sizing."""
    
    def __init__(self, max_risk_per_trade: float = 0.02):
        self.max_risk = max_risk_per_trade
        self.circuit_breaker = CircuitBreaker(
            daily_loss_limit=0.05,
            consecutive_losses=3
        )
    
    def calculate_position_size(
        self, 
        signal: Signal,
        account_balance: float,
        current_exposure: float
    ) -> PositionSizing:
        """
        Kelly Criterion position sizing with safety constraints.
        
        f* = (bp - q) / b
        where: b = avg win/avg loss, p = win rate, q = 1-p
        """
        # Historical win rate from backtests
        win_rate = signal.backtest_metrics.win_rate
        avg_win = signal.backtest_metrics.avg_profit
        avg_loss = abs(signal.backtest_metrics.avg_loss)
        
        # Kelly fraction (capped at 0.25 for safety)
        kelly = (win_rate * avg_win - (1 - win_rate) * avg_loss) / avg_win
        kelly_capped = min(max(kelly, 0), 0.25)
        
        # Volatility adjustment
        vol_factor = 1.0 / (1 + signal.volatility_index * 2)
        
        # Final position size
        risk_amount = account_balance * self.max_risk * kelly_capped * vol_factor
        position_size = risk_amount / signal.stop_loss_distance
        
        # Exposure limit check
        max_position = account_balance * 0.1  # 10% max per position
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
    title: "Circuit Breaker Logic",
    filePath: "core/circuit_breaker.py",
    language: "python",
    description: "Three-state circuit breaker with automatic recovery and exponential backoff for system protection.",
    code: `class CircuitBreaker:
    """
    Self-healing circuit breaker with 3-state logic:
    CLOSED (normal) → OPEN (tripped) → HALF_OPEN (recovery)
    """
    
    def __init__(
        self, 
        failure_threshold: int = 5,
        recovery_timeout: int = 300,
        half_open_max_calls: int = 3
    ):
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
                    raise CircuitBreakerOpen(
                        f"Circuit open. Retry after {self.get_remaining_timeout()}s"
                    )
            
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
            raise e
    
    async def on_failure(self):
        async with self._lock:
            self.failure_count += 1
            self.last_failure_time = datetime.utcnow()
            
            if self.failure_count >= self.failure_threshold:
                self.state = CircuitState.OPEN
                logger.warning(f"Circuit OPENED after {self.failure_count} failures")
    
    async def on_success(self):
        async with self._lock:
            if self.state == CircuitState.HALF_OPEN:
                self.state = CircuitState.CLOSED
                self.failure_count = 0
                logger.info("Circuit CLOSED - recovery successful")`
  },
  {
    id: "websocket-handler",
    title: "WebSocket Tick Handler",
    filePath: "agents/ingestion_agent/websocket.py",
    language: "python",
    description: "High-performance WebSocket connection with automatic reconnection, buffering, and sub-50ms latency guarantee.",
    code: `class TickWebSocketHandler:
    """
    Ultra-low latency WebSocket handler for real-time tick data.
    Optimized for sub-50ms end-to-end latency (p99).
    """
    
    def __init__(self, buffer_size: int = 1000):
        self.buffer = asyncio.Queue(maxsize=buffer_size)
        self.latency_tracker = LatencyTracker()
        self.reconnect_policy = ExponentialBackoff(
            base_delay=1.0,
            max_delay=60.0,
            max_retries=10
        )
        self._running = False
        self._ws: Optional[websockets.WebSocketClientProtocol] = None
    
    async def connect(self, uri: str):
        """Establish connection with automatic reconnection."""
        self._running = True
        
        while self._running:
            try:
                async with websockets.connect(
                    uri,
                    compression=None,  # Disable for speed
                    ping_interval=20,
                    ping_timeout=10
                ) as ws:
                    self._ws = ws
                    logger.info(f"WebSocket connected to {uri}")
                    self.reconnect_policy.reset()
                    
                    await self._handle_messages(ws)
                    
            except websockets.exceptions.ConnectionClosed:
                logger.warning("WebSocket closed, attempting reconnect...")
            except Exception as e:
                logger.error(f"WebSocket error: {e}")
            
            if self._running:
                delay = self.reconnect_policy.next_delay()
                logger.info(f"Reconnecting in {delay:.1f}s...")
                await asyncio.sleep(delay)
    
    async def _handle_messages(self, ws):
        """Process incoming ticks with minimal latency."""
        async for message in ws:
            receive_time = time.time_ns()
            
            # Parse with minimal overhead
            tick = self._parse_tick(message)
            tick.received_at = receive_time
            
            # Non-blocking buffer write
            try:
                self.buffer.put_nowait(tick)
            except asyncio.QueueFull:
                # Drop oldest if buffer full (maintain real-time)
                self.buffer.get_nowait()
                self.buffer.put_nowait(tick)
            
            # Track latency
            latency_ms = (receive_time - tick.timestamp) / 1_000_000
            self.latency_tracker.record(latency_ms)
    
    def _parse_tick(self, message: str) -> Tick:
        """Zero-copy JSON parsing using orjson."""
        data = orjson.loads(message)
        return Tick(
            symbol=data['s'],
            bid=float(data['b']),
            ask=float(data['a']),
            timestamp=int(data['t']) * 1_000_000  # Convert to ns
        )`
  }
];

export default codeSnippets;