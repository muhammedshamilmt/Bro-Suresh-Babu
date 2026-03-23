# Bro. Suresh Babu Ministries — Website

A full-stack ministry website built with React, TypeScript, Express, and MongoDB. Includes a public-facing site and a password-protected admin dashboard for managing blog posts, events, and enquiries.

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Framer Motion
- TanStack Query v5 (React Query)
- React Router v6

**Backend**
- Express.js (local dev + Vercel serverless)
- MongoDB (Atlas)
- Node.js 18+

**Media**
- Cloudinary — all images served via CDN with `f_auto,q_auto` (auto WebP/AVIF + smart compression)
- Zero binary files in the repository

---

## Project Structure

```
├── api/
│   └── index.js                  # Vercel serverless entry point
├── server/
│   ├── .env                      # Backend-only env vars (never committed)
│   ├── db.js                     # MongoDB connection (lazy singleton)
│   ├── index.js                  # Local dev Express server
│   └── routes/
│       ├── blogs.js
│       ├── enquiries.js
│       └── events.js
├── src/
│   ├── components/               # Shared UI components
│   │   ├── Banner.tsx            # Auto-sliding image carousel
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx            # Includes "Powered by Herald Group" link
│   │   ├── Foundations.tsx       # Stacking scroll cards
│   │   ├── Gallery.tsx           # Bento grid gallery + lightbox
│   │   ├── Hero.tsx
│   │   ├── Introduction.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── Services.tsx          # Auto-cycling image slideshow per card
│   │   └── Video.tsx             # YouTube embed section
│   ├── hooks/
│   │   ├── useBlogs.ts
│   │   ├── useEnquiries.ts
│   │   └── useEvents.ts
│   ├── lib/
│   │   ├── api.ts                # Typed fetch client + all API methods
│   │   ├── auth.ts               # Session-based admin auth
│   │   └── utils.ts
│   └── pages/
│       ├── Index.tsx             # Home (Ministry Hub or Mobile redirect to Landing)
│       ├── Landing.tsx           # Main Landing Page
│       ├── MinistryHub.tsx       # Ministry Hub Portal
│       ├── About.tsx             # About + photo gallery
│       ├── Blog.tsx              # Public blog listing
│       ├── BlogPost.tsx          # Blog detail
│       ├── BuildingFund.tsx      # Building fund + bank details + UPI QR
│       ├── ChristCentre.tsx      # Christ Centre church page
│       ├── Contact.tsx           # Contact form + YouTube channels marquee + social links
│       ├── Events.tsx            # Public events listing
│       ├── EventDetail.tsx       # Event detail with parallax hero
│       ├── EventRegister.tsx     # 3-step registration form
│       ├── Give.tsx              # Give & Support + bank details + UPI QR
│       ├── GraceCommunity.tsx    # Grace Community Global (Bro. Sajith Joseph)
│       ├── Media.tsx             # Media & Resources
│       ├── MediaFund.tsx         # Media Fund page
│       ├── Ministry.tsx          # Ministries overview
│       ├── Podcast.tsx           # Podcast directory
│       ├── AdminLogin.tsx        # /admin/login
│       ├── Dashboard.tsx         # Protected admin — Blogs / Enquiries / Events tabs
│       ├── BlogEditor.tsx        # Blog create/edit with live preview
│       ├── AdminEventEditor.tsx  # Event create/edit
│       └── AdminEventDetail.tsx  # Event registrations management
├── .env                          # Frontend env vars (VITE_*)
├── vercel.json
└── vite.config.ts                # Vite + plugin to spawn backend in dev
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas cluster (free tier works)

### 1. Install dependencies

```bash
npm install
cd server && npm install
```

### 2. Configure environment variables

**Root `.env`** (Vite reads these — safe to commit structure, not values):
```env
VITE_API_BASE_URL=/api
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=yourpassword
```

**`server/.env`** (backend only — never exposed to browser):
```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
DB_NAME=brosureshbabu
PORT=3001
CLIENT_ORIGIN=http://localhost:8080
```

### 3. Run locally

Single command starts both frontend and backend:

```bash
npm run dev
```

- Frontend: `http://localhost:8080`
- API (proxied via Vite): `http://localhost:8080/api` → `http://localhost:3001`

---

## Images

All images are hosted on **Cloudinary** — no binary files exist in this repository.

Every image URL uses `f_auto,q_auto` transformations:
- Auto-serves WebP to Chrome, AVIF to modern browsers
- Smart quality compression with no visible loss
- Global CDN delivery

Cloudinary cloud name: `dfadqkxbo`

---

## Public Pages

| Route | Description |
|-------|-------------|
| `/` | Home — dynamically renders Ministry Hub (desktop) or redirects to Landing (mobile < 1066px) |
| `/landing` | Landing — main page with hero, intro, foundations, services, video, CTA |
| `/hub` | Ministry Hub — dynamic central navigation portal |
| `/about` | About + ministry timeline + bento photo gallery |
| `/ministry` | Ministries overview |
| `/media` | Media & Resources — global YouTube network, podcasts, social links |
| `/blog` | Blog listing |
| `/blog/:id` | Blog post detail |
| `/events` | Events listing — live from DB |
| `/events/:id` | Event detail — parallax hero, speakers, schedule |
| `/events/:id/register` | 3-step in-person registration form |
| `/contact` | Contact form + YouTube channels marquee + social links |
| `/grace-community` | Grace Community Global (founded by Bro. Sajith Joseph) |
| `/christ-centre` | Christ Centre church page |
| `/give` | Give & Support — bank details + UPI QR |
| `/building-fund` | Building Fund — vision timeline + bank details + UPI QR |
| `/media-fund` | Media Fund page |
| `/podcast` | Podcast directory |
| `/admin/login` | Admin login |
| `/dashboard` | Protected admin dashboard |

---

## Admin Dashboard

Visit `/admin/login`. Credentials from `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD`. Session stored in `sessionStorage`.

**Blogs tab** — create/edit/delete posts with live split-pane HTML editor and meta sidebar

**Enquiries tab** — view contact submissions, slide-in detail panel, status management (New → Read → Replied → Closed)

**Events tab** — create/edit/delete events with full editor (date, location, color theme, highlights, speakers, schedule, `registrationOpen` toggle). Per-event registrations view with confirm/cancel. Background polling every 60s.

---

## API Routes

### Blogs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | List (`?status`, `?category`, `?search`, `?page`, `?limit`) |
| GET | `/api/blogs/:id` | Get single post |
| POST | `/api/blogs` | Create |
| PUT | `/api/blogs/:id` | Update |
| DELETE | `/api/blogs/:id` | Delete |
| PATCH | `/api/blogs/:id/views` | Increment view count |

### Enquiries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/enquiries` | List (`?status`, `?search`) |
| POST | `/api/enquiries` | Submit |
| PATCH | `/api/enquiries/:id` | Update status |
| DELETE | `/api/enquiries/:id` | Delete |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List (`?status`, `?type`, `?search`, `?page`, `?limit`) |
| GET | `/api/events/:id` | Get single event |
| POST | `/api/events` | Create |
| PUT | `/api/events/:id` | Update |
| DELETE | `/api/events/:id` | Delete |
| GET | `/api/events/:id/registrations` | List registrations |
| POST | `/api/events/:id/registrations` | Submit registration (blocked if `registrationOpen` is false) |
| PATCH | `/api/events/registrations/:regId/status` | Update registration status |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

---

## Data Fetching

All data fetching uses TanStack Query v5:

- `staleTime` — avoids redundant refetches for fresh data
- `gcTime` — keeps unused data in cache for fast back-navigation
- `placeholderData` — shows previous data while new page loads
- Optimistic updates — mutations update UI instantly, roll back on error
- Background polling — registrations refetch every 60s
- Query deduplication — identical in-flight requests merged automatically

---

## MongoDB Collections

| Collection | Description |
|------------|-------------|
| `blogs` | Blog posts with HTML content, status, view count |
| `enquiries` | Contact form submissions with status tracking |
| `events` | Events with speakers, schedule, highlights, registration toggle |
| `event_registrations` | Per-event registrations with confirm/cancel status |

---

## Deployment (Vercel)

The Express server is wrapped as a single serverless function at `api/index.js`.

### Environment variables to set in Vercel

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `/api` |
| `VITE_ADMIN_EMAIL` | your admin email |
| `VITE_ADMIN_PASSWORD` | your admin password |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `DB_NAME` | `brosureshbabu` |
| `CLIENT_ORIGIN` | your Vercel deployment URL |

Push to your connected Git repo — Vercel builds and deploys automatically.

---

## Credits

Website powered by [Herald Group](https://heraldgroup.org/)
