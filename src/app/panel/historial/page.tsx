"use client";

import { useCallback, useEffect, useState } from "react";
import type { InventoryHistoryEntry } from "@/types";

const ITEM_TYPE_LABELS: Record<string, string> = {
  reagent: "Reactivo",
  material: "Material",
  equipment: "Equipo",
};

const ACTION_META: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  created: { label: "Creado", icon: "✨", color: "bg-green-100 text-green-800" },
  updated: { label: "Editado", icon: "✏️", color: "bg-blue-100 text-blue-800" },
  deleted: { label: "Eliminado", icon: "🗑️", color: "bg-red-100 text-red-800" },
  quantity_in: {
    label: "Entrada",
    icon: "⬆️",
    color: "bg-green-100 text-green-800",
  },
  quantity_out: {
    label: "Salida",
    icon: "⬇️",
    color: "bg-orange-100 text-orange-800",
  },
  status_change: {
    label: "Estado",
    icon: "🔄",
    color: "bg-purple-100 text-purple-800",
  },
};

export default function HistorialPage() {
  const [entries, setEntries] = useState<InventoryHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemType, setItemType] = useState("");
  const [action, setAction] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("/api/inventory-history", window.location.origin);
      if (itemType) url.searchParams.set("itemType", itemType);
      if (action) url.searchParams.set("action", action);
      url.searchParams.set("limit", "200");
      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setEntries(Array.isArray(data) ? data : []);
      }
    } finally {
      setLoading(false);
    }
  }, [itemType, action]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">
        Historial de Inventario
      </h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Registro completo de creaciones, ediciones, movimientos de stock y
        eliminaciones.
      </p>

      {/* Filtros */}
      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
          className="rounded-md border border-border px-3 py-2 text-sm focus:border-[var(--brand-primary)] focus:outline-none"
        >
          <option value="">Todos los tipos</option>
          <option value="reagent">Reactivos</option>
          <option value="material">Materiales</option>
          <option value="equipment">Equipos</option>
        </select>
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="rounded-md border border-border px-3 py-2 text-sm focus:border-[var(--brand-primary)] focus:outline-none"
        >
          <option value="">Todas las acciones</option>
          <option value="created">Creados</option>
          <option value="updated">Editados</option>
          <option value="deleted">Eliminados</option>
          <option value="quantity_in">Entrada de stock</option>
          <option value="quantity_out">Salida de stock</option>
          <option value="status_change">Cambio de estado</option>
        </select>
        <span className="ml-auto self-center text-sm text-[var(--brand-gray)]">
          {entries.length} registros
        </span>
      </div>

      {/* Timeline */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Acción</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Ítem</th>
              <th className="px-4 py-3">Detalle</th>
              <th className="px-4 py-3">Por</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-[var(--brand-gray)]"
                >
                  Cargando...
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-[var(--brand-gray)]"
                >
                  Sin registros
                </td>
              </tr>
            ) : (
              entries.map((e) => {
                const meta = ACTION_META[e.action] || {
                  label: e.action,
                  icon: "•",
                  color: "bg-gray-100 text-gray-800",
                };
                return (
                  <tr key={e._id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-[var(--brand-gray)]">
                      {new Date(e.createdAt).toLocaleString("es-VE", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${meta.color}`}
                      >
                        {meta.icon} {meta.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--brand-gray)]">
                      {ITEM_TYPE_LABELS[e.itemType] || e.itemType}
                    </td>
                    <td className="px-4 py-3">
                      {e.assetCode ? (
                        <span className="rounded-full bg-[var(--brand-primary)] px-2 py-0.5 font-mono text-xs font-bold text-white">
                          {e.assetCode}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--brand-secondary)]">
                      {e.itemName || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--brand-gray)]">
                      {e.delta !== undefined && e.delta !== null
                        ? `${e.action === "quantity_out" ? "−" : "+"}${e.delta} ${e.unit || ""}`
                        : e.changes
                          ? `${Object.keys(e.changes).length} cambio(s)`
                          : "—"}
                      {e.reason && (
                        <span className="block italic">"{e.reason}"</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--brand-gray)]">
                      {e.performedByName || "—"}
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
