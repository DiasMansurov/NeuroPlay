"use client";

import { Activity, Clock, Download, Move, Target, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";

import { getExercise, mobilitySeries, periodStats, recentSessions, type Period } from "@/lib/neuroplay/demo-data";
import { ProgressChart } from "./progress-chart";
import { VisualIcon } from "./rehab-visual";
import { ReportDialog } from "./report-dialog";
import { MetricCard, PageHeader, SectionHead, StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

const periods: { id: Period; label: string; caption: string }[] = [
  { id: "weekly", label: "Weekly", caption: "This week" },
  { id: "monthly", label: "Monthly", caption: "Last 6 weeks" },
  { id: "yearly", label: "Yearly", caption: "Last 6 months" }
];

export function RecoveryProgress() {
  const [period, setPeriod] = useState<Period>("weekly");
  const [reportOpen, setReportOpen] = useState(false);
  const data = mobilitySeries[period];
  const stats = periodStats[period];
  const first = data[0].value;
  const last = data[data.length - 1].value;
  const caption = periods.find((item) => item.id === period)?.caption;

  return (
    <div className={s.page}>
      <PageHeader
        title="Recovery Progress"
        subtitle="Rehabilitation insights over time"
        actions={
          <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={() => setReportOpen(true)}>
            <Download size={18} aria-hidden="true" /> Download Rehabilitation Report
          </button>
        }
      />

      <section className={s.card} aria-labelledby="mobility-title">
        <div className={s.sectionHead} style={{ flexWrap: "wrap" }}>
          <div>
            <h2 id="mobility-title">Mobility Score</h2>
            <p>{caption}</p>
          </div>
          <div className={s.segmented} role="tablist" aria-label="Period">
            {periods.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={period === item.id}
                className={cx(s.segment, period === item.id && s.segmentActive)}
                onClick={() => setPeriod(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className={s.chartHeadline}>
          <strong>{last}</strong>
          <span className={cx(s.delta, s.deltaUp)}>
            <TrendingUp size={13} aria-hidden="true" /> +{last - first} pts
          </span>
          <span className={s.cardSub}>out of 100</span>
        </div>
        <ProgressChart data={data} height={280} label={`Mobility score, ${caption}`} highlightLast />
      </section>

      <section aria-labelledby="stats-title">
        <SectionHead title="Recovery Statistics" subtitle={caption} id="stats-title" />
        <div className={s.grid4}>
          <MetricCard label="Total training time" value={stats.trainingTime} icon={Clock} delta={stats.deltas[0]} />
          <MetricCard label="Range of motion" value={stats.rom} icon={Move} delta={stats.deltas[1]} note="Wrist extension, best rep" />
          <MetricCard label="Movement response" value={stats.response} icon={Zap} tone="amber" delta={stats.deltas[2]} note="Average time to start a rep" />
          <MetricCard label="Session consistency" value={stats.consistency} icon={Target} tone="green" delta={stats.deltas[3]} />
        </div>
      </section>

      <section className={s.card} aria-labelledby="recent-title">
        <SectionHead title="Recent Sessions" id="recent-title" />
        <div className={s.list}>
          {recentSessions.map((session) => {
            const exercise = getExercise(session.exerciseId);
            if (!exercise) return null;
            return (
              <div className={s.listRow} key={session.id}>
                <span className={s.thumb}>
                  <VisualIcon kind={exercise.visual} />
                </span>
                <div className={s.listMain}>
                  <strong>{exercise.name}</strong>
                  <span>{session.date}</span>
                </div>
                <div className={s.listMeta}>
                  <span className={s.hideSm}>
                    <Clock size={15} aria-hidden="true" /> {session.durationMin} min
                  </span>
                  <StatusPill tone={session.accuracy >= 85 ? "green" : "amber"} icon={Activity}>
                    {session.accuracy}%<span className={s.srOnly}> accuracy</span>
                  </StatusPill>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {reportOpen ? <ReportDialog title={`Rehabilitation report · ${caption}`} onClose={() => setReportOpen(false)} /> : null}
    </div>
  );
}
