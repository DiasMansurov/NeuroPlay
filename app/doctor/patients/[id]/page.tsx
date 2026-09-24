import { Activity, CalendarClock, ClipboardList, Clock, Gauge, Move, Stethoscope } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ClinicianNotes } from "@/components/neuroplay/clinician-notes";
import { PatientStatusPill } from "@/components/neuroplay/people";
import { ProgressChart } from "@/components/neuroplay/progress-chart";
import { Avatar, BackLink, InfoTile, MetricCard, ProgressBar, SectionHead, StatusPill, cx } from "@/components/neuroplay/ui";
import s from "@/components/neuroplay/neuroplay.module.css";
import { getPatient, patients } from "@/lib/neuroplay/demo-data";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return patients.map((patient) => ({ id: patient.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const patient = getPatient((await params).id);
  return { title: patient?.name ?? "Patient" };
}

export default async function PatientDetailPage({ params }: { params: Params }) {
  const patient = getPatient((await params).id);
  if (!patient) notFound();

  const romNow = patient.rom[patient.rom.length - 1].value;
  const romStart = patient.rom[0].value;
  const mobilityNow = patient.mobility[patient.mobility.length - 1].value;
  const mobilityStart = patient.mobility[0].value;

  return (
    <div className={s.page}>
      <BackLink href="/doctor/patients" label="Patients" />

      <section className={cx(s.card, s.profileHead)} aria-label="Patient summary">
        <Avatar initials={patient.initials} size="xl" />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700 }}>{patient.name}</h1>
            <PatientStatusPill status={patient.status} />
          </div>
          <p className={s.muted}>
            {patient.age} yrs · {patient.condition}
          </p>
        </div>
        <div className={s.grid2} style={{ gap: 10, flex: "1 1 320px" }}>
          <InfoTile icon={Stethoscope} label="Program" value={patient.program} />
          <InfoTile icon={CalendarClock} label="Program week" value={`Week ${patient.week} of ${patient.weeks}`} />
        </div>
      </section>

      <div className={s.grid4}>
        <MetricCard label="Recovery progress" value={`${patient.progress}%`} icon={Gauge} />
        <MetricCard label="Adherence" value={`${patient.adherence}%`} icon={ClipboardList} tone={patient.adherence >= 75 ? "green" : "amber"} />
        <MetricCard label="Mobility score" value={mobilityNow} unit="/100" icon={Activity} delta={mobilityNow > mobilityStart ? `+${mobilityNow - mobilityStart}` : undefined} />
        <MetricCard label="Range of motion" value={`${romNow}°`} icon={Move} delta={romNow > romStart ? `+${romNow - romStart}°` : undefined} />
      </div>

      <div className={s.grid2}>
        <section className={s.card} aria-labelledby="mob-title">
          <SectionHead title="Mobility progress" subtitle="Mobility score by program week" id="mob-title" />
          <ProgressChart data={patient.mobility} height={220} label={`${patient.name} mobility score`} highlightLast />
        </section>
        <section className={s.card} aria-labelledby="rom-title">
          <SectionHead title="Range-of-motion trend" subtitle="Best rep per week, degrees" id="rom-title" />
          <ProgressChart data={patient.rom} type="bar" height={220} unit="°" label={`${patient.name} range of motion`} highlightLast />
        </section>
      </div>

      <div className={s.split}>
        <section className={s.card} aria-labelledby="sessions-title">
          <SectionHead title="Recent sessions" id="sessions-title" />
          {patient.sessions.length ? (
            <div className={s.list}>
              {patient.sessions.map((session) => (
                <div className={s.listRow} key={`${session.exercise}-${session.date}`}>
                  <span className={s.metricIcon}>
                    <Activity size={18} aria-hidden="true" />
                  </span>
                  <div className={s.listMain}>
                    <strong>{session.exercise}</strong>
                    <span>{session.date}</span>
                  </div>
                  <div className={s.listMeta}>
                    <span className={s.hideSm}>
                      <Clock size={15} aria-hidden="true" /> {session.durationMin} min
                    </span>
                    <StatusPill tone={session.accuracy >= 80 ? "green" : "amber"}>
                      {session.accuracy}%<span className={s.srOnly}> accuracy</span>
                    </StatusPill>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={s.empty}>
              <p>No sessions yet. The patient hasn&apos;t started their program.</p>
            </div>
          )}
        </section>

        <div className={s.stack}>
          <section className={cx(s.card, s.stack)} aria-labelledby="goals-title" style={{ gap: 16 }}>
            <SectionHead title="Rehabilitation goals" id="goals-title" />
            {patient.goals.map((goal) => (
              <ProgressBar key={goal.label} label={goal.label} value={goal.progress} tone={goal.progress >= 75 ? "green" : "blue"} />
            ))}
          </section>
          <ClinicianNotes patientName={patient.name} />
        </div>
      </div>
    </div>
  );
}
