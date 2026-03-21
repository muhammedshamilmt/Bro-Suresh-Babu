# Bro. Suresh Babu Ministries — Website

A full-stack ministry website built with React, TypeScript, Express, and MongoDB. Includes a public-facing site and a password-protected admin dashboard for managing blog posts, events, and enquiries.

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Framer Motion
- TanStack Query v5 (React Query) — with caching, optimistic updates, background polling, deduplication
- React Router v6

**Backend**
- Express.js (local dev + Vercel serverless)
- MongoDB (Atlas)
- Node.js 18+ (native `--env-file` flag, no extra dotenv loader needed in dev)

---

## Project Structure

```
├── api/
│   └── index.js                  # Serverless entry point for Vercel
├── server/
│   ├── .env                      # Backend-only env vars (never committed)
│   ├── db.js                     # MongoDB connection (lazy, singleton)
│   ├── index.js                  # Local dev Express server
│   └── routes/
│       ├── blogs.js              # Blog CRUD
│       ├── enquiries.js          # Contact enquiries CRUD
│       └── events.js             # Events CRUD + registrations
├── src/
│   ├── components/               # Shared UI components (Navbar, Footer, etc.)
│   ├── hooks/                    # React Query hooks
│   │   ├── useBlogs.ts
│   │   ├── useEnquiries.ts
│   │   └── useEvents.ts
│   ├── lib/
│   │   ├── api.ts                # Typed fetch client + all API methods
│   │   ├── auth.ts               # Session-based admin auth helpers
│   │   └── utils.ts
│   └── pages/                    # Route-level page components
│       ├── Index.tsx             # Home
│       ├── About.tsx
│       ├── Blog.tsx              # Public blog listing
│       ├── BlogPost.tsx          # Public blog detail
│       ├── Events.tsx            # Public events listing
│       ├── EventDetail.tsx       # Public event detail (parallax hero)
│       ├── EventRegister.tsx     # 3-step registration form
│       ├── Contact.tsx
│       ├── AdminLogin.tsx        # /admin/login
│       ├── Dashboard.tsx         # /dashboard — Blogs / Enquiries / Events tabs
│       ├── BlogEditor.tsx        # /dashboard/blog/new + /dashboard/blog/:id/edit
│       ├── AdminEventEditor.tsx  # /dashboard/events/new + /dashboard/events/:id/edit
│       └── AdminEventDetail.tsx  # /dashboard/events/:id — registrations management
├── .env                          # Frontend env vars (VITE_*)
├── vercel.json                   # Vercel routing config
└── vite.config.ts                # Vite + custom plugin to spawn backend in dev
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster (free tier works fine)

### 1. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install
```

### 2. Configure environment variables

**Root `.env`** (frontend — Vite reads these):
```env
VITE_API_BASE_URL=/api
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=yourpassword
```

**`server/.env`** (backend — never exposed to the browser):
```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
DB_NAME=brosureshbabu
PORT=3001
CLIENT_ORIGIN=http://localhost:8080
```

### 3. Run locally

Everything starts with a single command — a custom Vite plugin spawns the Express backend automatically:

```bash
npm run dev
```

- Frontend: `http://localhost:8080`
- API (proxied): `http://localhost:8080/api` → `http://localhost:3001`

No need to run the backend separately.

---

## Admin Dashboard

Visit `/admin/login`. Credentials come from `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` in your root `.env`. Session is stored in `sessionStorage` — closing the tab logs you out.

### Dashboard tabs

**Blog Posts**
- Create, edit, and delete blog posts
- Full-screen editor with Editor / Split / Preview modes
- HTML toolbar, meta sidebar (cover image, category, author, status)
- Live preview mirrors the public `BlogPost` page exactly

**Enquiries**
- View all contact form submissions
- Slide-in detail panel
- Update status: New → Read → Replied → Closed
- Search and filter by status

**Events**
- Create, edit, and delete events
- Rich editor: date/time, location, color theme, highlights, speakers, schedule
- Toggle `registrationOpen` — controls whether the public Register button is shown
- Per-event registrations view with confirm / cancel actions
- Registrations tab is hidden when `registrationOpen` is false
- Background polling every 60 s for live registration updates

---

## Public Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, intro, foundations, services, CTA |
| `/about` | About page |
| `/blog` | Blog listing — search + category filter |
| `/blog/:id` | Blog post detail |
| `/events` | Events listing — search + type filter, live from DB |
| `/events/:id` | Event detail — parallax hero, highlights, speakers, schedule |
| `/events/:id/register` | 3-step registration form (in-person only) |
| `/contact` | Contact form — posts to `/api/enquiries` |
| `/admin/login` | Admin login |
| `/dashboard` | Protected admin dashboard |

---

## API Routes

### Blogs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | List blogs (`?status`, `?category`, `?search`, `?page`, `?limit`) |
| GET | `/api/blogs/:id` | Get single blog post |
| POST | `/api/blogs` | Create blog post |
| PUT | `/api/blogs/:id` | Update blog post |
| DELETE | `/api/blogs/:id` | Delete blog post |
| PATCH | `/api/blogs/:id/views` | Increment view count |

### Enquiries

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enquiries` | List enquiries (`?status`, `?search`) |
| POST | `/api/enquiries` | Submit a new enquiry |
| PATCH | `/api/enquiries/:id` | Update enquiry status |
| DELETE | `/api/enquiries/:id` | Delete enquiry |

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List events (`?status`, `?type`, `?search`, `?page`, `?limit`) |
| GET | `/api/events/:id` | Get single event |
| POST | `/api/events` | Create event |
| PUT | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |
| GET | `/api/events/:id/registrations` | List registrations (`?search`, `?status`, `?page`) |
| POST | `/api/events/:id/registrations` | Submit registration (blocked if `registrationOpen` is false) |
| PATCH | `/api/events/registrations/:regId/status` | Update registration status (confirmed / pending / cancelled) |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

---

## Data Fetching Strategy

All data fetching uses TanStack Query v5:

- `staleTime` — avoids redundant refetches for fresh data
- `gcTime` — keeps unused data in cache for fast back-navigation
- `placeholderData` — shows previous page data while new page loads (no layout shift)
- Optimistic updates — mutations update the UI instantly, roll back on error
- Background polling — registrations refetch every 60 s automatically
- Query deduplication — identical in-flight requests are merged automatically
- `refetchOnWindowFocus` — list views stay fresh when you switch tabs

---

## Deployment (Vercel)

The project is configured for full-stack deployment on Vercel via `vercel.json`. The Express server is wrapped as a single serverless function at `api/index.js`.

### Environment variables to set in Vercel

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `/api` |
| `VITE_ADMIN_EMAIL` | your admin email |
| `VITE_ADMIN_PASSWORD` | your admin password |
| `MONGODB_URI` | your MongoDB Atlas connection string |
| `DB_NAME` | `brosureshbabu` |
| `CLIENT_ORIGIN` | your Vercel deployment URL |

Push to your connected Git repo — Vercel handles the build and deployment automatically.

---

## MongoDB Collections

| Collection | Description |
|------------|-------------|
| `blogs` | Blog posts with full HTML content, status, views |
| `enquiries` | Contact form submissions with status tracking |
| `events` | Events with speakers, schedule, highlights, registration toggle |
| `event_registrations` | Per-event registrations with confirm/cancel status |
