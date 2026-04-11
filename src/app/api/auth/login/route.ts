import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const COOKIE_NAME = "auth-token";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60,
  path: "/",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 },
      );
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Error de autenticación" },
        { status: response.status },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, data.access_token, COOKIE_OPTIONS);

    return NextResponse.json(
      {
        success: true,
        user: data.user,
        access_token: data.access_token,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error("login error", e);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
