import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/neuroplay/app-shell";
import { neuroplayFont } from "@/components/neuroplay/font";

export const metadata: Metadata = {
  title: {
    default: "Clinician Dashboard",
    template: "%s | NeuroPlay Clinic"
  },
  robots: { index: false, follow: false }
};

export default function DoctorLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell variant="doctor" fontClassName={neuroplayFont.variable}>
      {children}
    </AppShell>
  );
}
