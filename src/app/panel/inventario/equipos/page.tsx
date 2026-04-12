"use client";

import { useCallback, useEffect, useState } from "react";
import type { Equipment } from "@/types";
import {
  GenericFormDialog,
  type Field,
} from "@/components/inventory/generic-form-dialog";

const FIELDS: Field[] = [
  { key: "name", label: "Nombre", required: true },
  { key: "brand", label: "Marca" },
  { key: "model", label: "Modelo" },
  { key: "serialNumber", label: "N° de serie" },
  {
    key: "status",
    label: "Estado",
    type: "select",
    required: true,
    options: ["available", "in_use", "maintenance", "retired"],
  },
  { key: "location", label: "Ubicación" },
  { key: "manualLink", label: "URL del manual" },
  { key: "imageURL", label: "URL imagen" },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    fullWidth: true,
  },
];

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  available: { label: "Disponible", color: "bg-green-100 text-green-800" },
  in_use: { label: "En uso", color: "bg-blue-100 text-blue-800" },
  maintenance: { label: "Mantenimiento", color: "bg-yellow-100 text-yellow-800" },
  retired: { label: "Retirado", color: "bg-gray-100 text-gray-700" },
};

export default function InventarioEquiposPage() {
  const [items, setItems] = useState<Equipment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Equipment | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = search
        ? `/api/equipments?q=${encodeURIComponent(search)}`
        : `/api/equipments`;
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

  async function handleDelete(r: Equipment) {
    if (!confirm(`¿Eliminar "${r.name}"?`)) return;
    const res = await fetch(`/api/equipments/${r._id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="titular text-[var(--brand-secondary)]">
            Inventario · Equipos
          </h1>
          <p className="mt-1 text-[var(--brand-gray)]">
            {items.length} equipos registrados
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
          className="rounded-md bg-[var(--brand-primary)] px-4 py-2 font-bold text-white hover:bg-[var(--brand-secondary)]"
        >
          + Agregar equipo
        </button>
      </div>

      <div className="mt-6">
        <input
          type="search"
          placeholder="Buscar equipo..."
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
              <th className="px-4 py-3">Marca / Modelo</th>
              <th className="px-4 py-3">N° Serie</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Ubicación</th>
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
                  Sin equipos
                </td>
              </tr>
            ) : (
              items.map((e) => {
                const st = STATUS_LABEL[e.status] || STATUS_LABEL.available!;
                return (
                  <tr key={e._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[var(--brand-secondary)]">
                      {e.name}
                    </td>
                    <td className="px-4 py-3 text-[var(--brand-gray)]">
                      {[e.brand, e.model].filter(Boolean).join(" / ") || "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--brand-gray)]">
                      {e.serialNumber || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${st.color}`}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--brand-gray)]">
                      {e.location || "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => {
                          setEditing(e);
                          setDialogOpen(true);
                        }}
                        className="mr-2 text-sm font-medium text-[var(--brand-primary)] hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(e)}
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

      <GenericFormDialog<Equipment>
        open={dialogOpen}
        title="equipo"
        fields={FIELDS}
        initial={editing}
        endpoint="/api/equipments"
        onClose={() => setDialogOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
