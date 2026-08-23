"use client";

import { useState } from "react";
import { SocialChannel } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, YoutubeIcon, TwitterIcon } from "@/components/icons";
import {
  Share2,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle,
  X,
  Mail,
  Globe,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

interface ChannelsManagerProps {
  channels: SocialChannel[];
  onUpdate: (updatedChannels: SocialChannel[]) => void;
}

export function ChannelsManager({ channels, onUpdate }: ChannelsManagerProps) {
  const [items, setItems] = useState<SocialChannel[]>([...channels]);
  const [editingChannel, setEditingChannel] = useState<SocialChannel | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const iconOptions = [
    { key: "github", label: "GitHub" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "mail", label: "Email / Mail" },
    { key: "twitter", label: "Twitter / X" },
    { key: "youtube", label: "YouTube" },
    { key: "telegram", label: "Telegram" },
    { key: "discord", label: "Discord" },
    { key: "globe", label: "Website / Portfolio" },
    { key: "phone", label: "Phone" },
    { key: "message-square", label: "Chat / Messaging" },
  ];

  const renderChannelIcon = (iconKey: string, className = "h-4 w-4") => {
    switch (iconKey.toLowerCase()) {
      case "github":
        return <GithubIcon className={className} />;
      case "linkedin":
        return <LinkedinIcon className={className} />;
      case "mail":
        return <Mail className={className} />;
      case "twitter":
        return <TwitterIcon className={className} />;
      case "youtube":
        return <YoutubeIcon className={className} />;
      case "telegram":
        return <Send className={className} />;
      case "discord":
        return <MessageSquare className={className} />;
      case "phone":
        return <Phone className={className} />;
      default:
        return <Globe className={className} />;
    }
  };

  const handleOpenCreate = () => {
    setEditingChannel({
      id: `channel-${Date.now()}`,
      name: "",
      url: "",
      icon: "globe",
      enabled: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (channel: SocialChannel) => {
    setEditingChannel({ ...channel });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this channel?")) return;
    const updated = items.filter((c) => c.id !== id);
    setItems(updated);
    onUpdate(updated);
  };

  const handleToggleEnabled = (id: string) => {
    const updated = items.map((c) =>
      c.id === id ? { ...c, enabled: !c.enabled } : c
    );
    setItems(updated);
    onUpdate(updated);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChannel || !editingChannel.name.trim() || !editingChannel.url.trim())
      return;

    let updatedList: SocialChannel[];
    const exists = items.some((c) => c.id === editingChannel.id);

    if (exists) {
      updatedList = items.map((c) =>
        c.id === editingChannel.id ? editingChannel : c
      );
    } else {
      updatedList = [...items, editingChannel];
    }

    setItems(updatedList);
    onUpdate(updatedList);
    setIsModalOpen(false);
    setEditingChannel(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
            <Share2 className="h-4 w-4" />
            <span>Social & Direct Channels</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
            Manage Connect & Contact Channels
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Add YouTube, Twitter/X, Telegram, Discord, GitHub, LinkedIn, or custom web links.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Channel</span>
        </button>
      </div>

      {/* Channels List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((channel) => (
          <div
            key={channel.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
                {renderChannelIcon(channel.icon, "h-5 w-5")}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 truncate">
                    {channel.name}
                  </h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      channel.enabled
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {channel.enabled ? "Active" : "Disabled"}
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate">
                  {channel.url}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="Open Link"
              >
                <ExternalLink className="h-4 w-4" />
              </a>

              <button
                onClick={() => handleToggleEnabled(channel.id)}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                title={channel.enabled ? "Disable Channel" : "Enable Channel"}
              >
                <span className="text-xs font-semibold underline">
                  {channel.enabled ? "Disable" : "Enable"}
                </span>
              </button>

              <button
                onClick={() => handleOpenEdit(channel)}
                className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                title="Edit Channel"
              >
                <Edit2 className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleDelete(channel.id)}
                className="p-1.5 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                title="Delete Channel"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Channel Modal */}
      {isModalOpen && editingChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {items.some((c) => c.id === editingChannel.id)
                  ? "Edit Social Channel"
                  : "Add New Social Channel"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Channel Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingChannel.name}
                  onChange={(e) =>
                    setEditingChannel({
                      ...editingChannel,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. YouTube Channel, X / Twitter"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Channel URL / Destination <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingChannel.url}
                  onChange={(e) =>
                    setEditingChannel({
                      ...editingChannel,
                      url: e.target.value,
                    })
                  }
                  placeholder="https://youtube.com/@username or mailto:user@domain.com"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Select Channel Icon
                </label>
                <select
                  value={editingChannel.icon}
                  onChange={(e) =>
                    setEditingChannel({
                      ...editingChannel,
                      icon: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="channelEnabled"
                  checked={editingChannel.enabled}
                  onChange={(e) =>
                    setEditingChannel({
                      ...editingChannel,
                      enabled: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="channelEnabled"
                  className="text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Enabled & Visible on Website
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Save Channel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
