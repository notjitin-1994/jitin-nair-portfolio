import { caseStudies } from "../../data/caseStudies";
import { CaseStudyDetail } from "./CaseStudyDetail";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  return <CaseStudyDetail slug={params.slug} />;
}
