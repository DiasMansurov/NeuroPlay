import type { Metadata } from "next";

import { DemoAuthForm } from "@/components/site/demo-auth-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in with temporary NeuroPlay demo access."
};

export default function SignInPage() {
  return (
    <section className="neuro-auth-page" aria-labelledby="sign-in-title">
      <div className="neuro-auth-shell">
        <AuthIntro
          title="Welcome back"
          body="Continue your protected rehabilitation workspace."
        />
        <div className="neuro-auth-card">
          <DemoAuthForm mode="sign-in" />
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
        <h1 id="sign-in-title">{title}</h1>
        <p>{body}</p>
      </div>
    </div>
  );
}
