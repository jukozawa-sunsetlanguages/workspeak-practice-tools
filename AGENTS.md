# Project guide

This is a deliberately minimal Vite + React + TypeScript prototype named `workspeak-practice-tools`. Preserve its small scope. Do not add authentication, persistence, a catalog, ecommerce, dashboards, analytics, backend infrastructure, or Communication Readiness Map integration without an explicit new request.

## Architecture

`src/tool-schema.ts` owns the fixed sequence and shared types. `src/tools/meeting-response.ts` is the sole example content configuration. `src/App.tsx` is a content-agnostic flow renderer with page-lifetime answer state and navigation. `src/components/` contains exactly five reusable components: PromptCard, Timer, TextInput, ReflectionField, and Progress. `src/styles.css` holds the responsive visual baseline. `netlify.toml` configures static deployment.

## Conventions

Use typed configuration satisfying `PracticeTool` for content changes. Keep drill-specific copy out of the renderer. Use the configuration's step and field IDs as stable answer keys. Preserve optional fields, direct step navigation, accessible labels, focus handling, restart confirmation, and timer cleanup. Notes deliberately do not survive refresh; do not add browser storage as an implicit convenience.

Use functional React components, named component exports, two-space indentation, single quotes in TypeScript, and plain CSS. Avoid new dependencies or reusable components unless a real interaction needs them. Use Sora headings, Inter body/UI, Navy #0F1E2E, Off White #F4F2ED, Green #1F3F3A, Amber #C96F1A, and Gray #2B2F36. No gradients, glassmorphism, gamification, badges, excessive cards, or unapproved methodological claims.

## Development

See README.md for local commands and replacement configuration instructions. The Netlify pipeline installs dependencies and runs the package build script. No test framework is currently included. Read the relevant platform skills before implementing any future Netlify feature.
