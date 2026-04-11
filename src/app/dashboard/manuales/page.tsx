export default function ManualesPage() {
  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">Manuales</h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Manuales disponibles para descargar y visualizar.
      </p>
      {/* Grid de cards de manuales */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-dashed border-border bg-white p-12 text-center text-[var(--brand-gray)]">
          Cards de manuales (pendiente)
        </div>
      </div>
    </div>
  );
}
