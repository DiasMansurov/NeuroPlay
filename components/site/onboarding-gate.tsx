import Link from "next/link";

const onboardingFeatures = [
  {
    title: "Personalized rehabilitation",
    body: "Adaptive exercise plans shaped around each recovery goal.",
    icon: "personal"
  },
  {
    title: "Progress tracking",
    body: "Clear movement and consistency signals after every session.",
    icon: "progress"
  },
  {
    title: "Doctor monitoring",
    body: "A calm workspace for care-team oversight and guidance.",
    icon: "doctor"
  }
];

export function OnboardingGate() {
  return (
    <section className="onboarding-page" aria-labelledby="onboarding-title">
      <div className="onboarding-shell">
        <div className="onboarding-copy">
          <div className="onboarding-brand">
            <span className="onboarding-brand-mark" aria-hidden="true">
              N
            </span>
            <span>NeuroPlay</span>
          </div>
          <div className="onboarding-heading">
            <p className="onboarding-kicker">Digital rehabilitation companion</p>
            <h1 id="onboarding-title">Rehabilitation made personal.</h1>
            <p>
              NeuroPlay helps patients follow guided rehab routines, understand progress, and stay connected with
              clinical support in one focused experience.
            </p>
          </div>
          <div className="onboarding-actions" aria-label="NeuroPlay account actions">
            <Link className="onboarding-primary-action" href="/sign-up">
              Get Started
            </Link>
            <p>
              Already have an account? <Link href="/sign-in">Sign in</Link>
            </p>
          </div>
        </div>

        <div className="onboarding-visual-stack" aria-label="NeuroPlay rehabilitation preview">
          <div className="onboarding-visual-card">
            <div className="rehab-session-visual" aria-hidden="true">
              <div className="rehab-figure">
                <span className="rehab-head" />
                <span className="rehab-body" />
                <span className="rehab-arm rehab-arm-left" />
                <span className="rehab-arm rehab-arm-right" />
              </div>
              <div className="rehab-motion-ring" />
              <div className="rehab-session-badge">
                <span>Session</span>
                <strong>18 min</strong>
              </div>
              <div className="rehab-progress-card">
                <span>Mobility score</span>
                <strong>82%</strong>
                <div>
                  <i />
                </div>
              </div>
            </div>
          </div>

          <div className="onboarding-feature-list">
            {onboardingFeatures.map((feature) => (
              <article className="onboarding-feature-card" key={feature.title}>
                <span className={`onboarding-feature-icon ${feature.icon}`} aria-hidden="true" />
                <div>
                  <h2>{feature.title}</h2>
                  <p>{feature.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
