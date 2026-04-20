# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint
```

No test suite is configured.

## Architecture

**HandsTalk** is a Next.js 16 App Router application for AI-powered sign language translation and learning. All backend integrations are currently mocked — services in `lib/services/` simulate async processing and return dummy data, ready to be replaced with real API calls.

### Key layers

- **`app/`** — File-based routes: `/`, `/sign-to-text`, `/text-to-sign`, `/learn/**`
- **`components/`** — Feature components grouped by domain (`translator/`, `learning/`, `landing/`, `layout/`, `auth/`), plus `ui/` which holds shadcn/ui primitives
- **`lib/services/`** — Mock service layer (`sign-to-text.ts`, `text-to-sign.ts`, `saved.ts`). Replace these to integrate a real ML backend
- **`lib/data/learning.ts`** — Static mock data for courses, games, and achievements
- **`lib/context/auth-context.tsx`** — Global auth state via `useAuth()` hook; persisted to localStorage under key `handstalk_user`
- **`hooks/`** — `use-mobile.ts` (responsive breakpoint), `use-toast.ts`

### Tech stack

- **Framework**: Next.js 16 + React 19, TypeScript strict mode
- **Styling**: Tailwind CSS v4 with CSS variables; brand palette defined in `app/globals.css`
- **UI**: Radix UI + shadcn/ui (New York style, configured in `components.json`)
- **Animations**: Framer Motion (AnimatePresence patterns throughout)
- **Forms**: React Hook Form + Zod
- **Theme**: `next-themes` for dark mode (oklch color space in dark tokens)
- **Analytics**: Vercel Analytics (root layout)

### State management

Component-local `useState`/`useRef`/`useCallback` for UI state. `AuthProvider` (Context API) is the only global store. No Redux or Zustand.

### Adding a new page

Create `app/<route>/page.tsx`. Add `"use client"` if the page needs interactivity. Wire navigation links in `components/layout/navbar.tsx`.

### Replacing mock services

`lib/services/sign-to-text.ts` exports `processSignVideo()` and `createLiveTranslationStream()`. `lib/services/text-to-sign.ts` exports `generateSignVideo()`. Swap their implementations to connect a real backend; the component props and return types act as the contract.
