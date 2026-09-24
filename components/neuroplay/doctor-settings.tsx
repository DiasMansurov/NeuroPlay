"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { clinician } from "@/lib/neuroplay/demo-data";
import { Toggle } from "./profile-view";
import { useToast } from "./toast";
import { Avatar, PageHeader, SectionHead, cx } from "./ui";
import s from "./neuroplay.module.css";

const alerts = [
  { id: "missed", title: "Missed sessions", detail: "Alert when a patient misses 3 sessions in a row", initial: true },
  { id: "adherence", title: "Low adherence", detail: "Alert when weekly adherence drops below 60%", initial: true },
  { id: "milestone", title: "Milestones", detail: "Notify when a patient reaches a rehabilitation goal", initial: false },
  { id: "digest", title: "Weekly digest", detail: "Monday summary of all patients by email", initial: true }
];

export function DoctorSettings() {
  const toast = useToast();
  const [prefs, setPrefs] = useState<Record<string, boolean>>(Object.fromEntries(alerts.map((item) => [item.id, item.initial])));

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast("Profile saved", "Demo — changes are kept in this session only.");
  }

  return (
    <div className={s.page}>
      <PageHeader title="Settings" subtitle="Your clinician profile and notifications" />

      <div className={s.grid2}>
        <section className={cx(s.card, s.stack)} aria-labelledby="profile-title" style={{ gap: 18 }}>
          <SectionHead title="Clinician profile" id="profile-title" />
          <div className={s.person}>
            <Avatar initials={clinician.initials} size="lg" tone="green" />
            <div>
              <strong>{clinician.name}</strong>
              <span>{clinician.role}</span>
            </div>
          </div>
          <form className={s.stack} style={{ gap: 14 }} onSubmit={save}>
            <label className={s.field}>
              <span>Display name</span>
              <input className={s.input} defaultValue={clinician.name} />
            </label>
            <label className={s.field}>
              <span>Role</span>
              <input className={s.input} defaultValue={clinician.role} />
            </label>
            <label className={s.field}>
              <span>Clinic</span>
              <input className={s.input} defaultValue={clinician.clinic} />
            </label>
            <button type="submit" className={cx(s.btn, s.btnPrimary)} style={{ justifySelf: "start" }}>
              Save changes
            </button>
          </form>
        </section>

        <div className={s.stack}>
          <section className={s.card} aria-labelledby="alerts-title">
            <SectionHead title="Patient alerts" id="alerts-title" />
            {alerts.map((item) => (
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
                    toast(`${item.title} alerts ${value ? "on" : "off"}`);
                  }}
                />
              </div>
            ))}
          </section>
          <Link href="/" className={cx(s.btn, s.btnDanger)} style={{ justifySelf: "start" }}>
            <LogOut size={18} aria-hidden="true" /> Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}
