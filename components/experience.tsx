import { experienceData } from "@/data/portfolio";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
            <Briefcase className="h-4 w-4" />
            <span>Career Path</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Experience & Background Timeline
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A progression spanning enterprise procurement logistics, clinical software development, modern web engineering, and technical instruction.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 sm:ml-4 space-y-10">
          {experienceData.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-zinc-400 dark:border-zinc-950 dark:bg-zinc-600 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-200 group-hover:scale-125 transition-all" />

              <div className="flex flex-col gap-2 rounded-lg border border-zinc-200/70 bg-white p-5 sm:p-6 dark:border-zinc-800/70 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs">
                {/* Header: Role & Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Subheader: Company & Location */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  <span className="text-zinc-800 dark:text-zinc-200">{item.company}</span>
                  {item.location && (
                    <span className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
                      • <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Bullet Points */}
                <ul className="mt-3 space-y-1.5 list-disc list-inside text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="text-zinc-700 dark:text-zinc-300">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Skill Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-sm bg-zinc-100 px-2 py-0.5 text-xs font-mono font-medium text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
