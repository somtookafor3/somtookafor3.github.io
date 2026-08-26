import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Somtochukwu Okafor — Software Engineer",
    template: "%s — Somtochukwu Okafor",
  },
  description:
    "Computer Science graduate working on backend systems, crypto arbitrage tooling and automation in Python and TypeScript. Projects, code and CV.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "graduate software engineer",
  ],
  openGraph: {
    title: "Somtochukwu Okafor — Software Engineer",
    description:
      "Full-stack applications, real-time trading systems, and AI-powered automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
