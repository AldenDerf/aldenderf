import { SkillCategory, skillsData } from "@/data/portfolio";
import { Cpu, Layout, Server, Database, Layers } from "lucide-react";

interface SkillsProps {
  categories?: SkillCategory[];
}

export function Skills({ categories = skillsData }: SkillsProps) {
  const getCategoryIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "frontend":
        return <Layout className="h-4 w-4 text-sky-500" />;
      case "backend & apis":
        return <Server className="h-4 w-4 text-emerald-500" />;
      case "databases & tools":
        return <Database className="h-4 w-4 text-indigo-500" />;
      default:
        return <Layers className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
            <Cpu className="h-4 w-4" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Skills & Competencies
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Core technologies, programming languages, database architectures, and engineering concepts applied in production.
          </p>
        </div>

        {/* Category Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs"
            >
              {/* Category Title & Icon */}
              <div className="flex items-center gap-2.5 mb-2">
                {getCategoryIcon(category.title)}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {category.title}
                </h3>
              </div>

              {category.description && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                  {category.description}
                </p>
              )}

              {/* Skills Badge Chips */}
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
