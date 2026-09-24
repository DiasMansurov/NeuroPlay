import type { Metadata } from "next";

import { ReportsList } from "@/components/neuroplay/reports-list";

export const metadata: Metadata = {
  title: "Reports",
  description: "Your NeuroPlay rehabilitation reports."
};

export default function ReportsPage() {
  return <ReportsList />;
}
