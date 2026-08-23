"use client";

import { useState } from "react";
import { ExperienceItem } from "@/data/portfolio";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  CheckCircle,
  X,
} from "lucide-react";

interface ExperienceManagerProps {
  experience: ExperienceItem[];
  onUpdate: (updatedExperience: ExperienceItem[]) => void;
}

export function ExperienceManager({
  experience,
  onUpdate,
}: ExperienceManagerProps) {
  const [items, setItems] = useState<ExperienceItem[]>([...experience]);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightInput, setHighlightInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const handleOpenCreate = () => {
    setEditingItem({
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      location: "",
      period: "",
      description: "",
      highlights: [],
      skills: [],
    });
    setHighlightInput("");
    setSkillInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ExperienceItem) => {
    setEditingItem({ ...item });
    setHighlightInput("");
    setSkillInput("");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this experience entry?")) return;
    const updated = items.filter((e) => e.id !== id);
    setItems(updated);
    onUpdate(updated);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updatedList: ExperienceItem[];
    const exists = items.some((e) => e.id === editingItem.id);

    if (exists) {
      updatedList = items.map((e) =>
        e.id === editingItem.id ? editingItem : e
      );
    } else {
      updatedList = [editingItem, ...items];
    }

    setItems(updatedList);
    onUpdate(updatedList);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleAddHighlight = () => {
    if (!highlightInput.trim() || !editingItem) return;
    setEditingItem({
      ...editingItem,
      highlights: [...editingItem.highlights, highlightInput.trim()],
    });
    setHighlightInput("");
  };

  const handleRemoveHighlight = (index: number) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      highlights: editingItem.highlights.filter((_, i) => i !== index),
    });
  };

  const handleAddSkillTag = () => {
    if (!skillInput.trim() || !editingItem) return;
    setEditingItem({
      ...editingItem,
      skills: [...editingItem.skills, skillInput.trim()],
    });
    setSkillInput("");
  };

  const handleRemoveSkillTag = (index: number) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      skills: editingItem.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold">
            <Briefcase className="h-4 w-4" />
            <span>Career Path & Experience</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
            Manage Experience Timeline
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Add career roles, instructorships, specializations, and bullet point achievements.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience Entry</span>
        </button>
      </div>

      {/* Experience Timeline Entries */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {item.role}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.period}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                <span className="text-zinc-800 dark:text-zinc-200">{item.company}</span>
                {item.location && (
                  <span className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500">
                    • <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-600 dark:text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(item)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                title="Delete Experience"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Experience Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {items.some((e) => e.id === editingItem.id)
                  ? "Edit Experience Entry"
                  : "Add New Experience"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Role / Position Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        role: e.target.value,
                      })
                    }
                    placeholder="e.g. Part-Time IT Instructor"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Company / Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.company}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        company: e.target.value,
                      })
                    }
                    placeholder="e.g. Higher Education Institute"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Period / Timeframe <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.period}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        period: e.target.value,
                      })
                    }
                    placeholder="e.g. 2024 – Present"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingItem.location || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        location: e.target.value,
                      })
                    }
                    placeholder="e.g. On-Site / Remote"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Role Description
                </label>
                <textarea
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  placeholder="Summary of core responsibilities..."
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 resize-none"
                />
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Bullet Point Achievements
                </label>
                <div className="space-y-2">
                  {editingItem.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 text-xs bg-zinc-50 dark:bg-zinc-950 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <span className="text-zinc-800 dark:text-zinc-200">{highlight}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add bullet point achievement..."
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="rounded-lg bg-zinc-200 dark:bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    Add Bullet
                  </button>
                </div>
              </div>

              {/* Skill Tags */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Associated Skill Badges
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editingItem.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs font-mono text-zinc-800 dark:text-zinc-200"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillTag(idx)}
                        className="text-zinc-400 hover:text-red-500 ml-1 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add skill tag (e.g. React, SQL)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkillTag}
                    className="rounded-lg bg-zinc-200 dark:bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>
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
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
