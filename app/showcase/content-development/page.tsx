import type { Metadata } from "next";
import { ShowcasePlaceholder } from "../components/ShowcasePlaceholder";

export const metadata: Metadata = {
  title: "Content Development Showcase — Jitin Nair",
  description: "High-fidelity video production and automated content pipelines engineered for scale.",
};

export default function ContentDevelopmentPage() {
  return (
    <ShowcasePlaceholder 
      title="Content Development" 
      description="Engineering the production line: from high-fidelity video-based learning to automated AI pipelines that cut production time by 60%."
    />
  );
}
