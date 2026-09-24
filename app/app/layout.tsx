import type { ReactNode } from "react";

import { AppShell } from "@/components/neuroplay/app-shell";
import { neuroplayFont } from "@/components/neuroplay/font";

export default function PatientAppLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell variant="patient" fontClassName={neuroplayFont.variable}>
      {children}
    </AppShell>
  );
}
