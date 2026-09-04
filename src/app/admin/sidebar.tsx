"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, History } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/experience", label: "Experience", icon: History },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-white/10 bg-[#0d0d17] px-4 py-6">
      <div className="mb-8 px-2">
        <span className="font-display text-lg font-bold text-white">Admin</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/[0.06] text-white"
                  : "text-white/60 hover:bg-white/[0.03] hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4" strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="mt-auto rounded-lg px-3 py-2 text-xs font-medium text-white/40 transition-colors hover:text-white/70"
      >
        ← Back to site
      </Link>
    </aside>
  );
}
