// Data: Metrics and performance indicators

export interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  prefix?: string;
  suffix?: string;
  description: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  category: 'performance' | 'accuracy' | 'system' | 'data';
  sparklineData?: number[];
}

export const metrics: Metric[] = [
  {
    id: "latency",
    label: "Execution Latency",
    value: 47,
    unit: "ms",
    description: "End-to-end signal to execution (p99)",
    trend: "stable",
    trendValue: "p99",
    category: "performance",
    sparklineData: [52, 48, 51, 47, 46, 48, 47, 45, 47, 48]
  },
  {
    id: "accuracy",
    label: "Regime Detection",
    value: 88,
    unit: "%",
    description: "Classification accuracy on out-of-sample data",
    trend: "up",
    trendValue: "+2.3%",
    category: "accuracy",
    sparklineData: [82, 83, 84, 85, 85, 86, 87, 87, 88, 88]
  },
  {
    id: "uptime",
    label: "System Uptime",
    value: 99.9,
    unit: "%",
    description: "24/7 continuous operation since deployment",
    trend: "stable",
    trendValue: "30d",
    category: "system",
    sparklineData: [99.8, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9]
  },
  {
    id: "data-volume",
    label: "Data Processed",
    value: 222,
    unit: "MB",
    suffix: "+",
    description: "Tick data ingested and analyzed",
    trend: "up",
    trendValue: "+12MB/day",
    category: "data",
    sparklineData: [180, 190, 195, 200, 205, 210, 215, 218, 220, 222]
  },
  {
    id: "agents",
    label: "Active Agents",
    value: 5,
    unit: "agents",
    description: "Specialized agents in production",
    trend: "stable",
    category: "system",
    sparklineData: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
  },
  {
    id: "signals",
    label: "Signals Generated",
    value: 1250,
    unit: "/day",
    description: "Daily trading signals evaluated",
    trend: "up",
    trendValue: "+5%",
    category: "data",
    sparklineData: [1100, 1120, 1150, 1160, 1180, 1190, 1210, 1220, 1240, 1250]
  },
  {
    id: "response-time",
    label: "API Response",
    value: 12,
    unit: "ms",
    description: "Dashboard API average response time",
    trend: "down",
    trendValue: "-15%",
    category: "performance",
    sparklineData: [15, 15, 14, 14, 13, 13, 13, 12, 12, 12]
  },
  {
    id: "win-rate",
    label: "Strategy Win Rate",
    value: 62.5,
    unit: "%",
    description: "Backtested win rate on 6 months data",
    trend: "up",
    trendValue: "+1.2%",
    category: "accuracy",
    sparklineData: [58, 59, 59, 60, 60, 61, 61, 62, 62, 62.5]
  }
];

// Process flow steps
export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const processSteps: ProcessStep[] = [
  {
    id: "ingestion",
    number: 1,
    title: "Tick Data Ingestion",
    description: "Real-time WebSocket connection to OANDA API for XAU/USD tick data",
    icon: "Zap",
    details: [
      "Sub-10ms data ingestion latency",
      "Automatic reconnection with exponential backoff",
      "Buffer management for high-volatility periods",
      "Zero-copy message parsing with orjson"
    ],
    metrics: [
      { label: "Messages/sec", value: "~150" },
      { label: "Parse Time", value: "<1ms" }
    ]
  },
  {
    id: "classification",
    number: 2,
    title: "Regime Classification",
    description: "Multi-factor analysis to determine market regime",
    icon: "Brain",
    details: [
      "ADX calculation for trend strength",
      "Choppiness Index for ranging detection",
      "Kaufman's Efficiency Ratio validation",
      "MAD-based adaptive thresholds"
    ],
    metrics: [
      { label: "Update Freq", value: "M5/M15/H1" },
      { label: "Accuracy", value: "88%" }
    ]
  },
  {
    id: "strategy",
    number: 3,
    title: "Strategy Selection",
    description: "Dynamic strategy routing based on detected regime",
    icon: "Target",
    details: [
      "Trend Following: ADX > 25, ER > 0.6",
      "Mean Reversion: CHOP > 60, range-bound",
      "Volatility Expansion: ATR% > 1.5%",
      "NO_TRADE: Confidence < 60%"
    ],
    metrics: [
      { label: "Strategies", value: "3 Active" },
      { label: "Fallback", value: "NO_TRADE" }
    ]
  },
  {
    id: "sizing",
    number: 4,
    title: "Position Sizing",
    description: "Kelly Criterion with volatility adjustment",
    icon: "Scale",
    details: [
      "Kelly fraction capped at 25% for safety",
      "Volatility-based exposure reduction",
      "Maximum 10% per position limit",
      "Account balance integration"
    ],
    metrics: [
      { label: "Max Risk", value: "2%" },
      { label: "Kelly Cap", value: "25%" }
    ]
  },
  {
    id: "execution",
    number: 5,
    title: "Order Execution",
    description: "CCXT integration with slippage protection",
    icon: "Rocket",
    details: [
      "Sub-50ms execution latency (p99)",
      "Smart order routing",
      "Slippage monitoring and alerts",
      "Partial fill handling"
    ],
    metrics: [
      { label: "Latency", value: "<50ms" },
      { label: "Success Rate", value: "99.7%" }
    ]
  },
  {
    id: "monitoring",
    number: 6,
    title: "Drift Monitoring",
    description: "Continuous model performance tracking",
    icon: "Activity",
    details: [
      "PSI (Population Stability Index) tracking",
      "ADWIN for concept drift detection",
      "Kolmogorov-Smirnov test on features",
      "Automatic retraining triggers"
    ],
    metrics: [
      { label: "Check Freq", value: "Hourly" },
      { label: "Trigger", value: "PSI > 0.25" }
    ]
  }
];

// Technology categories
export interface TechCategory {
  id: string;
  name: string;
  color: string;
  technologies: {
    name: string;
    description: string;
    purpose: string;
  }[];
}

export const techCategories: TechCategory[] = [
  {
    id: "core",
    name: "Core Engine",
    color: "#22d3ee",
    technologies: [
      {
        name: "Python 3.13",
        description: "Latest Python with improved performance",
        purpose: "Primary language for all agents"
      },
      {
        name: "Numba",
        description: "JIT compilation to machine code",
        purpose: "10x speedup on indicator calculations"
      },
      {
        name: "Polars",
        description: "Rust-powered DataFrame library",
        purpose: "High-performance data manipulation"
      },
      {
        name: "Pandas",
        description: "Industry-standard data analysis",
        purpose: "Time-series operations"
      }
    ]
  },
  {
    id: "agents",
    name: "Multi-Agent",
    color: "#a78bfa",
    technologies: [
      {
        name: "LangGraph",
        description: "Stateful agent workflow orchestration",
        purpose: "Agent coordination and state management"
      },
      {
        name: "5 Specialized Agents",
        description: "Ingestion, Regime, Strategy, Risk, Execution",
        purpose: "Modular, replaceable components"
      },
      {
        name: "Redis Streams",
        description: "Real-time event bus",
        purpose: "Inter-agent communication"
      },
      {
        name: "Asyncio",
        description: "Concurrent I/O operations",
        purpose: "Non-blocking agent execution"
      }
    ]
  },
  {
    id: "data",
    name: "Data Layer",
    color: "#f472b6",
    technologies: [
      {
        name: "TimescaleDB",
        description: "PostgreSQL extension for time-series",
        purpose: "Tick data storage with compression"
      },
      {
        name: "Redis",
        description: "In-memory data structure store",
        purpose: "Caching and pub/sub messaging"
      },
      {
        name: "PostgreSQL",
        description: "Relational database",
        purpose: "Configuration and metadata"
      },
      {
        name: "WebSocket",
        description: "Real-time bidirectional communication",
        purpose: "Live data feeds"
      }
    ]
  },
  {
    id: "ml",
    name: "ML/Ops",
    color: "#22c55e",
    technologies: [
      {
        name: "ADWIN",
        description: "Adaptive Windowing algorithm",
        purpose: "Concept drift detection"
      },
      {
        name: "PSI",
        description: "Population Stability Index",
        purpose: "Distribution shift monitoring"
      },
      {
        name: "Model Registry",
        description: "Champion/Challancer pattern",
        purpose: "A/B testing and versioning"
      },
      {
        name: "scikit-learn",
        description: "ML library",
        purpose: "Feature engineering and preprocessing"
      }
    ]
  }
];

export default { metrics, processSteps, techCategories };