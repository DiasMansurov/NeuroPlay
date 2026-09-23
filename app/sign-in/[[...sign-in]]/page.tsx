import type { Metadata } from "next";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your NeuroPlay account."
};

export default function SignInPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!hasClerk) {
    return (
      <section className="shell section auth-page auth-flow-page">
        <div className="panel stack-md">
          <p className="eyebrow">NeuroPlay Access</p>
          <h1>Authentication is not configured yet</h1>
          <p className="muted">Add Clerk environment keys to enable email verification, passwords, and account sessions.</p>
          <Link className="button primary" href="/">
            Back Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="shell section auth-page auth-flow-page">
      <div className="auth-shell">
        <div className="panel stack-md auth-copy">
          <p className="eyebrow">NeuroPlay Account</p>
          <h1>Welcome back.</h1>
          <p className="muted">
            Sign in to continue your rehabilitation workspace.
          </p>
          <div className="goal-list compact-list">
            <div className="goal-item">Resume personalized rehab plans.</div>
            <div className="goal-item">Review progress signals.</div>
            <div className="goal-item">Keep your care workspace protected.</div>
          </div>
        </div>
        <div className="auth-card">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/"
          />
        </div>
      </div>
    </section>
  );
}
