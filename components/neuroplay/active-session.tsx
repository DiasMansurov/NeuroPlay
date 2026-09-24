"use client";

import { CircleCheck, Pause, Play, Sparkles, Square, Timer, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { exercises, getExercise, todaysPlanIds } from "@/lib/neuroplay/demo-data";
import { StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

const cueList = (alignTarget: string) => ["Move slowly", `Keep your ${alignTarget} aligned`, "Good range of motion", "Breathe steadily", "Smooth and controlled"];
const REP_MS = 2600;

function formatTime(total: number) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function ActiveSession() {
  const router = useRouter();
  const params = useSearchParams();
  const exercise = getExercise(params.get("exercise") ?? "") ?? getExercise(todaysPlanIds[0]) ?? exercises[0];

  const cues = cueList(exercise.visual === "wrist" || exercise.visual === "grip" || exercise.visual === "fingers" ? "wrist" : "posture");

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
      setCue((value) => (value + 1) % 5);
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
          <GuidanceVisual paused={!active} />
          <div className={s.guidanceCue} key={finished ? "done" : cue} aria-live="polite">
            {finished ? <CircleCheck size={18} aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}
            {finished ? "Great work — session complete" : active ? cues[cue] : "Take a breath. Resume when ready."}
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
                <span>Range of motion</span>
                <strong>{doneReps ? `${58 + (doneReps % 7)}°` : "—"}</strong>
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

function GuidanceVisual({ paused }: { paused: boolean }) {
  const state = paused ? "paused" : "running";
  return (
    <svg viewBox="0 0 520 320" aria-hidden="true">
      <style>{`
        @keyframes np-wrist { 0%,100% { transform: rotate(-26deg); } 50% { transform: rotate(24deg); } }
        @keyframes np-pulse { 0%,100% { opacity: .25; } 50% { opacity: .6; } }
        .np-hand { transform-origin: 262px 170px; animation: np-wrist 2.6s ease-in-out infinite; animation-play-state: ${state}; }
        .np-pulse { animation: np-pulse 2.6s ease-in-out infinite; animation-play-state: ${state}; }
        @media (prefers-reduced-motion: reduce) { .np-hand, .np-pulse { animation: none; } }
      `}</style>
      {/* target range */}
      <path d="M262 170 L 380 102 A 136 136 0 0 1 380 238 Z" fill="#0B84FF" opacity="0.07" />
      <path d="M380 102 A 136 136 0 0 1 380 238" fill="none" stroke="#0B84FF" strokeWidth="3" strokeDasharray="3 10" strokeLinecap="round" />
      <circle cx="380" cy="102" r="7" fill="#34C759" />
      <circle cx="380" cy="238" r="7" fill="#34C759" />
      <text x="396" y="98" fontSize="13" fill="#1F8A3C" fontWeight="600">Target</text>
      <text x="396" y="252" fontSize="13" fill="#1F8A3C" fontWeight="600">Target</text>
      {/* tracking points */}
      <circle className="np-pulse" cx="262" cy="170" r="34" fill="#0B84FF" />
      {/* forearm */}
      <rect x="70" y="150" width="200" height="40" rx="20" fill="#FFFFFF" stroke="#D6E4F5" strokeWidth="2" />
      <circle cx="120" cy="170" r="5" fill="#7DB9FF" />
      <circle cx="190" cy="170" r="5" fill="#7DB9FF" />
      {/* hand */}
      <g className="np-hand">
        <rect x="250" y="146" width="98" height="48" rx="24" fill="#FFFFFF" stroke="#D6E4F5" strokeWidth="2" />
        <rect x="330" y="150" width="50" height="15" rx="7.5" fill="#FFFFFF" stroke="#D6E4F5" strokeWidth="2" />
        <rect x="330" y="168" width="46" height="15" rx="7.5" fill="#FFFFFF" stroke="#D6E4F5" strokeWidth="2" />
        <circle cx="330" cy="170" r="5" fill="#7DB9FF" />
        <circle cx="376" cy="160" r="5" fill="#0B84FF" />
        <line x1="262" y1="170" x2="376" y2="160" stroke="#0B84FF" strokeWidth="2" strokeDasharray="4 5" />
      </g>
      <circle cx="262" cy="170" r="9" fill="#0B84FF" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}
