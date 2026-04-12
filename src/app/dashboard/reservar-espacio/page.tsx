"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Space } from "@/types";
import { TimeBlockPicker } from "@/components/reservations/time-block-picker";

export default function ReservarEspacioPage() {
  const router = useRouter();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [spaceId, setSpaceId] = useState("");
  const [date, setDate] = useState("");
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/spaces")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setSpaces(d);
          if (d[0]) setSpaceId(d[0]._id);
        }
      });
    fetch("/api/reservations/time-blocks")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setBlocks(d);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!selectedBlocks.length) {
      setError("Selecciona al menos un bloque horario");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations/spaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId,
          date,
          timeBlocks: selectedBlocks,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || "Error al enviar");
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
      <h1 className="titular text-[var(--brand-secondary)]">Reservar Espacio</h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Selecciona el espacio, fecha y bloques horarios que necesitas.
      </p>

      {success ? (
        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="font-bold text-green-700">
            ✅ Reserva enviada. Redirigiendo a Mis Reservas...
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-xl border border-border bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">Espacio *</label>
            <select
              required
              value={spaceId}
              onChange={(e) => setSpaceId(e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
            >
              <option value="">— Selecciona —</option>
              {spaces.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                  {s.capacity ? ` (cap. ${s.capacity})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Fecha *</label>
            <input
              type="date"
              required
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Bloques horarios * (puedes elegir varios)
            </label>
            <TimeBlockPicker
              blocks={blocks}
              selected={selectedBlocks}
              onChange={setSelectedBlocks}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Notas</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="¿Para qué práctica o actividad?"
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
            disabled={submitting || !spaceId || !date}
            className="w-full rounded-md bg-[var(--brand-primary)] py-2 font-bold text-white hover:bg-[var(--brand-secondary)] disabled:opacity-50"
          >
            {submitting ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>
      )}
    </div>
  );
}
