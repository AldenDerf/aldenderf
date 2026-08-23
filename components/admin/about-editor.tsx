"use client";

import { useState } from "react";
import { ProfileInfo } from "@/data/portfolio";
import { User, Plus, Trash2, CheckCircle, ShieldCheck } from "lucide-react";

interface AboutEditorProps {
  profile: ProfileInfo;
  onUpdate: (updatedProfile: ProfileInfo) => void;
}

export function AboutEditor({ profile, onUpdate }: AboutEditorProps) {
  const [formData, setFormData] = useState<ProfileInfo>({ ...profile });
  const [bioInput, setBioInput] = useState("");
  const [savedAlert, setSavedAlert] = useState(false);

  const handleChange = (
    field: keyof ProfileInfo,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBioAdd = () => {
    if (!bioInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      bio: [...prev.bio, bioInput.trim()],
    }));
    setBioInput("");
  };

  const handleBioRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bio: prev.bio.filter((_, i) => i !== index),
    }));
  };

  const handleBioChange = (index: number, value: string) => {
    const updatedBio = [...formData.bio];
    updatedBio[index] = value;
    setFormData((prev) => ({ ...prev, bio: updatedBio }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Alert Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
            <User className="h-4 w-4" />
            <span>Profile & About Section</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
            Edit Personal Profile Details
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Update your personal bio, headline, availability status, and social link defaults.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors shadow-sm cursor-pointer shrink-0"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Save About Changes</span>
        </button>
      </div>

      {savedAlert && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <span>About profile settings updated successfully!</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            Basic Information
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Job Title / Professional Role
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Hero Main Headline
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => handleChange("headline", e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Subtitle / Overview Pitch
            </label>
            <textarea
              rows={3}
              value={formData.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 resize-none"
              required
            />
          </div>
        </div>

        {/* Status & Contact URLs */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            Availability & Assets
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Status Badge Text
            </label>
            <input
              type="text"
              value={formData.statusBadge}
              onChange={(e) => handleChange("statusBadge", e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={(e) => handleChange("isAvailable", e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="isAvailable" className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              Mark as Available for Full-Time / Contract Roles
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Resume PDF URL
              </label>
              <input
                type="text"
                value={formData.resumeUrl}
                onChange={(e) => handleChange("resumeUrl", e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Light Mode Avatar Path
              </label>
              <input
                type="text"
                value={formData.avatarLight}
                onChange={(e) => handleChange("avatarLight", e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm font-mono text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Dark Mode Avatar Path
              </label>
              <input
                type="text"
                value={formData.avatarDark}
                onChange={(e) => handleChange("avatarDark", e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm font-mono text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bio Paragraphs */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          Bio Paragraphs & Story
        </h3>

        <div className="space-y-3">
          {formData.bio.map((paragraph, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <textarea
                rows={2}
                value={paragraph}
                onChange={(e) => handleBioChange(idx, e.target.value)}
                className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 resize-none"
              />
              <button
                type="button"
                onClick={() => handleBioRemove(idx)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                title="Remove paragraph"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Paragraph Form */}
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            placeholder="Add new bio paragraph..."
            value={bioInput}
            onChange={(e) => setBioInput(e.target.value)}
            className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={handleBioAdd}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Line</span>
          </button>
        </div>
      </div>
    </form>
  );
}
