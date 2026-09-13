import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject } from "@/lib/actions/project.action";
import { ProjectGallery } from "@/components/project-gallery";
import { splitTags } from "@/lib/utils";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  const hasExternalLink = Boolean(project.href) && project.href !== "#";

  return (
    <main className="min-h-screen bg-background px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
              {project.title}
            </h1>
            <div className="relative z-10 flex flex-wrap justify-start gap-1.5 mt-2">
              {splitTags(project.tag).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {hasExternalLink && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/3 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-violet-400/40 hover:bg-white/6"
            >
              Visit live project
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="mt-8">
          <ProjectGallery
            images={project.images}
            title={project.title}
            gradient={project.gradient}
          />
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <h1 className="font-bold text-2xl">Description</h1>
          <p className="w-full text-[15px] leading-relaxed text-white/60">
            {project.description}
          </p>
        </div>
      </div>
    </main>
  );
}
