"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/validators";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  errors?: Record<string, string[] | undefined>;
  status?: "success" | "error";
  message?: string;
};

// recipient is bound at the call site (site.contact.email), the same
// pattern as updateProject.bind(null, project.id) — it never comes from
// form input, so a visitor can't redirect where the email goes.
export async function sendContactEmail(
  recipient: string,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, status: "error" };
  }

  const { name, email, subject, message } = parsed.data;

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: recipient,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out — I'll get back to you soon.",
  };
}
