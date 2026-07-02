import { NextResponse } from "next/server";

import { requireInvestmentAdmin } from "@/lib/server-investment-admin-auth";
import { getInvestmentShortAudit } from "@/lib/server-investments";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

function noStoreJson(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return NextResponse.json(body, { ...init, headers });
}

export async function GET(request: Request) {
  const organizer = await requireInvestmentAdmin();
  if (organizer.errorResponse) {
    return noStoreJson({ ok: false, error: "Admin access required" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId")?.trim();
  if (!teamId) return noStoreJson({ ok: false, error: "teamId is required." }, { status: 400 });

  try {
    const result = await getInvestmentShortAudit(teamId);
    return noStoreJson(result, { status: result.ok ? 200 : 400 });
  } catch (error) {
    return noStoreJson(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error ?? "Failed to run short audit.")
      },
      { status: 500 }
    );
  }
}
