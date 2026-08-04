"use client";

import { motion } from "framer-motion";
import type { EditorTool } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EngineBadge } from "@/components/ui/EngineBadge";
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
            {tool.githubUrl && (
              <a
                href={tool.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-github-600 hover:text-github-700"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {t.games.viewOnGithub}
              </a>
            )}

            {tool.linkedinUrl && (
              <a
                href={tool.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                {t.games.viewOnLinkedin}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
