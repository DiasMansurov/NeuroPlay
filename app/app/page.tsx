import type { Metadata } from "next";
import Script from "next/script";

import { FinanceHome } from "@/components/site/finance-home";
import { getFeaturedArticleSummaries } from "@/lib/articles";

export const metadata: Metadata = {
  title: "NeuroPlay App",
  description: "Open the copied application experience inside the NeuroPlay repository."
};

export default function NeuroPlayAppPage() {
  const featuredArticles = getFeaturedArticleSummaries();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NeuroPlay",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://neuroplay.app/app",
    description: "NeuroPlay demo access to the copied application experience.",
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
        id="app-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FinanceHome featuredArticles={featuredArticles} />
    </>
  );
}
