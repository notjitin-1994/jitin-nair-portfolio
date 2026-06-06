import type { Metadata } from "next";
import { InstructionalDesignClient } from "./InstructionalDesignClient";

export const metadata: Metadata = {
  title: "Instructional Design Showcase — Jitin Nair",
  description: "Beyond course creation: building the industrialized, scalable learning ecosystems that power enterprise growth.",
};

export default function InstructionalDesignPage() {
  return <InstructionalDesignClient />;
}
