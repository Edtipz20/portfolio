"use client";

import { useEffect, useState, useActionState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Send, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  sendContactEmail,
  type ContactFormState,
} from "@/lib/actions/contact.action";

type ContactFormDialogProps = {
  recipient: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
};

const initialState: ContactFormState = {};

export function ContactFormDialog({
  recipient,
  label = "Hire Me",
  className,
  fullWidth = false,
}: ContactFormDialogProps) {
  const [open, setOpen] = useState(false);
  // Bumped every time the dialog opens, and used as the inner form's `key`.
  // useActionState's state persists as long as the component stays mounted,
  // so without this a reopened dialog would still be showing the previous
  // "message sent" screen instead of a blank form.
  const [openCount, setOpenCount] = useState(0);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button
        type="button"
        size="sm"
        className={`${fullWidth ? "w-full" : ""} ${className ?? ""}`}
        onClick={() => {
          setOpenCount((count) => count + 1);
          setOpen(true);
        }}
      >
        {label}
        <ArrowUpRight className="h-4 w-4" />
      </Button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-surface p-6 shadow-2xl sm:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close contact form"
                className="absolute right-4 top-4 rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <ContactForm
                key={openCount}
                recipient={recipient}
                onDone={() => setOpen(false)}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function ContactForm({
  recipient,
  onDone,
}: {
  recipient: string;
  onDone: () => void;
}) {
  const action = sendContactEmail.bind(null, recipient);
  const [state, formAction, isPending] = useActionState(action, initialState);

  if (state.status === "success") {
    return (
      <div className="py-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
        <h2 className="mt-4 font-display text-xl font-bold text-white">
          Message sent
        </h2>
        <p className="mt-2 text-sm text-white/60">{state.message}</p>
        <Button type="button" className="mt-6" onClick={onDone}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
        Let&apos;s work together
      </p>
      <h2
        id="contact-form-title"
        className="mt-3 font-display text-2xl font-bold text-white"
      >
        Tell me about your project
      </h2>
      <p className="mt-2 text-sm text-white/60">
        Fill out the form and I&apos;ll get back to you by email.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm text-white/75">
            Name
            <input
              name="name"
              required
              autoComplete="name"
              className="w-full rounded-lg border border-white/10 bg-white/4 px-3 py-2.5 text-white outline-none transition-colors placeholder:text-white/30 focus:border-violet-400"
              placeholder="Your name"
            />
            {state.errors?.name?.[0] && (
              <span className="block text-xs text-red-400">
                {state.errors.name[0]}
              </span>
            )}
          </label>
          <label className="space-y-1.5 text-sm text-white/75">
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-white/10 bg-white/4 px-3 py-2.5 text-white outline-none transition-colors placeholder:text-white/30 focus:border-violet-400"
              placeholder="you@example.com"
            />
            {state.errors?.email?.[0] && (
              <span className="block text-xs text-red-400">
                {state.errors.email[0]}
              </span>
            )}
          </label>
        </div>

        <label className="block space-y-1.5 text-sm text-white/75">
          Subject
          <input
            name="subject"
            required
            className="w-full rounded-lg border border-white/10 bg-white/4 px-3 py-2.5 text-white outline-none transition-colors placeholder:text-white/30 focus:border-violet-400"
            placeholder="Project inquiry"
          />
          {state.errors?.subject?.[0] && (
            <span className="block text-xs text-red-400">
              {state.errors.subject[0]}
            </span>
          )}
        </label>

        <label className="block space-y-1.5 text-sm text-white/75">
          Message
          <textarea
            name="message"
            required
            rows={5}
            className="w-full resize-y rounded-lg border border-white/10 bg-white/4 px-3 py-2.5 text-white outline-none transition-colors placeholder:text-white/30 focus:border-violet-400"
            placeholder="Tell me what you would like to build."
          />
          {state.errors?.message?.[0] && (
            <span className="block text-xs text-red-400">
              {state.errors.message[0]}
            </span>
          )}
        </label>

        {state.status === "error" && state.message && (
          <p className="text-sm text-red-400">{state.message}</p>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
          {isPending ? "Sending…" : "Send message"}
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
}
