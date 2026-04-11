import { Sidebar } from "@/components/layout/sidebar";

const items = [
  { href: "/panel", label: "Inicio" },
  { href: "/panel/horario-clases", label: "Horario de Clases" },
  { href: "/panel/reservas", label: "Reservas (Aprobaciones)" },
  { href: "/panel/inventario/reactivos", label: "Reactivos" },
  { href: "/panel/inventario/materiales", label: "Materiales" },
  { href: "/panel/inventario/equipos", label: "Equipos" },
  { href: "/panel/inventario/compras", label: "Compras Requeridas" },
  { href: "/panel/inventario/investigacion", label: "Investigación" },
  { href: "/panel/manuales", label: "Manuales" },
];

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={items} title="Panel del Profesor" />
      <div className="flex-1 overflow-auto bg-gray-50 p-8">{children}</div>
    </div>
  );
}
