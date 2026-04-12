"use client";

import { useCallback, useEffect, useState } from "react";
import type { ResearchProject } from "@/types";
import {
  GenericFormDialog,
  type Field,
} from "@/components/inventory/generic-form-dialog";

const FIELDS: Field[] = [
  { key: "title", label: "Título", required: true, fullWidth: true },
  {
    key: "description",
    label: "Descripción",
    type: "textarea",
    fullWidth: true,
  },
  { key: "leadProfessor", label: "Profesor líder (userId)", required: true },
  {
    key: "status",
    label: "Estado",
    type: "select",
    required: true,
    options: ["active", "completed", "paused", "cancelled"],
  },
];

const STATUS_COLOR: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  paused: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-gray-100 text-gray-700",
};

export default function InvestigacionPage() {
  const [items, setItems] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ResearchProject | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/research-projects");
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

  async function handleDelete(r: ResearchProject) {
    if (!confirm(`¿Eliminar "${r.title}"?`)) return;
    const res = await fetch(`/api/research-projects/${r._id}`, {
      method: "DELETE",
    });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="titular text-[var(--brand-secondary)]">
            Trabajos de Investigación
          </h1>
          <p className="mt-1 text-[var(--brand-gray)]">
            {items.length} proyectos registrados
          </p>
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
          className="rounded-md bg-[var(--brand-primary)] px-4 py-2 font-bold text-white hover:bg-[var(--brand-secondary)]"
        >
          + Nuevo proyecto
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full rounded-xl border border-border bg-white p-12 text-center text-[var(--brand-gray)]">
            Cargando...
          </div>
        ) : items.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-border bg-white p-12 text-center text-[var(--brand-gray)]">
            Sin proyectos registrados
          </div>
        ) : (
          items.map((p) => (
            <div
              key={p._id}
              className="rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-base font-bold text-[var(--brand-secondary)]">
                  {p.title}
                </h3>
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_COLOR[p.status] || ""}`}
                >
                  {p.status}
                </span>
              </div>
              {p.description && (
                <p className="mb-3 text-sm text-[var(--brand-gray)]">
                  {p.description}
                </p>
              )}
              <p className="mb-3 text-xs text-[var(--brand-gray)]">
                Líder: <span className="font-mono">{p.leadProfessor}</span>
                {p.students.length > 0 && ` · ${p.students.length} estudiantes`}
              </p>
              <div className="flex gap-3 border-t border-border pt-3">
                <button
                  onClick={() => {
                    setEditing(p);
                    setDialogOpen(true);
                  }}
                  className="text-sm font-medium text-[var(--brand-primary)] hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p)}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <GenericFormDialog<ResearchProject>
        open={dialogOpen}
        title="proyecto"
        fields={FIELDS}
        initial={editing}
        endpoint="/api/research-projects"
        onClose={() => setDialogOpen(false)}
        onSaved={load}
      />
    </div>
  );
}
