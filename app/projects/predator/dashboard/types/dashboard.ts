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
  macro?: any;
  timestamp: string;
  indicators?: Record<string, any>;
}

export interface ExecutionMetrics {
  mode: 'paper' | 'live';
  balance: number;
  peakBalance?: number;
  dailyPnl: number;
  winRate: number;
  openPositions: number;
  dailyLossUsed: number;
  dailyLossLimit: number;
  drawdown: number;
  maxDrawdown: number;
  riskStatus: 'CLEAR' | 'CAUTION' | 'BLOCKED';
  cooldown: string | null;
}

export interface DashboardData {
  price: CurrentPrice | null;
  macro: {
    EURUSD?: MacroData;
    USDJPY?: MacroData;
  };
  agents: AgentStatus[];
  regime: RegimeData | null;
  sentinel: SentinelData | null;
  execution: ExecutionMetrics | null;
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
  };
  timestamp: string;
}
