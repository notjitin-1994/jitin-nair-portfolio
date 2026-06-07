import type { Metadata } from "next";
import { ArchitecturePortfolioExperience } from "../components/ArchitecturePortfolioExperience";

export const metadata: Metadata = {
  title: "AI Systems Architecture Portfolio",
  description:
    "Jitin Nair's AI Systems Architecture portfolio — multi-agent orchestration, agentic AI, and autonomous systems. 200+ AI agents deployed across LangGraph, MCP, RAG, and Bayesian inference systems.",
  alternates: {
    canonical: "https://jitinnair.com/ai",
  },
};

export default function AISystemsArchitecturePortfolio() {
  return <ArchitecturePortfolioExperience />;
}
