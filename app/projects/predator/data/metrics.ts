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
    value: 10,
    unit: "ms",
    description: "Signal to execution p99 across cTrader socket",
    trend: "up",
    trendValue: "5x faster",
    category: "performance",
    sparklineData: [47, 35, 22, 15, 12, 11, 10, 10, 9, 10]
  },
  {
    id: "accuracy",
    label: "Regime Detection",
    value: 90,
    unit: "%",
    description: "Bayesian confluence accuracy on M1/M5 data",
    trend: "up",
    trendValue: "+2%",
    category: "accuracy",
    sparklineData: [82, 83, 84, 85, 85, 86, 87, 88, 89, 90]
  },
  {
    id: "uptime",
    label: "System Uptime",
    value: 99.9,
    unit: "%",
    description: "24/7 continuous autonomous operation",
    trend: "stable",
    trendValue: "30d",
    category: "system",
    sparklineData: [99.8, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9]
  },
  {
    id: "data-volume",
    label: "Data Throughput",
    value: 5000,
    unit: "tps",
    suffix: "+",
    description: "Real-time tick and depth messages processed",
    trend: "up",
    trendValue: "+2k/s",
    category: "data",
    sparklineData: [1200, 1500, 2200, 2800, 3500, 4200, 4800, 5000, 5100, 5200]
  },
  {
    id: "agents",
    label: "Active Agents",
    value: 7,
    unit: "agents",
    description: "Bayesian Pantheon + Sentinels in production",
    trend: "up",
    trendValue: "Nexus v4",
    category: "system",
    sparklineData: [5, 5, 5, 6, 6, 7, 7, 7, 7, 7]
  },
  {
    id: "signals",
    label: "Signals Evaluated",
    value: 4500,
    unit: "/day",
    description: "Multi-timeframe directives generated",
    trend: "up",
    trendValue: "+3k",
    category: "data",
    sparklineData: [1250, 1400, 1800, 2200, 2800, 3200, 3800, 4200, 4400, 4500]
  },
  {
    id: "inference-speed",
    label: "Inference Speed",
    value: 8,
    unit: "ms",
    description: "Average Bayesian posterior calculation time",
    trend: "down",
    trendValue: "-4ms",
    category: "performance",
    sparklineData: [12, 11, 10, 10, 9, 9, 8, 8, 8, 8]
  },
  {
    id: "win-rate",
    label: "Strategy Win Rate",
    value: 70.2,
    unit: "%",
    description: "Validated performance on institutional data",
    trend: "up",
    trendValue: "+7.7%",
    category: "accuracy",
    sparklineData: [62.5, 63.2, 64.1, 65.5, 66.2, 67.8, 68.5, 69.2, 69.8, 70.2]
  }
];

export const processSteps = [
  {
    id: "hermes",
    title: "Hermes: Data Conduit",
    subtitle: "High-Frequency Ingestion",
    description: "Direct cTrader OpenAPI socket integration processing Ticks and Depth of Market (LOB) data into TimescaleDB.",
    details: [
      "Sub-ms ingestion latency",
      "Order Flow Imbalance (OFI) extraction",
      "Multithreaded DatabaseWorker pool",
      "Absolute Time Anchor synchronization"
    ]
  },
  {
    id: "argus",
    title: "Argus: Regime Observer",
    subtitle: "Bayesian Confluence",
    description: "Processes 1200+ bars of M1 data via M1-Bridge. Fuses Price Action, ML Random Forest, and HMM into a unified signal.",
    details: [
      "Custom M1-Bridge resampling",
      "68-feature Random Forest matrix",
      "Gaussian HMM persistence logic",
      "Weighted Bayesian scoring (60/30/10)"
    ]
  },
  {
    id: "athena",
    title: "Athena: Strategy Matrix",
    subtitle: "Dynamic Orchestration",
    description: "Manages a 16-node Strategy Matrix, dynamically routing to optimal strategies based on real-time Bayesian regimes.",
    details: [
      "Context-aware strategy routing",
      "EMA Pullback & Volatility Breakout",
      "Mean Reversion node activation",
      "Institutional-grade rationale generation"
    ]
  },
  {
    id: "apollo",
    title: "Apollo: Sentinel Oracle",
    subtitle: "Probabilistic Signals",
    description: "Fuses Macro (DXY), Microstructure (OFI), and Sentiment into a unified Bayesian posterior probability.",
    details: [
      "Bayesian posterior inference",
      "Cross-asset correlation analysis",
      "Natural language reasoning",
      "Contextual ENTER/WAIT/EXIT directives"
    ]
  }
];

export const architectureSteps = [
  {
    id: "ingestion",
    title: "Ingestion Layer",
    description: "Hermes daemon maintaining high-frequency TCP connections to cTrader endpoints with zero-drift time synchronization."
  },
  {
    id: "storage",
    title: "Persistence Layer",
    description: "TimescaleDB acting as the Single Source of Truth, optimized for ultra-fast time-series queries and compression."
  },
  {
    id: "intelligence",
    title: "Bayesian Pantheon",
    description: "Argus, Athena, and Apollo agents orchestrating the decision loop from regime detection to probabilistic signal generation."
  },
  {
    id: "interface",
    title: "Nexus Pulse",
    description: "Next.js dashboard with real-time WebSocket synchronization, providing visual transparency into agent beliefs and actions."
  }
];

export default { metrics, processSteps, architectureSteps };
