import { notFound } from "next/navigation";
import { prisma } from "@/db/prisma";
import { ProjectForm } from "@/app/admin/project-form";
import { updateProject } from "@/lib/actions/project.action";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  const action = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">
        Edit project
      </h1>
      <p className="mt-1 text-sm text-white/50">{project.title}</p>

      <div className="mt-8">
        <ProjectForm
          action={action}
          defaultValues={project}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
