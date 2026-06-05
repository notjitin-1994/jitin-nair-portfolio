import type { Metadata } from "next";
import { ShowcasePlaceholder } from "../components/ShowcasePlaceholder";

export const metadata: Metadata = {
  title: "Instructional Design Showcase — Jitin Nair",
  description: "Cognitive-first architectures built on ADDIE, Bloom's taxonomy, and modern learning science.",
};

export default function InstructionalDesignPage() {
  return (
    <ShowcasePlaceholder 
      title="Instructional Design" 
      description="Deep-dive into cognitive-first architectures: how I apply learning science to create measurable behavior change and high-retention learning paths."
    />
  );
}
