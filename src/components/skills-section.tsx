import { TechIcon } from "@/components/tech-icon";
import type { Skill } from "@/lib/content";

export function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            My Skills
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Technologies I Master
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-14 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.id}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TechIcon
                    id={skill.icon}
                    wrapperClassName="h-8 w-8 rounded-full"
                    className="h-4 w-4 text-white"
                  />
                  <span className="text-sm font-semibold text-white">
                    {skill.name}
                  </span>
                </div>
                <span className="text-sm text-white/40">{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
