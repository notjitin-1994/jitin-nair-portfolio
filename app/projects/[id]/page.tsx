import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData } from "../../data/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return { title: "Not Found" };
  }

  return {
    title: `${project.name} — Project`,
    description: project.challenge,
    openGraph: {
      title: `${project.name} | Jitin Nair`,
      description: project.solution,
      type: "article",
      url: `/projects/${project.id}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsData.length - 1
      ? projectsData[currentIndex + 1]
      : null;

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
