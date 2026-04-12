"use client";

import { useEffect, useState } from "react";
import type { Manual } from "@/types";
import { ManualCard } from "@/components/manuals/manual-card";

export default function ManualesPage() {
  const [items, setItems] = useState<Manual[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/manuals")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setItems(d);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">Manuales</h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Manuales de laboratorio disponibles para visualizar y descargar.
      </p>

      {loading ? (
        <div className="mt-8 rounded-xl border border-border bg-white p-12 text-center text-[var(--brand-gray)]">
          Cargando...
        </div>
      ) : items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-white p-12 text-center text-[var(--brand-gray)]">
          No hay manuales disponibles
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <ManualCard key={m._id} manual={m} />
          ))}
        </div>
      )}
    </div>
  );
}
