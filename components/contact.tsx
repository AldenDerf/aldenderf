"use client";

import { useState, FormEvent } from "react";
import { ProfileInfo, SocialChannel, profileData, channelsData } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, YoutubeIcon, TwitterIcon } from "@/components/icons";
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  MessageSquare,
  Phone,
} from "lucide-react";

interface ContactProps {
  profile?: ProfileInfo;
  channels?: SocialChannel[];
}

export function Contact({
  profile = profileData,
  channels = channelsData,
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const activeChannels = channels.filter((c) => c.enabled);

  const renderIcon = (iconKey: string) => {
    switch (iconKey.toLowerCase()) {
      case "github":
        return <GithubIcon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />;
      case "linkedin":
        return <LinkedinIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "mail":
        return <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case "twitter":
        return <TwitterIcon className="h-4 w-4 text-sky-500" />;
      case "youtube":
        return <YoutubeIcon className="h-4 w-4 text-red-500" />;
      case "telegram":
        return <Send className="h-4 w-4 text-sky-400" />;
      case "discord":
        return <MessageSquare className="h-4 w-4 text-indigo-400" />;
      case "phone":
        return <Phone className="h-4 w-4 text-green-500" />;
      default:
        return <Globe className="h-4 w-4 text-purple-400" />;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const mailtoSubject = encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSubmitted(true);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
            <Mail className="h-4 w-4" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Let&apos;s Build Together
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            I am open to full-time software engineering and full-stack development roles. Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 space-y-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Direct Channels
              </h3>

              {/* Email Box */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-zinc-400 dark:text-zinc-500">
                  Email Address
                </span>
                <div className="flex items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200 truncate">
                    {profile.email}
                  </span>
                  <button
                    onClick={copyEmailToClipboard}
                    className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Action Link Buttons */}
              <div className="flex flex-col gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                {activeChannels.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.url}
                    target={channel.url.startsWith("mailto:") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      {renderIcon(channel.icon)}
                      <span>{channel.name}</span>
                    </div>
                    <span className="text-xs text-zinc-400">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                Send a Direct Message
              </h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    Message Prepared!
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
                    Thank you, {formData.name}. Your email client should open automatically. If it didn&apos;t, feel free to contact me directly at <span className="font-mono text-zinc-800 dark:text-zinc-200">{profile.email}</span>.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400 underline hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity / Technical Collaboration"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Alden, we have an opening for a Full-Stack Developer..."
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
