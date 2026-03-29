import type { Metadata } from "next";
import AgentsPage from "./AgentsClient";

export const metadata: Metadata = {
  title: "AI Agent Showcase",
  description: "A fleet of 200+ specialized AI agents orchestrated via LangGraph. Explore the agent architecture, categories, and real-time metrics.",
  openGraph: {
    title: "AI Agent Showcase | Jitin Nair",
    description: "200+ AI agents across automation, research, content, DevOps, integration, and analytics.",
    url: "/agents",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <AgentsPage />;
}
