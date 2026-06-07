import type { Metadata } from "next";
import { showcaseInsights } from "../../../../data/showcaseInsights";
import { InsightShowcaseDetail } from "./InsightShowcaseDetail";

export function generateStaticParams() {
  return showcaseInsights
    .filter((p) => p.status === "published")
    .map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = showcaseInsights.find((p) => p.slug === params.slug && p.status === "published");
  if (!post) return { title: "Not Found" };

  const url = `https://jitinnair.com/showcase/insights/${post.slug}`;

  return {
    title: `${post.title} — Jitin Nair`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | Jitin Nair`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Jitin Nair"],
      url,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      tags: [post.category, "L&D", "Learning & Development", "Jitin Nair"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function ShowcaseInsightPage({ params }: { params: { slug: string } }) {
  return <InsightShowcaseDetail slug={params.slug} />;
}
