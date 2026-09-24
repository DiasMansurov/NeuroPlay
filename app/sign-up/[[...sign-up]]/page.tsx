import type { Metadata } from "next";

import { DemoAuthForm } from "@/components/site/demo-auth-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create temporary NeuroPlay demo access."
};

export default function SignUpPage() {
  return (
    <section className="neuro-auth-page neuro-auth-page-sign-up" aria-labelledby="sign-up-title">
      <div className="neuro-auth-shell">
        <AuthIntro
          title="Start your recovery journey"
          body="Your personalized rehabilitation starts here."
        />
        <div className="neuro-auth-card neuro-auth-card-lowered">
          <DemoAuthForm mode="sign-up" />
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
