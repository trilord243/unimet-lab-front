import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function authHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  const url = new URL(`${API_BASE_URL}/materials`);
  if (q) url.searchParams.set("q", q);
  const res = await fetch(url.toString(), { headers: await authHeaders() });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(`${API_BASE_URL}/materials`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
