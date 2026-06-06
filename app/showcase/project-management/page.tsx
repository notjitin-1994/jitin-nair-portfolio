import type { Metadata } from "next";
import { ProjectManagementClient } from "./ProjectManagementClient";

export const metadata: Metadata = {
  title: "Project Management Showcase — Jitin Nair",
  description: "Methodology and orchestration of complex learning initiatives from kick-off to global delivery.",
};

export default function ProjectManagementPage() {
  return <ProjectManagementClient />;
}
