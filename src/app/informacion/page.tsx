import Link from "next/link";
import type { PublicProfessor, SafetyRule } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchProfessors(): Promise<PublicProfessor[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/lab-info/public/professors`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function fetchSafetyRules(): Promise<SafetyRule[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/lab-info/public/safety-rules`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function InformacionPage() {
  const [professors, safetyRules] = await Promise.all([
    fetchProfessors(),
    fetchSafetyRules(),
  ]);

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

      <section className="bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-primary)] py-16 text-white">
        <div className="custom-container">
          <h1 className="headliner mb-4">Información General</h1>
          <p className="subcopy max-w-2xl text-blue-100">
            Todo lo que necesitas saber sobre el Laboratorio de Procesos de
            Separación.
          </p>
        </div>
      </section>

      {/* Ubicación */}
      <Section id="ubicacion" title="Ubicación">
        <p className="text-[var(--brand-gray)]">
          Universidad Metropolitana — Distribuidor Universidad, Av. Boyacá con
          autopista Petare-Guarenas. Urb. Terrazas del Ávila, Caracas-Miranda.
        </p>
      </Section>

      {/* Profesores */}
      <Section id="profesores" title="Nuestros Profesores">
        {professors.length === 0 ? (
          <p className="text-[var(--brand-gray)]">
            (No hay profesores cargados aún)
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {professors.map((p) => (
              <div
                key={p._id}
                className="rounded-xl border border-border bg-gray-50 p-6"
              >
                <h3 className="text-lg font-bold text-[var(--brand-secondary)]">
                  {p.name}
                </h3>
                {p.email && (
                  <p className="mt-1 text-sm text-[var(--brand-orange)]">
                    {p.email}
                  </p>
                )}
                {p.education && (
                  <p className="mt-3 text-sm text-[var(--brand-gray)]">
                    <strong>Formación:</strong> {p.education}
                  </p>
                )}
                {p.asignatures.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
                      Asignaturas
                    </p>
                    <ul className="mt-1 list-inside list-disc text-sm text-[var(--brand-gray)]">
                      {p.asignatures.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {p.interestAreas.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
                      Áreas de interés
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {p.interestAreas.map((a) => (
                        <span
                          key={a}
                          className="rounded-full bg-white px-2 py-0.5 text-xs text-[var(--brand-primary)]"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Equipamiento */}
      <Section id="equipamiento" title="Equipamiento Disponible">
        <p className="text-[var(--brand-gray)]">
          El laboratorio cuenta con equipos de destilación continua y por
          carga, extracción líquido-líquido, fluidización, absorción,
          filtración a presión constante, secado por convección y
          refractometría, además de reactivos y materiales auxiliares.
          Inicia sesión para ver el inventario completo.
        </p>
      </Section>

      {/* Normativas */}
      <Section id="normativas" title="Normativas de Seguridad">
        {safetyRules.length === 0 ? (
          <p className="text-[var(--brand-gray)]">
            (No hay normativas cargadas aún)
          </p>
        ) : (
          <ol className="list-inside list-decimal space-y-2 text-[var(--brand-gray)]">
            {safetyRules.map((r) => (
              <li key={r._id}>{r.content}</li>
            ))}
          </ol>
        )}
      </Section>

      {/* Propósito */}
      <Section id="proposito" title="Propósito del Laboratorio">
        <p className="text-[var(--brand-gray)]">
          Espacio dedicado a la investigación, docencia y excelencia en
          procesos de separación química. Formamos ingenieros químicos
          preparados para los retos de la industria.
        </p>
      </Section>

      <footer className="border-t border-border bg-gray-50 py-8">
        <div className="custom-container text-center text-sm text-[var(--brand-gray)]">
          © {new Date().getFullYear()} Universidad Metropolitana
        </div>
      </footer>
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
        <div>{children}</div>
      </div>
    </section>
  );
}
