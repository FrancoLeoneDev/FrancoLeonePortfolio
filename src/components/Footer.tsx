"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-xl font-bold text-primary-600"
            whileHover={{ scale: 1.05 }}
          >
            {personalInfo.name}
            <span className="text-slate-400">.</span>
          </motion.a>

          {/* Copyright */}
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>

          {/* Back to top */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 text-sm transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to top
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
