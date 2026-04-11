# UNIMET Lab Frontend

Next.js 16 + Tailwind 4 + Shadcn — frontend del **Laboratorio de Procesos
de Separación** de la Universidad Metropolitana.

Mismo stack y patrones que `tesis_front` (centromundox-client).

## Setup

```bash
npm install
cp .env.example .env.local
PORT=3001 npm run dev
```

Frontend en `http://localhost:3001`. Apunta al backend
`unimet-lab-api` en `http://localhost:3000` (configurable con
`NEXT_PUBLIC_API_URL`).

## Estructura

```
src/
├── app/
│   ├── page.tsx                       # Landing pública (4 secciones)
│   ├── informacion/page.tsx           # Info general pública
│   ├── horarios/page.tsx              # Calendario público
│   ├── auth/(login|register)/         # Auth
│   ├── dashboard/                     # Estudiante
│   │   ├── reservar-espacio/
│   │   ├── reservar-equipo/
│   │   ├── solicitar-reactivo/
│   │   ├── mis-reservas/
│   │   └── manuales/
│   ├── panel/                         # Profesor
│   │   ├── horario-clases/
│   │   ├── reservas/                  # Aprobaciones
│   │   ├── inventario/{reactivos,materiales,equipos,compras,investigacion}
│   │   └── manuales/
│   ├── admin/                         # Superadmin
│   │   ├── dashboard/
│   │   ├── usuarios/
│   │   ├── profesores/                # CRUD landing
│   │   ├── normativas/
│   │   └── analytics/
│   └── api/auth/(login|register|logout)/route.ts   # Proxies al backend
├── components/layout/sidebar.tsx
├── lib/
│   ├── utils.ts (cn)
│   └── api.ts
├── types/index.ts
middleware.ts                          # JWT + role routing (raíz)
```

## Roles y rutas

| Rol         | Ruta principal      |
|-------------|---------------------|
| student     | `/dashboard`        |
| professor   | `/panel`            |
| superadmin  | `/admin/dashboard`  |

El middleware redirige automáticamente según el rol del JWT.

## Paleta de marca

Heredada de centromundox:
- Azul principal: `#1859A9`
- Naranja principal: `#FF8200`
- Azul secundario: `#003087`
- Naranja secundario: `#F68629`

Tipografía: Roboto + Roboto Condensed (Google Fonts).

## Patrón de fetching

**Nunca** llamar al backend directo desde el cliente. Usar las API
routes en `src/app/api/*` como proxy. El JWT se almacena en cookie
httpOnly y se inyecta del lado del servidor.
