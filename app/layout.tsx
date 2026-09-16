import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/theme.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arslanrasheed.dev"),
  title: "Muhammad Arslan Rasheed — Full-Stack MERN Developer",
  description:
    "Full-Stack MERN Developer specialising in Web3, SaaS platforms, and health-tech. Building premium digital experiences with React, Next.js, Node.js, and blockchain technologies.",
  keywords: [
    "Full-Stack Developer",
    "MERN Stack",
    "Next.js",
    "React",
    "Node.js",
    "Web3",
    "SaaS",
    "TypeScript",
    "Muhammad Arslan Rasheed",
  ],
  authors: [{ name: "Muhammad Arslan Rasheed", url: "https://github.com/raoarslan606" }],
  creator: "Muhammad Arslan Rasheed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arslanrasheed.dev",
    title: "Muhammad Arslan Rasheed — Full-Stack MERN Developer",
    description:
      "Full-Stack MERN Developer specialising in Web3, SaaS, and health-tech. Crafting premium digital experiences.",
    siteName: "Muhammad Arslan Rasheed Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Arslan Rasheed — Full-Stack MERN Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Arslan Rasheed — Full-Stack MERN Developer",
    description:
      "Full-Stack MERN Developer specialising in Web3, SaaS, and health-tech.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Preload Clash Display from Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
