"use client";

import { useEffect, useState } from "react";
import type { ReagentRequest } from "@/types";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Aprobada", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rechazada", color: "bg-red-100 text-red-800" },
  delivered: { label: "Entregada", color: "bg-blue-100 text-blue-800" },
  cancelled: { label: "Cancelada", color: "bg-gray-100 text-gray-700" },
  completed: { label: "Completada", color: "bg-blue-100 text-blue-800" },
};

export default function MisReservasPage() {
  const [reagents, setReagents] = useState<ReagentRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reservations/reagents/mine")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setReagents(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">Mis Reservas</h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Estado de todas tus solicitudes.
      </p>

      <h2 className="mt-8 mb-3 text-lg font-bold text-[var(--brand-secondary)]">
        Solicitudes de reactivos
      </h2>
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
            <tr>
              <th className="px-4 py-3">Reactivo</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Justificación</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-[var(--brand-gray)]">
                  Cargando...
                </td>
              </tr>
            ) : reagents.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-[var(--brand-gray)]">
                  No tienes solicitudes aún
                </td>
              </tr>
            ) : (
              reagents.map((r) => {
                const status = STATUS_LABELS[r.status] || STATUS_LABELS.pending!;
                return (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{r.reagentId}</td>
                    <td className="px-4 py-3">
                      {r.quantity} {r.unit}
                    </td>
                    <td className="px-4 py-3 text-[var(--brand-gray)]">
                      {r.justification || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
