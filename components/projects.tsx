import { Project, projectsData } from "@/data/portfolio";
import { GithubIcon } from "@/components/icons";
import { Code2, ExternalLink } from "lucide-react";
import { DeploymentBadge, TechBadge } from "@/components/technology-badge";

interface ProjectsProps { items?: Project[] }

export function Projects({ items = projectsData }: ProjectsProps) {
  return (
    <section id="projects" className="border-b border-zinc-200/80 py-16 dark:border-zinc-800/80 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400"><Code2 className="h-4 w-4" />Featured Engineering</div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">Flagship Projects &amp; Systems</h2>
          <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">Selected applications built for tournament operations, hospital workflows, and teaching.</p>
        </div>
        <div className="grid gap-6">
          {items.map((project) => (
            <article key={project.id} className="min-w-0 rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-8">
              {(project.context || project.status) && <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">{project.context && <span>{project.context}</span>}{project.status && <span className="text-emerald-700 dark:text-emerald-400">{project.status}</span>}</div>}
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{project.description}</p>
              <div className="mt-5 grid gap-6 border-t border-zinc-100 pt-5 dark:border-zinc-800 lg:grid-cols-2 lg:gap-8">
                <div className="space-y-4">
                  {project.problem && <div><h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Problem</h4><p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{project.problem}</p></div>}
                  {project.solution && <div><h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">What I Built</h4><p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{project.solution}</p></div>}
                </div>
                <div className="space-y-4">
                  {project.highlights?.length > 0 && <div><h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Technical Highlights</h4><ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-zinc-700 marker:text-emerald-600 dark:text-zinc-300 dark:marker:text-emerald-400">{project.highlights.map((highlight, index) => <li key={index}>{highlight}</li>)}</ul></div>}
                  {project.techStack?.length > 0 && <div><h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Technology Stack</h4><div className="mt-2 flex flex-wrap gap-1.5">{project.techStack.map((tech) => <TechBadge key={tech} name={tech} />)}</div></div>}
                  {project.deployment && project.deployment.length > 0 && <div><h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Deployment &amp; Infrastructure</h4><div className="mt-2 flex flex-wrap gap-1.5">{project.deployment.map((platform) => <DeploymentBadge key={platform} name={platform} />)}</div></div>}
                </div>
              </div>
              {(project.liveUrl || project.githubUrl) && <div className="mt-5 flex flex-wrap gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">Live Site <ExternalLink className="h-3.5 w-3.5" /></a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"><GithubIcon className="h-3.5 w-3.5" /> GitHub</a>}
              </div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
