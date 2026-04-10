import type { Metadata } from "next";
import { blogPosts } from "../../data/blogPosts";
import { InsightDetail } from "./InsightDetail";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Not Found" };

  const articleUrl = `https://jitinnair.com/insights/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: `${post.title} | Jitin Nair`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Jitin Nair"],
      url: articleUrl,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
      tags: [post.category, "AI", "Jitin Nair", "AI Systems Architect"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function InsightPage({ params }: { params: { slug: string } }) {
  return <InsightDetail slug={params.slug} />;
}
