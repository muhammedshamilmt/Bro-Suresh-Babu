# Bro. Suresh Babu Ministries — Website

A full-stack ministry website built with React, TypeScript, Express, and MongoDB. Includes a public-facing site and a password-protected admin dashboard for managing blog posts and enquiries.

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Framer Motion
- TanStack Query (React Query)
- React Router v6

**Backend**
- Express.js (served as a Vercel serverless function)
- MongoDB (Atlas)

---

## Project Structure

```
├── api/
│   └── index.js          # Serverless entry point for Vercel
├── server/
│   ├── db.js             # MongoDB connection
│   ├── index.js          # Local dev Express server
│   └── routes/
│       ├── blogs.js
│       └── enquiries.js
├── src/
│   ├── components/       # Shared UI components
│   ├── hooks/            # React Query hooks (useBlogs, useEnquiries)
│   ├── lib/              # API client, auth helpers, utils
│   └── pages/            # Route-level page components
├── vercel.json           # Vercel routing config
└── .env                  # Frontend env vars
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster

### 1. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install
```

### 2. Configure environment variables

**Root `.env`** (frontend):
```
VITE_API_BASE_URL=/api
VITE_ADMIN_EMAIL=your@email.com
VITE_ADMIN_PASSWORD=yourpassword
```

**`server/.env`** (local dev backend):
```
MONGODB_URI=mongodb+srv://...
DB_NAME=brosureshbabu
PORT=3001
CLIENT_ORIGIN=http://localhost:8080
```

### 3. Run locally

In two terminals:

```bash
# Terminal 1 — frontend
npm run dev

# Terminal 2 — backend
cd server && npm run dev
```

The frontend runs on `http://localhost:8080`, the API on `http://localhost:3001`.

---

## Deployment (Vercel)

The project is configured for full-stack deployment on Vercel via `vercel.json`. The Express server is wrapped as a single serverless function at `api/index.js`.

### Environment variables to add in Vercel

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `/api` |
| `VITE_ADMIN_EMAIL` | your admin email |
| `VITE_ADMIN_PASSWORD` | your admin password |
| `MONGODB_URI` | your MongoDB Atlas connection string |
| `DB_NAME` | `brosureshbabu` |
| `CLIENT_ORIGIN` | your Vercel deployment URL |

Push to your connected Git repo — Vercel handles the rest.

---

## Admin Dashboard

Visit `/admin/login` to access the dashboard. Credentials are set via the `VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD` env vars.

**Features:**
- Create, edit, and delete blog posts with a live split-pane HTML editor
- View, filter, and manage contact enquiries
- Mark enquiries as read, replied, or closed

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | List blogs (supports `?status`, `?category`, `?search`, `?page`) |
| GET | `/api/blogs/:id` | Get single blog post |
| POST | `/api/blogs` | Create blog post |
| PUT | `/api/blogs/:id` | Update blog post |
| DELETE | `/api/blogs/:id` | Delete blog post |
| PATCH | `/api/blogs/:id/views` | Increment view count |
| GET | `/api/enquiries` | List enquiries (supports `?status`, `?search`) |
| POST | `/api/enquiries` | Submit a new enquiry |
| PATCH | `/api/enquiries/:id` | Update enquiry status |
| DELETE | `/api/enquiries/:id` | Delete enquiry |
| GET | `/api/health` | Health check |
