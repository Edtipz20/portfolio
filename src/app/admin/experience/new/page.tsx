import { ExperienceForm } from "../../experience-form";
import { createExperience } from "@/lib/actions/experience.action";

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">
        New experience entry
      </h1>
      <p className="mt-1 text-sm text-white/50">
        Add a role to your experience timeline.
      </p>

      <div className="mt-8">
        <ExperienceForm action={createExperience} submitLabel="Create entry" />
      </div>
    </div>
  );
}
