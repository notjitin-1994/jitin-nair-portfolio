import { blogPosts } from "../../data/blogPosts";
import { InsightDetail } from "./InsightDetail";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function InsightPage({ params }: { params: { slug: string } }) {
  return <InsightDetail slug={params.slug} />;
}
