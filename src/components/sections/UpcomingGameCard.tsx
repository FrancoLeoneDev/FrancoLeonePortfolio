"use client";

import { motion } from "framer-motion";
import type { UpcomingGame } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * A game announced before it has anything to show.
 *
 * Deliberately not the standard card shape: no media slot, a shorter band, and a
 * dashed border. A normal card with an empty image area reads as broken, and the
 * reader blames the site; a block that is visibly text-first reads as intentional,
 * and the reader takes it as an announcement. The dashed edge carries that signal
 * on its own, before a word is read.
 */
export function UpcomingGameCard({ game }: { game: UpcomingGame }) {
  const { t, pick } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-6 md:p-8"
    >
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          {t.games.inDevelopment}
        </span>
        <h4 className="text-xl font-semibold text-slate-900 md:text-2xl">
          {game.title}
        </h4>
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
        {pick(game.description)}
      </p>

      <p className="mt-3 text-sm text-slate-400">{pick(game.status)}</p>

      {game.systemAnchor && (
        <a
          href={`#${game.systemAnchor}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
        >
          {t.games.seeWhatIsBuilt}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      )}
    </motion.article>
  );
}
