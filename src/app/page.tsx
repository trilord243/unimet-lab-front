import Link from "next/link";
import type { PublicProfessor } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetchProfessors(): Promise<PublicProfessor[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/lab-info/public/professors`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const professors = await fetchProfessors();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <Proposito />
      <QueHacemos />
      <Proceso />
      <Equipamiento />
      <Profesores professors={professors} />
      <Normativas />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
}

/* ============================================================ */
/*                      COMPONENTES                              */
/* ============================================================ */

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="custom-container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-[var(--brand-secondary)]">
            Lab<span className="text-[var(--brand-orange)]">UNIMET</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a href="#proposito" className="hover:text-[var(--brand-primary)]">
            Propósito
          </a>
          <a href="#que-hacemos" className="hover:text-[var(--brand-primary)]">
            Qué hacemos
          </a>
          <a href="#equipamiento" className="hover:text-[var(--brand-primary)]">
            Equipamiento
          </a>
          <a href="#profesores" className="hover:text-[var(--brand-primary)]">
            Profesores
          </a>
          <Link
            href="/horarios"
            className="hover:text-[var(--brand-primary)]"
          >
            Horarios
          </Link>
          <Link
            href="/auth/login"
            className="rounded-md bg-[var(--brand-primary)] px-4 py-2 text-white hover:bg-[var(--brand-secondary)]"
          >
            Iniciar sesión
          </Link>
        </nav>
        <Link
          href="/auth/login"
          className="rounded-md bg-[var(--brand-primary)] px-3 py-2 text-sm text-white md:hidden"
        >
          Ingresar
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-secondary)] via-[#0a3a8a] to-[var(--brand-primary)] py-24 text-white">
      {/* pattern decoration */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="custom-container relative">
        <div className="max-w-3xl">
          <div className="mb-4 inline-block rounded-full bg-[var(--brand-orange)] px-4 py-1 text-xs font-bold uppercase tracking-wider">
            Universidad Metropolitana · Caracas
          </div>
          <h1 className="headliner mb-6">
            Laboratorio de Procesos de Separación
          </h1>
          <p className="subcopy mb-8 text-blue-100">
            Investigación, docencia y excelencia en ingeniería química.
            Gestiona reservas, inventarios, reactivos y prácticas de
            laboratorio en un solo lugar.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/auth/register"
              className="rounded-lg bg-[var(--brand-orange)] px-6 py-3 font-bold text-white shadow-lg hover:bg-[var(--brand-orange-secondary)]"
            >
              Crear cuenta
            </Link>
            <Link
              href="#proposito"
              className="rounded-lg border-2 border-white px-6 py-3 font-bold text-white hover:bg-white hover:text-[var(--brand-secondary)]"
            >
              Conocer más
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "8+", label: "Equipos especializados" },
    { value: "9+", label: "Reactivos en inventario" },
    { value: "4", label: "Profesores expertos" },
    { value: "24/7", label: "Plataforma digital" },
  ];
  return (
    <section className="border-b border-border bg-gray-50 py-12">
      <div className="custom-container grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="headliner text-[var(--brand-primary)]">
              {s.value}
            </div>
            <p className="mt-2 text-sm text-[var(--brand-gray)]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Proposito() {
  return (
    <section id="proposito" className="py-20">
      <div className="custom-container grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)]">
            Propósito
          </span>
          <h2 className="titular mt-2 text-[var(--brand-secondary)]">
            Formamos ingenieros químicos que resuelven los retos del futuro
          </h2>
          <p className="mt-4 text-[var(--brand-gray)]">
            Nuestro laboratorio es un espacio donde la teoría se convierte
            en práctica. Aquí los estudiantes experimentan con procesos
            reales de separación: destilación, extracción, absorción,
            filtración y secado — las operaciones unitarias que están
            detrás de la industria química, farmacéutica y alimentaria.
          </p>
          <p className="mt-4 text-[var(--brand-gray)]">
            Creemos en una educación donde cada estudiante tenga acceso
            transparente a equipos, reactivos y conocimiento. Por eso
            digitalizamos todos nuestros procesos: para que reservar,
            solicitar y aprender sea tan fácil como escanear un código.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ValueCard icon="🎓" title="Docencia" text="Prácticas guiadas por profesores expertos en procesos químicos industriales." />
          <ValueCard icon="🔬" title="Investigación" text="Proyectos de pregrado, tesis y colaboraciones con la industria." />
          <ValueCard icon="⚙️" title="Equipamiento" text="Infraestructura real de operaciones unitarias a escala laboratorio." />
          <ValueCard icon="🛡️" title="Seguridad" text="Protocolos estrictos y formación continua en manejo de sustancias." />
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-2 font-bold text-[var(--brand-secondary)]">{title}</h3>
      <p className="mt-1 text-xs text-[var(--brand-gray)]">{text}</p>
    </div>
  );
}

function QueHacemos() {
  const items = [
    {
      icon: "🧪",
      title: "Prácticas de laboratorio",
      text: "Experimentos diseñados por profesores para aprender destilación, extracción L-L, absorción gas-líquido, fluidización, filtración y secado.",
    },
    {
      icon: "📦",
      title: "Gestión de inventarios",
      text: "Control digital de reactivos, materiales y equipos con código único, historial completo y alertas de stock bajo.",
    },
    {
      icon: "📅",
      title: "Reservas en línea",
      text: "Reserva espacios, equipos o solicita reactivos desde cualquier dispositivo. El profesor aprueba y recibes notificación instantánea.",
    },
    {
      icon: "📚",
      title: "Manuales digitales",
      text: "Biblioteca de guías de laboratorio siempre disponibles para que los estudiantes consulten antes y durante sus prácticas.",
    },
    {
      icon: "📈",
      title: "Proyectos de investigación",
      text: "Espacio para desarrollar trabajos de grado, tesis y publicaciones en áreas de frontera en ingeniería química.",
    },
    {
      icon: "🔔",
      title: "Notificaciones multicanal",
      text: "Correo electrónico y WhatsApp te mantienen al día con el estado de tus solicitudes, sin tener que revisar manualmente.",
    },
  ];
  return (
    <section id="que-hacemos" className="bg-gray-50 py-20">
      <div className="custom-container">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)]">
            Qué hacemos
          </span>
          <h2 className="titular mt-2 text-[var(--brand-secondary)]">
            Todo lo que necesitas en un solo sistema
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <div
              key={i.title}
              className="rounded-xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 text-4xl">{i.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-[var(--brand-secondary)]">
                {i.title}
              </h3>
              <p className="text-sm text-[var(--brand-gray)]">{i.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proceso() {
  const steps = [
    {
      n: "1",
      title: "Regístrate",
      text: "Crea tu cuenta con tu correo institucional @correo.unimet.edu.ve (estudiantes) o @unimet.edu.ve (profesores).",
    },
    {
      n: "2",
      title: "Reserva o solicita",
      text: "Escoge el espacio, equipo o reactivo que necesitas. Completa el formulario con la fecha, bloque horario y justificación.",
    },
    {
      n: "3",
      title: "Recibe confirmación",
      text: "El profesor aprueba o rechaza tu solicitud. Te notificamos por correo y WhatsApp. Asiste al lab a la hora acordada.",
    },
  ];
  return (
    <section className="py-20">
      <div className="custom-container">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)]">
            Cómo funciona
          </span>
          <h2 className="titular mt-2 text-[var(--brand-secondary)]">
            Tres pasos para empezar
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="absolute -left-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-orange)] text-3xl font-black text-white shadow-lg">
                {s.n}
              </div>
              <div className="rounded-xl border border-border bg-white p-6 pl-12 pt-10 shadow-sm">
                <h3 className="text-xl font-bold text-[var(--brand-secondary)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--brand-gray)]">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Equipamiento() {
  const equipos = [
    { name: "Destilación Continua", icon: "⚗️" },
    { name: "Destilación por Carga", icon: "🧴" },
    { name: "Extracción Líquido-Líquido", icon: "💧" },
    { name: "Absorción gas-líquido", icon: "💨" },
    { name: "Filtración a Presión", icon: "🧻" },
    { name: "Fluidización", icon: "🌀" },
    { name: "Secado por Convección", icon: "♨️" },
    { name: "Refractómetro", icon: "🔍" },
  ];
  return (
    <section
      id="equipamiento"
      className="bg-gradient-to-br from-gray-50 to-blue-50 py-20"
    >
      <div className="custom-container">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)]">
            Equipamiento disponible
          </span>
          <h2 className="titular mt-2 text-[var(--brand-secondary)]">
            Operaciones unitarias reales a escala laboratorio
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--brand-gray)]">
            Contamos con equipos especializados que cubren los principales
            procesos de separación estudiados en ingeniería química.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {equipos.map((e) => (
            <div
              key={e.name}
              className="rounded-xl border border-border bg-white p-5 text-center shadow-sm transition-all hover:scale-105"
            >
              <div className="text-4xl">{e.icon}</div>
              <p className="mt-3 text-sm font-bold text-[var(--brand-secondary)]">
                {e.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Profesores({ professors }: { professors: PublicProfessor[] }) {
  if (professors.length === 0) return null;
  return (
    <section id="profesores" className="py-20">
      <div className="custom-container">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)]">
            Nuestro equipo
          </span>
          <h2 className="titular mt-2 text-[var(--brand-secondary)]">
            Profesores del laboratorio
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {professors.map((p) => (
            <div
              key={p._id}
              className="rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-xl font-black text-white">
                  {p.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--brand-secondary)]">
                    {p.name}
                  </h3>
                  {p.email && (
                    <a
                      href={`mailto:${p.email}`}
                      className="text-xs text-[var(--brand-orange)] hover:underline"
                    >
                      {p.email}
                    </a>
                  )}
                </div>
              </div>
              {p.asignatures.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
                    Asignaturas
                  </p>
                  <p className="mt-1 text-xs text-[var(--brand-gray)]">
                    {p.asignatures.slice(0, 3).join(" · ")}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/informacion"
            className="text-sm font-bold text-[var(--brand-primary)] hover:underline"
          >
            Ver más detalles de los profesores →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Normativas() {
  const rules = [
    "Uso obligatorio de bata, pantalón largo y zapato cerrado",
    "Lectura previa del manual antes de usar cualquier equipo",
    "Prohibido el acceso sin el encargado del laboratorio",
    "Informar inmediatamente cualquier equipo dañado",
    "Manejo responsable de desechos químicos",
    "Respeto a las normas sanitarias vigentes",
  ];
  return (
    <section className="bg-gray-50 py-20">
      <div className="custom-container">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)]">
            Seguridad primero
          </span>
          <h2 className="titular mt-2 text-[var(--brand-secondary)]">
            Normativas del laboratorio
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rules.map((r, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-orange)] text-sm font-black text-white">
                {i + 1}
              </div>
              <p className="text-sm text-[var(--brand-gray)]">{r}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/informacion#normativas"
            className="text-sm font-bold text-[var(--brand-primary)] hover:underline"
          >
            Ver todas las normativas →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "¿Quién puede usar el laboratorio?",
      a: "Estudiantes y profesores de la Universidad Metropolitana con correo institucional activo. Los estudiantes se registran con @correo.unimet.edu.ve y los profesores con @unimet.edu.ve.",
    },
    {
      q: "¿Cómo reservo un equipo?",
      a: "Inicia sesión, ve a 'Reservar Equipo', selecciona el equipo, la fecha y los bloques horarios. El profesor recibirá tu solicitud y te notificará la aprobación por correo y WhatsApp.",
    },
    {
      q: "¿Puedo solicitar reactivos?",
      a: "Sí. En tu panel encuentras 'Solicitar Reactivo'. Selecciona el reactivo, indica cantidad y justifica el uso. El profesor revisará y te confirmará si aprueba la solicitud.",
    },
    {
      q: "¿Qué pasa si el equipo no está disponible?",
      a: "El sistema te muestra el estado actual de cada equipo (disponible, en uso, mantenimiento). Si está ocupado, puedes escoger otra fecha o bloque horario.",
    },
    {
      q: "¿Cómo identifico físicamente los reactivos?",
      a: "Cada activo del inventario tiene un código único (REAC-0001, MAT-0001, EQUIP-0001) y un código QR imprimible. Al escanear el QR desde cualquier teléfono se abre la ficha pública con toda su información.",
    },
    {
      q: "¿Qué hago si tengo problemas con mi cuenta?",
      a: "Contacta directamente al profesor del laboratorio por correo o WhatsApp. En la sección de información encontrarás los datos de contacto.",
    },
  ];
  return (
    <section className="py-20">
      <div className="custom-container max-w-3xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)]">
            Preguntas frecuentes
          </span>
          <h2 className="titular mt-2 text-[var(--brand-secondary)]">
            Resuelve tus dudas
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-border bg-white p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[var(--brand-secondary)]">
                {item.q}
                <span className="ml-2 text-[var(--brand-orange)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-[var(--brand-gray)]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-primary)] py-20 text-white">
      <div className="custom-container text-center">
        <h2 className="headliner mb-4">¿Listo para empezar?</h2>
        <p className="subcopy mx-auto mb-8 max-w-2xl text-blue-100">
          Únete a la comunidad del laboratorio, reserva espacios y lleva tu
          aprendizaje de ingeniería química al siguiente nivel.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/register"
            className="rounded-lg bg-[var(--brand-orange)] px-8 py-4 font-bold text-white shadow-lg hover:bg-[var(--brand-orange-secondary)]"
          >
            Crear mi cuenta
          </Link>
          <Link
            href="/auth/login"
            className="rounded-lg border-2 border-white px-8 py-4 font-bold text-white hover:bg-white hover:text-[var(--brand-secondary)]"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-gray-900 py-12 text-gray-300">
      <div className="custom-container grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <div className="text-2xl font-black text-white">
            Lab<span className="text-[var(--brand-orange)]">UNIMET</span>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Laboratorio de Procesos de Separación — Universidad Metropolitana,
            Caracas, Venezuela.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#proposito" className="hover:text-white">
                Propósito
              </a>
            </li>
            <li>
              <a href="#que-hacemos" className="hover:text-white">
                Qué hacemos
              </a>
            </li>
            <li>
              <a href="#equipamiento" className="hover:text-white">
                Equipamiento
              </a>
            </li>
            <li>
              <Link href="/informacion" className="hover:text-white">
                Información
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Plataforma</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/auth/login" className="hover:text-white">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link href="/auth/register" className="hover:text-white">
                Registrarse
              </Link>
            </li>
            <li>
              <Link href="/horarios" className="hover:text-white">
                Horarios
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Ubicación</h4>
          <p className="text-sm text-gray-400">
            Distribuidor Universidad, Av. Boyacá con autopista Petare-Guarenas.
            <br />
            Urb. Terrazas del Ávila, Caracas-Miranda.
          </p>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Universidad Metropolitana · Todos los
        derechos reservados
      </div>
    </footer>
  );
}
