import { certificationsData } from "@/data/portfolio";
import { Award, ExternalLink, ShieldCheck, Calendar, Hash } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
            <Award className="h-4 w-4" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Certifications & Training
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Industry-recognized credentials, specialized engineering programs, and technical certifications.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs group"
            >
              {/* Badge Icon & Issuer */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  <Calendar className="h-3 w-3" />
                  <span>{cert.issueDate}</span>
                </div>
              </div>

              {/* Certification Name */}
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors mb-2 leading-snug">
                {cert.name}
              </h3>

              {/* Credential ID if present */}
              {cert.credentialId && (
                <div className="flex items-center gap-1 text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-4">
                  <Hash className="h-3 w-3" />
                  <span>ID: {cert.credentialId}</span>
                </div>
              )}

              {/* Skill Tags */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mb-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-xs bg-zinc-100 px-2 py-0.5 text-[11px] font-mono font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Direct Verification Link */}
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
