import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteProject, getProjects } from "@/lib/actions/project.action";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Projects
          </h1>
          <p className="mt-1 text-sm text-white/50">
            {projects.length} project{projects.length === 1 ? "" : "s"} on the
            site.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">New project</Link>
        </Button>
      </div>

      <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10">
        {projects.length === 0 && (
          <p className="p-6 text-sm text-white/50">
            No projects yet. Create your first one.
          </p>
        )}

        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between gap-4 p-5"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-white">{project.title}</p>
              <p className="mt-0.5 text-xs text-white/50">
                #{project.order} · {project.tag}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="rounded-lg border border-white/15 bg-white/2 px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
              >
                Edit
              </Link>

              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
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
