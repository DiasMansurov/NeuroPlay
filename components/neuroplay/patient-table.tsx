"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { Patient } from "@/lib/neuroplay/demo-data";
import { PatientCard, PatientStatusPill } from "./people";
import { Avatar, cx } from "./ui";
import s from "./neuroplay.module.css";

export function PatientTable({ patients }: { patients: Patient[] }) {
  const router = useRouter();

  return (
    <>
      <div className={s.tableWrap} style={{ overflowX: "auto" }}>
        <table className={s.table}>
          <thead>
            <tr>
              <th scope="col">Patient</th>
              <th scope="col">Program</th>
              <th scope="col">Recovery progress</th>
              <th scope="col">Last session</th>
              <th scope="col">Adherence</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} onClick={() => router.push(`/doctor/patients/${patient.id}`)}>
                <td>
                  <Link href={`/doctor/patients/${patient.id}`} className={s.person} onClick={(event) => event.stopPropagation()}>
                    <Avatar initials={patient.initials} />
                    <div>
                      <strong>{patient.name}</strong>
                      <span>{patient.age} yrs</span>
                    </div>
                  </Link>
                </td>
                <td className={s.muted}>{patient.program}</td>
                <td>
                  <div className={s.tableProgress}>
                    <div className={cx(s.track, s.trackSm)} role="progressbar" aria-valuenow={patient.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${patient.name} recovery progress`}>
                      <i className={s.fill} style={{ width: `${patient.progress}%` }} />
                    </div>
                    <span>{patient.progress}%</span>
                  </div>
                </td>
                <td className={s.muted} style={{ whiteSpace: "nowrap" }}>
                  {patient.lastSession}
                </td>
                <td style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{patient.adherence}%</td>
                <td>
                  <PatientStatusPill status={patient.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.patientCards}>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </>
  );
}
