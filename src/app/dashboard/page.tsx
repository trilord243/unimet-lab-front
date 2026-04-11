export default function StudentDashboard() {
  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">
        Bienvenido al Laboratorio
      </h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Reserva espacios, equipos o solicita reactivos para tus prácticas.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Reservar Espacio" href="/dashboard/reservar-espacio" color="primary" />
        <Card title="Reservar Equipo" href="/dashboard/reservar-equipo" color="orange" />
        <Card title="Solicitar Reactivo" href="/dashboard/solicitar-reactivo" color="primary" />
      </div>
    </div>
  );
}

function Card({
  title,
  href,
  color,
}: {
  title: string;
  href: string;
  color: "primary" | "orange";
}) {
  const accent =
    color === "primary" ? "var(--brand-primary)" : "var(--brand-orange)";
  return (
    <a
      href={href}
      className="block rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="mb-4 h-1 w-12 rounded"
        style={{ backgroundColor: accent }}
      />
      <h3 className="text-lg font-bold text-[var(--brand-secondary)]">
        {title}
      </h3>
    </a>
  );
}
