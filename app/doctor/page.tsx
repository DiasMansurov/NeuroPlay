import { CalendarClock, ClipboardList, TrendingUp, TriangleAlert, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PatientTable } from "@/components/neuroplay/patient-table";
import { ProgressChart } from "@/components/neuroplay/progress-chart";
import { Avatar, MetricCard, PageHeader, SectionHead, TextLink, cx } from "@/components/neuroplay/ui";
import s from "@/components/neuroplay/neuroplay.module.css";
import { adherenceTrend, clinician, patients } from "@/lib/neuroplay/demo-data";

export const metadata: Metadata = {
  title: "Doctor Dashboard",
  description: "Monitor patient rehabilitation in NeuroPlay."
};

export default function DoctorDashboardPage() {
  const attention = patients.filter((patient) => patient.status === "needs-attention");
  const latest = adherenceTrend[adherenceTrend.length - 1].value;
  const previous = adherenceTrend[adherenceTrend.length - 2].value;

  return (
    <div className={s.page}>
      <PageHeader
        title="Doctor Dashboard"
        subtitle={`${clinician.name} · ${clinician.clinic}`}
        actions={
          <Link href="/doctor/patients" className={cx(s.btn, s.btnPrimary)}>
            <UsersRound size={18} aria-hidden="true" /> View all patients
          </Link>
        }
      />

      <div className={s.grid4}>
        <MetricCard label="Active patients" value={patients.length} icon={UsersRound} />
        <MetricCard label="Average adherence" value={`${latest}%`} icon={ClipboardList} tone="green" delta={`+${latest - previous}%`} />
        <MetricCard label="Needs attention" value={attention.length} icon={TriangleAlert} tone="amber" note={attention.map((patient) => patient.name).join(", ")} />
        <MetricCard label="Check-ins this week" value={4} icon={CalendarClock} note="Next: Thu, 1 Oct · 10:30" />
      </div>

      <div className={s.dashGrid}>
        <section className={s.card} aria-labelledby="trend-title">
          <SectionHead title="Recovery Trends" subtitle="Average patient adherence, last 6 months" id="trend-title" />
          <div className={s.chartHeadline}>
            <strong>{latest}%</strong>
            <span className={cx(s.delta, s.deltaUp)}>
              <TrendingUp size={13} aria-hidden="true" /> +{latest - adherenceTrend[0].value} pts since April
            </span>
          </div>
          <ProgressChart data={adherenceTrend} height={240} unit="%" label="Average patient adherence" highlightLast />
        </section>

        <section className={cx(s.card, s.stack)} aria-labelledby="attention-title" style={{ gap: 12 }}>
          <SectionHead title="Needs attention" id="attention-title" />
          {attention.map((patient) => (
            <Link key={patient.id} href={`/doctor/patients/${patient.id}`} className={cx(s.infoTile, s.cardInteractive)}>
              <Avatar initials={patient.initials} />
              <div>
                <strong>{patient.name}</strong>
                <span>
                  Adherence {patient.adherence}% · last session {patient.lastSession}
                </span>
              </div>
            </Link>
          ))}
          <div className={s.divider} />
          <SectionHead title="New patients" />
          {patients
            .filter((patient) => patient.status === "new")
            .map((patient) => (
              <Link key={patient.id} href={`/doctor/patients/${patient.id}`} className={cx(s.infoTile, s.cardInteractive)}>
                <Avatar initials={patient.initials} />
                <div>
                  <strong>{patient.name}</strong>
                  <span>{patient.program} · not started</span>
                </div>
              </Link>
            ))}
        </section>
      </div>

      <section className={s.card} aria-labelledby="patients-title">
        <SectionHead title="Patient List" subtitle="Select a patient to see details" id="patients-title" action={<TextLink href="/doctor/patients">All patients</TextLink>} />
        <PatientTable patients={patients} />
      </section>
    </div>
  );
}
