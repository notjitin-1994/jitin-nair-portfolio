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
  category: 'performance' | 'accuracy' | 'integrity' | 'data';
  sparklineData?: number[];
}

export const metrics: Metric[] = [
  {
    id: "latency",
    label: "Ares Latency",
    value: 8.4,
    unit: "ms",
    description: "Signal to execution p99 across cTrader socket (v2 Optimized)",
    trend: "up",
    trendValue: "5x faster",
    category: "performance",
    sparklineData: [47, 35, 22, 15, 12, 11, 10, 10, 9, 8.4]
  },
  {
    id: "accuracy",
    label: "Regime Detection",
    value: 91.2,
    unit: "%",
    description: "MLARD (Multi-Layer Adaptive Regime Detection) accuracy",
    trend: "up",
    trendValue: "+35%",
    category: "accuracy",
    sparklineData: [54.6, 62, 70, 78, 82, 85, 88, 90, 91, 91.2]
  },
  {
    id: "false-switches",
    label: "False Switches",
    value: 12.5,
    unit: "%",
    description: "Reduction in regime flickering via Hysteresis memory",
    trend: "down",
    trendValue: "-60%",
    category: "integrity",
    sparklineData: [45, 40, 32, 28, 22, 18, 16, 14, 13, 12.5]
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
    id: "model-drift",
    label: "Drift Sensitivity",
    value: 0.1,
    unit: "PSI",
    description: "Continuous monitoring using Population Stability Index",
    trend: "stable",
    trendValue: "Active",
    category: "integrity",
    sparklineData: [0.08, 0.09, 0.1, 0.1, 0.11, 0.09, 0.1, 0.1, 0.1, 0.1]
  },
  {
    id: "calculations",
    label: "Compute Speed",
    value: 10,
    unit: "x",
    description: "Vectorized Numba JIT compiled indicator engine",
    trend: "up",
    trendValue: "Linear",
    category: "performance",
    sparklineData: [1, 2, 4, 6, 8, 9, 10, 10, 10, 10]
  },
  {
    id: "inference-speed",
    label: "Inference Speed",
    value: 6.2,
    unit: "ms",
    description: "Average MLARD decision loop latency",
    trend: "down",
    trendValue: "-4ms",
    category: "performance",
    sparklineData: [12, 11, 10, 10, 9, 8, 7.5, 7, 6.5, 6.2]
  },
  {
    id: "coverage",
    label: "Regime Coverage",
    value: 80,
    unit: "%",
    description: "Percentage of market states successfully classified",
    trend: "up",
    trendValue: "+33%",
    category: "accuracy",
    sparklineData: [60, 62, 65, 68, 72, 75, 78, 80, 80, 80]
  }
];

export const processSteps = [
  {
    id: "ingestion",
    title: "Hermes: High-Freq Ingestion",
    subtitle: "The Data Conduit",
    description: "Direct cTrader OpenAPI socket integration processing Ticks and Depth of Market (LOB) data into TimescaleDB.",
    details: [
      "Sub-ms ingestion latency",
      "Order Flow Imbalance (OFI) extraction",
      "TCP Absolute Anchor synchronization",
      "TimescaleDB hypertable persistence"
    ]
  },
  {
    id: "detection",
    title: "Argus: MLARD Detection",
    subtitle: "Multi-Layer Adaptive Detection",
    description: "Processes M5 data via adaptive thresholds with MAD normalization. Fuses technical indicators and ML classifiers.",
    details: [
      "Adaptive ADX + BBW thresholds",
      "Choppiness Index noise filtering",
      "Kaufman Efficiency Ratio validation",
      "MAD (Median Absolute Deviation) scaling"
    ]
  },
  {
    id: "orchestration",
    title: "Athena: Strategy Matrix",
    subtitle: "Dynamic DAG Logic",
    description: "A LangGraph-managed state machine dynamically routing signals to optimal strategy nodes based on regime consensus.",
    details: [
      "16-node stateful strategy matrix",
      "Context-aware execution routing",
      "Hysteresis state memory (flicker-free)",
      "Institutional-grade rationale generation"
    ]
  },
  {
    id: "integrity",
    title: "Sentinel: Guard Rails",
    subtitle: "MLOps & Drift Monitoring",
    description: "Continuous surveillance of model performance and data distribution to ensure production stability.",
    details: [
      "PSI (Population Stability Index) drift",
      "ADWIN concept drift detection",
      "Champion/Challenger model registry",
      "Automated institutional circuit breakers"
    ]
  },
  {
    id: "execution",
    title: "Ares: Battlefield Commander",
    subtitle: "Low-Latency Execution",
    description: "Acts on Apollo's directives with sub-10ms precision. Manages order lifecycle and dynamic risk controls.",
    details: [
      "Volatility-adjusted position sizing",
      "Broker-side SL/TP synchronization",
      "Real-time state persistence",
      "Multi-asset correlation shielding"
    ]
  }
];

export const architectureSteps = [
  {
    id: "ingestion",
    title: "Ingestion Layer",
    description: "Hermes daemon maintaining high-frequency TCP connections with zero-drift synchronization."
  },
  {
    id: "storage",
    title: "Persistence Layer",
    description: "TimescaleDB hypertables optimized for ultra-fast time-series queries and point-in-time correctness."
  },
  {
    id: "intelligence",
    title: "Bayesian Pantheon",
    description: "MLARD architecture orchestrating the decision loop from adaptive detection to probabilistic inference."
  },
  {
    id: "governance",
    title: "MLOps & Integrity",
    description: "Model registry and drift detection monitors ensuring long-term model stability and reliability."
  }
];

const metricsData = { metrics, processSteps, architectureSteps };
export default metricsData;
