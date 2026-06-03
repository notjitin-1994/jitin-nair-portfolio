import type { Metadata } from "next";
import { LeadingLD } from "../components/leading/LeadingLD";

export const metadata: Metadata = {
  title: "Leading L&D",
  description:
    "How Jitin Nair leads Learning & Development, proven in the numbers. Four leadership case studies across business alignment, change management, team leadership, and impact measurement: $140K+ in training cost removed, 70% faster delivery, 60% less production time, and 54% retention held.",
  alternates: {
    canonical: "https://jitinnair.com/leading-ld",
  },
};

export default function LeadingLDPage() {
  return <LeadingLD />;
}
