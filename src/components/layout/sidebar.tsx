"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
}

export function Sidebar({
  items,
  title,
}: {
  items: NavItem[];
  title: string;
}) {
  const pathname = usePathname();
  return (
    <aside className="w-60 shrink-0 border-r border-border bg-white p-4">
      <Link
        href="/"
        className="mb-6 block text-2xl font-black text-[var(--brand-secondary)]"
      >
        Lab<span className="text-[var(--brand-orange)]">UNIMET</span>
      </Link>
      <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--brand-gray)]">
        {title}
      </p>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--brand-primary)] text-white"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <form action="/api/auth/logout" method="POST" className="mt-8">
        <button
          type="submit"
          className="w-full rounded-md border border-border px-3 py-2 text-sm text-[var(--brand-gray)] hover:bg-gray-50"
        >
          Cerrar sesión
        </button>
      </form>
    </aside>
  );
}
