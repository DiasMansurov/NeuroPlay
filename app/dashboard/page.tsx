import type { Metadata } from "next";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your protected NeuroPlay rehabilitation dashboard."
};

const dashboardStats = [
  { label: "Recovery plan", value: "Personalized", detail: "Adaptive sessions for each goal" },
  { label: "Progress signals", value: "Ready", detail: "Track mobility and consistency" },
  { label: "Care team", value: "Connected", detail: "Prepared for clinical monitoring" }
];

const nextSteps = [
  "Review your rehabilitation goals with your provider.",
  "Complete guided movement sessions when assigned.",
  "Track progress and share updates with your care team."
];

export default async function DashboardPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!hasClerk) {
    redirect("/");
  }

  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const displayName = user?.firstName ?? user?.username ?? "there";
  const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <section className="neuro-dashboard-page" aria-labelledby="dashboard-title">
      <div className="neuro-dashboard-shell">
        <header className="neuro-dashboard-topbar">
          <div className="onboarding-brand neuro-dashboard-brand">
            <span className="onboarding-brand-mark" aria-hidden="true">
              N
            </span>
            <span>NeuroPlay</span>
          </div>
          <div className="neuro-dashboard-account">
            <UserButton />
            <SignOutButton redirectUrl="/">
              <button className="neuro-dashboard-signout" type="button">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </header>

        <div className="neuro-dashboard-hero">
          <div>
            <p className="neuro-dashboard-kicker">Protected recovery workspace</p>
            <h1 id="dashboard-title">Welcome back, {displayName}.</h1>
            <p>
              This is your NeuroPlay dashboard for personalized rehabilitation, progress tracking, and clinical
              support.
            </p>
            {email ? <span className="neuro-dashboard-email">{email}</span> : null}
          </div>
          <div className="neuro-dashboard-session-card" aria-label="Today session summary">
            <span>Today</span>
            <strong>Ready for your next session</strong>
            <p>Your protected account is active and ready for care-plan updates.</p>
          </div>
        </div>

        <div className="neuro-dashboard-stat-grid" aria-label="NeuroPlay dashboard overview">
          {dashboardStats.map((stat) => (
            <article className="neuro-dashboard-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <p>{stat.detail}</p>
            </article>
          ))}
        </div>

        <section className="neuro-dashboard-panel" aria-labelledby="dashboard-next-steps">
          <div>
            <p className="neuro-dashboard-kicker">Next steps</p>
            <h2 id="dashboard-next-steps">Start with a calm baseline.</h2>
          </div>
          <ol>
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}
