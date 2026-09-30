# workspeak-practice-tools

A minimal Vite/React architectural prototype for WorkSpeak Practice Tools. It contains one illustrative **Meeting Response Drill**, not a finished product, marketplace, or statement of WorkSpeak methodology.

## Run locally

Use Node.js 22.12 or newer and npm.

```sh
npm install
npm run dev
```

`npm run build` type-checks the project and creates the static site in `dist`. `npm run preview` previews a local build. Netlify uses the settings in `netlify.toml`, which explicitly installs locked dependencies with `npm ci --include=dev` before building so TypeScript and Vite are available in the deployment environment.

## Architecture

- `src/tool-schema.ts` defines the content schema and the fixed ten-step sequence.
- `src/tools/meeting-response.ts` holds all example-specific titles, prompts, instructions, fields, timer settings, and completion copy.
- `src/App.tsx` renders that configuration and manages navigation and temporary answers. It does not branch on tool IDs or contain drill-specific copy.
- `src/components/` contains only PromptCard, Timer, TextInput, ReflectionField, and Progress.
- `src/styles.css` provides a restrained WorkSpeak baseline using Sora, Inter, and the supplied palette.

## Reuse the template

Replace the exported tool configuration in `src/tools/meeting-response.ts`, or create a replacement module satisfying `PracticeTool` and pass it to `<App tool={yourTool} />`. Supply content for all ten keys in `steps`; the sequence remains The Moment → The Friction → The Target → Prepare → Practice → Repeat → Reflect → Evidence Check → Transfer → Next Step.

Each step supports a prompt, optional instructions, optional text/reflection fields, an optional timer, and an optional next-button label. Keep field IDs unique within each step. Copy, field counts, placeholders, and timer durations can change without changing the interface. A new interaction type would require a deliberate schema and renderer extension; this prototype intentionally does not include a general-purpose page builder.

## Intentional boundaries

Answers exist only in React state for the open page. Navigating between steps retains notes; refreshing or confirming a restart clears them. Timers are optional, pauseable, resettable, and stop when leaving a step. All fields are optional. Nothing is recorded, submitted, scored, or persisted.

There is no authentication, database, catalog, dashboard, ecommerce, analytics, Communication Readiness Map integration, or backend. The requested prototype is complete; future work is replacing the illustrative configuration with approved tool content, not adding product infrastructure.
