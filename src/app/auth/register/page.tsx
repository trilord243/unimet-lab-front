"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo registrar");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-primary)] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <Link
          href="/"
          className="mb-6 block text-center text-3xl font-black text-[var(--brand-secondary)]"
        >
          Lab<span className="text-[var(--brand-orange)]">UNIMET</span>
        </Link>

        <h1 className="mb-2 text-2xl font-bold text-[var(--brand-secondary)]">
          Crear cuenta
        </h1>
        <p className="mb-6 text-sm text-[var(--brand-gray)]">
          Solo correos institucionales{" "}
          <code>@unimet.edu.ve</code> o <code>@correo.unimet.edu.ve</code>.
        </p>

        {success ? (
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
            Cuenta creada. Revisa tu correo para verificarla y luego inicia
            sesión.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Nombre completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Correo institucional
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@correo.unimet.edu.ve"
                className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Contraseña
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
              />
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[var(--brand-primary)] py-2 font-bold text-white hover:bg-[var(--brand-secondary)] disabled:opacity-50"
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-[var(--brand-gray)]">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/auth/login"
            className="font-bold text-[var(--brand-primary)] hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
