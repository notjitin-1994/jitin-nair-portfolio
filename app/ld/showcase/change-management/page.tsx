import type { Metadata } from "next";
import { ChangeManagementClient } from "./ChangeManagementClient";

export const metadata: Metadata = {
  title: "Change & Project Management Showcase — Jitin Nair",
  description: "Methodology and orchestration of complex learning initiatives and change programs from kick-off to global delivery.",
};

export default function ChangeManagementPage() {
  return <ChangeManagementClient />;
}
