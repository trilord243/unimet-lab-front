import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface AssetInfo {
  assetCode: string;
  type: string;
  name: string;
  description?: string | null;
  category?: string | null;
  formula?: string | null;
  casNumber?: string | null;
  brand?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  status?: string | null;
  hazardClass?: string | null;
  location?: string | null;
  quantity?: number | null;
  unit?: string | null;
  lowStock?: boolean;
}

async function fetchAsset(code: string): Promise<AssetInfo | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/assets/${encodeURIComponent(code)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as AssetInfo;
  } catch {
    return null;
  }
}

interface PageProps {
  params: Promise<{ code: string }>;
}

const TYPE_LABEL: Record<string, string> = {
  reagent: "Reactivo",
  material: "Material",
  equipment: "Equipo",
};

export default async function AssetPage({ params }: PageProps) {
  const { code } = await params;
  const asset = await fetchAsset(code);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-border bg-white">
        <div className="custom-container flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-2xl font-black text-[var(--brand-secondary)]"
          >
            Lab<span className="text-[var(--brand-orange)]">UNIMET</span>
          </Link>
          <Link
            href="/auth/login"
            className="rounded-md bg-[var(--brand-primary)] px-4 py-2 text-white hover:bg-[var(--brand-secondary)]"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      <main className="custom-container py-12">
        <Link
          href="/"
          className="text-sm text-[var(--brand-gray)] hover:text-[var(--brand-primary)]"
        >
          ← Volver al inicio
        </Link>

        {!asset ? (
          <div className="mt-8 rounded-xl border border-border bg-white p-12 text-center">
            <div className="text-6xl">❓</div>
            <h1 className="mt-4 text-2xl font-bold text-[var(--brand-secondary)]">
              Activo no encontrado
            </h1>
            <p className="mt-2 text-[var(--brand-gray)]">
              El código <span className="font-mono">{code}</span> no existe en
              nuestro inventario.
            </p>
          </div>
        ) : (
          <div className="mt-8 max-w-2xl rounded-xl border border-border bg-white shadow-sm">
            <div className="border-b border-border bg-gradient-to-br from-[var(--brand-secondary)] to-[var(--brand-primary)] px-8 py-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                {TYPE_LABEL[asset.type] || asset.type}
              </p>
              <h1 className="mt-1 text-2xl font-bold">{asset.name}</h1>
              <p className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 font-mono text-sm font-bold backdrop-blur">
                {asset.assetCode}
              </p>
            </div>

            <div className="space-y-3 p-8">
              {asset.description && (
                <p className="text-[var(--brand-gray)]">{asset.description}</p>
              )}

              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {asset.category && <Info label="Categoría" value={asset.category} />}
                {asset.formula && <Info label="Fórmula" value={asset.formula} />}
                {asset.casNumber && (
                  <Info label="CAS" value={asset.casNumber} mono />
                )}
                {asset.brand && <Info label="Marca" value={asset.brand} />}
                {asset.model && <Info label="Modelo" value={asset.model} />}
                {asset.serialNumber && (
                  <Info label="N° serie" value={asset.serialNumber} mono />
                )}
                {asset.location && (
                  <Info label="Ubicación" value={asset.location} />
                )}
                {asset.status && <Info label="Estado" value={asset.status} />}
                {asset.quantity !== null && asset.quantity !== undefined && (
                  <Info
                    label="Cantidad disponible"
                    value={`${asset.quantity} ${asset.unit || ""}`}
                    {...(asset.lowStock ? { highlight: true } : {})}
                  />
                )}
                {asset.hazardClass && (
                  <div className="sm:col-span-2">
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-[var(--brand-orange-secondary)]">
                      ⚠ {asset.hazardClass}
                    </span>
                  </div>
                )}
              </dl>

              <div className="mt-6 rounded-md bg-blue-50 p-4 text-sm text-[var(--brand-primary)]">
                <strong>¿Necesitas reservar o solicitar este activo?</strong>
                <br />
                Inicia sesión con tu correo UNIMET para hacer una solicitud al
                profesor encargado.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Info({
  label,
  value,
  mono,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
        {label}
      </dt>
      <dd
        className={`${mono ? "font-mono" : ""} ${highlight ? "font-bold text-red-600" : "text-gray-900"}`}
      >
        {value}
      </dd>
    </div>
  );
}
