"use client";

import { useCallback, useEffect, useState } from "react";
import type { Reagent } from "@/types";
import { ReagentFormDialog } from "@/components/inventory/reagent-form-dialog";

export default function InventarioReactivosPage() {
  const [items, setItems] = useState<Reagent[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Reagent | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = search
        ? `/api/reagents?q=${encodeURIComponent(search)}`
        : `/api/reagents`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      }
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  async function handleDelete(r: Reagent) {
    if (!confirm(`¿Eliminar el reactivo "${r.name}"?`)) return;
    const res = await fetch(`/api/reagents/${r._id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="titular text-[var(--brand-secondary)]">
            Inventario · Reactivos
          </h1>
          <p className="mt-1 text-[var(--brand-gray)]">
            {items.length} reactivos registrados
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
          className="rounded-md bg-[var(--brand-primary)] px-4 py-2 font-bold text-white hover:bg-[var(--brand-secondary)]"
        >
          + Agregar reactivo
        </button>
      </div>

      <div className="mt-6">
        <input
          type="search"
          placeholder="Buscar por nombre, fórmula o CAS..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Fórmula</th>
              <th className="px-4 py-3">CAS</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Ubicación</th>
              <th className="px-4 py-3">Peligro</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-[var(--brand-gray)]">
                  Cargando...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-[var(--brand-gray)]">
                  Sin resultados
                </td>
              </tr>
            ) : (
              items.map((r) => {
                const lowStock =
                  r.lowStockThreshold > 0 && r.quantity < r.lowStockThreshold;
                return (
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[var(--brand-secondary)]">
                      {r.name}
                    </td>
                    <td className="px-4 py-3 text-[var(--brand-gray)]">
                      {r.formula || "—"}
                    </td>
                    <td className="px-4 py-3 text-[var(--brand-gray)]">
                      {r.casNumber || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          lowStock
                            ? "font-bold text-red-600"
                            : "text-gray-900"
                        }
                      >
                        {r.quantity} {r.unit}
                      </span>
                      {lowStock && (
                        <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                          BAJO
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--brand-gray)]">
                      {r.location || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {r.hazardClass ? (
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-[var(--brand-orange-secondary)]">
                          {r.hazardClass}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          setEditing(r);
                          setDialogOpen(true);
                        }}
                        className="mr-2 text-sm font-medium text-[var(--brand-primary)] hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(r)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <ReagentFormDialog
        open={dialogOpen}
        initial={editing}
        onClose={() => setDialogOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
