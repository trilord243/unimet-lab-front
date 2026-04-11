export default function AdminDashboard() {
  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">
        Panel del Superadmin
      </h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Control total del sistema. Gestiona usuarios, contenido público
        del lab y métricas.
      </p>
    </div>
  );
}
