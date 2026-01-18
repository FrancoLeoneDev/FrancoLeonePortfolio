import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Franco Leone | Full Stack & Game Developer",
  description:
    "Full Stack Developer & Game Developer with expertise in React, TypeScript, Node.js, Unity, and Unreal Engine. Building high-quality web applications and interactive experiences.",
  keywords: [
    "Franco Leone",
    "Full Stack Developer",
    "Game Developer",
    "React",
    "TypeScript",
    "Unity",
    "Unreal Engine",
    "Web Developer",
  ],
  authors: [{ name: "Franco Leone" }],
  openGraph: {
    title: "Franco Leone | Full Stack & Game Developer",
    description:
      "Full Stack Developer & Game Developer specializing in web applications and interactive experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
