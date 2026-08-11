"use client";

import { motion } from "framer-motion";
import type { MultiplayerProject } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EngineBadge } from "@/components/ui/EngineBadge";
import { ExpandableText } from "@/components/ui/ExpandableText";
import { ResourceLink } from "@/components/ui/ResourceLink";
import { MediaGallery } from "./MediaGallery";

/**
 * A full-width row, same as the editor tools and for the same reason: the evidence
 * is a 2x2 grid of four simultaneous clients, and at a third or a half of the page
 * width each client window is ~270px — too small to read the state that the whole
 * card exists to show.
 */
export function MultiplayerProjectCard({
  project,
  index,
}: {
  project: MultiplayerProject;
  index: number;
}) {
  const { t, pick } = useLanguage();

  return (
    <motion.article
      id={project.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="grid scroll-mt-24 gap-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:grid-cols-5 lg:p-8"
    >
      <div className="min-w-0 lg:col-span-3">
        <MediaGallery media={project.media} title={project.title} />
      </div>

      <div className="flex min-w-0 flex-col lg:col-span-2">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <EngineBadge engine={project.engine} />
          {/* The topology is the headline fact of these two cards — it is the only
              thing that differs between them at the architecture level. */}
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
            {t.games.topology[project.topology]}
          </span>
        </div>

        <h4 className="mb-1 text-2xl font-semibold text-slate-900">{project.title}</h4>

        {project.context && (
          <p className="mb-4 text-xs text-slate-400">{pick(project.context)}</p>
        )}

        <div className="mb-5">
          <ExpandableText
            text={pick(project.description)}
            lines={4}
            className="text-sm leading-relaxed text-slate-600"
          />
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {(project.githubUrl || project.build) && (
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
            {project.githubUrl && (
              <ResourceLink kind="github" href={project.githubUrl} />
            )}
            {project.build && (
              <ResourceLink
                kind={project.build.kind}
                href={project.build.url}
                detail={[project.build.platform, project.build.size]
                  .filter(Boolean)
                  .join(" · ")}
              />
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
