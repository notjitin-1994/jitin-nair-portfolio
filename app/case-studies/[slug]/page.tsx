import type { Metadata } from "next";
import { caseStudies } from "../../data/caseStudies";
import { CaseStudyDetail } from "./CaseStudyDetail";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return { title: "Not Found" };

  return {
    title: `${cs.title} — Case Study`,
    description: cs.challenge,
    openGraph: {
      title: `${cs.title} | Jitin Nair`,
      description: cs.solution,
      type: "article",
      url: `/case-studies/${cs.slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  return <CaseStudyDetail slug={params.slug} />;
}
