"use client";

import { Search, SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { patients, type Patient } from "@/lib/neuroplay/demo-data";
import { PatientTable } from "./patient-table";
import { cx } from "./ui";
import s from "./neuroplay.module.css";

const filters: { id: Patient["status"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "on-track", label: "On track" },
  { id: "needs-attention", label: "Needs attention" },
  { id: "new", label: "New" }
];

export function PatientDirectory() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [status, setStatus] = useState<(typeof filters)[number]["id"]>("all");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return patients.filter(
      (patient) =>
        (status === "all" || patient.status === status) &&
        (!needle || [patient.name, patient.program, patient.condition].some((text) => text.toLowerCase().includes(needle)))
    );
  }, [query, status]);

  return (
    <div className={s.stack} style={{ gap: 20 }}>
      <div className={s.toolbar}>
        <label className={s.searchBox}>
          <Search size={18} aria-hidden="true" />
          <span className={s.srOnly}>Search patients</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, program, or condition" />
        </label>
        <div className={s.chips} role="group" aria-label="Filter by status">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={cx(s.chip, status === filter.id && s.chipActive)}
              aria-pressed={status === filter.id}
              onClick={() => setStatus(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <section className={s.card} aria-label="Patient list">
        <p className={s.cardSub} style={{ marginBottom: 12 }} aria-live="polite">
          {results.length} {results.length === 1 ? "patient" : "patients"}
        </p>
        {results.length ? (
          <PatientTable patients={results} />
        ) : (
          <div className={s.empty}>
            <SearchX size={28} aria-hidden="true" />
            <p>No patients match your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}
