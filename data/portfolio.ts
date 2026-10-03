export interface Project {
  id: string;
  title: string;
  description: string;
  context?: string;
  status?: string;
  problem?: string;
  solution?: string;
  techStack: string[];
  deployment?: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface ProfileInfo {
  name: string;
  title: string;
  headline: string;
  subtitle: string;
  statusBadge: string;
  isAvailable: boolean;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  avatarLight: string;
  avatarDark: string;
  bio: string[];
}

export const profileData: ProfileInfo = {
  "name": "Alden Derf",
  "title": "Software Engineer · Full-Stack Developer",
  "headline": "Software Engineer · Full-Stack Developer",
  "subtitle": "I build full-stack applications that solve real operational problems using modern web technologies and an AI-assisted engineering workflow.",
  "statusBadge": "Available for Full-Time Roles",
  "isAvailable": true,
  "email": "aldenderfc.fabro99@gmail.com",
  "github": "https://github.com/aldenderf",
  "linkedin": "https://www.linkedin.com/in/alden-derf/",
  "resumeUrl": "",
  "avatarLight": "/profile/what%20shirt%20with%20white%20background.png",
  "avatarDark": "/profile/Black%20shirt%20with%20shades.png",
  "bio": [
    "I'm Alden Derf Fabro, an Ivatan software engineer and full-stack developer from Batanes, Philippines. My experience spans application support, hospital system development, technical instruction, and government operations.",
    "I build full-stack applications with Next.js, React, TypeScript, Node.js, PostgreSQL, Supabase, Prisma, Laravel/PHP, and SQL Server."
  ]
};

export const projectsData: Project[] = [
  {
    "id": "mva-2026",
    "title": "MVA 2026 Mahatao Volleyball League Platform",
    "description": "Full-stack tournament management for the Mahatao Volleyball Association.",
    "context": "Community Sports / Tournament Management",
    "status": "Active Development",
    "problem": "Tournament registration, roster tracking, payments, and league administration require manual workflows that become difficult to track as teams and players increase.",
    "solution": "Built public team registration, roster management, payment tracking, administrative verification, and tournament-aware public pages.",
    "techStack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "Tailwind CSS"
    ],
    "deployment": ["Vercel", "Supabase"],
    "highlights": [
      "Public team registration with division-aware workflows.",
      "Per-player registration payment tracking for pending, verified, and outstanding balances, including legacy payment allocation.",
      "Role-based administration and audit logging.",
      "Safe correction workflows for player identity, rosters, teams, and payments, with deletion safeguards for financially linked records.",
      "Database migrations for evolving production data requirements."
    ],
    "featured": true
  },
  {
    "id": "bghweb",
    "title": "BGHWeb Hospital Internal System",
    "description": "Internal hospital application maintained and modernized within existing production workflows.",
    "context": "Healthcare / Internal Enterprise Application",
    "status": "Production Maintenance & Modernization",
    "problem": "A long-running hospital application needs continued development and modernization while staying compatible with a shared database, organizational accounts, and production workflows.",
    "solution": "Maintain and incrementally modernize an application built with Laravel, React, Inertia, Vite, and Microsoft SQL Server.",
    "techStack": [
      "Laravel",
      "PHP",
      "React",
      "Inertia.js",
      "TypeScript",
      "Vite",
      "Microsoft SQL Server"
    ],
    "deployment": ["Windows Server", "Laragon", "Microsoft SQL Server"],
    "highlights": [
      "Maintains an existing production hospital application.",
      "Works with a shared Microsoft SQL Server database and existing account infrastructure.",
      "Incrementally migrates React components from JavaScript to TypeScript.",
      "Maintains role-based access control while modernizing frontend modules.",
      "Uses staged branches and focused migrations to reduce modernization risk."
    ],
    "featured": true
  },
  {
    "id": "learn",
    "title": "Learn — Web Systems Learning Platform",
    "description": "Structured lessons and labs for Web Systems and related IT classes.",
    "context": "Education / Developer Learning Platform",
    "status": "Actively Used for Teaching",
    "problem": "Students need beginner-friendly development materials that remain practical with limited internet access and device availability.",
    "solution": "Built a learning platform with lessons, labs, code examples, checkpoints, and practical exercises for classroom use.",
    "techStack": [
      "Next.js",
      "React",
      "TypeScript"
    ],
    "highlights": [
      "Structured self-paced lessons and laboratory exercises.",
      "Beginner-friendly explanations for Express, PostgreSQL, Supabase, React, and web development.",
      "Copyable code examples and troubleshooting guidance.",
      "Progression from backend fundamentals through frontend and full-stack integration.",
      "Materials designed with limited connectivity in mind."
    ],
    "featured": true
  }
];

export const experienceData: ExperienceItem[] = [
  {
    "id": "administrative-assistant-procurement",
    "role": "Administrative Assistant I — Procurement",
    "company": "Batanes General Hospital",
    "period": "July 2025 – Present",
    "description": "Handles procurement-related administrative workflows, supplier documentation, purchase orders, monitoring, and compliance while continuing software development work outside the primary role.",
    "highlights": [
      "Monitors procurement activity and prepares structured reports.",
      "Verifies supplier documentation and purchase order records.",
      "Applies practical workflow and process understanding to daily operations."
    ],
    "skills": [
      "Procurement Monitoring",
      "Documentation",
      "Reporting"
    ]
  },
  {
    "id": "part-time-it-instructor",
    "role": "Part-Time IT Instructor",
    "company": "Batanes State College",
    "period": "Present",
    "description": "Teaches IT and web development subjects including Web Technologies, Web Systems, Information Assurance & Security, and System Administration.",
    "highlights": [
      "Teaches React, Express, Node.js, PostgreSQL/Supabase, HTML/CSS/JavaScript, Git, and system administration topics.",
      "Creates practical labs, tutorials, and assessment materials.",
      "Designs beginner-friendly materials for students with limited connectivity."
    ],
    "skills": [
      "React",
      "Express",
      "Node.js",
      "PostgreSQL",
      "Git"
    ]
  },
  {
    "id": "bgh-computer-programmer",
    "role": "Administrative Aide IV / Computer Programmer",
    "company": "Batanes General Hospital",
    "period": "",
    "description": "Provided IT support and contributed to internal hospital software and systems.",
    "highlights": [
      "Developed and maintained Laravel-based internal systems.",
      "Supported users and hospital IT operations.",
      "Worked with databases, access control, and internal applications."
    ],
    "skills": [
      "Laravel",
      "PHP",
      "Databases",
      "Access Control"
    ]
  },
  {
    "id": "unilab-application-support",
    "role": "Application Support",
    "company": "Unilab via Vertere",
    "period": "",
    "description": "Provided application support, troubleshooting, and user/system issue resolution.",
    "highlights": [],
    "skills": [
      "Application Support",
      "Troubleshooting"
    ]
  },
  {
    "id": "batanelco-it-assistant",
    "role": "IT Assistant",
    "company": "BATANELCO",
    "period": "",
    "description": "Provided IT support, technical troubleshooting, and assistance with organizational systems.",
    "highlights": [],
    "skills": [
      "IT Support",
      "Troubleshooting"
    ]
  }
];

export const skillsData: SkillCategory[] = [
  {
    "title": "Frontend",
    "description": "Building web interfaces and classroom projects.",
    "skills": [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3"
    ]
  },
  {
    "title": "Backend & APIs",
    "description": "Building and maintaining application services.",
    "skills": [
      "Node.js",
      "Express",
      "Laravel",
      "PHP",
      "REST APIs"
    ]
  },
  {
    "title": "Databases",
    "description": "Working with application data.",
    "skills": [
      "PostgreSQL",
      "Supabase",
      "Microsoft SQL Server",
      "MySQL",
      "Prisma ORM"
    ]
  },
  {
    "title": "Developer Tools / Engineering",
    "description": "Tools and practices used in development and maintenance.",
    "skills": [
      "Git",
      "GitHub",
      "Vite",
      "Postman",
      "RBAC",
      "Database Design",
      "API Integration",
      "System Maintenance"
    ]
  },
  {
    "title": "Deployment & Infrastructure",
    "description": "I deploy and maintain applications across managed platforms and on-premise Windows Server environments.",
    "skills": ["Vercel", "Supabase", "Windows Server", "Laragon", "Microsoft SQL Server"]
  },
  {
    "title": "AI-Assisted Engineering",
    "description": "Tools used in my engineering workflow; distinct from the technology stack.",
    "skills": [
      "ChatGPT",
      "Codex",
      "Antigravity"
    ]
  }
];

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  skills?: string[];
}

export const certificationsData: Certification[] = [];

export interface SocialChannel {
  id: string;
  name: string;
  url: string;
  icon: string; // e.g. "github", "linkedin", "mail", "twitter", "youtube", "telegram", "discord", "globe"
  enabled: boolean;
}


export const channelsData: SocialChannel[] = [
  {
    "id": "github",
    "name": "GitHub",
    "url": "https://github.com/aldenderf",
    "icon": "github",
    "enabled": true
  },
  {
    "id": "linkedin",
    "name": "LinkedIn",
    "url": "https://www.linkedin.com/in/alden-derf/",
    "icon": "linkedin",
    "enabled": true
  },
  {
    "id": "email",
    "name": "Email",
    "url": "mailto:aldenderfc.fabro99@gmail.com",
    "icon": "mail",
    "enabled": true
  }
];

export interface PortfolioData {
  profile: ProfileInfo;
  projects: Project[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  certifications: Certification[];
  channels: SocialChannel[];
}

export const initialPortfolioData: PortfolioData = {
  profile: profileData,
  projects: projectsData,
  experience: experienceData,
  skills: skillsData,
  certifications: certificationsData,
  channels: channelsData,
};

