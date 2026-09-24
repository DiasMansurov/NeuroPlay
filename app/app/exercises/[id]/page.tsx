import { Activity, Clock, Flame, Gauge, Info, Play, Repeat, ShieldAlert, Sparkles, Waves } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ExerciseStatusPill } from "@/components/neuroplay/exercise-card";
import { RehabVisual } from "@/components/neuroplay/rehab-visual";
import { BackLink, MetricCard, StatusPill, cx } from "@/components/neuroplay/ui";
import s from "@/components/neuroplay/neuroplay.module.css";
import { exercises, getExercise } from "@/lib/neuroplay/demo-data";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return exercises.map((exercise) => ({ id: exercise.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const exercise = getExercise((await params).id);
  return { title: exercise?.name ?? "Exercise", description: exercise?.summary };
}

const measureIcons = [Activity, Waves, Sparkles];

export default async function ExerciseDetailPage({ params }: { params: Params }) {
  const exercise = getExercise((await params).id);
  if (!exercise) notFound();

  const startHref = `/app/session?exercise=${exercise.id}`;

  return (
    <div className={cx(s.page, s.hasMobileCta)}>
      <BackLink href="/app/exercises" label="Exercises" />

      <div className={s.split}>
        <div className={s.stack} style={{ gap: 24 }}>
          <div className={s.detailHero}>
            <RehabVisual kind={exercise.visual} id={`detail-${exercise.id}`} fit="meet" label={`Illustration of the ${exercise.name} exercise`} />
            <span className={s.detailHeroBadge}>
              <StatusPill tone="solid" icon={Sparkles}>
                Guided Session
              </StatusPill>
            </span>
          </div>

          <div className={s.detailTitle}>
            <div className={s.detailTags}>
              <StatusPill tone="blue">{exercise.category}</StatusPill>
              <StatusPill tone="gray" icon={Gauge}>
                {exercise.difficulty}
              </StatusPill>
              <ExerciseStatusPill status={exercise.status} />
            </div>
            <h1>{exercise.name}</h1>
            <p className={s.muted}>{exercise.target}</p>
          </div>

          <div className={cx(s.grid3, s.grid3Tight)}>
            <MetricCard label="Duration" value={exercise.durationMin} unit="min" icon={Clock} />
            <MetricCard label="Reps / Sets" value={`${exercise.reps} × ${exercise.sets}`} icon={Repeat} />
            <MetricCard label="Intensity" value={exercise.intensity} icon={Flame} tone="amber" />
          </div>

          <section className={cx(s.card, s.stack)} aria-labelledby="desc-title" style={{ gap: 12 }}>
            <h2 id="desc-title" className={s.cardTitle}>
              Description
            </h2>
            <p className={s.bodyText}>{exercise.description}</p>
          </section>

          <section className={cx(s.card, s.stack)} aria-labelledby="how-title" style={{ gap: 16 }}>
            <h2 id="how-title" className={s.cardTitle}>
              How to perform
            </h2>
            <ol className={s.steps}>
              {exercise.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </div>

        <aside className={cx(s.stack, s.stickyAside)}>
          <section className={cx(s.card, s.stack)} aria-labelledby="measures-title" style={{ gap: 18 }}>
            <div>
              <h2 id="measures-title" className={s.cardTitle}>
                What NeuroPlay measures
              </h2>
              <p className={s.cardSub}>Session feedback to help you and your care team follow progress.</p>
            </div>
            {exercise.measures.map((measure, index) => {
              const Icon = measureIcons[index % measureIcons.length];
              return (
                <div className={s.measureItem} key={measure.label}>
                  <span className={s.metricIcon}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{measure.label}</strong>
                    <span>{measure.detail}</span>
                  </div>
                </div>
              );
            })}
            <div className={cx(s.note, s.noteBlue)}>
              <Info size={18} aria-hidden="true" />
              <span>NeuroPlay provides movement feedback, not a medical diagnosis. Your clinician reviews your results.</span>
            </div>
          </section>

          <section className={s.note} aria-labelledby="safety-title">
            <ShieldAlert size={20} aria-hidden="true" />
            <div>
              <strong id="safety-title">Safety note</strong>
              <p>{exercise.safety}</p>
            </div>
          </section>

          <Link href={startHref} className={cx(s.btn, s.btnPrimary, s.btnLg, s.btnBlock, s.desktopOnly)}>
            <Play size={18} fill="currentColor" aria-hidden="true" /> Start Exercise
          </Link>
        </aside>
      </div>

      <div className={s.mobileCta}>
        <Link href={startHref} className={cx(s.btn, s.btnPrimary, s.btnLg, s.btnBlock)}>
          <Play size={18} fill="currentColor" aria-hidden="true" /> Start Exercise
        </Link>
      </div>
    </div>
  );
}
