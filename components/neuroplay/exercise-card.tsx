import { CircleCheck, Clock, Gauge, Repeat, Sparkles, Timer } from "lucide-react";
import Link from "next/link";

import type { Exercise, ExerciseStatus } from "@/lib/neuroplay/demo-data";
import { RehabVisual, VisualIcon } from "./rehab-visual";
import { StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

const statusMeta: Record<ExerciseStatus, { label: string; tone: "green" | "blue" | "amber" | "gray"; icon: typeof Clock }> = {
  completed: { label: "Completed", tone: "green", icon: CircleCheck },
  recommended: { label: "Recommended", tone: "blue", icon: Sparkles },
  "in-progress": { label: "In progress", tone: "amber", icon: Timer },
  upcoming: { label: "Up next", tone: "gray", icon: Clock }
};

export function ExerciseStatusPill({ status }: { status: ExerciseStatus }) {
  const meta = statusMeta[status];
  return (
    <StatusPill tone={meta.tone} icon={meta.icon}>
      {meta.label}
    </StatusPill>
  );
}

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      href={`/app/exercises/${exercise.id}`}
      className={cx(s.card, s.cardInteractive, s.exerciseCard)}
      aria-label={`${exercise.name}, ${exercise.category}, ${exercise.durationMin} minutes, ${exercise.difficulty}, ${statusMeta[exercise.status].label}`}
    >
      <div className={s.exerciseVisual}>
        <RehabVisual kind={exercise.visual} id={`card-${exercise.id}`} />
        <span className={s.exerciseVisualBadge}>
          <ExerciseStatusPill status={exercise.status} />
        </span>
      </div>
      <div className={s.exerciseBody}>
        <div>
          <span className={s.cardSub}>{exercise.category}</span>
          <h3>{exercise.name}</h3>
        </div>
        <p className={s.cardSub}>{exercise.target}</p>
        <div className={s.exerciseFacts}>
          <span>
            <Clock size={15} aria-hidden="true" /> {exercise.durationMin} min
          </span>
          <span>
            <Repeat size={15} aria-hidden="true" /> {exercise.sets} × {exercise.reps}
          </span>
          <span>
            <Gauge size={15} aria-hidden="true" /> {exercise.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PlanCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link href={`/app/exercises/${exercise.id}`} className={cx(s.card, s.cardFlat, s.cardInteractive, s.planCard)}>
      <div className={s.planCardTop}>
        <span className={s.thumb}>
          <VisualIcon kind={exercise.visual} />
        </span>
        <div>
          <h3>{exercise.name}</h3>
          <span className={s.cardSub}>{exercise.target}</span>
        </div>
      </div>
      <div className={s.exerciseFacts}>
        <span>
          <Clock size={15} aria-hidden="true" /> {exercise.durationMin} min
        </span>
        <span>
          <Repeat size={15} aria-hidden="true" /> {exercise.sets} × {exercise.reps} reps
        </span>
      </div>
      <div className={s.planCardFoot}>
        <StatusPill tone="gray">{exercise.difficulty}</StatusPill>
        <ExerciseStatusPill status={exercise.status} />
      </div>
    </Link>
  );
}
