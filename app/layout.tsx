import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { DemoSiteFrame } from "@/components/site/demo-site-frame";

import "./globals.css";

const clerkLocalization = {
  signIn: {
    start: {
      title: "Sign in to NeuroPlay",
      titleCombined: "Sign in to NeuroPlay",
      subtitle: "Welcome back! Sign in to continue your recovery.",
      subtitleCombined: "Welcome back! Sign in to continue your recovery."
    }
  },
  signUp: {
    start: {
      title: "Create your NeuroPlay account",
      titleCombined: "Create your NeuroPlay account",
      subtitle: "Start your personalized rehabilitation journey.",
      subtitleCombined: "Start your personalized rehabilitation journey."
    }
  }
};

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
  const content = <DemoSiteFrame>{children}</DemoSiteFrame>;

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {hasClerk ? (
          <ClerkProvider
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            afterSignOutUrl="/"
            localization={clerkLocalization}
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
