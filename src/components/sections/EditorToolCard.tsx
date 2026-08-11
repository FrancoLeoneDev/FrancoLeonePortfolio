"use client";

import { motion } from "framer-motion";
import type { EditorTool } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EngineBadge } from "@/components/ui/EngineBadge";
import { ResourceLink } from "@/components/ui/ResourceLink";
import { ToolGallery } from "./ToolGallery";

/**
 * A full-width row rather than a grid cell: an editor tool's argument is its interface, and
 * editor UI screenshots are unreadable at a third of the page width.
 */
export function EditorToolCard({ tool, index }: { tool: EditorTool; index: number }) {
  const { t, pick } = useLanguage();

  return (
    // The id makes each tool linkable on its own (the CV points at #audio-trim rather than the
    // top of the page); scroll-mt clears the fixed navbar so the card doesn't land under it.
    <motion.article
      id={tool.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="grid scroll-mt-24 gap-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:grid-cols-5 lg:p-8"
    >
      {/* min-w-0 on both columns: grid children default to min-content width, which the gallery's
          thumbnail strip would otherwise blow past on narrow viewports. */}
      <div className="min-w-0 lg:col-span-3">
        <ToolGallery shots={tool.shots} title={tool.title} />
      </div>

      <div className="flex min-w-0 flex-col lg:col-span-2">
        <EngineBadge engine={tool.engine} className="mb-3 self-start" />

        <h4 className="mb-4 text-2xl font-semibold text-slate-900">{tool.title}</h4>

        <div className="mb-5 border-l-2 border-primary-200 pl-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
            {t.games.toolProblem}
          </p>
          <p className="text-sm leading-relaxed text-slate-600">{pick(tool.problem)}</p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-slate-600">{pick(tool.description)}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* The row keeps mt-auto so the links stay pinned to the bottom of the column even when
            only one of the two is present. */}
        {(tool.linkedinUrl || tool.githubUrl) && (
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
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
