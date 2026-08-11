"use client";

import { motion } from "framer-motion";
import {
  editorTools,
  featuredGame,
  gameSystems,
  multiplayerProjects,
} from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { BlockLabel } from "@/components/ui/BlockLabel";
import { EditorToolCard } from "./EditorToolCard";
import { FeaturedGameCard } from "./FeaturedGameCard";
import { GameSystemCard } from "./GameSystemCard";
import { MultiplayerProjectCard } from "./MultiplayerProjectCard";

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

        {/* Featured Game */}
        <div className="mb-16">
          {/* No subtitle under this one, so the label carries the gap to the card itself. */}
          <BlockLabel className="mb-6">{t.games.featuredGameLabel}</BlockLabel>
          <FeaturedGameCard game={featuredGame} />
        </div>

        {/* Multiplayer. Second, right after the featured game: these are whole playable
            games — menu, lobby, win condition — so they belong with the games rather
            than after the component-level blocks below. */}
        {multiplayerProjects.length > 0 && (
          <div className="mb-16">
            <BlockLabel>{t.games.multiplayerLabel}</BlockLabel>
            <motion.p
              className="text-slate-600 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {t.games.multiplayerSubtitle}
            </motion.p>
            <div className="space-y-8">
              {multiplayerProjects.map((project, index) => (
                <MultiplayerProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Gameplay Systems */}
        <div className="mb-16">
          <BlockLabel>{t.games.systemsLabel}</BlockLabel>
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

        {/* Editor Tools */}
        <div>
          <BlockLabel>{t.games.toolsLabel}</BlockLabel>
          <motion.p
            className="text-slate-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {t.games.toolsSubtitle}
          </motion.p>
          <div className="space-y-8">
            {editorTools.map((tool, index) => (
              <EditorToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
