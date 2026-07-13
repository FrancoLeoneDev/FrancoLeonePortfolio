"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";

export function FeaturedGameCard({ game }: { game: Project }) {
  const { t, pick } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group grid md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
      whileHover={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
    >
      {/* Image */}
      <div className="relative h-64 md:h-full min-h-[16rem] overflow-hidden">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {game.status === "in-progress" && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
            {t.games.statusInProgress}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{game.title}</h3>
        <p className="text-slate-600 mb-6 leading-relaxed">{pick(game.description)}</p>

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
