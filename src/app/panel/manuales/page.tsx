"use client";

import { useCallback, useEffect, useState } from "react";
import type { Manual } from "@/types";
import { ManualCard } from "@/components/manuals/manual-card";
import {
  GenericFormDialog,
  type Field,
} from "@/components/inventory/generic-form-dialog";

const FIELDS: Field[] = [
  { key: "title", label: "Título", required: true, fullWidth: true },
  { key: "subject", label: "Asignatura / Curso" },
  {
    key: "visibility",
    label: "Visibilidad",
    type: "select",
    required: true,
    options: ["public", "students", "professors"],
  },
  {
    key: "fileUrl",
    label: "URL del PDF",
    required: true,
    fullWidth: true,
    placeholder: "https://...",
  },
  { key: "coverUrl", label: "URL portada (opcional)", fullWidth: true },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    fullWidth: true,
  },
];

export default function PanelManualesPage() {
  const [items, setItems] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Manual | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/manuals");
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

  async function handleDelete(m: Manual) {
    if (!confirm(`¿Eliminar "${m.title}"?`)) return;
    const res = await fetch(`/api/manuals/${m._id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="titular text-[var(--brand-secondary)]">
            Gestión de Manuales
          </h1>
          <p className="mt-1 text-[var(--brand-gray)]">
            {items.length} manuales · Los estudiantes los ven como cards en
            su panel.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
          className="rounded-md bg-[var(--brand-primary)] px-4 py-2 font-bold text-white hover:bg-[var(--brand-secondary)]"
        >
          + Cargar manual
        </button>
      </div>

      {loading ? (
        <div className="mt-8 rounded-xl border border-border bg-white p-12 text-center text-[var(--brand-gray)]">
          Cargando...
        </div>
      ) : items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-white p-12 text-center text-[var(--brand-gray)]">
          Sin manuales cargados
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <ManualCard
              key={m._id}
              manual={m}
              onEdit={() => {
                setEditing(m);
                setDialogOpen(true);
              }}
              onDelete={() => handleDelete(m)}
            />
          ))}
        </div>
      )}

      <GenericFormDialog<Manual>
        open={dialogOpen}
        title="manual"
        fields={FIELDS}
        initial={editing}
        endpoint="/api/manuals"
        onClose={() => setDialogOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
