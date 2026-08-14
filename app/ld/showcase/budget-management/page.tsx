import type { Metadata } from "next";
import { BudgetManagementClient } from "./BudgetManagementClient";

export const metadata: Metadata = {
  title: "Budget Management: Optimizing L&D Investment — Jitin Nair",
  description: "Strategic L&D resource allocation, ROI optimization, and leveraging AI platforms like Smartslate for maximizing training budget efficiency.",
};

export default function BudgetManagementPage() {
  return <BudgetManagementClient />;
}
