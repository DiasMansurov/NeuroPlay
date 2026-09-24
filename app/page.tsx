import type { Metadata } from "next";
import Script from "next/script";
import { auth } from "@clerk/nextjs/server";

import { FinanceHome } from "@/components/site/finance-home";
import { OnboardingGate } from "@/components/site/onboarding-gate";
import { getFeaturedArticleSummaries } from "@/lib/articles";

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

  const featuredArticles = getFeaturedArticleSummaries();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NeuroPlay",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://neuroplay.app",
    description:
      "NeuroPlay is a protected copy of the existing application experience with authentication-first onboarding.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    publisher: {
      "@type": "Organization",
      name: "NeuroPlay",
      url: "https://neuroplay.app"
    }
  };

  return (
    <>
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FinanceHome featuredArticles={featuredArticles} />
    </>
  );
}
