import type { Metadata } from "next";
import { ShowcasePlaceholder } from "../components/ShowcasePlaceholder";

export const metadata: Metadata = {
  title: "Project Management Showcase — Jitin Nair",
  description: "Methodology and orchestration of complex learning initiatives from kick-off to global delivery.",
};

export default function ProjectManagementPage() {
  return (
    <ShowcasePlaceholder 
      title="Project Management" 
      description="The orchestration of complex learning initiatives: managing stakeholders, timelines, and technical dependencies across global L&D functions."
    />
  );
}
