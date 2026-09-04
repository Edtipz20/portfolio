"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/db/prisma";
import { experienceSchema, type ExperienceInput } from "@/lib/validators";

export type ExperienceFormState = {
  errors?: Record<string, string[] | undefined>;
  message?: string;
};

function parseExperienceForm(formData: FormData) {
  // Unchecked checkboxes are omitted from FormData entirely, so this has
  // to be computed explicitly rather than picked up by Object.fromEntries.
  return experienceSchema.safeParse({
    ...Object.fromEntries(formData),
    current: formData.get("current") === "on",
  });
}

function toPrismaData(input: ExperienceInput) {
  return {
    order: input.order,
    role: input.role,
    company: input.company,
    location: input.location ?? null,
    startDate: new Date(input.startDate),
    endDate: input.current || !input.endDate ? null : new Date(input.endDate),
    current: input.current,
    description: input.description,
  };
}

export async function createExperience(
  _prevState: ExperienceFormState,
  formData: FormData,
): Promise<ExperienceFormState> {
  const parsed = parseExperienceForm(formData);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.experience.create({ data: toPrismaData(parsed.data) });

  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

// Usage: updateExperience.bind(null, experience.id) passed to useActionState.
export async function updateExperience(
  id: string,
  _prevState: ExperienceFormState,
  formData: FormData,
): Promise<ExperienceFormState> {
  const parsed = parseExperienceForm(formData);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.experience.update({
    where: { id },
    data: toPrismaData(parsed.data),
  });

  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function deleteExperience(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await prisma.experience.delete({ where: { id } });

  revalidatePath("/admin/experience");
  revalidatePath("/");
}
