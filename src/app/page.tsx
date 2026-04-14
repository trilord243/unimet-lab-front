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
    <div className="min-h-screen bg-[#F5F1E8] text-[#0A0E1A] selection:bg-[#0A0E1A] selection:text-[#F5F1E8]">
      <Masthead />
      <main>
        <Hero />
        <MastheadStrip />
        <Proposito />
        <Operacion />
        <Proceso />
        <Catalogo />
        <Profesores professors={professors} />
        <Normativas />
        <FAQ />
        <FinalCTA />
      </main>
      <ColophonFooter />
    </div>
  );
}

/* ============================================================ */
/*                         MASTHEAD                              */
/* ============================================================ */
function Masthead() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#0A0E1A]/15 bg-[#F5F1E8]/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-baseline justify-between gap-6 px-6 py-5 md:px-10">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="ed-display text-[22px] italic font-medium tracking-tight text-[#0A0E1A]">
            Lab<span className="not-italic text-[#FF8200]">·</span>UNIMET
          </span>
          <span className="ed-mono hidden text-[10px] uppercase tracking-[0.18em] text-[#0A0E1A]/55 sm:inline">
            / Procesos de Separación
          </span>
        </Link>
        <nav className="ed-mono hidden items-baseline gap-8 text-[10.5px] uppercase tracking-[0.18em] text-[#0A0E1A]/70 md:flex">
          <a href="#proposito" className="transition-colors hover:text-[#FF8200]">
            01 / Propósito
          </a>
          <a href="#operacion" className="transition-colors hover:text-[#FF8200]">
            02 / Operación
          </a>
          <a href="#catalogo" className="transition-colors hover:text-[#FF8200]">
            03 / Catálogo
          </a>
          <a href="#equipo" className="transition-colors hover:text-[#FF8200]">
            04 / Equipo
          </a>
        </nav>
        <Link
          href="/auth/login"
          className="ed-mono group flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-[#0A0E1A]"
        >
          <span>Ingresar</span>
          <span className="inline-block h-[1px] w-6 bg-[#0A0E1A] transition-all group-hover:w-10 group-hover:bg-[#FF8200]" />
        </Link>
      </div>
    </header>
  );
}

/* ============================================================ */
/*                           HERO                                */
/* ============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#0A0E1A]/15">
      {/* Technical grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, #0A0E1A 1px, transparent 1px), linear-gradient(to bottom, #0A0E1A 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      {/* Decorative corner brackets */}
      <svg
        aria-hidden
        className="absolute left-6 top-6 text-[#FF8200] md:left-10 md:top-10"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M1 10 L1 1 L10 1" />
      </svg>
      <svg
        aria-hidden
        className="absolute right-6 top-6 text-[#FF8200] md:right-10 md:top-10"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M27 10 L27 1 L18 1" />
      </svg>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-16 px-6 py-20 md:grid-cols-12 md:gap-0 md:px-10 md:py-32">
        {/* Left — headline + copy */}
        <div className="md:col-span-7 md:pr-10">
          <div className="ed-rise ed-mono ed-delay-1 mb-10 flex items-center gap-4 text-[10.5px] uppercase tracking-[0.2em] text-[#0A0E1A]/60">
            <span className="h-[1px] w-10 bg-[#FF8200]" />
            <span>Vol. I · N.º 01</span>
            <span className="h-[1px] w-4 bg-[#0A0E1A]/20" />
            <span>UNIMET 2026</span>
          </div>

          <h1 className="ed-display ed-rise ed-delay-2 text-[52px] font-normal leading-[0.94] tracking-[-0.025em] text-[#0A0E1A] md:text-[92px]">
            Ingeniería de{" "}
            <em className="font-normal italic text-[#1859A9]">procesos</em>
            <br />
            en su forma más{" "}
            <em className="font-normal italic">tangible</em>.
          </h1>

          <p className="ed-body ed-rise ed-delay-3 mt-10 max-w-xl text-[17px] leading-[1.65] text-[#0A0E1A]/80">
            El{" "}
            <span className="italic">
              Laboratorio de Procesos de Separación
            </span>{" "}
            de la Universidad Metropolitana es el espacio donde los
            estudiantes de ingeniería química se enfrentan a destilación,
            extracción, absorción, filtración y secado — las operaciones
            unitarias que mueven la industria.
          </p>

          <div className="ed-rise ed-delay-4 mt-12 flex flex-wrap items-center gap-7">
            <Link
              href="/auth/register"
              className="ed-body group inline-flex items-center gap-3 border-2 border-[#0A0E1A] bg-[#0A0E1A] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.12em] text-[#F5F1E8] transition-all hover:border-[#FF8200] hover:bg-[#FF8200]"
            >
              Solicitar acceso
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="#proposito"
              className="ed-body text-[13px] uppercase tracking-[0.12em] text-[#0A0E1A] underline decoration-[#FF8200] decoration-2 underline-offset-[6px] hover:text-[#FF8200]"
            >
              Conocer el laboratorio
            </Link>
          </div>
        </div>

        {/* Right — distillation diagram */}
        <div className="ed-rise ed-delay-3 md:col-span-5 md:pl-2">
          <DistillationDiagram />
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                 DISTILLATION DIAGRAM (SVG)                    */
/* ============================================================ */
function DistillationDiagram() {
  return (
    <figure className="relative">
      <div className="relative">
        <svg
          viewBox="0 0 400 560"
          fill="none"
          stroke="#0A0E1A"
          strokeWidth="1.25"
          strokeLinecap="round"
          className="h-auto w-full max-w-[420px]"
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
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#0A0E1A" stroke="none" />
            </marker>
          </defs>

          <g stroke="#FF8200" strokeWidth="1.5">
            <path d="M 6 6 L 24 6 M 6 6 L 6 24" />
            <path d="M 394 6 L 376 6 M 394 6 L 394 24" />
            <path d="M 6 554 L 24 554 M 6 554 L 6 536" />
            <path d="M 394 554 L 376 554 M 394 554 L 394 536" />
          </g>

          {/* Column body */}
          <rect x="170" y="120" width="60" height="300" />

          {/* Trays */}
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

          {/* Condenser */}
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

          <path d="M 345 95 L 380 95" markerEnd="url(#arrow-head)" />

          {/* Reboiler */}
          <ellipse cx="200" cy="450" rx="48" ry="26" />
          <path d="M 200 420 L 200 424" />
          <path
            d="M 180 462 q 8 -8 16 0 t 16 0 t 16 0"
            strokeWidth="1"
            fill="none"
          />

          <path
            d="M 248 450 L 305 450 L 305 490"
            markerEnd="url(#arrow-head)"
          />

          {/* Feed */}
          <path d="M 90 270 L 170 270" markerEnd="url(#arrow-head)" />

          {/* Labels */}
          <g
            fontFamily="JetBrains Mono, monospace"
            fontSize="10"
            fontWeight="500"
            fill="#0A0E1A"
            stroke="none"
          >
            <text x="22" y="265">F</text>
            <text x="22" y="280" fontSize="8" opacity="0.55">alimentación</text>

            <text x="382" y="85">D</text>
            <text x="382" y="100" fontSize="8" opacity="0.55">destilado</text>

            <text x="312" y="505">B</text>
            <text x="312" y="519" fontSize="8" opacity="0.55">fondo</text>

            <text x="260" y="142">C</text>
            <text x="260" y="156" fontSize="8" opacity="0.55">condensador</text>

            <text x="255" y="450">R</text>
            <text x="255" y="464" fontSize="8" opacity="0.55">rehervidor</text>
          </g>

          {/* Tray number ticks */}
          <g
            fontFamily="JetBrains Mono, monospace"
            fontSize="7"
            fill="#0A0E1A"
            opacity="0.5"
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

          {/* Scale bar */}
          <g
            stroke="#0A0E1A"
            strokeWidth="1"
            fontFamily="JetBrains Mono, monospace"
            fontSize="8"
          >
            <line x1="40" y1="530" x2="100" y2="530" />
            <line x1="40" y1="526" x2="40" y2="534" />
            <line x1="100" y1="526" x2="100" y2="534" />
            <text x="42" y="522" fill="#0A0E1A" stroke="none" opacity="0.55">
              0.5 m
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="ed-mono mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#0A0E1A]/55">
        <span className="text-[#FF8200]">Fig. 01</span>
        <span className="h-[1px] flex-1 bg-[#0A0E1A]/15" />
        <span>Columna de destilación · esquema</span>
      </figcaption>
    </figure>
  );
}

/* ============================================================ */
/*                      MASTHEAD STRIP                           */
/* ============================================================ */
function MastheadStrip() {
  const items = [
    { label: "Equipos inventariados", value: "08", sub: "operaciones unitarias" },
    { label: "Reactivos en stock", value: "10", sub: "trazables por código" },
    { label: "Profesores", value: "04", sub: "del Dept. Química" },
    { label: "Fundación UNIMET", value: "1970", sub: "Caracas · Venezuela" },
  ];
  return (
    <section className="border-b border-[#0A0E1A]/15 bg-[#EDE6D4]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-[#0A0E1A]/15 md:grid-cols-4 md:divide-x">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`border-[#0A0E1A]/15 px-6 py-8 md:py-12 ${i < 2 ? "border-b md:border-b-0" : ""} ${i % 2 === 0 ? "border-r md:border-r-0" : ""}`}
          >
            <div className="ed-display text-[52px] font-light leading-none tracking-[-0.02em] text-[#0A0E1A] md:text-[72px]">
              {item.value}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-[1px] w-4 bg-[#FF8200]" />
              <span className="ed-mono text-[10px] uppercase tracking-[0.15em] text-[#0A0E1A]/70">
                {item.label}
              </span>
            </div>
            <div className="ed-body mt-1 text-[12px] italic text-[#0A0E1A]/50">
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/*                      SECTION HEADER                           */
/* ============================================================ */
function SectionHeader({
  num,
  label,
  title,
  light,
}: {
  num: string;
  label: string;
  title: React.ReactNode;
  light?: boolean;
}) {
  const textColor = light ? "text-[#F5F1E8]" : "text-[#0A0E1A]";
  const muted = light ? "text-[#F5F1E8]/60" : "text-[#0A0E1A]/55";
  const rule = light ? "bg-[#F5F1E8]/20" : "bg-[#0A0E1A]/20";
  return (
    <div className="mb-14 md:mb-20">
      <div
        className={`ed-mono mb-6 flex items-center gap-4 text-[10.5px] uppercase tracking-[0.2em] ${muted}`}
      >
        <span>§ {num}</span>
        <span className={`h-[1px] flex-1 ${rule}`} />
        <span>{label}</span>
      </div>
      <h2
        className={`ed-display text-[42px] font-normal leading-[1.02] tracking-[-0.025em] md:text-[72px] ${textColor}`}
      >
        {title}
      </h2>
    </div>
  );
}

/* ============================================================ */
/*                         PROPÓSITO                             */
/* ============================================================ */
function Proposito() {
  return (
    <section
      id="proposito"
      className="border-b border-[#0A0E1A]/15 px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          num="01"
          label="Propósito"
          title={
            <>
              Formamos ingenieros que
              <br />
              resuelven problemas{" "}
              <em className="font-normal italic text-[#1859A9]">reales</em>.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-20">
          <blockquote className="relative md:col-span-5">
            <span
              aria-hidden
              className="ed-display absolute -left-4 -top-6 text-[84px] leading-none text-[#FF8200]/70"
            >
              “
            </span>
            <p className="ed-display relative text-[24px] italic leading-[1.3] text-[#0A0E1A] md:text-[30px]">
              Aquí la teoría deja de ser abstracción. Cada estudiante
              manipula una columna de destilación, extrae una fase en un
              embudo separador, observa un lecho fluidizado.
            </p>
            <footer className="ed-mono mt-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#0A0E1A]/55">
              <span className="h-[1px] w-8 bg-[#0A0E1A]/30" />
              Dept. de Ingeniería Química · UNIMET
            </footer>
          </blockquote>

          <div className="ed-body text-[16px] leading-[1.7] text-[#0A0E1A]/80 md:col-span-7 md:columns-2 md:gap-10">
            <p className="mb-5">
              Nuestro laboratorio conecta la teoría de operaciones unitarias
              con la industria química, farmacéutica, petroquímica y
              alimentaria. Es el mismo instrumental que opera a escala
              industrial, contenido en un formato didáctico.
            </p>
            <p className="mb-5">
              Aquí los estudiantes aprenden a manipular columnas empacadas y
              de platos, equipos de extracción líquido-líquido, sistemas de
              absorción gaseosa, filtros a presión constante y secadores por
              convección. Cada práctica es un puente entre un libro y una
              planta real.
            </p>
            <p>
              Digitalizamos el acceso para que el tiempo del estudiante se
              gaste donde importa: frente al equipo, no frente a una hoja de
              papel. Reservar, solicitar reactivos, consultar manuales —
              todo en segundos desde cualquier dispositivo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                         OPERACIÓN                             */
/* ============================================================ */
function Operacion() {
  const items = [
    {
      num: "01",
      title: "Prácticas académicas",
      text: "Sesiones dirigidas por profesores en el horario asignado a cada asignatura del pensum de ingeniería química.",
    },
    {
      num: "02",
      title: "Reservas individuales",
      text: "Espacios, equipos y reactivos disponibles por bloques horarios, previa aprobación del encargado del laboratorio.",
    },
    {
      num: "03",
      title: "Trabajos de investigación",
      text: "Soporte para proyectos de pregrado, tesis de grado y colaboraciones con profesores en áreas de frontera.",
    },
    {
      num: "04",
      title: "Inventario trazable",
      text: "Cada activo tiene código único, historial de uso completo y alertas automáticas cuando el stock baja del umbral.",
    },
    {
      num: "05",
      title: "Biblioteca de manuales",
      text: "Guías de práctica siempre disponibles — consultables antes y durante el experimento desde cualquier dispositivo.",
    },
    {
      num: "06",
      title: "Protocolos de seguridad",
      text: "Normativas estrictas alineadas con las regulaciones para el manejo responsable de sustancias químicas.",
    },
  ];
  return (
    <section
      id="operacion"
      className="border-b border-[#0A0E1A]/15 bg-[#EDE6D4] px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          num="02"
          label="Operación"
          title={
            <>
              Seis formas de habitar
              <br />
              el <em className="font-normal italic text-[#1859A9]">laboratorio</em>.
            </>
          }
        />

        <ol className="grid grid-cols-1 border-t border-[#0A0E1A]/20 md:grid-cols-2">
          {items.map((item, i) => (
            <li
              key={item.num}
              className={`group flex gap-6 border-b border-[#0A0E1A]/20 py-10 transition-colors hover:bg-[#F5F1E8]/50 md:gap-10 md:py-12 ${
                i % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10"
              }`}
            >
              <div className="ed-display text-[58px] font-light leading-none text-[#FF8200] md:text-[82px]">
                {item.num}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="ed-display text-[23px] font-normal leading-tight tracking-[-0.01em] text-[#0A0E1A] md:text-[28px]">
                  {item.title}
                </h3>
                <p className="ed-body mt-3 max-w-md text-[14.5px] leading-[1.62] text-[#0A0E1A]/70">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
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
      n: "I",
      title: "Verificar acceso",
      text: "El sistema valida que el correo institucional corresponda a estudiante (@correo.unimet.edu.ve) o profesor (@unimet.edu.ve) antes de permitir el registro.",
    },
    {
      n: "II",
      title: "Elegir recurso",
      text: "Selecciona el espacio, equipo o reactivo disponible. Los bloques horarios siguen el esquema académico: seis franjas de 1h 45min, de lunes a viernes.",
    },
    {
      n: "III",
      title: "Recibir confirmación",
      text: "El profesor revisa, aprueba o rechaza con motivo. La notificación llega por correo y WhatsApp en segundos — sin revisar manualmente.",
    },
  ];
  return (
    <section className="border-b border-[#0A0E1A]/15 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          num="03"
          label="Proceso"
          title={
            <>
              Del registro
              <br />
              a la <em className="font-normal italic text-[#1859A9]">práctica</em>.
            </>
          }
        />
        <div className="grid grid-cols-1 divide-y divide-[#0A0E1A]/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map((s, i) => (
            <article
              key={s.n}
              className={`py-12 md:py-0 ${
                i === 0
                  ? "md:pr-12"
                  : i === steps.length - 1
                    ? "md:pl-12"
                    : "md:px-12"
              }`}
            >
              <div className="ed-display text-[140px] font-light leading-[0.8] tracking-[-0.04em] text-[#1859A9] md:text-[200px]">
                {s.n}
              </div>
              <h3 className="ed-display mt-2 text-[26px] leading-tight text-[#0A0E1A] md:text-[30px]">
                {s.title}
              </h3>
              <p className="ed-body mt-4 max-w-sm text-[15px] leading-[1.65] text-[#0A0E1A]/70">
                {s.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                         CATÁLOGO                              */
/* ============================================================ */
function Catalogo() {
  const equipos = [
    {
      code: "EQUIP-01",
      name: "Columna de Destilación Continua",
      type: "Separación vapor-líquido",
    },
    {
      code: "EQUIP-02",
      name: "Columna de Destilación por Carga",
      type: "Destilación batch",
    },
    {
      code: "EQUIP-03",
      name: "Equipo de Extracción Líquido-Líquido",
      type: "Separación por solubilidad",
    },
    {
      code: "EQUIP-04",
      name: "Equipo de Absorción Gas-Líquido",
      type: "Captura de CO₂",
    },
    {
      code: "EQUIP-05",
      name: "Filtración a Presión Constante",
      type: "Separación mecánica",
    },
    {
      code: "EQUIP-06",
      name: "Equipo de Fluidización",
      type: "Lechos fluidizados",
    },
    {
      code: "EQUIP-07",
      name: "Secado por Convección",
      type: "Transferencia de masa",
    },
    {
      code: "EQUIP-08",
      name: "Refractómetro",
      type: "Instrumentación óptica",
    },
  ];
  return (
    <section
      id="catalogo"
      className="border-b border-[#0A0E1A]/15 bg-[#EDE6D4] px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          num="04"
          label="Catálogo"
          title={
            <>
              Índice de
              <br />
              equipos{" "}
              <em className="font-normal italic text-[#1859A9]">disponibles</em>.
            </>
          }
        />

        <div className="border-t-2 border-[#0A0E1A]">
          {equipos.map((e, i) => (
            <div
              key={e.code}
              className="group flex items-baseline gap-4 border-b border-[#0A0E1A]/20 py-6 transition-colors hover:bg-[#F5F1E8]/70 md:gap-8"
            >
              <span className="ed-mono w-8 text-[10.5px] uppercase tracking-[0.1em] text-[#0A0E1A]/45">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="ed-display text-[20px] font-normal leading-tight text-[#0A0E1A] md:text-[26px]">
                {e.name}
              </h3>
              <span className="hidden flex-1 items-baseline md:flex">
                <span className="mx-2 flex-1 border-b border-dotted border-[#0A0E1A]/30" />
              </span>
              <span className="ed-body hidden text-[13px] italic text-[#0A0E1A]/60 md:inline">
                {e.type}
              </span>
              <span className="ed-mono text-[10.5px] uppercase tracking-[0.1em] text-[#FF8200]">
                {e.code}
              </span>
            </div>
          ))}
        </div>
        <div className="ed-mono mt-6 text-[10px] uppercase tracking-[0.18em] text-[#0A0E1A]/50">
          8 de 8 equipos listados · actualizado 2026
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
    <section
      id="equipo"
      className="border-b border-[#0A0E1A]/15 px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          num="05"
          label="Equipo"
          title={
            <>
              Quienes{" "}
              <em className="font-normal italic text-[#1859A9]">enseñan</em>
              <br />
              e investigan.
            </>
          }
        />

        <div className="grid grid-cols-1 border-t border-[#0A0E1A]/15 md:grid-cols-2">
          {professors.slice(0, 4).map((p, i) => (
            <article
              key={p._id}
              className={`border-b border-[#0A0E1A]/15 py-10 md:py-14 ${
                i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12"
              }`}
            >
              <div className="ed-mono mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#0A0E1A]/50">
                <span>Profesor / {String(i + 1).padStart(2, "0")}</span>
                <span className="h-[1px] w-6 bg-[#FF8200]" />
              </div>
              <h3 className="ed-display text-[30px] font-normal leading-[1.05] tracking-[-0.015em] text-[#0A0E1A] md:text-[38px]">
                {p.name}
              </h3>
              {p.email && (
                <a
                  href={`mailto:${p.email}`}
                  className="ed-mono mt-3 inline-block text-[11px] text-[#FF8200] hover:underline"
                >
                  {p.email}
                </a>
              )}
              {p.asignatures.length > 0 && (
                <div className="mt-7">
                  <div className="ed-mono text-[9.5px] uppercase tracking-[0.18em] text-[#0A0E1A]/50">
                    Imparte
                  </div>
                  <ul className="ed-body mt-3 space-y-1.5 text-[14px] text-[#0A0E1A]/80">
                    {p.asignatures.slice(0, 3).map((a) => (
                      <li key={a} className="border-l-2 border-[#FF8200] pl-3">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.interestAreas && p.interestAreas.length > 0 && (
                <p className="ed-body mt-5 max-w-md text-[13.5px] italic leading-[1.5] text-[#0A0E1A]/60">
                  Investiga en{" "}
                  {p.interestAreas.slice(0, 2).join(" y ").toLowerCase()}.
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/informacion"
            className="ed-mono inline-flex items-center gap-3 text-[10.5px] uppercase tracking-[0.18em] text-[#0A0E1A]"
          >
            <span>Ver el equipo completo</span>
            <span className="inline-block h-[1px] w-10 bg-[#FF8200]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                        NORMATIVAS                             */
/* ============================================================ */
function Normativas() {
  const rules = [
    "Uso obligatorio de bata, pantalón largo y zapato cerrado durante toda la permanencia en el laboratorio.",
    "Lectura previa del manual de procedimiento antes de manipular cualquier equipo o reactivo.",
    "Prohibido el ingreso de visitantes o acompañantes sin autorización del encargado del lab.",
    "Notificación inmediata al encargado sobre cualquier falla o daño observado en el instrumental.",
    "Manejo responsable de desechos químicos según el protocolo de disposición vigente.",
    "Cumplimiento estricto de las normas sanitarias y de bioseguridad de la universidad.",
  ];
  return (
    <section className="relative overflow-hidden border-b border-[#0A0E1A]/15 bg-[#0A0E1A] px-6 py-24 text-[#F5F1E8] md:px-10 md:py-36">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(to right, #F5F1E8 1px, transparent 1px), linear-gradient(to bottom, #F5F1E8 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <SectionHeader
          num="06"
          label="Normativas"
          light
          title={
            <>
              Protocolo de
              <br />
              <em className="font-normal italic text-[#FF8200]">laboratorio</em>.
            </>
          }
        />

        <ol className="grid grid-cols-1 border-t border-[#F5F1E8]/15 md:grid-cols-2">
          {rules.map((r, i) => (
            <li
              key={i}
              className={`flex gap-6 border-b border-[#F5F1E8]/15 py-8 ${
                i % 2 === 0
                  ? "md:border-r md:border-[#F5F1E8]/15 md:pr-10"
                  : "md:pl-10"
              }`}
            >
              <div className="ed-display text-[30px] font-light italic text-[#FF8200]">
                {String(i + 1).padStart(2, "0")}.
              </div>
              <p className="ed-body flex-1 pt-1.5 text-[14.5px] leading-[1.65] text-[#F5F1E8]/85">
                {r}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                            FAQ                                */
/* ============================================================ */
function FAQ() {
  const items = [
    {
      q: "¿Quién puede utilizar el laboratorio?",
      a: "Estudiantes activos de la Universidad Metropolitana con correo @correo.unimet.edu.ve y profesores de la institución con @unimet.edu.ve. El sistema valida el dominio automáticamente durante el registro.",
    },
    {
      q: "¿Cómo se reservan los equipos?",
      a: "Dentro del panel personal, en la sección de reservas, el estudiante selecciona el equipo, la fecha y los bloques horarios deseados. La solicitud queda pendiente hasta que el profesor encargado la revise y apruebe.",
    },
    {
      q: "¿Qué pasa si el reactivo solicitado no está disponible?",
      a: "El inventario muestra la cantidad disponible en tiempo real. Si un reactivo está agotado o por debajo del umbral mínimo, el sistema emite una alerta y la solicitud puede ser rechazada con motivo por el profesor.",
    },
    {
      q: "¿Los activos del laboratorio tienen trazabilidad?",
      a: "Sí. Cada reactivo, material y equipo recibe un código único y un registro histórico completo: quién lo creó, cuándo se modificó y cada entrada o salida de stock queda asentada con autor, fecha y motivo.",
    },
    {
      q: "¿Cómo se identifica físicamente un activo?",
      a: "Cada activo cuenta con un código QR imprimible que al ser escaneado abre una ficha pública con su información actual. Esto facilita el control físico sin depender de etiquetas manuales obsoletas.",
    },
    {
      q: "¿Hay soporte técnico para los usuarios?",
      a: "El encargado del laboratorio responde dudas por correo institucional y WhatsApp. Las notificaciones del sistema se envían por ambos canales para garantizar la respuesta oportuna.",
    },
  ];
  return (
    <section className="border-b border-[#0A0E1A]/15 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          num="07"
          label="Consultas"
          title={
            <>
              Preguntas
              <br />
              <em className="font-normal italic text-[#1859A9]">frecuentes</em>.
            </>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-10 md:col-start-2">
            {items.map((item, i) => (
              <details
                key={i}
                className="group border-t border-[#0A0E1A]/15 py-7 last:border-b"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-6">
                  <span className="ed-mono text-[10px] uppercase tracking-[0.18em] text-[#0A0E1A]/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ed-display flex-1 text-[22px] font-normal leading-tight text-[#0A0E1A] md:text-[28px]">
                    {item.q}
                  </span>
                  <span className="ed-display text-[32px] font-light leading-none text-[#FF8200] transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="ed-body mt-5 max-w-2xl pl-14 text-[15px] leading-[1.7] text-[#0A0E1A]/75">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                       FINAL CTA                               */
/* ============================================================ */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-b border-[#0A0E1A]/15 px-6 py-32 md:px-10 md:py-48">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #0A0E1A 1px, transparent 1px), linear-gradient(to bottom, #0A0E1A 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] text-center">
        <div className="ed-mono mb-8 flex items-center justify-center gap-4 text-[10.5px] uppercase tracking-[0.2em] text-[#0A0E1A]/60">
          <span className="h-[1px] w-10 bg-[#FF8200]" />
          <span>Fin de la edición</span>
          <span className="h-[1px] w-10 bg-[#FF8200]" />
        </div>
        <h2 className="ed-display text-[68px] font-normal leading-[0.92] tracking-[-0.03em] text-[#0A0E1A] md:text-[160px]">
          Empecemos<span className="text-[#FF8200]">.</span>
        </h2>
        <p className="ed-body mx-auto mt-10 max-w-xl text-[17px] leading-[1.6] text-[#0A0E1A]/70">
          Crea tu cuenta con el correo institucional y reserva tu primer
          bloque horario esta semana.
        </p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-7">
          <Link
            href="/auth/register"
            className="ed-body group inline-flex items-center gap-3 border-2 border-[#0A0E1A] bg-[#0A0E1A] px-10 py-5 text-[13px] font-medium uppercase tracking-[0.12em] text-[#F5F1E8] transition-all hover:border-[#FF8200] hover:bg-[#FF8200]"
          >
            Crear cuenta
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/auth/login"
            className="ed-body text-[13px] uppercase tracking-[0.12em] text-[#0A0E1A] underline decoration-[#FF8200] decoration-2 underline-offset-[6px] hover:text-[#FF8200]"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*                   COLOPHON FOOTER                             */
/* ============================================================ */
function ColophonFooter() {
  return (
    <footer className="bg-[#F5F1E8] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-wrap items-baseline justify-between gap-4 border-b border-[#0A0E1A]/20 pb-10">
          <div>
            <div className="ed-display text-[40px] italic font-medium leading-none tracking-[-0.01em] text-[#0A0E1A] md:text-[56px]">
              Lab<span className="not-italic text-[#FF8200]">·</span>UNIMET
            </div>
            <div className="ed-mono mt-3 text-[10px] uppercase tracking-[0.18em] text-[#0A0E1A]/60">
              Laboratorio de Procesos de Separación
            </div>
          </div>
          <div className="ed-mono text-right text-[10px] uppercase tracking-[0.18em] text-[#0A0E1A]/60">
            <div>Vol. I · N.º 01</div>
            <div className="mt-1">Caracas · Venezuela</div>
            <div className="mt-1 text-[#FF8200]">unimetlabs.lat</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <FooterColumn
            label="Sumario"
            links={[
              { href: "#proposito", text: "Propósito" },
              { href: "#operacion", text: "Operación" },
              { href: "#catalogo", text: "Catálogo" },
              { href: "#equipo", text: "Equipo" },
            ]}
          />
          <FooterColumn
            label="Plataforma"
            links={[
              { href: "/auth/login", text: "Iniciar sesión" },
              { href: "/auth/register", text: "Crear cuenta" },
              { href: "/informacion", text: "Información" },
              { href: "/horarios", text: "Horarios" },
            ]}
          />
          <div>
            <div className="ed-mono mb-4 text-[9.5px] uppercase tracking-[0.2em] text-[#0A0E1A]/50">
              Ubicación
            </div>
            <address className="ed-body not-italic text-[14px] leading-[1.65] text-[#0A0E1A]/75">
              Distribuidor Universidad
              <br />
              Av. Boyacá — Caracas
              <br />
              Terrazas del Ávila
              <br />
              Zona postal 1073
            </address>
          </div>
          <div>
            <div className="ed-mono mb-4 text-[9.5px] uppercase tracking-[0.2em] text-[#0A0E1A]/50">
              Colofón
            </div>
            <div className="ed-body text-[13px] leading-[1.65] text-[#0A0E1A]/70">
              <span className="italic">Fraunces</span> para títulos.
              <br />
              <span className="italic">Instrument Sans</span> para texto.
              <br />
              <span className="italic">JetBrains Mono</span> para datos.
              <br />
              <span className="ed-mono mt-2 inline-block text-[10px] uppercase tracking-[0.15em] text-[#0A0E1A]/50">
                Est. 1970 · UNIMET
              </span>
            </div>
          </div>
        </div>

        <div className="ed-mono mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-[#0A0E1A]/15 pt-6 text-[9.5px] uppercase tracking-[0.18em] text-[#0A0E1A]/50">
          <div>
            © {new Date().getFullYear()} Universidad Metropolitana · Todos los
            derechos reservados
          </div>
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 bg-[#FF8200]" />
            <span>Impreso digitalmente en Caracas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: { href: string; text: string }[];
}) {
  return (
    <div>
      <div className="ed-mono mb-4 text-[9.5px] uppercase tracking-[0.2em] text-[#0A0E1A]/50">
        {label}
      </div>
      <ul className="ed-body space-y-2.5 text-[14px] text-[#0A0E1A]/80">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="transition-colors hover:text-[#FF8200]"
            >
              {l.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
