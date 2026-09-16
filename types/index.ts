// ─── Type definitions for portfolio data ─────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;         // path relative to /public/images/
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: "health-tech" | "ai" | "web3" | "saas" | "fleet" | "admin";
}

export interface Skill {
  name: string;
  level?: number; // 0-100
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  type: "full-time" | "part-time" | "freelance" | "contract";
  description: string[];
  technologies: string[];
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade?: string;
  activities?: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}
