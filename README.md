# World 48 — Undiscovered Basketball Showcase

A premium, dark-mode Next.js site that surfaces a curated roster of 48 international basketball prospects to NCAA Division I coaches. Built in partnership with Weave Agency.

---

## What's in this MVP

- **Home** (`/`) — hero + value props + partnership strip
- **Roster** (`/players`) — grid of player cards, pulled from Google Sheets
- **Player profile** (`/players/[id]`) — side-by-side layout with bio, primary & secondary stats, and a YouTube/Vimeo highlight embed
- **About / Sponsors / Contact** — marketing placeholder pages (real copy in About; pitch in Sponsors; mailto in Contact)

Authentication, messaging, and admin tooling are **not** in scope for MVP — they're Phase 2.

---

## Prerequisites

Install these once on your machine:

1. **Node.js 18.17+** (or 20.x LTS). Check with `node -v`.
2. **npm** (ships with Node). Check with `npm -v`.
3. A code editor — VS Code is recommended.

### PowerShell note (Windows)

If `npm` fails with an execution-policy error, run PowerShell **as Administrator** once and execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## First-time setup

From the project root (`World 48-website`):

```bash
npm install
```

This will pull down Next.js, React, Tailwind, and the Google Sheets client.

### Environment variables

Create a file named `.env.local` in the project root. It is already `.gitignore`'d — never commit it.

```
GOOGLE_SHEETS_ID=1t2zb55XXFJQYJBqAReElmBcHC0KTbiF2qkeSfgk1IBo
GOOGLE_SHEETS_RANGE=Players!A2:Z
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
```

Notes:
- `GOOGLE_SHEETS_CREDENTIALS` is the **entire JSON** from your Google Cloud service-account key file, on a single line.
- The service-account email (ends in `@...iam.gserviceaccount.com`) must have **Viewer** access to the sheet — share the sheet with that email from inside Google Sheets.
- `GOOGLE_SHEETS_RANGE` should point to your data rows, skipping the header row.

---

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. Changes you make to files hot-reload instantly.

To produce a production build:

```bash
npm run build
npm start
```

---

## Deploying to Vercel

1. Push this project to a GitHub repo (private is fine).
2. Sign in to [vercel.com](https://vercel.com), click **Add New → Project**, and import the repo.
3. In **Environment Variables**, add the three `GOOGLE_SHEETS_*` keys from your `.env.local`.
4. Click **Deploy**. Vercel will give you a production URL (and a preview URL for every branch).
5. Point your `world48.com` DNS at Vercel when you're ready.

---

## Editing the roster (non-technical)

The site reads directly from your Google Sheet. To update the live roster:

- **Add a player** → add a new row in the sheet, fill in the columns, save.
- **Edit stats, bio, highlight URL** → edit the row in the sheet.
- **Remove a player** → delete the row.

The site caches for 5 minutes (`revalidate = 300`), so changes appear within a few minutes. You can also trigger an immediate refresh by re-deploying on Vercel.

### Sheet column conventions

| Header | Type | Notes |
|---|---|---|
| `name` | text | Required. Used as the player's display name and slug. |
| `position` | text | e.g. `PG`, `SF`, `C`. |
| `country` | text | |
| `height_cm` | number | Rendered as both cm and feet/inches. |
| `weight_kg` | number | |
| `school` | text | |
| `ppg`, `rpg`, `apg` | number | Primary stats. |
| `fg_percentage`, `three_p_percentage`, `ft_percentage` | number | Accepts `42.5` or `0.425`. |
| `bio` | text | Long-form bio; shows on profile page. |
| `highlight_url` | text | YouTube, YouTube Shorts, or Vimeo URL. |
| `instagram_url` | text | Full URL. |

Missing values render as `—` or hide their row gracefully.

---

## Project structure

```
World 48-website/
├── app/
│   ├── layout.tsx                 # Root layout (Header, Footer, dark mode)
│   ├── page.tsx                   # Home
│   ├── globals.css                # Tailwind + design tokens
│   ├── about/page.tsx
│   ├── sponsors/page.tsx
│   ├── contact/page.tsx
│   ├── players/
│   │   ├── page.tsx               # Roster grid
│   │   └── [id]/page.tsx          # Profile (side-by-side + highlights)
│   └── api/players/route.ts       # Public JSON feed of the roster
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── PlayerCard.tsx
├── lib/
│   └── googleSheets.ts            # Google Sheets client + cache
├── public/logos/                  # Optimized World 48 marks
├── tailwind.config.ts             # Brand colors + typography
└── .env.local                     # (not committed) secrets
```

---

## Phase 2 backlog (not in MVP)

These were scoped out to keep the first launch tight:

- Coach authentication (NCAA-only gating)
- Request Contact flow (email to Mark + player on submit)
- Admin panel (edit players without Google Sheets)
- Player-uploaded headshots
- Event-day schedule & livestream embed
- Analytics dashboard (views per player, contact clicks)

---

## Contact

Site owner: **Mark Reynolds** — `mark.reynolds25@gmail.com`

Built in partnership with [Weave Agency](https://weave.agency).
