"use client";

import { useEffect, useState } from "react";
import type { InventoryHistoryEntry, InventoryItemType } from "@/types";

interface Props {
  open: boolean;
  itemType: InventoryItemType;
  itemId: string;
  itemName: string;
  assetCode?: string | undefined;
  onClose: () => void;
}

const ACTION_META: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  created: {
    label: "Creado",
    icon: "✨",
    color: "bg-green-100 text-green-800",
  },
  updated: {
    label: "Editado",
    icon: "✏️",
    color: "bg-blue-100 text-blue-800",
  },
  deleted: {
    label: "Eliminado",
    icon: "🗑️",
    color: "bg-red-100 text-red-800",
  },
  quantity_in: {
    label: "Entrada stock",
    icon: "⬆️",
    color: "bg-green-100 text-green-800",
  },
  quantity_out: {
    label: "Salida stock",
    icon: "⬇️",
    color: "bg-orange-100 text-orange-800",
  },
  status_change: {
    label: "Cambio de estado",
    icon: "🔄",
    color: "bg-purple-100 text-purple-800",
  },
};

export function HistoryModal({
  open,
  itemType,
  itemId,
  itemName,
  assetCode,
  onClose,
}: Props) {
  const [entries, setEntries] = useState<InventoryHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch(`/api/inventory-history/${itemType}/${itemId}`)
      .then((r) => r.json())
      .then((d) => {
        setEntries(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [open, itemType, itemId]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-border p-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--brand-secondary)]">
              Historial de cambios
            </h2>
            <p className="mt-1 text-sm text-[var(--brand-gray)]">
              <span className="font-medium">{itemName}</span>
              {assetCode && (
                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 font-mono text-xs text-[var(--brand-primary)]">
                  {assetCode}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-border px-3 py-1 text-sm hover:bg-gray-50"
          >
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <p className="text-center text-[var(--brand-gray)]">Cargando...</p>
          ) : entries.length === 0 ? (
            <p className="text-center text-[var(--brand-gray)]">
              Sin historial registrado
            </p>
          ) : (
            <ol className="relative border-l-2 border-[var(--brand-primary)] pl-6">
              {entries.map((e) => {
                const meta =
                  ACTION_META[e.action] || {
                    label: e.action,
                    icon: "•",
                    color: "bg-gray-100 text-gray-800",
                  };
                return (
                  <li key={e._id} className="mb-6 last:mb-0">
                    <span className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[var(--brand-primary)] text-[10px]">
                      {meta.icon}
                    </span>
                    <div className="rounded-lg border border-border bg-gray-50 p-4">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${meta.color}`}
                        >
                          {meta.label}
                        </span>
                        <span className="text-xs text-[var(--brand-gray)]">
                          {new Date(e.createdAt).toLocaleString("es-VE")}
                        </span>
                        {e.performedByName && (
                          <span className="text-xs text-[var(--brand-gray)]">
                            por{" "}
                            <span className="font-medium text-[var(--brand-secondary)]">
                              {e.performedByName}
                            </span>
                          </span>
                        )}
                      </div>
                      {e.delta !== null && e.delta !== undefined && (
                        <p className="text-sm font-medium text-[var(--brand-secondary)]">
                          {e.action === "quantity_out" ? "−" : "+"}
                          {e.delta} {e.unit || ""}
                        </p>
                      )}
                      {e.reason && (
                        <p className="mt-1 text-sm italic text-[var(--brand-gray)]">
                          "{e.reason}"
                        </p>
                      )}
                      {e.changes && Object.keys(e.changes).length > 0 && (
                        <div className="mt-2 space-y-1">
                          {Object.entries(e.changes).map(([key, val]) => (
                            <div key={key} className="text-xs">
                              <span className="font-bold text-[var(--brand-secondary)]">
                                {key}:
                              </span>{" "}
                              <span className="text-red-600 line-through">
                                {JSON.stringify(val.from)}
                              </span>{" "}
                              →{" "}
                              <span className="text-green-700">
                                {JSON.stringify(val.to)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
