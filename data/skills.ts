import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "Monitor",
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "Redux Toolkit" },
      { name: "HTML5 / CSS3" },
    ],
  },
  {
    category: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "GraphQL" },
      { name: "Socket.io" },
      { name: "JWT / OAuth" },
      { name: "Microservices" },
    ],
  },
  {
    category: "Database & ORM",
    icon: "Database",
    skills: [
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "Redis" },
      { name: "Prisma" },
      { name: "Mongoose" },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      { name: "AWS (EC2, S3, Lambda)" },
      { name: "Docker" },
      { name: "CI/CD Pipelines" },
      { name: "Vercel" },
      { name: "Nginx" },
      { name: "Linux / VPS" },
    ],
  },
  {
    category: "Web3 & Blockchain",
    icon: "Layers",
    skills: [
      { name: "Solidity" },
      { name: "Ethers.js" },
      { name: "Web3.js" },
      { name: "Hardhat" },
      { name: "WalletConnect" },
      { name: "IPFS" },
      { name: "The Graph" },
    ],
  },
  {
    category: "AI-Assisted Dev",
    icon: "Cpu",
    skills: [
      { name: "GitHub Copilot" },
      { name: "Cursor AI" },
      { name: "OpenAI API" },
      { name: "LangChain" },
      { name: "AWS Rekognition" },
      { name: "Prompt Engineering" },
    ],
  },
  {
    category: "Tools",
    icon: "Wrench",
    skills: [
      { name: "Git / GitHub" },
      { name: "VS Code" },
      { name: "Postman" },
      { name: "Figma" },
      { name: "Jira / Notion" },
      { name: "Webpack / Vite" },
    ],
  },
];
