import { z } from "zod";

export const projectSchema = z.object({
  order: z.coerce.number().int(),
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  tag: z.string().trim().min(1, "Tag is required"),
  gradient: z.string().trim().min(1, "Gradient classes are required"),
  href: z.string().trim().min(1, "Link is required"),
  images: z.array(z.string().url()).max(5, "Up to 5 images allowed"),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export const experienceSchema = z.object({
  order: z.coerce.number().int(),
  role: z.string().trim().min(1, "Role is required"),
  company: z.string().trim().min(1, "Company is required"),
  location: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined)),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined)),
  current: z.boolean(),
  description: z.string().trim().min(1, "Description is required"),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().pipe(z.email("Enter a valid email")),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required"),
});
