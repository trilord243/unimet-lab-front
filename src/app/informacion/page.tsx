import Link from "next/link";

/**
 * Página pública de información general del laboratorio.
 * Equivalente a "INFORMACIÓN GENERAL" del manual original.
 * Secciones: Ubicación, Profesores, Equipamiento, Normativas, Propósito.
 */
export default function InformacionPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border">
        <div className="custom-container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-black text-[var(--brand-secondary)]">
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
          Información General
        </h1>
        <p className="subcopy max-w-2xl text-[var(--brand-gray)]">
          Conoce más sobre el Laboratorio de Procesos de Separación de la
          Universidad Metropolitana.
        </p>
      </section>

      <Section id="ubicacion" title="Ubicación">
        <p>Universidad Metropolitana, Caracas, Venezuela.</p>
      </Section>

      <Section id="profesores" title="Nuestros Profesores">
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-[var(--brand-gray)]">
          Carrusel de profesores (cargados desde /lab-info/public/professors)
        </div>
      </Section>

      <Section id="equipamiento" title="Equipamiento Disponible">
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-[var(--brand-gray)]">
          Listado de equipos y reactivos públicos
        </div>
      </Section>

      <Section id="normativas" title="Normativas de Seguridad">
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-[var(--brand-gray)]">
          Lista de normativas (cargadas desde /lab-info/public/safety-rules)
        </div>
      </Section>

      <Section id="proposito" title="Propósito del Laboratorio">
        <p>
          Espacio dedicado a la investigación, docencia y excelencia en
          procesos de separación química.
        </p>
      </Section>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-12">
      <div className="custom-container">
        <h2 className="titular mb-6 text-[var(--brand-secondary)]">{title}</h2>
        <div className="text-[var(--brand-gray)]">{children}</div>
      </div>
    </section>
  );
}
