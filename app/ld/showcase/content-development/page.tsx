import type { Metadata } from "next";
import { ContentDevelopmentClient } from "./ContentDevelopmentClient";

export const metadata: Metadata = {
  title: "Content Development — Jitin Nair",
  description:
    "Engineering the production line: from high-fidelity video-based learning to automated AI pipelines that cut production time by 60%.",
};

export default function ContentDevelopmentPage() {
  return <ContentDevelopmentClient />;
}
