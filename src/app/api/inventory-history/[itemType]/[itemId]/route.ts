import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface RouteCtx {
  params: Promise<{ itemType: string; itemId: string }>;
}

export async function GET(_req: NextRequest, ctx: RouteCtx) {
  const { itemType, itemId } = await ctx.params;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const res = await fetch(
    `${API_BASE_URL}/inventory-history/${itemType}/${itemId}`,
    {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        : { "Content-Type": "application/json" },
    },
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
