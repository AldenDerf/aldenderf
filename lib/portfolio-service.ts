import fs from "fs";
import path from "path";
import { PortfolioData, initialPortfolioData } from "@/data/portfolio";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "portfolio-store.json");

// In-memory fallback cache for fast performance during dev runtime
let memoryCache: PortfolioData | null = null;

export function getPortfolioData(): PortfolioData {
  if (memoryCache) {
    return memoryCache;
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const rawData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(rawData) as PortfolioData;
      memoryCache = {
        ...initialPortfolioData,
        ...parsed,
        profile: { ...initialPortfolioData.profile, ...(parsed.profile || {}) },
        projects: parsed.projects || initialPortfolioData.projects,
        experience: parsed.experience || initialPortfolioData.experience,
        skills: parsed.skills || initialPortfolioData.skills,
        certifications: parsed.certifications || initialPortfolioData.certifications,
        channels: parsed.channels || initialPortfolioData.channels,
      };
      return memoryCache;
    }
  } catch (error) {
    console.error("Error reading portfolio-store.json, using initial data:", error);
  }

  memoryCache = initialPortfolioData;
  return memoryCache;
}

export function savePortfolioData(data: PortfolioData): boolean {
  try {
    memoryCache = data;
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving portfolio-store.json:", error);
    return false;
  }
}
