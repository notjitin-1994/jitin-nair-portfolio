import type { Metadata } from "next";
import { LeadingLD } from "../../../components/leading/LeadingLD";

export const metadata: Metadata = {
  title: "L&D Leadership Case Studies — Jitin Nair",
  description:
    "Four leadership case studies across business alignment, change management, team leadership, and impact measurement. Proven results: $140K+ in training cost removed, 70% faster delivery, and 54% retention held.",
  alternates: {
    canonical: "https://jitinnair.com/ld/showcase/case-studies",
  },
};

export default function CaseStudiesPage() {
  return <LeadingLD />;
}
