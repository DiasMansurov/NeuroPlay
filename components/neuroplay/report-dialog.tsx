"use client";

import { Download, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { clinician, getExercise, patientProfile, recentSessions, recoverySummary } from "@/lib/neuroplay/demo-data";
import { useToast } from "./toast";
import { ProgressBar, StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

type Props = {
  title: string;
  onClose: () => void;
  summary?: { sessions: number; trainingTime: string; avgPerformance: number };
};

function buildReportHtml(title: string, summary: NonNullable<Props["summary"]>) {
  const rows = recentSessions
    .map((session) => {
      const name = getExercise(session.exerciseId)?.name ?? session.exerciseId;
      return `<tr><td>${name}</td><td>${session.date}</td><td>${session.durationMin} min</td><td>${session.accuracy}%</td></tr>`;
    })
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<style>body{font-family:-apple-system,Segoe UI,sans-serif;color:#17191c;max-width:720px;margin:40px auto;padding:0 20px}
h1{font-size:24px}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:8px;border-bottom:1px solid #e9ebf0}
.muted{color:#8b8e95}.stats{display:flex;gap:24px;margin:20px 0}.stats div{background:#f5f7fb;padding:14px 18px;border-radius:14px}</style></head>
<body><p class="muted">NeuroPlay · Demo report</p><h1>${title}</h1>
<p>Patient: ${patientProfile.firstName} ${patientProfile.lastName} · Program: ${patientProfile.program} · Clinician: ${clinician.name}</p>
<div class="stats"><div><b>${summary.sessions}</b><br><span class="muted">Sessions</span></div><div><b>${summary.trainingTime}</b><br><span class="muted">Training time</span></div><div><b>${summary.avgPerformance}%</b><br><span class="muted">Avg. performance</span></div></div>
<h2>Recent sessions</h2><table><tr><th>Exercise</th><th>Date</th><th>Duration</th><th>Accuracy</th></tr>${rows}</table>
<p class="muted">This report summarises movement feedback from guided sessions. It is not a medical diagnosis.</p></body></html>`;
}

export function ReportDialog({ title, onClose, summary = { sessions: 5, trainingTime: "2h 22m", avgPerformance: 87 } }: Props) {
  const toast = useToast();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // Focus the dialog once on open and restore focus on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, []);

  function download() {
    const blob = new Blob([buildReportHtml(title, summary)], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `neuroplay-report-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}.html`;
    link.click();
    URL.revokeObjectURL(url);
    toast("Report downloaded", "Demo report generated in your browser.");
  }

  return (
    <div className={s.overlay} onClick={onClose}>
      <div
        className={s.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-dialog-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={s.dialogHead}>
          <div>
            <StatusPill tone="gray">Demo report</StatusPill>
            <h2 id="report-dialog-title" className={s.cardTitle} style={{ marginTop: 10, fontSize: "1.3rem" }}>
              {title}
            </h2>
            <p className={s.cardSub}>
              {patientProfile.firstName} {patientProfile.lastName} · {patientProfile.program}
            </p>
          </div>
          <button type="button" className={s.iconButton} aria-label="Close report" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={s.stack}>
          <div className={s.grid3} style={{ gap: 10 }}>
            <div className={s.bigStat}>
              <strong style={{ fontSize: "1.6rem" }}>{summary.sessions}</strong>
              <span>Sessions</span>
            </div>
            <div className={s.bigStat}>
              <strong style={{ fontSize: "1.6rem" }}>{summary.trainingTime}</strong>
              <span>Training time</span>
            </div>
            <div className={cx(s.bigStat, s.bigStatBlue)}>
              <strong style={{ fontSize: "1.6rem" }}>{summary.avgPerformance}%</strong>
              <span>Avg. performance</span>
            </div>
          </div>
          <ProgressBar label="Mobility score" value={recoverySummary.mobilityScore} valueLabel={`${recoverySummary.mobilityScore} / 100`} />
          <ProgressBar label="Weekly goal" value={80} tone="green" />
          <p className={s.metricNote}>Summarises movement feedback from guided sessions. Not a medical diagnosis.</p>
          <div className={s.btnRow} style={{ justifyContent: "flex-end" }}>
            <button type="button" className={cx(s.btn, s.btnSecondary)} onClick={onClose}>
              Close
            </button>
            <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={download}>
              <Download size={18} aria-hidden="true" /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
