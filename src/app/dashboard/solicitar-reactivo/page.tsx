"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Reagent } from "@/types";

export default function SolicitarReactivoPage() {
  const router = useRouter();
  const [reagents, setReagents] = useState<Reagent[]>([]);
  const [reagentId, setReagentId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("g");
  const [justification, setJustification] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/reagents")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReagents(data);
          if (data[0]) {
            setReagentId(data[0]._id);
            setUnit(data[0].unit);
          }
        }
      });
  }, []);

  const selected = reagents.find((r) => r._id === reagentId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations/reagents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reagentId,
          quantity: Number(quantity),
          unit,
          justification,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || "Error al enviar solicitud");
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push("/dashboard/mis-reservas"), 1500);
    } catch {
      setError("Error de conexión");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="titular text-[var(--brand-secondary)]">
        Solicitar Reactivo
      </h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Indica el reactivo, cantidad y justifica tu solicitud. El profesor la
        recibirá por correo y WhatsApp.
      </p>

      {success ? (
        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="font-bold text-green-700">
            ✅ Solicitud enviada correctamente
          </p>
          <p className="mt-2 text-sm text-green-600">
            Redirigiendo a Mis Reservas...
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-xl border border-border bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">Reactivo *</label>
            <select
              required
              value={reagentId}
              onChange={(e) => {
                setReagentId(e.target.value);
                const r = reagents.find((x) => x._id === e.target.value);
                if (r) setUnit(r.unit);
              }}
              className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
            >
              <option value="">— Selecciona un reactivo —</option>
              {reagents.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name} {r.formula ? `(${r.formula})` : ""} — disponible:{" "}
                  {r.quantity} {r.unit}
                </option>
              ))}
            </select>
          </div>

          {selected && (
            <div className="rounded-md bg-blue-50 p-3 text-sm text-[var(--brand-primary)]">
              <strong>{selected.name}</strong>
              {selected.hazardClass && (
                <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-[var(--brand-orange-secondary)]">
                  {selected.hazardClass}
                </span>
              )}
              {selected.location && (
                <p className="mt-1 text-xs text-[var(--brand-gray)]">
                  Ubicación: {selected.location}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Cantidad *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Unidad *</label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Justificación
            </label>
            <textarea
              rows={4}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="¿Para qué práctica/proyecto necesitas este reactivo?"
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
            disabled={submitting || !reagentId}
            className="w-full rounded-md bg-[var(--brand-primary)] py-2 font-bold text-white hover:bg-[var(--brand-secondary)] disabled:opacity-50"
          >
            {submitting ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>
      )}
    </div>
  );
}
