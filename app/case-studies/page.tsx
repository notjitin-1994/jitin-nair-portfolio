import type { Metadata } from "next";
import CaseStudiesPage from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Production systems with measurable outcomes. Detailed project narratives covering AI automation, agentic systems, and full-stack development.",
  openGraph: {
    title: "Case Studies | Jitin Nair",
    description: "Detailed case studies of AI systems, trading engines, learning platforms, and workshop management tools.",
    url: "/case-studies",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <CaseStudiesPage />;
}
