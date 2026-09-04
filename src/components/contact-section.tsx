import { ArrowUpRight, Mail, Phone, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/social-icon";
import type { SiteContent, Testimonial } from "@/lib/content";

export function ContactSection({
  site,
  testimonial,
}: {
  site: SiteContent;
  testimonial: Testimonial;
}) {
  const { contact } = site;

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.15fr_0.8fr] lg:gap-8 lg:px-10">
        {/* CTA */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            {contact.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white">
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/60">
            {contact.description}
          </p>
          <Button asChild className="mt-7">
            <a href={contact.cta.href}>
              {contact.cta.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Testimonial */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <Quote className="h-7 w-7 text-violet-400/70" fill="currentColor" strokeWidth={0} />
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">{testimonial.quote}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-semibold text-white">
              {testimonial.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{testimonial.author}</p>
              <p className="text-xs text-white/45">{testimonial.role}</p>
            </div>
          </div>
        </div>

        {/* Follow / contact details */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Follow Me
          </span>
          <div className="mt-4 flex items-center gap-3">
            {site.social.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.platform}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-violet-400/40 hover:text-violet-300"
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>

          <div className="mt-8 space-y-3 text-sm">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 text-violet-400" />
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-3 text-white/60 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-violet-400" />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
