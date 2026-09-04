import Link from "next/link";
import { prisma } from "@/db/prisma";
import { Button } from "@/components/ui/button";
import { deleteExperience } from "@/lib/actions/experience.action";

function formatDate(date: Date | null | undefined) {
  if (!date || Number.isNaN(new Date(date).getTime())) {
    return "-";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Experience
          </h1>
          <p className="mt-1 text-sm text-white/50">
            {experiences.length} entr
            {experiences.length === 1 ? "y" : "ies"} on the site.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/experience/new">New entry</Link>
        </Button>
      </div>

      <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10">
        {experiences.length === 0 && (
          <p className="p-6 text-sm text-white/50">
            No experience entries yet. Add your first one.
          </p>
        )}

        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="flex items-center justify-between gap-4 p-5"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-white">
                {experience.role} · {experience.company}
              </p>
              <p className="mt-0.5 text-xs text-white/50">
                #{experience.order} · {formatDate(experience.startDate)} –{" "}
                {experience.current
                  ? "Present"
                  : formatDate(experience.endDate)}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/experience/${experience.id}/edit`}
                className="rounded-lg border border-white/15 bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
              >
                Edit
              </Link>

              <form action={deleteExperience}>
                <input type="hidden" name="id" value={experience.id} />
                <button
                  type="submit"
                  className="rounded-lg border border-red-500/20 bg-red-500/5 px-3.5 py-1.5 text-xs font-medium text-red-400 transition-colors hover:border-red-500/40 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
