import { ProfileInfo, SocialChannel, profileData, channelsData } from "@/data/portfolio";
import { ProfileAvatar } from "@/components/profile-avatar";
import { WorkflowBadge } from "@/components/technology-badge";

interface HeroProps {
  profile?: ProfileInfo;
  channels?: SocialChannel[];
}

export function Hero({
  profile = profileData,
  channels = channelsData,
}: HeroProps) {
  const activeChannels = channels.filter((c) => c.enabled);

  return (
    <section id="about" className="pt-10 sm:pt-20 pb-12 sm:pb-24 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* LEFT COLUMN: Profile Image */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-start">
            <ProfileAvatar
              avatarLight={profile.avatarLight}
              avatarDark={profile.avatarDark}
              name={profile.name}
            />
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
            {/* Status Badge */}
            {profile.statusBadge && (
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-700 dark:text-emerald-400 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{profile.statusBadge}</span>
              </div>
            )}

            {/* Name Header - Big Bold Monospace Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
                {profile.name}
              </h1>
              {profile.headline && (
                <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-2 font-semibold">
                  {profile.headline}
                </p>
              )}
            </div>

            {/* Subtitle Overview */}
            {profile.subtitle && (
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {profile.subtitle}
              </p>
            )}

            <div className="space-y-2 border-l-2 border-zinc-200 pl-3 dark:border-zinc-700">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">AI-Assisted Workflow</p>
              <div className="flex flex-wrap gap-2">
                <WorkflowBadge name="ChatGPT" />
                <WorkflowBadge name="Codex" />
                <WorkflowBadge name="Antigravity" />
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">My workflow includes ChatGPT, Codex, and Antigravity for planning, implementation, debugging, and refactoring, while I own the requirements, architecture, business rules, testing, and final technical decisions.</p>
            </div>

            {/* Bio Paragraphs */}
            <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 space-y-3 leading-relaxed">
              {profile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Monospace Social Links at Bottom (Matches image: github ↗ linkedin ↗ email ↗) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 font-mono text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              {activeChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target={channel.url.startsWith("mailto:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  aria-label={channel.name}
                >
                  <span>{channel.name.toLowerCase()}</span>
                  <span className="text-zinc-400 dark:text-zinc-500">↗</span>
                </a>
              ))}

              {profile.resumeUrl && profile.resumeUrl !== "/resume.pdf" && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline transition-all font-semibold"
                >
                  <span>resume</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
