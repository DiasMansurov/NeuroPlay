import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { CookieBanner } from "@/components/site/cookie-banner";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://neuroplay.app"),
  title: {
    default: "NeuroPlay | Rehabilitation Made Personal",
    template: "%s | NeuroPlay"
  },
  description: "NeuroPlay is a protected rehabilitation companion for personalized recovery plans, progress tracking, and clinical monitoring.",
  applicationName: "NeuroPlay",
  keywords: [
    "rehabilitation app",
    "digital rehabilitation",
    "physical therapy tracking",
    "recovery progress",
    "doctor monitoring",
    "personalized rehab",
    "motor skill recovery",
    "clinical rehabilitation"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "https://neuroplay.app",
    title: "NeuroPlay | Rehabilitation Made Personal",
    description: "Personalized rehabilitation, progress tracking, and doctor monitoring in one protected experience.",
    siteName: "NeuroPlay"
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroPlay | Rehabilitation Made Personal",
    description: "A protected rehabilitation companion for patients and care teams."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const { userId } = hasClerk ? await auth() : { userId: null };
  const showAuthenticatedChrome = Boolean(userId);
  const content = (
    <div className={`site-frame ${showAuthenticatedChrome ? "" : "site-frame-auth-gate"}`}>
      {showAuthenticatedChrome ? <SiteNav /> : null}
      <main>{children}</main>
      {showAuthenticatedChrome ? <SiteFooter /> : null}
    </div>
  );

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {hasClerk ? (
          <ClerkProvider
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            afterSignOutUrl="/"
            appearance={{
              variables: {
                colorPrimary: "#127cff",
                colorBackground: "#ffffff",
                colorText: "#111827",
                borderRadius: "1rem"
              }
            }}
          >
            {content}
            {showAuthenticatedChrome ? <CookieBanner /> : null}
          </ClerkProvider>
        ) : (
          <>
            {content}
          </>
        )}
      </body>
    </html>
  );
}
