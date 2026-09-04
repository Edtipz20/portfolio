import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechIcon } from "@/components/tech-icon";
import type { SiteContent, TechStackItem } from "@/lib/content";
import Image from "next/image";
import profile from "../../public/profile-photo.png";

export function Hero({
  site,
  techStack,
}: {
  site: SiteContent;
  techStack: TechStackItem[];
}) {
  const { hero } = site;

  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:gap-4 lg:px-10 lg:py-28">
        {/* Left column */}
        <div>
          <span className="inline-flex items-center rounded-md border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-violet-300">
            {hero.eyebrow}
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{hero.firstName}</span>
            <br />
            <span className="text-5xl">{hero.headline}</span>
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/60">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={hero.secondaryCta.href} download>
                {hero.secondaryCta.label}
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {hero.techNote}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {techStack.map((tech) => (
                <TechIcon
                  key={tech.id}
                  id={tech.icon}
                  wrapperClassName="h-11 w-11 border border-white/10"
                  className="h-5.5 w-5.5 text-white"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right column - portrait + floating code card */}
        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-indigo-500/70 via-violet-600/60 to-fuchsia-500/40 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -right-2 top-2 -z-10 h-24 w-24 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] bg-size-[10px_10px] opacity-70"
          />

          <div className="relative mx-auto overflow-hidden rounded-4xl border border-white/10 bg-linear-to-b from-white/6 to-transparent">
            <div className="relative aspect-4/5 w-full bg-linear-to-b from-indigo-500/25 via-violet-600/20 to-transparent">
              <Image
                src={profile}
                alt="Profile Photo"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 448px, 90vw"
              />
            </div>
          </div>

          <div className="absolute -bottom-8 -left-8 hidden rotate-[-8deg] text-violet-300/70 sm:block">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path
                d="M46 8C36 20 20 12 10 24c-6 7-4 16 4 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1 7"
              />
              <path
                d="M8 38l6 6 6-8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="absolute hidden sm:block -right-6 bottom-8 w-56 rounded-xl border border-white/10 bg-surface/95 p-4 font-mono text-[11px] shadow-2xl shadow-black/50 backdrop-blur sm:-right-18">
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5 text-white/50">
                <span className="text-violet-400">{"</>"}</span>{" "}
                {hero.codeSnippet.title}
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <pre className="whitespace-pre-wrap leading-5 text-white/70">
              <code>
                {hero.codeSnippet.lines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
