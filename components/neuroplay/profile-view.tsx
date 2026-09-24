"use client";

import { CalendarClock, LogOut, Pencil, Target } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { clinician, patientProfile } from "@/lib/neuroplay/demo-data";
import { useToast } from "./toast";
import { Avatar, InfoTile, PageHeader, ProgressBar, SectionHead, StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

const preferenceItems = [
  { id: "reminders", title: "Daily session reminders", detail: "A gentle nudge at your preferred training time", initial: true },
  { id: "voice", title: "Voice guidance", detail: "Spoken cues during guided sessions", initial: true },
  { id: "share", title: "Share results with care team", detail: "Send session summaries to your clinician automatically", initial: true },
  { id: "motion", title: "Reduced motion", detail: "Minimise animations in the app", initial: false }
];

export function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (value: boolean) => void }) {
  return <button type="button" role="switch" aria-checked={on} aria-label={label} className={cx(s.switch, on && s.switchOn)} onClick={() => onChange(!on)} />;
}

export function ProfileView() {
  const toast = useToast();
  const [prefs, setPrefs] = useState<Record<string, boolean>>(Object.fromEntries(preferenceItems.map((item) => [item.id, item.initial])));
  const programPercent = Math.round((patientProfile.programWeek / patientProfile.programWeeks) * 100);

  return (
    <div className={s.page}>
      <PageHeader title="Profile" subtitle="Your details, program, and preferences" />

      <section className={cx(s.card, s.profileHead)} aria-label="Patient summary">
        <Avatar initials={patientProfile.initials} size="xl" />
        <div>
          <h2>
            {patientProfile.firstName} {patientProfile.lastName}
          </h2>
          <p className={s.muted}>{patientProfile.email}</p>
        </div>
        <button type="button" className={cx(s.btn, s.btnSecondary)} onClick={() => toast("Profile editing is coming soon", "Demo — details are read-only for now.")}>
          <Pencil size={16} aria-hidden="true" /> Edit profile
        </button>
      </section>

      <div className={s.grid2}>
        <section className={s.card} aria-labelledby="personal-title">
          <SectionHead title="Personal information" id="personal-title" />
          <div className={s.kv}>
            <div className={s.kvRow}>
              <span>Full name</span>
              <span>
                {patientProfile.firstName} {patientProfile.lastName}
              </span>
            </div>
            <div className={s.kvRow}>
              <span>Date of birth</span>
              <span>{patientProfile.dateOfBirth}</span>
            </div>
            <div className={s.kvRow}>
              <span>Email</span>
              <span>{patientProfile.email}</span>
            </div>
            <div className={s.kvRow}>
              <span>Phone</span>
              <span>{patientProfile.phone}</span>
            </div>
          </div>
        </section>

        <section className={cx(s.card, s.stack)} aria-labelledby="program-title" style={{ gap: 16 }}>
          <SectionHead title="Rehabilitation program" id="program-title" />
          <InfoTile icon={Target} label="Program" value={patientProfile.program} />
          <InfoTile icon={CalendarClock} label="Started" value={patientProfile.startDate} />
          <ProgressBar
            label="Program progress"
            value={programPercent}
            valueLabel={`Week ${patientProfile.programWeek} of ${patientProfile.programWeeks}`}
          />
          <div className={s.detailTags}>
            {patientProfile.focusAreas.map((area) => (
              <StatusPill key={area} tone="blue">
                {area}
              </StatusPill>
            ))}
          </div>
        </section>

        <section className={cx(s.card, s.stack)} aria-labelledby="care-title" style={{ gap: 16 }}>
          <SectionHead title="Care team" id="care-title" />
          <div className={s.person}>
            <Avatar initials={clinician.initials} size="lg" tone="green" />
            <div>
              <strong>{clinician.name}</strong>
              <span>
                {clinician.role} · {clinician.clinic}
              </span>
            </div>
          </div>
          <Link href="/app/care" className={cx(s.btn, s.btnSoft)} style={{ width: "fit-content" }}>
            Open care team
          </Link>
        </section>

        <section className={s.card} id="preferences" aria-labelledby="prefs-title" style={{ scrollMarginTop: 90 }}>
          <SectionHead title="Preferences" id="prefs-title" />
          <div>
            {preferenceItems.map((item) => (
              <div className={s.toggleRow} key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
                <Toggle
                  label={item.title}
                  on={prefs[item.id]}
                  onChange={(value) => {
                    setPrefs((current) => ({ ...current, [item.id]: value }));
                    toast(`${item.title} ${value ? "on" : "off"}`);
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div>
        <Link href="/" className={cx(s.btn, s.btnDanger)}>
          <LogOut size={18} aria-hidden="true" /> Sign out
        </Link>
      </div>
    </div>
  );
}
