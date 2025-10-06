# Private Data Stepper

A small React + Vite app (TypeScript) that collects user data across multiple steps.

This README explains how to prepare the environment, run the app locally, build for production, and some notes about routing and troubleshooting.

## Prerequisites

- Node.js (tested with 22.17.0)
- npm (bundled with Node) — you can also use pnpm or yarn but the examples below use npm

Verify your Node version:

```bash
node --version
```

## Setup (first time)

Install dependencies:

```bash
npm install
```

If you prefer pnpm and a lockfile exists, you can run:

```bash
pnpm install
```

## Run in development

Start the Vite dev server:

```bash
npm run dev
```

By default the app runs on http://localhost:5173. Open that URL in your browser.

## Build & Preview

Build for production:

```bash
npm run build
```

Preview the built output locally:

```bash
npm run preview
```

## Routing and per-step URLs

This app exposes per-step routes so each step has a stable URL. Routes are:

- `/step/1` — Private data (first step)
- `/step/2` — Address & Work
- `/step/3` — Loan parameters

The root path `/` redirects to `/step/1`.

The UI keeps the URL and the internal Zustand form store in sync. You can navigate forward/back using the form controls, or click the step circles in the stepper to jump directly to any step. Refreshing the page preserves the current step (persisted via local storage).

## Project structure (important files)

- `src/App.tsx` — app entry, Router setup
- `src/pages/Index.tsx` — main stepper page; syncs route <-> store
- `src/components/Stepper.tsx` — clickable stepper UI
- `src/store/formStore.ts` — Zustand store (persisted)

## Troubleshooting

- If the dev server fails to start with module resolution errors, run `npm install` to ensure dependencies are present.
- If you see stale build artifacts, try removing `node_modules` and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

- If you use a different package manager (pnpm/yarn), use the appropriate install command.

## Notes

- The app uses Vite, React Router v6, Zustand (with persist middleware), and Tailwind CSS.
- Form state is persisted to localStorage using Zustand's `persist` middleware — reset behavior is triggered from the app UI after submission.

## Want me to...

- Run the dev server and verify the routes work locally? (I can run it in this environment and report back.)
- Add tests or a small e2e script to verify step navigation?
