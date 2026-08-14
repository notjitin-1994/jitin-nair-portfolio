import type { Metadata } from "next";
import { SkillsTaxonomyClient } from "./SkillsTaxonomyClient";

export const metadata: Metadata = {
  title: "Skills Taxonomies & Talent Mobility — Jitin Nair",
  description: "Strategic succession planning, performance consulting, and dynamic skills taxonomy development at the enterprise level.",
};

export default function SkillsTaxonomyPage() {
  return <SkillsTaxonomyClient />;
}
