import type { Metadata } from "next";
import { Suspense } from "react";

import { ActiveSession } from "@/components/neuroplay/active-session";

export const metadata: Metadata = {
  title: "Guided Session",
  description: "A focused NeuroPlay rehabilitation session."
};

export default function SessionPage() {
  return (
    <Suspense>
      <ActiveSession />
    </Suspense>
  );
}
