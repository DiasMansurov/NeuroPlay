import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { OnboardingGate } from "@/components/site/onboarding-gate";

export const metadata: Metadata = {
  title: "NeuroPlay | Rehabilitation Made Personal",
  description:
    "NeuroPlay helps patients follow personalized rehabilitation, track progress, and stay connected with clinical support.",
  alternates: {
    canonical: "/"
  }
};

export default async function HomePage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const { userId } = hasClerk ? await auth() : { userId: null };

  if (!userId) {
    return <OnboardingGate />;
  }

  redirect("/dashboard");
}
