# soundboard

A small React + TypeScript app (Vite) that provides audio recording, playback, and simple post views. This README removes previous third-party branding and describes how the code is organized and how the app works.

## Quick start

Prerequisites:
- Node.js (recommended v18+)
- npm (or pnpm/yarn)

Install and run locally:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

Linting:

```bash
npm run lint
```

## Project overview

High-level technologies used:
- Vite (dev server + build)
- React + TypeScript
- Tailwind CSS and shadcn-ui component primitives (under `src/components/ui`)
- TanStack Query for async data handling
- Supabase for backend/storage (client in `src/integrations/supabase`)

This repo provides a small app with pages for listing content, creating posts, viewing a single post, and authentication.

## Repository structure (key paths)

- `src/main.tsx` — app entry: imports global CSS and mounts the React tree.
- `src/App.tsx` — top-level providers (QueryClient, tooltip/toaster) and React Router routes.
- `src/pages/` — route pages: `Index.tsx`, `CreatePost.tsx`, `PostView.tsx`, `Auth.tsx`, `NotFound.tsx`.
- `src/components/` — UI components used by pages. Notable files:
	- `AudioRecorder.tsx` — recording UI that uses `useAudioRecording` and provides a preview + upload flow.
	- `AudioPlayer.tsx` — custom audio player (play/pause, seek slider, volume).
	- `Header.tsx`, `PostCard.tsx`, `SearchAndFilters.tsx` — layout and list UI.
	- `ui/` — a large collection of shadcn-style primitive components (buttons, inputs, dialogs, sliders, toasts, etc.) used across the app.
- `src/hooks/` — custom hooks:
	- `useAudioRecording.ts` — MediaRecorder-based hook that manages recording lifecycle and returns `audioBlob`, `audioUrl`, `isRecording`, `startRecording`, `stopRecording`, `clearRecording`, and `formatTime`.
	- `use-toast.ts`, `use-mobile.tsx` — small helpers used by components.
- `src/integrations/supabase/` — Supabase client and types (`client.ts`, `types.ts`).
- `src/lib/utils.ts` — shared utility functions.
- `public/` — static assets.
- `supabase/` — local supabase config and migrations (if used).

## How the main pieces work together

- App bootstrap: `src/main.tsx` mounts `App`. `src/App.tsx` wraps the app with `QueryClientProvider`, `TooltipProvider`, and `Toaster` components and sets up routes.

- Routing: The app uses `react-router-dom`. Routes defined in `App.tsx` include:
	- `/` → `Index` (list page)
	- `/create` → `CreatePost` (form to create posts)
	- `/post/:id` → `PostView` (single post view)
	- `/auth` → `Auth` (authentication flow)

- Recording flow:
	- `useAudioRecording` (in `src/hooks`) obtains microphone permissions with `navigator.mediaDevices.getUserMedia`, creates a `MediaRecorder`, collects chunks, and exposes `audioBlob` and `audioUrl` once stopped.
	- `AudioRecorder` (in `src/components`) calls `startRecording()` and `stopRecording()` from the hook and displays recording state and formatted time. After recording it renders an audio preview using `AudioPlayer` and exposes a submit/upload routine via an `onAudioReady` callback.
	- `AudioPlayer` uses an HTML `<audio>` element and connects it to a small UI (play/pause, seek slider, volume) via refs and event listeners (`timeupdate`, `loadedmetadata`, `ended`).

- Data and backend:
	- `src/integrations/supabase/client.ts` creates and exports the `supabase` client used to read/write data. For local dev you can replace the values in this file with your own Supabase project URL and anon key or modify the file to read from environment variables.
	- TanStack Query is used for caching and async state management (see `src/App.tsx` where `QueryClient` is created).

## Environment and secrets

- This project currently includes a generated Supabase client. For production or private projects, avoid committing secret keys to source control.
- Recommended pattern:
	1. Store keys in environment variables (`.env.local`) and reference them in `src/integrations/supabase/client.ts` or initialize `supabase` inside a small wrapper that reads `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`.
	2. Add `.env.local` to `.gitignore`.

## Development notes

- Linting: `npm run lint` (uses ESLint configuration).
- Code style: Tailwind + shadcn UI primitives; prefer composing primitives in `src/components/ui` instead of adding ad-hoc CSS.
- Testing: This project doesn't include test runners by default; consider adding Vitest / Jest if you need unit tests.

## Common tasks

- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build locally: `npm run preview`
- Run linter: `npm run lint`

## Where to look next (developer guide)

- UI primitives and design system: `src/components/ui/*` — adapt these to change look-and-feel app-wide.
- Recording implementation: `src/hooks/useAudioRecording.ts` and `src/components/AudioRecorder.tsx` — useful reference for MediaRecorder usage.
- Playback implementation: `src/components/AudioPlayer.tsx` — custom audio control patterns.
- Data layer: `src/integrations/supabase/*` and anywhere `supabase` is imported.

## Contributing

1. Fork and create a branch.
2. Install dependencies and run the dev server locally.
3. Open a PR with a clear description of changes.
