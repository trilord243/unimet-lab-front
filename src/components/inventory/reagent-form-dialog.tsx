"use client";

import { useEffect, useState } from "react";
import type { Reagent } from "@/types";

interface Props {
  open: boolean;
  initial?: Reagent | null;
  onClose: () => void;
  onSaved: () => void;
}

const EMPTY = {
  name: "",
  formula: "",
  casNumber: "",
  quantity: 0,
  unit: "g",
  location: "",
  hazardClass: "",
  msdsLink: "",
  lowStockThreshold: 0,
  notes: "",
};

export function ReagentFormDialog({ open, initial, onClose, onSaved }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name ?? "",
        formula: initial.formula ?? "",
        casNumber: initial.casNumber ?? "",
        quantity: initial.quantity ?? 0,
        unit: initial.unit ?? "g",
        location: initial.location ?? "",
        hazardClass: initial.hazardClass ?? "",
        msdsLink: initial.msdsLink ?? "",
        lowStockThreshold: initial.lowStockThreshold ?? 0,
        notes: initial.notes ?? "",
      });
    } else {
      setForm(EMPTY);
    }
    setError(null);
  }, [initial, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = initial?._id
        ? `/api/reagents/${initial._id}`
        : `/api/reagents`;
      const method = initial?._id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          lowStockThreshold: Number(form.lowStockThreshold),
        }),
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
          {initial ? "Editar reactivo" : "Agregar reactivo"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              label="Nombre *"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
            <Field
              label="Fórmula"
              value={form.formula}
              onChange={(v) => setForm({ ...form, formula: v })}
            />
            <Field
              label="Número CAS"
              value={form.casNumber}
              onChange={(v) => setForm({ ...form, casNumber: v })}
            />
            <Field
              label="Clase de peligro"
              value={form.hazardClass}
              onChange={(v) => setForm({ ...form, hazardClass: v })}
              placeholder="Inflamable, Tóxico..."
            />
            <Field
              label="Cantidad *"
              type="number"
              value={String(form.quantity)}
              onChange={(v) => setForm({ ...form, quantity: Number(v) })}
              required
            />
            <Field
              label="Unidad *"
              value={form.unit}
              onChange={(v) => setForm({ ...form, unit: v })}
              placeholder="g, kg, mL, L..."
              required
            />
            <Field
              label="Ubicación"
              value={form.location}
              onChange={(v) => setForm({ ...form, location: v })}
            />
            <Field
              label="Umbral stock bajo"
              type="number"
              value={String(form.lowStockThreshold)}
              onChange={(v) =>
                setForm({ ...form, lowStockThreshold: Number(v) })
              }
            />
            <Field
              label="MSDS (URL)"
              value={form.msdsLink}
              onChange={(v) => setForm({ ...form, msdsLink: v })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Notas</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
            />
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

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border px-3 py-2 focus:border-[var(--brand-primary)] focus:outline-none"
      />
    </div>
  );
}
