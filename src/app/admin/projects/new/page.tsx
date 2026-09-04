import { ProjectForm } from "../../project-form";
import { createProject } from "@/lib/actions/project.action";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">
        New project
      </h1>
      <p className="mt-1 text-sm text-white/50">
        Add a new project to the site.
      </p>

      <div className="mt-8">
        <ProjectForm action={createProject} submitLabel="Create project" />
      </div>
    </div>
  );
}
