import type { Metadata } from "next";
import { ShowcasePlaceholder } from "../components/ShowcasePlaceholder";

export const metadata: Metadata = {
  title: "Project Discovery & Planning Showcase — Jitin Nair",
  description: "Detailed deep-dive into automated stakeholder discovery and strategic curriculum mapping methodology.",
};

export default function DiscoveryPlanningPage() {
  return (
    <ShowcasePlaceholder 
      title="Project Discovery & Planning" 
      description="Automated stakeholder discovery, strategic curriculum mapping, and the architectural blueprints that bridge business needs with learning solutions."
    />
  );
}
