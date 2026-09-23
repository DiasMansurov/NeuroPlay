import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
const isProtectedApiRoute = createRouteMatcher([
  "/api/classes(.*)",
  "/api/profile(.*)"
]);
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isPublicPageRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)", "/trpc(.*)"]);

function redirectToOnboarding(req: NextRequest) {
  return NextResponse.redirect(new URL("/", req.url));
}

export default hasClerk
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedApiRoute(req)) {
        await auth.protect();
      }

      if (!isApiRoute(req)) {
        const { userId } = await auth();

        if (isAuthRoute(req) && userId) {
          return redirectToOnboarding(req);
        }

        if (!isPublicPageRoute(req) && !userId) {
          return redirectToOnboarding(req);
        }
      }

      return NextResponse.next();
    })
  : (req: NextRequest) => {
      if (!isApiRoute(req) && !isPublicPageRoute(req)) {
        return redirectToOnboarding(req);
      }

      return NextResponse.next();
    };

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
};
