export default function ReservarEspacioPage() {
  return (
    <div>
      <h1 className="titular text-[var(--brand-secondary)]">Reservar Espacio</h1>
      <p className="mt-2 text-[var(--brand-gray)]">
        Selecciona el espacio, fecha y bloques horarios.
      </p>
      {/* TODO: formulario con SpaceSelector + DatePicker + TimeBlockPicker */}
      <div className="mt-8 rounded-xl border border-dashed border-border bg-white p-12 text-center text-[var(--brand-gray)]">
        Formulario de reserva (pendiente)
      </div>
    </div>
  );
}
