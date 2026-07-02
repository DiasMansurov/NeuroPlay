"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { formatPercent, formatUsd } from "@/lib/investment-challenge";

type RecomputeRow = {
  accountId: string;
  teamName: string;
  oldCashBalance: number;
  newCashBalance: number;
  oldTotalPortfolioValue: number;
  newTotalPortfolioValue: number;
  oldReturnPercent: number;
  newReturnPercent: number;
  cashCorrection: number;
  realizedPnl: number;
  unrealizedPnl: number;
  commissions: number;
  ignoredTrades?: Array<{ id: string; symbol: string; reason: string }>;
  suspiciousTrades?: Array<{ id: string; symbol: string; reason: string }>;
  changed: boolean;
};

type RecomputePayload = {
  ok?: boolean;
  dryRun?: boolean;
  repairedCount?: number;
  results?: RecomputeRow[];
  reason?: string;
  error?: string;
};

type RecomputeState = {
  busy: boolean;
  message: string | null;
  error: string | null;
  rows: RecomputeRow[];
};

export function AdminOfficialRecomputeButton({
  teamId,
  competitionId,
  label = "Dry run recompute",
  applyLabel = "Apply recompute",
  includeApply = true
}: {
  teamId?: string;
  competitionId?: string;
  label?: string;
  applyLabel?: string;
  includeApply?: boolean;
}) {
  const router = useRouter();
  const [state, setState] = useState<RecomputeState>({ busy: false, message: null, error: null, rows: [] });

  async function runRecompute(dryRun: boolean) {
    if (!dryRun) {
      const confirmed = window.confirm(
        "This will save corrected official cash, portfolio snapshots, and leaderboard values. Raw trades and teams will not be deleted. Continue?"
      );
      if (!confirmed) return;
    }

    setState({ busy: true, message: dryRun ? "Running dry-run recompute..." : "Applying official recompute...", error: null, rows: [] });
    try {
      const response = await fetch("/api/investment/admin/recompute-official-portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          teamId,
          competitionId,
          competitionCode: teamId || competitionId ? undefined : "Teenvestor.school",
          dryRun
        })
      });
      const payload = (await response.json().catch(() => ({}))) as RecomputePayload;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.reason ?? payload.error ?? "Official recompute failed.");
      }
      const rows = payload.results ?? [];
      const changed = rows.filter((row) => row.changed).length;
      setState({
        busy: false,
        message: `${dryRun ? "Dry run complete" : "Recompute applied"}: ${rows.length} team${rows.length === 1 ? "" : "s"} processed, ${changed} changed.`,
        error: null,
        rows
      });
      if (!dryRun) router.refresh();
    } catch (error) {
      setState({
        busy: false,
        message: null,
        error: error instanceof Error ? error.message : "Official recompute failed.",
        rows: []
      });
    }
  }

  const first = state.rows[0];
  const ignoredCount = state.rows.reduce((sum, row) => sum + (row.ignoredTrades?.length ?? 0), 0);
  const suspiciousCount = state.rows.reduce((sum, row) => sum + (row.suspiciousTrades?.length ?? 0), 0);

  return (
    <div className="admin-results-refresh-action">
      <button className="button secondary" type="button" onClick={() => void runRecompute(true)} disabled={state.busy}>
        {state.busy ? "Working..." : label}
      </button>
      {includeApply ? (
        <button className="button primary" type="button" onClick={() => void runRecompute(false)} disabled={state.busy}>
          {state.busy ? "Working..." : applyLabel}
        </button>
      ) : null}
      {state.message ? <span className="admin-refresh-message positive-text">{state.message}</span> : null}
      {state.error ? <span className="admin-refresh-message negative-text">{state.error}</span> : null}
      {first ? (
        <div className="investment-recompute-summary">
          <span>{teamId ? first.teamName : `${state.rows.filter((row) => row.changed).length} changed teams`}</span>
          <span>
            Value: {formatUsd(first.oldTotalPortfolioValue)} → {formatUsd(first.newTotalPortfolioValue)}
          </span>
          <span>
            Return: {formatPercent(first.oldReturnPercent)} → {formatPercent(first.newReturnPercent)}
          </span>
          <span>Cash correction: {formatUsd(first.cashCorrection)}</span>
          <span>Commissions: {formatUsd(first.commissions)}</span>
          <span>Ignored: {ignoredCount}</span>
          <span>Suspicious: {suspiciousCount}</span>
        </div>
      ) : null}
    </div>
  );
}
