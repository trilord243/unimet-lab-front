import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab UNIMET — Procesos de Separación",
  description:
    "Sistema de reservas e inventarios del Laboratorio de Procesos de Separación de la Universidad Metropolitana",
  keywords: ["unimet", "laboratorio", "procesos de separación", "reservas", "reactivos"],
  authors: [{ name: "Universidad Metropolitana" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Roboto+Condensed:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-background font-roboto antialiased"
        suppressHydrationWarning
      >
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
