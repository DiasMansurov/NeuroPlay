import type { Metadata } from "next";

import { DoctorSettings } from "@/components/neuroplay/doctor-settings";

export const metadata: Metadata = {
  title: "Settings",
  description: "Clinician settings for NeuroPlay."
};

export default function DoctorSettingsPage() {
  return <DoctorSettings />;
}
