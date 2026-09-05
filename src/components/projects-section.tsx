import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProjects } from "@/lib/actions/project.action";
import Image from "next/image";

export async function ProjectsSection() {
  const projects = await getProjects();
  return (
    <section
      id="projects"
      className="border-t border-white/5 bg-surface/40 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Featured Projects
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Some of My Recent Work
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/30 hover:shadow-[0_20px_40px_-20px_rgba(124,58,237,0.45)]"
            >
              <div
                className={cn(
                  "relative flex aspect-4/3 items-start justify-between overflow-hidden bg-linear-to-br p-4",
                  project.gradient,
                )}
              >
                {project.images[0] && (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                )}
                <span className="rounded-md bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                  {String(project.order).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {project.description}
                </p>
                <div className="mt-auto text-right">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 transition-colors group-hover:text-violet-300">
                    View Project
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {projects.map((project, i) => (
            <span
              key={project.id}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === 0 ? "w-6 bg-violet-500" : "w-1.5 bg-white/20",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
