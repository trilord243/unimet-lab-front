"use client";

import { useEffect, useState } from "react";
import type {
  ReagentRequest,
  SpaceReservation,
  EquipmentReservation,
} from "@/types";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  approved: { label: "Aprobada", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rechazada", color: "bg-red-100 text-red-800" },
  delivered: { label: "Entregada", color: "bg-blue-100 text-blue-800" },
  cancelled: { label: "Cancelada", color: "bg-gray-100 text-gray-700" },
  completed: { label: "Completada", color: "bg-blue-100 text-blue-800" },
};

const TABS = [
  { key: "spaces", label: "Espacios" },
  { key: "equipments", label: "Equipos" },
  { key: "reagents", label: "Reactivos" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function MisReservasPage() {
  const [tab, setTab] = useState<TabKey>("spaces");
  const [spaces, setSpaces] = useState<SpaceReservation[]>([]);
  const [equipments, setEquipments] = useState<EquipmentReservation[]>([]);
  const [reagents, setReagents] = useState<ReagentRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/reservations/spaces/mine").then((r) => r.json()),
      fetch("/api/reservations/equipments/mine").then((r) => r.json()),
      fetch("/api/reservations/reagents/mine").then((r) => r.json()),
    ]).then(([s, e, r]) => {
      if (Array.isArray(s)) setSpaces(s);
      if (Array.isArray(e)) setEquipments(e);
      if (Array.isArray(r)) setReagents(r);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">Mis Reservas</h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Estado de todas tus solicitudes.
      </p>

      <div className="mt-6 flex gap-2 border-b border-border">
        {TABS.map((t) => {
          const count =
            t.key === "spaces"
              ? spaces.length
              : t.key === "equipments"
                ? equipments.length
                : reagents.length;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
                  : "border-transparent text-[var(--brand-gray)] hover:text-[var(--brand-secondary)]"
              }`}
            >
              {t.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-[var(--brand-gray)]">
            Cargando...
          </div>
        ) : tab === "spaces" ? (
          <SimpleTable
            headers={["Espacio", "Fecha", "Bloques", "Notas", "Estado"]}
            rows={spaces.map((s) => [
              <span key="id" className="font-mono text-xs">{s.spaceId}</span>,
              new Date(s.date).toLocaleDateString("es-VE"),
              s.timeBlocks.join(", "),
              s.notes || "—",
              <StatusBadge key="st" status={s.status} />,
            ])}
          />
        ) : tab === "equipments" ? (
          <SimpleTable
            headers={["Equipo", "Fecha", "Bloques", "Notas", "Estado"]}
            rows={equipments.map((e) => [
              <span key="id" className="font-mono text-xs">{e.equipmentId}</span>,
              new Date(e.date).toLocaleDateString("es-VE"),
              e.timeBlocks.join(", "),
              e.notes || "—",
              <StatusBadge key="st" status={e.status} />,
            ])}
          />
        ) : (
          <SimpleTable
            headers={["Reactivo", "Cantidad", "Justificación", "Estado"]}
            rows={reagents.map((r) => [
              <span key="id" className="font-mono text-xs">{r.reagentId}</span>,
              `${r.quantity} ${r.unit}`,
              r.justification || "—",
              <StatusBadge key="st" status={r.status} />,
            ])}
          />
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_LABELS[status] || STATUS_LABELS.pending!;
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${s.color}`}>
      {s.label}
    </span>
  );
}

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-4 py-3">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.length === 0 ? (
          <tr>
            <td
              colSpan={headers.length}
              className="px-4 py-12 text-center text-[var(--brand-gray)]"
            >
              No tienes solicitudes en esta categoría
            </td>
          </tr>
        ) : (
          rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
