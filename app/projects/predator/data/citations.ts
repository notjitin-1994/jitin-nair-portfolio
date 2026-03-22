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
    id: "kaufman-er",
    title: "New Trading Systems and Methods (5th Edition)",
    author: "Perry J. Kaufman",
    year: 2013,
    type: "book",
    relevance: "Source of Efficiency Ratio (ER) for trend strength measurement. ER compares the net change in price to the sum of absolute price changes, helping distinguish trending from ranging markets.",
    url: "https://www.wiley.com/en-us/New+Trading+Systems+and+Methods%2C+5th+Edition-p-9781118043561"
  },
  {
    id: "choppiness-dreiss",
    title: "The Composite Index: A New Technique for Market Analysis",
    author: "E.W. Dreiss",
    year: 1993,
    type: "article",
    relevance: "Original publication of the Choppiness Index (CHOP), a normalized measure (0-100) that identifies ranging vs. trending markets using the relationship between ATR and price range.",
    url: "https://www.tradingview.com/scripts/choppinessindex/"
  },
  {
    id: "adwin-bifet",
    title: "Adaptive Learning from Evolving Data Streams",
    author: "Albert Bifet, Ricard Gavaldà",
    year: 2007,
    type: "paper",
    relevance: "ADWIN (Adaptive Windowing) algorithm for drift detection. Uses a sliding window approach with statistical testing to detect when data distribution changes significantly.",
    doi: "10.1007/978-3-540-76931-6_11"
  },
  {
    id: "psi-credit",
    title: "Credit Risk Scorecards: Developing and Implementing Intelligent Credit Scoring",
    author: "Naeem Siddiqi",
    year: 2012,
    type: "book",
    relevance: "Standard reference for Population Stability Index (PSI) used in model monitoring. PSI < 0.1: no change, 0.1-0.25: moderate change, > 0.25: significant change requiring investigation.",
    url: "https://www.wiley.com/en-us/Credit+Risk+Scorecards%3A+Developing+and+Implementing+Intelligent+Credit+Scoring-p-9781119201731"
  },
  {
    id: "kelly-criterion",
    title: "A New Interpretation of Information Rate",
    author: "John L. Kelly Jr.",
    year: 1956,
    type: "paper",
    relevance: "Original Kelly Criterion paper. Determines optimal bet sizing to maximize log-utility of wealth. f* = (bp - q) / b, where b is odds, p is win probability.",
    doi: "10.1002/j.1538-7305.1956.tb03809.x"
  },
  {
    id: "adx-welles",
    title: "New Concepts in Technical Trading Systems",
    author: "J. Welles Wilder Jr.",
    year: 1978,
    type: "book",
    relevance: "Original publication of ADX (Average Directional Index) and DMI (Directional Movement Index). ADX measures trend strength regardless of direction, critical for regime detection.",
    url: "https://www.tradingview.com/scripts/dmi/"
  },
  {
    id: "timescale",
    title: "TimescaleDB: SQL Made Scalable for Time-Series Data",
    author: "Michael J. Freedman, et al.",
    year: 2018,
    type: "paper",
    relevance: "Time-series database with automatic partitioning, compression, and retention policies. Enables efficient storage of high-frequency tick data with SQL interface.",
    url: "https://www.timescale.com/"
  },
  {
    id: "langgraph",
    title: "LangGraph: Building Stateful, Multi-Agent Applications with LLMs",
    author: "LangChain Team",
    year: 2024,
    type: "standard",
    relevance: "Framework for building cyclic agent workflows with persistence. Enables complex multi-agent orchestration with state management and human-in-the-loop capabilities.",
    url: "https://langchain-ai.github.io/langgraph/"
  }
];

export default citations;