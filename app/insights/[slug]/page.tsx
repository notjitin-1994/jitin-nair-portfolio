import type { Metadata } from "next";
import { blogPosts } from "../../data/blogPosts";
import { InsightDetail } from "./InsightDetail";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Jitin Nair`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Jitin Nair"],
      url: `/insights/${post.slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
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
