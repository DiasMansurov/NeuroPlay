"use client";

import { Building2, CalendarClock, FileText, MessageCircle, NotebookPen, Share2, Target, Video } from "lucide-react";
import { useState } from "react";

import { careGoals, clinician, patientProfile } from "@/lib/neuroplay/demo-data";
import { ReportDialog } from "./report-dialog";
import { useToast } from "./toast";
import { Avatar, InfoTile, PageHeader, ProgressBar, SectionHead, StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

export function CareTeam() {
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <div className={s.page}>
      <PageHeader title="Care Team" subtitle="The clinicians supporting your recovery" />

      <div className={s.split}>
        <div className={s.stack}>
          <section className={cx(s.card, s.stack)} aria-labelledby="clinician-title" style={{ gap: 22 }}>
            <div className={s.profileHead}>
              <Avatar initials={clinician.initials} size="xl" tone="green" />
              <div>
                <StatusPill tone="green">Assigned clinician</StatusPill>
                <h2 id="clinician-title">{clinician.name}</h2>
                <p className={s.muted}>{clinician.role}</p>
              </div>
            </div>
            <div className={s.grid2} style={{ gap: 12 }}>
              <InfoTile icon={Building2} label="Clinic" value={clinician.clinic} />
              <InfoTile icon={Video} label={`Next ${clinician.nextCheckInType.toLowerCase()}`} value={clinician.nextCheckIn} />
            </div>
            <div className={s.btnRow}>
              <button
                type="button"
                className={cx(s.btn, s.btnPrimary)}
                onClick={() => document.getElementById("message-box")?.focus()}
              >
                <MessageCircle size={18} aria-hidden="true" /> Send message
              </button>
              <button
                type="button"
                className={cx(s.btn, s.btnSecondary)}
                onClick={() => toast(`Progress shared with ${clinician.name}`, "Demo — sharing is simulated.")}
              >
                <Share2 size={18} aria-hidden="true" /> Share progress
              </button>
              <button type="button" className={cx(s.btn, s.btnSecondary)} onClick={() => setReportOpen(true)}>
                <FileText size={18} aria-hidden="true" /> View report
              </button>
            </div>
          </section>

          <section className={cx(s.card, s.stack)} aria-labelledby="note-title" style={{ gap: 14 }}>
            <SectionHead title="Latest clinician note" subtitle={clinician.lastNote.date} id="note-title" />
            <div className={cx(s.note, s.noteBlue)}>
              <NotebookPen size={18} aria-hidden="true" />
              <p>{clinician.lastNote.body}</p>
            </div>
          </section>

          <section className={cx(s.card, s.stack)} aria-labelledby="message-title" style={{ gap: 14 }}>
            <SectionHead title="Message your care team" subtitle="Replies usually arrive within one working day" id="message-title" />
            <form
              className={s.stack}
              style={{ gap: 12 }}
              onSubmit={(event) => {
                event.preventDefault();
                if (!message.trim()) return;
                setMessage("");
                toast(`Message sent to ${clinician.name}`, "Demo — messaging is not connected yet.");
              }}
            >
              <label className={s.field}>
                <span className={s.srOnly}>Message</span>
                <textarea
                  id="message-box"
                  className={s.textarea}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Ask a question or share how your last session felt…"
                />
              </label>
              <div className={s.btnRow} style={{ justifyContent: "flex-end" }}>
                <button type="submit" className={cx(s.btn, s.btnPrimary)} disabled={!message.trim()} style={{ opacity: message.trim() ? 1 : 0.5 }}>
                  <MessageCircle size={18} aria-hidden="true" /> Send
                </button>
              </div>
            </form>
          </section>
        </div>

        <aside className={s.stack}>
          <section className={cx(s.card, s.stack)} aria-labelledby="goals-title" style={{ gap: 18 }}>
            <SectionHead title="Rehabilitation goals" subtitle="Set with your clinician" id="goals-title" />
            {careGoals.map((goal) => (
              <ProgressBar key={goal.label} label={goal.label} value={goal.progress} tone={goal.progress >= 75 ? "green" : "blue"} />
            ))}
          </section>
          <section className={cx(s.card, s.stack)} aria-labelledby="program-title" style={{ gap: 12 }}>
            <SectionHead title="Your program" id="program-title" />
            <InfoTile icon={Target} label="Program" value={patientProfile.program} />
            <InfoTile icon={CalendarClock} label="Progress" value={`Week ${patientProfile.programWeek} of ${patientProfile.programWeeks}`} />
          </section>
        </aside>
      </div>

      {reportOpen ? <ReportDialog title="Rehabilitation report · This week" onClose={() => setReportOpen(false)} /> : null}
    </div>
  );
}
