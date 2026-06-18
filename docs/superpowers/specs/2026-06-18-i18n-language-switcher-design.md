# Language Switcher (EN/ES) — Design

**Date:** 2026-06-18
**Status:** Approved

## Goal
Add an English/Spanish language switcher to the portfolio. Simple, performant, English by default.

## Approach
Client-side i18n with React Context + a static dictionary, no new dependencies. Chosen over `next-intl`/`[locale]` routing (too complex for a static export) and `react-i18next` (unnecessary dependency for a small site).

## Decisions
- **Default language:** English, always, on first visit (no browser auto-detection — predictable). User choice persists in `localStorage` (`lang` key).
- **No hydration mismatch:** static HTML renders in English; if `localStorage` says `es`, switch on mount (`useEffect`). `<html lang>` updated client-side by the provider.
- **Translation scope:** all visible text — UI strings + content (about, project descriptions, experience). NOT translated: name, tech names, company, email, project titles, tags.

## Architecture
- `src/i18n/dictionaries.ts` — `Lang`, `Localized` types; `en`/`es` UI string dictionaries (`Record<Lang, Dictionary>`). `Dictionary = typeof en` so `es` is compile-checked for completeness.
- `src/i18n/LanguageProvider.tsx` — `"use client"` Context provider. Exposes `useLanguage()` → `{ lang, setLang, t, pick }`. `t` = current UI dictionary; `pick(localized)` = current-language string from a `{ en, es }` value.
- `src/components/LanguageToggle.tsx` — compact `EN | ES` segmented control; visible on desktop (nav row) and mobile (next to hamburger).
- `src/data/portfolio.ts` — translatable content fields become `Localized` (`{ en, es }`): `personalInfo.title/subtitle`, `aboutText.intro/details`, `Project.description`, `Experience.role/period/description`.
- `src/app/layout.tsx` — wrap `<body>` children in `<LanguageProvider>`. Page `<metadata>` stays English (SEO).

## Components updated
Navigation (links + toggle), Hero, About, Skills, Experience, Contact, Footer, Projects — each reads `t`/`pick` via `useLanguage()`.

## Out of scope (noted)
- "Your photo here" placeholder in About and the `yourusername` GitHub link in Projects are pre-existing; the GitHub link is fixed opportunistically since the file is edited.

## Verification
`npm run build` (type-check enforces dictionary completeness) + manual browser check: toggle switches all sections, persists across reload, works on mobile.
