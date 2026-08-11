"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DebugTool } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EngineBadge } from "@/components/ui/EngineBadge";
import { ResourceLink } from "@/components/ui/ResourceLink";
import { MediaGallery } from "./MediaGallery";

/**
 * A grid cell, same size as a gameplay system rather than a full-width tool row.
 * These tools are read as a set — the point is that there are several and that
 * they all buy back iteration time — and a set reads better as a row of cards than
 * as a stack of essays.
 *
 * Problem and description share one toggle. Two "read more" buttons inside a
 * 340px card is noise, and nobody wants to open the halves separately.
 */
export function DebugToolCard({ tool, index }: { tool: DebugTool; index: number }) {
  const { t, pick } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      id={tool.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      // No padding around the media: it runs edge to edge like the gameplay-system
      // cards, so the picture is never smaller than the ones beside it.
      className="group relative flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
    >
      <MediaGallery media={tool.media} title={tool.title} compact />

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <EngineBadge engine={tool.engine} />
        </div>

        {/* h4: the block label above the grid is the h3. */}
        <h4 className="mb-3 text-xl font-semibold text-slate-900 transition-colors group-hover:text-primary-600">
          {tool.title}
        </h4>

        <div className="mb-3 border-l-2 border-primary-200 pl-3">
          <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-600">
            {t.games.toolProblem}
          </p>
          <p
            className={`text-xs leading-relaxed text-slate-500 ${
              isExpanded ? "" : "line-clamp-2"
            }`}
          >
            {pick(tool.problem)}
          </p>
        </div>

        <p
          className={`text-sm leading-relaxed text-slate-600 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {pick(tool.description)}
        </p>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="mt-1 self-start text-xs font-medium text-primary-600 transition-colors hover:text-primary-700"
        >
          {isExpanded ? t.common.showLess : t.common.readMore}
        </button>

        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {(tool.githubUrl || tool.linkedinUrl) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {tool.githubUrl && <ResourceLink kind="github" href={tool.githubUrl} />}
            {tool.linkedinUrl && (
              <ResourceLink kind="linkedin" href={tool.linkedinUrl} />
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
