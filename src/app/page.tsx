import Link from "next/link";

/**
 * Landing pública del Laboratorio de Procesos de Separación.
 * 4 secciones según el manual de usuario:
 *   1. Reservas
 *   2. Manuales (preview, requiere login para descargar)
 *   3. Información general
 *   4. Propósito del laboratorio
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="border-b border-border bg-white">
        <div className="custom-container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-[var(--brand-secondary)]">
              Lab<span className="text-[var(--brand-orange)]">UNIMET</span>
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/horarios" className="hover:text-[var(--brand-primary)]">
              Horarios
            </Link>
            <Link href="/informacion" className="hover:text-[var(--brand-primary)]">
              Información
            </Link>
            <Link
              href="/auth/login"
              className="rounded-md bg-[var(--brand-primary)] px-4 py-2 text-white hover:bg-[var(--brand-secondary)]"
            >
              Iniciar sesión
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-primary)] py-24 text-white">
        <div className="custom-container">
          <h1 className="headliner mb-6 max-w-3xl">
            Laboratorio de Procesos de Separación
          </h1>
          <p className="subcopy mb-8 max-w-2xl text-blue-100">
            Sistema integral de reservas e inventarios para estudiantes,
            profesores e investigadores de la Universidad Metropolitana.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/auth/login"
              className="rounded-lg bg-[var(--brand-orange)] px-6 py-3 font-bold text-white hover:bg-[var(--brand-orange-secondary)]"
            >
              Comenzar
            </Link>
            <Link
              href="/informacion"
              className="rounded-lg border-2 border-white px-6 py-3 font-bold text-white hover:bg-white hover:text-[var(--brand-secondary)]"
            >
              Más información
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Secciones */}
      <section className="py-20">
        <div className="custom-container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Reservas"
            description="Reserva espacios, equipos o solicita reactivos directamente desde el sistema."
            href="/auth/login"
            color="primary"
          />
          <FeatureCard
            title="Manuales"
            description="Accede a manuales de laboratorio digitales para tus prácticas."
            href="/auth/login"
            color="orange"
          />
          <FeatureCard
            title="Información"
            description="Conoce a nuestros profesores, equipamiento y normativas de seguridad."
            href="/informacion"
            color="primary"
          />
          <FeatureCard
            title="Propósito"
            description="Investigación, docencia y excelencia en procesos de separación química."
            href="/informacion#proposito"
            color="orange"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-gray-50 py-8">
        <div className="custom-container text-center text-sm text-[var(--brand-gray)]">
          © {new Date().getFullYear()} Universidad Metropolitana — Laboratorio
          de Procesos de Separación
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  href,
  color,
}: {
  title: string;
  description: string;
  href: string;
  color: "primary" | "orange";
}) {
  const accent =
    color === "primary"
      ? "var(--brand-primary)"
      : "var(--brand-orange)";
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="mb-4 h-1 w-12 rounded"
        style={{ backgroundColor: accent }}
      />
      <h3 className="mb-2 text-xl font-bold text-[var(--brand-secondary)]">
        {title}
      </h3>
      <p className="text-sm text-[var(--brand-gray)]">{description}</p>
    </Link>
  );
}
