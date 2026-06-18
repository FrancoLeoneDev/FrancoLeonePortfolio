"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/dictionaries";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
];

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={`relative flex items-center rounded-full border border-slate-200 bg-white/80 p-0.5 backdrop-blur-sm ${className}`}
    >
      {OPTIONS.map((option) => {
        const isActive = lang === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={isActive}
            className={`relative z-10 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
              isActive ? "text-white" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="langToggleActive"
                className="absolute inset-0 -z-10 rounded-full bg-primary-600"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
