export default function PanelHome() {
  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">Panel del Profesor</h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Gestiona inventarios, aprueba reservas y administra el laboratorio.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Stat label="Solicitudes pendientes" value="—" />
        <Stat label="Reservas hoy" value="—" />
        <Stat label="Reactivos en stock bajo" value="—" />
        <Stat label="Estudiantes activos" value="—" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-[var(--brand-primary)]">
        {value}
      </p>
    </div>
  );
}
