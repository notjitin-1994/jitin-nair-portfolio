import type { Metadata } from "next";
import { CapabilitiesPage } from "../../components/capabilities/CapabilitiesPage";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "What Jitin Nair brings to L&D leadership: six capability domains across learning science and AI, each proven by a real result. AI-native learning design, instructional design, video-based learning, learning analytics, microlearning, and automation, backed by a full skill matrix.",
  alternates: {
    canonical: "https://jitinnair.com/ld/capabilities",
  },
};

export default function Capabilities() {
  return <CapabilitiesPage />;
}
