import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface RouteCtx {
  params: Promise<{ code: string }>;
}

export async function GET(_req: Request, ctx: RouteCtx) {
  const { code } = await ctx.params;
  const res = await fetch(`${API_BASE_URL}/assets/${code}`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
