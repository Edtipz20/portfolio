"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectImagesField } from "@/components/admin/project-images-field";
import type { ProjectFormState } from "@/lib/actions/project.action";

const initialState: ProjectFormState = {};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400";

type ProjectFormValues = {
  order?: number;
  title?: string;
  description?: string;
  tag?: string;
  gradient?: string;
  href?: string;
  images?: string[];
};

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium text-white/70">
        {label}
      </label>
      {children}
      {error?.[0] && <p className="mt-1 text-xs text-red-400">{error[0]}</p>}
    </div>
  );
}

export function ProjectForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (
    prevState: ProjectFormState,
    formData: FormData,
  ) => Promise<ProjectFormState>;
  defaultValues?: ProjectFormValues;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <Field label="Order" name="order" error={state.errors?.order}>
        <input
          id="order"
          type="number"
          name="order"
          defaultValue={defaultValues?.order ?? 0}
          className={inputClass}
        />
      </Field>

      <Field label="Title" name="title" error={state.errors?.title}>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={defaultValues?.title}
          placeholder="E-Commerce Platform"
          className={inputClass}
        />
      </Field>

      <Field
        label="Description"
        name="description"
        error={state.errors?.description}
      >
        <textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description}
          rows={3}
          placeholder="Full-stack e-commerce solution with modern UI/UX"
          className={inputClass}
        />
      </Field>

      <Field label="Tag" name="tag" error={state.errors?.tag}>
        <input
          id="tag"
          type="text"
          name="tag"
          defaultValue={defaultValues?.tag}
          placeholder="React + Node"
          className={inputClass}
        />
      </Field>

      <Field
        label="Gradient classes"
        name="gradient"
        error={state.errors?.gradient}
      >
        <input
          id="gradient"
          type="text"
          name="gradient"
          defaultValue={defaultValues?.gradient}
          placeholder="from-fuchsia-500/30 via-purple-600/20 to-indigo-900/40"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-white/40">
          Tailwind gradient stops used as the card background — copy the pattern
          from an existing project.
        </p>
      </Field>

      <Field label="Link" name="href" error={state.errors?.href}>
        <input
          id="href"
          type="text"
          name="href"
          defaultValue={defaultValues?.href ?? "#"}
          placeholder="https://github.com/you/project or #"
          className={inputClass}
        />
      </Field>

      <Field label="Images" name="images" error={state.errors?.images}>
        <div className="mt-1.5">
          <ProjectImagesField defaultImages={defaultValues?.images ?? []} />
        </div>
      </Field>

      {state.message && <p className="text-sm text-red-400">{state.message}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
