import type { Metadata } from "next";
import InsightsPage from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights",
  description: "Technical deep-dives on AI enablement, agent architecture, prompt engineering, and the intersection of instructional design and artificial intelligence.",
  openGraph: {
    title: "Insights & Articles | Jitin Nair",
    description: "AI enablement articles, agent architecture guides, and prompt engineering techniques.",
    url: "/insights",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <InsightsPage />;
}
