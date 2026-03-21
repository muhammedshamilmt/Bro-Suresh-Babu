import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load server/.env before anything else touches process.env
const _require = createRequire(import.meta.url);
_require("dotenv").config({ path: join(dirname(fileURLToPath(import.meta.url)), ".env") });

import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import enquiriesRouter from "./routes/enquiries.js";
import blogsRouter from "./routes/blogs.js";
import eventsRouter from "./routes/events.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.disable("x-powered-by");

app.use("/api/enquiries", enquiriesRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/events", eventsRouter);
app.get("/api/health", (_req, res) => res.json({ status: "ok", ts: Date.now() }));

connectDB()
  .then(() => app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`)))
  .catch((err) => { console.error("❌ MongoDB connection failed:", err.message); process.exit(1); });
