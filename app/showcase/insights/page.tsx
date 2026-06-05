import type { Metadata } from "next";
import { ShowcasePlaceholder } from "../components/ShowcasePlaceholder";

export const metadata: Metadata = {
  title: "L&D Insights Showcase — Jitin Nair",
  description: "Data-driven analytics, impact measurement, and performance reporting systems.",
};

export default function InsightsPage() {
  return (
    <ShowcasePlaceholder 
      title="Insights" 
      description="Measuring what matters: instrumentation of learning analytics, retention tracking, and the automated reporting suites that prove business impact."
    />
  );
}
