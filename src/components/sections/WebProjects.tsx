"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, personalInfo } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ProjectCard } from "./ProjectCard";
import { FilterChips } from "../ui/FilterChips";

/**
 * Filters are by stack, not by tech and not by business type.
 *
 * Not by tech because the tags don't discriminate: "React", "Next.js",
 * "TypeScript", "Framer Motion" and "Vercel" all match the exact same seven
 * projects, so they would be five buttons with one behaviour — a visitor
 * clicking between them sees nothing change and concludes the filter is broken.
 *
 * Not by business type because a recruiter filters for what they need to hire,
 * and the vertical each project served is already in its description.
 */
const STACK_FILTERS: { id: string; label: string; matches: (tags: string[]) => boolean }[] = [
  {
    id: "react",
    label: "React / Next.js",
    matches: (tags) => tags.includes("React") || tags.includes("Next.js"),
  },
  {
    id: "laravel",
    label: "Vue / Laravel",
    matches: (tags) =>
      tags.includes("Vue.js") || tags.includes("Laravel") || tags.includes("PHP"),
  },
];

export function WebProjects() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string[]>([]);

  const options = useMemo(
    () =>
      STACK_FILTERS.map((f) => ({
        id: f.id,
        label: f.label,
        count: projects.filter((p) => f.matches(p.tags)).length,
      })),
    [],
  );

  // Union, not intersection: selecting both stacks widens the view rather than
  // narrowing it to projects that somehow use both.
  const visible = useMemo(() => {
    if (selected.length === 0) return projects;
    const active = STACK_FILTERS.filter((f) => selected.includes(f.id));
    return projects.filter((p) => active.some((f) => f.matches(p.tags)));
  }, [selected]);

  return (
    <section id="web" className="py-24 md:py-32 bg-slate-50/50 overflow-hidden">
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
            {t.web.heading}
          </motion.h2>
          <motion.p
            className="text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.web.subtitle}
          </motion.p>
        </motion.div>

        <FilterChips
          options={options}
          selected={selected}
          onChange={setSelected}
          allLabel={t.web.filterAll}
          totalCount={projects.length}
          ariaLabel={t.web.filterLabel}
        />

        {/* Projects Grid */}
        <LayoutGroup>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        {/* View More CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            whileHover={{ x: 5 }}
          >
            {t.web.viewMore}
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
