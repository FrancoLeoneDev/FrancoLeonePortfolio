"use client";

import { motion } from "framer-motion";

/**
 * Heads one of the blocks inside a section (Featured Game, Gameplay Systems, Editor Tools).
 *
 * It carries more weight than the card titles it groups — otherwise the hierarchy inverts and an
 * individual card reads as more important than the group. Uppercase and coloured rather than
 * large and dark, so it stays legible as a *group label* and doesn't compete with item titles.
 *
 * The trailing rule is the part that does the real work: it marks where a block starts when you
 * are scrolling past three of them.
 */
export function BlockLabel({
  children,
  className = "mb-2",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h3
      className={`flex items-center gap-4 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <span className="shrink-0 text-base font-bold uppercase tracking-widest text-primary-600">
        {children}
      </span>
      <span
        className="h-px flex-1 bg-gradient-to-r from-primary-300 to-transparent"
        aria-hidden="true"
      />
    </motion.h3>
  );
}
