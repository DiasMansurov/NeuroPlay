"use client";

import { Activity, Clock, Dumbbell, Eye, FilePlus2, FileText, Share2 } from "lucide-react";
import { useState } from "react";

import { reports as initialReports, type Report } from "@/lib/neuroplay/demo-data";
import { ReportDialog } from "./report-dialog";
import { useToast } from "./toast";
import { PageHeader, StatusPill, cx } from "./ui";
import s from "./neuroplay.module.css";

export function ReportsList() {
  const toast = useToast();
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [open, setOpen] = useState<Report | null>(null);

  function generate() {
    const report: Report = {
      id: `r-new-${reports.length}`,
      range: "22 – 24 Sep 2026",
      sessions: 3,
      trainingTime: "1h 02m",
      avgPerformance: 89,
      status: "ready"
    };
    setReports((current) => [report, ...current]);
    toast("Progress report generated", "Demo — created from this week's sessions.");
  }

  return (
    <div className={s.page}>
      <PageHeader
        title="Reports"
        subtitle="Summaries of your rehabilitation to review or share with your care team"
        actions={
          <button type="button" className={cx(s.btn, s.btnPrimary)} onClick={generate}>
            <FilePlus2 size={18} aria-hidden="true" /> Generate Progress Report
          </button>
        }
      />

      <div className={s.stack} style={{ gap: 14 }}>
        {reports.map((report) => (
          <article className={cx(s.card, s.cardFlat, s.reportCard)} key={report.id} aria-labelledby={`${report.id}-title`}>
            <span className={s.reportIcon}>
              <FileText size={22} aria-hidden="true" />
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h2 id={`${report.id}-title`} className={s.cardTitle}>
                  {report.range}
                </h2>
                {report.status === "shared" ? (
                  <StatusPill tone="green" icon={Share2}>
                    Shared with care team
                  </StatusPill>
                ) : (
                  <StatusPill tone="gray">Ready</StatusPill>
                )}
              </div>
              <div className={s.reportStats}>
                <span>
                  <Dumbbell size={15} aria-hidden="true" /> {report.sessions} sessions
                </span>
                <span>
                  <Clock size={15} aria-hidden="true" /> {report.trainingTime}
                </span>
                <span>
                  <Activity size={15} aria-hidden="true" /> {report.avgPerformance}% avg. performance
                </span>
              </div>
            </div>
            <div className={s.btnRow}>
              <button type="button" className={cx(s.btn, s.btnSecondary, s.btnSm)} onClick={() => setOpen(report)}>
                <Eye size={16} aria-hidden="true" /> View
              </button>
              <button
                type="button"
                className={cx(s.btn, s.btnSoft, s.btnSm)}
                onClick={() => {
                  setReports((current) => current.map((item) => (item.id === report.id ? { ...item, status: "shared" } : item)));
                  toast("Report shared with Dr. Sarah Chen", "Demo — sharing is simulated.");
                }}
                disabled={report.status === "shared"}
                style={{ opacity: report.status === "shared" ? 0.5 : 1 }}
              >
                <Share2 size={16} aria-hidden="true" /> Share
              </button>
            </div>
          </article>
        ))}
      </div>

      {open ? (
        <ReportDialog
          title={`Rehabilitation report · ${open.range}`}
          summary={{ sessions: open.sessions, trainingTime: open.trainingTime, avgPerformance: open.avgPerformance }}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </div>
  );
}
