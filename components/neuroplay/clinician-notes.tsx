"use client";

import { NotebookPen } from "lucide-react";
import { useState } from "react";

import { useToast } from "./toast";
import { SectionHead, cx } from "./ui";
import s from "./neuroplay.module.css";

type Note = { date: string; body: string };

export function ClinicianNotes({ patientName }: { patientName: string }) {
  const toast = useToast();
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    { date: "18 Sep 2026", body: "Steady progress. Keep the final set slow and controlled; review grip hold time at next check-in." }
  ]);

  return (
    <section className={cx(s.card, s.stack)} aria-labelledby="notes-title" style={{ gap: 14 }}>
      <SectionHead title="Clinician notes" subtitle="Visible to the care team" id="notes-title" />
      {notes.map((note, index) => (
        <div className={cx(s.note, s.noteBlue)} key={`${note.date}-${index}`}>
          <NotebookPen size={18} aria-hidden="true" />
          <div>
            <strong style={{ fontSize: "0.8rem" }}>{note.date}</strong>
            <p>{note.body}</p>
          </div>
        </div>
      ))}
      <form
        className={s.stack}
        style={{ gap: 10 }}
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.trim()) return;
          setNotes((current) => [{ date: "Today", body: draft.trim() }, ...current]);
          setDraft("");
          toast("Note added", `Demo — saved locally for ${patientName}.`);
        }}
      >
        <label className={s.field}>
          <span>Add a note</span>
          <textarea className={s.textarea} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Observations, plan adjustments…" />
        </label>
        <button type="submit" className={cx(s.btn, s.btnPrimary)} style={{ justifySelf: "end", opacity: draft.trim() ? 1 : 0.5 }} disabled={!draft.trim()}>
          Save note
        </button>
      </form>
    </section>
  );
}
