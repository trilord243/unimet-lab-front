"use client";

import { useEffect, useState } from "react";

export interface Field {
  key: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  fullWidth?: boolean;
}

interface Props<T extends { _id?: string }> {
  open: boolean;
  title: string;
  fields: Field[];
  initial?: T | null;
  endpoint: string; // e.g. "/api/materials"
  onClose: () => void;
  onSaved: () => void;
}

/**
 * Diálogo genérico para crear/editar cualquier recurso de inventario.
 * Se configura con una lista de campos; maneja POST (create) y PATCH (edit)
 * contra el endpoint dado.
 */
export function GenericFormDialog<T extends { _id?: string } & Record<string, any>>({
  open,
  title,
  fields,
  initial,
  endpoint,
  onClose,
  onSaved,
}: Props<T>) {
  const [form, setForm] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) {
      const next: Record<string, any> = {};
      for (const f of fields) {
        next[f.key] = initial[f.key] ?? (f.type === "number" ? 0 : "");
      }
      setForm(next);
    } else {
      const empty: Record<string, any> = {};
      for (const f of fields) empty[f.key] = f.type === "number" ? 0 : "";
      setForm(empty);
    }
    setError(null);
  }, [initial, open, fields]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: Record<string, any> = {};
      for (const f of fields) {
        const v = form[f.key];
        if (f.type === "number") payload[f.key] = Number(v || 0);
        else payload[f.key] = v;
      }
      const url = initial?._id ? `${endpoint}/${initial._id}` : endpoint;
      const method = initial?._id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || data.error || "Error al guardar");
        return;
      }
      onSaved();
      onClose();
    } catch {
      setError("Error de conexión");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold text-[var(--brand-secondary)]">
          {initial ? `Editar ${title}` : `Agregar ${title}`}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.fullWidth ? "md:col-span-2" : ""}>
                <label className="mb-1 block text-sm font-medium">
                  {f.label}
                  {f.required ? " *" : ""}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={3}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.key] ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
                  />
                ) : f.type === "select" ? (
                  <select
                    required={f.required}
                    value={form[f.key] ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
                  >
                    <option value="">— Selecciona —</option>
                    {f.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type || "text"}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.key] ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-[var(--brand-primary)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--brand-secondary)] disabled:opacity-50"
            >
              {saving ? "Guardando..." : initial ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
