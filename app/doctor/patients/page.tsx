import type { Metadata } from "next";
import { Suspense } from "react";

import { PatientDirectory } from "@/components/neuroplay/patient-directory";
import { PageHeader } from "@/components/neuroplay/ui";
import s from "@/components/neuroplay/neuroplay.module.css";

export const metadata: Metadata = {
  title: "Patients",
  description: "Patients in your NeuroPlay rehabilitation programs."
};

export default function PatientsPage() {
  return (
    <div className={s.page}>
      <PageHeader title="Patients" subtitle="Everyone currently in a rehabilitation program with you" />
      <Suspense>
        <PatientDirectory />
      </Suspense>
    </div>
  );
}
