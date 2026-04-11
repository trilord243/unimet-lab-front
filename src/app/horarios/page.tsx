import Link from "next/link";

export default function HorariosPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border">
        <div className="custom-container flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-black text-[var(--brand-secondary)]"
          >
            Lab<span className="text-[var(--brand-orange)]">UNIMET</span>
          </Link>
          <Link
            href="/auth/login"
            className="rounded-md bg-[var(--brand-primary)] px-4 py-2 text-white hover:bg-[var(--brand-secondary)]"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      <section className="custom-container py-16">
        <h1 className="headliner mb-4 text-[var(--brand-secondary)]">
          Horarios del Laboratorio
        </h1>
        <p className="subcopy max-w-2xl text-[var(--brand-gray)]">
          Consulta el calendario público de actividades y reservas
          aprobadas en el laboratorio.
        </p>
        <div className="mt-8 rounded-xl border border-dashed border-border p-12 text-center text-[var(--brand-gray)]">
          Calendario público (pendiente)
        </div>
      </section>
    </div>
  );
}
