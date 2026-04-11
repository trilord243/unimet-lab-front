import { Sidebar } from "@/components/layout/sidebar";

const items = [
  { href: "/admin/dashboard", label: "Inicio" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/profesores", label: "Profesores (landing)" },
  { href: "/admin/normativas", label: "Normativas" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={items} title="Superadmin" />
      <div className="flex-1 overflow-auto bg-gray-50 p-8">{children}</div>
    </div>
  );
}
