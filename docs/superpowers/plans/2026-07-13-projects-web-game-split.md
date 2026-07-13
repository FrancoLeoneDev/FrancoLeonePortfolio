# Split Projects into Game Dev + Web Dev — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single `#projects` section with two sections — a Game Dev section (Unity featured game + Unreal gameplay systems) shown first, and a Web Dev section (existing projects, no filter) shown second.

**Architecture:** Static Next.js site (`output: "export"`). All content is hardcoded in `src/data/portfolio.ts`; media are plain files under `public/`. Two new section components (`GameDev`, `WebProjects`) plus three card components (`ProjectCard`, `FeaturedGameCard`, `GameSystemCard`) replace the old `Projects.tsx`. i18n strings live in `src/i18n/dictionaries.ts`.

**Tech Stack:** Next.js 15 (App Router, static export), React 19, TypeScript, Tailwind CSS v4, framer-motion 11.

## Global Constraints

- Site is a **static export** (`next.config.ts` → `output: "export"`, `images.unoptimized: true`). No server code, no DB, no data fetching. All content is literal data in `src/data/portfolio.ts`; all media are files in `public/`.
- The `es` dictionary is typed `Dictionary = typeof en`, so **every key added to `en` must be mirrored in `es`** or the build fails.
- Verification gate for every task: `npm run build` completes with **no type errors and no build errors** (this compiles TypeScript and runs the static export). There is no unit-test runner in this project.
- Section order on the page: **Game Dev first, Web Dev second.**
- Preserve existing visual language: framer-motion entrance animations, `max-w-6xl mx-auto px-6` containers, `rounded-2xl` cards, `primary-*` / `slate-*` color scale.
- Commit after each task with the exact message shown.

---

### Task 1: Reorganize portfolio data

**Files:**
- Modify: `src/data/portfolio.ts`

**Interfaces:**
- Consumes: existing `Project` interface, `Localized` type.
- Produces:
  - `projects: Project[]` — **web projects only** (Memora removed).
  - `featuredGame: Project` — the Memora object.
  - `interface GameSystem { id: string; title: string; description: Localized; poster: string; video?: string; tags: string[]; linkedinUrl?: string; engine: "unreal" }`
  - `gameSystems: GameSystem[]`.

- [ ] **Step 1: Remove Memora from the `projects` array**

In `src/data/portfolio.ts`, delete the Memora object (the block with `id: "memora"`, currently lines ~130-141) from the `projects` array. The `projects` array must now contain only: `cookizza`, `papelera-bahia`, `sagis`, `dantofema`, `incasas`, `mogotes`, `fiplatina`, `andes`.

- [ ] **Step 2: Add `featuredGame` and the `GameSystem` model below the `projects` array**

Insert immediately after the closing `];` of the `projects` array:

```ts
// The Unity project shown as the "Featured Game" in the Game Dev section.
export const featuredGame: Project = {
  id: "memora",
  title: "Memora - Horror Game Demo",
  description: {
    en: "90s-era horror game featuring a unique memory mechanic where players dive into photographs to solve puzzles and escape from a nightmare. Explores atmospheric environments including a mansion and hospital with interactive puzzles and horror events.",
    es: "Juego de terror ambientado en los años 90 con una mecánica única de memoria donde el jugador se sumerge en fotografías para resolver puzzles y escapar de una pesadilla. Explora entornos atmosféricos como una mansión y un hospital, con puzzles interactivos y eventos de terror.",
  },
  image: "/projects/memora.jpg",
  tags: ["Unity", "C#", "Game Development", "Horror"],
  liveUrl: "https://memoraoficial.itch.io/memora",
  status: "in-progress",
  featured: true,
};

// Individual Unreal Engine (C++) gameplay systems. Each maps to a LinkedIn write-up.
// To add a system: append here and drop <id>.mp4 / <id>.jpg into public/systems/.
export interface GameSystem {
  id: string;
  title: string;
  description: Localized;
  poster: string; // /systems/<id>.jpg — shown as video poster and as fallback when no video
  video?: string; // /systems/<id>.mp4 — optional inline clip
  tags: string[];
  linkedinUrl?: string; // link to the LinkedIn post; button hidden when empty/absent
  engine: "unreal";
}

export const gameSystems: GameSystem[] = [
  {
    id: "grid-inventory",
    title: "Grid Inventory System",
    description: {
      en: "A Tetris-style grid inventory built in Unreal Engine with C++: items occupy multiple cells with drag-and-drop placement, rotation, and stacking, backed by fast slot lookup and collision checks.",
      es: "Un inventario en grilla estilo Tetris hecho en Unreal Engine con C++: los ítems ocupan múltiples celdas con colocación por drag-and-drop, rotación y apilado, con búsqueda rápida de slots y chequeo de colisiones.",
    },
    poster: "/projects/placeholder.jpg",
    tags: ["Unreal Engine", "C++", "Gameplay"],
    linkedinUrl: "",
    engine: "unreal",
  },
  {
    id: "object-inspection",
    title: "Object Inspection System",
    description: {
      en: "A first-person object inspection system in Unreal Engine with C++: pick up and rotate props in 3D to examine them, with smooth camera focus and highlight-on-hover.",
      es: "Un sistema de inspección de objetos en primera persona en Unreal Engine con C++: agarrá y rotá props en 3D para examinarlos, con enfoque de cámara suave y resaltado al pasar el mouse.",
    },
    poster: "/projects/placeholder.jpg",
    tags: ["Unreal Engine", "C++", "Gameplay"],
    linkedinUrl: "",
    engine: "unreal",
  },
];
```

> Note: the two seed systems are placeholders using the existing `/projects/placeholder.jpg` poster and no clip, so nothing renders broken. Franco replaces the title/description/`linkedinUrl` and drops real `poster`/`video` files during content handoff.

- [ ] **Step 3: Build to verify types**

Run: `npm run build`
Expected: build succeeds. (`Projects.tsx` still imports `projects` and now renders 8 web cards without Memora — this is fine.)

- [ ] **Step 4: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "data: split projects into web projects, featuredGame, and gameSystems"
```

---

### Task 2: Add i18n strings (additive)

**Files:**
- Modify: `src/i18n/dictionaries.ts`

**Interfaces:**
- Produces (added to both `en` and `es`, keeping the old `projects` block and `nav.projects` in place for now):
  - `nav.games`, `nav.web`
  - `web` block: `heading, subtitle, featured, statusCompleted, statusInProgress, readMore, showLess, viewMore`
  - `games` block: `heading, subtitle, featuredGameLabel, systemsLabel, systemsSubtitle, playDemo, viewOnLinkedin, statusInProgress`

- [ ] **Step 1: Add nav keys in `en`**

In the `en.nav` object, add after `projects: "Projects",`:

```ts
    games: "Games",
    web: "Web",
```

- [ ] **Step 2: Add `web` and `games` blocks in `en`**

Immediately after the closing `},` of the `en.projects` block, insert:

```ts
  web: {
    heading: "Web Development",
    subtitle:
      "Full-stack web applications and e-commerce platforms built with modern technologies.",
    featured: "Featured",
    statusCompleted: "Completed",
    statusInProgress: "In Progress",
    readMore: "Read more",
    showLess: "Show less",
    viewMore: "View more on GitHub",
  },
  games: {
    heading: "Game Development",
    subtitle: "A featured game and a collection of individual gameplay systems.",
    featuredGameLabel: "Featured Game",
    systemsLabel: "Gameplay Systems",
    systemsSubtitle: "Individual systems built in Unreal Engine with C++.",
    playDemo: "Play the demo",
    viewOnLinkedin: "View on LinkedIn",
    statusInProgress: "In Progress",
  },
```

- [ ] **Step 3: Mirror the same keys in `es`**

In `es.nav`, add after `projects: "Proyectos",`:

```ts
    games: "Juegos",
    web: "Web",
```

Immediately after the closing `},` of the `es.projects` block, insert:

```ts
  web: {
    heading: "Desarrollo Web",
    subtitle:
      "Aplicaciones web full-stack y plataformas de e-commerce construidas con tecnologías modernas.",
    featured: "Destacado",
    statusCompleted: "Completado",
    statusInProgress: "En progreso",
    readMore: "Ver más",
    showLess: "Ver menos",
    viewMore: "Ver más en GitHub",
  },
  games: {
    heading: "Desarrollo de Videojuegos",
    subtitle: "Un juego destacado y una colección de sistemas de gameplay individuales.",
    featuredGameLabel: "Juego destacado",
    systemsLabel: "Sistemas de Gameplay",
    systemsSubtitle: "Sistemas individuales construidos en Unreal Engine con C++.",
    playDemo: "Jugar la demo",
    viewOnLinkedin: "Ver en LinkedIn",
    statusInProgress: "En progreso",
  },
```

- [ ] **Step 4: Build to verify `en`/`es` shapes match**

Run: `npm run build`
Expected: build succeeds (if `es` is missing a key, TypeScript fails here).

- [ ] **Step 5: Commit**

```bash
git add src/i18n/dictionaries.ts
git commit -m "i18n: add web + games dictionary blocks and nav keys"
```

---

### Task 3: Extract `ProjectCard` into its own file

**Files:**
- Create: `src/components/sections/ProjectCard.tsx`

**Interfaces:**
- Consumes: `Project` from `@/data/portfolio`; `t.web.*` labels from Task 2.
- Produces: `export function ProjectCard({ project, index }: { project: Project; index: number })`.

- [ ] **Step 1: Create `ProjectCard.tsx`**

This is the existing card from `Projects.tsx` (lines 11-273), moved to its own file, with the `t.projects.*` label references changed to `t.web.*`. Full file:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, pick } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const description = pick(project.description);
  const descriptionTooLong = description.length > 120;

  return (
    <motion.article
      layoutId={project.id}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1], type: "spring", stiffness: 100, damping: 20 },
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
    >
      {/* Image Container */}
      <div className="relative h-48 md:h-56 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
              project.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            {project.status === "completed" ? t.web.statusCompleted : t.web.statusInProgress}
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
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 animate-pulse-ring-subtle">
              {t.web.featured}
            </span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <motion.div
        layout="position"
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1], type: "spring", stiffness: 100, damping: 20 },
          delay: index * 0.1 + 0.2,
        }}
      >
        <motion.h3
          layout="position"
          className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors"
          whileHover={{ x: 5 }}
          transition={{ layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        >
          {project.title}
        </motion.h3>
        <motion.div
          layout
          className="mb-4 overflow-hidden"
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], type: "spring", stiffness: 100, damping: 20 }}
        >
          <motion.p
            layout="position"
            className={`text-slate-600 text-sm ${!isExpanded && descriptionTooLong ? "line-clamp-2" : ""}`}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>
          {descriptionTooLong && (
            <motion.button
              layout="position"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700 text-xs font-medium mt-1 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {isExpanded ? t.web.showLess : t.web.readMore}
            </motion.button>
          )}
        </motion.div>

        {/* Tags */}
        <motion.div
          layout="position"
          className="flex flex-wrap gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: index * 0.1 + 0.3 } },
          }}
        >
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
              variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.1, backgroundColor: "rgb(219 234 254)", color: "rgb(29 78 216)" }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom border animation on hover */}
      <motion.div
        layout="position"
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ scaleX: { duration: 0.3 }, layout: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
        style={{ originX: 0 }}
      />
    </motion.article>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds. (`ProjectCard.tsx` is not imported anywhere yet; the old `Projects.tsx` still has its own internal copy. Both compile.)

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ProjectCard.tsx
git commit -m "refactor: extract ProjectCard into its own component using t.web labels"
```

---

### Task 4: Create the Web Dev section

**Files:**
- Create: `src/components/sections/WebProjects.tsx`

**Interfaces:**
- Consumes: `projects`, `personalInfo` from `@/data/portfolio`; `ProjectCard` from `./ProjectCard`; `t.web.*`.
- Produces: `export function WebProjects()` rendering `<section id="web">`.

- [ ] **Step 1: Create `WebProjects.tsx`**

Same layout as the old Projects section but with the status filter removed, `id="web"`, and `t.web.*` labels:

```tsx
"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, personalInfo } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ProjectCard } from "./ProjectCard";

export function WebProjects() {
  const { t } = useLanguage();

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

        {/* Projects Grid */}
        <LayoutGroup>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => (
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
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds (`WebProjects` not yet wired into the page; compiles standalone).

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/WebProjects.tsx
git commit -m "feat: add Web Dev section (id=web) without status filter"
```

---

### Task 5: Create the gameplay-system card

**Files:**
- Create: `src/components/sections/GameSystemCard.tsx`

**Interfaces:**
- Consumes: `GameSystem` from `@/data/portfolio`; `t.games.viewOnLinkedin`.
- Produces: `export function GameSystemCard({ system, index }: { system: GameSystem; index: number })`.

- [ ] **Step 1: Create `GameSystemCard.tsx`**

Lazy-plays the clip via IntersectionObserver (only plays while on screen); falls back to the poster `<Image>` when there is no `video`; shows the LinkedIn button only when `linkedinUrl` is set:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GameSystem } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";

export function GameSystemCard({ system, index }: { system: GameSystem; index: number }) {
  const { t, pick } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col"
      whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
    >
      {/* Media */}
      <div className="relative h-48 md:h-52 bg-slate-900 overflow-hidden">
        {system.video ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={system.poster}
            muted
            loop
            playsInline
            preload="none"
          >
            <source src={system.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={system.poster}
            alt={system.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
          {system.title}
        </h3>
        <p className="text-slate-600 text-sm mb-4">{pick(system.description)}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {system.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {system.linkedinUrl && (
          <a
            href={system.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
            {t.games.viewOnLinkedin}
          </a>
        )}
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/GameSystemCard.tsx
git commit -m "feat: add GameSystemCard with lazy-played clip and LinkedIn link"
```

---

### Task 6: Create the featured-game card

**Files:**
- Create: `src/components/sections/FeaturedGameCard.tsx`

**Interfaces:**
- Consumes: `Project` from `@/data/portfolio`; `t.games.statusInProgress`, `t.games.playDemo`.
- Produces: `export function FeaturedGameCard({ game }: { game: Project })`.

- [ ] **Step 1: Create `FeaturedGameCard.tsx`**

A large two-column hero card (image + full description, no truncation):

```tsx
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
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/FeaturedGameCard.tsx
git commit -m "feat: add FeaturedGameCard hero layout for the Unity game"
```

---

### Task 7: Create the Game Dev section

**Files:**
- Create: `src/components/sections/GameDev.tsx`

**Interfaces:**
- Consumes: `featuredGame`, `gameSystems` from `@/data/portfolio`; `FeaturedGameCard`, `GameSystemCard`; `t.games.*`.
- Produces: `export function GameDev()` rendering `<section id="games">` with a Unity subgroup (featured game) and an Unreal subgroup (systems grid).

- [ ] **Step 1: Create `GameDev.tsx`**

```tsx
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
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/GameDev.tsx
git commit -m "feat: add Game Dev section with Unity featured game + Unreal systems"
```

---

### Task 8: Wire the new sections into the page and navigation

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/Navigation.tsx:9-16` (NAV_ITEMS)
- Modify: `src/components/sections/Hero.tsx:230`

**Interfaces:**
- Consumes: `GameDev`, `WebProjects` (Tasks 7, 4); `nav.games`, `nav.web` (Task 2).

- [ ] **Step 1: Update `page.tsx`**

Replace the `Projects` import and usage. Change line 5 from `import { Projects } from "@/components/sections/Projects";` to:

```tsx
import { GameDev } from "@/components/sections/GameDev";
import { WebProjects } from "@/components/sections/WebProjects";
```

Replace `<Projects />` (line 18) with the two sections in order (Game Dev first):

```tsx
        <GameDev />
        <WebProjects />
```

- [ ] **Step 2: Update `NAV_ITEMS` in `Navigation.tsx`**

Replace the single projects entry (`{ key: "projects", href: "#projects" },`) with two entries, games before web:

```tsx
  { key: "games", href: "#games" },
  { key: "web", href: "#web" },
```

The `NAV_ITEMS` array now reads: home, about, skills, games, web, experience, contact. (`t.nav[item.key]` resolves for both new keys — added in Task 2.)

- [ ] **Step 3: Update the Hero CTA target**

In `src/components/sections/Hero.tsx` line ~230, change the "View My Work" button target from `href="#projects"` to:

```tsx
            <Button href="#games" size="lg">
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Visual verification**

Run: `npm run dev`, open the site, and confirm in both EN and ES:
- Nav shows **Games** and **Web** (Juegos / Web in ES), each scrolling to the correct section.
- Game Dev renders **first**: Memora as the large featured card, then the "Gameplay Systems" grid with the two seed systems (posters, no clip yet, no LinkedIn button since URLs are empty).
- Web Dev renders **second**: all 8 web projects, **no** filter buttons.
- Hero "View My Work" scrolls to the Game Dev section.
- Layout holds on a narrow (mobile) width and a wide (desktop) width.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/components/Navigation.tsx src/components/sections/Hero.tsx
git commit -m "feat: render Game Dev + Web Dev sections and update nav + hero CTA"
```

---

### Task 9: Remove the old Projects component and dead i18n keys

**Files:**
- Delete: `src/components/sections/Projects.tsx`
- Modify: `src/i18n/dictionaries.ts` (remove `nav.projects` and the `projects` block from both `en` and `es`)

**Interfaces:**
- No new interfaces. Removes `t.projects.*` and `t.nav.projects`, which no longer have any consumers after Task 8.

- [ ] **Step 1: Delete the old section file**

```bash
git rm src/components/sections/Projects.tsx
```

- [ ] **Step 2: Remove dead i18n keys**

In `src/i18n/dictionaries.ts`, delete `projects: "Projects",` from `en.nav` and `projects: "Proyectos",` from `es.nav`. Delete the entire `projects: { ... }` block from **both** `en` and `es` (the block with `filterAll`/`filterCompleted`/`filterInProgress`/`empty`/etc.). Keep the new `web` and `games` blocks.

- [ ] **Step 3: Confirm nothing references the removed keys**

Run: `grep -rn "t.projects\|nav.projects\|from \"@/components/sections/Projects\"" src/`
Expected: no matches.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build succeeds (no references to the deleted symbols remain).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "cleanup: remove old Projects component and unused projects i18n keys"
```

---

## Content handoff (post-implementation, done with Franco)

Not a code task — the structure ships with placeholder systems. To make system #1 real:

1. In `src/data/portfolio.ts` → `gameSystems`, update the first entry's `title`, `description` (EN + ES), `tags`, and set `linkedinUrl` to the real LinkedIn post URL.
2. Add the clip and a poster frame to `public/systems/`, e.g. `grid-inventory.mp4` and `grid-inventory.jpg`, then set `video: "/systems/grid-inventory.mp4"` and `poster: "/systems/grid-inventory.jpg"`.
3. Repeat for system #2 when ready (append or edit the second entry). Keep clips short (~5-10s), muted, and MP4/H.264 for small size.

## Self-Review

**Spec coverage:**
- Two sections, Game first / Web second → Tasks 7, 4, 8. ✅
- Game Dev split by engine (Unity featured + Unreal systems) → Tasks 6, 5, 7. ✅
- Inline lazy clip + LinkedIn link, poster fallback → Task 5. ✅
- Web section without status filter → Task 4. ✅
- Static data model: `projects` (web), `featuredGame`, `gameSystems` → Task 1. ✅
- Nav "Games" + "Web", Hero → `#games` → Task 8. ✅
- i18n web + games blocks, drop old keys → Tasks 2, 9. ✅
- No DB / all in `public/` → honored throughout (Global Constraints). ✅

**Placeholder scan:** The only placeholders are the intentional seed `gameSystems` content and the empty `linkedinUrl` (documented in Task 1 + Content handoff). No "TBD"/"implement later" in code steps. ✅

**Type consistency:** `GameSystem` fields (`poster`, `video?`, `linkedinUrl?`, `engine`) defined in Task 1 are used identically in Task 5. `featuredGame: Project` used by `FeaturedGameCard({ game: Project })` in Task 6. `t.web.*` / `t.games.*` keys added in Task 2 match every reference in Tasks 3, 5, 6, 7. ✅
