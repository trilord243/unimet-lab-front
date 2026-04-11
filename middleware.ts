import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "changeme_unimet_lab_secret",
);
const COOKIE_NAME = "auth-token";

const protectedRoutes = ["/dashboard", "/panel", "/admin"];
const authRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuth = authRoutes.some((r) => pathname.startsWith(r));

  const token = request.cookies.get(COOKIE_NAME)?.value;
  let isAuthenticated = false;
  let role: string | undefined;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      isAuthenticated = true;
      role = (payload as { role?: string })?.role;
    } catch {
      isAuthenticated = false;
    }
  }

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated) {
    // Estudiantes no entran a /panel ni /admin
    if (
      (pathname.startsWith("/panel") || pathname.startsWith("/admin")) &&
      role === "student"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Solo superadmin entra a /admin
    if (pathname.startsWith("/admin") && role !== "superadmin") {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
    // Profesor/superadmin no necesita /dashboard de estudiante
    if (
      pathname.startsWith("/dashboard") &&
      (role === "professor" || role === "superadmin")
    ) {
      return NextResponse.redirect(new URL("/panel", request.url));
    }
  }

  if (isAuth && isAuthenticated) {
    const redirectTo =
      role === "superadmin"
        ? "/admin/dashboard"
        : role === "professor"
          ? "/panel"
          : "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
