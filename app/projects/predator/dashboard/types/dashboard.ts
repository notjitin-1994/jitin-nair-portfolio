export interface PriceData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface CurrentPrice {
  symbol: string;
  price: number;
  timestamp: string;
  source: string;
  change?: number;
  changePercent?: number;
}

export interface MacroData {
  symbol: string;
  price: number;
  timestamp: string;
  change24h?: number;
}

export interface AgentStatus {
  name: string;
  status: 'running' | 'stopped' | 'failed' | 'active' | 'inactive' | 'degraded';
  pid?: number;
  uptime?: string;
  lastSeen?: string;
  cpu?: number;
  memory?: number;
  barsToday?: number;
  lastRegime?: string;
  lastSignal?: string;
  lastRun?: string;
  isActive?: boolean;
  strategy?: string;
  confidence?: number;
  indicators?: Record<string, any>;
}

export interface RegimeData {
  regime: string;
  confidence: number;
  timestamp: string;
  volatility?: number;
  trendStrength?: number;
  hmm_confidence?: number;
  changePointProb?: number;
  runLength?: number;
  features?: {
    volatility?: number;
    trend?: number;
    volume?: number;
    trendStrength?: number;
    barsProcessed?: number;
    m5?: { regime: string; confidence: number };
    m15?: { regime: string; confidence: number };
    h1?: { regime: string; confidence: number };
  };
}

export interface ApiHealth {
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
  uptime?: number;
  version?: string;
}

export interface SentinelData {
  signal: 'LONG' | 'SHORT' | 'HOLD' | 'EXIT_LONG' | 'EXIT_SHORT' | 'WAIT' | 'None' | string;
  confidence: number;
  regime: string;
  logic?: string;
  macro?: any;
  macroAlignment?: boolean;
  dxyChange?: number;
  eurUsdChange?: number;
  usdJpyChange?: number;
  ofi?: number;
  sentiment?: number;
  bayesianProb?: number;
  timestamp: string;
  indicators?: Record<string, any>;
  data_used?: {
    dxy_change?: number;
    ofi?: number;
    sentiment?: number;
    bayesian_prob?: number;
    macro_alignment?: number;
    [key: string]: any;
  };
}

export interface Position {
  id: string;
  symbol?: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  size?: number;
  position_size?: number;
  pnl: number;
  pnlPercent?: number;
  sl: number;
  tp: number;
  progress?: number;
  strategy?: string;
  regime?: string;
  openedAt?: string;
  entry_time?: string;
}

export interface Trade {
  id: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercent?: number;
  closeReason: 'TP' | 'SL' | 'MANUAL' | string;
  duration: string;
  closedAt: string;
  strategy?: string;
}

export interface ExecutionMetrics {
  mode: 'paper' | 'live';
  balance: number;
  peakBalance?: number;
  dailyPnl: number;
  dailyPnlPercent?: number;
  winRate: number;
  totalTrades?: number;
  openPositions: number;
  dailyLossUsed: number;
  dailyLossLimit: number;
  drawdown: number;
  maxDrawdown: number;
  riskStatus: 'CLEAR' | 'CAUTION' | 'BLOCKED';
  cooldown: string | null;
}

export interface StrategyState {
  current?: {
    strategy_id: string;
    regime: string;
    confidence_score: number;
    parameters?: Record<string, any>;
    selection_reason?: string;
  };
  candidates?: any[];
}

export interface MarketNews {
  timestamp: string;
  headline: string;
  source: string;
  url?: string;
  summary?: string;
  category?: string;
  sentiment_score?: number;
}

export interface DashboardData {
  price: CurrentPrice | null;
  macro: {
    EURUSD?: MacroData;
    USDJPY?: MacroData;
  };
  agents: AgentStatus[];
  regime: RegimeData | null;
  signal: SentinelData | null;
  positions: Position[];
  trades: Trade[];
  execution: ExecutionMetrics | null;
  strategy: StrategyState | null;
  news: MarketNews[];
  health: ApiHealth | null;
}

export interface PulseUpdate {
  type: 'PULSE_UPDATE';
  data: {
    price: CurrentPrice;
    macro: {
      EURUSD: MacroData;
      USDJPY: MacroData;
    };
    regime: RegimeData;
    signal: SentinelData;
    news: MarketNews[];
    agents: AgentStatus[];
  };
  timestamp: string;
}
