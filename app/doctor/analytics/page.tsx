import { Activity, ClipboardList, Move, Timer } from "lucide-react";
import type { Metadata } from "next";

import { ProgressChart } from "@/components/neuroplay/progress-chart";
import { MetricCard, PageHeader, ProgressBar, SectionHead, cx } from "@/components/neuroplay/ui";
import s from "@/components/neuroplay/neuroplay.module.css";
import { adherenceTrend, patients } from "@/lib/neuroplay/demo-data";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Rehabilitation outcomes across your NeuroPlay patients."
};

const sessionsPerWeek = [
  { label: "Wk 1", value: 14 },
  { label: "Wk 2", value: 17 },
  { label: "Wk 3", value: 16 },
  { label: "Wk 4", value: 19 },
  { label: "Wk 5", value: 21 },
  { label: "Wk 6", value: 22 }
];

export default function AnalyticsPage() {
  const programs = Array.from(new Set(patients.map((patient) => patient.program))).map((program) => {
    const group = patients.filter((patient) => patient.program === program);
    return {
      program,
      count: group.length,
      progress: Math.round(group.reduce((sum, patient) => sum + patient.progress, 0) / group.length)
    };
  });

  return (
    <div className={s.page}>
      <PageHeader title="Analytics" subtitle="Rehabilitation outcomes across your patients" />

      <div className={s.grid4}>
        <MetricCard label="Sessions this week" value={22} icon={Activity} delta="+1" />
        <MetricCard label="Average adherence" value="82%" icon={ClipboardList} tone="green" delta="+3%" />
        <MetricCard label="Avg. ROM gain" value="+18°" icon={Move} note="Since program start" />
        <MetricCard label="Avg. session length" value="8.4" unit="min" icon={Timer} />
      </div>

      <div className={s.grid2}>
        <section className={s.card} aria-labelledby="adh-title">
          <SectionHead title="Average adherence" subtitle="All patients, last 6 months" id="adh-title" />
          <ProgressChart data={adherenceTrend} height={240} unit="%" label="Average adherence" highlightLast />
        </section>
        <section className={s.card} aria-labelledby="sessions-title">
          <SectionHead title="Completed sessions" subtitle="All patients, per week" id="sessions-title" />
          <ProgressChart data={sessionsPerWeek} type="bar" height={240} label="Completed sessions per week" highlightLast />
        </section>
      </div>

      <section className={cx(s.card, s.stack)} aria-labelledby="programs-title" style={{ gap: 18 }}>
        <SectionHead title="Progress by program" subtitle="Average recovery progress" id="programs-title" />
        {programs.map((item) => (
          <ProgressBar key={item.program} label={`${item.program} · ${item.count} ${item.count === 1 ? "patient" : "patients"}`} value={item.progress} />
        ))}
      </section>
    </div>
  );
}
