import type { Metadata } from "next";

import { OnboardingGate } from "@/components/site/onboarding-gate";

export const metadata: Metadata = {
  title: "NeuroPlay | Rehabilitation Made Personal",
  description:
    "NeuroPlay helps patients follow personalized rehabilitation, track progress, and stay connected with clinical support.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  return <OnboardingGate />;
}
