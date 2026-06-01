import type { Metadata } from "next";
import { LDPortfolio } from "../components/ld/LDPortfolio";

export const metadata: Metadata = {
  title: "Learning & Development Leadership — Jitin Nair",
  description:
    "Jitin Nair: a Learning & Development leader who turns learning into measurable business performance. 10+ years across instructional design and AI, reaching 50K+ learners, cutting training time 70%, and saving $140K+ through automation.",
  alternates: {
    canonical: "https://jitinnair.com/LD-Systems-Portfolio",
  },
};

export default function LDSystemsPortfolio() {
  return <LDPortfolio />;
}
