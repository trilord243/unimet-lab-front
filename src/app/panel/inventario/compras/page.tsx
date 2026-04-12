"use client";

import { useCallback, useEffect, useState } from "react";
import type { Purchase } from "@/types";
import {
  GenericFormDialog,
  type Field,
} from "@/components/inventory/generic-form-dialog";

const FIELDS: Field[] = [
  { key: "itemName", label: "Nombre del ítem", required: true },
  { key: "estimatedQuantity", label: "Cantidad estimada", type: "number" },
  { key: "unit", label: "Unidad" },
  { key: "estimatedCost", label: "Costo estimado (USD)", type: "number" },
  {
    key: "urgency",
    label: "Urgencia",
    type: "select",
    required: true,
    options: ["low", "normal", "high", "critical"],
  },
  {
    key: "status",
    label: "Estado",
    type: "select",
    required: true,
    options: ["pending", "approved", "purchased", "rejected"],
  },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    fullWidth: true,
  },
  {
    key: "justification",
    label: "Justificación",
    type: "textarea",
    fullWidth: true,
  },
];

const URGENCY_COLOR: Record<string, string> = {
  low: "bg-gray-100 text-gray-700",
  normal: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  purchased: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
};

export default function ComprasPage() {
  const [items, setItems] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Purchase | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/purchases");
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(r: Purchase) {
    if (!confirm(`¿Eliminar "${r.itemName}"?`)) return;
    const res = await fetch(`/api/purchases/${r._id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="titular text-[var(--brand-secondary)]">
            Compras Requeridas
          </h1>
          <p className="mt-1 text-[var(--brand-gray)]">
            {items.length} solicitudes de compra
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
          className="rounded-md bg-[var(--brand-primary)] px-4 py-2 font-bold text-white hover:bg-[var(--brand-secondary)]"
        >
          + Nueva compra
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
            <tr>
              <th className="px-4 py-3">Ítem</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Costo est.</th>
              <th className="px-4 py-3">Urgencia</th>
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
                  Sin solicitudes de compra registradas
                </td>
              </tr>
            ) : (
              items.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-[var(--brand-secondary)]">
                    {p.itemName}
                  </td>
                  <td className="px-4 py-3 text-[var(--brand-gray)]">
                    {p.estimatedQuantity
                      ? `${p.estimatedQuantity} ${p.unit || ""}`
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-[var(--brand-gray)]">
                    {p.estimatedCost ? `$${p.estimatedCost}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${URGENCY_COLOR[p.urgency] || ""}`}
                    >
                      {p.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_COLOR[p.status] || ""}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setEditing(p);
                        setDialogOpen(true);
                      }}
                      className="mr-2 text-sm font-medium text-[var(--brand-primary)] hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <GenericFormDialog<Purchase>
        open={dialogOpen}
        title="compra"
        fields={FIELDS}
        initial={editing}
        endpoint="/api/purchases"
        onClose={() => setDialogOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
