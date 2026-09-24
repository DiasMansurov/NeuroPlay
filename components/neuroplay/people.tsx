"use client";

import { CalendarClock, MessageCircle } from "lucide-react";
import Link from "next/link";

import { clinician, type Patient } from "@/lib/neuroplay/demo-data";
import { useToast } from "./toast";
import { Avatar, InfoTile, ProgressBar, StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

export function ClinicianCard({ compact = false }: { compact?: boolean }) {
  const toast = useToast();
  return (
    <article className={cx(s.card, s.stack)} aria-labelledby="clinician-name">
      <div className={s.person}>
        <Avatar initials={clinician.initials} size="lg" tone="green" />
        <div>
          <strong id="clinician-name">{clinician.name}</strong>
          <span>{clinician.role}</span>
          {!compact ? <span>{clinician.clinic}</span> : null}
        </div>
      </div>
      <InfoTile icon={CalendarClock} label={`Next ${clinician.nextCheckInType.toLowerCase()}`} value={clinician.nextCheckIn} />
      <div className={s.btnRow}>
        <button
          type="button"
          className={cx(s.btn, s.btnSoft, compact && s.btnBlock)}
          onClick={() => toast(`Message sent to ${clinician.name}`, "Demo — messaging is not connected yet.")}
        >
          <MessageCircle size={18} aria-hidden="true" /> Message
        </button>
        {!compact ? (
          <Link href="/app/care" className={cx(s.btn, s.btnSecondary)}>
            View care team
          </Link>
        ) : null}
      </div>
    </article>
  );
}

const patientStatus = {
  "on-track": { label: "On track", tone: "green" as const },
  "needs-attention": { label: "Needs attention", tone: "amber" as const },
  new: { label: "New", tone: "blue" as const }
};

export function PatientStatusPill({ status }: { status: Patient["status"] }) {
  const meta = patientStatus[status];
  return <StatusPill tone={meta.tone}>{meta.label}</StatusPill>;
}

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <Link href={`/doctor/patients/${patient.id}`} className={cx(s.card, s.cardFlat, s.cardInteractive, s.stack)} style={{ gap: 14 }}>
      <div className={s.planCardFoot}>
        <div className={s.person}>
          <Avatar initials={patient.initials} />
          <div>
            <strong>{patient.name}</strong>
            <span>{patient.program}</span>
          </div>
        </div>
        <PatientStatusPill status={patient.status} />
      </div>
      <ProgressBar label="Recovery progress" value={patient.progress} size="sm" />
      <div className={s.exerciseFacts}>
        <span>Last session: {patient.lastSession}</span>
        <span>Adherence: {patient.adherence}%</span>
      </div>
    </Link>
  );
}
