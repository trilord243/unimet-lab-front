import type { Manual } from "@/types";

interface Props {
  manual: Manual;
  onEdit?: () => void;
  onDelete?: () => void;
}

/**
 * Card de manual (estilo centromundox).
 * Muestra título, descripción, botones de ver y descargar.
 * Si se pasa onEdit/onDelete, muestra acciones de profesor.
 */
export function ManualCard({ manual, onEdit, onDelete }: Props) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-white shadow-sm transition-all hover:shadow-md">
      {/* Cover con gradient si no hay imagen */}
      <div
        className="flex h-32 items-center justify-center rounded-t-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]"
        style={
          manual.coverUrl
            ? {
                backgroundImage: `url(${manual.coverUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {!manual.coverUrl && (
          <div className="text-5xl text-white opacity-80">📖</div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {manual.subject && (
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--brand-orange)]">
            {manual.subject}
          </p>
        )}
        <h3 className="mb-2 text-base font-bold text-[var(--brand-secondary)]">
          {manual.title}
        </h3>
        {manual.description && (
          <p className="mb-3 flex-1 text-sm text-[var(--brand-gray)]">
            {manual.description}
          </p>
        )}

        {manual.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {manual.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-[var(--brand-gray)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-2 border-t border-border pt-3">
          <a
            href={manual.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-md bg-[var(--brand-primary)] px-3 py-2 text-center text-xs font-bold text-white hover:bg-[var(--brand-secondary)]"
          >
            Ver
          </a>
          <a
            href={manual.fileUrl}
            download
            className="flex-1 rounded-md border border-[var(--brand-primary)] px-3 py-2 text-center text-xs font-bold text-[var(--brand-primary)] hover:bg-blue-50"
          >
            Descargar
          </a>
          {onEdit && (
            <button
              onClick={onEdit}
              className="rounded-md border border-border px-3 py-2 text-xs font-medium text-[var(--brand-gray)] hover:bg-gray-50"
              title="Editar"
            >
              ✎
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
              title="Eliminar"
            >
              🗑
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
