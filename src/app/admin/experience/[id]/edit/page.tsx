import { notFound } from "next/navigation";
import { prisma } from "@/db/prisma";
import { ExperienceForm } from "@/app/admin/experience-form";
import { updateExperience } from "@/lib/actions/experience.action";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id } });

  if (!experience) notFound();

  const action = updateExperience.bind(null, experience.id);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">
        Edit experience entry
      </h1>
      <p className="mt-1 text-sm text-white/50">
        {experience.role} at {experience.company}
      </p>

      <div className="mt-8">
        <ExperienceForm
          action={action}
          defaultValues={experience}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
