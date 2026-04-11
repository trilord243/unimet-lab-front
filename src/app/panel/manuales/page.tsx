export default function PanelManualesPage() {
  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">
        Gestión de Manuales
      </h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Carga, edita y elimina manuales de laboratorio. Se muestran como
        cards al estudiante.
      </p>
      <button className="mt-4 rounded-md bg-[var(--brand-primary)] px-4 py-2 font-bold text-white hover:bg-[var(--brand-secondary)]">
        + Cargar manual
      </button>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-dashed border-border bg-white p-12 text-center text-[var(--brand-gray)]">
          Cards CRUD (pendiente)
        </div>
      </div>
    </div>
  );
}
