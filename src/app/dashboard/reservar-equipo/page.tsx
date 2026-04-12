"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Equipment } from "@/types";
import { TimeBlockPicker } from "@/components/reservations/time-block-picker";

export default function ReservarEquipoPage() {
  const router = useRouter();
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [equipmentId, setEquipmentId] = useState("");
  const [date, setDate] = useState("");
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/equipments")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setEquipments(d);
          if (d[0]) setEquipmentId(d[0]._id);
        }
      });
    fetch("/api/reservations/time-blocks")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setBlocks(d);
      });
  }, []);

  const selected = equipments.find((e) => e._id === equipmentId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!selectedBlocks.length) {
      setError("Selecciona al menos un bloque horario");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations/equipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipmentId,
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
      <h1 className="titular text-[var(--brand-secondary)]">Reservar Equipo</h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Selecciona el equipo, fecha y bloques horarios.
      </p>

      {success ? (
        <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="font-bold text-green-700">
            ✅ Reserva enviada. Redirigiendo...
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-xl border border-border bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">Equipo *</label>
            <select
              required
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
            >
              <option value="">— Selecciona —</option>
              {equipments.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                  {e.brand ? ` (${e.brand})` : ""}
                </option>
              ))}
            </select>
          </div>

          {selected?.description && (
            <div className="rounded-md bg-blue-50 p-3 text-sm text-[var(--brand-primary)]">
              {selected.description}
            </div>
          )}

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
            disabled={submitting || !equipmentId || !date}
            className="w-full rounded-md bg-[var(--brand-primary)] py-2 font-bold text-white hover:bg-[var(--brand-secondary)] disabled:opacity-50"
          >
            {submitting ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>
      )}
    </div>
  );
}
