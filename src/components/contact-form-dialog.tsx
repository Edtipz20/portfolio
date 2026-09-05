"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContactFormDialogProps = {
  recipient: string;
  label?: string;
  className?: string;
  fullWidth?: boolean;
};

export function ContactFormDialog({
  recipient,
  label = "Hire Me",
  className,
  fullWidth = false,
}: ContactFormDialogProps) {
  const [open, setOpen] = useState(false);

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

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const subject = String(form.get("subject") ?? "");
    const message = String(form.get("message") ?? "");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        size="sm"
        className={`${fullWidth ? "w-full" : ""} ${className ?? ""}`}
        onClick={() => setOpen(true)}
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
                Fill out the form and your email app will open with your message
                ready to send.
              </p>

              <form onSubmit={submitForm} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-1.5 text-sm text-white/75">
                    Name
                    <input
                      name="name"
                      required
                      autoComplete="name"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white outline-none transition-colors placeholder:text-white/30 focus:border-violet-400"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="space-y-1.5 text-sm text-white/75">
                    Email
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white outline-none transition-colors placeholder:text-white/30 focus:border-violet-400"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="block space-y-1.5 text-sm text-white/75">
                  Subject
                  <input
                    name="subject"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white outline-none transition-colors placeholder:text-white/30 focus:border-violet-400"
                    placeholder="Project inquiry"
                  />
                </label>

                <label className="block space-y-1.5 text-sm text-white/75">
                  Message
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white outline-none transition-colors placeholder:text-white/30 focus:border-violet-400"
                    placeholder="Tell me what you would like to build."
                  />
                </label>

                <Button type="submit" className="w-full" size="lg">
                  Open email app
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
