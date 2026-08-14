"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  debugTools,
  editorTools,
  featuredGame,
  gameSystems,
  multiplayerProjects,
  upcomingGames,
} from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { BlockLabel } from "@/components/ui/BlockLabel";
import { DebugToolCard } from "./DebugToolCard";
import { EditorToolCard } from "./EditorToolCard";
import { FeaturedGameCard } from "./FeaturedGameCard";
import { GameSystemCard } from "./GameSystemCard";
import { MultiplayerProjectCard } from "./MultiplayerProjectCard";
import { UpcomingGameCard } from "./UpcomingGameCard";
import { FilterChips } from "@/components/ui/FilterChips";

/**
 * Only the gameplay systems are filterable. Debug and editor tools are already
 * their own sections and are all Unity, so a filter there would be a control
 * that never changes anything.
 *
 * Engine and game share one row even though they are different dimensions,
 * because the union reads naturally ("Unity or Memora") and two rows would be
 * more chrome than twelve cards deserve. Two systems carry no game, so a
 * game-only selection hides them — correct, and recoverable by clearing.
 */
const SYSTEM_FILTERS: {
  id: string;
  label: string;
  matches: (s: (typeof gameSystems)[number]) => boolean;
}[] = [
  { id: "unity", label: "Unity", matches: (s) => s.engine === "unity" },
  { id: "unreal", label: "Unreal", matches: (s) => s.engine === "unreal" },
  { id: "memora", label: "Memora", matches: (s) => s.project === "Memora" },
  { id: "listof20", label: "ListOf20", matches: (s) => s.project === "ListOf20" },
];

export function GameDev() {
  const { t } = useLanguage();
  const [systemFilters, setSystemFilters] = useState<string[]>([]);

  const systemOptions = useMemo(
    () =>
      SYSTEM_FILTERS.map((f) => ({
        id: f.id,
        label: f.label,
        count: gameSystems.filter(f.matches).length,
      })),
    [],
  );

  const visibleSystems = useMemo(() => {
    if (systemFilters.length === 0) return gameSystems;
    const active = SYSTEM_FILTERS.filter((f) => systemFilters.includes(f.id));
    return gameSystems.filter((s) => active.some((f) => f.matches(s)));
  }, [systemFilters]);

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

        {/* Featured Game, then whatever is announced but not yet showable. Order is the
            argument: the game with material first, "and I am also building this" after. */}
        <div className="mb-16">
          {/* No subtitle under this one, so the label carries the gap to the card itself. */}
          <BlockLabel className="mb-6">{t.games.featuredGameLabel}</BlockLabel>
          <FeaturedGameCard game={featuredGame} />

          {upcomingGames.length > 0 && (
            <div className="mt-6 space-y-4">
              {upcomingGames.map((game) => (
                <UpcomingGameCard key={game.id} game={game} />
              ))}
            </div>
          )}
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
          <FilterChips
            options={systemOptions}
            selected={systemFilters}
            onChange={setSystemFilters}
            allLabel={t.games.systemsFilterAll}
            totalCount={gameSystems.length}
            ariaLabel={t.games.systemsFilterLabel}
          />
          <LayoutGroup>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {visibleSystems.map((system, index) => (
                  <GameSystemCard key={system.id} system={system} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </div>

        {/* Testing & Debug Tools. Before the published tools on purpose: internal
            tooling says how the work gets done, the released tools say what shipped. */}
        {debugTools.length > 0 && (
          <div className="mb-16">
            <BlockLabel>{t.games.debugToolsLabel}</BlockLabel>
            <motion.p
              className="text-slate-600 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {t.games.debugToolsSubtitle}
            </motion.p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {debugTools.map((tool, index) => (
                <DebugToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </div>
        )}

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
