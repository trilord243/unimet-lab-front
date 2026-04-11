import { Sidebar } from "@/components/layout/sidebar";

const items = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/reservar-espacio", label: "Reservar Espacio" },
  { href: "/dashboard/reservar-equipo", label: "Reservar Equipo" },
  { href: "/dashboard/solicitar-reactivo", label: "Solicitar Reactivo" },
  { href: "/dashboard/mis-reservas", label: "Mis Reservas" },
  { href: "/dashboard/manuales", label: "Manuales" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={items} title="Panel del Estudiante" />
      <div className="flex-1 overflow-auto bg-gray-50 p-8">{children}</div>
    </div>
  );
}
