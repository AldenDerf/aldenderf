"use client";

import { useState } from "react";
import { SkillCategory } from "@/data/portfolio";
import { Cpu, Plus, Edit2, Trash2, CheckCircle, X } from "lucide-react";

interface SkillsManagerProps {
  skills: SkillCategory[];
  onUpdate: (updatedSkills: SkillCategory[]) => void;
}

export function SkillsManager({ skills, onUpdate }: SkillsManagerProps) {
  const [categories, setCategories] = useState<SkillCategory[]>([...skills]);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(
    null
  );
  const [categoryOriginalTitle, setCategoryOriginalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillTagInput, setSkillTagInput] = useState("");

  const handleOpenCreate = () => {
    setEditingCategory({
      title: "",
      description: "",
      skills: [],
    });
    setCategoryOriginalTitle("");
    setSkillTagInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: SkillCategory) => {
    setEditingCategory({ ...category, skills: [...category.skills] });
    setCategoryOriginalTitle(category.title);
    setSkillTagInput("");
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (title: string) => {
    if (!confirm(`Are you sure you want to delete the category "${title}"?`))
      return;
    const updated = categories.filter((c) => c.title !== title);
    setCategories(updated);
    onUpdate(updated);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.title.trim()) return;

    let updatedList: SkillCategory[];
    const exists = categories.some((c) => c.title === categoryOriginalTitle);

    if (exists) {
      updatedList = categories.map((c) =>
        c.title === categoryOriginalTitle ? editingCategory : c
      );
    } else {
      updatedList = [...categories, editingCategory];
    }

    setCategories(updatedList);
    onUpdate(updatedList);
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleAddSkillBadge = () => {
    if (!skillTagInput.trim() || !editingCategory) return;
    if (editingCategory.skills.includes(skillTagInput.trim())) return;
    setEditingCategory({
      ...editingCategory,
      skills: [...editingCategory.skills, skillTagInput.trim()],
    });
    setSkillTagInput("");
  };

  const handleRemoveSkillBadge = (skillToRemove: string) => {
    if (!editingCategory) return;
    setEditingCategory({
      ...editingCategory,
      skills: editingCategory.skills.filter((s) => s !== skillToRemove),
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider font-semibold">
            <Cpu className="h-4 w-4" />
            <span>Technical Capabilities & Skills</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
            Manage Skill Categories & Tags
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Organize tech stacks into Frontend, Backend, Databases, and Operational Concepts.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.title}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {category.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleOpenEdit(category)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                  title="Edit Category"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.title)}
                  className="p-1.5 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="flex flex-wrap gap-2 pt-1">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {categoryOriginalTitle
                  ? `Edit Category: ${categoryOriginalTitle}`
                  : "Add New Skill Category"}
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
                  Category Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.title}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Frontend, Cloud Infrastructure"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Category Description
                </label>
                <input
                  type="text"
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="e.g. Building responsive, modern user interfaces."
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              {/* Skills Tag List */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Skills Badges List
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingCategory.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillBadge(skill)}
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
                    placeholder="Add skill (e.g. React, Next.js)"
                    value={skillTagInput}
                    onChange={(e) => setSkillTagInput(e.target.value)}
                    className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkillBadge}
                    className="rounded-lg bg-zinc-200 dark:bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    Add Skill
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
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
