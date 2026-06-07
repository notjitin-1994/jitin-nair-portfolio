import type { Metadata } from "next";
import { InstructionalDesignClient } from "./InstructionalDesignClient";

export const metadata: Metadata = {
  title: "Instructional Design: Industrializing Intelligence — Jitin Nair",
  description: "Strategic architectural L&D: building the industrialized, scalable learning ecosystems that power enterprise growth at the speed of AI.",
};

export default function InstructionalDesignPage() {
  return <InstructionalDesignClient />;
}
