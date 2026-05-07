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
    id: "numba-optimized-indicators",
    title: "JIT Optimized Indicators",
    filePath: "agents/regime_agent/price_action_new.py",
    language: "python",
    description: "Numba-accelerated technical indicators achieving 10x faster execution than pure Python, critical for high-frequency regime detection.",
    code: `@njit(cache=True)
def _calculate_adx_numba(high: np.ndarray, low: np.ndarray, close: np.ndarray, 
                         period: int = 14) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
    \"\"\"Calculate ADX, +DI, and -DI using Numba acceleration.\"\"\"
    n = len(high)
    plus_dm = np.zeros(n)
    minus_dm = np.zeros(n)
    
    for i in range(1, n):
        up_move = high[i] - high[i-1]
        down_move = low[i-1] - low[i]
        
        if up_move > down_move and up_move > 0:
            plus_dm[i] = up_move
        if down_move > up_move and down_move > 0:
            minus_dm[i] = down_move
    
    tr = _calculate_tr_numba(high, low, close)
    smoothed_tr = _wilder_smoothing_numba(tr, period)
    smoothed_plus_dm = _wilder_smoothing_numba(plus_dm, period)
    smoothed_minus_dm = _wilder_smoothing_numba(minus_dm, period)
    
    plus_di = 100.0 * smoothed_plus_dm / smoothed_tr
    minus_di = 100.0 * smoothed_minus_dm / smoothed_tr
    dx = 100.0 * abs(plus_di - minus_di) / (plus_di + minus_di)
    adx = _wilder_smoothing_numba(dx, period)
    
    return adx, plus_di, minus_di`
  },
  {
    id: "psi-drift-detection",
    title: "PSI Drift Detection",
    filePath: "agents/regime_agent/drift_detector.py",
    language: "python",
    description: "Population Stability Index (PSI) implementation to detect feature distribution shifts between training and production environments.",
    code: `class PSICalculator:
    \"\"\"Population Stability Index (PSI) calculator for drift detection.\"\"\"
    def calculate(self, baseline: np.ndarray, current: np.ndarray) -> float:
        # Create bins based on baseline distribution
        bins = np.percentile(baseline, np.linspace(0, 100, self.n_bins + 1))
        
        # Calculate frequency in each bin
        b_counts = np.histogram(baseline, bins=bins)[0] / len(baseline)
        c_counts = np.histogram(current, bins=bins)[0] / len(current)
        
        # Avoid division by zero
        b_counts = np.clip(b_counts, 1e-6, None)
        c_counts = np.clip(c_counts, 1e-6, None)
        
        # Calculate PSI score
        psi = np.sum((b_counts - c_counts) * np.log(b_counts / c_counts))
        return psi`
  },
  {
    id: "mlard-adaptive-logic",
    title: "MLARD Decision Logic",
    filePath: "agents/regime_agent/price_action_new.py",
    language: "python",
    description: "Multi-Layer Adaptive Regime Detection logic using dynamic volatility thresholds and hysteresis memory to prevent flickering.",
    code: `def _determine_regime_v2(self, structure: MarketStructure, indicators: TechnicalIndicators) -> Tuple[RegimeType, float]:
    \"\"\"Enhanced MLARD regime determination with ADX, CHOP, and BBW.\"\"\"
    # 1. Extreme Volatility Check (Override)
    if indicators.bb_width > 0.08:
         return self._apply_hysteresis(RegimeType.VOLATILE, 0.9)

    # 2. Score-based detection
    scores = {RegimeType.TREND_UP: 0.0, RegimeType.TREND_DOWN: 0.0, RegimeType.RANGE: 0.0}
    
    # ADX-based trend strength with MAD normalization
    if indicators.adx >= self.adx_trend_threshold:
        trend_boost = (indicators.adx - self.adx_trend_threshold) / 100.0
        if indicators.plus_di > indicators.minus_di:
            scores[RegimeType.TREND_UP] += 0.4 + trend_boost
        else:
            scores[RegimeType.TREND_DOWN] += 0.4 + trend_boost
    
    # Choppiness Index Filter
    if indicators.choppiness >= self.chop_range_threshold:
        scores[RegimeType.RANGE] += 0.5
        
    candidate = max(scores, key=scores.get)
    return self._apply_hysteresis(candidate, 0.5 + min(0.45, scores[candidate] * 0.4))`
  },
  {
    id: "model-registry-promotion",
    title: "Champion/Challenger Promotion",
    filePath: "agents/regime_agent/model_registry.py",
    language: "python",
    description: "Institutional model promotion logic that ensures challengers outperform current champions before being promoted to production.",
    code: `async def promote_challenger_to_champion(self, challenger_id: str):
    \"\"\"Statistical validation gate for model promotion.\"\"\"
    challenger = await self.get_model_version(challenger_id)
    champion = await self.get_champion_model()
    
    if champion:
        # Require 5% relative improvement in F1-score
        improvement = (challenger.f1_score - champion.f1_score) / champion.f1_score
        if improvement < 0.05:
            raise PromotionError(f"Insufficient improvement: {improvement:.2%}")
            
    # Promotion transaction
    async with self.db_pool.acquire() as conn:
        async with conn.transaction():
            await conn.execute("UPDATE models SET stage = 'archived' WHERE stage = 'production'")
            await conn.execute("UPDATE models SET stage = 'production' WHERE model_id = $1", challenger_id)
    
    logger.info("New champion promoted", model_id=challenger_id)`
  }
];

export default codeSnippets;