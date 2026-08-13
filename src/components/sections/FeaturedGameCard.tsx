"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EngineBadge } from "@/components/ui/EngineBadge";
import { FeaturedGameGallery } from "./FeaturedGameGallery";

export function FeaturedGameCard({ game }: { game: Project }) {
  const { t, pick } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
      whileHover={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
    >
      {/* Media. Full width and 16:9 — the shape the screenshots were captured in — rather than
          half of a two-column card: this is the one game with a real gallery behind it, and at
          half width the frames were too small to be worth looking at. The copy reads underneath. */}
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Falls back to the single `image` so a project without a gallery renders unchanged. */}
        <FeaturedGameGallery
          shots={game.images ?? [{ src: game.image }]}
          title={game.title}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Engine and status share one corner so they read as a single caption on the art. */}
        <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2">
          {game.engine && (
            <EngineBadge
              engine={game.engine}
              className="border-white/30 bg-white/85 shadow-sm backdrop-blur"
            />
          )}
          {game.status === "in-progress" && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              {t.games.statusInProgress}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col">
        {/* h4: the block label above this card is the h3. */}
        <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{game.title}</h4>
        {/* Capped: the card is the full section wide now, and the description is long enough
            that an uncapped line here would run past what anyone reads comfortably. */}
        <p className="max-w-3xl text-slate-600 mb-6 leading-relaxed">{pick(game.description)}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {game.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {game.liveUrl && (
          <a
            href={game.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium self-start"
          >
            {t.games.playDemo}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  );
}
