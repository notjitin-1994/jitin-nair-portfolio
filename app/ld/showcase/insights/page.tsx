import type { Metadata } from "next";
import { InsightsShowcaseClient } from "./InsightsShowcaseClient";

export const metadata: Metadata = {
  title: "L&D Insights — Jitin Nair",
  description:
    "Data-driven essays on learning analytics, AI-native instruction, skills strategy, and the operating model rewiring the modern L&D function.",
};

export default function InsightsPage() {
  return <InsightsShowcaseClient />;
}
