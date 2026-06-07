// Data: Academic and technical citations

export interface Citation {
  id: string;
  title: string;
  author: string;
  year: number;
  type: "paper" | "book" | "article" | "standard";
  relevance: string;
  url?: string;
  doi?: string;
}

export const citations: Citation[] = [
  {
    id: "causal-signal-eng",
    title: "Performance-Driven Causal Signal Engineering",
    author: "arXiv:2603.13638",
    year: 2026,
    type: "paper",
    relevance: "Foundation for MAD normalization and hysteresis state memory used in MLARD. Explains why execution delayed by one step preserves strict temporal ordering.",
    url: "https://arxiv.org/abs/2603.13638"
  },
  {
    id: "regimenas",
    title: "RegimeNAS: Regime-Aware Differentiable Architecture Search",
    author: "arXiv:2508.11338",
    year: 2025,
    type: "paper",
    relevance: "Theoretical basis for multi-timeframe alignment and regime-specific strategy switching blocks.",
    url: "https://arxiv.org/abs/2508.11338"
  },
  {
    id: "kaufman-er",
    title: "New Trading Systems and Methods (5th Edition)",
    author: "Perry J. Kaufman",
    year: 2013,
    type: "book",
    relevance: "Source of Efficiency Ratio (ER) for trend strength measurement. Used to distinguish trending from ranging markets with institutional precision.",
    url: "https://www.wiley.com/en-us/New+Trading+Systems+and+Methods%2C+5th+Edition-p-9781118043561"
  },
  {
    id: "choppiness-dreiss",
    title: "The Composite Index: A New Technique for Market Analysis",
    author: "E.W. Dreiss",
    year: 1993,
    type: "article",
    relevance: "Original publication of the Choppiness Index (CHOP), identifying ranging vs. trending markets using ATR-to-range ratios.",
    url: "https://www.tradingview.com/scripts/choppinessindex/"
  },
  {
    id: "adwin-bifet",
    title: "Adaptive Learning from Evolving Data Streams",
    author: "Albert Bifet, Ricard Gavaldà",
    year: 2007,
    type: "paper",
    relevance: "ADWIN (Adaptive Windowing) algorithm for drift detection. Enables Predator to monitor ML feature drift in real-time.",
    doi: "10.1007/978-3-540-76931-6_11"
  },
  {
    id: "psi-credit",
    title: "Credit Risk Scorecards: Developing and Implementing Intelligent Credit Scoring",
    author: "Naeem Siddiqi",
    year: 2012,
    type: "book",
    relevance: "Standard reference for Population Stability Index (PSI) used in Predator's production model monitoring.",
    url: "https://www.wiley.com/en-us/Credit+Risk+Scorecards%3A+Developing+and+Implementing+Intelligent+Credit+Scoring-p-9781119201731"
  },
  {
    id: "timescale",
    title: "TimescaleDB: SQL Made Scalable for Time-Series Data",
    author: "Michael J. Freedman, et al.",
    year: 2018,
    type: "paper",
    relevance: "Scalable time-series storage backbone. Enables sub-10ms insertion of ProtoBuf tick streams from institutional sockets.",
    url: "https://www.timescale.com/"
  },
  {
    id: "langgraph",
    title: "LangGraph: Building Stateful, Multi-Agent Applications",
    author: "LangChain Team",
    year: 2024,
    type: "standard",
    relevance: "Framework for building cyclic agent workflows. Managed DAG logic for context-aware strategy routing.",
    url: "https://langchain-ai.github.io/langgraph/"
  }
];

export default citations;