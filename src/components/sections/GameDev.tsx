"use client";

import { motion } from "framer-motion";
import { featuredGame, gameSystems } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { FeaturedGameCard } from "./FeaturedGameCard";
import { GameSystemCard } from "./GameSystemCard";

export function GameDev() {
  const { t } = useLanguage();

  return (
    <section id="games" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.games.heading}
          </motion.h2>
          <motion.p
            className="text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.games.subtitle}
          </motion.p>
        </motion.div>

        {/* Unity — Featured Game */}
        <div className="mb-16">
          <motion.h3
            className="text-sm font-semibold uppercase tracking-wider text-primary-600 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {t.games.featuredGameLabel}
          </motion.h3>
          <FeaturedGameCard game={featuredGame} />
        </div>

        {/* Unreal — Gameplay Systems */}
        <div>
          <motion.h3
            className="text-sm font-semibold uppercase tracking-wider text-primary-600 mb-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {t.games.systemsLabel}
          </motion.h3>
          <motion.p
            className="text-slate-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {t.games.systemsSubtitle}
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameSystems.map((system, index) => (
              <GameSystemCard key={system.id} system={system} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
