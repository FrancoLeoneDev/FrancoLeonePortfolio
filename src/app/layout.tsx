import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Franco Leone | Game & Full Stack Developer",
  description:
    "Game Developer & Full Stack Developer with expertise in Unity, Unreal Engine, React, TypeScript, and Node.js. Building gameplay systems and high-quality web applications.",
  keywords: [
    "Franco Leone",
    "Game Developer",
    "Unity",
    "Unreal Engine",
    "C++",
    "C#",
    "Full Stack Developer",
    "React",
    "TypeScript",
    "Web Developer",
  ],
  authors: [{ name: "Franco Leone" }],
  openGraph: {
    title: "Franco Leone | Game & Full Stack Developer",
    description:
      "Game Developer & Full Stack Developer specializing in gameplay systems and web applications.",
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
      <body className="bg-white text-slate-900 antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
