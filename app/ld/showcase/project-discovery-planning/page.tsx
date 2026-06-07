import type { Metadata } from "next";
import { DiscoveryPlanningClient } from "./DiscoveryPlanningClient";

export const metadata: Metadata = {
  title: "Project Discovery & Planning Showcase — Jitin Nair",
  description: "Detailed deep-dive into automated stakeholder discovery and strategic curriculum mapping methodology.",
};

export default function DiscoveryPlanningPage() {
  return <DiscoveryPlanningClient />;
}
