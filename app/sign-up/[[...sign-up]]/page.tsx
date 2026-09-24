import type { Metadata } from "next";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a NeuroPlay account with Clerk authentication."
};

const neuroPlayClerkAppearance = {
  variables: {
    colorPrimary: "#127cff",
    colorBackground: "#ffffff",
    colorText: "#111827",
    colorTextSecondary: "#697386",
    colorInputBackground: "#f8fbff",
    colorInputText: "#111827",
    colorNeutral: "#64748b",
    borderRadius: "1rem",
    fontFamily: '"Avenir Next", "Inter", "Segoe UI", system-ui, sans-serif'
  },
  elements: {
    rootBox: "neuro-clerk-root",
    cardBox: "neuro-clerk-card-box",
    card: "neuro-clerk-card",
    header: "neuro-clerk-header",
    headerTitle: "neuro-clerk-title",
    headerSubtitle: "neuro-clerk-subtitle",
    socialButtonsBlockButton: "neuro-clerk-social-button",
    formFieldLabel: "neuro-clerk-label",
    formFieldInput: "neuro-clerk-input",
    formButtonPrimary: "neuro-clerk-primary-button",
    footer: "neuro-clerk-footer",
    footerActionText: "neuro-clerk-footer-text",
    footerActionLink: "neuro-clerk-link",
    formFieldErrorText: "neuro-clerk-error",
    alert: "neuro-clerk-alert",
    otpCodeFieldInput: "neuro-clerk-otp-input"
  }
};

export default function SignUpPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!hasClerk) {
    return (
      <section className="neuro-auth-page" aria-labelledby="sign-up-title">
        <div className="neuro-auth-shell">
          <AuthIntro
            title="Start your recovery journey"
            body="Your personalized rehabilitation starts here."
          />
          <div className="neuro-auth-message-card">
            <p className="neuro-auth-kicker">NeuroPlay Access</p>
            <h2>Authentication is not configured yet</h2>
            <p>Add Clerk environment keys to enable email codes, passwords, and account sessions.</p>
            <Link className="neuro-auth-back-link" href="/">
              Back Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="neuro-auth-page neuro-auth-page-sign-up" aria-labelledby="sign-up-title">
      <div className="neuro-auth-shell">
        <AuthIntro
          title="Start your recovery journey"
          body="Your personalized rehabilitation starts here."
        />
        <div className="neuro-auth-card neuro-auth-card-lowered">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/"
            appearance={neuroPlayClerkAppearance}
          />
        </div>
      </div>
    </section>
  );
}

function AuthIntro({ title, body }: { title: string; body: string }) {
  return (
    <div className="neuro-auth-intro">
      <div className="onboarding-brand neuro-auth-brand">
        <span className="onboarding-brand-mark" aria-hidden="true">
          N
        </span>
        <span>NeuroPlay</span>
      </div>
      <div className="neuro-auth-heading">
        <p className="neuro-auth-kicker">Digital rehabilitation companion</p>
        <h1 id="sign-up-title">{title}</h1>
        <p>{body}</p>
      </div>
    </div>
  );
}
