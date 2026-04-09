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
    title: `${project.name} | ${project.tagline} — Jitin Nair`,
    description: `${project.description} Architected and deployed by Jitin Nair. Key innovations: ${project.keyInnovations.slice(0, 2).join(", ")}.`,
    openGraph: {
      title: `${project.name} | AI Systems Architecture`,
      description: project.description,
      type: "article",
      url: `/projects/${project.id}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.tagline,
    }
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
