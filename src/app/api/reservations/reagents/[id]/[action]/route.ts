import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface RouteCtx {
  params: Promise<{ id: string; action: string }>;
}

export async function PATCH(req: NextRequest, ctx: RouteCtx) {
  const { id, action } = await ctx.params;
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "Acción inválida" }, { status: 400 });
  }
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  const body = action === "reject" ? await req.json().catch(() => ({})) : {};
  const res = await fetch(
    `${API_BASE_URL}/reservations/reagents/${id}/${action}`,
    {
      method: "PATCH",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        : { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
