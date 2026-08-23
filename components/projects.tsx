import { projectsData } from "@/data/portfolio";
import { GithubIcon } from "@/components/icons";
import { ExternalLink, CheckCircle2, Code2 } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
            <Code2 className="h-4 w-4" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Flagship Projects & Systems
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Selected full-stack web applications demonstrating scalable architecture, clean database design, and high-throughput workflows.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all shadow-xs"
            >
              {/* Card Header: Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5 dark:border-zinc-800/60">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>GitHub Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {project.description}
              </p>

              {/* Highlights Bullet List */}
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold">
                  Technical Highlights:
                </h4>
                <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Tags */}
              <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-100/70 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
