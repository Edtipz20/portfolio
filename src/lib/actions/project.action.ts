"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/db/prisma";
import { projectSchema } from "@/lib/validators";

export type ProjectFormState = {
  errors?: Record<string, string[] | undefined>;
  message?: string;
};

function parseProjectForm(formData: FormData) {
  const raw = Object.fromEntries(formData);

  let images: unknown = [];
  const rawImages = formData.get("images");
  if (typeof rawImages === "string" && rawImages.length > 0) {
    try {
      images = JSON.parse(rawImages);
    } catch {
      images = [];
    }
  }

  return projectSchema.safeParse({ ...raw, images });
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const parsed = parseProjectForm(formData);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.project.create({ data: parsed.data });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const parsed = parseProjectForm(formData);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.project.update({ where: { id }, data: parsed.data });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getProject(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function getProjectCount() {
  return prisma.project.count();
}

export async function deleteProject(formData: FormData) {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await prisma.project.delete({ where: { id } });

  revalidatePath("/admin/projects");
  revalidatePath("/");
}
