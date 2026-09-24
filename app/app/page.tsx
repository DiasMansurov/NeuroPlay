import { Clock, Dumbbell, Flame, Gauge, ListChecks, Play, Timer, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PlanCard } from "@/components/neuroplay/exercise-card";
import { Greeting } from "@/components/neuroplay/greeting";
import { ClinicianCard } from "@/components/neuroplay/people";
import { ProgressChart } from "@/components/neuroplay/progress-chart";
import { RehabVisual } from "@/components/neuroplay/rehab-visual";
import { MetricCard, SectionHead, TextLink, cx } from "@/components/neuroplay/ui";
import s from "@/components/neuroplay/neuroplay.module.css";
import { exercises, getExercise, mobilitySeries, patientProfile, recoverySummary, todaysPlanIds } from "@/lib/neuroplay/demo-data";

export const metadata: Metadata = {
  title: "Overview",
  description: "Your NeuroPlay rehabilitation plan for today."
};

export default function OverviewPage() {
  const plan = todaysPlanIds.map((id) => getExercise(id)).filter((exercise) => exercise !== undefined);
  const featured = plan[0] ?? exercises[0];
  const totalMinutes = plan.reduce((sum, exercise) => sum + exercise.durationMin, 0);
  const completedToday = plan.filter((exercise) => exercise.status === "completed").length;
  const goalPercent = Math.round(((recoverySummary.sessionsThisWeek) / recoverySummary.sessionsGoal) * 100);

  return (
    <div className={s.page}>
      <header className={s.pageHeader}>
        <div>
          <Greeting name={patientProfile.firstName} />
          <p>Here&apos;s your recovery plan for today.</p>
        </div>
      </header>

      <section className={s.hero} aria-labelledby="today-title">
        <div className={s.heroCopy}>
          <span className={s.heroKicker}>
            <Dumbbell size={15} aria-hidden="true" /> Today&apos;s Rehabilitation
          </span>
          <div>
            <p style={{ opacity: 0.85, fontSize: "0.92rem", marginBottom: 6 }}>Recommended to start with</p>
            <h2 id="today-title" className={s.heroTitle}>
              {featured.name}
            </h2>
          </div>
          <div className={s.heroMeta}>
            <span>
              <Clock size={16} aria-hidden="true" /> ~{totalMinutes} min
            </span>
            <span>
              <ListChecks size={16} aria-hidden="true" /> {plan.length} exercises
            </span>
            <span>
              <Gauge size={16} aria-hidden="true" /> {featured.difficulty}
            </span>
          </div>
          <div className={s.heroGoal}>
            <div className={s.heroGoalRow}>
              <span>Weekly goal</span>
              <span>
                {recoverySummary.sessionsThisWeek} of {recoverySummary.sessionsGoal} sessions
              </span>
            </div>
            <div className={s.heroGoalTrack} role="progressbar" aria-valuenow={goalPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Weekly goal progress">
              <i style={{ width: `${goalPercent}%` }} />
            </div>
          </div>
          <div className={s.btnRow}>
            <Link href="/app/session" className={cx(s.btn, s.btnWhite, s.btnLg)}>
              <Play size={18} fill="currentColor" aria-hidden="true" /> Start Today&apos;s Session
            </Link>
            <Link href={`/app/exercises/${featured.id}`} className={cx(s.btn, s.btnLg)} style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.4)" }}>
              View exercise
            </Link>
          </div>
        </div>
        <div className={s.heroVisual} aria-hidden="true">
          <div className={s.heroGlass}>
            <RehabVisual kind={featured.visual} tone="hero" id="hero-visual" />
          </div>
          <span className={s.heroChip} style={{ top: 18, left: 0 }}>
            <small>Range of motion</small>
            64°
          </span>
          <span className={s.heroChip} style={{ bottom: 18, right: 0 }}>
            <small>Last accuracy</small>
            92%
          </span>
        </div>
      </section>

      <section aria-labelledby="summary-title">
        <SectionHead title="Recovery Summary" subtitle="Compared with last week" id="summary-title" />
        <div className={s.grid4}>
          <MetricCard label="Mobility score" value={recoverySummary.mobilityScore} unit="/100" icon={Gauge} delta={`+${recoverySummary.mobilityDelta}`} />
          <MetricCard
            label="Sessions this week"
            value={recoverySummary.sessionsThisWeek}
            unit={`/ ${recoverySummary.sessionsGoal}`}
            icon={Dumbbell}
            tone="green"
          />
          <MetricCard label="Training time" value={recoverySummary.trainingMinutes} unit="min" icon={Timer} delta={`+${recoverySummary.trainingDelta} min`} />
          <MetricCard label="Current streak" value={recoverySummary.streakDays} unit="days" icon={Flame} tone="amber" />
        </div>
      </section>

      <div className={s.dashGrid}>
        <section aria-labelledby="plan-title">
          <SectionHead
            title="Today's Plan"
            subtitle={`${completedToday} of ${plan.length} completed`}
            id="plan-title"
            action={<TextLink href="/app/exercises">All exercises</TextLink>}
          />
          <div className={s.planGrid}>
            {plan.map((exercise) => (
              <PlanCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </section>

        <section aria-labelledby="care-title">
          <SectionHead title="Care Team" id="care-title" />
          <ClinicianCard compact />
        </section>
      </div>

      <section className={s.card} aria-labelledby="progress-title">
        <SectionHead
          title="Progress Preview"
          subtitle="Mobility score, last 7 days"
          id="progress-title"
          action={<TextLink href="/app/progress">View full progress</TextLink>}
        />
        <div className={s.chartHeadline}>
          <strong>{recoverySummary.mobilityScore}</strong>
          <span className={cx(s.delta, s.deltaUp)}>
            <TrendingUp size={13} aria-hidden="true" /> +{recoverySummary.mobilityDelta} this week
          </span>
        </div>
        <ProgressChart data={mobilitySeries.weekly} type="bar" height={200} label="Mobility score, last 7 days" highlightLast domain={[0, 100]} />
      </section>
    </div>
  );
}
