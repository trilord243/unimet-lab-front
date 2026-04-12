"use client";

interface Props {
  blocks: string[];
  selected: string[];
  onChange: (blocks: string[]) => void;
}

/**
 * Selector de bloques horarios (6 bloques de 1h 45min).
 * Selección múltiple, estilo chips.
 */
export function TimeBlockPicker({ blocks, selected, onChange }: Props) {
  const toggle = (block: string) => {
    if (selected.includes(block)) {
      onChange(selected.filter((b) => b !== block));
    } else {
      onChange([...selected, block]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {blocks.map((block) => {
        const active = selected.includes(block);
        return (
          <button
            key={block}
            type="button"
            onClick={() => toggle(block)}
            className={
              active
                ? "rounded-md border-2 border-[var(--brand-primary)] bg-[var(--brand-primary)] px-3 py-2 text-sm font-bold text-white"
                : "rounded-md border border-border bg-white px-3 py-2 text-sm text-gray-700 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            }
          >
            {block}
          </button>
        );
      })}
    </div>
  );
}
