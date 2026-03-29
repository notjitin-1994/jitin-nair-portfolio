import type { Metadata } from "next";
import AboutPage from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "AI Systems Architect with expertise in multi-agent orchestration, instructional design, and full-stack development. 50+ skills across 6 domains.",
  openGraph: {
    title: "About Jitin Nair | AI Systems Architect",
    description: "Career timeline, skills matrix, and resources. From instructional design to AI architecture.",
    url: "/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <AboutPage />;
}
