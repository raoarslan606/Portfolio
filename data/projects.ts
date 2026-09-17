import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "vitu",
    title: "Vitu",
    description:
      "A comprehensive health-tech device platform enabling seamless patient monitoring, device management, and real-time health data visualization.",
    longDescription:
      "Vitu is a cutting-edge health-tech platform built to bridge the gap between medical devices and healthcare providers. The platform offers real-time device monitoring, patient data aggregation, and an intuitive dashboard for healthcare professionals.",
    image: "/images/projects/vitu.png",
    tags: ["Next.js", "Node.js", "MongoDB", "TypeScript", "Socket.io", "AWS"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    category: "health-tech",
  },
  {
    id: "verifilite",
    title: "Verifilite",
    description:
      "An AI-powered identity verification platform with real-time document analysis, facial recognition, and automated compliance checks.",
    longDescription:
      "Verifilite leverages cutting-edge AI to deliver instant, accurate identity verification. The platform integrates with leading AI services for document OCR, facial biometrics, and liveness detection, making KYC compliance fast and reliable.",
    image: "/images/projects/verifilite.png",
    tags: ["React", "Node.js", "Python", "AI/ML", "AWS Rekognition", "MongoDB"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    category: "ai",
  },
  {
    id: "verifilite-portal",
    title: "Verifilite Portal",
    description:
      "A full-featured SaaS KYC dashboard for businesses to manage customer identity verification workflows, analytics, and compliance reporting.",
    longDescription:
      "The Verifilite Portal is the B2B SaaS product powering businesses to manage their KYC pipelines. It features multi-tenant architecture, role-based access control, real-time analytics dashboards, and detailed audit trails.",
    image: "/images/projects/verifilite-portal.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Redis"],
    liveUrl: "",
    githubUrl: "",
    featured: true,
    category: "saas",
  },
  {
    id: "ofnt-presale",
    title: "OFNT Presale",
    description:
      "A Web3 token presale platform with smart contract integration, real-time contribution tracking, and a transparent allocation dashboard.",
    longDescription:
      "OFNT Presale is a decentralized token presale platform built on EVM-compatible blockchains. It features smart contract-backed contribution management, real-time fund tracking, tiered presale rounds, and wallet connectivity via WalletConnect and MetaMask.",
    image: "/images/project-minimal-1.jpg",
    tags: ["Next.js", "Solidity", "Ethers.js", "WalletConnect", "Hardhat", "IPFS"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    category: "web3",
  },
  {
    id: "asfr-token",
    title: "ASFR Token",
    description:
      "A Web3 token platform with staking, tokenomics dashboard, roadmap tracking, and community governance features.",
    longDescription:
      "ASFR Token is a feature-rich Web3 platform for the ASFR ecosystem. It includes a staking module, a live tokenomics dashboard with real-time price feeds, governance voting, and integration with major DEXes for liquidity tracking.",
    image: "/images/project-minimal-1.jpg",
    tags: ["React", "Web3.js", "Solidity", "The Graph", "Tailwind CSS", "Node.js"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    category: "web3",
  },
  {
    id: "nja-fleet",
    title: "NJ Ashton (NJA)",
    description:
      "An enterprise fleet management platform for real-time vehicle tracking, maintenance scheduling, driver management, and operational reporting.",
    longDescription:
      "NJA is a comprehensive fleet management system built for large-scale transport operations. Features include GPS-based real-time tracking, automated maintenance alerts, driver performance analytics, trip history, and a mobile-responsive operational dashboard.",
    image: "/images/projects/nja-fleet.png",
    tags: ["React", "Node.js", "MongoDB", "Google Maps API", "Express", "Redis"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    category: "fleet",
  },
  {
    id: "discount-pulse",
    title: "Discount Pulse",
    description:
      "A feature-rich admin panel and analytics dashboard for managing discounts, promotions, merchants, and real-time sales performance.",
    longDescription:
      "Discount Pulse is a powerful admin system for managing a multi-merchant discount and promotions platform. It includes a drag-and-drop promotion builder, real-time sales analytics, merchant management, and detailed reporting with CSV export.",
    image: "/images/project-minimal-1.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "Chart.js", "Express", "AWS S3"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    category: "admin",
  },
  {
    id: "verifilite-admin",
    title: "Verifilite Admin",
    description:
      "An internal admin console for the Verifilite platform — managing users, verifications, compliance logs, and system configuration.",
    longDescription:
      "Verifilite Admin is the operational backbone of the Verifilite ecosystem. Built for internal teams, it provides granular control over user accounts, verification queues, compliance reporting, system health monitoring, and feature flag management.",
    image: "/images/projects/verifilite-admin.png",
    tags: ["Next.js", "TypeScript", "MongoDB", "Prisma", "RBAC", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    category: "admin",
  },
];
