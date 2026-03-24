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
  change?: number;
  changePercent?: number;
}

export interface AgentStatus {
  name: string;
  status: 'running' | 'stopped' | 'failed' | 'active' | 'inactive';
  pid?: number;
  uptime?: string;
  lastSeen?: string;
  cpu?: number;
  memory?: number;
}

export interface RegimeData {
  regime: string;
  confidence: number;
  timestamp: string;
  features?: {
    volatility?: number;
    trend?: number;
    volume?: number;
  };
}

export interface ApiHealth {
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
  uptime?: number;
  version?: string;
}

export interface DashboardData {
  price: CurrentPrice | null;
  priceHistory: PriceData[];
  agents: AgentStatus[];
  regime: RegimeData | null;
  health: ApiHealth | null;
}
