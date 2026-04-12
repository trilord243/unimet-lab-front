"use client";

import { useCallback, useEffect, useState } from "react";
import type { Material } from "@/types";
import {
  GenericFormDialog,
  type Field,
} from "@/components/inventory/generic-form-dialog";

const FIELDS: Field[] = [
  { key: "name", label: "Nombre", required: true },
  {
    key: "category",
    label: "Categoría",
    placeholder: "Vaso, pipeta, embudo...",
  },
  { key: "quantity", label: "Cantidad", type: "number", required: true },
  { key: "unit", label: "Unidad", placeholder: "unidades, kg, mL..." },
  { key: "location", label: "Ubicación" },
  { key: "notes", label: "Notas", type: "textarea", fullWidth: true },
];

export default function InventarioMaterialesPage() {
  const [items, setItems] = useState<Material[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Material | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = search
        ? `/api/materials?q=${encodeURIComponent(search)}`
        : `/api/materials`;
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

  async function handleDelete(r: Material) {
    if (!confirm(`¿Eliminar "${r.name}"?`)) return;
    const res = await fetch(`/api/materials/${r._id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="titular text-[var(--brand-secondary)]">
            Inventario · Materiales
          </h1>
          <p className="mt-1 text-[var(--brand-gray)]">
            {items.length} materiales registrados
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
          className="rounded-md bg-[var(--brand-primary)] px-4 py-2 font-bold text-white hover:bg-[var(--brand-secondary)]"
        >
          + Agregar material
        </button>
      </div>

      <div className="mt-6">
        <input
          type="search"
          placeholder="Buscar..."
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
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Ubicación</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-[var(--brand-gray)]">
                  Cargando...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-[var(--brand-gray)]">
                  Sin materiales registrados
                </td>
              </tr>
            ) : (
              items.map((m) => (
                <tr key={m._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-[var(--brand-secondary)]">
                    {m.name}
                  </td>
                  <td className="px-4 py-3 text-[var(--brand-gray)]">
                    {m.category || "—"}
                  </td>
                  <td className="px-4 py-3">
                    {m.quantity} {m.unit || ""}
                  </td>
                  <td className="px-4 py-3 text-[var(--brand-gray)]">
                    {m.location || "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setEditing(m);
                        setDialogOpen(true);
                      }}
                      className="mr-2 text-sm font-medium text-[var(--brand-primary)] hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(m)}
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

      <GenericFormDialog<Material>
        open={dialogOpen}
        title="material"
        fields={FIELDS}
        initial={editing}
        endpoint="/api/materials"
        onClose={() => setDialogOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
