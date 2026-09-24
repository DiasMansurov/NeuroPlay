import type { Metadata } from "next";
import { Suspense } from "react";

import { SessionResults } from "@/components/neuroplay/session-results";

export const metadata: Metadata = {
  title: "Session Complete",
  description: "Your NeuroPlay session results."
};

export default function SessionResultsPage() {
  return (
    <Suspense>
      <SessionResults />
    </Suspense>
  );
}
