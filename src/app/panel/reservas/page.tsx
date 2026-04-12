"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  ReagentRequest,
  SpaceReservation,
  EquipmentReservation,
} from "@/types";

const KIND_TABS = [
  { key: "spaces", label: "Espacios" },
  { key: "equipments", label: "Equipos" },
  { key: "reagents", label: "Reactivos" },
] as const;
type KindKey = (typeof KIND_TABS)[number]["key"];

const STATUS_TABS = [
  { key: "pending", label: "Pendientes" },
  { key: "approved", label: "Aprobadas" },
  { key: "rejected", label: "Rechazadas" },
] as const;
type StatusKey = (typeof STATUS_TABS)[number]["key"];

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  delivered: "bg-blue-100 text-blue-800",
  cancelled: "bg-gray-100 text-gray-700",
};

type AnyReservation =
  | (SpaceReservation & { kind: "spaces" })
  | (EquipmentReservation & { kind: "equipments" })
  | (ReagentRequest & { kind: "reagents" });

export default function PanelReservasPage() {
  const [kind, setKind] = useState<KindKey>("spaces");
  const [status, setStatus] = useState<StatusKey>("pending");
  const [items, setItems] = useState<AnyReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reservations/${kind}?status=${status}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setItems(data.map((d: any) => ({ ...d, kind })));
        } else {
          setItems([]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [kind, status]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleApprove(id: string) {
    setBusyId(id);
    try {
      await fetch(`/api/reservations/${kind}/${id}/approve`, {
        method: "PATCH",
      });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  async function handleReject(id: string) {
    const reason = prompt("Motivo del rechazo (opcional):") ?? "";
    setBusyId(id);
    try {
      await fetch(`/api/reservations/${kind}/${id}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      await load();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">
        Bandeja de Aprobaciones
      </h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Aprueba o rechaza solicitudes. Los estudiantes reciben notificación por
        correo y WhatsApp automáticamente.
      </p>

      {/* Kind tabs */}
      <div className="mt-6 flex gap-2 border-b border-border">
        {KIND_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setKind(t.key)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
              kind === t.key
                ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                : "border-transparent text-[var(--brand-gray)] hover:text-[var(--brand-secondary)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Status sub-tabs */}
      <div className="mt-3 flex gap-2">
        {STATUS_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setStatus(t.key)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              status === t.key
                ? "bg-[var(--brand-primary)] text-white"
                : "bg-gray-100 text-[var(--brand-gray)] hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
            <tr>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">
                {kind === "reagents" ? "Reactivo" : kind === "equipments" ? "Equipo" : "Espacio"}
              </th>
              <th className="px-4 py-3">
                {kind === "reagents" ? "Cantidad" : "Fecha / Bloques"}
              </th>
              <th className="px-4 py-3">Notas / Justificación</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-[var(--brand-gray)]">
                  Cargando...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-[var(--brand-gray)]">
                  Sin solicitudes en este estado
                </td>
              </tr>
            ) : (
              items.map((r) => {
                const resourceId =
                  r.kind === "reagents"
                    ? r.reagentId
                    : r.kind === "equipments"
                      ? r.equipmentId
                      : r.spaceId;
                const qtyOrDate =
                  r.kind === "reagents"
                    ? `${r.quantity} ${r.unit}`
                    : `${new Date(r.date).toLocaleDateString("es-VE")} · ${r.timeBlocks.join(", ")}`;
                const note =
                  r.kind === "reagents" ? r.justification : r.notes;
                return (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{r.userId}</td>
                    <td className="px-4 py-3 font-mono text-xs">{resourceId}</td>
                    <td className="px-4 py-3">{qtyOrDate}</td>
                    <td className="px-4 py-3 text-[var(--brand-gray)]">
                      {note || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                          STATUS_BADGE[r.status] || ""
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {r.status === "pending" ? (
                        <>
                          <button
                            disabled={busyId === r._id}
                            onClick={() => handleApprove(r._id)}
                            className="mr-2 rounded bg-green-600 px-3 py-1 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            Aprobar
                          </button>
                          <button
                            disabled={busyId === r._id}
                            onClick={() => handleReject(r._id)}
                            className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            Rechazar
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-[var(--brand-gray)]">—</span>
                      )}
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
