import type { Metadata } from "next";
import { WorkExperience } from "../../components/work/WorkExperience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "The full work record of Jitin Nair: a decade across instructional design and AI systems. Role by role, with the numbers behind each: 5K+ learners reached, $140K+ training cost saved, 70% faster delivery, and 200+ AI agents deployed.",
  alternates: {
    canonical: "https://jitinnair.com/work",
  },
};

export default function WorkPage() {
  return <WorkExperience />;
}
