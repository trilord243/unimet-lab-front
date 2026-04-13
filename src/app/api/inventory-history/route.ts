import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const url = new URL(`${API_BASE_URL}/inventory-history`);
  for (const key of ["itemType", "action", "performedBy", "limit"]) {
    const v = request.nextUrl.searchParams.get(key);
    if (v) url.searchParams.set(key, v);
  }
  const res = await fetch(url.toString(), {
    headers: token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
