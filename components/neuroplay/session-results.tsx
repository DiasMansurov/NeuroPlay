"use client";

import { Brain, ChartLine, Check, CircleCheck, RotateCcw, Save } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { exercises, getExercise, lastSessionResult } from "@/lib/neuroplay/demo-data";
import { useToast } from "./toast";
import { ProgressBar, SectionHead, StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

export function SessionResults() {
  const params = useSearchParams();
  const toast = useToast();
  const [saved, setSaved] = useState(false);
  const exercise = getExercise(params.get("exercise") ?? "") ?? getExercise(lastSessionResult.exerciseId) ?? exercises[0];
  const totalReps = exercise.reps * exercise.sets;
  const result = {
    ...lastSessionResult,
    totalReps,
    correctReps: Math.round(totalReps * (lastSessionResult.correctReps / lastSessionResult.totalReps))
  };

  return (
    <div className={s.page} style={{ maxWidth: 1040, margin: "0 auto", width: "100%" }}>
      <header className={s.resultHead}>
        <span className={s.resultBadge}>
          <CircleCheck size={36} aria-hidden="true" />
        </span>
        <h1>Session Complete</h1>
        <p className={s.muted} style={{ maxWidth: 460 }}>
          Nice work on {exercise.name}. Every steady session builds your recovery.
        </p>
        <StatusPill tone="gray">Demo results</StatusPill>
      </header>

      <section className={s.grid3} aria-label="Session summary">
        <div className={cx(s.bigStat, s.bigStatBlue)}>
          <strong>{result.accuracy}%</strong>
          <span>Accuracy</span>
        </div>
        <div className={s.bigStat}>
          <strong>{result.durationLabel}</strong>
          <span>Duration</span>
        </div>
        <div className={s.bigStat}>
          <strong>
            {result.correctReps}
            <span style={{ fontSize: "1rem", color: "#8B8E95" }}> / {result.totalReps}</span>
          </strong>
          <span>Correct reps</span>
        </div>
      </section>

      <div className={s.grid2}>
        <section className={cx(s.card, s.stack)} aria-labelledby="analysis-title" style={{ gap: 20 }}>
          <SectionHead title="Performance Analysis" subtitle="Compared with your target for this exercise" id="analysis-title" />
          <ProgressBar label="Range of Motion" value={result.rangeOfMotion} />
          <ProgressBar label="Movement Symmetry" value={result.symmetry} tone="indigo" />
          <ProgressBar label="Session Completion" value={result.completion} tone="green" />
        </section>

        <div className={s.stack}>
          <section className={s.insight} aria-labelledby="insight-title">
            <span className={s.insightIcon}>
              <Brain size={22} aria-hidden="true" />
            </span>
            <div>
              <h3 id="insight-title">Neuro-Insight</h3>
              <p>{result.insight}</p>
            </div>
          </section>
          <p className={s.metricNote}>
            Insights describe how you moved during this session. They are not a medical diagnosis — your care team reviews your
            results.
          </p>
          <div className={s.stack} style={{ gap: 10 }}>
            <button
              type="button"
              className={cx(s.btn, s.btnPrimary, s.btnLg, s.btnBlock)}
              disabled={saved}
              onClick={() => {
                setSaved(true);
                toast("Results saved", "Demo — shared with your care team in the next sync.");
              }}
            >
              {saved ? <Check size={18} aria-hidden="true" /> : <Save size={18} aria-hidden="true" />}
              {saved ? "Results saved" : "Save Results"}
            </button>
            <div className={s.grid2} style={{ gap: 10 }}>
              <Link href={`/app/session?exercise=${exercise.id}`} className={cx(s.btn, s.btnSecondary, s.btnLg)}>
                <RotateCcw size={18} aria-hidden="true" /> Train Again
              </Link>
              <Link href="/app/progress" className={cx(s.btn, s.btnSoft, s.btnLg)}>
                <ChartLine size={18} aria-hidden="true" /> View Progress
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
