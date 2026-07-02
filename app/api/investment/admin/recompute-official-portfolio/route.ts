import { NextResponse } from "next/server";

import { requireInvestmentAdmin } from "@/lib/server-investment-admin-auth";
import { recomputeOfficialInvestmentPortfolio } from "@/lib/server-investments";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

function noStoreJson(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return NextResponse.json(body, { ...init, headers });
}

export async function POST(request: Request) {
  const organizer = await requireInvestmentAdmin();
  if (organizer.errorResponse) {
    return noStoreJson({ ok: false, error: "Admin access required" }, { status: 403 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    teamId?: string;
    competitionId?: string;
    competitionCode?: string;
    dryRun?: boolean;
  };

  if (!body.teamId && !body.competitionId && !body.competitionCode) {
    body.competitionCode = "Teenvestor.school";
  }

  try {
    const result = await recomputeOfficialInvestmentPortfolio({
      teamId: body.teamId,
      competitionId: body.competitionId,
      competitionCode: body.competitionCode,
      dryRun: body.dryRun !== false
    });
    console.info(
      "INVESTMENT_ADMIN_RECOMPUTE_OFFICIAL_PORTFOLIO",
      JSON.stringify({
        adminEmail: organizer.userEmail ?? null,
        teamId: body.teamId ?? null,
        competitionId: body.competitionId ?? null,
        competitionCode: body.competitionCode ?? null,
        dryRun: body.dryRun !== false,
        teamsProcessed: result.ok ? result.results.length : 0,
        teamsChanged: result.ok ? result.results.filter((row) => row.changed).length : 0,
        timestamp: new Date().toISOString()
      })
    );
    const status = result.ok ? 200 : 400;
    return noStoreJson(result, { status });
  } catch (error) {
    return noStoreJson(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error ?? "Failed to recompute official portfolio.")
      },
      { status: 500 }
    );
  }
}
