import type { Experience, Education, SocialLink, NavItem } from "@/types";

export const experiences: Experience[] = [
  {
    id: "quantum-bases",
    company: "Quantum Bases",
    role: "MERN Stack Developer",
    period: "Aug 2024 – Present",
    location: "Remote",
    type: "full-time",
    description: [
      "Architected and delivered full-stack features across multiple SaaS, health-tech, and Web3 products serving thousands of users.",
      "Built Verifilite — an AI-powered identity verification platform with facial recognition and document analysis pipelines using AWS Rekognition.",
      "Developed the Verifilite SaaS Portal with multi-tenant architecture, Stripe billing integration, and role-based access control.",
      "Led development of OFNT Presale and ASFR Token Web3 platforms, implementing smart contract integrations with Ethers.js and WalletConnect.",
      "Built the Vitu health-tech device platform enabling real-time patient monitoring with Socket.io and AWS infrastructure.",
      "Implemented CI/CD pipelines with Docker and GitHub Actions, reducing deployment time by 60%.",
      "Collaborated with product managers and designers to define technical requirements and deliver ahead of schedule.",
      "Wrote comprehensive technical documentation and code-reviewed junior developers' PRs.",
    ],
    technologies: [
      "Next.js", "React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL",
      "AWS", "Docker", "Solidity", "Ethers.js", "Redis", "Socket.io",
    ],
  },
];

export const education: Education[] = [
  {
    id: "gcuf",
    institution: "Government College University Faisalabad (GCUF)",
    degree: "Bachelor of Science",
    field: "Computer Science",
    period: "Sept 2020 – Sept 2024",
    grade: "Graduated",
    activities: [
      "Focused on software engineering, data structures, and algorithms.",
      "Built multiple full-stack projects as part of coursework.",
      "Active member of the university coding club.",
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/raoarslan606",
    icon: "Github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/raoarslan606",
    icon: "Linkedin",
  },
  {
    name: "Email",
    url: "mailto:marslanrasheed73@gmail.com",
    icon: "Mail",
  },
  {
    name: "Phone",
    url: "tel:+923071417820",
    icon: "Phone",
  },
];

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
