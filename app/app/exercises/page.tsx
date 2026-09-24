import type { Metadata } from "next";
import { Suspense } from "react";

import { ExerciseLibrary } from "@/components/neuroplay/exercise-library";
import { PageHeader } from "@/components/neuroplay/ui";
import s from "@/components/neuroplay/neuroplay.module.css";

export const metadata: Metadata = {
  title: "Exercises",
  description: "Your personalized NeuroPlay rehabilitation program."
};

export default function ExercisesPage() {
  return (
    <div className={s.page}>
      <PageHeader title="Exercises" subtitle="Your personalized rehabilitation program" />
      <Suspense>
        <ExerciseLibrary />
      </Suspense>
    </div>
  );
}
