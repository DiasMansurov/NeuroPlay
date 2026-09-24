"use client";

import { CircleCheck, Pause, Play, Sparkles, Square, Timer, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { exercises, getExercise, todaysPlanIds, type VisualKind } from "@/lib/neuroplay/demo-data";
import { GuidanceVisual, guidanceCues } from "./guidance-visual";
import { StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

const REP_MS = 2600;

// Simulated live reading shown during the session, matched to the movement type.
const liveMetrics: Record<VisualKind, { label: string; value: (rep: number) => string }> = {
  wrist: { label: "Range of motion", value: (rep) => `${58 + (rep % 7)}°` },
  rotation: { label: "Rotation", value: (rep) => `${142 + (rep % 9)}°` },
  grip: { label: "Hold time", value: (rep) => `${(2.6 + (rep % 4) * 0.1).toFixed(1)} s` },
  fingers: { label: "Tap accuracy", value: (rep) => `${88 + (rep % 8)}%` },
  shoulder: { label: "Arm elevation", value: (rep) => `${128 + (rep % 11)}°` },
  reach: { label: "Placement", value: (rep) => `${86 + (rep % 10)}%` },
  balance: { label: "Symmetry", value: (rep) => `${80 + (rep % 9)}%` },
  band: { label: "Pull depth", value: (rep) => `${90 + (rep % 8)}%` }
};

function formatTime(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function ActiveSession() {
  const router = useRouter();
  const params = useSearchParams();
  const exercise = getExercise(params.get("exercise") ?? "") ?? getExercise(todaysPlanIds[0]) ?? exercises[0];

  const cues = guidanceCues[exercise.visual];
  const liveMetric = liveMetrics[exercise.visual];

  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [{ set, rep }, setCount] = useState({ set: 1, rep: 0 });
  const [cue, setCue] = useState(0);
  const [confirmEnd, setConfirmEnd] = useState(false);

  const totalReps = exercise.reps * exercise.sets;
  const doneReps = (set - 1) * exercise.reps + rep;
  const finished = doneReps >= totalReps;
  const active = running && !finished;

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [active]);

  // Simulated rep detection — stands in for future camera or sensor input.
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => {
      setCount((current) => {
        if (current.rep + 1 < exercise.reps) return { ...current, rep: current.rep + 1 };
        // Last rep of a set: move to the next set, or hold at full on the final one.
        return current.set < exercise.sets ? { set: current.set + 1, rep: 0 } : { set: current.set, rep: exercise.reps };
      });
      setCue((value) => value + 1);
    }, REP_MS);
    return () => window.clearInterval(timer);
  }, [active, exercise.reps, exercise.sets]);

  const progress = Math.min(1, doneReps / totalReps);
  const radius = 84;
  const circumference = 2 * Math.PI * radius;

  function complete() {
    router.push(`/app/session/results?exercise=${exercise.id}`);
  }

  return (
    <div className={s.focusRoot}>
      <header className={s.focusBar}>
        {confirmEnd ? (
          <div className={s.btnRow}>
            <Link href={`/app/exercises/${exercise.id}`} className={cx(s.btn, s.btnDanger, s.btnSm)}>
              End without saving
            </Link>
            <button type="button" className={cx(s.btn, s.btnGhost, s.btnSm)} onClick={() => setConfirmEnd(false)}>
              Keep training
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={s.iconButton}
            aria-label="End session"
            onClick={() => {
              setRunning(false);
              setConfirmEnd(true);
            }}
          >
            <X size={20} aria-hidden="true" />
          </button>
        )}
        <div className={s.focusTitle}>
          <h1>{exercise.name}</h1>
          <span>
            Set {set} of {exercise.sets}
          </span>
        </div>
        <span className={cx(s.pill, s.pillGray)} style={{ fontSize: "0.9rem", padding: "8px 14px" }} aria-label={`Elapsed time ${formatTime(elapsed)}`}>
          <Timer size={16} aria-hidden="true" /> {formatTime(elapsed)}
        </span>
      </header>

      <div className={s.focusBody}>
        <section className={s.guidance} aria-label="Movement guidance">
          <div className={s.guidanceTop}>
            <StatusPill tone={finished ? "green" : active ? "blue" : "amber"} icon={finished ? CircleCheck : active ? Sparkles : Pause}>
              {finished ? "All sets complete" : active ? "Guidance active" : "Paused"}
            </StatusPill>
            <span className={s.demoTag}>Simulated input · camera/sensor coming soon</span>
          </div>
          <GuidanceVisual kind={exercise.visual} paused={!active} />
          <div className={s.guidanceCue} key={finished ? "done" : cue} aria-live="polite">
            {finished ? <CircleCheck size={18} aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}
            {finished ? "Great work — session complete" : active ? cues[cue % cues.length] : "Take a breath. Resume when ready."}
          </div>
        </section>

        <aside className={cx(s.card, s.sessionPanel)} aria-label="Session progress">
          <div className={s.ringWrap}>
            <svg viewBox="0 0 188 188" aria-hidden="true">
              <circle cx="94" cy="94" r={radius} fill="none" stroke="#EDF0F5" strokeWidth="12" />
              <circle
                cx="94"
                cy="94"
                r={radius}
                fill="none"
                stroke={finished ? "#34C759" : "#0B84FF"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                style={{ transition: "stroke-dashoffset 600ms ease" }}
              />
            </svg>
            <div className={s.ringCenter} aria-live="polite">
              <strong>
                {finished ? exercise.reps : rep}
                <span style={{ fontSize: "1.1rem", color: "#8B8E95" }}> / {exercise.reps}</span>
              </strong>
              <span>reps this set</span>
            </div>
          </div>
          <div className={s.stack} style={{ gap: 12 }}>
            <div className={s.sessionStats}>
              <div>
                <span>Set</span>
                <strong>
                  {set} / {exercise.sets}
                </strong>
              </div>
              <div>
                <span>Total reps</span>
                <strong>
                  {doneReps} / {totalReps}
                </strong>
              </div>
              <div>
                <span>{liveMetric.label}</span>
                <strong>{doneReps ? liveMetric.value(doneReps) : "—"}</strong>
              </div>
              <div>
                <span>Rep quality</span>
                <strong>{doneReps ? "Good" : "—"}</strong>
              </div>
            </div>
            <p className={s.metricNote}>Movement feedback only — not a medical assessment.</p>
          </div>
        </aside>
      </div>

      <footer className={s.focusFoot}>
        {finished ? (
          <button type="button" className={cx(s.btn, s.btnPrimary, s.btnLg)} onClick={complete}>
            <CircleCheck size={18} aria-hidden="true" /> See results
          </button>
        ) : (
          <>
            <button
              type="button"
              className={cx(s.btn, s.btnSecondary, s.btnLg)}
              onClick={() => {
                setRunning((value) => !value);
                setConfirmEnd(false);
              }}
            >
              {running ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
              {running ? "Pause" : "Resume"}
            </button>
            <button type="button" className={cx(s.btn, s.btnPrimary, s.btnLg)} onClick={complete}>
              <Square size={16} fill="currentColor" aria-hidden="true" /> Complete demo session
            </button>
          </>
        )}
      </footer>
    </div>
  );
}
