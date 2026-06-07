import type { Metadata } from "next";
import InsightsPage from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights — AI Architecture, Agent Design & Engineering Velocity",
  description: "Technical articles by Jitin Nair on AI enablement, multi-agent orchestration, Model Context Protocol (MCP), Bayesian inference systems, prompt engineering, and AI governance.",
  openGraph: {
    title: "Insights & Articles | Jitin Nair — AI Systems Architect",
    description: "Technical deep-dives on multi-agent orchestration, MCP, compound AI systems, Bayesian inference, and AI governance by Jitin Nair.",
    url: "/insights",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <InsightsPage />;
}
