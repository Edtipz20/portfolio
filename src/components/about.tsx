import { ArrowUpRight, CalendarDays, CodeXml, Smile, Trophy, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteContent, Stat } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  CalendarDays,
  CodeXml,
  Smile,
  Trophy,
};

export function About({ site, stats }: { site: SiteContent; stats: Stat[] }) {
  const { about } = site;

  return (
    <section id="about" className="border-t border-white/5 bg-surface/40 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-14 lg:px-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            {about.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            {about.heading}
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
            {about.description}
          </p>
          <Button asChild variant="outline" className="mt-8">
            <a href={about.cta.href}>
              {about.cta.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 divide-x divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
          {stats.map((stat) => {
            const Icon = ICONS[stat.icon] ?? CodeXml;
            return (
              <div key={stat.id} className="flex items-center gap-4 p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                  <Icon className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
