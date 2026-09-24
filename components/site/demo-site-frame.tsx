"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { CookieBanner } from "@/components/site/cookie-banner";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";

function isDemoAccessRoute(pathname: string) {
  return pathname === "/" || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
}

// The NeuroPlay patient and clinician apps render their own shell (sidebar, topbar, mobile nav).
function isNeuroPlayAppRoute(pathname: string) {
  return /^\/(app|doctor)(\/|$)/.test(pathname);
}

export function DemoSiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (isNeuroPlayAppRoute(pathname)) {
    return <>{children}</>;
  }

  const showCopiedAppChrome = !isDemoAccessRoute(pathname);

  return (
    <div className={`site-frame ${showCopiedAppChrome ? "" : "site-frame-auth-gate"}`}>
      {showCopiedAppChrome ? <SiteNav /> : null}
      <main>{children}</main>
      {showCopiedAppChrome ? (
        <>
          <SiteFooter />
          <CookieBanner />
        </>
      ) : null}
    </div>
  );
}
