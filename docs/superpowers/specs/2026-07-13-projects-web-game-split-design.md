# Split Projects into Game Dev + Web Dev sections

**Date:** 2026-07-13
**Status:** Approved (pending spec review)

## Problem

The portfolio has a single `#projects` section that mixes all work together (8 web
projects + 1 game). Franco wants to separate his web and game work, and — more
importantly — to present his game work the way a *gameplay programmer* portfolio
should: individual gameplay systems, each shown in action, rather than one lumped
"games" grid.

## Goals

- Two distinct top-level sections instead of one combined "Projects" section.
- A Game Dev section with its own identity, organized **by engine**.
- Present Unreal work as individual **gameplay systems** (the standard for gameplay
  programmer portfolios), each with a short muted looping clip and a link to the
  matching LinkedIn write-up.
- Keep the site fully **static** — no database, no CMS. All content lives in
  `src/data/portfolio.ts`; all media lives in `public/`.

## Non-goals

- No backend, DB, or CMS.
- No changes to About / Skills / Experience / Contact copy or layout (beyond the two
  nav links and the "View My Work" button target).
- No video hosting service — clips are plain files in `public/systems/`.

## Decisions (agreed)

- **Section order:** Game Dev **first**, Web Dev **second**.
- **Web status filter** (All / Completed / In Progress): **removed** — after the split
  every web project is "completed", so the filter no longer distinguishes anything.
- **Game media:** inline muted looping clip **plus** a "Ver en LinkedIn" link. Falls
  back to a static poster when a system has no clip yet.
- **Seed content:** Franco's 1 already-published Unreal system now, with a slot for the
  2nd he's adding shortly.

## Structure

### Game Dev section (`#games`) — first

Split into two engine subgroups:

1. **Unity → Featured Game.** Memora rendered as a large "featured game" card: prominent
   image, full description, tags, link to itch.io. A single hero-style card, not a grid.
2. **Unreal Engine → Gameplay Systems.** A responsive grid of compact system cards. Each
   card:
   - A muted, looping, `playsInline` `<video>` with `preload="none"` that starts playing
     only when scrolled into view (via framer-motion `whileInView` / IntersectionObserver).
   - Falls back to a static poster image when `video` is absent.
   - Title, short description, tech tags (e.g. Unreal Engine, C++).
   - "Ver en LinkedIn" button (only shown when `linkedinUrl` is present).

### Web Dev section (`#web`) — second

The existing projects grid, filtered to web projects, with the status-filter buttons
removed. Card design unchanged (reuses the current `ProjectCard`).

## Data model (`src/data/portfolio.ts`)

Keep `Project` type. Reorganize the data:

- `projects: Project[]` → **web projects only** (Memora removed from this array).
- `featuredGame: Project` → Memora (reuses the existing `Project` shape: image,
  description, tags, `liveUrl`, `status`).
- New type + array for gameplay systems:

```ts
export interface GameSystem {
  id: string;
  title: string;
  description: Localized;
  poster: string;        // /systems/<id>.jpg — shown always as poster / fallback
  video?: string;        // /systems/<id>.mp4 — optional inline clip
  tags: string[];
  linkedinUrl?: string;  // link to the LinkedIn write-up
  engine: "unreal";
}

export const gameSystems: GameSystem[] = [ /* system #1 (real), system #2 (soon) */ ];
```

Adding a future system = append an object here + drop `<id>.mp4` / `<id>.jpg` into
`public/systems/`. No other change.

## Components (`src/components/sections/`)

- **`GameDev.tsx`** (new) — the `#games` section: header, Unity "Featured Game" subgroup
  (renders `featuredGame`), Unreal "Gameplay Systems" subgroup (renders `gameSystems`).
- **`FeaturedGameCard.tsx`** (new) — Memora hero card layout.
- **`GameSystemCard.tsx`** (new) — one gameplay-system card (lazy video/poster + LinkedIn
  button).
- **`Projects.tsx`** → **`WebProjects.tsx`** (renamed): the `#web` section. Remove the
  `FilterType` state and the filter buttons; render all `projects`. Extract the inner
  `ProjectCard` into its own file `ProjectCard.tsx` so it stays focused and reusable.
- **`page.tsx`** — render `<GameDev />` before `<WebProjects />` (Game Dev first), in
  place of the old `<Projects />`.

## Navigation & links

- `Navigation.tsx` `NAV_ITEMS`: replace `{ key: "projects", href: "#projects" }` with
  `{ key: "games", href: "#games" }` and `{ key: "web", href: "#web" }` (games before web).
- `Hero.tsx:230` "View My Work" button: change `href="#projects"` → `href="#games"`
  (first project section).
- `About.tsx` stat labels (`statWeb`, `statGames`) are plain text, not anchors — no change.

## i18n (`src/i18n/dictionaries.ts`)

- `nav`: replace `projects` with `games` and `web`.
  - EN: `games: "Games"`, `web: "Web"`. ES: `games: "Juegos"`, `web: "Web"`.
- Rename the `projects` block → `web` (heading, subtitle, `readMore`, `showLess`,
  `featured`, `statusCompleted`, `statusInProgress`, `viewMore`). Drop the now-unused
  `filterAll` / `filterCompleted` / `filterInProgress` / `empty` keys.
  - EN heading: "Web Development"; ES: "Desarrollo Web".
- Add a `games` block:
  - `heading` — EN "Game Development" / ES "Desarrollo de Videojuegos"
  - `subtitle` — one line about gameplay systems + a featured game
  - `featuredGameLabel` — EN "Featured Game" / ES "Juego destacado"
  - `systemsLabel` — EN "Gameplay Systems" / ES "Sistemas de Gameplay"
  - `systemsSubtitle` — short line, e.g. EN "Individual systems built in Unreal Engine
    with C++." / ES "Sistemas individuales construidos en Unreal Engine con C++."
  - `viewOnLinkedin` — EN "View on LinkedIn" / ES "Ver en LinkedIn"

`Dictionary` type is derived from the `en` object, so `es` must mirror the same shape.

## Status badges

`ProjectCard` keeps its status badge, but since all web projects are "completed" it will
consistently show the "Completed" badge. Left as-is (low risk); the `featuredGame`
(Memora, `in-progress`) can show its "In Progress" badge in the featured card.

## Testing / verification

Static site — verification is visual + build:

- `npm run build` (or the project's lint/build) passes with no type errors — the `es`
  dictionary must match the new `Dictionary` shape.
- Run the dev server and confirm:
  - Nav shows Games + Web (both languages), and each anchors to the right section.
  - Game Dev renders first, with Memora as the featured card and the systems grid below.
  - A system with a clip auto-plays muted on scroll; a system without one shows its poster.
  - "Ver en LinkedIn" opens the correct post; hidden when no URL.
  - Web section renders all web projects with no filter buttons.
  - Hero "View My Work" scrolls to Game Dev.
  - Layout holds on mobile and desktop.

## Open item for implementation

Collect system #1's real data from Franco: title, short description (EN + ES), tech tags,
LinkedIn URL, and the clip/poster files. Seed system #2 as a placeholder until it's ready.
