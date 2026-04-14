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
    <div className="min-h-screen bg-white font-roboto antialiased">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Pilares />
        <About />
        <Operaciones />
        <Proceso />
        <Catalogo />
        <Profesores professors={professors} />
        <Normativas />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  );
}

/* ============================================================ */
/*                          NAVBAR                               */
/* ============================================================ */
function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="font-roboto-condensed font-black text-2xl text-brand-secondary uppercase tracking-tight leading-none"
          >
            Lab<span className="text-brand-orange">UNIMET</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-roboto font-medium text-sm">
            <a
              href="#pilares"
              className="text-brand-gray hover:text-brand-primary transition-colors"
            >
              Pilares
            </a>
            <a
              href="#operaciones"
              className="text-brand-gray hover:text-brand-primary transition-colors"
            >
              Operaciones
            </a>
            <a
              href="#catalogo"
              className="text-brand-gray hover:text-brand-primary transition-colors"
            >
              Catálogo
            </a>
            <a
              href="#profesores"
              className="text-brand-gray hover:text-brand-primary transition-colors"
            >
              Profesores
            </a>
            <Link
              href="/informacion"
              className="text-brand-gray hover:text-brand-primary transition-colors"
            >
              Información
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden sm:inline-block font-roboto font-medium text-sm text-brand-gray hover:text-brand-primary transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/auth/register"
              className="bg-brand-primary hover:bg-brand-secondary text-white font-roboto font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================ */
/*                            HERO                               */
/* ============================================================ */
function Hero() {
  return (
    <section className="bg-white pt-32 pb-20 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute top-20 -right-20 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary font-roboto font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-brand-orange rounded-full" />
              Universidad Metropolitana · Caracas
            </div>

            <h1 className="headliner text-brand-primary mb-6">
              Laboratorio de{" "}
              <span className="text-brand-orange">Procesos</span>
              <br />
              de Separación
            </h1>

            <p className="subcopy text-brand-gray mb-8 max-w-xl">
              Accede a{" "}
              <strong className="text-brand-secondary">
                equipos especializados
              </strong>{" "}
              de ingeniería química: destilación, extracción, absorción,
              filtración y secado. Reserva espacios, solicita reactivos y
              gestiona tus prácticas de{" "}
              <strong className="text-brand-secondary">laboratorio</strong>{" "}
              desde una sola plataforma.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <button className="bg-brand-primary hover:bg-brand-secondary text-white font-roboto font-bold px-8 py-4 rounded-lg transition-colors w-full sm:w-auto shadow-md hover:shadow-lg">
                  Crear cuenta
                </button>
              </Link>
              <Link href="#pilares">
                <button className="bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-roboto font-bold px-8 py-4 rounded-lg transition-colors w-full sm:w-auto">
                  Conocer más
                </button>
              </Link>
            </div>
          </div>

          {/* Diagram card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl opacity-10 blur-xl" />
            <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl p-6 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-brand-orange" />
                  <div className="w-3 h-3 rounded-full bg-brand-orange-secondary" />
                  <div className="w-3 h-3 rounded-full bg-brand-primary" />
                </div>
                <span className="ml-3 font-roboto font-bold text-xs uppercase tracking-wider text-brand-gray">
                  Columna de destilación · esquema
                </span>
              </div>
              <DistillationDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                   DISTILLATION SVG                            */
/* ============================================================ */
function DistillationDiagram() {
  return (
    <svg
      viewBox="0 0 400 560"
      fill="none"
      stroke="#1859A9"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="h-auto w-full"
    >
      <defs>
        <marker
          id="arrow-head"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#1859A9" stroke="none" />
        </marker>
      </defs>

      <rect x="170" y="120" width="60" height="300" />

      {[150, 180, 210, 240, 270, 300, 330, 360, 390].map((y) => (
        <g key={y}>
          <line x1="170" y1={y} x2="230" y2={y} />
          <line x1="178" y1={y - 3} x2="178" y2={y + 3} />
          <line x1="192" y1={y - 3} x2="192" y2={y + 3} />
          <line x1="208" y1={y - 3} x2="208" y2={y + 3} />
          <line x1="222" y1={y - 3} x2="222" y2={y + 3} />
        </g>
      ))}

      <path d="M 200 120 L 200 90 L 255 90" />

      <rect x="255" y="72" width="90" height="36" />
      <line x1="270" y1="78" x2="270" y2="102" />
      <line x1="285" y1="78" x2="285" y2="102" />
      <line x1="300" y1="78" x2="300" y2="102" />
      <line x1="315" y1="78" x2="315" y2="102" />
      <line x1="330" y1="78" x2="330" y2="102" />

      <path
        d="M 345 85 L 370 85 L 370 105"
        strokeDasharray="2 2"
        opacity="0.6"
      />
      <path
        d="M 345 95 L 380 95"
        stroke="#FF8200"
        markerEnd="url(#arrow-head)"
      />

      <ellipse cx="200" cy="450" rx="48" ry="26" />
      <path d="M 200 420 L 200 424" />
      <path
        d="M 180 462 q 8 -8 16 0 t 16 0 t 16 0"
        strokeWidth="1"
        fill="none"
      />

      <path
        d="M 248 450 L 305 450 L 305 490"
        stroke="#FF8200"
        markerEnd="url(#arrow-head)"
      />
      <path
        d="M 90 270 L 170 270"
        stroke="#FF8200"
        markerEnd="url(#arrow-head)"
      />

      <g
        fontFamily="Roboto, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#003087"
        stroke="none"
      >
        <text x="22" y="265">
          F
        </text>
        <text x="22" y="280" fontSize="8" fontWeight="400" opacity="0.7">
          alimentación
        </text>

        <text x="382" y="85">
          D
        </text>
        <text x="382" y="100" fontSize="8" fontWeight="400" opacity="0.7">
          destilado
        </text>

        <text x="312" y="505">
          B
        </text>
        <text x="312" y="519" fontSize="8" fontWeight="400" opacity="0.7">
          fondo
        </text>

        <text x="260" y="142">
          C
        </text>
        <text x="260" y="156" fontSize="8" fontWeight="400" opacity="0.7">
          condensador
        </text>

        <text x="255" y="450">
          R
        </text>
        <text x="255" y="464" fontSize="8" fontWeight="400" opacity="0.7">
          rehervidor
        </text>
      </g>

      <g
        fontFamily="Roboto, sans-serif"
        fontSize="8"
        fill="#666"
        opacity="0.6"
        stroke="none"
      >
        <text x="148" y="154">N1</text>
        <text x="148" y="184">N2</text>
        <text x="148" y="214">N3</text>
        <text x="148" y="244">N4</text>
        <text x="148" y="274">N5</text>
        <text x="148" y="304">N6</text>
        <text x="148" y="334">N7</text>
        <text x="148" y="364">N8</text>
        <text x="148" y="394">N9</text>
      </g>
    </svg>
  );
}

/* ============================================================ */
/*                            STATS                              */
/* ============================================================ */
function Stats() {
  const stats = [
    { value: "08", label: "Equipos especializados" },
    { value: "10", label: "Reactivos inventariados" },
    { value: "04", label: "Profesores del Dept." },
    { value: "55+", label: "Años de trayectoria" },
  ];
  return (
    <section className="bg-gradient-to-br from-brand-primary to-brand-secondary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-roboto-condensed font-black text-5xl md:text-6xl text-white leading-none mb-3">
                {s.value}
              </div>
              <div className="font-roboto font-medium text-sm text-white/80 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                          PILARES                              */
/* ============================================================ */
function Pilares() {
  const pilares = [
    {
      title: "Tecnología Especializada",
      description:
        "Equipos reales de operaciones unitarias: destilación continua y por carga, extracción líquido-líquido, absorción gas-líquido, filtración y secado.",
      iconColor: "bg-brand-primary",
      bgColor: "bg-brand-primary/10",
    },
    {
      title: "Formación Práctica",
      description:
        "Espacios optimizados para el desarrollo de prácticas académicas, tesis de pregrado, proyectos de investigación y trabajos de colaboración.",
      iconColor: "bg-brand-orange",
      bgColor: "bg-brand-orange/10",
    },
    {
      title: "Gestión Digital",
      description:
        "Reserva equipos, solicita reactivos y consulta manuales desde una sola plataforma. Trazabilidad completa con código único por activo.",
      iconColor: "bg-brand-secondary",
      bgColor: "bg-brand-secondary/10",
    },
  ];
  return (
    <section id="pilares" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block font-roboto font-bold text-xs uppercase tracking-wider text-brand-orange mb-3">
            Nuestros Pilares
          </div>
          <h2 className="titular text-brand-primary mb-4">
            Fundamentos del Laboratorio
          </h2>
          <p className="font-roboto text-brand-gray max-w-2xl mx-auto">
            Tres ejes que definen nuestra propuesta para la formación en
            ingeniería química en la Universidad Metropolitana.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pilares.map((p) => (
            <div
              key={p.title}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow"
            >
              <div
                className={`${p.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <div className={`w-8 h-8 ${p.iconColor} rounded-full`} />
              </div>
              <h3 className="font-roboto font-bold text-xl text-brand-secondary mb-4">
                {p.title}
              </h3>
              <p className="font-roboto text-brand-gray leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                           ABOUT                               */
/* ============================================================ */
function About() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block font-roboto font-bold text-xs uppercase tracking-wider text-brand-orange mb-3">
              Sobre nosotros
            </div>
            <h2 className="titular text-brand-primary mb-6">
              Donde la teoría se vuelve{" "}
              <span className="text-brand-orange">tangible</span>
            </h2>
            <p className="font-roboto text-brand-gray leading-relaxed mb-5">
              El Laboratorio de Procesos de Separación de la Universidad
              Metropolitana conecta la teoría de operaciones unitarias con la
              industria química, farmacéutica, petroquímica y alimentaria.
            </p>
            <p className="font-roboto text-brand-gray leading-relaxed mb-8">
              Aquí los estudiantes manipulan columnas empacadas y de platos,
              equipos de extracción, sistemas de absorción y secadores — el
              mismo instrumental que opera a escala industrial, contenido en
              un formato didáctico.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-4 border-brand-primary pl-4">
                <div className="font-roboto-condensed font-black text-4xl text-brand-primary leading-none mb-1">
                  1970
                </div>
                <div className="font-roboto text-sm text-brand-gray">
                  Fundación UNIMET
                </div>
              </div>
              <div className="border-l-4 border-brand-orange pl-4">
                <div className="font-roboto-condensed font-black text-4xl text-brand-orange leading-none mb-1">
                  24/7
                </div>
                <div className="font-roboto text-sm text-brand-gray">
                  Plataforma digital
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl p-10 text-white">
              <div className="font-roboto-condensed font-black text-6xl md:text-7xl leading-none mb-4">
                ¿Sabías
                <br />
                que...?
              </div>
              <p className="font-roboto text-white/90 leading-relaxed mb-6">
                Las operaciones de separación representan más del{" "}
                <strong className="text-brand-orange">40%</strong> de los
                costos de capital en una planta química moderna. Dominar su
                diseño y operación es esencial para cualquier ingeniero
                químico.
              </p>
              <div className="pt-6 border-t border-white/20">
                <div className="font-roboto font-bold text-sm">
                  Dept. Ingeniería Química
                </div>
                <div className="font-roboto text-xs text-white/70 mt-0.5">
                  Universidad Metropolitana
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                         OPERACIONES                           */
/* ============================================================ */
function Operaciones() {
  const items = [
    {
      title: "Prácticas académicas",
      description:
        "Sesiones dirigidas por profesores en el horario asignado a cada asignatura del pensum de ingeniería química.",
    },
    {
      title: "Reservas individuales",
      description:
        "Espacios, equipos y reactivos disponibles por bloques horarios, previa aprobación del encargado del laboratorio.",
    },
    {
      title: "Trabajos de investigación",
      description:
        "Soporte para proyectos de pregrado, tesis de grado y colaboraciones con profesores en áreas de frontera.",
    },
    {
      title: "Inventario trazable",
      description:
        "Cada activo tiene código único, historial de uso y alertas automáticas cuando el stock baja del umbral.",
    },
    {
      title: "Biblioteca de manuales",
      description:
        "Guías de práctica siempre disponibles — consultables antes y durante el experimento desde cualquier dispositivo.",
    },
    {
      title: "Protocolos de seguridad",
      description:
        "Normativas estrictas alineadas con las regulaciones para el manejo responsable de sustancias químicas.",
    },
  ];
  return (
    <section id="operaciones" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block font-roboto font-bold text-xs uppercase tracking-wider text-brand-orange mb-3">
            Operaciones
          </div>
          <h2 className="titular text-brand-primary mb-4">
            Seis formas de habitar el laboratorio
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-primary/30 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <span className="font-roboto-condensed font-black text-xl text-brand-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
              </div>
              <h3 className="font-roboto font-bold text-lg text-brand-secondary mb-3">
                {item.title}
              </h3>
              <p className="font-roboto text-sm text-brand-gray leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                          PROCESO                              */
/* ============================================================ */
function Proceso() {
  const steps = [
    {
      n: "01",
      title: "Regístrate",
      description:
        "Crea tu cuenta con tu correo institucional @correo.unimet.edu.ve (estudiantes) o @unimet.edu.ve (profesores). El sistema valida el dominio automáticamente.",
    },
    {
      n: "02",
      title: "Reserva o solicita",
      description:
        "Selecciona el espacio, equipo o reactivo que necesitas. Elige fecha, bloque horario y justifica el uso. La solicitud queda registrada al instante.",
    },
    {
      n: "03",
      title: "Recibe confirmación",
      description:
        "El profesor revisa y aprueba o rechaza con motivo. Te notificamos por correo y WhatsApp. Asiste al laboratorio a la hora acordada.",
    },
  ];
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block font-roboto font-bold text-xs uppercase tracking-wider text-brand-orange mb-3">
            Cómo funciona
          </div>
          <h2 className="titular text-brand-primary mb-4">
            Tres pasos para empezar
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[17%] right-[17%] h-0.5 bg-gradient-to-r from-brand-primary via-brand-orange to-brand-secondary opacity-30" />

          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 h-full hover:border-brand-primary/30 hover:shadow-lg transition-all relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <span className="font-roboto-condensed font-black text-3xl text-white">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-roboto font-bold text-xl text-brand-secondary mb-3 text-center">
                  {s.title}
                </h3>
                <p className="font-roboto text-brand-gray leading-relaxed text-center">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                          CATÁLOGO                             */
/* ============================================================ */
function Catalogo() {
  const equipos = [
    {
      code: "EQUIP-01",
      name: "Destilación Continua",
      type: "Separación vapor-líquido",
      color: "bg-brand-primary",
    },
    {
      code: "EQUIP-02",
      name: "Destilación por Carga",
      type: "Destilación batch",
      color: "bg-brand-secondary",
    },
    {
      code: "EQUIP-03",
      name: "Extracción Líq-Líq",
      type: "Separación por solubilidad",
      color: "bg-brand-orange",
    },
    {
      code: "EQUIP-04",
      name: "Absorción Gas-Líq",
      type: "Captura de gases",
      color: "bg-brand-orange-secondary",
    },
    {
      code: "EQUIP-05",
      name: "Filtración a Presión",
      type: "Separación mecánica",
      color: "bg-brand-primary",
    },
    {
      code: "EQUIP-06",
      name: "Fluidización",
      type: "Lechos fluidizados",
      color: "bg-brand-secondary",
    },
    {
      code: "EQUIP-07",
      name: "Secado por Convección",
      type: "Transferencia de masa",
      color: "bg-brand-orange",
    },
    {
      code: "EQUIP-08",
      name: "Refractómetro",
      type: "Instrumentación óptica",
      color: "bg-brand-orange-secondary",
    },
  ];
  return (
    <section id="catalogo" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block font-roboto font-bold text-xs uppercase tracking-wider text-brand-orange mb-3">
            Catálogo
          </div>
          <h2 className="titular text-brand-primary mb-4">
            Equipos disponibles
          </h2>
          <p className="font-roboto text-brand-gray max-w-2xl mx-auto">
            Ocho equipos especializados que cubren las principales operaciones
            unitarias de la ingeniería química.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipos.map((e) => (
            <div
              key={e.code}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className={`h-2 ${e.color}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`${e.color} text-white font-roboto font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md`}
                  >
                    {e.code}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full ${e.color}`} />
                  </div>
                </div>
                <h3 className="font-roboto font-bold text-lg text-brand-secondary mb-2 leading-tight">
                  {e.name}
                </h3>
                <p className="font-roboto text-xs text-brand-gray">{e.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                         PROFESORES                            */
/* ============================================================ */
function Profesores({ professors }: { professors: PublicProfessor[] }) {
  if (professors.length === 0) return null;
  return (
    <section id="profesores" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block font-roboto font-bold text-xs uppercase tracking-wider text-brand-orange mb-3">
            Nuestro equipo
          </div>
          <h2 className="titular text-brand-primary mb-4">
            Profesores del laboratorio
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {professors.slice(0, 4).map((p) => {
            const initials = p.name
              .split(" ")
              .filter((w) => w.length > 2)
              .slice(0, 2)
              .map((w) => w[0])
              .join("");
            return (
              <div
                key={p._id}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-brand-primary/30 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-roboto-condensed font-black text-2xl mb-5 mx-auto">
                  {initials}
                </div>
                <h3 className="font-roboto font-bold text-base text-brand-secondary mb-2 text-center leading-tight">
                  {p.name}
                </h3>
                {p.email && (
                  <a
                    href={`mailto:${p.email}`}
                    className="block text-center font-roboto text-xs text-brand-orange hover:underline mb-4 truncate"
                  >
                    {p.email}
                  </a>
                )}
                {p.asignatures.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="font-roboto font-bold text-[10px] uppercase tracking-wider text-brand-gray mb-2 text-center">
                      Imparte
                    </div>
                    <ul className="space-y-1">
                      {p.asignatures.slice(0, 2).map((a) => (
                        <li
                          key={a}
                          className="font-roboto text-xs text-brand-gray text-center"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/informacion"
            className="inline-flex items-center gap-2 font-roboto font-bold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            Ver el equipo completo
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                         NORMATIVAS                            */
/* ============================================================ */
function Normativas() {
  const rules = [
    "Uso obligatorio de bata, pantalón largo y zapato cerrado durante toda la permanencia en el laboratorio.",
    "Lectura previa del manual de procedimiento antes de manipular cualquier equipo o reactivo.",
    "Prohibido el ingreso de visitantes o acompañantes sin autorización del encargado del laboratorio.",
    "Notificación inmediata al encargado sobre cualquier falla o daño observado en el instrumental.",
    "Manejo responsable de desechos químicos según el protocolo de disposición vigente.",
    "Cumplimiento estricto de las normas sanitarias y de bioseguridad de la universidad.",
  ];
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block font-roboto font-bold text-xs uppercase tracking-wider text-brand-orange mb-3">
            Seguridad
          </div>
          <h2 className="titular text-brand-primary mb-4">
            Normativas del laboratorio
          </h2>
          <p className="font-roboto text-brand-gray max-w-2xl mx-auto">
            Protocolos estrictos que garantizan un ambiente seguro y
            productivo para todos los usuarios del laboratorio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {rules.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-brand-primary text-white font-roboto-condensed font-black flex items-center justify-center">
                {i + 1}
              </div>
              <p className="font-roboto text-sm text-brand-gray leading-relaxed pt-1.5">
                {r}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/informacion#normativas"
            className="inline-flex items-center gap-2 font-roboto font-bold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            Ver todas las normativas
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                             FAQ                               */
/* ============================================================ */
function FAQ() {
  const items = [
    {
      q: "¿Quién puede utilizar el laboratorio?",
      a: "Estudiantes activos de la Universidad Metropolitana con correo @correo.unimet.edu.ve y profesores de la institución con @unimet.edu.ve. El sistema valida el dominio automáticamente durante el registro.",
    },
    {
      q: "¿Cómo se reservan los equipos?",
      a: "Dentro de tu panel personal, en la sección de reservas, selecciona el equipo, la fecha y los bloques horarios deseados. La solicitud queda pendiente hasta que el profesor encargado la revise y apruebe.",
    },
    {
      q: "¿Qué pasa si el reactivo solicitado no está disponible?",
      a: "El inventario muestra la cantidad disponible en tiempo real. Si está por debajo del umbral mínimo, el sistema emite una alerta y la solicitud puede ser rechazada con motivo por el profesor.",
    },
    {
      q: "¿Los activos del laboratorio tienen trazabilidad?",
      a: "Sí. Cada reactivo, material y equipo recibe un código único y un registro histórico completo: quién lo creó, cuándo se modificó y cada entrada o salida de stock queda asentada con autor y fecha.",
    },
    {
      q: "¿Cómo se identifica físicamente un activo?",
      a: "Cada activo cuenta con un código QR imprimible. Al escanearlo desde cualquier teléfono se abre la ficha pública con toda su información actual. Facilita el control físico sin etiquetas manuales.",
    },
    {
      q: "¿Hay soporte técnico para los usuarios?",
      a: "El encargado del laboratorio responde dudas por correo institucional y WhatsApp. Las notificaciones del sistema se envían por ambos canales para garantizar la respuesta oportuna.",
    },
  ];
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block font-roboto font-bold text-xs uppercase tracking-wider text-brand-orange mb-3">
            Preguntas frecuentes
          </div>
          <h2 className="titular text-brand-primary mb-4">
            Resuelve tus dudas
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:border-brand-primary/30 transition-colors"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 list-none">
                <span className="font-roboto font-bold text-base md:text-lg text-brand-secondary flex-1">
                  {item.q}
                </span>
                <span className="shrink-0 w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary font-roboto-condensed font-black text-2xl flex items-center justify-center transition-transform duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:text-white">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 font-roboto text-sm text-brand-gray leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                         CTA FINAL                             */
/* ============================================================ */
function CTAFinal() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary">
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="headliner text-white mb-6">¿Listo para empezar?</h2>
        <p className="subcopy text-white/90 max-w-2xl mx-auto mb-10">
          Únete a la comunidad del Laboratorio de Procesos de Separación,
          reserva tu primer bloque horario y lleva tu aprendizaje de
          ingeniería química al siguiente nivel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <button className="bg-brand-orange hover:bg-brand-orange-secondary text-white font-roboto font-bold px-10 py-5 rounded-lg transition-colors w-full sm:w-auto shadow-xl">
              Crear mi cuenta
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-primary font-roboto font-bold px-10 py-5 rounded-lg transition-colors w-full sm:w-auto">
              Ya tengo cuenta
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                            FOOTER                             */
/* ============================================================ */
function Footer() {
  return (
    <footer className="bg-brand-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="font-roboto-condensed font-black text-2xl uppercase tracking-tight leading-none mb-4">
              Lab<span className="text-brand-orange">UNIMET</span>
            </div>
            <p className="font-roboto text-sm text-white/70 leading-relaxed">
              Laboratorio de Procesos de Separación de la Universidad
              Metropolitana.
            </p>
          </div>

          <div>
            <h4 className="font-roboto font-bold text-sm uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 font-roboto text-sm text-white/70">
              <li>
                <a href="#pilares" className="hover:text-brand-orange">
                  Pilares
                </a>
              </li>
              <li>
                <a href="#operaciones" className="hover:text-brand-orange">
                  Operaciones
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-brand-orange">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#profesores" className="hover:text-brand-orange">
                  Profesores
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-roboto font-bold text-sm uppercase tracking-wider mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2 font-roboto text-sm text-white/70">
              <li>
                <Link href="/auth/login" className="hover:text-brand-orange">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/register"
                  className="hover:text-brand-orange"
                >
                  Crear cuenta
                </Link>
              </li>
              <li>
                <Link href="/informacion" className="hover:text-brand-orange">
                  Información
                </Link>
              </li>
              <li>
                <Link href="/horarios" className="hover:text-brand-orange">
                  Horarios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-roboto font-bold text-sm uppercase tracking-wider mb-4">
              Ubicación
            </h4>
            <address className="font-roboto not-italic text-sm text-white/70 leading-relaxed">
              Distribuidor Universidad
              <br />
              Av. Boyacá, Caracas
              <br />
              Terrazas del Ávila
              <br />
              Zona postal 1073
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-roboto text-xs text-white/60">
            © {new Date().getFullYear()} Universidad Metropolitana · Todos los
            derechos reservados
          </p>
          <div className="flex items-center gap-2 font-roboto text-xs text-white/60">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            unimetlabs.lat
          </div>
        </div>
      </div>
    </footer>
  );
}
