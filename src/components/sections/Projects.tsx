"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/data/portfolio";

type FilterType = "all" | "completed" | "in-progress";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
      }}
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-56 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {/* Placeholder gradient - replace with actual images */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/80 to-primary-700/80 flex items-center justify-center"
          animate={{
            backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-white/80 text-lg font-medium"
            animate={{ scale: isHovered ? 0.9 : 1, opacity: isHovered ? 0.6 : 1 }}
          >
            {project.title}
          </motion.span>
        </motion.div>

        {/* Hover overlay with buttons */}
        <motion.div
          className="absolute inset-0 bg-slate-900/70 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full text-slate-900 hover:bg-primary-500 hover:text-white transition-colors"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full text-slate-900 hover:bg-primary-500 hover:text-white transition-colors"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          )}
        </motion.div>

        {/* Status Badge */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <motion.span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              project.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            {project.status === "completed" ? "Completed" : "In Progress"}
          </motion.span>
        </motion.div>

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <motion.span
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 0 4px rgba(59, 130, 246, 0.2)",
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Featured
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <motion.div
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        <motion.h3
          className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors"
          whileHover={{ x: 5 }}
        >
          {project.title}
        </motion.h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags with stagger animation */}
        <motion.div
          className="flex flex-wrap gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: index * 0.1 + 0.3,
              },
            },
          }}
        >
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgb(219 234 254)",
                color: "rgb(29 78 216)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom border animation on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.status === filter;
  });

  const filters: { label: string; value: FilterType }[] = [
    { label: "All Projects", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "In Progress", value: "in-progress" },
  ];

  return (
    <section id="projects" className="py-24 md:py-32 bg-slate-50/50 overflow-hidden">
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
            Featured Projects
          </motion.h2>
          <motion.p
            className="text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A selection of my web and game development projects, showcasing
            different technologies and approaches.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {filters.map((f, index) => (
            <motion.button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.value
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 mt-12"
          >
            No projects found with the selected filter.
          </motion.p>
        )}

        {/* View More CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href={`https://github.com/yourusername`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
            whileHover={{ x: 5 }}
          >
            View more on GitHub
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
