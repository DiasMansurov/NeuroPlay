import type { Metadata } from "next";

import { CareTeam } from "@/components/neuroplay/care-team";

export const metadata: Metadata = {
  title: "Care Team",
  description: "Your NeuroPlay clinician and rehabilitation goals."
};

export default function CarePage() {
  return <CareTeam />;
}
