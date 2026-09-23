import type { Metadata } from "next";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a NeuroPlay account with Clerk authentication."
};

export default function SignUpPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!hasClerk) {
    return (
      <section className="shell section auth-page auth-flow-page">
        <div className="panel stack-md">
          <p className="eyebrow">Create NeuroPlay Account</p>
          <h1>Authentication is not configured yet</h1>
          <p className="muted">Add Clerk environment keys to enable email codes, passwords, and account sessions.</p>
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
          <p className="eyebrow">Join NeuroPlay</p>
          <h1>Create your rehabilitation account.</h1>
          <p className="muted">
            Register with the existing Clerk flow to enter the protected NeuroPlay experience.
          </p>
          <div className="goal-list compact-list">
            <div className="goal-item">Protect access before the main app loads.</div>
            <div className="goal-item">Return later with email and password.</div>
            <div className="goal-item">Keep rehabilitation progress tied to your account.</div>
          </div>
        </div>
        <div className="auth-card">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/"
          />
        </div>
      </div>
    </section>
  );
}
