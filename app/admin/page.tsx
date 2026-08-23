"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PortfolioData } from "@/data/portfolio";
import { AboutEditor } from "@/components/admin/about-editor";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { ExperienceManager } from "@/components/admin/experience-manager";
import { SkillsManager } from "@/components/admin/skills-manager";
import { ChannelsManager } from "@/components/admin/channels-manager";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  User,
  Code2,
  Briefcase,
  Cpu,
  Share2,
  ArrowUpRight,
  Save,
  CheckCircle2,
  RefreshCw,
  LayoutDashboard,
} from "lucide-react";

type TabId = "about" | "projects" | "experience" | "skills" | "channels";

export default function AdminDashboardPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("about");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/portfolio", { cache: "no-store" });
        if (res.ok && active) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load portfolio data in admin:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const handleSaveAll = async (updatedData?: PortfolioData) => {
    const payload = updatedData || data;
    if (!payload) return;

    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        setData(result.data);
        showToast("Portfolio changes saved and published live!");
      } else {
        showToast("Failed to save changes. Please try again.");
      }
    } catch (err) {
      console.error("Save error:", err);
      showToast("Error saving data to server.");
    } finally {
      setSaving(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-md">
          <RefreshCw className="h-5 w-5 animate-spin text-emerald-500" />
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Loading Admin Workspace...
          </span>
        </div>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: typeof User }[] = [
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Featured Engineering", icon: Code2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "channels", label: "Social Channels", icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-zinc-900 text-white px-5 py-3 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 transition-colors">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Portfolio Admin Studio
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <span>View Public Site</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={() => handleSaveAll()}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              <span>{saving ? "Saving..." : "Save All"}</span>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-8 space-y-8">
        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs font-mono uppercase text-zinc-400 dark:text-zinc-500">
              Projects
            </span>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
              {data.projects.length}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs font-mono uppercase text-zinc-400 dark:text-zinc-500">
              Experience Roles
            </span>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
              {data.experience.length}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs font-mono uppercase text-zinc-400 dark:text-zinc-500">
              Skill Categories
            </span>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
              {data.skills.length}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-xs font-mono uppercase text-zinc-400 dark:text-zinc-500">
              Active Channels
            </span>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
              {data.channels.filter((c) => c.enabled).length} / {data.channels.length}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-semibold transition-colors shrink-0 cursor-pointer ${
                  isActive
                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5"
                    : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="pt-2">
          {activeTab === "about" && (
            <AboutEditor
              profile={data.profile}
              onUpdate={(updatedProfile) => {
                const newData = { ...data, profile: updatedProfile };
                setData(newData);
                handleSaveAll(newData);
              }}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsManager
              projects={data.projects}
              onUpdate={(updatedProjects) => {
                const newData = { ...data, projects: updatedProjects };
                setData(newData);
                handleSaveAll(newData);
              }}
            />
          )}

          {activeTab === "experience" && (
            <ExperienceManager
              experience={data.experience}
              onUpdate={(updatedExperience) => {
                const newData = { ...data, experience: updatedExperience };
                setData(newData);
                handleSaveAll(newData);
              }}
            />
          )}

          {activeTab === "skills" && (
            <SkillsManager
              skills={data.skills}
              onUpdate={(updatedSkills) => {
                const newData = { ...data, skills: updatedSkills };
                setData(newData);
                handleSaveAll(newData);
              }}
            />
          )}

          {activeTab === "channels" && (
            <ChannelsManager
              channels={data.channels}
              onUpdate={(updatedChannels) => {
                const newData = { ...data, channels: updatedChannels };
                setData(newData);
                handleSaveAll(newData);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

