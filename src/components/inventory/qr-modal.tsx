"use client";

interface Props {
  open: boolean;
  assetCode: string;
  itemName: string;
  onClose: () => void;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Modal para mostrar e imprimir el código QR de un activo.
 * El QR apunta a https://unimetlabs.lat/activo/:code (ficha pública).
 */
export function QRModal({ open, assetCode, itemName, onClose }: Props) {
  if (!open) return null;

  const pngUrl = `/api/assets/${assetCode}/qr?format=png&size=400`;
  const svgUrl = `/api/assets/${assetCode}/qr?format=svg&size=400`;

  const print = () => {
    const w = window.open("", "_blank", "width=500,height=600");
    if (!w) return;
    w.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Etiqueta ${assetCode}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            h1 { font-size: 14px; margin: 0 0 4px; }
            .code { font-family: monospace; font-size: 16px; font-weight: bold; color: #003087; }
            img { display: block; margin: 12px auto; }
            .brand { color: #003087; font-weight: bold; font-size: 11px; margin-top: 8px; }
            .brand span { color: #ff8200; }
          </style>
        </head>
        <body>
          <h1>${itemName}</h1>
          <div class="code">${assetCode}</div>
          <img src="${pngUrl}" width="300" height="300" alt="QR" />
          <div class="brand">Lab<span>UNIMET</span> · unimetlabs.lat</div>
          <script>
            window.onload = function() { setTimeout(function() { window.print(); }, 300); };
          </script>
        </body>
      </html>
    `);
    w.document.close();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-1 text-xl font-bold text-[var(--brand-secondary)]">
          Código QR del activo
        </h2>
        <p className="mb-4 text-sm text-[var(--brand-gray)]">{itemName}</p>
        <p className="mb-4 text-center font-mono text-lg font-bold text-[var(--brand-primary)]">
          {assetCode}
        </p>

        <div className="mb-4 flex justify-center rounded-xl border border-border bg-gray-50 p-4">
          <img src={pngUrl} alt={`QR ${assetCode}`} width={260} height={260} />
        </div>

        <p className="mb-4 text-center text-xs text-[var(--brand-gray)]">
          Al escanear abre la ficha pública del activo
        </p>

        <div className="flex gap-2">
          <button
            onClick={print}
            className="flex-1 rounded-md bg-[var(--brand-primary)] px-4 py-2 text-sm font-bold text-white hover:bg-[var(--brand-secondary)]"
          >
            🖨 Imprimir etiqueta
          </button>
          <a
            href={svgUrl}
            download={`${assetCode}.svg`}
            className="flex-1 rounded-md border border-[var(--brand-primary)] px-4 py-2 text-center text-sm font-bold text-[var(--brand-primary)] hover:bg-blue-50"
          >
            Descargar SVG
          </a>
        </div>
        <button
          onClick={onClose}
          className="mt-2 w-full rounded-md border border-border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
