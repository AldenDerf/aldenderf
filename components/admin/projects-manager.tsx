"use client";

import { useState } from "react";
import { Project } from "@/data/portfolio";
import {
  Code2,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle,
  X,
  Star,
} from "lucide-react";

interface ProjectsManagerProps {
  projects: Project[];
  onUpdate: (updatedProjects: Project[]) => void;
}

export function ProjectsManager({ projects, onUpdate }: ProjectsManagerProps) {
  const [items, setItems] = useState<Project[]>([...projects]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");

  const handleOpenCreate = () => {
    setEditingProject({
      id: `project-${Date.now()}`,
      title: "",
      description: "",
      techStack: [],
      highlights: [],
      liveUrl: "",
      githubUrl: "",
      featured: true,
    });
    setTechInput("");
    setHighlightInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProject({ ...proj });
    setTechInput("");
    setHighlightInput("");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const updated = items.filter((p) => p.id !== id);
    setItems(updated);
    onUpdate(updated);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList: Project[];
    const exists = items.some((p) => p.id === editingProject.id);

    if (exists) {
      updatedList = items.map((p) =>
        p.id === editingProject.id ? editingProject : p
      );
    } else {
      updatedList = [editingProject, ...items];
    }

    setItems(updatedList);
    onUpdate(updatedList);
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleAddTechTag = () => {
    if (!techInput.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      techStack: [...editingProject.techStack, techInput.trim()],
    });
    setTechInput("");
  };

  const handleRemoveTechTag = (index: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      techStack: editingProject.techStack.filter((_, i) => i !== index),
    });
  };

  const handleAddHighlight = () => {
    if (!highlightInput.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      highlights: [...editingProject.highlights, highlightInput.trim()],
    });
    setHighlightInput("");
  };

  const handleRemoveHighlight = (index: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      highlights: editingProject.highlights.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-600 dark:text-sky-400 uppercase tracking-wider font-semibold">
            <Code2 className="h-4 w-4" />
            <span>Featured Engineering Projects</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
            Manage Flagship Projects
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Add new engineering achievements, edit technical highlights, or update repository URLs.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((project) => (
          <div
            key={project.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-500" />
                    Featured
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-700 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  title="View Live Link"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              <button
                onClick={() => handleOpenEdit(project)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                title="Delete Project"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {items.some((p) => p.id === editingProject.id)
                  ? "Edit Project"
                  : "Add New Project"}
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
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Enterprise Health Management System"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="Detailed summary of the project architecture and features..."
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        liveUrl: e.target.value,
                      })
                    }
                    placeholder="https://demo.example.com"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    GitHub Code Repository URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        githubUrl: e.target.value,
                      })
                    }
                    placeholder="https://github.com/username/repo"
                    className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Tech Stack Badges
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editingProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs font-mono text-zinc-800 dark:text-zinc-200"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTechTag(idx)}
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
                    placeholder="Add technology (e.g. Next.js, PostgreSQL)"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={handleAddTechTag}
                    className="rounded-lg bg-zinc-200 dark:bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    Add Tag
                  </button>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Technical Highlights (Bullet Points)
                </label>
                <div className="space-y-2">
                  {editingProject.highlights.map((highlight, idx) => (
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
                    placeholder="Add technical accomplishment bullet point..."
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

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featuredProject"
                  checked={editingProject.featured || false}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      featured: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="featuredProject"
                  className="text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  Flag as Featured Flagship Project
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
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
