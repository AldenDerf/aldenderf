import Link from "next/link";
import { ProfileInfo, SocialChannel, profileData, channelsData } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, YoutubeIcon, TwitterIcon } from "@/components/icons";
import { ProfileAvatar } from "@/components/profile-avatar";
import {
  Mail,
  ArrowDownRight,
  Globe,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

interface HeroProps {
  profile?: ProfileInfo;
  channels?: SocialChannel[];
}

export function Hero({
  profile = profileData,
  channels = channelsData,
}: HeroProps) {
  const activeChannels = channels.filter((c) => c.enabled);

  const renderIcon = (iconKey: string) => {
    switch (iconKey.toLowerCase()) {
      case "github":
        return <GithubIcon className="h-4 w-4" />;
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4" />;
      case "mail":
        return <Mail className="h-4 w-4" />;
      case "twitter":
        return <TwitterIcon className="h-4 w-4" />;
      case "youtube":
        return <YoutubeIcon className="h-4 w-4" />;
      case "telegram":
        return <Send className="h-4 w-4" />;
      case "discord":
        return <MessageSquare className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <section id="about" className="pt-8 sm:pt-16 pb-12 sm:pb-20 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-8 sm:gap-12">
          {/* Main Text Content */}
          <div className="flex flex-col items-start gap-5 sm:gap-6 flex-1 max-w-2xl">
            {/* Status Badge */}
            {profile.statusBadge && (
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{profile.statusBadge}</span>
              </div>
            )}

            {/* Name Highlight & Role Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  {profile.name}
                </span>{" "}
                👋
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
                {profile.headline}
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal pt-1">
                {profile.subtitle}
              </p>
            </div>

            {/* Bio Brief */}
            <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 space-y-2 border-l-2 border-emerald-500/40 dark:border-emerald-500/30 pl-4 py-1">
              {profile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Quick CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs"
              >
                <span>View Projects</span>
                <ArrowDownRight className="h-4 w-4" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 transition-colors"
              >
                <Mail className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <span>Get in Touch</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-400 w-full">
              <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                Connect:
              </span>

              {activeChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target={channel.url.startsWith("mailto:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  aria-label={channel.name}
                >
                  {renderIcon(channel.icon)}
                  <span>{channel.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Profile Avatar on the Right / Side */}
          <div className="shrink-0 self-start pt-1">
            <ProfileAvatar
              avatarLight={profile.avatarLight}
              avatarDark={profile.avatarDark}
              name={profile.name}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
