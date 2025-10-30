# Skill Share (Next.js)

A minimal full-stack demo of an online learning platform (frontend + backend) using Next.js + NextAuth.js.
This project focuses on **Option A (recommended)** — using **unlisted YouTube videos** and storing only YouTube IDs in a local JSON file.

---

## What you'll find

- Next.js app (pages router) with TypeScript
- NextAuth.js credentials provider for email/password auth (local users stored in `data/users.json`)
- Admin UI to add/delete courses; admin check is based on `NEXT_PUBLIC_ADMIN_EMAIL`
- Course metadata stored in `/data/courses.json` (no video files)
- Video embeds via `https://www.youtube.com/embed/<VIDEO_ID>`
- Progress tracking saved in browser `localStorage`
- Simple Tailwind CSS styling

---

## Quick start (VS Code)

1. Download the provided zip and extract (or clone the folder into your workspace).
2. In VS Code open the project folder.
3. Create a file named `.env.local` in the project root with at least:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=some-random-secret
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
```

4. Install dependencies:

```bash
npm install
```

5. Run dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Default admin credentials (for demo):
- email: `admin@example.com`
- password: `adminpass`

You can sign up new users at `/auth/signup`.

---

## Using Option A (Unlisted YouTube videos) — Recommended (default)

- Upload videos to your YouTube account and set them to **Unlisted**.
- Add each video's **YouTube ID** (the `v=` part in the watch URL) in the Admin panel.
- The app embeds videos with `<iframe src="https://www.youtube.com/embed/VIDEO_ID">`.
- No YouTube API keys needed.

Why unlisted? It's simple: unlisted videos are embeddable and not discoverable via search. They let you control access without complex OAuth flows.

---

## Option B — Private videos via YouTube Data API (Advanced)

This demo includes `pages/api/youtube/videos.ts` as a placeholder. Implementing a production-ready Option B requires:

1. Create OAuth 2.0 credentials in Google Cloud Console (OAuth Client ID).
2. Implement an OAuth flow to obtain a refresh token for your channel (server side).
3. Store the refresh token securely (env or DB).
4. Use `googleapis` (npm package) to refresh the access token and call YouTube Data API to list private videos.
5. Return embeddable links from server only to authenticated users.

**Security note:** private videos have stricter policy and you must ensure tokens are protected.

---

## Project structure (important files)

- `pages/` — Next.js pages and API routes
- `components/` — small reusable UI components
- `data/courses.json` — course + lesson metadata (YouTube IDs)
- `data/users.json` — local user store (demo)
- `styles/globals.css` — Tailwind base

---

## How auth works (simple demo)

- Sign up POSTs to `/api/signup` — writes `data/users.json` with a bcrypt-hashed password.
- NextAuth Credentials provider (`/api/auth/[...nextauth]`) reads `data/users.json` and verifies password.
- Protected pages (courses, watch, admin) redirect to `/auth/signin` when session missing.

**This is a demo** — do not use this exact pattern in production. Use a real DB and stronger session/csrf protections.

---

## Switching to production-ready storage

- Replace `data/*.json` with a proper DB (Postgres, MongoDB).
- Store secrets in environment variables or secret manager.
- Use proper role-based server-side checks for admin operations.

---

## Minimal steps to enable Option B (manual refresh token paste for quick test)

1. Create OAuth credentials in Google Cloud Console and set redirect URI to something like `http://localhost:3000/api/auth/youtube/callback` (you'll implement this).
2. Use `googleapis` locally to run the OAuth consent and get a refresh token.
3. Paste the refresh token into `.env.local` as `YOUTUBE_REFRESH_TOKEN`.
4. Implement the server-side `pages/api/youtube/videos.ts` to use `googleapis` and that refresh token (this demo does not perform the OAuth dance).

---

## Testing

- Sign up a new user: `/auth/signup`
- Sign in: `/auth/signin`
- Visit courses: `/courses`
- Click a video to watch: `/watch/<videoId>`
- Admin panel: `/admin` (logged in as `admin@example.com`)

---

## VS Code tips

- Use the integrated terminal (Ctrl+`) for install & run.
- Install recommended extensions: ESLint, Tailwind CSS IntelliSense, Prettier, TypeScript.
- To debug: add a `launch.json` and run Next.js via `npm run dev`.

---

## Files included

See the project zip. Enjoy — try adding your own YouTube IDs in `/data/courses.json`.

