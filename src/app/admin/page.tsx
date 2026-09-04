import Link from "next/link";
import { prisma } from "@/db/prisma";

export default async function AdminDashboardPage() {
  const [projectCount, experienceCount] = await Promise.all([
    prisma.project.count(),
    prisma.experience.count(),
  ]);

  const cards = [
    { href: "/admin/projects", label: "Projects", count: projectCount },
    {
      href: "/admin/experience",
      label: "Experience entries",
      count: experienceCount,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-white/50">
        Manage the content that powers your portfolio.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
          >
            <p className="text-sm text-white/50">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-white">
              {card.count}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
