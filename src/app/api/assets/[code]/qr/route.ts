import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface RouteCtx {
  params: Promise<{ code: string }>;
}

export async function GET(req: NextRequest, ctx: RouteCtx) {
  const { code } = await ctx.params;
  const url = new URL(`${API_BASE_URL}/assets/${code}/qr`);
  for (const key of ["format", "size"]) {
    const v = req.nextUrl.searchParams.get(key);
    if (v) url.searchParams.set(key, v);
  }
  const res = await fetch(url.toString());
  const buf = await res.arrayBuffer();
  return new NextResponse(buf, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
