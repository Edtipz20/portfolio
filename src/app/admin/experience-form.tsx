"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import type { ExperienceFormState } from "@/lib/actions/experience.action";

const initialState: ExperienceFormState = {};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400 disabled:opacity-40";

type ExperienceFormValues = {
  order?: number;
  role?: string;
  company?: string;
  location?: string | null;
  startDate?: Date;
  endDate?: Date | null;
  current?: boolean;
  description?: string;
};

function toDateInputValue(date?: Date | null): string {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

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

export function ExperienceForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (
    prevState: ExperienceFormState,
    formData: FormData,
  ) => Promise<ExperienceFormState>;
  defaultValues?: ExperienceFormValues;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [current, setCurrent] = useState(defaultValues?.current ?? false);

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

      <Field label="Role" name="role" error={state.errors?.role}>
        <input
          id="role"
          type="text"
          name="role"
          defaultValue={defaultValues?.role}
          placeholder="Full-Stack Developer"
          className={inputClass}
        />
      </Field>

      <Field label="Company" name="company" error={state.errors?.company}>
        <input
          id="company"
          type="text"
          name="company"
          defaultValue={defaultValues?.company}
          placeholder="Acme Inc."
          className={inputClass}
        />
      </Field>

      <Field
        label="Location (optional)"
        name="location"
        error={state.errors?.location}
      >
        <input
          id="location"
          type="text"
          name="location"
          defaultValue={defaultValues?.location ?? ""}
          placeholder="General Santos, PH"
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Start date"
          name="startDate"
          error={state.errors?.startDate}
        >
          <input
            id="startDate"
            type="date"
            name="startDate"
            defaultValue={toDateInputValue(defaultValues?.startDate)}
            className={inputClass}
          />
        </Field>

        <Field label="End date" name="endDate" error={state.errors?.endDate}>
          <input
            id="endDate"
            type="date"
            name="endDate"
            defaultValue={toDateInputValue(defaultValues?.endDate)}
            disabled={current}
            className={inputClass}
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-white/70">
        <input
          type="checkbox"
          name="current"
          checked={current}
          onChange={(event) => setCurrent(event.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-white/[0.03] accent-violet-500"
        />
        I currently work here
      </label>

      <Field
        label="Description"
        name="description"
        error={state.errors?.description}
      >
        <textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description}
          rows={4}
          placeholder="What you did, technologies used, impact..."
          className={inputClass}
        />
      </Field>

      {state.message && <p className="text-sm text-red-400">{state.message}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
