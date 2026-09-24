import type { Metadata } from "next";

import { RecoveryProgress } from "@/components/neuroplay/recovery-progress";

export const metadata: Metadata = {
  title: "Recovery Progress",
  description: "Rehabilitation insights over time."
};

export default function ProgressPage() {
  return <RecoveryProgress />;
}
